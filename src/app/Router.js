// Router.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Corrected Paths (all paths now correctly go up one level to 'src' then down to their respective directories)
import LoginPage from '../features/auth/pages/LoginPage';
import SignupPage from '../features/auth/pages/SignupPage';
import HomePage from './HomePage';
import App from './App';

import BehaviorLogScreen from '../features/adult/pages/BehaviorLogScreen';
import ParentEduScreen from '../features/adult/pages/ParentEduScreen';
import PlayScreen from '../features/adult/pages/PlayScreen';
import StatsScreen from '../features/adult/pages/StatsScreen';
import ShopScreen from '../features/adult/pages/ShopScreen';
import CustomScreen from '../features/adult/pages/CustomScreen';
import AchievementScreen from '../features/adult/pages/AchievementScreen'; // AchievementScreen 임포트 추가

import BottomNavigation from '../components/BottomNavigation';
import ThirdGamePage from '../features/thirdgame/pages/ThirdGamePage';
import FirstGamePage from '../features/firstgame/pages/FirstGamePage';
import SecondGamePage from '../features/secondgame/pages/SecondGamePage';

function AppRouter() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

function MainRoutes() {
  const navigate = useNavigate();

  const handleNavClick = (screen) => {
    navigate(`/${screen}`);
  };

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

      {/* 홈 화면 (하단바 포함) */}
      <Route
        path="/homepage"
        element={withBottomNav(HomePage, 'home')}
      />

      {/* 행동 기록 화면 (하단바 포함) */}
      <Route
        path="/behaviorLog"
        element={withBottomNav(BehaviorLogScreen, 'behaviorLog')}
      />

      {/* 게임 화면 추가 (하단바 제외) */}
      <Route path="/firstgame" element={<FirstGamePage />} />
      <Route path="/secondgame" element={<SecondGamePage />} />

      {/* 부모 교육 화면 (하단바 포함) */}
      <Route
        path="/parentEdu"
        element={withBottomNav(ParentEduScreen, 'parentEdu')}
      />

      {/* 플레이 화면 (하단바 제외) */}
      <Route
        path="/play"
        element={<PlayScreen onNavClick={handleNavClick} currentScreen={'play'} />}
      />

      {/* 통계 화면 (하단바 포함) */}
      <Route
        path="/stats"
        element={withBottomNav(StatsScreen, 'stats')}
      />

      {/* 상점 화면 (하단바 제외) */}
      <Route
        path="/shop"
        element={<ShopScreen onNavClick={handleNavClick} currentScreen={'shop'} />}
      />

      {/* 커스텀 화면 (하단바 제외) - CustomScreen만 직접 렌더링 */}
      <Route
        path="/custom"
        element={<CustomScreen onNavClick={handleNavClick} currentScreen={'custom'} />}
      />

      {/* 업적 화면 (하단바 제외) - AchievementScreen 추가 */}
      <Route
        path="/achievement"
        element={<AchievementScreen onNavClick={handleNavClick} currentScreen={'achievement'} />}
      />

      {/* 카드 게임 화면 */}
      <Route path="/cardgame" element={<ThirdGamePage />} />

      {/* 기본 경로 */}
      <Route path="/" element={<App />} />
    </Routes>
  );
}

export default AppRouter;