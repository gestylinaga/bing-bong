"use strict";
// 🏓 Bing Bong
// Board
let board;
let context;
const boardWidth = 900;
const boardHeight = 600;
// Player Paddles
const playerWidth = 10;
const playerHeight = 70;
let playerVelocity = 0;
let player1 = {
    x: 20,
    y: boardHeight / 2 - playerHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocity: playerVelocity,
};
let player2 = {
    x: boardWidth - playerWidth - 20,
    y: boardHeight / 2 - playerHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocity: playerVelocity,
};
// Ball
const ballWidth = 10;
const ballHeight = 10;
let ball = {
    x: boardWidth / 2 - ballWidth,
    y: boardHeight / 2 - ballHeight,
    width: ballWidth,
    height: ballHeight,
    velocityX: 2,
    velocityY: 1,
};
// Player Scores
let player1Score = 0;
let player2Score = 0;
// Audio Volume
let volume = 0.5;
window.onload = () => {
    // Draw Board
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext('2d');
    // Draw Player Paddles
    context.fillStyle = '#fff';
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
};
function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    // Draw Center Divider
    for (let i = 10; i < board.height; i += 25) {
        context.fillRect(board.width / 2 - 5, i, 5, 10);
    }
    // Redrawing Player Paddles with Movement
    let nextPlayer1Pos = player1.y + player1.velocity;
    if (!outOfBounds(nextPlayer1Pos)) {
        player1.y = nextPlayer1Pos;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    let nextPlayer2Pos = player2.y + player2.velocity;
    if (!outOfBounds(nextPlayer2Pos)) {
        player2.y = nextPlayer2Pos;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
    // Draw Ball
    context.fillStyle = '#fff';
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
    // Ball / Wall Collision
    if (ball.y <= 0 || ball.y + ball.height >= board.height) {
        ball.velocityY *= -1; // reverse direction
        collisionSound();
    }
    // Ball / Paddle Collision
    if (detectCollision(ball, player1)) {
        if (ball.x < player1.x + player1.width) {
            // left side of ball collides with right side of player1
            ball.velocityX *= -1; // reverse direction
            collisionSound();
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ball.width > player2.x) {
            // right side of ball collides with left side of player2
            ball.velocityX *= -1; // reverse direction
            collisionSound();
        }
    }
    // Point Scored / Reset Ball
    if (ball.x < 0) {
        const fyl = new Audio('./audio/fyl.mp3');
        fyl.volume = volume;
        fyl.play();
        player2Score++;
        resetBall(1); // Towards player2
    }
    else if (ball.x + ball.width > boardWidth) {
        const fyl = new Audio('./audio/fyl.mp3');
        fyl.volume = volume;
        fyl.play();
        player1Score++;
        resetBall(-1); // Towards player1
    }
    // Draw Scores
    context.font = '45px system-ui';
    context.fillText(player1Score, boardWidth / 5, 45);
    context.fillText(player2Score, boardWidth * 4 / 5 - 45, 45);
}
function outOfBounds(yPos) {
    return (yPos < 0 || yPos + playerHeight > boardHeight);
}
function movePlayer(e) {
    // Player 1 Movement
    if (e.key === 'w') {
        player1.velocity = -3;
    }
    else if (e.key === 's') {
        player1.velocity = 3;
    }
    // Player 2 Movement
    if (e.key === 'ArrowUp') {
        player2.velocity = -3;
    }
    else if (e.key === 'ArrowDown') {
        player2.velocity = 3;
    }
}
function detectCollision(a, b) {
    return a.x <= b.x + b.width && // a's top left corner !reach b's top right
        a.x + a.width >= b.x && // a's top right corner passes b's top left
        a.y <= b.y + b.height && // a' top left corner !reach b's bottom left
        a.y + a.height >= b.y; // a's bottom left corner passes b's top left
}
let currentSound = 1;
function collisionSound() {
    const bing = new Audio('./audio/bing.mp3');
    const bong = new Audio('./audio/bong.mp3');
    if (currentSound === 1) {
        bing.volume = volume;
        bing.play();
    }
    else {
        bong.volume = volume;
        bong.play();
    }
    currentSound *= -1;
}
function resetBall(direction) {
    ball = {
        x: boardWidth / 2 - ballWidth,
        y: boardHeight / 2 - ballHeight,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction,
        velocityY: 2,
    };
}
const startBtn = document.getElementById('start');
startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    board.style.cursor = 'none';
    startGame();
});
function startGame() {
    requestAnimationFrame(update);
    document.addEventListener('keyup', movePlayer);
    const liveFromConey = new Audio('./audio/liveFromConey.mp3');
    liveFromConey.volume = volume;
    liveFromConey.play();
}
// Volume controls
const minus = document.getElementById('decrease');
const plus = document.getElementById('increase');
const volDisplay = document.getElementById('display');
volDisplay.innerText = `${volume * 100}%`;
function decreaseSound() {
    if (volume > 0) {
        volume = (parseFloat(volume) - 0.1).toFixed(2);
    }
    else {
        volume = 0;
    }
    console.log(volume);
    updateVolDisplay();
}
function increaseSound() {
    if (volume < 1) {
        volume = (parseFloat(volume) + 0.1).toFixed(2);
    }
    else {
        volume = 1;
    }
    console.log(volume);
    updateVolDisplay();
}
function updateVolDisplay() {
    volDisplay.innerText = `${Math.fround(volume * 100)}%`;
}
minus.addEventListener('click', () => {
    decreaseSound();
    const bingBeep = new Audio('./audio/bingBeep.mp3');
    bingBeep.volume = volume;
    bingBeep.play();
});
plus.addEventListener('click', () => {
    increaseSound();
    const bongBeep = new Audio('./audio/bongBeep.mp3');
    bongBeep.volume = volume;
    bongBeep.play();
});
console.log('Bing Bong');
console.log('Fuck Ya Life!');
