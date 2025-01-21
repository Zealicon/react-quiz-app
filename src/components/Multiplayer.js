import React, { useState, useEffect } from "react";

const Multiplayer = ({ onGameOver }) => {
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [player1Answer, setPlayer1Answer] = useState(null);
    const [player2Answer, setPlayer2Answer] = useState(null);
    const [timer, setTimer] = useState(30);

    const questions = [
        { question: "What is 5 + 3?", options: ["8", "7", "9", "10"], answer: "8" },
        { question: "What is 10 - 2?", options: ["6", "7", "8", "9"], answer: "8" },
    ];

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(countdown);
        } else {
            nextQuestion();
        }
    }, [timer]);

    const handleAnswer = (player, value) => {
        if (player === 1) setPlayer1Answer(value);
        if (player === 2) setPlayer2Answer(value);
    };

    const nextQuestion = () => {
        if (player1Answer === questions[currentQuestionIndex].answer) {
            setPlayer1Score(player1Score + 1);
        }
        if (player2Answer === questions[currentQuestionIndex].answer) {
            setPlayer2Score(player2Score + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setPlayer1Answer(null);
            setPlayer2Answer(null);
            setTimer(10);
        } else {
            onGameOver(player1Score + player2Score);
        }
    };

    return (
        <div className="multiplayer-container">
            <h2>Multiplayer Quiz</h2>
            <p>Time remaining: {timer} seconds</p>
            <h3>{questions[currentQuestionIndex].question}</h3>
            <div>
                <h4>Player 1</h4>
                {questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(1, option)}
                        disabled={!!player1Answer}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div>
                <h4>Player 2</h4>
                {questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(2, option)}
                        disabled={!!player2Answer}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <button
                onClick={nextQuestion}
                disabled={!player1Answer || !player2Answer}
            >
                Next Question
            </button>
        </div>
    );
};

export default Multiplayer;
