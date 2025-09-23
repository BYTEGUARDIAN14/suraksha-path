import React from 'react';
import { api } from '@/api/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ManageContacts() {
  const [contacts, setContacts] = React.useState<any[]>([]);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [status, setStatus] = React.useState<string | null>(null);

  async function load() {
    try { setContacts(await api('/contacts')); } catch {}
  }
  React.useEffect(() => { load(); }, []);

  async function add() {
    try {
      await api('/contacts', { method: 'POST', body: JSON.stringify({ name, phone }) });
      setName(''); setPhone(''); setStatus('Added');
      load();
    } catch (e: any) { setStatus(e?.message || 'Failed'); }
  }

  async function del(id: number) {
    try { await api(`/contacts/${id}`, { method: 'DELETE' }); load(); } catch {}
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contacts</CardTitle>
        <CardDescription>Manage contact list</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" placeholder="Name" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 rounded" placeholder="Phone" />
          <Button onClick={add}>Add</Button>
        </div>
        {status && <div className="text-sm text-blue-700 mb-2">{status}</div>}
        <div className="space-y-2">
          {contacts.map((c: any) => (
            <div key={c.id} className="flex justify-between text-sm border-b py-2">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-gray-500">{c.phone}</div>
              </div>
              <Button variant="outline" onClick={() => del(c.id)}>Delete</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


