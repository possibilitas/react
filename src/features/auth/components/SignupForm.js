// src/features/auth/components/SignupForm.js
import React, { useState } from 'react';
import '../../../styles/LoginForm.css'; // 회원가입을 위해 CSS를 재사용하거나 별도로 생성할 수 있습니다.

function SignupForm({ onSignupSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (username === '' || password === '' || confirmPassword === '') {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 실제 애플리케이션에서는 이 데이터를 백엔드 API로 전송해야 합니다.
    // 이 예시에서는 성공적인 회원가입을 시뮬레이션합니다.
    console.log('회원가입 시도:', { username, password });

    // API 호출 성공 시뮬레이션
    setTimeout(() => {
      setSuccessMessage('회원가입이 성공적으로 완료되었습니다!');
      // 부모에서 탐색하거나 메시지를 표시하기 위해 성공 콜백을 호출합니다.
      onSignupSuccess();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="signup-username">사용자 이름</label>
        <input
          type="text"
          id="signup-username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="사용자 이름을 입력하세요"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="signup-password">비밀번호</label>
        <input
          type="password"
          id="signup-password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력하세요"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message" style={{ color: 'green', fontSize: '14px', marginTop: '-10px', marginBottom: '15px', textAlign: 'left' }}>{successMessage}</p>}
      <button type="submit" className="login-button">회원가입</button>
      <p className="signup-text">
        이미 계정이 있으신가요? <a href="/login">로그인</a> {/* 로그인으로 돌아가는 링크 */}
      </p>
    </form>
  );
}

export default SignupForm;