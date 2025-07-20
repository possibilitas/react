import React, { useState } from 'react';
import '../../../styles/ParentEduScreen.css'; // 화면 스타일을 위한 CSS 파일입니다.
// import BottomNavigation from '../../../components/BottomNavigation'; // Uncomment if needed



function DevelopmentChecklistScreen({ onNavClick, currentScreen }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [riskLevel, setRiskLevel] = useState('');
  const [recommendation, setRecommendation] = useState(''); // Initialize with useState
  const [unansweredQuestions, setUnansweredQuestions] = useState([]); // 누락된 질문 번호를 저장할 상태

  const questions = [
    { id: 1, text: '1. 아이와 눈을 자연스럽게 맞추나요?', isCritical: false, area: '사회적 상호작용 및 정서 공유' },
    { id: 2, text: '2. 부모님 표정을 따라 하려고 하나요?', isCritical: false, area: '사회적 상호작용 및 정서 공유' },
    { id: 3, text: '3. 재미있는 것을 발견했을 때, 부모님에게 보여주거나 손가락으로 가리키며 함께 보자고 하나요?', isCritical: true, area: '사회적 상호작용 및 정서 공유' },
    { id: 4, text: '4. 까꿍 놀이, 간지럼 태우기 같은 상호작용 놀이를 즐기나요?', isCritical: false, area: '사회적 상호작용 및 정서 공유' },
    { id: 5, text: '5. 부모님이 손가락으로 가리키는 곳을 쳐다보나요?', isCritical: true, area: '의사소통 및 공동 주시' },
    { id: 6, text: '6. 이름을 불렀을 때 꾸준히 반응하나요?', isCritical: false, area: '의사소통 및 공동 주시' },
    { id: 7, text: '7. "공 줘", "안녕" 같은 간단한 지시를 이해하고 따르려고 하나요?', isCritical: false, area: '의사소통 및 공동 주시' },
    { id: 8, text: '8. 다른 아이들에게 관심을 보이나요?', isCritical: true, area: '의사소통 및 공동 주시' },
    { id: 9, text: '9. 장난감을 가지고 상상 놀이(역할 놀이)를 하나요?', isCritical: true, area: '놀이 및 행동 패턴' },
    { id: 10, text: '10. 특정 물건이나 장난감의 한 부분에 비정상적으로 집착하나요?', isCritical: false, area: '놀이 및 행동 패턴' },
    { id: 11, text: '11. 의미 없이 손이나 손가락을 흔들거나, 몸을 앞뒤로 흔드는 등 반복적인 행동을 자주 보이나요?', isCritical: true, area: '놀이 및 행동 패턴' },
    { id: 12, text: '12. 새로운 환경이나 일상의 변화에 매우 민감하게 반응하나요?', isCritical: false, area: '놀이 및 행동 패턴' },
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
      // 답변되지 않은 문항이 있으면 결과 보기를 진행하지 않고 함수 종료
      return;
    }

    // 모든 질문에 답변했으면 unansweredQuestions 초기화
    setUnansweredQuestions([]);

    let totalScore = 0;
    let criticalItemScore = 0;

    questions.forEach(q => {
      const answer = userAnswers[`question-${q.id}`];
      // '아니오' 또는 '거의 그렇지 않다' 등 우려를 나타내는 답변을 1점으로 채점합니다.
      if (answer === 'no' || answer === 'rarely') {
        totalScore += 1;
        if (q.isCritical) {
          criticalItemScore += 1;
        }
      }
    });

    let calculatedRiskLevel = '';
    let calculatedRecommendation = '';

    // 위험도 평가 모델
    if (totalScore >= 8 || criticalItemScore >= 3) {
      calculatedRiskLevel = '높은 우려 (High Risk)';
      calculatedRecommendation = '자폐 스펙트럼 장애의 핵심적인 특징들이 여러 개 나타날 가능성을 보입니다. 정확한 평가와 필요한 조기 개입을 위해 반드시 소아정신과 의사 또는 발달 전문가의 종합적인 평가를 받아보시는 것을 강력히 권고합니다.';
    } else if (totalScore >= 3 && totalScore <= 7) {
      calculatedRiskLevel = '중간 우려 (Moderate Risk)';
      calculatedRecommendation = '몇 가지 영역에서 발달적 지원이 필요할 수 있음을 시사합니다. 이 결과만으로 단정할 수 없으므로, 아이의 놀이와 상호작용을 더 주의 깊게 관찰해 보세요. 우려가 지속되거나 \'결정적 문항\' 중 2개 이상이 포함되어 있다면 전문가 상담을 고려해 보시는 것이 좋습니다.';
    } else { // totalScore 0-2점
      calculatedRiskLevel = '낮은 우려 (Low Risk)';
      calculatedRecommendation = '현재 아이의 사회적 의사소통 발달은 연령에 맞게 잘 이루어지고 있을 가능성이 높습니다. 특별한 우려 사항은 없으나, 앞으로도 아이의 발달에 꾸준한 관심을 가져주세요.';
    }

    setRiskLevel(calculatedRiskLevel);
    setRecommendation(calculatedRecommendation);
    setSubmitted(true);
  };

  const groupQuestionsByArea = (questions) => {
    return questions.reduce((acc, question) => {
      acc[`영역: ${question.area}`] = acc[`영역: ${question.area}`] || [];
      acc[`영역: ${question.area}`].push(question);
      return acc;
    }, {});
  };

  const groupedQuestions = groupQuestionsByArea(questions);

  return (
    <div className="parent-edu-screen-container">
      {/* 헤더 */}
      <header className="parent-edu-header">
        <h1 className="logo">𝒁𝒆𝒓𝒐𝑫𝒐𝒔𝒆</h1>
        {/* <GearIcon className="settings-icon" /> */} {/* Settings icon if needed */}
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="parent-edu-content">
        {/* 정보 박스를 위한 새로운 카드 (흰색 박스) */}
        <section className="card">
          <div className="info-box">
            <div className="card-header">
              <h3>우리아이 발달 체크리스트 (만 16~36개월용)</h3>
            </div>
            <p className="disclaimer">
              <strong>필수 고지 사항:</strong> 본 체크리스트는 자녀의 발달에 대한 부모님의 이해를 돕기 위한 참고용 선별 도구입니다. 이 결과는 의학적 진단이 아니며, 진단을 대체할 수 없습니다. 자녀의 발달에 대해 조금이라도 우려되는 점이 있다면, 반드시 소아청소년과 의사 또는 발달 전문가와 상담하시기 바랍니다.
            </p>
            {!submitted && (
              <p className="instructions">각 문항을 읽고 자녀의 평소 행동에 가장 가까운 것을 선택해 주세요.</p>
            )}
          </div>
        </section>

        {/* 질문/결과를 위한 기존 카드 (흰색 박스) */}
        <section className="card">
          {!submitted ? (
            <div className="checklist-questions">
              {Object.keys(groupedQuestions).map(area => (
                <div key={area} className="question-area-group">
                  <h4 className="question-area-title">{area}</h4>
                  {groupedQuestions[`${area}`].map(q => (
                    <div key={q.id} className="question-item">
                      <p className="question-text">{q.text}</p>
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
                // 모든 질문에 답변하지 않아도 클릭 가능하게 disabled 제거
                style={{
                  backgroundColor: '#007bff', // Replace with your logo's color
                  color: 'white',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginTop: '20px',
                }}
              >
                결과 보기
              </button>
            </div>
          ) : (
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
                className="start-edu-button"
                onClick={() => {
                  setSubmitted(false);
                  setUserAnswers({}); // Reset answers here
                  setUnansweredQuestions([]); // unansweredQuestions 초기화
                }}
              >
                다시 하기
              </button>
            </div>
          )}
        </section>
      </main>

      {/* 기존 하단 네비게이션 바 유지 */}
      {/* <BottomNavigation onNavClick={onNavClick} currentScreen={currentScreen} /> */}
    </div>
  );
}

export default DevelopmentChecklistScreen;