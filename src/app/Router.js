import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import LoginPage from '../features/auth/pages/LoginPage';
import SignupPage from '../features/auth/pages/SignupPage'; // SignupPage 임포트 추가
import HomePage from './HomePage';
import App from './App';

import BehaviorLogScreen from '../features/auth/pages/BehaviorLogScreen';
import ParentEduScreen from '../features/auth/pages/ParentEduScreen';
import PlayScreen from '../features/auth/pages/PlayScreen';
import StatsScreen from '../features/auth/pages/StatsScreen';

import BottomNavigation from '../components/BottomNavigation';

function AppRouter() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

// useNavigate 사용을 위해 Router 내부에서 정의
function MainRoutes() {
  const navigate = useNavigate();

  const handleNavClick = (screen) => {
    navigate(`/${screen}`);
  };

  // 공통 레이아웃: 화면 + 하단바
  const withBottomNav = (Component, screenName) => (
    <>
      <Component onNavClick={handleNavClick} currentScreen={screenName} />
      <BottomNavigation onNavClick={handleNavClick} currentScreen={screenName} />
    </>
  );

  return (
    <Routes>
      {/* 로그인 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 회원가입 라우트 추가 */}
      <Route path="/signup" element={<SignupPage />} />

      {/* 홈 */}
      <Route
        path="/homepage"
        element={withBottomNav(HomePage, 'home')}
      />

      <Route
        path="/behaviorLog"
        element={withBottomNav(BehaviorLogScreen, 'behaviorLog')}
      />

      <Route
        path="/parentEdu"
        element={withBottomNav(ParentEduScreen, 'parentEdu')}
      />

      <Route
        path="/play"
        element={withBottomNav(PlayScreen, 'play')}
      />

      <Route
        path="/stats"
        element={withBottomNav(StatsScreen, 'stats')}
      />

      {/* 기본 경로 */}
      <Route path="/" element={<App />} />
    </Routes>
  );
}

export default AppRouter;