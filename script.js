const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


let rightPressed = false;
let leftPressed = false;



let dx = 2;
let dy = -2;

let randomNum = Math.floor((Math.random() * 255) + 1);




let colR = randomNum;
let colG = randomNum;
let colB = randomNum;
let colT = randomNum;



class Ball {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.ballRadius = 10;
    this.col = col;
  }

  render(ctx) {
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
    this.x = x;
    this.y = y;
    this.width = paddleWidth;
    this.height = paddleHeight;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

const paddle = new Paddle(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)







colR = randomNum;
colG = randomNum;
colB = randomNum;
colT = randomNum;

// const brickRowCount = 6;
// const brickColumnCount = 5;

class Bricks {
  constructor() {
    this.width = 75;
    this.height = 20;
    this.columnCount = 5;
    this.rowCount = 5;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
    this.bricks = [];

  }

  bricksInt() {
    for (let c = 0; c < this.columnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rowCount; r += 1) {
        const colR = Math.floor((Math.random() * 255) + 1);
        const colG = Math.floor((Math.random() * 255) + 1);
        const colB = Math.floor((Math.random() * 255) + 1);
        const colT = Math.floor((Math.random() * 255) + 1);
        this.bricks[c][r] = {
          x: 0, y: 0, status: 1, col: 'rgba(' + colR + ',' + colG + ',' + colB + ',' + colT + ')'
        };
      }
    }
  }

  drawBricks() {
    for (let c = 0; c < this.columnCount; c += 1) {
      for (let r = 0; r < this.rowCount; r += 1) {
        if (this.bricks[c][r].status === 1) {
          const brickX = (c * (this.width + this.padding)) + this.offsetLeft;
          const brickY = (r * (this.height + this.padding)) + this.offsetTop;

          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, this.width, this.height);
          ctx.fillStyle = this.bricks[c][r].col;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}


const brickBuilder = new Bricks();
brickBuilder.bricksInt();

class Score {
  constructor(score) {
    this.score = score;
  }

  render(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Score: ${this.score}` , 8, 20);
  }
}

const scoreBoard = new Score(0);

class Lives {
  constructor(lives) {
    this.lives = lives;
  }

  render(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Lives: ${this.lives}`, canvas.width - 65, 20);
  }
}

const liveBoard = new Lives(3);

function collisionDetection() {
  for (let c = 0; c < brickBuilder.columnCount; c += 1) {
    for (let r = 0; r < brickBuilder.rowCount; r += 1) {
      const b = brickBuilder.bricks[c][r];
      if (ball.y === 0) {
        ball.y = 50;
      }
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + brickBuilder.width && ball.y > b.y && ball.y < b.y + brickBuilder.height) {
          dy = -dy;
          b.status = 0;
          scoreBoard.score += 1;
          if (scoreBoard.score === brickBuilder.rowCount * brickBuilder.columnCount) {
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
  brickBuilder.drawBricks();
  ball.render(ctx);
  paddle.render(ctx);
  scoreBoard.render(ctx);
  liveBoard.render(ctx);
  collisionDetection();

  if (ball.x + dx > canvas.width - ball.ballRadius || ball.x + dx < ball.ballRadius) {
    dx = -dx;
  }
  if (ball.y + dy < ball.ballRadius) {
    dy = -dy;
  } else if (ball.y + dy > canvas.height - ball.ballRadius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.y = -dy;
    }
    else {
      liveBoard.lives -= 1;
      if (!liveBoard.lives) {
        alert('GAME OVER');
        document.location.reload();
      }
      else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed) {
    paddle.x += 7;
    if (paddle.x + paddle.width > canvas.width) {
      paddle.x = canvas.width - paddle.width;
    }
  }
  else if (leftPressed) {
    paddle.x -= 7;
    if (paddle.x < 0) {
      paddle.x = 0;
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
    paddle.x = relativeX - paddle.width / 2;
  }
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);



draw();
