import React, { useState } from 'react';
import '../../../styles/ParentEduScreen.css';

function DevelopmentChecklistScreen({ onNavClick, currentScreen }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [riskLevel, setRiskLevel] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [currentView, setCurrentView] = useState('start'); // 'start', 'quiz', 'result' 뷰 관리
  const [lastScore, setLastScore] = useState(null); // 최근 기록 점수
  const [showInfoModal, setShowInfoModal] = useState(false); // New state for info modal

  const questions = [
    { id: 1, text: '아이와 눈을 자연스럽게 맞추나요?', isCritical: false, area: '사회적 상호작용 및 정서 공유' },
    { id: 2, text: '부모님 표정을 따라 하려고 하나요?', isCritical: false, area: '사회적 상호작용 및 정서 공유' },
    { id: 3, text: '재미있는 것을 발견했을 때, 부모님에게 보여주거나 손가락으로 가리키며 함께 보자고 하나요?', isCritical: true, area: '사회적 상호작용 및 정서 공유' },
    { id: 4, text: '까꿍 놀이, 간지럼 태우기 같은 상호작용 놀이를 즐기나요?', isCritical: false, area: '사회적 상호작용 및 정서 공유' },
    { id: 5, text: '부모님이 손가락으로 가리키는 곳을 쳐다보나요?', isCritical: true, area: '의사소통 및 공동 주시' },
    { id: 6, text: '이름을 불렀을 때 꾸준히 반응하나요?', isCritical: false, area: '의사소통 및 공동 주시' },
    { id: 7, text: '"공 줘", "안녕" 같은 간단한 지시를 이해하고 따르려고 하나요?', isCritical: false, area: '의사소통 및 공동 주시' },
    { id: 8, text: '다른 아이들에게 관심을 보이나요?', isCritical: true, area: '의사소통 및 공동 주시' },
    { id: 9, text: '장난감을 가지고 상상 놀이(역할 놀이)를 하나요?', isCritical: true, area: '놀이 및 행동 패턴' },
    { id: 10, text: '특정 물건이나 장난감의 한 부분에 비정상적으로 집착하나요?', isCritical: false, area: '놀이 및 행동 패턴' },
    { id: 11, text: '의미 없이 손이나 손가락을 흔들거나, 몸을 앞뒤로 흔드는 등 반복적인 행동을 자주 보이나요?', isCritical: true, area: '놀이 및 행동 패턴' },
    { id: 12, text: '새로운 환경이나 일상의 변화에 매우 민감하게 반응하나요?', isCritical: false, area: '놀이 및 행동 패턴' },
  ];

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [`question-${questionId}`]: answer,
    }));
  };

  const handleSubmit = () => {
    const missingQuestionIds = [];
    questions.forEach(q => {
      if (!userAnswers[`question-${q.id}`]) {
        missingQuestionIds.push(q.id);
      }
    });

    if (missingQuestionIds.length > 0) {
      setUnansweredQuestions(missingQuestionIds);
      return;
    }

    setUnansweredQuestions([]);

    let totalScore = 0; // 긍정적인 발달 지표 (높을수록 좋음)
    let criticalItemScore = 0; // 우려되는 중요 문항 수 (높을수록 우려)

    questions.forEach(q => {
      const answer = userAnswers[`question-${q.id}`];

      // totalScore 계산
      if (answer === 'yes') {
        totalScore += 3;
      } else if (answer === 'sometimes') {
        totalScore += 2;
      } else if (answer === 'rarely') {
        totalScore += 1;
      } else if (answer === 'no') {
        totalScore += 0; // 명시적으로 0점 추가
      }

      // criticalItemScore 계산 (중요 문항에서 '거의 그렇지 않다' 또는 '아니오' 답변 시)
      if (q.isCritical && (answer === 'no' || answer === 'rarely')) {
        criticalItemScore += 1;
      }
    });

    let calculatedRiskLevel = '';
    let calculatedRecommendation = '';

    // 위험 수준 판단 로직 (totalScore는 높을수록 좋고, criticalItemScore는 높을수록 나쁨)
    if (criticalItemScore >= 3 || totalScore <= 12) { // totalScore 0-12는 높은 우려
        calculatedRiskLevel = '높은 우려 (High Risk)';
        calculatedRecommendation = '자폐 스펙트럼 장애의 핵심적인 특징들이 여러 개 나타날 가능성을 보입니다. 정확한 평가와 필요한 조기 개입을 위해 반드시 소아정신과 의사 또는 발달 전문가의 종합적인 평가를 받아보시는 것을 강력히 권고합니다.';
    } else if (criticalItemScore >= 1 || (totalScore > 12 && totalScore <= 24)) { // criticalItemScore 1~2 또는 totalScore 13-24는 중간 우려
        calculatedRiskLevel = '중간 우려 (Moderate Risk)';
        calculatedRecommendation = '몇 가지 영역에서 발달적 지원이 필요할 수 있음을 시사합니다. 이 결과만으로 단정할 수 없으므로, 아이의 놀이와 상호작용을 더 주의 깊게 관찰해 보세요. 우려가 지속되거나 \'결정적 문항\' 중 2개 이상이 포함되어 있다면 전문가 상담을 고려해 보시는 것이 좋습니다.';
    } else { // criticalItemScore가 0이고 totalScore가 25 이상인 경우 (최대 36)
        calculatedRiskLevel = '낮은 우려 (Low Risk)';
        calculatedRecommendation = '현재 아이의 사회적 의사소통 발달은 연령에 맞게 잘 이루어지고 있을 가능성이 높습니다. 특별한 우려 사항은 없으나, 앞으로도 아이의 발달에 꾸준한 관심을 가져주세요.';
    }


    setRiskLevel(calculatedRiskLevel);
    setRecommendation(calculatedRecommendation);
    setLastScore(totalScore); // 현재 점수를 최근 기록으로 저장
    setCurrentView('result'); // 결과를 보여주는 뷰로 전환
  };

  const groupQuestionsByArea = (questions) => {
    return questions.reduce((acc, question) => {
      acc[`영역: ${question.area}`] = acc[`영역: ${question.area}`] || [];
      acc[`영역: ${question.area}`].push(question);
      return acc;
    }, {});
  };

  const groupedQuestions = groupQuestionsByArea(questions);

  const startQuiz = () => {
    setUserAnswers({}); // 답변 초기화
    setUnansweredQuestions([]); // 미답변 질문 초기화
    setRiskLevel(''); // 위험 수준 초기화
    setRecommendation(''); // 권장 사항 초기화
    setCurrentView('quiz'); // 설문 뷰로 전환
  };

  const resetToStartView = () => {
    setUserAnswers({}); // 답변 초기화
    setUnansweredQuestions([]); // 미답변 질문 초기화
    setRiskLevel(''); // 위험 수준 초기화
    setRecommendation(''); // 권장 사항 초기화
    setCurrentView('start'); // 시작 뷰로 전환
  };

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  return (
    <div className="parent-edu-screen-container">
      <header className="parent-edu-header">
        <h1 className="logo">𝒁𝒆𝒓𝒐𝑫𝒐𝒔𝒆</h1>
        <div className="settings-icon" onClick={toggleInfoModal}>
          ? {/* Info icon or similar, or use a Font Awesome icon if available */}
        </div>
      </header>

      <main className="parent-edu-content">
        {currentView === 'start' && ( // 1번 뷰: 시작/기록 화면
          <>
            <section className="card start-view-card"> {/* start-view-card 클래스 추가 */}
              <div className="info-box">
                <div className="card-header">
                  <h3>우리아이 발달 체크리스트 (만 16~36개월용)</h3>
                </div>
                <p className="disclaimer">
                  <strong>필수 고지 사항:</strong> 본 체크리스트는 자녀의 발달에 대한 부모님의 이해를 돕기 위한 참고용 선별 도구입니다. 이 결과는 의학적 진단이 아니며, 진단을 대체할 수 없습니다. 자녀의 발달에 대해 조금이라도 우려되는 점이 있다면, 반드시 소아청소년과 의사 또는 발달 전문가와 상담하시기 바랍니다.
                </p>
                <p className="instructions">각 문항을 읽고 자녀의 평소 행동에 <br></br>가장 가까운 것을 선택해 주세요.</p>
              </div>
              <button className="start-quiz-button in-card-button" onClick={startQuiz}> {/* in-card-button 클래스 추가 */}
                설문 시작하기
              </button>
            </section>

            <section className="card recent-record-card">
              <div className="card-header">
                <h3>최근 기록</h3>
              </div>
              <div className="recent-record-content">
                {lastScore !== null ? (
                  <p>최근 설문 점수: <span className="score-display">{lastScore}점</span></p>
                ) : (
                  <p>아직 완료된 설문 기록이 없습니다.</p>
                )}
              </div>
            </section>
          </>
        )}

        {currentView === 'quiz' && ( // 2번 뷰: 설문 질문 화면
          <section className="card">
            <div className="checklist-questions">
              {Object.keys(groupedQuestions).map(area => (
                <div key={area} className="question-area-group">
                  <h4 className="question-area-title">{area}</h4>
                  {groupedQuestions[`${area}`].map(q => (
                    <div key={q.id} className="question-item">
                      <p className="question-text">{q.id}. {q.text}</p> {/* 질문 번호 추가 */}
                      <div className="options-container">
                        <label className="custom-radio-label">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value="yes"
                            checked={userAnswers[`question-${q.id}`] === 'yes'}
                            onChange={() => handleAnswerChange(q.id, 'yes')}
                            className="custom-radio-input"
                          />
                          <span className="custom-radio-button"></span>
                          예
                        </label>
                        <label className="custom-radio-label">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value="sometimes"
                            checked={userAnswers[`question-${q.id}`] === 'sometimes'}
                            onChange={() => handleAnswerChange(q.id, 'sometimes')}
                            className="custom-radio-input"
                          />
                          <span className="custom-radio-button"></span>
                          가끔 그렇다
                        </label>
                        <label className="custom-radio-label">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value="rarely"
                            checked={userAnswers[`question-${q.id}`] === 'rarely'}
                            onChange={() => handleAnswerChange(q.id, 'rarely')}
                            className="custom-radio-input"
                          />
                          <span className="custom-radio-button"></span>
                          거의 그렇지 않다
                        </label>
                        <label className="custom-radio-label">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value="no"
                            checked={userAnswers[`question-${q.id}`] === 'no'}
                            onChange={() => handleAnswerChange(q.id, 'no')}
                            className="custom-radio-input"
                          />
                          <span className="custom-radio-button"></span>
                          아니오
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {unansweredQuestions.length > 0 && (
                <p className="error-message" style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>
                  답변하지 않은 문항이 있습니다: {unansweredQuestions.join(', ')}번
                </p>
              )}
              <button
                className="submit-button"
                onClick={handleSubmit}
              >
                결과 보기
              </button>
            </div>
          </section>
        )}

        {currentView === 'result' && ( // 3번 뷰: 결과 화면
          <section className="card">
            <div className="result-section">
              <h3>체크리스트 결과</h3>
              <div className={`risk-level ${riskLevel === '낮은 우려 (Low Risk)' ? 'low-risk' : ''} ${riskLevel === '중간 우려 (Moderate Risk)' ? 'moderate-risk' : ''} ${riskLevel === '높은 우려 (High Risk)' ? 'high-risk' : ''}`}>
                <p><strong>{riskLevel}</strong></p>
              </div>
              <p className="recommendation-text">{recommendation}</p>
              <p className="disclaimer-small">
                본 체크리스트는 자녀의 발달에 대한 부모님의 이해를 돕기 위한 참고용 선별 도구입니다. 이 결과는 의학적 진단이 아니며, 진단을 대체할 수 없습니다. 자녀의 발달에 대해 조금이라도 우려되는 점이 있다면, 반드시 소아청소년과 의사 또는 발달 전문가와 상담하시기 바랍니다.
              </p>
              <button
                className="start-edu-button" // 기존 start-edu-button 스타일 재활용
                onClick={resetToStartView} // 1번 뷰로 돌아가기
              >
                다시 하기
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="info-modal-overlay" onClick={toggleInfoModal}>
          <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>체크리스트 문항 정보</h4>
            [인용]<p><strong>결정적 문항 (Critical Items):<br></br></strong> 3, 5, 8, 9, 11번 (총 5개) </p>
            <br />
            <h5>구성 이유 및 주요 근거:</h5>
            <ul>
              <li><strong>1. 눈 맞춤:</strong> 사회적 관계의 가장 기초적인 기술입니다. [cite_start]ASD 아동은 눈 맞춤의 빈도와 질이 현저히 낮습니다. [cite: 93]</li>
              <li><strong>2. 표정 모방:</strong> 타인의 감정을 이해하고 공감하는 능력의 초기 형태입니다. [cite_start]ASD 아동은 얼굴 표정과 같은 사회적 단서 모방에 어려움을 보입니다. [cite: 93]</li>
              <li><strong>3. 관심 공유:</strong> 타인과 관심의 대상을 공유하려는 의도입니다. [cite_start]ASD의 가장 핵심적인 초기 결함 중 하나입니다. [cite: 93]</li>
              <li><strong>4. 상호작용 놀이:</strong> 사회적 즐거움과 호혜성의 지표입니다. [cite_start]ASD 아동은 사회적 놀이 자체에 대한 동기가 부족할 수 있습니다. [cite: 93]</li>
              <li><strong>5. [cite_start]가리키기 따라 보기:</strong> 비언어적 의사소통을 이해하는 능력으로, ASD 아동은 타인의 손짓(포인팅)이 의도를 담고 있음을 이해하기 어려워합니다. [cite: 93]</li>
              <li><strong>6. 이름에 반응:</strong> 사회적 자극에 대한 선택적 주의력입니다. [cite_start]ASD 아동은 사회적 자극(이름 부르기)보다 환경 소음에 더 반응하는 경향이 있습니다. [cite: 93]</li>
              <li><strong>7. 간단한 지시 이해:</strong> 언어적 소통을 이해하는 능력입니다. [cite_start]사회적 맥락 속에서 언어를 이해하는 데 어려움이 있을 수 있습니다. [cite: 94]</li>
              <li><strong>8. 또래 관심:</strong> 사회적 동기의 중요한 지표입니다. [cite_start]ASD 아동은 사물에 대한 관심이 사람(특히 또래)에 대한 관심보다 우세한 경우가 많습니다. [cite: 94]</li>
              <li><strong>9. 상상 놀이:</strong> '마음 이론'의 기초가 되는 고차원적 사고 능력입니다. [cite_start]ASD 아동은 기능적이거나 감각적인 놀이에 머물고 상징 놀이 발달이 지연됩니다. [cite: 94]</li>
              <li><strong>10. 제한된 관심사:</strong> 관심의 폭이 좁고 특정 사물이나 주제에 몰두하는 경향입니다. [cite_start]ASD의 주요 진단 기준 중 하나입니다. [cite: 94]</li>
              <li><strong>11. 반복 행동:</strong> 감각 추구나 자기 조절을 위한 비기능적 행동입니다. [cite_start]최근 연구에서 사회성 결함만큼이나 중요한 조기 지표로 강조됩니다. [cite: 94]</li>
              <li><strong>12. 변화에 대한 저항:</strong> 예측 불가능한 상황에 대한 불안과 경직성입니다. [cite_start]ASD의 주요 진단 기준 중 하나입니다. [cite: 94]</li>
            </ul>
            <button onClick={toggleInfoModal} className="close-modal-button">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DevelopmentChecklistScreen;