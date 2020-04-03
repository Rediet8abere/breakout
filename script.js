const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
console.log("canvas width: ", canvas.width);
console.log("canvas height: ", canvas.height);

ctx.globalCompositeOperation = 'destination-over'
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const brickRowCount = 6;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;


let rightPressed = false;
let leftPressed = false;





// console.log("x: ", x);
// console.log("y: ", y);

let dx = 2;
let dy = -2;

let lives = 3;




const colR = Math.floor((Math.random() * 255) + 1);
const colG = Math.floor((Math.random() * 255) + 1);
const colB = Math.floor((Math.random() * 255) + 1);
const colT = Math.floor((Math.random() * 255) + 1);



class Ball {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.ballRadius = 10;
    this.col = col;
  }

  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();
    ctx.closePath();
  }


}

const col = 'rgba(' + colR + ',' + colG + ',' + colB + ',' + colT + ')';
const ball = new Ball((canvas.width / 2), canvas.height - 30, col);



class Paddle {
  constructor(x, y, paddleWidth, paddleHeight) {
    this.paddleX = x;
    this.paddleY = y;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
  }

  drawPaddle() {
    ctx.beginPath();
    ctx.rect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

const paddle = new Paddle(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)




const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    const colR = Math.floor((Math.random() * 255) + 1);
    const colG = Math.floor((Math.random() * 255) + 1);
    const colB = Math.floor((Math.random() * 255) + 1);
    const colT = Math.floor((Math.random() * 255) + 1);
    bricks[c][r] = {
      x: 0, y: 0, status: 1, col: 'rgba(' + colR + ',' + colG + ',' + colB + ',' + colT + ')'
    };
  }
}


function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = bricks[c][r].col;
        // rows
        // if (c === 0) {
        //   ctx.fillStyle = 'red';
        // } else if (c === 1) {
        //   ctx.fillStyle = 'blue';
        // } else if (c === 2) {
        //   ctx.fillStyle = 'purple';
        // } else if (r === 0) {
        //   ctx.fillStyle = 'purple';
        // }

        ctx.fill();
        ctx.closePath();
      }
    }
  }
}


class Score {
  constructor(score) {
    this.score = score;
  }

  drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + this.score, 8, 20);
  }
}

const scoreBoard = new Score(0);


function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (ball.y === 0) {
        ball.y = 50;
      }
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          scoreBoard.score += 1;
          if (scoreBoard.score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
            // clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  ball.drawBall();
  paddle.drawPaddle();
  scoreBoard.drawScore();
  drawLives();
  collisionDetection();

  if (ball.x + dx > canvas.width - ball.ballRadius || ball.x + dx < ball.ballRadius) {
    dx = -dx;
  }
  if (ball.y + dy < ball.ballRadius) {
    dy = -dy;
  } else if (ball.y + dy > canvas.height - ball.ballRadius) {
    if (ball.x > paddle.paddleX && ball.x < paddle.paddleX + paddle.paddleWidth) {
      ball.y = -dy;
    }
    // else {
    //   lives -= 1;
    //   if (!lives) {
    //     alert('GAME OVER');
    //     document.location.reload();
    //   }
    //   else {
    //     x = canvas.width / 2;
    //     y = canvas.height - 30;
    //     dx = 2;
    //     dy = -2;
    //     paddleX = (canvas.width - paddleWidth) / 2;
    //   }
    // }
  }

  if (rightPressed) {
    paddle.paddleX += 7;
    if (paddle.paddleX + paddle.paddleWidth > canvas.width) {
      paddle.paddleX = canvas.width - paddle.paddleWidth;
    }
  }
  else if (leftPressed) {
    paddle.paddleX -= 7;
    if (paddle.paddleX < 0) {
      paddle.paddleX = 0;
    }
  }

  ball.x += dx;
  ball.y += dy;
  requestAnimationFrame(draw);
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  }
  else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  }
  else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.paddleX = relativeX - paddle.paddleWidth / 2;
  }
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);



draw();
