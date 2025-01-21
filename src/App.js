import React, { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Leaderboard from "./components/Leaderboard";
import Footer from "./components/Footer";

const App = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [showAchievements, setShowAchievements] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const updateLeaderboard = (score, name) => {
    const updated = [...leaderboard, { name, score }];
    updated.sort((a, b) => b.score - a.score);
    setLeaderboard(updated);
  };

  const handleGameOver = (score) => {
    setUserScore(score);
    setShowAchievements(true);
    if (playerName) updateLeaderboard(score, playerName);
  };

  const startGame = () => {
    setGameStarted(true);
  };


  return (
    <div>
      {!gameStarted ? (
        <Home playerName={playerName} setPlayerName={setPlayerName} onStartGame={startGame} />
      ) : !showAchievements ? (
        <Quiz onGameOver={handleGameOver} />
      ) : (
        <div>
          <Leaderboard leaderboard={leaderboard} />
        </div>
      )}
      <Footer />

    </div>

  );
};

export default App;
