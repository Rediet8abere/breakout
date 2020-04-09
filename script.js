const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


let rightPressed = false;
let leftPressed = false;



let dx = 2;
let dy = -2;


class Ball {
  constructor(x, y, col = '#0095DD') {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.col = col;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.col;
    ctx.fill();
    ctx.closePath();
  }


}

const ball = new Ball((canvas.width / 2), canvas.height - 30);



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
    console.log("brick init");
    for (let c = 0; c < this.columnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rowCount; r += 1) {
        const colR = Math.floor((Math.random() * 255) + 1);
        const colG = Math.floor((Math.random() * 255) + 1);
        const colB = Math.floor((Math.random() * 255) + 1);
        const colT = Math.floor((Math.random() * 255) + 1);
        // this.bricks[c][r] = {
        //   x: 0, y: 0, status: 1, col: 'red'
        //   // 'rgba(' + colR + ',' + colG + ',' + colB + ',' + colT + ')'
        // };
        this.bricks[c][r] = {
          x: 0, y: 0, status: 1, col: 'green'
        };
        if (c === 0) {
          this.bricks[c][r].col = 'green';
        } else if (c === 1) {
          this.bricks[c][r].col = 'red';
        } else if (c === 2) {
          this.bricks[c][r].col = 'orange';
        } else if (c === 3) {
          this.bricks[c][r].col = 'lightblue';
        } else {
          this.bricks[c][r].col = 'pink';
        }
      }
    }
  }

  render(ctx, c, r) {
    ctx.beginPath();
    ctx.rect(this.bricks[c][r].x, this.bricks[c][r].y, this.width, this.height);
    ctx.fillStyle = this.bricks[c][r].col;
    ctx.fill();
    ctx.closePath();
  }

  drawBricks() {
    for (let c = 0; c < this.columnCount; c += 1) {
      for (let r = 0; r < this.rowCount; r += 1) {
        if (this.bricks[c][r].status === 1) {
          this.bricks[c][r].x = (c * (this.width + this.padding)) + this.offsetLeft;
          this.bricks[c][r].y = (r * (this.height + this.padding)) + this.offsetTop;
          this.render(ctx, c, r);
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
        if (ball.x > b.x && ball.x < b.x + brickBuilder.width) {
          if (ball.y > b.y && ball.y < b.y + brickBuilder.height) {
            dy = -dy;
            b.status = 0;
            scoreBoard.score += 1;
            if (scoreBoard.score === brickBuilder.rowCount * brickBuilder.columnCount) {
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
            }
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

  if (ball.x + dx > canvas.width - ball.radius || ball.x + dx < ball.radius) {
    dx = -dx;
  }
  if (ball.y + dy < ball.radius) {
    dy = -dy;
  } else if (ball.y + dy > canvas.height - ball.radius) {
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

// disabled
class Game {
  constructor(ball, paddle, liveBoard, scoreBoard, brickBuilder) {
    this.ball = ball;
    this.paddle = paddle;
    this.liveBoard = liveBoard;
    this.scoreBoard = scoreBoard;
    this.brickBuilder = brickBuilder;
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log(this.ball);
    // this.brickBuilder.drawBricks(ctx);
    // this.ball.render(ctx);
    // this.paddle.render(ctx);
    // this.scoreBoard.render(ctx);
    // this.liveBoard.render(ctx);
    collisionDetection();

    if (this.ball.x + dx > canvas.width - this.ball.radius || this.ball.x + dx < this.ball.radius) {
      dx = -dx;
    }
    if (this.ball.y + dy < this.ball.radius) {
      dy = -dy;
    } else if (this.ball.y + dy > canvas.height - this.ball.radius) {
      if (this.ball.x > paddle.x && this.ball.x < paddle.x + paddle.width) {
        this.ball.y = -dy;
      }
      else {
        this.liveBoard.lives -= 1;
        if (!this.liveBoard.lives) {
          alert('GAME OVER');
          document.location.reload();
        }
        else {
          this.ball.x = canvas.width / 2;
          this.ball.y = canvas.height - 30;
          dx = 2;
          dy = -2;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }

    if (rightPressed) {
      this.paddle.x += 7;
      if (this.paddle.x + this.paddle.width > canvas.width) {
        this.paddle.x = canvas.width - this.paddle.width;
      }
    }
    else if (leftPressed) {
      this.paddle.x -= 7;
      if (this.paddle.x < 0) {
        this.paddle.x = 0;
      }
    }

    this.ball.x += dx;
    this.ball.y += dy;
    requestAnimationFrame(this.draw);
  }

}
// const play = new Game(ball, paddle, liveBoard, scoreBoard, brickBuilder);
// play.brickBuilder.bricksInt();
// play.draw();


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
