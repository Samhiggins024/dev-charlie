const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

const homeScreen = document.getElementById("home-screen");
const tapButton = document.getElementById("tap-button");
const gameOverScreen = document.getElementById("game-over");
const restartButton = document.getElementById("restart-button");
const scoreText = document.getElementById("score");
const finalScoreText = document.getElementById("final-score");

let paddle;
let balls = [];
let score = 0;
let playing = false;
let keys = {};
let spawnTimer = 0;

function startGame() {
    score = 0;
    balls = [];
    spawnTimer = 0;
    playing = true;

    paddle = {
        x: 350,
        y: 455,
        width: 100,
        height: 15,
        speed: 7
    };

    scoreText.textContent = score;
    homeScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    canvas.style.display = "block";

    addBall();
    gameLoop();
}

function addBall() {
    balls.push({
        x: Math.random() * (canvas.width - 30) + 15,
        y: -20,
        radius: 15,
        speed: 3 + Math.random() * 2
    });
}

function drawPaddle() {
    ctx.fillStyle = "#222222";
    ctx.fillRect(
        paddle.x,
        paddle.y,
        paddle.width,
        paddle.height
    );
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#d7ff48";
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius - 5, 0.8, 2.4);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

function movePaddle() {
    if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
        paddle.x -= paddle.speed;
    }

    if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
        paddle.x += paddle.speed;
    }

    paddle.x = Math.max(
        0,
        Math.min(canvas.width - paddle.width, paddle.x)
    );
}

function moveBalls() {
    for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];
        ball.y += ball.speed;

        const hitPaddle =
            ball.y + ball.radius >= paddle.y &&
            ball.y - ball.radius <= paddle.y + paddle.height &&
            ball.x >= paddle.x &&
            ball.x <= paddle.x + paddle.width &&
            ball.speed > 0;

        if (hitPaddle) {
            score++;
            scoreText.textContent = score;

            balls.splice(i, 1);
            addBall();
            continue;
        }

        if (ball.y + ball.radius >= canvas.height) {
            endGame();
            return;
        }
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, 760, 460);
    ctx.beginPath();
    ctx.moveTo(20, 250);
    ctx.lineTo(780, 250);
    ctx.stroke();

    drawPaddle();

    for (const ball of balls) {
        drawBall(ball);
    }
}

function gameLoop() {
    if (!playing) return;

    movePaddle();
    moveBalls();

    if (!playing) return;

    spawnTimer++;

    if (spawnTimer >= 100) {
        addBall();
        spawnTimer = 0;
    }

    drawGame();
    requestAnimationFrame(gameLoop);
}

function endGame() {
    playing = false;
    finalScoreText.textContent = score;
    gameOverScreen.style.display = "block";
    canvas.style.display = "none";
}

canvas.addEventListener("mousemove", function(event) {
    if (!playing) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) *
        (canvas.width / rect.width);

    paddle.x = mouseX - paddle.width / 2;
    paddle.x = Math.max(
        0,
        Math.min(canvas.width - paddle.width, paddle.x)
    );
});

document.addEventListener("keydown", function(event) {
    keys[event.key] = true;

    if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }
});

document.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});

tapButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);