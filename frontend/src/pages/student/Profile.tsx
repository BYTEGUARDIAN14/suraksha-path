import React from 'react';
import { useAuth } from '@/state/auth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function Profile() {
  const { user } = useAuth();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Profile</CardTitle>
        <CardDescription>Basic account details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div><span className="text-gray-500">Name:</span> {user?.name}</div>
        <div><span className="text-gray-500">Email:</span> {user?.email}</div>
        <div><span className="text-gray-500">Role:</span> {user?.role}</div>
        <div><span className="text-gray-500">Region:</span> {user?.region}</div>
      </CardContent>
    </Card>
  );
}


