import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { Container } from '@/components/layout/Container';

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="flex gap-6 py-6">
          <Sidebar
            title="Student"
            items={[
              { to: '/student/dashboard', label: 'Dashboard' },
              { to: '/student/quiz', label: 'Preparedness Quiz' },
              { to: '/student/drill-instructions', label: 'Drill Instructions' },
              { to: '/student/tracker', label: 'Preparedness Tracker' },
              { to: '/student/profile', label: 'Profile' },
              { to: '/student/feedback', label: 'Feedback' },
              { to: '/student/history', label: 'Quiz & Alert History' },
              { to: '/leaderboard', label: 'Leaderboard' },
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


