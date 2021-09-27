let x = true;
let y = true;
let leftPlayerLives = 3;
let rightPlayerLives = 3;
let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let boardBound = board.getBoundingClientRect();
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");

//user input listen
document.addEventListener("keydown", function (e) {
  if (e.key == "w") {
    movePaddle(leftPaddle, -window.innerHeight * 0.1);
  } else if (e.key == "s") {
    movePaddle(leftPaddle, +window.innerHeight * 0.1);
  } else if (e.key == "ArrowUp") {
    movePaddle(rightPaddle, -window.innerHeight * 0.1);
  } else if (e.key == "ArrowDown") {
    movePaddle(rightPaddle, +window.innerHeight * 0.1);
  }
});

function setColor(idx) {
  let allIcons = document.querySelectorAll(".fas.fa-circle");
  allIcons[idx].style.color = "#1a0d52";
}

function movePaddle(cPaddle, change) {
  let cPaddleBound = cPaddle.getBoundingClientRect();
  if (
    cPaddleBound.top + change >= boardBound.top &&
    cPaddleBound.bottom + change <= boardBound.bottom
  ) {
    cPaddle.style.top = cPaddleBound.top + change + "px";
  }
}
function moveBall() {
  let ballCord = ball.getBoundingClientRect();
  let ballTop = ballCord.top;
  let ballLeft = ballCord.left;
  let ballBottom = ballCord.bottom;
  let ballRight = ballCord.right;

  //check if collided with any players horizontal boundary
  let hasTouchLeft = ballLeft < boardBound.left;
  let hasTouchRight = ballRight > boardBound.right;
  if (hasTouchLeft || hasTouchRight) {
    if (hasTouchLeft) {
      leftPlayerLives--;

      setColor(leftPlayerLives);
      if (leftPlayerLives == 0) {
        alert("Game Over! Player Two Won :D");
        document.location.reload();
      } else {
        return resetGame();
      }
    } else {
      rightPlayerLives--;
      setColor(3 + rightPlayerLives);
      if (rightPlayerLives == 0) {
        alert("Game Over! Player One Won :D");
        document.location.reload();
      } else {
        return resetGame();
      }
    }
  }

  function resetGame() {
    ball.style.top = window.innerHeight * 0.45 + "px";
    ball.style.left = window.innerWidth * 0.45 + "px";

    requestAnimationFrame(moveBall);
  }
  //Handle vertical bound
  if (ballTop <= boardBound.top || ballBottom >= boardBound.bottom) {
    y = !y;
  }

  //Handle horizontal bound
  let leftPaddleBound = leftPaddle.getBoundingClientRect();
  let rightPaddleBound = rightPaddle.getBoundingClientRect();
  if (
    ballLeft <= leftPaddleBound.right &&
    ballRight >= leftPaddleBound.left &&
    ballTop + 30 >= leftPaddleBound.top &&
    ballBottom - 30 <= leftPaddleBound.bottom
  ) {
    x = !x;
  }
  if (
    ballLeft <= rightPaddleBound.right &&
    ballRight >= rightPaddleBound.left &&
    ballTop + 30 >= rightPaddleBound.top &&
    ballBottom - 30 <= rightPaddleBound.bottom
  ) {
    x = !x;
  }
  ball.style.top = y == true ? ballTop + 6 + "px" : ballTop - 6 + "px";
  ball.style.left = x == true ? ballLeft + 6 + "px" : ballLeft - 6 + "px";

  requestAnimationFrame(moveBall);
}

requestAnimationFrame(moveBall);
