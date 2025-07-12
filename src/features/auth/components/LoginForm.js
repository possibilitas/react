import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 임시 로그인 기능: 페이지 이동을 위해 useNavigate 임포트
import '../../../../src/styles/LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // 임시 로그인 기능: useNavigate 훅 사용

  const handleSubmit = (event) => {
    event.preventDefault();

    // 임시 로그인 기능: 유효한 아이디와 비밀번호 설정
    const validUsername = '###'; //임시로 지정 가능
    const validPassword = '###';

    if (username.trim() === '') {
      setErrorMessage('아이디를 입력하세요.');
    } else if (password.trim() === '') {
      setErrorMessage('비밀번호를 입력하세요.');
    } else {
      setErrorMessage('');
      // 임시 로그인 기능: 하드코딩된 값으로 로그인 처리
      if (username === validUsername && password === validPassword) {
        //alert('로그인 성공!');
        navigate('/homepage'); // HomePage로 이동
      } else {
        setErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
      // console.log('로그인 시도:', { username, password }); // 실제 로그인 로직 시 주석 해제
    }
  };

  return (
    <div className="login-form">
      <h2></h2>
      <form onSubmit={handleSubmit}>
        <div className="merged-input-container">
          <div className='input-group'>
            <input
              type="text"
              id="username"
              name="username"
              className={`form-input ${username ? 'has-content' : ''}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='username' className='floating-label'>아이디 또는 이메일</label>
          </div>
          <div className='input-group'>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${password ? 'has-content' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor='password' className='floating-label'>비밀번호</label>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginForm;