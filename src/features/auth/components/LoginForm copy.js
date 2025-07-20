// src/features/auth/components/LoginForm.js
import React, { useState } from 'react';
// CSS 파일 경로 확인: src/features/auth/components에서 src/styles/LoginForm.css로 이동
import '../../../styles/LoginForm.css'; 

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('사용자 이름과 비밀번호를 모두 입력해주세요.');
      return;
    }

    console.log('로그인 시도:', { username, password });

    if (username === 'user' && password === 'pass') {
      setError('');
      alert('로그인 성공!');
      onLoginSuccess(true);
    } else {
      setError('잘못된 사용자 이름 또는 비밀번호입니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="username">사용자 이름 또는 이메일</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="사용자 이름을 입력하세요"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력하세요"
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="login-button">로그인</button>
      <p className="signup-text">
        계정이 없으신가요? <a href="/signup">회원가입</a>
      </p>
    </form>
  );
}

export default LoginForm;