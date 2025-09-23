import React from 'react';
import { api } from '@/api/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ManageDrillsQuizzes() {
  const [drills, setDrills] = React.useState<any[]>([]);
  const [quizzes, setQuizzes] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        setDrills(await api('/drills'));
        setQuizzes(await api('/quizzes'));
      } catch {}
    })();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Drills</CardTitle>
          <CardDescription>Read-only stub (CRUD can be added)</CardDescription>
        </CardHeader>
        <CardContent>
          {drills?.map((d) => (
            <div key={d.id} className="flex justify-between border-b py-2 text-sm">
              <span>{d.disaster_type}</span>
              <span>{Object.keys(d.steps || {}).length} steps</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Quizzes</CardTitle>
          <CardDescription>Read-only stub (CRUD can be added)</CardDescription>
        </CardHeader>
        <CardContent>
          {quizzes?.map((q: any) => (
            <div key={q.id} className="flex justify-between border-b py-2 text-sm">
              <span>Q{q.id}</span>
              <span>{q.question}</span>
            </div>
          ))}
          <Button className="mt-3" variant="outline">Add New</Button>
        </CardContent>
      </Card>
    </div>
  );
}


