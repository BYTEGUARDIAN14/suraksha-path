import React from 'react';
import { api } from '@/api/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export default function StudentQuiz() {
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = React.useState<Record<number, number>>({});
  const [leaderboard, setLeaderboard] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState<{correct: boolean, idx: number} | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const response = await api('/quizzes');
        if (mounted && Array.isArray(response)) {
          // Flatten all quiz questions into a single array
          const allQuestions: QuizQuestion[] = [];
          response.forEach((quiz: any) => {
            if (quiz.questions && Array.isArray(quiz.questions)) {
              allQuestions.push(...quiz.questions);
            }
          });
          setQuestions(allQuestions);
        }
        const lb = await api('/leaderboard');
        if (mounted) setLeaderboard(lb || []);
      } catch (e: any) {
        setMessage(e?.message || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  async function submit() {
    setSubmitting(true);
    setMessage(null);
    try {
      // Compute score locally for the current quiz context
      const total = questions.length;
      const correct = questions.reduce((acc, q) => acc + ((answers[q.id] === q.correct) ? 1 : 0), 0);
      const percent = Math.round((correct / Math.max(total, 1)) * 100);

      // Submit score for the first quiz (assumes one active quiz context in UI)
      const firstQuizId = 1;
      const payload = { quiz_id: firstQuizId, score: percent };
      await api('/quizzes/submit', { method: 'POST', body: JSON.stringify(payload) });
      setMessage(`Submitted. Score: ${percent}%`);
      const lb = await api('/leaderboard');
      setLeaderboard(lb || []);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } catch (e: any) {
      setMessage(e?.message || 'Submit failed');
    } finally {
      setSubmitting(false);
    }
  }

  function handleAnswer(idx: number) {
    if (!questions[current]) return;
    const correctIdx = questions[current].correct;
    setAnswers((prev) => ({ ...prev, [questions[current].id]: idx }));
    setShowFeedback({ correct: idx === correctIdx, idx });
    setTimeout(() => {
      setShowFeedback(null);
      if (current < questions.length - 1) {
        setCurrent(current + 1);
      }
    }, 1000);
  }

  if (loading) return <div className="p-4">Loading quiz…</div>;
  if (!questions || questions.length === 0) return (
    <Card>
      <CardHeader>
        <CardTitle>Preparedness Quiz</CardTitle>
        <CardDescription>No questions available.</CardDescription>
      </CardHeader>
    </Card>
  );

  const q = questions[current];
  const total = questions.length;
  const answered = Object.keys(answers).length;
  const isLast = current === total - 1;
  const allAnswered = answered === total;
  
  if (!q) return (
    <Card>
      <CardHeader>
        <CardTitle>Preparedness Quiz</CardTitle>
        <CardDescription>Loading question...</CardDescription>
      </CardHeader>
    </Card>
  );

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={400} />}
      <Card>
        <CardHeader>
          <CardTitle>Preparedness Quiz</CardTitle>
          <CardDescription>Answer the questions and submit to see your score.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${((current + 1) / total) * 100}%` }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={q?.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="border p-3 rounded-md bg-white shadow animate-fade-in"
            >
              <div className="font-medium mb-2 text-lg">Q{current + 1}. {q?.question}</div>
              <div className="space-y-2">
                {q?.options?.map((opt, idx) => {
                  const selected = answers[q.id] === idx;
                  let feedbackColor = '';
                  if (showFeedback && showFeedback.idx === idx) {
                    feedbackColor = showFeedback.correct ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
                  } else if (selected) {
                    feedbackColor = 'bg-blue-100 border-blue-500';
                  }
                  return (
                    <motion.button
                      key={idx}
                      className={`w-full text-left flex items-center gap-2 text-sm border rounded-md px-3 py-2 transition-all duration-200 focus:outline-none ${feedbackColor}`}
                      whileTap={{ scale: 0.97 }}
                      disabled={showFeedback !== null || selected}
                      onClick={() => handleAnswer(idx)}
                      aria-pressed={selected}
                    >
                      <span className="flex-1">{opt}</span>
                      {selected && <span className="ml-2 text-blue-600">✓</span>}
                      {showFeedback && showFeedback.idx === idx && (
                        showFeedback.correct ? <span className="ml-2 text-green-600 font-bold">Correct!</span> : <span className="ml-2 text-red-600 font-bold">Wrong</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-4">
            <Button variant="secondary" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0 || showFeedback !== null}>Previous</Button>
            {isLast && allAnswered ? (
              <Button onClick={submit} disabled={submitting}>{submitting ? 'Submitting…' : 'Submit'}</Button>
            ) : (
              <Button variant="secondary" onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))} disabled={current === total - 1 || showFeedback !== null}>Next</Button>
            )}
          </div>
          {message && <div className="text-sm text-blue-700 mt-2">{message}</div>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
          <CardDescription>Top performers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard?.slice(0, 10).map((row: any, i: number) => (
              <div key={i} className="flex justify-between border-b py-2 text-sm">
                <span>{row?.name || row?.user || 'User'}</span>
                <span>{row?.score ?? '-'}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


