import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import zerodose_img from '../features/assets/zerodose_logo.svg';
import BottomNavigation from '../components/BottomNavigation'; // BottomNavigation 컴포넌트 임포트

export default function HomePage() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogoClick = () => {
    navigate('/entry'); // /entry 경로로 이동
  };

  return (
    <div className="main-page">
      {/* 상단 프로필 영역 */}
      <header className="profile-header">
        <img src={zerodose_img} alt="ZeroDose Logo" className="top-left-icon" onClick={handleLogoClick} />


      </header>

      {/* 학습 훈련 (가로 배치된 카드 2개) */}
      <section className="card full-card training-section">
        <h3 className="section-title">학습 훈련</h3>
        <div className="training-cards">
          <div className="card small-card">
            <p>학습 훈련할 게임을 선택하세요.</p>
            <button>게임 찾기</button>
          </div>
          <div className="card small-card dark-card">
            <p>최근 게임 횟수 평균</p>
            <div className="ovr-graph">[그래프]</div>
          </div>
        </div>
      </section>

      {/* 부모 교육 */}
      <section className="card full-card">
        <h3>부모 교육</h3>
        <div className="education-materials-list">
          {[
            { id: 1, title: '자폐 스펙트럼 장애 이해하기', type: '영상', duration: '15분' },
            { id: 2, title: '긍정적 행동 지원 가이드', type: '문서', duration: '10분' },
            { id: 3, title: '사회성 발달 촉진 전략', type: '문서', duration: '8분' },
          ].map(material => (
            <div key={material.id} className="education-material-item">
              <span className="material-type">[{material.type}]</span>
              <span className="material-title">{material.title}</span>
              <span className="material-duration">({material.duration})</span>
            </div>
          ))}
        </div>
        <div className="video-count">자료 {}개</div> {/* 더미 데이터 개수 반영 */} 
      </section>

      {/* 행동 기록 */}
      <section className="card full-card green-card">
        <h3>행동 기록</h3>
        <div className="behavior-records-list">
          {[
            { id: 1, date: '2024-07-08', description: ' 특정 소리에 민감한 반응 보임' },
            { id: 2, date: '2024-07-07', description: ' 새로운 장난감에 흥미를 보임' },
            { id: 3, date: '2024-07-06', description: ' 눈 맞춤 시간이 증가함' },
          ].map(record => (
            <div key={record.id} className="behavior-record-item">
              <span className="record-date">{record.date}:</span>
              <span className="record-description">{record.description}</span>
            </div>
          ))}
          <br></br>
        </div>
        <button>모든 기록 보기</button>
      </section>

      {/* 하단 네비게이션 */}
      <BottomNavigation />
    </div>
  );
}
