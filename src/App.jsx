import { useState } from 'react';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BursaryDashboard from './pages/BursaryDashboard';

export default function App() {
  const [currentRole, setCurrentRole] = useState(null);

  if (!currentRole) {
    return <Login onLoginSuccess={(role) => setCurrentRole(role)} />;
  }

  switch (currentRole) {
    case 'student':
      return <StudentDashboard onLogout={() => setCurrentRole(null)} />;
    case 'parent':
      return <ParentDashboard onLogout={() => setCurrentRole(null)} />;
    case 'teacher':
      return <TeacherDashboard onLogout={() => setCurrentRole(null)} />;
    case 'admin':
      return <AdminDashboard onLogout={() => setCurrentRole(null)} />;
    case 'bursary':
      return <BursaryDashboard onLogout={() => setCurrentRole(null)} />;
    default:
      return <Login onLoginSuccess={(role) => setCurrentRole(role)} />;
  }
}