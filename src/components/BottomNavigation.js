import React from 'react';
import '../styles/BottomNavigation.css'; // 새로운 CSS 파일 임포트

function BottomNavigation() {
  return (
    <nav className="bottom-nav">
      <button>🏠 홈</button>
      <button>📊 분석</button>
      <button>📅 일정</button>
      <button>🙋 마이</button>
    </nav>
  );
}

export default BottomNavigation;
