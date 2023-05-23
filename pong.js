


const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'blue';

let gameStarted = false; // initialize the gameStarted flag

function startGame() {
  // set gameStarted flag to true and start game logic
  gameStarted = true;
  // ...
}

// add event listener for key press to start game
window.addEventListener('keydown', function(event) {
  if (!gameStarted) {
    startGame();
  }
});



// define the left paddle
const leftPaddle = {
  x: 50,
  y: 300,
  width: 30,
  height: 100,
  dy: 0, // y velocity of the paddle
  speed: 5, // speed at which the paddle moves
  upPressed: false, // flag to indicate if the up arrow key is pressed
  downPressed: false // flag to indicate if the down arrow key is pressed
};

// define the right paddle
const rightPaddle = {
  x: canvas.width - 80,
  y: 300,
  width: 30,
  height: 100,
  dy: 0, // y velocity of the paddle
  speed: 5, // speed at which the paddle moves
  upPressed: false, // flag to indicate if the up arrow key is pressed
  downPressed: false // flag to indicate if the down arrow key is pressed
};
// define the scores
let leftScore = 0;
let rightScore = 0;

function updateScores() {
  // check if the ball has gone past the left or right side of the canvas
  if (ball.x < 0) {
    rightScore++;
    reset();
  } else if (ball.x > canvas.width) {
    leftScore++;
    reset();
  }

  // update the score display
  document.getElementById('left-score').textContent = leftScore.toString();
  document.getElementById('right-score').textContent = rightScore.toString();
}
// update the position of the paddles
function updatePaddlePosition() {
  // get the current position of each paddle
  let leftPaddleTop = parseInt(leftPaddle.style.top);
  let rightPaddleTop = parseInt(rightPaddle.style.top);

  // move the paddles up or down based on keyboard input
  // make sure to check if the new position is within the limits
  if (Key.isDown(Key.W) && leftPaddleTop > paddleTopLimit) {
    leftPaddleTop -= 5;
  }
  if (Key.isDown(Key.S) && leftPaddleTop < paddleBottomLimit) {
    leftPaddleTop += 5;
  }
  if (Key.isDown(Key.UP) && rightPaddleTop > paddleTopLimit) {
    rightPaddleTop -= 5;
  }
  if (Key.isDown(Key.DOWN) && rightPaddleTop < paddleBottomLimit) {
    rightPaddleTop += 5;
  }

  // update the position of each paddle
  leftPaddle.style.top = leftPaddleTop + "px";
  rightPaddle.style.top = rightPaddleTop + "px";
}
 // define the ball
 const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 2, // x velocity of the ball
    dy: 2 // y velocity of the ball
  };

function drawPaddle(paddle) {
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function draw() {
  // Clear the canvas to erase the previous position of the paddles
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the paddles up or down based on the arrow keys
  if (leftPaddle.upPressed && leftPaddle.y > 0) {
    leftPaddle.dy = -leftPaddle.speed;
  } else if (leftPaddle.downPressed && leftPaddle.y < canvas.height - leftPaddle.height) {
    leftPaddle.dy = leftPaddle.speed;
  } else {
    leftPaddle.dy = 0;
  }

  if (rightPaddle.upPressed && rightPaddle.y > 0) {
    rightPaddle.dy = -rightPaddle.speed;
  } else if (rightPaddle.downPressed && rightPaddle.y < canvas.height - rightPaddle.height) {
    rightPaddle.dy = rightPaddle.speed;
  } else {
    rightPaddle.dy = 0;
  }

  // Update the position of the paddles based on their velocity
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;

  // Draw the paddles at their new positions
  drawPaddle(leftPaddle);
  drawPaddle(rightPaddle);
    // Update the position of the ball and check for collisions
    moveBall();
    drawBall();
  // Call the draw function again to animate the canvas
  requestAnimationFrame(draw);
}

// Call the draw function to start the animation
draw();



// Handle keyboard events to move the paddles up and down
document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyW') {
    leftPaddle.upPressed = true;
  } else if (event.code === 'KeyS') {
    leftPaddle.downPressed = true;
  } else if (event.code === 'ArrowUp') {
    rightPaddle.upPressed = true;
  } else if (event.code === 'ArrowDown') {
    rightPaddle.downPressed = true;
  }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyW') {
      leftPaddle.upPressed = false;
    } else if (event.code === 'KeyS') {
      leftPaddle.downPressed = false;
    } else if (event.code === 'ArrowUp') {
      rightPaddle.upPressed = false;
    } else if (event.code === 'ArrowDown') {
      rightPaddle.downPressed = false;
    }
  });

  
 
  
  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  function moveBall() {
    // Update the position of the ball based on its velocity
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    // If the ball hits the top or bottom of the canvas, reverse its y velocity
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.dy = -ball.dy;
    }
  
    // If the ball hits the left paddle, reverse its x velocity and increase its speed
    if (ball.x - ball.radius < leftPaddle.x + leftPaddle.width && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) {
      ball.dx = -ball.dx;
      ball.dx *= 1.00; // increase the ball's speed by 5%
      ball.dy *= 1.00;
    }
  
    // If the ball hits the right paddle, reverse its x velocity and increase its speed
    if (ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) {
      ball.dx = -ball.dx;
      ball.dx *= 1.00; // increase the ball's speed by 5%
      ball.dy *= 1.00;
    }
  
    // If the ball goes off the left or right side of the canvas, reset its position and speed
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.dx = 2;
      ball.dy = 2;
    }
  }
  
  
  
    // Update the position of the ball and check for collisions
    moveBall();
  
    // Draw the paddles and ball at their new positions
    drawPaddle(leftPaddle);
    drawPaddle(rightPaddle);
    drawBall();
  
    // Call the draw function again to animate the canvas
    requestAnimationFrame(draw);
  
  
  // Call the draw function to start the animation
  draw();
  
  // Game code here
  let scorePlayer1 = 0;
let scorePlayer2 = 0;

function handleCollision(player) {
  if (player === "player1") {
    scorePlayer1++;
    document.getElementById("scorePlayer1").textContent = scorePlayer1;
  } else if (player === "player2") {
    scorePlayer2++;
    document.getElementById("scorePlayer2").textContent = scorePlayer2;
  }
}
