import React, { useState, useEffect, useRef } from "react";
import './Quiz.css';

const Quiz = ({ quizCategory, onRestart, onQuizEnd }) => {
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timer, setTimer] = useState(10);
    const [gameOver, setGameOver] = useState(false);
    const [answerStatus, setAnswerStatus] = useState(null);
    const scoreRef = useRef(score);

    const questionsByCategory = {
        geography: [
            {
                question: "What is the capital of France?",
                options: ["Paris", "London", "Berlin", "Rome"],
                answer: "Paris",
            },
            {
                question: "Which country is known as the Land of the Rising Sun?",
                options: ["China", "Japan", "India", "South Korea"],
                answer: "Japan",
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                answer: "Pacific Ocean",
            },
            {
                question: "Which continent is known as the Dark Continent?",
                options: ["Asia", "Africa", "South America", "Australia"],
                answer: "Africa",
            },
            {
                question: "What is the longest river in the world?",
                options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
                answer: "Nile River",
            },
            {
                question: "Which country is both in Europe and Asia?",
                options: ["Turkey", "Russia", "Egypt", "Greece"],
                answer: "Turkey",
            },
            {
                question: "What mountain range separates Europe and Asia?",
                options: ["Himalayas", "Andes", "Ural Mountains", "Rocky Mountains"],
                answer: "Ural Mountains",
            },
            {
                question: "Which desert is the largest in the world?",
                options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Kalahari Desert"],
                answer: "Sahara Desert",
            },
            {
                question: "What is the smallest country in the world?",
                options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
                answer: "Vatican City",
            },
            {
                question: "Which city is known as the Big Apple?",
                options: ["Los Angeles", "New York City", "Chicago", "Miami"],
                answer: "New York City",
            },
        ],
        math: [
            {
                question: "What is 5 + 3?",
                options: ["8", "7", "9", "10"],
                answer: "8",
            },
            {
                question: "What is 7 * 6?",
                options: ["42", "40", "36", "44"],
                answer: "42",
            },
            {
                question: "What is the square root of 64?",
                options: ["8", "6", "10", "12"],
                answer: "8",
            },
            {
                question: "What is 12 - 5?",
                options: ["7", "6", "5", "8"],
                answer: "7",
            },
            {
                question: "What is 15% of 200?",
                options: ["30", "25", "35", "40"],
                answer: "30",
            },
            {
                question: "What is 3.14 rounded to the nearest whole number?",
                options: ["3", "4", "2", "5"],
                answer: "3",
            },
            {
                question: "What is the value of π (pi)?",
                options: ["3.14", "2.71", "1.41", "1.61"],
                answer: "3.14",
            },
            {
                question: "How many sides does a hexagon have?",
                options: ["5", "6", "7", "8"],
                answer: "6",
            },
            {
                question: "What is 8 / 2?",
                options: ["3", "4", "5", "6"],
                answer: "4",
            },
            {
                question: "What is the area of a rectangle with length 5 and width 3?",
                options: ["15", "10", "20", "25"],
                answer: "15",
            },
        ],
        history: [
            {
                question: "Who was the first president of the United States?",
                options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson"],
                answer: "George Washington",
            },
            {
                question: "Which year did World War II end?",
                options: ["1945", "1939", "1950", "1918"],
                answer: "1945",
            },
            {
                question: "Who was known as the Iron Lady?",
                options: ["Margaret Thatcher", "Angela Merkel", "Indira Gandhi", "Golda Meir"],
                answer: "Margaret Thatcher",
            },
            {
                question: "What was the ancient civilization in Egypt known for?",
                options: ["Pyramids", "Ziggurats", "Temples", "Colosseums"],
                answer: "Pyramids",
            },
            {
                question: "Who discovered America?",
                options: ["Christopher Columbus", "Ferdinand Magellan", "Leif Erikson", "Vasco da Gama"],
                answer: "Christopher Columbus",
            },
            {
                question: "What year did the Titanic sink?",
                options: ["1912", "1905", "1920", "1898"],
                answer: "1912",
            },
            {
                question: "Who was the first woman to fly solo across the Atlantic Ocean?",
                options: ["Amelia Earhart", "Bessie Coleman", "Harriet Quimby", "Jacqueline Cochran"],
                answer: "Amelia Earhart",
            },
            {
                question: "Which war was fought between the North and South regions in the United States?",
                options: ["Civil War", "World War I", "Revolutionary War", "Vietnam War"],
                answer: "Civil War",
            },
            {
                question: "What was the primary purpose of the Great Wall of China?",
                options: ["Defense", "Trade", "Transportation", "Communication"],
                answer: "Defense",
            },
            {
                question: "Who was the first emperor of China?",
                options: ["Qin Shi Huang", "Sun Yat-sen", "Kublai Khan", "Confucius"],
                answer: "Qin Shi Huang",
            },
        ],

        science: [
            {
                question: "What is the chemical symbol for water?",
                options: ["H2O", "O2", "CO2", "N2"],
                answer: "H2O",
            },
            {
                question: "What is the speed of light?",
                options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "500,000 km/s"],
                answer: "300,000 km/s",
            },
            {
                question: "What gas do plants absorb from the atmosphere?",
                options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                answer: "Carbon Dioxide",
            },
            {
                question: "What is the powerhouse of the cell?",
                options: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"],
                answer: "Mitochondria",
            },
            {
                question: "What is the process by which plants make their food?",
                options: ["Photosynthesis", "Respiration", "Digestion", "Fermentation"],
                answer: "Photosynthesis",
            },
            {
                question: "What is the largest planet in our solar system?",
                options: ["Earth", "Jupiter", "Mars", "Saturn"],
                answer: "Jupiter",
            },
            {
                question: "What is the hardest natural substance on Earth?",
                options: ["Gold", "Diamond", "Iron", "Platinum"],
                answer: "Diamond",
            },
            {
                question: "What is the main organ responsible for pumping blood?",
                options: ["Heart", "Lungs", "Kidneys", "Brain"],
                answer: "Heart",
            },
            {
                question: "What is the human body's largest organ?",
                options: ["Skin", "Liver", "Heart", "Lungs"],
                answer: "Skin",
            },
            {
                question: "What is the basic unit of life?",
                options: ["Atom", "Cell", "Molecule", "Organ"],
                answer: "Cell",
            },
        ],

        biology: [
            {
                question: "What is the powerhouse of the cell?",
                options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
                answer: "Mitochondria",
            },
            {
                question: "Which organ is responsible for pumping blood?",
                options: ["Lungs", "Brain", "Heart", "Kidneys"],
                answer: "Heart",
            },
            {
                question: "What is the study of living organisms called?",
                options: ["Physics", "Chemistry", "Biology", "Ecology"],
                answer: "Biology",
            },
            {
                question: "What is the largest bone in the human body?",
                options: ["Femur", "Tibia", "Humerus", "Pelvis"],
                answer: "Femur",
            },
            {
                question: "What type of blood cells fight infections?",
                options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
                answer: "White blood cells",
            },
            {
                question: "What is the main function of the respiratory system?",
                options: ["To circulate blood", "To break down food", "To exchange gases", "To provide support"],
                answer: "To exchange gases",
            },
            {
                question: "Which part of the brain controls balance?",
                options: ["Cerebrum", "Cerebellum", "Brainstem", "Thalamus"],
                answer: "Cerebellum",
            },
            {
                question: "What is the process of cell division called?",
                options: ["Mitosis", "Meiosis", "Fission", "Binary division"],
                answer: "Mitosis",
            },
            {
                question: "Which vitamin is produced when exposed to sunlight?",
                options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin B12"],
                answer: "Vitamin D",
            },
            {
                question: "What is the primary function of the kidneys?",
                options: ["To filter blood", "To produce hormones", "To digest food", "To circulate blood"],
                answer: "To filter blood",
            },
        ],
        technology: [
            {
                question: "What does HTML stand for?",
                options: ["HyperText Markup Language", "HyperText Machine Language", "Home Tool Markup Language", "HyperText Modeling Language"],
                answer: "HyperText Markup Language",
            },
            {
                question: "Which company developed the iPhone?",
                options: ["Samsung", "Apple", "Nokia", "Huawei"],
                answer: "Apple",
            },
            {
                question: "What does CPU stand for?",
                options: ["Central Processing Unit", "Computer Personal Unit", "Central Peripheral Unit", "Central Programming Unit"],
                answer: "Central Processing Unit",
            },
            {
                question: "Which programming language is known as the language of the web?",
                options: ["Python", "Java", "C++", "JavaScript"],
                answer: "JavaScript",
            },
            {
                question: "What does Wi-Fi stand for?",
                options: ["Wireless Fidelity", "Wide Fidelity", "Wireless Functionality", "Wide Functionality"],
                answer: "Wireless Fidelity",
            },
            {
                question: "Which company is known for its search engine?",
                options: ["Yahoo", "Google", "Bing", "DuckDuckGo"],
                answer: "Google",
            },
            {
                question: "What is the most widely used operating system?",
                options: ["Windows", "Linux", "macOS", "Android"],
                answer: "Windows",
            },
            {
                question: "What is the term for a computer program that replicates itself?",
                options: ["Virus", "Trojan", "Worm", "Malware"],
                answer: "Virus",
            },
            {
                question: "Which technology is used for making video calls?",
                options: ["VoIP", "FTP", "HTTP", "SMTP"],
                answer: "VoIP",
            },
            {
                question: "What is the primary function of an operating system?",
                options: ["To run applications", "To provide security", "To manage hardware and software resources", "To connect to the internet"],
                answer: "To manage hardware and software resources",
            },
        ],
    };


    const validCategory = quizCategory && Object.keys(questionsByCategory).includes(quizCategory)
        ? quizCategory
        : "math";

    console.log("Selected quizCategory:", validCategory);


    const questions = questionsByCategory[validCategory];

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 1) {
                    return prevTimer - 1;
                } else {
                    clearInterval(countdown);
                    setGameOver(true);
                    onQuizEnd(scoreRef.current);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [quizCategory]);

    if (questions.length === 0) {
        return <div>No questions available for this category.</div>;
    }

    const handleAnswerSelection = (option) => {
        setSelectedAnswer(option);
        if (option === questions[currentQuestionIndex].answer) {
            setAnswerStatus('correct');
        } else {
            setAnswerStatus('incorrect');
        }
    };

    const nextQuestion = () => {
        if (selectedAnswer === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setAnswerStatus(null);
            setTimer(10);
        } else {
            setGameOver(true);
            onQuizEnd(score + (selectedAnswer === questions[currentQuestionIndex].answer ? 1 : 0));;
        }
    };


    return (
        <div className="quiz-container">
            {!gameOver ? (
                <div className="quiz-content">
                    <h2 className="quiz-question">{questions[currentQuestionIndex].question}</h2>
                    <div className="quiz-options">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button
                                key={index}
                                className={`quiz-option
                                    ${selectedAnswer !== null && option === questions[currentQuestionIndex].answer && answerStatus === 'correct' ? 'correct' : ''}
                                    ${selectedAnswer !== null && option !== questions[currentQuestionIndex].answer && answerStatus === 'incorrect' && option === selectedAnswer ? 'incorrect' : ''}
                                    ${selectedAnswer !== null && option !== selectedAnswer && option === questions[currentQuestionIndex].answer && answerStatus === 'incorrect' ? 'correct' : ''}
                                `}
                                onClick={() => handleAnswerSelection(option)}
                                disabled={selectedAnswer !== null}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <button className="next-button" onClick={nextQuestion} disabled={!selectedAnswer}>
                        Next Question
                    </button>
                    <div className="timer">Time remaining: {timer} seconds</div>
                </div>
            ) : (
                <div className="game-over">
                    <h2>Game Over</h2>
                    <p>Your Score: {score}</p>
                    <button onClick={onRestart}>Restart Quiz</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
