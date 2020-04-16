import Sprite from './sprite'

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

  drawBricks(ctx) {
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

export default Bricks
