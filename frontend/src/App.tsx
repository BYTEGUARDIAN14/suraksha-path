import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/state/auth';

// Layout Components
import Navbar from '@/components/layout/Navbar';

// Pages
import Homepage from '@/pages/Homepage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import StudentDashboard from '@/pages/StudentDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import StudentLayout from '@/pages/StudentLayout';
import AdminLayout from '@/pages/AdminLayout';
import StudentQuiz from '@/pages/student/StudentQuiz';
import DrillInstructions from '@/pages/student/DrillInstructions';
import PreparednessTracker from '@/pages/student/PreparednessTracker';
import Profile from '@/pages/student/Profile';
import Feedback from '@/pages/student/Feedback';
import History from '@/pages/student/History';
import SendAlerts from '@/pages/admin/SendAlerts';
import ManageDrillsQuizzes from '@/pages/admin/ManageDrillsQuizzes';
import ManageContacts from '@/pages/admin/ManageContacts';
import Assistant from '@/pages/admin/Assistant';
import Analytics from '@/pages/admin/Analytics';
import Resources from '@/pages/Resources';
import FeatureDetail from '@/pages/FeatureDetail';

// Components
import Chatbot from '@/components/Chatbot';

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} />
            ) : (
              <Login />
            )
          } />
          <Route path="/register" element={
            user ? (
              <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} />
            ) : (
              <Register />
            )
          } />
          <Route path="/resources" element={<Resources />} />
          <Route path="/features" element={<Navigate to="/#features" />} />
          <Route path="/features/:slug" element={<FeatureDetail />} />

          {/* Protected Student Routes */}
          <Route path="/student" element={
            !user ? <Navigate to="/login" /> :
            user.role === 'student' ? <StudentLayout /> :
            <Navigate to="/admin/dashboard" />
          }>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="quiz" element={<StudentQuiz />} />
            <Route path="drill-instructions" element={<DrillInstructions />} />
            <Route path="tracker" element={<PreparednessTracker />} />
            <Route path="profile" element={<Profile />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="history" element={<History />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            !user ? <Navigate to="/login" /> :
            user.role === 'admin' ? <AdminLayout /> :
            <Navigate to="/student/dashboard" />
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="alerts" element={<SendAlerts />} />
            <Route path="manage" element={<ManageDrillsQuizzes />} />
            <Route path="contacts" element={<ManageContacts />} />
            <Route path="assistant" element={<Assistant />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Global Components */}
      <Chatbot />
      {/* Removed global Alert hover card */}
    </div>
  );
}