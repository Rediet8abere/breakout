
class Game {
  constructor(canvas, ball, paddle, liveBoard, scoreBoard, brickBuilder) {
    this.canvas = canvas;
    this.ball = ball;
    this.paddle = paddle;
    this.liveBoard = liveBoard;
    this.scoreBoard = scoreBoard;
    this.brickBuilder = brickBuilder;
    this.rightPressed = false;
    this.leftPressed = false;
  }



  collisionDetection() {
    for (let c = 0; c < this.brickBuilder.columnCount; c += 1) {
      for (let r = 0; r < this.brickBuilder.rowCount; r += 1) {
        const b = this.brickBuilder.bricks[c][r];
        if (this.ball.y === 0) {
          this.ball.y = 50;
        }
        if (b.status === 1) {
          if (this.ball.x > b.x && this.ball.x < b.x + this.brickBuilder.bricks[c][r].width) {
            if (this.ball.y > b.y && this.ball.y < b.y + this.brickBuilder.bricks[c][r].height) {
              this.ball.dy = -this.ball.dy;
              b.status = 0;
              this.scoreBoard.score += 1;
              if (this.scoreBoard.score === this.brickBuilder.rowCount * this.brickBuilder.columnCount) {
                alert('YOU WIN, CONGRATULATIONS!');
                document.location.reload();
              }
            }
          }
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.brickBuilder.drawBricks(ctx);
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.scoreBoard.render(ctx);
    this.liveBoard.render(ctx);
    this.collisionDetection();

    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.y = -this.ball.dy;
      }
      else {
        this.liveBoard.lives -= 1;
        if (!this.liveBoard.lives) {
          alert('GAME OVER');
          document.location.reload();
        }
        else {
          this.ball.x = this.canvas.width / 2;
          this.ball.y = this.canvas.height - 30;
          this.ball.dx = 2;
          this.ball.dy = -2;
          // paddleX = (this.canvas.width - paddleWidth) / 2;
        }
      }
    }

    if (this.rightPressed) {
      this.paddle.x += 7;
      if (this.paddle.x + this.paddle.width > this.canvas.width) {
        this.paddle.x = this.canvas.width - this.paddle.width;
      }
    }
    else if (this.leftPressed) {
      this.paddle.x -= 7;
      if (this.paddle.x < 0) {
        this.paddle.x = 0;
      }
    }

    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;

    // console.log("self: ", self);
    // requestAnimationFrame(() => {
    //   // arrow don't bind this
    //
    //   this.draw(ctx);
    // });
    const self = this;
    requestAnimationFrame(function () {
    // console.log("self: ", self);
      self.draw(ctx);
    });

  }

}

export default Game
