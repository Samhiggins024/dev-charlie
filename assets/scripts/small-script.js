let score = 0;

let gameRunning = false;

let ballX = 280;

let ballY = 20;

let ballSpeed = 3;

let paddleX = 250;

let playerName = "";



$("#nameBtn").click(function () {
  playerName = $("#playerName").val().trim();

  if (playerName === "") {
    const number = Math.floor(Math.random() * 1000);

    playerName = "Guest" + number;
  }

  $("#playerName").val(playerName);

  $("#greeting").text("Welcome, " + playerName + "!");

  sessionStorage.setItem("tennisPlayer", playerName);
});



$("#startBtn").click(function () {
  if (playerName === "") {
    $("#nameBtn").click();
  }

  score = 0;

  ballX = 280;

  ballY = 20;

  paddleX = 250;

  ballSpeed = 3;

  gameRunning = true;

  $("#score").text(score);

  moveBall();
});



$("#resetBtn").click(function () {
  gameRunning = false;

  score = 0;

  ballX = 280;

  ballY = 20;

  paddleX = 250;

  $("#score").text(score);

  $("#tennisBall").css({
    left: ballX + "px",

    top: ballY + "px",
  });

  $("#paddle").css("left", paddleX + "px");
});



$(document).keydown(function (event) {
  if (event.key === "ArrowLeft") {
    paddleX -= 25;
  }

  if (event.key === "ArrowRight") {
    paddleX += 25;
  }

  if (paddleX < 0) {
    paddleX = 0;
  }

  if (paddleX > 500) {
    paddleX = 500;
  }

  $("#paddle").css("left", paddleX + "px");
});



function moveBall() {
  if (gameRunning === false) {
    return;
  }

  ballY += ballSpeed;

  $("#tennisBall").css({
    left: ballX + "px",

    top: ballY + "px",
  });

  checkPaddle();

  if (ballY >= 365) {
    gameOver();

    return;
  }

  requestAnimationFrame(moveBall);
}



function checkPaddle() {
  const ballBottom = ballY + 35;

  const paddleTop = 372;

  const ballCenter = ballX + 17;

  if (
    ballBottom >= paddleTop &&
    ballCenter >= paddleX &&
    ballCenter <= paddleX + 100
  ) {
    bounceBall();
  }
}



function bounceBall() {
  score += 10;

  $("#score").text(score);

  // jQuery UI animation
  $("#paddle").effect("highlight", 200);

  resetBall();
}

function resetBall() {
  ballY = 10;

  ballX = Math.floor(Math.random() * 550);


  ballSpeed += 0.2;
}

function gameOver() {
  gameRunning = false;

  $("#scorePlayer").text(playerName);

  $("#lastScore").text(score);

  $("#scoreDate").text(new Date().toLocaleDateString());

  alert("Game Over! Score: " + score);
}



function showDateTime() {
  $("#dateTime").text(new Date().toLocaleString());
}

showDateTime();

setInterval(showDateTime, 1000);



function cheatMode() {
  score += 100;

  ballSpeed = 1;

  $("#score").text(score);

  console.log("🎾 TENNIS TAP CHEAT MODE ACTIVATED");
}

window.cheatMode = cheatMode;
