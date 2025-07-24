// src/components/screens/CustomScreen.js
import React, { useState } from 'react';
import { Settings, X } from 'lucide-react'; // X 아이콘 추가 (닫기 버튼용)
import '../../../styles/CustomScreen.css'; // 새로운 CSS 파일 임포트

/**
 * CustomScreen 컴포넌트는 사용자가 아이템을 커스터마이즈하고 선택할 수 있는 UI를 렌더링합니다.
 */
function CustomScreen({ onNavClick }) {
  // 예시 아이템 데이터 (실제 데이터는 API 호출 등으로 가져올 수 있습니다)
  const [items, setItems] = useState([
    { id: 1, name: '초록색 외투', type: '옷', imageUrl: '/assets/item1.png', price: 1000, isEquipped: false },
    { id: 2, name: '빨간색 모자', type: '모자', imageUrl: '/assets/item2.png', price: 500, isEquipped: false },
    { id: 3, name: '노란색 신발', type: '신발', imageUrl: '/assets/item3.png', price: 700, isEquipped: false },
    { id: 4, name: '파란색 바지', type: '옷', imageUrl: '/assets/item4.png', price: 800, isEquipped: false },
    { id: 5, name: '검은색 안경', type: '악세서리', imageUrl: '/assets/item5.png', price: 300, isEquipped: false },
  ]);

  // 현재 선택된 아이템 (착용 미리보기용)
  const [equippedItems, setEquippedItems] = useState({}); // { type: item } 형태로 저장

  // 아이템 착용/해제 토글 함수
  const toggleEquip = (selectedItem) => {
    setEquippedItems(prevEquipped => {
      // 이미 같은 타입의 아이템이 착용 중이면 해제
      if (prevEquipped[selectedItem.type]?.id === selectedItem.id) {
        const newEquipped = { ...prevEquipped };
        delete newEquipped[selectedItem.type];
        return newEquipped;
      } else {
        // 새 아이템 착용 (같은 타입의 기존 아이템은 교체)
        return {
          ...prevEquipped,
          [selectedItem.type]: selectedItem
        };
      }
    });

    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === selectedItem.id) {
          // 선택된 아이템의 isEquipped 상태 토글
          return { ...item, isEquipped: !item.isEquipped };
        } else if (item.type === selectedItem.type && item.isEquipped) {
          // 같은 타입의 다른 아이템이 착용 중이었다면 해제
          return { ...item, isEquipped: false };
        }
        return item;
      })
    );
  };

  return (
    <div className="custom-screen-container">
      {/* 헤더 섹션 */}
      <header className="custom-header">
        <button className="back-button" onClick={() => onNavClick('play')}>
          <X size={24} /> {/* 닫기 아이콘 */}
        </button>
        <h1 className="custom-title">나의 커스텀</h1>
        <Settings
          className="settings-icon"
          onClick={() => onNavClick('homepage')}
          style={{ cursor: 'pointer' }}
        />
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="custom-content">
        {/* 캐릭터 미리보기 영역 */}
        <section className="character-preview-section">
          <div className="character-base">
            {/* 기본 캐릭터 이미지 (배경으로 깔릴) */}
            <img src="/assets/character_base.png" alt="기본 캐릭터" className="preview-base-image" />
            {/* 착용된 아이템들 */}
            {Object.values(equippedItems).map(item => (
              <img
                key={item.id}
                src={item.imageUrl}
                alt={item.name}
                className={`equipped-item ${item.type}`} // 아이템 타입에 따른 클래스 추가 가능
              />
            ))}
          </div>
          <div className="preview-info">
            <p>나만의 캐릭터를 꾸며보세요!</p>
          </div>
        </section>

        {/* 아이템 목록 영역 */}
        <section className="item-list-section">
          <h2>보유 아이템</h2>
          <div className="item-grid">
            {items.map(item => (
              <div
                key={item.id}
                className={`item-card ${item.isEquipped ? 'equipped' : ''}`}
                onClick={() => toggleEquip(item)}
              >
                <div className="item-image-wrapper">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-type">{item.type}</p>
                  <p className="item-price">{item.price} 코인</p>
                </div>
                {item.isEquipped && <span className="equipped-badge">착용 중</span>}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 버튼 섹션 (필요하다면 추가) */}
      <footer className="custom-footer">
        <button className="action-button primary-action">확인</button>
        <button className="action-button">초기화</button>
      </footer>
    </div>
  );
}

export default CustomScreen;