import React from 'react';

const QuizCard = ({ quiz, onAnswerClick, userChoice, emotionImages }) => {
    if (!quiz) {
        return null;
    }

    const { quiz_image, answer_list, correct_answer } = quiz;

    const getButtonClass = (answer) => {
        if (!userChoice) {
            return 'answer-button';
        }
        if (answer === correct_answer) {
            return 'answer-button correct';
        }
        if (answer === userChoice) {
            return 'answer-button incorrect';
        }
        return 'answer-button disabled';
    };

    return (
        <div className="quiz-card">
            <img src={quiz_image} alt="퀴즈 이미지" className="quiz-image" />
            <div className="answer-options">
                {answer_list.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswerClick(answer)}
                        className={getButtonClass(answer)}
                        disabled={!!userChoice}
                    >
                        {/* 텍스트 대신 이미지 표시 */}
                        {emotionImages[answer] ? (
                            <img src={emotionImages[answer]} alt={answer} className="answer-choice-image" />
                        ) : (
                            // 이미지를 찾지 못할 경우 대비
                            answer
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizCard;