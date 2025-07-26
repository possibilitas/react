import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuizCard from '../components/QuizCard';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import '../styles/FirstGame.css';

const FirstGamePage = () => {
    // --- 상태 관리 ---
    const [quizzes, setQuizzes] = useState([]);
    const [emotionImages, setEmotionImages] = useState({}); // 감정 이미지 URL 맵
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userChoice, setUserChoice] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Hooks ---
    const navigate = useNavigate();
    const hasFetched = useRef(false);
    const questionStartTime = useRef(null);
    const quizUserId = 11; // 퀴즈 생성용 ID
    const itemUserId = 1;  // 아이템(감정 이미지)용 ID

    // --- 새 게임 시작 및 데이터 로딩 함수 ---
    const startNewGame = useCallback(async () => {
        setLoading(true);
        setError(null);
        setQuizzes([]);
        setEmotionImages({});
        setCurrentQuizIndex(0);
        setScore(0);
        setUserChoice(null);
        setShowResult(false);

        try {
            // 두 API를 동시에 호출
            const [quizResponse, emotionImgResponse] = await Promise.all([
                axios.post('http://127.0.0.1:8000/api/quiz/firstgame/create/', { user_id: quizUserId }),
                axios.post('http://127.0.0.1:8000/api/item/userid-to-emotions/', { user_id: itemUserId })
            ]);

            // 1. 퀴즈 데이터 설정
            setQuizzes(quizResponse.data);

            // 2. 감정 이미지 데이터 처리 및 설정
            const imageUrls = emotionImgResponse.data.item_detail_img;
            const imageMap = {};
            const emotionMapping = {
                happy: '기쁨',
                cry: '슬픔',
                angry: '화남',
                surprise: '놀람'
            };

            imageUrls.forEach(url => {
                const emotionKey = Object.keys(emotionMapping).find(key => url.includes(`_${key}.png`));
                if (emotionKey) {
                    const koreanEmotion = emotionMapping[emotionKey];
                    imageMap[koreanEmotion] = url;
                }
            });
            setEmotionImages(imageMap);

        } catch (err) {
            setError('퀴즈를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [quizUserId, itemUserId]);

    // --- 컴포넌트 마운트 시 최초 게임 시작 ---
    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            startNewGame();
        }
    }, [startNewGame]);

    // --- 새 문제가 표시될 때마다 시작 시간 기록 ---
    useEffect(() => {
        if (!loading && quizzes.length > 0) {
            questionStartTime.current = Date.now();
        }
    }, [currentQuizIndex, loading, quizzes]);


    // --- 결과 저장 함수 ---
    const saveQuestionResult = async (resultData) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/quiz/firstgame/save/', resultData);
        } catch (err) {
            console.error('결과 저장에 실패했습니다:', err);
        }
    };

    // --- 이벤트 핸들러 ---
    const handleAnswerClick = (selectedAnswer) => {
        if (userChoice) return;

        const endTime = Date.now();
        const durationInSeconds = ((endTime - (questionStartTime.current || endTime)) / 1000).toFixed(2);
        const currentQuiz = quizzes[currentQuizIndex];
        const isCorrect = selectedAnswer === currentQuiz.correct_answer;

        const resultData = {
            user_id: quizUserId,
            quiz_type: 1,
            quiz_id: currentQuiz.quiz_id,
            selected: selectedAnswer,
            is_correct: isCorrect ? 1 : 0,
            duration_seconds: parseFloat(durationInSeconds),
            emotion: currentQuiz.correct_answer,
        };
        saveQuestionResult(resultData);

        setUserChoice(selectedAnswer);
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

    if (loading) return <LoadingIndicator />;
    if (error) return <div className="status-message error">{error}</div>;

    return (
        <div className="first-game-background">
            <div className="first-game-container">
                {!showResult ? (
                    <>
                        <h1 className="game-title">표정 퀴즈!</h1>
                        <p className="game-instruction">사진 속 친구는 어떤 표정일까요?</p>
                        {quizzes.length > 0 && Object.keys(emotionImages).length > 0 && (
                            <QuizCard
                                quiz={quizzes[currentQuizIndex]}
                                onAnswerClick={handleAnswerClick}
                                userChoice={userChoice}
                                emotionImages={emotionImages}
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

export default FirstGamePage;