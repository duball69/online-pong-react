import React, { useEffect } from 'react';
import './GamePage.css'; // Import your styles

const GamePage = () => {
    useEffect(() => {
        const canvas = document.getElementById('gameCanvas');
        canvas.addEventListener('mousemove', moveMonster);
        const ctx = canvas.getContext('2d');

        const centerCanvas = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const canvasWidth = canvas.offsetWidth;
            const canvasHeight = canvas.offsetHeight;

            const topOffset = (windowHeight - canvasHeight) / 2;
            const leftOffset = (windowWidth - canvasWidth) / 2;

            canvas.style.position = 'absolute';
            canvas.style.top = `${topOffset}px`;
            canvas.style.left = `${leftOffset}px`;
        };

        centerCanvas();
        window.addEventListener('resize', centerCanvas);
        return () => {
            window.removeEventListener('resize', centerCanvas);
            canvas.removeEventListener('mousemove', moveMonster);
        };
    }, []);

    const monsterWidth = 20;
    const monsterHeight = 50;
    let monster1X = monsterWidth;
    let monster1Y = window.innerHeight / 2 - monsterHeight / 2;
    let monster2X = window.innerWidth - monsterWidth * 2;
    let monster2Y = window.innerHeight / 2 - monsterHeight / 2;
    const ballSize = 10;
    let ballX = window.innerWidth / 2;
    let ballY = window.innerHeight / 2;
    let ballSpeedX = 10;
    let ballSpeedY = 10 ;
    let score1 = 0;
    let score2 = 0;
    const winningScore = 1;
    const playerName = localStorage.getItem('playerName') || 'Player';
    let gameEnded = false;
    
    const moveMonster = (e) => {
        const canvas = document.getElementById('gameCanvas');
        const mouseX = e.clientX - canvas.offsetLeft;
        const mouseY = e.clientY - canvas.offsetTop;
        
        // Define a speed factor
        const speedFactor = 1; // Adjust this value to change the speed
        
        // Update player's position based on mouse position
        if (mouseX > 0 && mouseX < window.innerWidth / 2) {
            // Increase speed by multiplying the difference by the speed factor
            monster1X += (mouseX - monster1X) * speedFactor;
        }
        if (mouseY > 0 && mouseY < window.innerHeight - monsterHeight) {
            // Increase speed by multiplying the difference by the speed factor
            monster1Y += (mouseY - monster1Y) * speedFactor;
        }
    };
    

    const update = () => {
        const canvas = document.getElementById('gameCanvas'); // Fix added here
        if (gameEnded) {
            return;
        }
    
        ballX += ballSpeedX;
        ballY += ballSpeedY;
    
        const speedFactorX = 0.5; // Adjust this value to change horizontal speed
        const speedFactorY = 0.5; // Adjust this value to change vertical speed
    
        // Update AI monster's position based on ball's position
        if (ballX > window.innerWidth / 2) {
            // Adjust AI monster's position based on ball's vertical position
            if (ballY > monster2Y + monsterHeight / 2) {
                monster2Y += (ballY - monster2Y - monsterHeight / 2) * speedFactorY;
            } else {
                monster2Y -= (monster2Y + monsterHeight / 2 - ballY) * speedFactorY;
            }
        }
    
        if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > window.innerHeight) {
            ballSpeedY = -ballSpeedY;
        }
        if (ballX - ballSize / 2 < monster1X + monsterWidth && ballY > monster1Y && ballY < monster1Y + monsterHeight) {
            ballSpeedX = Math.abs(ballSpeedX);
        } else if (ballX + ballSize / 2 > monster2X && ballY > monster2Y && ballY < monster2Y + monsterHeight) {
            if (Math.abs(ballSpeedX) < 2) {
                ballSpeedX = ballSpeedX > 0 ? 2 : -2;
            } else {
                ballSpeedX = -ballSpeedX;
            }
        }
        if (ballX - ballSize / 2 < 0) {
            score2++;
            resetBall();
        } else if (ballX + ballSize / 2 > window.innerWidth) {
            score1++;
            resetBall();
        }
        if (score1 === winningScore || score2 === winningScore) {
            endGame();
        }
    };
    
    const resetBall = () => {
        ballX = window.innerWidth / 2;
        ballY = window.innerHeight / 2;
        ballSpeedX = -ballSpeedX;
    };

    
    const endGame = () => {
        if (!gameEnded) {
            gameEnded = true;
            const winningPlayer = score1 === winningScore ? playerName : 'Player 2';
            const highScores = JSON.parse(localStorage.getItem('highScores')) || {};
            highScores[winningPlayer] = (highScores[winningPlayer] || 0) + 1;
            localStorage.setItem('highScores', JSON.stringify(highScores));
            showEndGameOverlay();
            
            // Remove event listener for mouse movement
            const canvas = document.getElementById('gameCanvas');
            canvas.removeEventListener('mousemove', moveMonster);
        }
    };
    

    const showEndGameOverlay = () => {
        const canvas = document.getElementById('gameCanvas'); // Fix added here
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content');
        const resultText = document.createElement('p');
        const result = score1 === winningScore ? `${playerName} wins!` : 'Player 2 wins!';
        resultText.textContent = result;
        resultText.style.color = '#000'; // Set text color to black

        overlayContent.appendChild(resultText);
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart Game';
        restartButton.classList.add('game-button');
        restartButton.addEventListener('click', () => {
            window.location.reload();
        });
        buttonContainer.appendChild(restartButton);
        const highScoresButton = document.createElement('button');
        highScoresButton.textContent = 'Check High Scores';
        highScoresButton.classList.add('game-button');
        highScoresButton.addEventListener('click', () => {
            window.location.href = 'highscores';
        });
        buttonContainer.appendChild(highScoresButton);
        overlayContent.appendChild(buttonContainer);
        overlay.appendChild(overlayContent);
        document.body.appendChild(overlay);
    };

    const render = () => {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#000'; // Border color
        ctx.strokeRect(0, 0, canvas.width, canvas.height); // Draw border
        ctx.fillStyle = '#0ff';
        ctx.fillRect(monster1X, monster1Y, monsterWidth, monsterHeight);
        ctx.fillStyle = '#f0f';
        ctx.fillRect(monster2X, monster2Y, monsterWidth, monsterHeight);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '24px Orbitron';
        ctx.fillText(`${playerName}: ${score1}`, 20, 30);
        ctx.fillText(`Player 2: ${score2}`, canvas.width - 150, 30);
    };

    const gameLoop = () => {
        update();
        render();
        requestAnimationFrame(gameLoop);
    };

    useEffect(() => {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
    
        const centerCanvas = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
    
            // Set canvas size to match window dimensions
            canvas.width = windowWidth;
            canvas.height = windowHeight;
    
            // Calculate center offsets for positioning
            const canvasWidth = canvas.offsetWidth;
            const canvasHeight = canvas.offsetHeight;
            const topOffset = (windowHeight - canvasHeight) / 2;
            const leftOffset = (windowWidth - canvasWidth) / 2;
    
            // Position canvas
            canvas.style.position = 'absolute';
            canvas.style.top = `${topOffset}px`;
            canvas.style.left = `${leftOffset}px`;
        };
    
        centerCanvas();
        window.addEventListener('resize', centerCanvas);
        return () => {
            window.removeEventListener('resize', centerCanvas);
        };
    }, []);
    
    useEffect(() => {
        gameLoop();
    }, []);

    return (
        <div>
            <canvas id="gameCanvas" width="800" height="600"></canvas>
            <div id="leaderboard"></div>
        </div>
    );
}

export default GamePage;
