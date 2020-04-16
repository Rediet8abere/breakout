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

export default Sprite
