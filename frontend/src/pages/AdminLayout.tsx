import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { Container } from '@/components/layout/Container';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="flex gap-6 py-6">
          <Sidebar
            title="Admin"
            items={[
              { to: '/admin/dashboard', label: 'Dashboard' },
              { to: '/admin/alerts', label: 'Send Alerts' },
              { to: '/admin/manage', label: 'Manage Drills & Quizzes' },
              { to: '/admin/contacts', label: 'Emergency Contacts' },
              { to: '/admin/assistant', label: 'Safety Chatbox' },
              { to: '/admin/analytics', label: 'Analytics' },
              { to: '/resources', label: 'Safety PDFs' },
            ]}
          />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
}


