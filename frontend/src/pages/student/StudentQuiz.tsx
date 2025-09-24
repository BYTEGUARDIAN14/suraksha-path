import React from 'react';
import { api } from '@/api/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

export default function StudentQuiz() {
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = React.useState<Record<number, number>>({});
  const [leaderboard, setLeaderboard] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const qs = await api('/quizzes');
        if (mounted) setQuestions(qs || []);
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
      const payload = {
        answers: Object.entries(answers).map(([qid, idx]) => ({ quiz_id: Number(qid), selected_index: Number(idx) })),
      };
      const res = await api('/quizzes/submit', { method: 'POST', body: JSON.stringify(payload) });
      setMessage(`Submitted. Score: ${res?.score ?? 'N/A'}`);
      const lb = await api('/leaderboard');
      setLeaderboard(lb || []);
    } catch (e: any) {
      setMessage(e?.message || 'Submit failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="p-4">Loading quiz…</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preparedness Quiz</CardTitle>
          <CardDescription>Answer the questions and submit to see your score.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.length === 0 && (
            <div>No questions available.</div>
          )}
          {questions.map((q) => (
            <div key={q.id} className="border p-3 rounded-md bg-white">
              <div className="font-medium mb-2">{q.question}</div>
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[q.id] === idx}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <Button onClick={submit} disabled={submitting}>{submitting ? 'Submitting…' : 'Submit'}</Button>
          {message && <div className="text-sm text-blue-700">{message}</div>}
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


