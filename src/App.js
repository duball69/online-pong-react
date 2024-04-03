// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MenuPage from "./MenuPage/MenuPage.js" // Check this path
import GamePage from './GamePage/GamePage'; // Check this path
import HighscoresPage from './HighscoresPage/HighscoresPage'; // Check this path


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/highscores" element={<HighscoresPage />} />
      </Routes>
    </Router>
  );
}

export default App;
