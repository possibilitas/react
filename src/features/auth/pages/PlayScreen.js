import React from 'react';
import '../../../styles/PlayScreen.css'; // 화면 스타일을 위한 CSS 파일입니다.
import BottomNavigation from '../../../components/BottomNavigation';

// 아이콘을 위한 임시 placeholder (실제 앱에서는 react-icons 같은 라이브러리 사용 권장)
const GearIcon = () => <span role="img" aria-label="settings">⚙️</span>;
const HomeIcon = () => <span role="img" aria-label="home">🏠</span>;
const PencilIcon = () => <span role="img" aria-label="pencil">✏️</span>;
const PlayIcon = () => <span role="img" aria-label="play">▶️</span>;
const BookIcon = () => <span role="img" aria-label="book">📚</span>;
const ChartIcon = () => <span role="img" aria-label="chart">📊</span>;

function PlayScreen({ onNavClick, currentScreen }) {
  // 오늘의 추천 플레이 데이터 (임시)
  const recommendedPlays = [
    {
      id: 1,
      image: 'https://via.placeholder.com/100x80?text=Play1', // 이미지 URL
      title: '놀이를 통해 배우는 정서 표현',
      description: '부정적인 감정을 놀이로 극복하는 방법을 알려줍니다.',
      age: '4~6세 추천',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100x80?text=Play2',
      title: '숫자를 익히는 즐거운 모험',
      description: '흥미진진한 게임으로 숫자를 쉽고 재미있게 배워요!',
      age: '5~7세 추천',
    },
    // 더 많은 추천 콘텐츠를 추가할 수 있습니다.
  ];

  // 플레이 모아보기 카테고리 데이터 (임시)
  const playCategories = [
    { id: 1, image: 'https://via.placeholder.com/80?text=Category1', title: '그림' },
    { id: 2, image: 'https://via.placeholder.com/80?text=Category2', title: '숫자' },
    { id: 3, image: 'https://via.placeholder.com/80?text=Category3', title: '동물' },
    { id: 4, image: 'https://via.placeholder.com/80?text=Category4', title: '가족' },
    { id: 5, image: 'https://via.placeholder.com/80?text=Category5', title: '색깔' },
    { id: 6, image: 'https://via.placeholder.com/80?text=Category6', title: '친구' },
    // 더 많은 카테고리를 추가할 수 있습니다.
  ];

  return (
    <div className="play-screen-container">
      {/* 헤더 */}
      <header className="play-header">
        <h1 className="logo">플레이</h1>
        <div className="header-right">
          <GearIcon className="settings-icon" />
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="play-content">
        {/* 프로필 요약 (HomeScreen과 유사하지만 더 간결하게) */}
        <section className="play-profile-summary">
          <div className="profile-image-wrapper">
            <img src="https://via.placeholder.com/80?text=Dino" alt="Profile character" className="profile-character" />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">은우우공룡</h2>
            <div className="level-info">
              <span className="level-text">LV.3</span>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* 오늘의 플레이 섹션 */}
        <section className="today-play-section card">
          <div className="card-header">
            <h3>오늘의 플레이</h3>
            <span className="view-all-text">모두 보기 &gt;</span>
          </div>
          <div className="recommended-plays-list">
            {recommendedPlays.map(play => (
              <div key={play.id} className="recommended-play-item">
                <img src={play.image} alt={play.title} className="play-item-image" />
                <div className="play-item-details">
                  <p className="play-item-age">{play.age}</p>
                  <h4 className="play-item-title">{play.title}</h4>
                  <p className="play-item-description">{play.description}</p>
                  <button className="start-play-button">시작하기</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 플레이 모아보기 섹션 */}
        <section className="view-all-play-section card">
          <div className="card-header">
            <h3>플레이 모아보기</h3>
            <span className="view-all-text">모두 보기 &gt;</span>
          </div>
          <div className="play-categories-grid">
            {playCategories.map(category => (
              <div key={category.id} className="play-category-item">
                <img src={category.image} alt={category.title} className="category-image" />
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

export default PlayScreen;