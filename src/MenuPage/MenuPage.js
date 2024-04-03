import React, { useState } from 'react';
import "./MenuPage.css";

function MenuPage() {
  const [playerName, setPlayerName] = useState('');

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleStartGame = () => {
    if (playerName.trim() !== '') {
      localStorage.setItem('playerName', playerName);
      window.location.href = "/game";
    } else {
      alert("Please enter your name to start the game.");
    }
  };

  const handleCheckHighScores = () => {
    window.location.href = "/highscores";
  };

  return (
    <div className="container">
      <h1>Welcome to Monster Pong</h1>
      <p>Monster Pong is a fun and addictive twist on the classic game of Pong. Control your monster paddle and compete against the AI to score points!</p>
      <input type="text" id="playerName" placeholder="Enter your name" value={playerName} onChange={handleInputChange} />
      <button className="back-to-play" onClick={handleStartGame}>Start Game</button>
      <button className="back-to-play" onClick={handleCheckHighScores}>Check High Scores</button>
    </div>
  );
}

export default MenuPage;
