import Sprite from './sprite'
import Paddle from './paddle'
import Ball from './ball'
import Score from './score'
import Lives from './lives'
import Bricks from './bricks'
import Game from './game'

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');





const ball = new Ball((canvas.width / 2), canvas.height - 30);


const paddleHeight = 10;
const paddleWidth = 75;
const paddleX = (canvas.width - paddleWidth) / 2;

const paddle = new Paddle(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)




const brickBuilder = new Bricks();
brickBuilder.bricksInt();

const scoreBoard = new Score(0);
const liveBoard = new Lives(3, canvas.width - 65, 20);






const play = new Game(canvas, ball, paddle, liveBoard, scoreBoard, brickBuilder);
play.brickBuilder.bricksInt();
play.draw(ctx);


function keyDownHandler(e) {
  console.log("hello world");
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    play.rightPressed = true;
  }
  else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    play.leftPressed = true;
  }
}

function keyUpHandler(e) {
  console.log("hello world");
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    play.rightPressed = false;
  }
  else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    play.leftPressed = false;
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
