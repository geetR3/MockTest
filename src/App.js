// src/App.js

import React, { useState } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import QuizPage from './components/QuizPage'; 
import './App.css';

import mockTestsIcon from './images/mock-tests-icon.png';
import practiceSetsIcon from './images/practice-sets-icon.png';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedSet, setSelectedSet] = useState(null);
    const [quizType, setQuizType] = useState(null);

    const handleNavigation = (pageName) => {
        setCurrentPage(pageName);
        setSelectedSet(null);
        setQuizType(null);
    };

    const startQuiz = (type, setNumber) => {
        setQuizType(type);
        setSelectedSet(setNumber);
        setCurrentPage('quiz');
    };

    const renderContent = () => {
        // Yahan par home page ka code add karein
        if (currentPage === 'home') {
            return (
                <div className="main-content">
                    <h1 className="title">AIRLINE SECURITY EXAM</h1>
                    <h2 className="subtitle">Preparation</h2>
                    <div className="card-container">
                        <Card 
                            title="Mock Tests" 
                            imageUrl={mockTestsIcon} 
                            altText="Mock Tests illustration"
                            onClick={() => handleNavigation('mockTests')} 
                        />
                        <Card 
                            title="Practice Sets" 
                            imageUrl={practiceSetsIcon} 
                            altText="Practice Sets illustration"
                            onClick={() => handleNavigation('practiceSets')} 
                        />
                    </div>
                </div>
            );
        } else if (currentPage === 'mockTests') {
            return (
                <div className="main-content">
                    <h1 className="title">Mock Tests</h1>
                    <div className="sets-container">
                        {[...Array(20)].map((_, index) => (
                            <div key={index} className="practice-set-card">
                                <h3>Mock Test {index + 1}</h3>
                                <p>50 Questions</p>
                                <button className="start-button" onClick={() => startQuiz('mockTest', index + 1)}>Start Test</button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (currentPage === 'practiceSets') {
            return (
                <div className="main-content">
                    <h1 className="title">Practice Sets</h1>
                    <div className="sets-container">
                        {[...Array(20)].map((_, index) => (
                            <div key={index} className="practice-set-card">
                                <h3>Practice Set {index + 1}</h3>
                                <p>50 Questions</p>
                                <button className="start-button" onClick={() => startQuiz('practice', index + 1)}>Start Quiz</button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (currentPage === 'quiz') {
            return <QuizPage type={quizType} setNumber={selectedSet} />;
        }
    };

    return (
        <div className="app-container">
            <Header onNavigate={handleNavigation} />
            {renderContent()}
        </div>
    );
};

export default App;