import React from 'react';
import { api } from '@/api/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SendAlerts() {
  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState('General');
  const [region, setRegion] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState<string | null>(null);

  async function send() {
    setStatus(null);
    try {
      await api('/alerts', { method: 'POST', body: JSON.stringify({ message, disaster_type: type, region }) });
      setStatus('Alert sent');
      setMessage('');
    } catch (e: any) {
      setStatus(e?.message || 'Failed to send alert');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Alerts</CardTitle>
        <CardDescription>Region-aware announcements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <input value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border p-2 rounded" placeholder="Alert message" />
        <div className="grid grid-cols-2 gap-3">
          <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
            <option>General</option>
            <option>Earthquake</option>
            <option>Flood</option>
            <option>Fire</option>
          </select>
          <input value={region || ''} onChange={(e) => setRegion(e.target.value || undefined)} className="border p-2 rounded" placeholder="Region (optional)" />
        </div>
        <Button onClick={send}>Send</Button>
        {status && <div className="text-sm text-blue-700">{status}</div>}
      </CardContent>
    </Card>
  );
}


