// src/components/QuizPage.js

import React, { useState, useMemo } from 'react';
import { quizData } from '../data/questions';
import './QuizPage.css';

const QuizPage = ({ type, setNumber }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    // **Step 1: shuffleArray function ko useMemo se pehle move karein.**
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const currentSet = quizData.find(set => set.set === setNumber);
    
    // **Step 2: Ab useMemo call karein.**
    const questions = useMemo(() => {
        if (!currentSet) return [];
        
        const setQuestions = currentSet.questions;
        return type === 'mockTest'
            ? shuffleArray(setQuestions)
            : setQuestions;
    }, [type, currentSet]); 
    
    if (!currentSet) {
        return <div>Quiz set not found.</div>;
    }
    
    const handleOptionSelect = (option) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        if (option === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
    };

    const getOptionClassName = (option) => {
        if (!isAnswered) return '';

        if (option === questions[currentQuestionIndex].answer) {
            return 'correct';
        }
        if (selectedOption === option) {
            return 'wrong';
        }
        return '';
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowScore(true);
        }
    };
    
    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
            setIsAnswered(false);
        }
    };

    const handleSubmit = () => {
        setShowScore(true);
    };
    
    if (showScore) {
        return (
            <div className="score-page">
                <div className="score-card">
                    <h2>Quiz Complete! 🎉</h2>
                    <div className="score-details">
                        <p className="final-score">{score}</p>
                        <p className="total-questions">out of {questions.length} correct answers.</p>
                    </div>
                    <div className="score-actions">
                        <button onClick={() => window.location.reload()} className="restart-button">Restart Quiz</button>
                        <button onClick={() => window.location.href = '/'} className="home-button">Go to Home</button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-page">
            <h1 className="quiz-title">{type === 'mockTest' ? 'Mock Test' : 'Practice Set'} {setNumber}</h1>
            <p className="question-counter">Question {currentQuestionIndex + 1} of {questions.length}</p>
            
            <div className="question-card">
                <p className="question-text">Q{currentQuestionIndex + 1}. {currentQuestion.question}</p>
                <ul className="options-list">
                    {currentQuestion.options.map((option, index) => (
                        <li 
                            key={index} 
                            onClick={() => handleOptionSelect(option)}
                            className={getOptionClassName(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="quiz-navigation">
                <button className="nav-button" onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</button>
                {currentQuestionIndex < questions.length - 1 && (
                    <button className="nav-button next-button" onClick={handleNext}>Next</button>
                )}
                {currentQuestionIndex === questions.length - 1 && (
                    <button className="nav-button submit-button" onClick={handleSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
};

export default QuizPage;