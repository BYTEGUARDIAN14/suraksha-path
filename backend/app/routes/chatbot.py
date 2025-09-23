from flask import Blueprint, request, jsonify, current_app
from transformers import pipeline
import wikipedia
from wikipedia.exceptions import DisambiguationError, PageError
import threading
import os
from pathlib import Path
import re

chatbot_bp = Blueprint('chatbot', __name__)

"""
Chatbot: DistilBERT QA using only retrieved Wikipedia context. No hardcoded domain text.
"""

# Thread-safe model loading
_model = None
_model_lock = threading.Lock()

def get_qa_model():
    global _model
    with _model_lock:
        if _model is None:
            _model = pipeline('question-answering', model='distilbert-base-uncased-distilled-squad')
        return _model

def is_disaster_question(question: str) -> bool:
    # Kept only if we later want to tune retrieval queries; not used for adding context
    q = question.lower()
    keywords = ['earthquake', 'flood', 'fire', 'tsunami', 'cyclone', 'hurricane', 'evacuation', 'first aid', 'burn', 'bleeding', 'fracture', 'disaster', 'emergency', 'aftershock', 'landslide', 'storm', 'safety', 'smoke', 'drill']
    return any(k in q for k in keywords)

WIKI_CACHE_DIR = Path(os.getenv('WIKI_CACHE_DIR', '/models/wiki_cache'))
WIKI_CACHE_DIR.mkdir(parents=True, exist_ok=True)

def _safe_name(name: str) -> str:
    return ''.join(c for c in name if c.isalnum() or c in (' ', '_', '-')).rstrip().replace(' ', '_')

def _load_cached_page(title: str) -> str | None:
    path = WIKI_CACHE_DIR / f"{_safe_name(title)}.txt"
    if path.exists():
        try:
            return path.read_text(encoding='utf-8')
        except Exception:
            return None
    return None

def _save_cached_page(title: str, content: str) -> None:
    try:
        path = WIKI_CACHE_DIR / f"{_safe_name(title)}.txt"
        path.write_text(content, encoding='utf-8')
    except Exception:
        pass

def _refine_query(original: str) -> list[str]:
    q = original.strip()
    lower = q.lower()
    variants = [q]
    if lower.startswith('what is '):
        variants.append(q[8:].strip())
    if lower.startswith('who is '):
        variants.append(q[7:].strip())
    if lower.startswith('define '):
        variants.append(q[7:].strip())
    # Disaster-aware query hints without embedding any content
    hazard_hints = [
        ('earthquake', ['earthquake safety', 'drop cover hold on', 'earthquake preparedness']),
        ('flood', ['flood safety', 'flood preparedness']),
        ('fire', ['fire safety', 'home fire safety']),
        ('tsunami', ['tsunami safety', 'tsunami evacuation']),
        ('cyclone', ['cyclone safety', 'storm safety']),
        ('hurricane', ['hurricane safety', 'storm preparedness']),
        ('landslide', ['landslide safety']),
    ]
    for key, hints in hazard_hints:
        if key in lower:
            variants.extend(hints)
    return [v for v in variants if v]

