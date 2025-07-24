import React, { useState } from 'react';
// ShopScreen의 스타일을 위한 CSS 파일입니다.
import '../../../styles/ShopScreen.css';
// PlayScreen의 하단 버튼 섹션과 동일한 스타일을 사용하기 위해 import
import '../../../styles/PlayScreen.css'; // Add this line to import PlayScreen's CSS

/**
 * ShopScreen 컴포넌트는 테마와 캐릭터를 구매할 수 있는 상점 페이지를 렌더링합니다.
 * '테마'와 '캐릭터' 탭을 통해 다른 콘텐츠를 표시하며, 각 아이템은 포인트를 가집니다.
 *
 * @param {object} props - 컴포넌트 속성
 * @param {function} props.onNavClick - 네비게이션 클릭 핸들러 (하단 메뉴바와 연동 시 사용)
 * @param {string} props.currentScreen - 현재 화면 이름 (하단 메뉴바와 연동 시 사용)
 */
function ShopScreen({ onNavClick, currentScreen }) {
  // 현재 활성화된 탭을 관리하는 상태 ('theme' 또는 'character')
  const [activeTab, setActiveTab] = useState('theme'); // 기본값은 '테마'
  const [selectedItem, setSelectedItem] = useState(null); // New state for selected item
  // 임시 사용자 데이터
  const [userPoints, setUserPoints] = useState(1500); // Make userPoints stateful for updates
  const userName = "유저이름";


  // 테마 아이템 데이터 (임시)
  const themeItems = [
    { id: 1, image: 'https://placehold.co/150x100/e0f7fa/000?text=Theme1', points: 1000, name: '테마 1' },
    { id: 2, image: 'https://placehold.co/150x100/e8f5e9/000?text=Theme2', points: 1500, name: '테마 2' },
    { id: 3, image: 'https://placehold.co/150x100/ffe0b2/000?text=Theme3', points: 1000, name: '테마 3' },
    { id: 4, image: 'https://placehold.co/150x100/ffcdd2/000?text=Theme4', points: 1500, name: '테마 4' },
  ];

  // 캐릭터 아이템 데이터 (임시)
  const characterItems = [
    { id: 1, image: 'https://placehold.co/100x100/c8e6c9/000?text=Char1', points: 50, name: '캐릭터 1' },
    { id: 2, image: 'https://placehold.co/100x100/bbdefb/000?text=Char2', points: 100, name: '캐릭터 2' },
    { id: 3, image: 'https://placehold.co/100x100/ffccbc/000?text=Char3', points: 150, name: '캐릭터 3' },
    { id: 4, image: 'https://placehold.co/100x100/d1c4e9/000?text=Char4', points: 50, name: '캐릭터 4' },
    { id: 5, image: 'https://placehold.co/100x100/fff9c4/000?text=Char5', points: 100, name: '캐릭터 5' },
    { id: 6, image: 'https://placehold.co/100x100/b2dfdb/000?text=Char6', points: 150, name: '캐릭터 6' },
  ];

  // Function to handle item click
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // Function to handle purchase (for demonstration)
  const handlePurchase = () => {
    if (selectedItem) {
      if (userPoints >= selectedItem.points) {
        setUserPoints(prevPoints => prevPoints - selectedItem.points);
        alert(`${selectedItem.name}을(를) ${selectedItem.points} 포인트로 구매했습니다! 남은 포인트: ${userPoints - selectedItem.points}`);
        setSelectedItem(null); // Close modal after successful purchase
      } else {
        alert(`포인트가 부족합니다! 현재 포인트: ${userPoints}, 필요 포인트: ${selectedItem.points}`);
      }
    }
  };

  return (
    <div className="shop-screen-container">
      {/* 상단 헤더 섹션 */}
      <header className="shop-header">
        <div className="user-info">
          <span className="username">{userName}</span>
          <span className="points">{userPoints} Point</span>
        </div>
      </header>

      {/* 탭 네비게이션 섹션 */}
      <section className="tab-navigation-section">
        <button
          className={`tab-button ${activeTab === 'theme' ? 'active' : ''}`}
          onClick={() => setActiveTab('theme')}
        >
          테마
        </button>
        <button
          className={`tab-button ${activeTab === 'character' ? 'active' : ''}`}
          onClick={() => setActiveTab('character')}
        >
          캐릭터
        </button>
      </section>

      {/* 메인 콘텐츠 영역 */}
      <main className="shop-content">
        {activeTab === 'theme' && (
          <div className="theme-grid">
            {themeItems.map(item => (
              <div key={item.id} className="shop-item theme-item" onClick={() => handleItemClick(item)}>
                <img src={item.image} alt={`Theme ${item.id}`} className="item-image" />
                <span className="item-points">{item.points} point</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'character' && (
          <div className="character-grid">
            {characterItems.map(item => (
              <div key={item.id} className="shop-item character-item" onClick={() => handleItemClick(item)}>
                <img src={item.image} alt={`Character ${item.id}`} className="item-image" />
                <span className="item-points">{item.points} point</span>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedItem.name}</h2>
            <img src={selectedItem.image} alt={selectedItem.name} className="modal-item-image" />
            <p className="modal-item-points">{selectedItem.points} Point</p>
            <div className="modal-actions">
              <button className="modal-button cancel-button" onClick={handleCloseModal}>취소</button>
              <button className="modal-button purchase-button" onClick={handlePurchase}>구매</button>
            </div>
          </div>
        </div>
      )}

      {/* 하단 메뉴바 - PlayScreen과 동일한 구조와 스타일 재사용 */}
      <section className="bottom-buttons-section">
        <button className="action-button" onClick={() => onNavClick('homepage')}>
          <span className="button-icon">🏠</span> {/* 예시 아이콘 */}
          <span className="button-text">홈</span>
        </button>
        <button className="action-button primary-action" onClick={() => onNavClick('play')}>
          <span className="button-icon">▶️</span> {/* 예시 아이콘 */}
          <span className="button-text">놀이</span>
        </button>
        <button className="action-button" onClick={() => onNavClick('shop')}>
          <span className="button-icon">⭐</span> {/* 예시 아이콘 */}
          <span className="button-text">상점</span>
        </button>
      </section>
    </div>
  );
}

export default ShopScreen;