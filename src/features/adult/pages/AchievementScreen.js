// src/components/screens/AchievementScreen.js

import React from 'react';
import '../../../styles/AchievementScreen.css'; // 새로 생성할 CSS 파일 임포트
import { ArrowLeft } from 'lucide-react'; // 뒤로 가기 아이콘

/**
 * AchievementScreen 컴포넌트는 업적 페이지의 UI를 렌더링합니다.
 */
function AchievementScreen({ onNavClick }) {
  // 임시 업적 데이터 (실제 데이터는 API 호출 등을 통해 가져올 수 있습니다)
  const achievements = [
    { id: 1, name: '첫 걸음', description: '게임을 처음 플레이했습니다.', completed: true },
    { id: 2, name: '탐험가', description: '모든 단계를 탐험했습니다.', completed: false },
    { id: 3, name: '컬렉터', description: '모든 아이템을 수집했습니다.', completed: false },
    { id: 4, name: '베테랑', description: '게임을 10회 이상 플레이했습니다.', completed: true },
  ];

  return (
    <div className="achievement-screen-container">
      <header className="achievement-header">
        <ArrowLeft
          className="back-icon"
          onClick={() => onNavClick('play')} // 'play' 화면으로 돌아가기
          style={{ cursor: 'pointer' }}
        />
        <h2>내 업적</h2>
        <div></div> {/* 오른쪽 정렬을 위한 빈 div */}
      </header>

      <main className="achievement-content">
        {achievements.length > 0 ? (
          <ul className="achievement-list">
            {achievements.map((achievement) => (
              <li key={achievement.id} className={`achievement-item ${achievement.completed ? 'completed' : ''}`}>
                <div className="achievement-info">
                  <h3>{achievement.name}</h3>
                  <p>{achievement.description}</p>
                </div>
                {achievement.completed ? (
                  <span className="achievement-status completed">달성 완료 🎉</span>
                ) : (
                  <span className="achievement-status pending">미달성</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-achievements">아직 달성한 업적이 없습니다.</p>
        )}
      </main>
    </div>
  );
}

export default AchievementScreen;