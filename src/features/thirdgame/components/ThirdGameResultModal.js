import React from 'react';
import '../styles/ThirdGame.css';

function formatDuration(ms) {
  if (!ms) return '0초';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}분 ${seconds}초`;
}

function ThirdGameResultModal({ duration, onPlayAgain, onExit }) {
  return (
    <div className="modal-overlay">
      <div className="result-modal">
        <h2 className="modal-title">🎉 성공! 🎉</h2>
        <p className="modal-text">모든 짝을 맞췄어요!</p>
        <div className="duration-display">
          <span className="duration-label">완료 시간:</span>
          <span className="duration-time">{formatDuration(duration)}</span>
        </div>
        <div className="modal-buttons">
          <button className="btn btn-replay" onClick={onPlayAgain}>
            다시하기
          </button>
          <button className="btn btn-exit" onClick={onExit}>
            나가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThirdGameResultModal;