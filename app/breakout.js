var canvas = document.getElementById("main-game-area");
var ctx = canvas.getContext("2d");

var walls = {
  x: canvas.width/2,
  y: canvas.height/2,
  width: canvas.width,
  height: canvas.height
};

var ball = {
  radius: 5,
  x: canvas.width/2,
  y: canvas.height/2,
  dx: 2,
  dy: -2,
  draw: function() {
    /*alert("draw function called on ball");*/
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = "#009900";
    ctx.fill();
    ctx.closePath();
  },
  move: function() {
    this.x += this.dx;
    this.y += this.dy;
  },
  /* check if ball is colliding with something and change velocity accordingly */
  handleCollisionWall: function() {
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.dx = 0-this.dx; // reverse horizontal motion
    }
    else if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.dy = 0-this.dy;
    }
    else {

    }
  },
  handleCollisionRect: function(rect, handler) {
    offsetX = rect.width/2 + this.radius;
    offsetY = rect.height/2 + this.radius;
    if (this.x > rect.x - offsetX && this.x < rect.x + offsetX &&
    this.y > rect.y - offsetY && this.y < rect.y + offsetY) {
      /* ball is inside rectangle */
      handler(this, rect);
    }
  }
};

var paddle = {
  width: 60,
  height: 10,
  x: canvas.width/2,
  y: canvas.height - 20,
  dx: 0,
  draw: function() {
    var offsetX = this.width/2;
    ctx.beginPath();
    ctx.rect(this.x - offsetX, this.y,
            this.width, this.height);
    ctx.fillStyle = "#000099";
    ctx.fill();
    ctx.closePath();
  },
  move: function() {
    this.x += this.dx;
  }
};

/*
function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
  ctx.fillStyle = "#009900";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(paddle) {
  var offsetX = paddle.width/2;
  var offsetY = paddle.height/2;
  ctx.beginPath();
  ctx.rect(paddle.x - offsetX, paddle.y - offsetY,
          paddle.x + offsetX, paddle.y + offsetY);
  ctx.fillStyle = "#000099";
  ctx.fill();
  ctx.closePath();
}

function handleBallCollision(x, y) {
  if (x - ballRadius < 0 || x + ballRadius > canvas.width) {
    dpos[0] = 0-dpos[0];
  }
  else if (y - ballRadius < 0 || y + ballRadius > canvas.height) {
    dpos[1] = 0-dpos[1];
  }
  else {

  }
}*/

function checkBallRectCollision(ball, rect) {
  deltaX = ball.x - rect.x;
  deltaY = ball.y - rect.y;
  return (deltaX < rect.width + ball.radius && deltaY < rect.height + ball.radius);
}

function handleBallWallCollision(ball, rect) {
  deltaX = ball.x - rect.x;
  deltaY = ball.y - rect.y;
  if (deltaY - ball.radius > rect.height) {
    /* ball has fallen below playing field, game is over */
  }
  else if (deltaY + ball.radius < 0-rect.height) {
    ball.dy = 0-ball.dy;
  }
  else if (deltaX + ball.radius < 0-rect.width || deltaX - ball.radius > rect.width) {
    ball.dx = 0-ball.dx;
  }
  else {

  }
}

function handleMovingBallRectCollision(ball, rect) {
  
}

function doCollisionDetection() {
  /* check ball in playing field */
  if (!checkBallRectCollision(ball, walls)) {
    handleBallWallCollision(ball, walls);
  }
  if (checkBallRectCollision(ball, paddle)) {
    handleMovingBallRectCollision(ball, paddle);
  }
}

var friction = 0.1;
function checkPaddleCollision(ball, paddle) {
  ball.handleCollisionRect(paddle, (ball, paddle) => {
    deltaX = ball.x - paddle.x;
    if (deltaX < 0 - paddle.width/2 - ball.radius || deltaX > paddle.width/2 + ball.radius) {
      ball.dx = 0 - ball.dx;
    }
    else {
      ball.dy = 0 - ball.dy;
      ball.dx = (paddle.dx - ball.dx) * friction + ball.dx;
    }
  })
}

rightPressed = false;
leftPressed = false;
function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  }
  if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  }
  if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* let player move paddle */
  if (rightPressed) {
    paddle.dx = Math.min(paddle.dx + 3, 7);
  }
  if (leftPressed) {
    paddle.dx = Math.max(paddle.dx - 3, -7);
  }
  if (paddle.dx > 0) {
    paddle.dx -= 1;
  }
  else if (paddle.dx < 0) {
    paddle.dx += 1;
  }
  /* move stuff around and react accordingly */
  paddle.move();
  ball.move();
  doCollisionDetection();

  ball.draw();
  paddle.draw();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(update, 10);
