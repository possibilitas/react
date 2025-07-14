// src/features/auth/pages/SignupPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import '../../../styles/LoginPage.css'; // 일관된 스타일링을 위해 로그인 페이지 CSS 재사용
import zerodose_img from '../../assets/zerodose_logo.svg';

function SignupPage() {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/entry'); // 아이콘 클릭 시 엔트리 페이지로 이동
  };

  const handleSignupSuccess = () => {
    console.log('회원가입 성공! 로그인 페이지로 이동합니다.');
    // 선택적으로, 이동하기 전에 여기에 성공 메시지를 표시할 수 있습니다.
    navigate('/login'); // 성공적인 회원가입 후 로그인 페이지로 리디렉션
  };

  return (
    <div className="login-container"> {/* 동일한 컨테이너 스타일 재사용 */}
      <img
        src={zerodose_img}
        alt="ZeroDose Logo"
        className="top-left-icon"
        onClick={handleIconClick}
      />
      <div className="login-box"> {/* 동일한 박스 스타일 재사용 */}
        <h1>ZeroDose 회원가입</h1>
        <SignupForm onSignupSuccess={handleSignupSuccess} />
      </div>
    </div>
  );
}

export default SignupPage;