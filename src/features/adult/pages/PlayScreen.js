// src/components/screens/PlayScreen.js

import React, { useState } from 'react';
import '../../../styles/PlayScreen.css';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';

// 이미지 파일 임포트
import dayBackgroundImage from '../../assets/낮.png';
import defaultBackgroundImage from '../../assets/배경샘플.png';
import nightBackgroundImage from '../../assets/밤.png';
import characterImage from '../../assets/캐릭터샘플.png';

/**
 * PlayScreen 컴포넌트는 놀이 화면의 UI를 렌더링합니다.
 * 여러 단계의 뷰어를 포함하며, 좌우 버튼으로 뷰어를 전환할 수 있습니다.
 */
function PlayScreen({ onNavClick, currentScreen }) {
  // 현재 활성화된 뷰어의 인덱스를 관리하는 상태 (0부터 시작)
  const [currentViewerIndex, setCurrentViewerIndex] = useState(0);
  // 캐릭터의 좌우 움직임을 위한 상태 추가
  const [characterPosition, setCharacterPosition] = useState(0); // 0: 중앙, -1: 왼쪽, 1: 오른쪽

  // 슬라이드 애니메이션 방향을 위한 상태 추가
  const [slideDirection, setSlideDirection] = useState(null); // 'left' 또는 'right'

  // 뷰어 데이터 (각 뷰어의 콘텐츠와 스타일을 정의)
  const viewerData = [
    {
      id: 0,
      step: '1단계',
      backgroundColor: '#e0f7fa', // 옅은 하늘색
      content: '게임 소개 이미지 또는 글 (1단계)',
      buttonText: '시작하기',
      backgroundImage: dayBackgroundImage, // 1단계 배경 이미지
    },
    {
      id: 1,
      step: '2단계',
      backgroundColor: '#e8f5e9', // 옅은 초록색
      content: '게임 소개 이미지 또는 글 (2단계)',
      buttonText: '시작하기',
      backgroundImage: defaultBackgroundImage, // 2단계 배경 이미지
    },
    {
      id: 2,
      step: '3단계',
      backgroundColor: '#ffe0b2', // 옅은 주황색
      content: '게임 소개 이미지 또는 글 (3단계)',
      buttonText: '시작하기',
      backgroundImage: nightBackgroundImage, // 3단계 배경 이미지
    },
  ];

  // 다음 뷰어로 이동하는 함수
  const goToNextViewer = () => {
    setSlideDirection('right'); // 오른쪽으로 슬라이드
    setCurrentViewerIndex((prevIndex) =>
      (prevIndex + 1) % viewerData.length
    );
  };

  // 이전 뷰어로 이동하는 함수
  const goToPreviousViewer = () => {
    setSlideDirection('left'); // 왼쪽으로 슬라이드
    setCurrentViewerIndex((prevIndex) =>
      (prevIndex - 1 + viewerData.length) % viewerData.length
    );
  };

  // 캐릭터 클릭 시 실행될 함수 정의
  const handleCharacterClick = () => {
    window.alert('캐릭터가 클릭되었습니다!');

    // 캐릭터를 왼쪽으로 이동 (-1)
    setCharacterPosition(-1);
    // 0.5초 후 오른쪽으로 이동 (1)
    setTimeout(() => {
      setCharacterPosition(1);
    }, 500); // 0.5초 후
    // 1초 후 중앙으로 복귀 (0)
    setTimeout(() => {
      setCharacterPosition(0);
    }, 1000); // 1초 후
  };

  // '꾸미기' 버튼 클릭 시 실행될 함수
  const handleCustomClick = () => {
    console.log('꾸미기 버튼이 클릭되었습니다! CustomScreen으로 이동합니다.');
    onNavClick('custom'); // 'custom' 라우트로 이동 요청
  };

  // 탭 클릭 시 뷰어 변경 및 슬라이드 방향 설정
  const handleTabClick = (index) => {
    if (index > currentViewerIndex) {
      setSlideDirection('right');
    } else if (index < currentViewerIndex) {
      setSlideDirection('left');
    } else {
      setSlideDirection(null); // 같은 탭 클릭 시 애니메이션 없음
    }
    setCurrentViewerIndex(index);
  };

  // 현재 활성화된 뷰어 데이터
  const currentViewer = viewerData[currentViewerIndex];

  // 캐릭터 위치에 따른 CSS 클래스 결정
  const characterMoveClass =
    characterPosition === -1 ? 'move-left' : characterPosition === 1 ? 'move-right' : '';

  return (
    <div className="play-screen-container">
      {/* 헤더 섹션: '꾸미기' 버튼과 설정 아이콘 */}
      <header className="play-header">
        <button
          className="custom-button"
          onClick={handleCustomClick}
        >
          꾸미기
        </button>
        <Settings
          className="settings-icon"
          onClick={() => onNavClick('homepage')}
          style={{ cursor: 'pointer' }}
        />
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="play-content">
        {/* 단계 탭 메뉴 */}
        <section className="step-tabs-section">
          {viewerData.map((viewer, index) => (
            <button
              key={viewer.id}
              className={`step-tab-button ${currentViewerIndex === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {viewer.step}
            </button>
          ))}
        </section>

        {/* 메인 뷰어 섹션 (슬라이더) */}
        <section className="main-viewer-section" style={{ backgroundColor: currentViewer.backgroundColor }}>
          {/* key prop을 사용하여 컴포넌트가 바뀔 때마다 재렌더링 유도 */}
          <div
            key={currentViewer.id}
            className={`background-image-container ${slideDirection === 'left' ? 'slide-in-left' : slideDirection === 'right' ? 'slide-in-right' : ''}`}
            style={{
              backgroundImage: `url(${currentViewer.backgroundImage})`,
              backgroundPosition: 'center center', // 배경 위치를 항상 중앙으로 고정
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            {/* 캐릭터 이미지 */}
            <img
              src={characterImage}
              alt="캐릭터"
              className={`character-image ${characterMoveClass}`}
              onClick={handleCharacterClick}
              style={{ cursor: 'pointer' }}
            />

            {/* 좌측 화살표 버튼 */}
            <button
              className="nav-button left-arrow"
              onClick={goToPreviousViewer}
            >
              <ChevronLeft size={36} color="#fff" />
            </button>
            {/* 우측 화살표 버튼 */}
            <button
              className="nav-button right-arrow"
              onClick={goToNextViewer}
            >
              <ChevronRight size={36} color="#fff" />
            </button>

            {/* 뷰어 콘텐츠 */}
            <div className="viewer-content-box">
              <p>{currentViewer.content}</p>
            </div>
          </div>
        </section>

        {/* 하단 버튼 섹션 */}
        <section className="bottom-buttons-section">
          <button className="action-button" onClick={() => onNavClick('achievement')}> {/* */}
            <span className="button-icon">📚</span>
            <span className="button-text">업적</span> {/* */}
          </button>
          <button className="action-button primary-action">
            <span className="button-text">{currentViewer.buttonText}</span>
          </button>
          <button className="action-button" onClick={() => onNavClick('shop')}>
            <span className="button-icon">⭐</span>
            <span className="button-text">상점</span>
          </button>
        </section>
      </main>
    </div>
  );
}

export default PlayScreen;