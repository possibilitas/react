// src/features/auth/components/SignupForm.js
import React, { useState } from 'react';
import '../../../styles/LoginForm.css';

function SignupForm({ onSignupSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleAgeChange = (e) => {
    // 나이 입력 시 숫자만 허용하도록 변경
    const value = e.target.value;
    if (value === '' || /^[0-9]+$/.test(value)) {
      setAge(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // 1. 클라이언트 측 기본 유효성 검사 강화
    if (username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || age.trim() === '') {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 강도 검사 (예시: 최소 6자, 숫자, 문자 포함)
    if (password.length < 6 || !/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)) {
      setError('비밀번호는 최소 6자 이상이어야 하며, 숫자와 문자를 모두 포함해야 합니다.');
      return;
    }

    // 나이 유효성 검사 (예시: 1세 이상 7세 이하)
    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 7) {
      setError('나이는 1세에서 7세 사이의 유효한 숫자여야 합니다.');
      return;
    }

    try {
      // 중요: 클라이언트에서 서버로 비밀번호를 평문으로 전송합니다.
      // 서버에서는 이 비밀번호를 받아서 반드시 해싱하여 저장해야 합니다!
      // 서버에서 비밀번호를 평문으로 응답하는 것은 심각한 보안 문제입니다.
      const response = await fetch('http://localhost:8000/api/users/signup/', { // API 경로 수정
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          age: parsedAge, // 유효성 검사된 parsedAge 사용
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // 서버에서 오는 에러 메시지를 더 구체적으로 표시
        let errorMessage = '회원가입 실패';
        if (errorData && errorData.error && errorData.error.message) {
          errorMessage = errorData.error.message;
        } else if (errorData && errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData) { // Fallback for other error response structures
            errorMessage = JSON.stringify(errorData);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('회원가입 성공:', data);
      setSuccessMessage('회원가입이 성공적으로 완료되었습니다!');
      
      alert('회원가입이 되었습니다.'); // 회원가입 성공 알림
      onSignupSuccess(); // 성공 시 콜백 호출
      
      // 성공 후 폼 필드 초기화
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setAge('');

    } catch (err) {
      console.error('회원가입 중 오류 발생:', err.message);
      setError(err.message || '회원가입 중 알 수 없는 오류가 발생했습니다.');
    }
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
      <div className="input-group">
        <label htmlFor="signup-age">나이</label>
        <input
          type="number" // type="number"로 변경하여 숫자 입력 유도
          id="signup-age"
          value={age}
          onChange={handleAgeChange}
          placeholder="나이를 입력하세요"
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      {successMessage && (
        <p className="success-message" style={{ color: 'green', fontSize: '14px', marginTop: '-10px', marginBottom: '15px', textAlign: 'left' }}>
          {successMessage}
        </p>
      )}
      <button type="submit" className="login-button">회원가입</button>
      <p className="signup-text">
        이미 계정이 있으신가요? <a href="/login">로그인</a>
      </p>
    </form>
  );
}

export default SignupForm;