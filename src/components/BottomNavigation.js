// src/components/BottomNavigation.js
import React from 'react';
import '../styles/BottomNavigation.css'; // 새로 생성할 CSS 파일 임포트

// 아이콘을 위한 임시 placeholder (실제 앱에서는 react-icons 같은 라이브러리 사용 권장)
const HomeIcon = () => <span role="img" aria-label="home">🏠</span>;
const PencilIcon = () => <span role="img" aria-label="pencil">✏️</span>;
const PlayIcon = () => <span role="img" aria-label="play">▶️</span>;
const BookIcon = () => <span role="img" aria-label="book">📚</span>;
const ChartIcon = () => <span role="img" aria-label="chart">📊</span>; // 통계 아이콘

function BottomNavigation({ onNavClick, currentScreen }) {
  return (
    <footer className="bottom-nav-bar">
      <div
        className={`nav-item ${currentScreen === 'homepage' ? 'active' : ''}`}
        onClick={() => onNavClick('homepage')}
      >
        <HomeIcon />
        <span>홈</span>
      </div>
      <div
        className={`nav-item ${currentScreen === 'behaviorLog' ? 'active' : ''}`}
        onClick={() => onNavClick('behaviorLog')}
      >
        <PencilIcon />
        <span>훈련기록</span>
      </div>
      <div className="nav-item play-button-wrapper">
        <div
          className={`play-button-large ${currentScreen === 'play' ? 'active' : ''}`}
          onClick={() => onNavClick('play')}
        >
          <PlayIcon />
        </div>
      </div>
      <div
        className={`nav-item ${currentScreen === 'parentEdu' ? 'active' : ''}`}
        onClick={() => onNavClick('parentEdu')}
      >
        <BookIcon />
        <span>부모교육</span>
      </div>
      <div
        className={`nav-item ${currentScreen === 'stats' ? 'active' : ''}`}
        onClick={() => onNavClick('stats')}
      >
        <ChartIcon />
        <span>통계</span>
      </div>
    </footer>
  );
}

export default BottomNavigation;