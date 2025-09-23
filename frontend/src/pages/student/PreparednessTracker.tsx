import React from 'react';
import { api } from '@/api/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';

export default function PreparednessTracker() {
  const [score, setScore] = React.useState<number | null>(null);
  const [history, setHistory] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const s = await api('/preparedness');
        setScore(s?.preparedness_score ?? 0);
        const h = await api('/scores/me');
        setHistory(h || []);
      } catch (e: any) {
        setError(e?.message || 'Failed to load preparedness data');
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preparedness Score</CardTitle>
          <CardDescription>Your overall readiness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 text-sm">{score ?? 0}%</div>
          <Progress value={score ?? 0} max={100} variant="primary" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quiz & Drill History</CardTitle>
          <CardDescription>Recent activities</CardDescription>
        </CardHeader>
        <CardContent>
          {history.length === 0 && <div className="text-sm text-gray-600">No history yet.</div>}
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="flex justify-between text-sm border-b py-2">
                <span>Quiz #{h.quiz_id}</span>
                <span>{h.score}</span>
                <span>{new Date(h.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
          {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
}