def _normalize_text(text: str) -> str:
    # Remove references, tables and excessive whitespace
    text = re.sub(r"\[[0-9]+\]", "", text)
    text = re.sub(r"\{|\}|\|", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def _chunk_text(text: str, max_chars: int = 1800, overlap: int = 200) -> list[str]:
    chunks = []
    start = 0
    n = len(text)
    while start < n:
        end = min(start + max_chars, n)
        chunk = text[start:end]
        chunks.append(chunk)
        if end == n:
            break
        start = max(0, end - overlap)
    return chunks

def fetch_wikipedia_contexts(query: str, max_pages: int = 3, max_chars_per_page: int = 3000):
    wikipedia.set_lang('en')
    contexts = []
    try:
        titles = []
        # Direct page hints for common entities (no embedded content)
        direct_map = {
            'earthquake': 'Earthquake',
            'flood': 'Flood',
            'fire': 'Fire',
            'tsunami': 'Tsunami',
            'cyclone': 'Tropical cyclone',
            'hurricane': 'Hurricane',
            'landslide': 'Landslide',
        }
        lower_q = query.strip().lower()
        for key, title in direct_map.items():
            if key in lower_q:
                titles = [title]
                break
        for variant in _refine_query(query):
            try:
                if not titles:
                    titles = wikipedia.search(variant, results=max_pages)
                    if titles:
                        break
            except Exception:
                continue
        if not titles:
            titles = wikipedia.search(query, results=max_pages)
        for title in titles:
            try:
                cached = _load_cached_page(title)
                if cached:
                    content = cached
                else:
                    try:
                        page = wikipedia.page(title, auto_suggest=False, preload=True)
                    except DisambiguationError as de:
                        # pick the first option as a simple heuristic
                        option = de.options[0] if de.options else title
                        page = wikipedia.page(option, auto_suggest=True, preload=True)
                    except PageError:
                        page = wikipedia.page(title, auto_suggest=True, preload=True)
                    # Prefer summary, fallback to content
                    try:
                        summary = wikipedia.summary(page.title, sentences=12, auto_suggest=False)
                    except Exception:
                        summary = ''
                    content = summary or getattr(page, 'content', '') or ''
                    if content:
                        _save_cached_page(title, content)
                if not content:
                    continue
                content = _normalize_text(content)
                snippet = content[:max_chars_per_page]
                contexts.append((f"Wikipedia: {title}\n{snippet}", title))
            except Exception as inner_e:
                current_app.logger.debug(f"Skip page {title}: {inner_e}")
    except Exception as we:
        current_app.logger.warning(f"Wikipedia search failed: {we}")
    return contexts

# Mounted under `/api` from the parent blueprint, so this endpoint becomes `/api/chatbot`.
@chatbot_bp.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    question = (data or {}).get('question', '').strip()
    if not question:
        return jsonify({'error': 'Question is required.'}), 400
    try:
        qa = get_qa_model()

        # Build candidate contexts strictly from Wikipedia
        candidate_contexts = fetch_wikipedia_contexts(question, max_pages=3, max_chars_per_page=3000)

        # Run QA across candidates, pick the highest score
        best_answer = None
        best_score = -1.0
        best_source = None
        for ctx, src in candidate_contexts:
            try:
                # Evaluate across chunks for long contexts
                header, text = ctx.split('\n', 1) if '\n' in ctx else ('', ctx)
                for chunk in _chunk_text(text, max_chars=1600, overlap=200):
                    res = qa(question=question, context=chunk)
                    score = float(res.get('score', 0.0))
                    if score > best_score:
                        best_score = score
                        best_answer = res.get('answer', '')
                        best_source = src
            except Exception as e_ctx:
                current_app.logger.debug(f"QA failed for source {src}: {e_ctx}")

        # Always return best model answer if any context was evaluated
        if best_answer is not None:
            return jsonify({
                'question': question,
                'answer': best_answer,
                'score': best_score,
                'source': best_source,
                'model': 'distilbert-base-uncased-distilled-squad'
            })

        # If we had no contexts (e.g., search failed), try a direct summary as context
        try:
            summary = wikipedia.summary(question, sentences=8, auto_suggest=True)
            res = qa(question=question, context=summary)
            return jsonify({
                'question': question,
                'answer': res.get('answer', ''),
                'score': float(res.get('score', 0.0)),
                'source': 'Wikipedia summary',
                'model': 'distilbert-base-uncased-distilled-squad'
            })
        except Exception:
            pass

        return jsonify({'error': 'Unable to find an answer from available context.'}), 422
    except Exception as e:
        current_app.logger.exception("Chatbot processing failed")
        return jsonify({'error': 'Internal error running QA', 'details': str(e)}), 500

