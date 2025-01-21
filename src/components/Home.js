import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import Leaderboard from "./Leaderboard";
import Footer from "./Footer";
import './Home.css';

const Home = () => {
    const [startQuiz, setStartQuiz] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [isStartDisabled, setIsStartDisabled] = useState(true);
    const [quizCategory, setQuizCategory] = useState(null);
    const [score, setScore] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [startTime, setStartTime] = useState(null);

    const handleCategorySelect = (category) => {
        setQuizCategory(category.toLowerCase());
        setSelectedCategory(category);
    };

    const categories = ["Geography", "Math", "History", "Science", "Biology", "Technology"];

    const handleNameChange = (e) => {
        const name = e.target.value;
        setPlayerName(name);
        setIsStartDisabled(name.trim() === "");
    };

    const handleQuizStart = () => {
        setStartQuiz(true);
        setStartTime(Date.now());
    };

    const handleQuizEnd = (finalScore) => {
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000);

        setScore(finalScore);
        setGameOver(true);

        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        const existingEntryIndex = leaderboard.findIndex(entry => entry.name === playerName);

        if (existingEntryIndex > -1) {
            leaderboard[existingEntryIndex].score = finalScore;
            leaderboard[existingEntryIndex].timeTaken = timeTaken;
        } else {
            leaderboard.push({ name: playerName, score: finalScore, timeTaken });
        }

        leaderboard.sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    };



    const toggleLeaderboard = () => {
        setShowLeaderboard(!showLeaderboard);
    };

    return (
        <div className="home-container">
            {!startQuiz ? (
                <div className="home-content">
                    <h1 className="home-title">
                        Welcome to the <span className="quiz-master"> Quiz Master</span>
                    </h1>

                    <div className="name-input-section">
                        <label className="name-label">Enter your name:</label>
                        <input
                            type="text"
                            value={playerName}
                            onChange={handleNameChange}
                            placeholder="Enter your name"
                            className="name-input"
                        />
                    </div>
                    <div className="category-select-section">
                        <label>Select Quiz Category:</label>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                                className={`category-button ${selectedCategory === category ? 'selected' : ''}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <button
                        className={`start-btn ${isStartDisabled || !quizCategory ? "disabled" : ""}`}
                        onClick={handleQuizStart}
                        disabled={isStartDisabled || !quizCategory}
                    >
                        Start Quiz
                    </button>
                </div>
            ) : (
                <Quiz
                    quizCategory={quizCategory}
                    playerName={playerName}
                    onRestart={() => setStartQuiz(false)}
                    onQuizEnd={handleQuizEnd}
                />
            )}

            <div className="button-container">
                <button className="leaderboard-toggle" onClick={toggleLeaderboard}>
                    {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
                </button>

                <button className="multiplayer-button">
                    Multiplayer (Coming Soon)
                </button>
            </div>

            {showLeaderboard && (
                <>
                    <div className={`leaderboard-modal ${showLeaderboard ? 'show' : ''}`}>
                        <button className="close-button" onClick={toggleLeaderboard}>
                        </button>
                        <Leaderboard score={score} />
                    </div>
                </>
            )}

            <Footer />
        </div>
    );
};

export default Home;