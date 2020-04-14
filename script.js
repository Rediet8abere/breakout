const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


let rightPressed = false;
let leftPressed = false;




class Sprite {
  constructor(x, y, width, height, col = '#0095DD') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.col = col;
  }

  render(ctx, x = this.x, y = this.y) {
    ctx.beginPath();
    ctx.rect(x, y, this.width, this.height);
    ctx.fillStyle = this.col;
    ctx.fill();
    ctx.closePath();
  }

}

class Ball extends Sprite {
  constructor(x, y, col = '#0095DD') {
    super(x, y);
    this.radius = 10;
    this.dx = 2;
    this.dy = -2;
    this.col = col;
  }


  render(ctx) { // overide
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.col;
    ctx.fill();
    ctx.closePath();
  }
}

const ball = new Ball((canvas.width / 2), canvas.height - 30);



class Paddle extends Sprite {
  constructor(x, y, paddleWidth, paddleHeight) {
    super(x, y, paddleWidth, paddleHeight);
  }

  render(ctx) {
    super.render(ctx);
  }
}

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

const paddle = new Paddle(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)

class Brick extends Sprite {
  constructor(x, y, width, height, col, status) {
    super(x, y, width, height);
    this.col = col;
    this.status = status;
  }
}

class Bricks {
  constructor() {
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
        this.bricks[c][r] = new Brick(0, 0, 75, 20, 'green', 1);

        if (r === 0) {
          this.bricks[c][r].col = 'green';
        } else if (r === 1) {
          this.bricks[c][r].col = 'red';
        } else if (r === 2) {
          this.bricks[c][r].col = 'orange';
        } else if (r === 3) {
          this.bricks[c][r].col = 'lightblue';
        } else {
          this.bricks[c][r].col = 'pink';
        }
      }
    }
  }

  render(ctx, c, r) {
    ctx.beginPath();
    ctx.rect(this.bricks[c][r].x, this.bricks[c][r].y, this.bricks[c][r].width, this.bricks[c][r].height);
    ctx.fillStyle = this.bricks[c][r].col;
    ctx.fill();
    ctx.closePath();
  }

  drawBricks() {
    for (let c = 0; c < this.columnCount; c += 1) {
      for (let r = 0; r < this.rowCount; r += 1) {
        if (this.bricks[c][r].status === 1) {
          this.bricks[c][r].x = (c * (this.bricks[c][r].width + this.padding)) + this.offsetLeft;
          this.bricks[c][r].y = (r * (this.bricks[c][r].height + this.padding)) + this.offsetTop;
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
    ctx.fillText(`Score: ${this.score}`, 8, 20);
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
        if (ball.x > b.x && ball.x < b.x + brickBuilder.bricks[c][r].width) {
          if (ball.y > b.y && ball.y < b.y + brickBuilder.bricks[c][r].height) {
            ball.dy = -ball.dy;
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



class Game {
  constructor(ball, paddle, liveBoard, scoreBoard, brickBuilder) {
    this.ball = ball;
    this.paddle = paddle;
    this.liveBoard = liveBoard;
    this.scoreBoard = scoreBoard;
    this.brickBuilder = brickBuilder;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.brickBuilder.drawBricks(ctx);
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.scoreBoard.render(ctx);
    this.liveBoard.render(ctx);
    collisionDetection();

    if (this.ball.x + ball.dx > canvas.width - this.ball.radius || this.ball.x + ball.dx < this.ball.radius) {
      ball.dx = -ball.dx;
    }
    if (this.ball.y + ball.dy < this.ball.radius) {
      ball.dy = -ball.dy;
    } else if (this.ball.y + ball.dy > canvas.height - this.ball.radius) {
      if (this.ball.x > paddle.x && this.ball.x < paddle.x + paddle.width) {
        this.ball.y = -ball.dy;
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
          ball.dx = 2;
          ball.dy = -2;
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

    this.ball.x += ball.dx;
    this.ball.y += ball.dy;

    // console.log("self: ", self);
    // requestAnimationFrame(() => {
    //   // arrow don't bind this
    //
    //   this.draw(ctx);
    // });
    var self = this;
    requestAnimationFrame(function () {
    // console.log("self: ", self);
      self.draw(ctx);
    });

  }

}

const play = new Game(ball, paddle, liveBoard, scoreBoard, brickBuilder);
play.brickBuilder.bricksInt();
play.draw(ctx);


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
