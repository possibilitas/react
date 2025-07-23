import React from 'react';

const SecondGameCard = ({ quiz, onAnswerClick, userChoice }) => {
    if (!quiz) {
        return null;
    }

    const { situation_image, options, correct_answer } = quiz;

    const getButtonClass = (optionUrl) => {
        if (!userChoice) {
            return 'answer-button';
        }
        if (optionUrl === correct_answer) {
            return 'answer-button correct';
        }
        if (optionUrl === userChoice) {
            return 'answer-button incorrect';
        }
        return 'answer-button disabled';
    };

    return (
        <div className="quiz-card">
            <img src={situation_image} alt="상황 이미지" className="quiz-image" />
            <div className="answer-options">
                {options.map((optionUrl, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswerClick(optionUrl)}
                        className={getButtonClass(optionUrl)}
                        disabled={!!userChoice}
                    >
                        <img src={optionUrl} alt={`선택지 ${index + 1}`} className="answer-choice-image" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SecondGameCard;