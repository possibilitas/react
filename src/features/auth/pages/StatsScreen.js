import React from 'react';
import '../../../styles/StatsScreen.css'; // 화면 스타일을 위한 CSS 파일입니다.
import BottomNavigation from '../../../components/BottomNavigation';

// 아이콘을 위한 임시 placeholder
const GearIcon = () => <span role="img" aria-label="settings">⚙️</span>;
const HomeIcon = () => <span role="img" aria-label="home">🏠</span>;
const PencilIcon = () => <span role="img" aria-label="pencil">✏️</span>;
const PlayIcon = () => <span role="img" aria-label="play">▶️</span>;
const BookIcon = () => <span role="img" aria-label="book">📚</span>;
const ChartIcon = () => <span role="img" aria-label="chart">📊</span>;

function StatsScreen({ onNavClick, currentScreen }) {
  // 통계 데이터 (임시)
  const statsSummary = {
    totalTrainingHours: 45,
    averageScore: 78,
    positiveBehaviors: 150,
    negativeBehaviors: 30,
    specialBehaviors: 10,
  };

  const weeklyTrainingData = [
    { day: '월', hours: 5 },
    { day: '화', hours: 7 },
    { day: '수', hours: 6 },
    { day: '목', hours: 8 },
    { day: '금', hours: 9 },
    { day: '토', hours: 10 },
    { day: '일', hours: 12 },
  ];

  return (
    <div className="stats-screen-container">
      {/* 헤더 */}
      <header className="stats-header">
        <h1 className="logo">𝒁𝒆𝒓𝒐𝑫𝒐𝒔𝒆</h1>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="stats-content">
        {/* 요약 정보 섹션 */}
        <section className="stats-summary-section card">
          <div className="card-header">
            <h3>활동 요약</h3>
          </div>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-value">{statsSummary.totalTrainingHours}시간</span>
              <span className="summary-label">총 훈련 시간</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">{statsSummary.averageScore}점</span>
              <span className="summary-label">평균 점수</span>
            </div>
          </div>
        </section>

        {/* 주간 훈련 시간 추이 (간단한 막대 그래프) */}
        <section className="weekly-training-chart-section card">
          <div className="card-header">
            <h3>주간 훈련 시간</h3>
          </div>
          <div className="chart-area">
            {/* 실제 차트 라이브러리를 사용하면 더 좋습니다. 여기서는 임시 막대 */}
            <div className="bar-chart-container">
              {weeklyTrainingData.map((data, index) => (
                <div key={index} className="bar-item">
                  <div className="bar-fill" style={{ height: `${data.hours * 8}px` }}></div> {/* 시간당 8px 가정 */}
                  <span className="bar-label">{data.day}</span>
                </div>
              ))}
            </div>
            <p className="chart-placeholder">
              (더 복잡한 차트를 위해 Recharts, Chart.js 라이브러리 사용 권장)
            </p>
          </div>
        </section>

        {/* 행동 유형별 빈도 (도넛 차트 placeholder) */}
        <section className="behavior-type-chart-section card">
          <div className="card-header">
            <h3>행동 유형별 빈도</h3>
          </div>
          <div className="chart-area donut-chart-placeholder-wrapper">
             <div className="donut-chart-placeholder">
                <span className="chart-label">긍정: {statsSummary.positiveBehaviors}</span>
                <span className="chart-label">부정: {statsSummary.negativeBehaviors}</span>
                <span className="chart-label">특이: {statsSummary.specialBehaviors}</span>
             </div>
             <p className="chart-placeholder">
              (다양한 행동 유형을 보여주는 도넛/파이 차트)
            </p>
          </div>
        </section>

        {/* 가장 많이 훈련한 영역 섹션 */}
        <section className="top-trained-areas-section card">
          <div className="card-header">
            <h3>가장 많이 훈련한 영역</h3>
          </div>
          <ul className="area-list">
            <li>정서 표현 (1위)</li>
            <li>자기 이해 (2위)</li>
            <li>상호작용 (3위)</li>
          </ul>
        </section>
      </main>

      {/* 기존 하단 네비게이션 바 유지 */}
      {/*<BottomNavigation onNavClick={onNavClick} currentScreen={currentScreen} />*/}
    </div>
  );
}

export default StatsScreen;