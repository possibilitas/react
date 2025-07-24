import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ThirdGameCard from '../components/ThirdGameCard';
import ThirdGameResultModal from '../components/ThirdGameResultModal';
import LoadingIndicator from '../../../components/common/LoadingIndicator';

import '../styles/ThirdGame.css';

function ThirdGamePage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = 11;
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [gameDuration, setGameDuration] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const saveThirdGameResult = useCallback(async (finalCards, durationInMs) => {
    if (!finalCards || finalCards.length === 0) return;
    const resultData = {
      user_id: userId,
      quiz_id: finalCards[0].quiz_id,
      duration_seconds: durationInMs / 1000,
    };
    try {
      await fetch('http://127.0.0.1:8000/api/quiz/cardgame/save/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultData),
      });
    } catch (error) {
      console.error('Error while saving game result:', error);
    }
  }, [userId]);

  const startThirdGame = useCallback(async () => {
    setIsGameOver(false);
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setGameDuration(null);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/quiz/cardgame/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '퀴즈 데이터를 불러오는 데 실패했습니다.');
      }
      const quizData = await response.json();
      const gameCards = quizData
        .map((card, index) => ({ ...card, uniqueId: `${card.quiz_id}-${index}` }))
        .sort(() => Math.random() - 0.5);
      setCards(gameCards);
      setStartTime(Date.now());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      startThirdGame();
    }
  }, [startThirdGame]);

  useEffect(() => {
    if (cards.length > 0 && matchedCards.length === cards.length) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      setGameDuration(duration);
      setIsGameOver(true);
      saveThirdGameResult(cards, duration);
    }
  }, [matchedCards, cards, startTime, saveThirdGameResult]);

  const handleCardClick = (clickedCard) => {
    if (isChecking || flippedCards.length === 2) return;
    if (flippedCards.length === 0) {
      setFlippedCards([clickedCard]);
      return;
    }
    if (flippedCards.length === 1) {
      setIsChecking(true);
      const newFlippedCards = [...flippedCards, clickedCard];
      setFlippedCards(newFlippedCards);
      if (newFlippedCards[0].correct_answer === newFlippedCards[1].correct_answer) {
        setTimeout(() => {
          setMatchedCards(prev => [...prev, newFlippedCards[0].uniqueId, newFlippedCards[1].uniqueId]);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };
  
  const handlePlayAgain = () => startThirdGame();
  const handleExit = () => navigate('/');

  if (loading) return <LoadingIndicator text="퀴즈 생성중..." />;
  if (error) return <div className="third-game-status error">이런! 오류가 발생했어요: {error}</div>;

  return (
    <div className="third-game-page">
      <div className="third-game-card-grid">
        {cards.map(card => (
          <ThirdGameCard
            key={card.uniqueId}
            card={card}
            isFlipped={flippedCards.some(c => c.uniqueId === card.uniqueId)}
            isMatched={matchedCards.includes(card.uniqueId)}
            onClick={handleCardClick}
          />
        ))}
      </div>
      {isGameOver && (
        <ThirdGameResultModal 
          duration={gameDuration}
          onPlayAgain={handlePlayAgain}
          onExit={handleExit}
        />
      )}
    </div>
  );
}

export default ThirdGamePage;