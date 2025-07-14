import React from 'react';
import '../../../styles/ParentEduScreen.css'; // 화면 스타일을 위한 CSS 파일입니다.
import BottomNavigation from '../../../components/BottomNavigation';

// 아이콘을 위한 임시 placeholder
const GearIcon = () => <span role="img" aria-label="settings">⚙️</span>;
const HomeIcon = () => <span role="img" aria-label="home">🏠</span>;
const PencilIcon = () => <span role="img" aria-label="pencil">✏️</span>;
const PlayIcon = () => <span role="img" aria-label="play">▶️</span>;
const BookIcon = () => <span role="img" aria-label="book">📚</span>;
const ChartIcon = () => <span role="img" aria-label="chart">📊</span>;

function ParentEduScreen({ onNavClick, currentScreen }) {
  // 추천 교육 콘텐츠 데이터 (임시)
  const recommendedEducations = [
    {
      id: 1,
      image: 'https://via.placeholder.com/100x80?text=Edu1',
      title: '자폐 스펙트럼 자녀와 소통하는 법',
      description: '일상에서 적용할 수 있는 효과적인 소통 전략을 배워보세요.',
      progress: 70, // 진행률 (선택 사항)
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100x80?text=Edu2',
      title: '발달 지연 아동을 위한 놀이 치료',
      description: '전문가가 추천하는 놀이 방법을 통해 발달을 촉진합니다.',
      progress: 40,
    },
    // 더 많은 추천 콘텐츠를 추가할 수 있습니다.
  ];

  // 교육 카테고리 데이터 (임시)
  const educationCategories = [
    { id: 1, title: '자폐증', icon: '🧠' },
    { id: 2, title: '상호작용', icon: '🤝' },
    { id: 3, title: '발달지연', icon: '🌱' },
    { id: 4, title: '중증장애', icon: '💖' },
    { id: 5, title: '정서행동', icon: '😊' },
    { id: 6, title: '언어발달', icon: '🗣️' },
    // 더 많은 카테고리를 추가할 수 있습니다.
  ];

  return (
    <div className="parent-edu-screen-container">
      {/* 헤더 */}
      <header className="parent-edu-header">
        <h1 className="logo">부모 교육</h1>
        <div className="header-right">
          <GearIcon className="settings-icon" />
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="parent-edu-content">
        {/* 추천 교육 콘텐츠 섹션 */}
        <section className="recommended-edu-section card">
          <div className="card-header">
            <h3>추천 교육</h3>
            <span className="view-all-text">모두 보기 &gt;</span>
          </div>
          <div className="recommended-edu-list">
            {recommendedEducations.map(edu => (
              <div key={edu.id} className="recommended-edu-item">
                <img src={edu.image} alt={edu.title} className="edu-item-image" />
                <div className="edu-item-details">
                  <h4 className="edu-item-title">{edu.title}</h4>
                  <p className="edu-item-description">{edu.description}</p>
                  {edu.progress !== undefined && (
                    <div className="edu-progress">
                      <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${edu.progress}%` }}></div>
                      </div>
                      <span className="progress-text">{edu.progress}% 완료</span>
                    </div>
                  )}
                  <button className="start-edu-button">시작하기</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 교육 카테고리 섹션 */}
        <section className="edu-categories-section card">
          <div className="card-header">
            <h3>교육 카테고리</h3>
            <span className="view-all-text">모두 보기 &gt;</span>
          </div>
          <div className="edu-categories-grid">
            {educationCategories.map(category => (
              <div key={category.id} className="edu-category-item">
                <span className="category-icon">{category.icon}</span>
                <span className="category-title">{category.title}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 기존 하단 네비게이션 바 유지 */}
      {/*<BottomNavigation onNavClick={onNavClick} currentScreen={currentScreen} />*/}
    </div>
  );
}

export default ParentEduScreen;