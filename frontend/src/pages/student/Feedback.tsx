import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Feedback() {
  const [text, setText] = React.useState('');
  const [msg, setMsg] = React.useState<string | null>(null);
  function submit() {
    // No backend endpoint stubbed yet
    setMsg('Feedback submitted. Thank you!');
    setText('');
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback</CardTitle>
        <CardDescription>Share feedback on drills/quizzes</CardDescription>
      </CardHeader>
      <CardContent>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full border rounded-md p-2" rows={5} placeholder="Your feedback" />
        <Button className="mt-3" onClick={submit}>Submit</Button>
        {msg && <div className="text-sm text-green-700 mt-2">{msg}</div>}
      </CardContent>
    </Card>
  );
}


