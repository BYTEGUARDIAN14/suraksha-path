import React from 'react';
import { api } from '@/api/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DrillInstructions() {
  const [drills, setDrills] = React.useState<any[]>([]);
  const [msg, setMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await api('/drills');
        setDrills(res || []);
      } catch (e: any) {
        setMsg(e?.message || 'Failed to load drills');
      }
    })();
  }, []);

  async function markParticipate(id: number) {
    try {
      await api('/drills/participate', { method: 'POST', body: JSON.stringify({ drill_id: id }) });
      setMsg('Marked as completed');
    } catch (e: any) {
      setMsg(e?.message || 'Action failed');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drill Instructions</CardTitle>
        <CardDescription>Follow the steps and mark completion.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {drills.map((d) => (
          <div key={d.id} className="border rounded-md p-3 bg-white">
            <div className="font-medium">{d.disaster_type}</div>
            <ol className="list-decimal ml-5 text-sm mt-2 space-y-1">
              {Object.values(d.steps || {}).map((s: any, i: number) => (
                <li key={i}>{String(s)}</li>
              ))}
            </ol>
            <Button className="mt-3" onClick={() => markParticipate(d.id)}>Mark Completed</Button>
          </div>
        ))}
        {msg && <div className="text-sm text-blue-700">{msg}</div>}
      </CardContent>
    </Card>
  );
}


