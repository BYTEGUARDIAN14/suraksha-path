from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from sqlalchemy import func
from ..extensions import db
from ..models import Quiz, Score
from . import api_bp


@api_bp.get("/quizzes")
# removed @jwt_required(optional=True) to tolerate stale tokens on optional access
def list_quizzes():
    quizzes = db.session.scalars(db.select(Quiz).order_by(Quiz.created_at.desc())).all()
    def normalize_questions(qobj: dict) -> list[dict]:
        # Supports formats: {"questions": [{"q", "a", "correct"}, ...]} or already normalized
        raw = qobj.get("questions") if isinstance(qobj, dict) else None
        if isinstance(raw, list) and raw and isinstance(raw[0], dict) and "q" in raw[0]:
            out = []
            for i, item in enumerate(raw, 1):
                out.append({"id": i, "question": item.get("q"), "options": item.get("a", []), "correct": item.get("correct", 0)})
            return out
        # Fallback: return as-is if already {id, question, options, correct}
        if isinstance(raw, list):
            return raw  # type: ignore
        return []
    return jsonify([
        {"id": q.id, "title": q.title, "disaster_type": q.disaster_type, "questions": normalize_questions(q.questions)}
        for q in quizzes
    ])


@api_bp.post("/quizzes/submit")
@jwt_required()
def submit_quiz():
    identity = get_jwt()
    sub = identity.get("sub")
    user_id = int(sub) if isinstance(sub, str) and sub.isdigit() else identity.get("id")
    data = request.get_json() or {}
    quiz_id = data.get("quiz_id")
    score_value = data.get("score")
    if not quiz_id or score_value is None:
        return jsonify({"error": "quiz_id and score required"}), 400
    score = Score(user_id=user_id, quiz_id=quiz_id, score=score_value)
    db.session.add(score)
    db.session.commit()
    return jsonify({"message": "Score submitted"})


@api_bp.get("/leaderboard")
def leaderboard():
    # Top scores aggregated per user
    stmt = (
        db.select(Score.user_id, func.max(Score.score).label("best"))
        .group_by(Score.user_id)
        .order_by(func.max(Score.score).desc())
        .limit(20)
    )
    rows = db.session.execute(stmt).all()
    return jsonify([{"user_id": r.user_id, "best": r.best} for r in rows])

