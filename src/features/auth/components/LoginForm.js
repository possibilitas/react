// src/features/auth/components/LoginForm.js
import React, { useState } from 'react';
// CSS 파일 경로 확인: src/features/auth/components에서 src/styles/LoginForm.css로 이동
import '../../../styles/LoginForm.css';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();

    if (username === '' || password === '') {
      setError('사용자 이름과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setLoading(true); // Set loading to true when starting the request
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:8000/api/users/login/', { // Updated URL with port 8000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) { // Check if the response status is 2xx
        alert('로그인 성공!');
        onLoginSuccess(true);
        console.log('Login successful:', data.user);
        // You might want to store user data or a token here (e.g., in localStorage)
      } else {
        // Handle API errors (e.g., 400 Bad Request, 401 Unauthorized)
        setError(data.message || '로그인 실패. 다시 시도해주세요.');
        console.error('Login failed:', data.message);
      }
    } catch (err) {
      // Handle network errors or other exceptions
      setError('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Network error during login:', err);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
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
          disabled={loading} // Disable input while loading
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
          disabled={loading} // Disable input while loading
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="login-button" disabled={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </button>
      <p className="signup-text">
        계정이 없으신가요? <a href="/signup">회원가입</a>
      </p>
    </form>
  );
}

export default LoginForm;