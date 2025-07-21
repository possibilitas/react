import React, { useState } from 'react';
import '../../../styles/BehaviorLogScreen.css';


function BehaviorLogScreen({ onNavClick, currentScreen }) { // props를 받도록 수정
  const [selectedBehaviorType, setSelectedBehaviorType] = useState(null);
  const [logText, setLogText] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('8월'); // 월 변경 기능이 연결되었는지 확인
  const [selectedDate, setSelectedDate] = useState('11');

  // 임시 기록 데이터 (실제 앱에서는 서버에서 가져옴)
  const [logs, setLogs] = useState([
    {
      id: 1,
      type: '긍정',
      date: '8월 11일',
      text: '내가 말을 한 후 은우와 대화하며 깔깔대며 즐거워하는 모습을 보였다. 따라 하기 어려운 단어도 막힘 없는 말을 하는 것을 확인했다.',
    },
    {
      id: 2,
      type: '무응답',
      date: '8월 11일',
      text: '내가 말을 한 후 은우가 아무런 반응을 보이지 않았다. 그 행동의 의미를 알아채지 못하는 모습을 보였다.',
    },
    {
      id: 3,
      type: '특이행동',
      date: '8월 11일',
      text: '내가 말을 한 후 은우가 저 멀리 쳐다보며 반응을 보였다. 그 행동의 의미를 알아채지 못하는 모습을 보였다.',
    },
  ]);

  const handleSaveLog = () => {
    if (!selectedBehaviorType || logText.trim() === '') {
      alert('행동 유형을 선택하고 내용을 입력해주세요.');
      return;
    }
    const newLog = {
      id: Math.random(), // 임시 ID
      type: selectedBehaviorType,
      date: `${selectedMonth} ${selectedDate}일`,
      text: logText.trim(),
    };
    setLogs([newLog, ...logs]);
    setLogText('');
    setSelectedBehaviorType(null);
    alert('기록이 저장되었습니다!');
  };

  const dates = Array.from({ length: 7 }, (_, i) => 7 + i);

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      setSelectedMonth('7월');
    } else {
      setSelectedMonth('8월');
    }
  };

  return (
    <div className="log-screen-container">
      {/* 헤더 */}
      <header className="log-header">
        <h1 className="logo">𝒁𝒆𝒓𝒐𝑫𝒐𝒔𝒆</h1>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="log-content">
        {/* 오늘의 행동기록 섹션 */}
        <section className="today-log-section card">
          <p className="section-question">오늘 은우는 어떤 행동을 보였나요?</p>
          <div className="behavior-type-buttons">
            <button
              className={`behavior-type-button ${selectedBehaviorType === '부정' ? 'selected' : ''}`}
              onClick={() => setSelectedBehaviorType('부정')}
            >
              부정
            </button>
            <button
              className={`behavior-type-button ${selectedBehaviorType === '긍정' ? 'selected' : ''}`}
              onClick={() => setSelectedBehaviorType('긍정')}
            >
              긍정
            </button>
            <button
              className={`behavior-type-button ${selectedBehaviorType === '특이행동' ? 'selected' : ''}`}
              onClick={() => setSelectedBehaviorType('특이행동')}
            >
              특이행동
            </button>
          </div>
          <textarea
            className="log-textarea"
            placeholder="오늘의 행동을 기록해주세요."
            value={logText}
            onChange={(e) => setLogText(e.target.value)}
          ></textarea>
          <button className="save-button" onClick={handleSaveLog}>
            저장하기
          </button>
        </section>

        {/* 기록 모아보기 섹션 */}
        <section className="view-logs-section card">
          <div className="view-logs-header">
            <h3>기록 모아보기</h3>
            <div className="date-selector">
              <span className="arrow" onClick={() => handleMonthChange('prev')}>&lt;</span>
              <span className="month">{selectedMonth}</span>
              <span className="arrow" onClick={() => handleMonthChange('next')}>&gt;</span>
            </div>
          </div>
          <div className="date-list-wrapper">
            <div className="date-list">
              {dates.map((date) => (
                <div
                  key={date}
                  className={`date-item ${selectedDate === String(date) ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(String(date))}
                >
                  <span className="day-of-week">
                    {date === 7 && '일'}
                    {date === 8 && '월'}
                    {date === 9 && '화'}
                    {date === 10 && '수'}
                    {date === 11 && '목'}
                    {date === 12 && '금'}
                    {date === 13 && '토'}
                  </span>
                  <span className="date-number">{date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="log-entries">
            {logs.filter(log => log.date.includes(selectedDate + '일')).map((log) => (
              <div key={log.id} className="log-entry">
                <span className={`log-type ${log.type === '긍정' ? 'positive' : log.type === '부정' ? 'negative' : 'special'}`}>
                  {log.type}
                </span>
                <p className="log-entry-text">{log.text}</p>
                <div className="log-entry-footer">
                  <span className="log-time">오전 10시</span>
                  <div className="log-actions">
                    <span className="edit-icon">✏️</span>
                    <span className="delete-icon">🗑️</span>
                  </div>
                </div>
              </div>
            ))}
            {logs.filter(log => log.date.includes(selectedDate + '일')).length === 0 && (
                <p className="no-logs-message">선택된 날짜에 기록이 없습니다.</p>
            )}
          </div>
        </section>
      </main>

      {/* 기존 하단 네비게이션 바 유지 */}
      {/*<BottomNavigation onNavClick={onNavClick} currentScreen={currentScreen} />*/}
    </div>
  );
}

export default BehaviorLogScreen;