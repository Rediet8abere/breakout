/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n\n\nclass Ball extends _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, col = '#0095DD') {\n    super(x, y);\n    this.radius = 10;\n    this.dx = 2;\n    this.dy = -2;\n    this.col = col;\n  }\n\n\n  render(ctx) { // overide\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n    ctx.fillStyle = this.col;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ball);\n\n\n//# sourceURL=webpack:///./src/ball.js?");

/***/ }),

/***/ "./src/bricks.js":
/*!***********************!*\
  !*** ./src/bricks.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n\n\nclass Brick extends _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, width, height, col, status) {\n    super(x, y, width, height);\n    this.col = col;\n    this.status = status;\n  }\n}\n\nclass Bricks {\n  constructor() {\n    this.columnCount = 5;\n    this.rowCount = 5;\n    this.padding = 10;\n    this.offsetTop = 30;\n    this.offsetLeft = 30;\n    this.bricks = [];\n\n  }\n\n  bricksInt() {\n    for (let c = 0; c < this.columnCount; c += 1) {\n      this.bricks[c] = [];\n      for (let r = 0; r < this.rowCount; r += 1) {\n        this.bricks[c][r] = new Brick(0, 0, 75, 20, 'green', 1);\n\n        if (r === 0) {\n          this.bricks[c][r].col = 'green';\n        } else if (r === 1) {\n          this.bricks[c][r].col = 'red';\n        } else if (r === 2) {\n          this.bricks[c][r].col = 'orange';\n        } else if (r === 3) {\n          this.bricks[c][r].col = 'lightblue';\n        } else {\n          this.bricks[c][r].col = 'pink';\n        }\n      }\n    }\n  }\n\n  render(ctx, c, r) {\n    ctx.beginPath();\n    ctx.rect(this.bricks[c][r].x, this.bricks[c][r].y, this.bricks[c][r].width, this.bricks[c][r].height);\n    ctx.fillStyle = this.bricks[c][r].col;\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  drawBricks(ctx) {\n    for (let c = 0; c < this.columnCount; c += 1) {\n      for (let r = 0; r < this.rowCount; r += 1) {\n        if (this.bricks[c][r].status === 1) {\n          this.bricks[c][r].x = (c * (this.bricks[c][r].width + this.padding)) + this.offsetLeft;\n          this.bricks[c][r].y = (r * (this.bricks[c][r].height + this.padding)) + this.offsetTop;\n          this.render(ctx, c, r);\n        }\n      }\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bricks);\n\n\n//# sourceURL=webpack:///./src/bricks.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass Game {\n  constructor(canvas, ball, paddle, liveBoard, scoreBoard, brickBuilder) {\n    this.canvas = canvas;\n    this.ball = ball;\n    this.paddle = paddle;\n    this.liveBoard = liveBoard;\n    this.scoreBoard = scoreBoard;\n    this.brickBuilder = brickBuilder;\n    this.rightPressed = false;\n    this.leftPressed = false;\n  }\n\n\n\n  collisionDetection() {\n    for (let c = 0; c < this.brickBuilder.columnCount; c += 1) {\n      for (let r = 0; r < this.brickBuilder.rowCount; r += 1) {\n        const b = this.brickBuilder.bricks[c][r];\n        if (this.ball.y === 0) {\n          this.ball.y = 50;\n        }\n        if (b.status === 1) {\n          if (this.ball.x > b.x && this.ball.x < b.x + this.brickBuilder.bricks[c][r].width) {\n            if (this.ball.y > b.y && this.ball.y < b.y + this.brickBuilder.bricks[c][r].height) {\n              this.ball.dy = -this.ball.dy;\n              b.status = 0;\n              this.scoreBoard.score += 1;\n              if (this.scoreBoard.score === this.brickBuilder.rowCount * this.brickBuilder.columnCount) {\n                alert('YOU WIN, CONGRATULATIONS!');\n                document.location.reload();\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.brickBuilder.drawBricks(ctx);\n    this.ball.render(ctx);\n    this.paddle.render(ctx);\n    this.scoreBoard.render(ctx);\n    this.liveBoard.render(ctx);\n    this.collisionDetection();\n\n    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {\n      this.ball.dx = -this.ball.dx;\n    }\n    if (this.ball.y + this.ball.dy < this.ball.radius) {\n      this.ball.dy = -this.ball.dy;\n    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {\n      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {\n        this.ball.y = -this.ball.dy;\n      }\n      else {\n        this.liveBoard.lives -= 1;\n        if (!this.liveBoard.lives) {\n          alert('GAME OVER');\n          document.location.reload();\n        }\n        else {\n          this.ball.x = this.canvas.width / 2;\n          this.ball.y = this.canvas.height - 30;\n          this.ball.dx = 2;\n          this.ball.dy = -2;\n          // paddleX = (this.canvas.width - paddleWidth) / 2;\n        }\n      }\n    }\n\n    if (this.rightPressed) {\n      this.paddle.x += 7;\n      if (this.paddle.x + this.paddle.width > this.canvas.width) {\n        this.paddle.x = this.canvas.width - this.paddle.width;\n      }\n    }\n    else if (this.leftPressed) {\n      this.paddle.x -= 7;\n      if (this.paddle.x < 0) {\n        this.paddle.x = 0;\n      }\n    }\n\n    this.ball.x += this.ball.dx;\n    this.ball.y += this.ball.dy;\n\n    // console.log(\"self: \", self);\n    // requestAnimationFrame(() => {\n    //   // arrow don't bind this\n    //\n    //   this.draw(ctx);\n    // });\n    const self = this;\n    requestAnimationFrame(function () {\n    // console.log(\"self: \", self);\n      self.draw(ctx);\n    });\n\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n/* harmony import */ var _paddle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paddle */ \"./src/paddle.js\");\n/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ball */ \"./src/ball.js\");\n/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./score */ \"./src/score.js\");\n/* harmony import */ var _lives__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lives */ \"./src/lives.js\");\n/* harmony import */ var _bricks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bricks */ \"./src/bricks.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n\n\n\n\n\nconst canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\n\n\n\n\n\nconst ball = new _ball__WEBPACK_IMPORTED_MODULE_2__[\"default\"]((canvas.width / 2), canvas.height - 30);\n\n\nconst paddleHeight = 10;\nconst paddleWidth = 75;\nconst paddleX = (canvas.width - paddleWidth) / 2;\n\nconst paddle = new _paddle__WEBPACK_IMPORTED_MODULE_1__[\"default\"](paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)\n\n\n\n\nconst brickBuilder = new _bricks__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\nbrickBuilder.bricksInt();\n\nconst scoreBoard = new _score__WEBPACK_IMPORTED_MODULE_3__[\"default\"](0);\nconst liveBoard = new _lives__WEBPACK_IMPORTED_MODULE_4__[\"default\"](3, canvas.width - 65, 20);\n\n\n\n\n\n\nconst play = new _game__WEBPACK_IMPORTED_MODULE_6__[\"default\"](canvas, ball, paddle, liveBoard, scoreBoard, brickBuilder);\nplay.brickBuilder.bricksInt();\nplay.draw(ctx);\n\n\nfunction keyDownHandler(e) {\n  console.log(\"hello world\");\n  if (e.key === 'Right' || e.key === 'ArrowRight') {\n    play.rightPressed = true;\n  }\n  else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n    play.leftPressed = true;\n  }\n}\n\nfunction keyUpHandler(e) {\n  console.log(\"hello world\");\n  if (e.key === 'Right' || e.key === 'ArrowRight') {\n    play.rightPressed = false;\n  }\n  else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n    play.leftPressed = false;\n  }\n}\n\nfunction mouseMoveHandler(e) {\n  const relativeX = e.clientX - canvas.offsetLeft;\n  if (relativeX > 0 && relativeX < canvas.width) {\n    paddle.x = relativeX - paddle.width / 2;\n  }\n}\n\ndocument.addEventListener('keydown', keyDownHandler, false);\ndocument.addEventListener('keyup', keyUpHandler, false);\ndocument.addEventListener('mousemove', mouseMoveHandler, false);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/lives.js":
