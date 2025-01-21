import React, { useEffect, useState } from "react";
import './Leaderboard.css';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        const sortedLeaderboard = storedLeaderboard.sort((a, b) => b.score - a.score);
        setLeaderboard(sortedLeaderboard.slice(0, 15));
    }, []);

    const resetLeaderboard = () => {
        setLeaderboard([]);
        localStorage.removeItem('leaderboard');
    };

    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Time Taken (s)</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{entry.name}</td>
                            <td>{entry.score}</td>
                            <td>{entry.timeTaken}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="reset-leaderboard-button" onClick={resetLeaderboard}>
                Reset Leaderboard
            </button>
        </div>
    );
};

export default Leaderboard;
