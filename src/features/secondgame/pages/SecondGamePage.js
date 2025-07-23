import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SecondGameCard from '../components/SecondGameCard';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import '../styles/SecondGame.css';

const SecondGamePage = () => {
    // --- 상태 관리 ---
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userChoice, setUserChoice] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Hooks ---
    const navigate = useNavigate();
    const hasFetched = useRef(false);
    const questionStartTime = useRef(null); // 문제 시작 시간 기록용 Ref
    const userId = 11; // 예시 사용자 ID

    // --- 새 게임 시작 및 데이터 로딩 함수 ---
    const startNewGame = useCallback(async () => {
        setLoading(true);
        setError(null);
        setQuizzes([]);
        setCurrentQuizIndex(0);
        setScore(0);
        setUserChoice(null);
        setShowResult(false);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/quiz/secondgame/create/', {
                user_id: userId
            });
            setQuizzes(response.data.quizzes);
        } catch (err) {
            setError('퀴즈를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    // --- 컴포넌트 마운트 시 최초 게임 시작 ---
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            startNewGame();
        }
    }, [startNewGame]);

    // --- 새 문제가 표시될 때마다 시작 시간 기록 ---
    useEffect(() => {
        // 로딩이 아니고 퀴즈 데이터가 있을 때만 시간 기록
        if (!loading && quizzes.length > 0) {
            questionStartTime.current = Date.now();
        }
    }, [currentQuizIndex, loading, quizzes]);


    // --- 결과 저장 함수 ---
    const saveQuestionResult = async (resultData) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/quiz/secondgame/save/', resultData);
        } catch (err) {
            console.error('결과 저장에 실패했습니다:', err);
        }
    };

    // --- 이벤트 핸들러 ---
    const handleAnswerClick = (selectedOptionUrl) => {
        if (userChoice) return; // 답변 중복 선택 방지

        // 1. 소요 시간 계산
        const endTime = Date.now();
        const durationInSeconds = ((endTime - (questionStartTime.current || endTime)) / 1000).toFixed(2);

        // 2. 현재 퀴즈 정보 가져오기
        const currentQuiz = quizzes[currentQuizIndex];
        const isCorrect = selectedOptionUrl === currentQuiz.correct_answer;

        // 3. 서버로 보낼 데이터 구성
        const resultData = {
            user_id: userId,
            is_correct: isCorrect ? 1 : 0,
            duration_seconds: parseFloat(durationInSeconds),
            theme: currentQuiz.theme,
        };

        // 4. 결과 저장 API 호출
        saveQuestionResult(resultData);
        
        // 5. UI 업데이트 로직
        setUserChoice(selectedOptionUrl);
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (currentQuizIndex < quizzes.length - 1) {
                setCurrentQuizIndex(prev => prev + 1);
            } else {
                setShowResult(true);
            }
            setUserChoice(null);
        }, 1500);
    };
    
    const handlePlayAgain = () => startNewGame();
    const handleExit = () => navigate('/');

    // --- 렌더링 로직 ---
    if (loading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <div className="status-message error">{error}</div>;
    }

    return (
        <div className="second-game-background">
            <div className="second-game-container">
                {!showResult ? (
                    <>
                        <h1 className="game-title">이럴 땐 어떻게 할까?</h1>
                        <p className="game-instruction">주어진 상황에 맞는 행동을 골라보세요!</p>
                        {quizzes.length > 0 && (
                            <SecondGameCard
                                quiz={quizzes[currentQuizIndex]}
                                onAnswerClick={handleAnswerClick}
                                userChoice={userChoice}
                            />
                        )}
                    </>
                ) : (
                    <div className="modal-like-result">
                        <h1 className="result-title">🎉 참 잘했어요! 🎉</h1>
                        <p className="result-score">총 {quizzes.length}문제 중 {score}문제를 맞혔어요!</p>
                        <p className="result-coin">💰 {score}코인 획득!</p>
                        <div className="result-buttons">
                            <button onClick={handlePlayAgain} className="btn btn-replay">다시 풀기</button>
                            <button onClick={handleExit} className="btn btn-exit">나가기</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecondGamePage;