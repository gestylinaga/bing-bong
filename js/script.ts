// 🏓 Bing Bong

// Board
let board: any;
let context: any;
const boardWidth = 900;
const boardHeight = 600;

// Player Paddles
const playerWidth = 10;
const playerHeight = 70;
let playerVelocity = 0;

let player1 = {
  x: 20,
  y: boardHeight/2 - playerHeight/2,
  width: playerWidth,
  height: playerHeight,
  velocity: playerVelocity,
}

let player2 = {
  x: boardWidth - playerWidth - 20,
  y: boardHeight/2 - playerHeight/2,
  width: playerWidth,
  height: playerHeight,
  velocity: playerVelocity,
}

// Ball
const ballWidth = 10;
const ballHeight = 10;
let ball = {
  x: boardWidth/2 - ballWidth,
  y: boardHeight/2 - ballHeight,
  width: ballWidth,
  height: ballHeight,
  velocityX: 1,
  velocityY: 1,
}

// Player Scores
let player1Score = 0;
let player2Score = 0;

window.onload = (): void => {
  // Draw Board
  board = document.getElementById('board');
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext('2d');

  // Draw Player Paddles
  context.fillStyle = '#fff';
  context.fillRect(player1.x, player1.y, player1.width, player1.height);
  context.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function update(): void { 
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  // Draw Center Divider
  for (let i = 10; i < board.height; i += 25) {
    context.fillRect(board.width/2 - 5, i, 5, 10);
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
    // TODO: sound goes here (bing)
  }

  // Ball / Paddle Collision
  if (detectCollision(ball, player1)) {
    if (ball.x <= player1.x + player1.width) {
      // left side of ball collides with right side of player1
      ball.velocityX *= -1; // reverse direction
      // TODO: sound goes here (bong)
    }
  } else if (detectCollision(ball, player2)) {
    if (ball.x + ball.width >= player2.x) {
      // right side of ball collides with left side of player2
      ball.velocityX *= -1; // reverse direction
      // TODO: sound goes here (bong)
    }
  }

  // Point Scored / Reset Ball
  if (ball.x < 0) {
    // TODO: sound goes here (FYL)
    player2Score++;
    resetBall(1); // Towards player2
  } else if (ball.x + ball.width > boardWidth) {
    player1Score++;
    resetBall(-1); // Towards player1
  }

  // Draw Scores
  context.font = '45px system-ui';
  context.fillText(player1Score, boardWidth/5, 45);
  context.fillText(player2Score, boardWidth * 4/5 - 45, 45);
}

function outOfBounds(yPos: number): boolean {
  return (yPos < 0 || yPos + playerHeight > boardHeight)
}

function movePlayer(e: KeyboardEvent): void {
  // Player 1 Movement
  if (e.key === 'w') {
    player1.velocity = -3;
  } else if (e.key === 's') {
    player1.velocity = 3;
  }

  // Player 2 Movement
  if (e.key === 'ArrowUp') {
    player2.velocity = -3;
  } else if (e.key === 'ArrowDown') {
    player2.velocity = 3;
  }
}

function detectCollision(a: any, b: any): boolean {
  return a.x < b.x + b.width &&  // a's top left corner !reach b's top right
         a.x + a.width > b.x &&  // a's top right corner passes b's top left
         a.y < b.y + b.height && // a' top left corner !reach b's bottom left
         a.y + a.height > b.y;   // a's bottom left corner passes b's top left
}

function resetBall(direction: number): void {
  ball = {
    x: boardWidth/2 - ballWidth,
    y: boardHeight/2 - ballHeight,
    width: ballWidth,
    height: ballHeight,
    velocityX: direction,
    velocityY: 2,
  }
}

const startBtn:any = document.getElementById('start');
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  board.style.cursor = 'none';
  startGame()
}) 

function startGame(): void {
  requestAnimationFrame(update);
  document.addEventListener('keyup', movePlayer);
  // TODO: sound goes here ('Live in Coney Island!')
}

console.log('Bing Bong');
console.log('Fuck Ya Life!');
