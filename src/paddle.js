import Sprite from './sprite'

class Paddle extends Sprite {
  constructor(x, y, paddleWidth, paddleHeight) {
    super(x, y, paddleWidth, paddleHeight);
  }

  render(ctx) {
    super.render(ctx);
  }
}

export default Sprite
