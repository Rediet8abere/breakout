import Sprite from './sprite'

class Lives extends Sprite {
  constructor(lives, x, y) {
    super(x, y, 30, 30);
    this.lives = lives;
  }

  render(ctx) { // overide
    // super.render(ctx);
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }
}

export default Lives
