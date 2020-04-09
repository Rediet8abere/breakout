/* ***************************************************************

Challenge 1 - Make Constants
* Make these into constants defined at the top.

Challenge 2 - Identify duplicate code
** This block of code is repeated better to make a function for this.

Challenge 3 - Use Subroutines
*** This block of code would be better as a function.

Challenge 4 - Encapsulating code
**** Use objects to encapsulate code

***************************************************************** */



const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
console.log('canvas width: ', canvas.width);
console.log('canvas height: ', canvas.height);


let rightPressed = false;
let leftPressed = false;


let dx = 2;
let dy = -2;

const randomNum = Math.floor((Math.random() * 255) + 1);




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
  // injecting dependency, polymorphism

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.col;
    ctx.fill();
    ctx.closePath();
  }
}


const col = 'rgba(' + colR + ',' + colG + ',' + colB + ',' + colT + ')';
// const ball = new Ball((canvas.width / 2), canvas.height - 30, col);



class Paddle {
  constructor(x, y, paddleWidth, paddleHeight) {
    this.paddleX = x;
    this.paddleY = y;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
  }
  // dependency injection, polymorphism

  render(ctx) {
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

// const paddle = new Paddle(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)



colR = randomNum;
colG = randomNum;
colB = randomNum;
colT = randomNum;

class Bricks {
  constructor() {
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickColumnCount = 5;
    this.brickRowCount = 5;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.bricks = [];
  }

  bricksInt() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        colR = Math.floor((Math.random() * 255) + 1);
        colG = Math.floor((Math.random() * 255) + 1);
        colB = Math.floor((Math.random() * 255) + 1);
        colT = Math.floor((Math.random() * 255) + 1);
        this.bricks[c][r] = {
          // `Lives: ${this.lives}`, 380, 20);
          x: 0, y: 0, status: 1, col:'rgba(' + colR + ',' + colG + ',' + colB + ',' + colT + ')'
        };
      }
    }
  }

  drawBricks(ctx) {
    console.log('drawing bricks');
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      console.log('dawing bricks in the first for loop');
      for (let r = 0; r < this.brickRowCount; r += 1) {
        console.log('drawing bricks in the second loop');
        if (this.bricks[c][r].status === 1) {
          const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
          const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;

          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          ctx.fillStyle = this.bricks[c][r].col;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}


// const brickBuilder = new Bricks();
// brickBuilder.bricksInt();

class Score {
  constructor(score) {
    this.score = score;
  }

  render(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    // template string
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
    ctx.fillText(`Lives: ${this.lives}`, 380, 20);
  }
}

// const liveBoard = new Lives(3);





document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

class Game {
  constructor() {
    this.ball = new Ball((canvas.width / 2), canvas.height - 30, col);
    this.paddle = new Paddle(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    this.liveBoard = new Lives(3);
    this.scoreBoard = new Score(0);
    this.brickBuilder = new Bricks();
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.brickBuilder.drawBricks(ctx);
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.scoreBoard.render(ctx);
    this.liveBoard.render(ctx);
    collisionDetection();

    if (this.ball.x + dx > canvas.width - this.ball.ballRadius || this.ball.x + dx < this.ball.ballRadius) {
      dx = -dx;
    }
    if (this.ball.y + dy < this.ball.ballRadius) {
      dy = -dy;
    } else if (this.ball.y + dy > canvas.height - this.ball.ballRadius) {
      if (this.ball.x > paddle.paddleX && this.ball.x < paddle.paddleX + paddle.paddleWidth) {
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
      this.paddle.paddleX += 7;
      if (this.paddle.paddleX + this.paddle.paddleWidth > canvas.width) {
        this.paddle.paddleX = canvas.width - this.paddle.paddleWidth;
      }
    }
    else if (leftPressed) {
      this.paddle.paddleX -= 7;
      if (this.paddle.paddleX < 0) {
        this.paddle.paddleX = 0;
      }
    }

    this.ball.x += dx;
    this.ball.y += dy;
    requestAnimationFrame(this.draw);
  }

}
const play = new Game();
play.brickBuilder.bricksInt();
play.draw();


function collisionDetection() {
  // console.log("Inside collision detection!!");
  for (let c = 0; c < play.brickBuilder.brickColumnCount; c += 1) {
    for (let r = 0; r < play.brickBuilder.brickRowCount; r += 1) {
      const b = play.brickBuilder.bricks[c][r];
      // console.log("bricks as b: ", b);
      if (play.ball.y === 0) {
        play.ball.y = 50;
      }
      if (b.status === 1) {
        // console.log("b status: ", b.status, 'b.x: ', b.x);
        if (play.ball.x > b.x && play.ball.x < b.x + play.brickBuilder.brickWidth && play.ball.y > b.y && play.ball.y < b.y + play.brickBuilder.brickHeight) {
          dy = -dy;
          b.status = 0;
          // console.log("b status 0 >>>>>>>>>>>>>>>>>>>>", b.status);
          scoreBoard.score += 1;
          if (play.scoreBoard.score === play.brickBuilder.brickRowCount * play.brickBuilder.brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
            // clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
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
    play.paddle.paddleX = relativeX - play.paddle.paddleWidth / 2;
  }
}
