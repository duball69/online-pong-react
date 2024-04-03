import React, { useEffect } from 'react';
import './HighscoresPage.css'; // Import your styles

const HighScoresPage = () => {
    useEffect(() => {
        // Retrieve high scores from local storage
        const highScores = JSON.parse(localStorage.getItem('highScores')) || {};

        // Display high scores
        const highScoresList = document.getElementById('highScoresList');
        
        // Clear the existing list items
        highScoresList.innerHTML = '';

        for (const player in highScores) {
            const listItem = document.createElement('li');
            listItem.textContent = `${player}: ${highScores[player]} victories`;
            listItem.style.color = '#fff'; // Set text color to white
            highScoresList.appendChild(listItem);
        }
    }, []); // Run only once on component mount

    // Function to handle navigation back to the game page
    const goBack = () => {
        window.location.href = "/"; // Redirect to the root URL (game page)
    };

    return (
        <div>
            <h1>High Scores</h1>
            <ul id="highScoresList"></ul>
            
            {/* Button to go back to play */}
            <button className="back-to-play" onClick={goBack}>Back to Play</button>
        </div>
    );
};

export default HighScoresPage;
