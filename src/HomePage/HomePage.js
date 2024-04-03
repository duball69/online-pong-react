// App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState('');

  const handleStartGame = () => {
    if (playerName.trim() !== '') {
      localStorage.setItem('playerName', playerName);
      window.location.href = "/game"; // Assuming your game page route is "/game"
    } else {
      alert("Please enter your name to start the game.");
    }
  };

  const handleCheckHighScores = () => {
    window.location.href = "/highscores"; // Assuming your high scores page route is "/highscores"
  };

  // Check if player's name exists in local storage
  const storedName = localStorage.getItem('playerName');
  if (storedName) {
    // If exists, set the input field value to the stored name
    setPlayerName(storedName);
  }

  return (
    <div className="container">
      <h1>Welcome to Monster Pong</h1>
      <p>Monster Pong is a fun and addictive twist on the classic game of Pong. Control your monster paddle and compete against the AI to score points!</p>
      {/* Add an input field for the player's name */}
      <input type="text" placeholder="Enter your name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
      <button className="back-to-play" onClick={handleStartGame}>Start Game</button>
      <button className="back-to-play" onClick={handleCheckHighScores}>Check High Scores</button>
    </div>
  );
}

export default App;
