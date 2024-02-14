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
const startBtn = document.getElementById('start');
startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    startGame();
});
function startGame() {
    requestAnimationFrame(update);
    document.addEventListener('keyup', movePlayer);
}
console.log('Bing Bong');
console.log('Fuck Ya Life!');
