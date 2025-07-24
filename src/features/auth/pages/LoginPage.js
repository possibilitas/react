// src/features/auth/pages/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
// LoginForm 컴포넌트 경로 확인
import LoginForm from '../components/LoginForm'; 

// CSS 파일 경로: src/features/auth/pages에서 src/styles/LoginPage.css로 이동
import '../../../styles/LoginPage.css'; 

// 이미지 경로 확인
import zerodose_img from '../../assets/zerodose_logo.svg'; 

function LoginPage() {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/entry');
  };

  const handleLoginSuccess = () => {
    console.log('로그인 성공! 홈페이지로 이동합니다.');
    navigate('/homepage');
  };

  return (
    // 이곳의 className을 'login-page-container'에서 'login-container'로 수정합니다.
    <div className="login-container"> 
      <img
        src={zerodose_img}
        alt="ZeroDose Logo"
        className="top-left-icon"
        onClick={handleIconClick}
      />
      <div className="login-box">
        <h1>ZeroDose Login</h1>
        <div className="cute-illustration">🦄</div>
        <p className="login-desc">우리 놀이터에 오신 걸 환영해요!</p>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}

export default LoginPage;