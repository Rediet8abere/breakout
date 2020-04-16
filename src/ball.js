import Sprite from './sprite'

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

export default Ball
