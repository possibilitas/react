import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import HomePage from './HomePage'; // HomePage 컴포넌트 임포트
import App from './App'; // App 컴포넌트 임포트

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage />} /> {/* 기본 경로를 HomePage로 설정 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;