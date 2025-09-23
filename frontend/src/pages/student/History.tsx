import React from 'react';
import { api } from '@/api/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function History() {
  const [alerts, setAlerts] = React.useState<any[]>([]);
  const [scores, setScores] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const a = await api('/alerts');
        setAlerts(a || []);
        const s = await api('/scores/me');
        setScores(s || []);
      } catch {}
    })();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Scores</CardTitle>
          <CardDescription>Recent quiz attempts</CardDescription>
        </CardHeader>
        <CardContent>
          {scores.map((s, i) => (
            <div key={i} className="flex justify-between text-sm border-b py-2">
              <span>Quiz #{s.quiz_id}</span>
              <span>{s.score}</span>
              <span>{new Date(s.date).toLocaleString()}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>Recent alerts (region aware if logged in)</CardDescription>
        </CardHeader>
        <CardContent>
          {alerts.map((a) => (
            <div key={a.id} className="flex justify-between text-sm border-b py-2">
              <span>{a.disaster_type}</span>
              <span>{a.message}</span>
              <span>{new Date(a.created_at).toLocaleString()}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}


