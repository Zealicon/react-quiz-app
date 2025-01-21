import React, { useState } from "react";

const Quiz = () => {
    // Sample quiz data (you can expand this or fetch it dynamically)
    const quizQuestions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Rome", "Berlin"],
            answer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Venus", "Jupiter"],
            answer: "Mars",
        },
        {
            question: "Who wrote 'Hamlet'?",
            options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
            answer: "Shakespeare",
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);

    const handleNextQuestion = () => {
        if (selectedOption === quizQuestions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        } else {
            setQuizEnded(true);
        }
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            {!quizEnded ? (
                <div>
                    <h2>{quizQuestions[currentQuestionIndex].question}</h2>
                    <div>
                        {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                            <label key={index}>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={handleOptionChange}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    <button onClick={handleNextQuestion} disabled={!selectedOption}>
                        Next Question
                    </button>
                </div>
            ) : (
                <div>
                    <h2>Quiz Ended</h2>
                    <p>Your Score: {score} / {quizQuestions.length}</p>
                </div>
            )}
        </div>
    );
};

export default Quiz;
