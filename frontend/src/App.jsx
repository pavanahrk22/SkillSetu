import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import ProfileUpload from './pages/ProfileUpload';
import LearnerDashboard from './pages/LearnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GapAnalysis from './pages/GapAnalysis';
import CourseRecommendations from './pages/CourseRecommendations';
import Assessment from './pages/Assessment';

import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-slate-50 text-gov-600">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login'} replace />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes inside Layout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<LearnerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<ProfileUpload />} />
          <Route path="/gaps" element={<GapAnalysis />} />
          <Route path="/courses" element={<CourseRecommendations />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/:id" element={<Assessment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
