import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { InterviewProvider } from './context/InterviewContext';
import { DashboardLayout } from './components/layout/DashboardLayout';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/register';
import { Dashboard } from './pages/Dashboard';
import { InterviewSetup } from './pages/InterviewSetup';
import { Interview } from './pages/Interview';
import { InterviewResult } from './pages/InterviewResult';
import { QuestionBank } from './pages/QuestionBank';
import { InterviewHistory } from './pages/InterviewHistory';
import { Analytics } from './pages/Analytics';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InterviewProvider>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Standalone Interview Session */}
            <Route path="/interview/session" element={<Interview />} />

            {/* App Layout Pages */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/interview/setup" element={<InterviewSetup />} />
              <Route path="/interview/result/:id" element={<InterviewResult />} />
              <Route path="/questions" element={<QuestionBank />} />
              <Route path="/history" element={<InterviewHistory />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </InterviewProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}