/*!**********************!*\
  !*** ./src/lives.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n\n\nclass Lives extends _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(lives, x, y) {\n    super(x, y, 30, 30);\n    this.lives = lives;\n  }\n\n  render(ctx) { // overide\n    // super.render(ctx);\n    ctx.font = '16px Arial';\n    ctx.fillStyle = '#0095DD';\n    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Lives);\n\n\n//# sourceURL=webpack:///./src/lives.js?");

/***/ }),

/***/ "./src/paddle.js":
/*!***********************!*\
  !*** ./src/paddle.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n\n\nclass Paddle extends _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, paddleWidth, paddleHeight) {\n    super(x, y, paddleWidth, paddleHeight);\n  }\n\n  render(ctx) {\n    super.render(ctx);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n//# sourceURL=webpack:///./src/paddle.js?");

/***/ }),

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Score {\n  constructor(score) {\n    this.score = score;\n  }\n\n  render(ctx) {\n    ctx.font = '16px Arial';\n    ctx.fillStyle = '#0095DD';\n    ctx.fillText(`Score: ${this.score}`, 8, 20);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Score);\n\n\n//# sourceURL=webpack:///./src/score.js?");

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Sprite {\n  constructor(x, y, width, height, col = '#0095DD') {\n    this.x = x;\n    this.y = y;\n    this.width = width;\n    this.height = height;\n    this.col = col;\n  }\n\n  render(ctx, x = this.x, y = this.y) {\n    ctx.beginPath();\n    ctx.rect(x, y, this.width, this.height);\n    ctx.fillStyle = this.col;\n    ctx.fill();\n    ctx.closePath();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sprite);\n\n\n//# sourceURL=webpack:///./src/sprite.js?");

/***/ })

/******/ });