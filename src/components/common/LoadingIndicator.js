import React from 'react';
import './LoadingIndicator.css'; // 로딩 인디케이터 전용 CSS를 불러옵니다.

function LoadingIndicator({ text = '로딩중...' }) {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">{text}</p>
      </div>
    </div>
  );
}

export default LoadingIndicator;