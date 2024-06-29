const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const recordList = document.getElementById('recordList');

let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10 };
let hole = { x: Math.random() * (canvas.width - 40) + 20, y: Math.random() * (canvas.height - 40) + 20, size: 30 };
let startTime;
let records = [];

window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
    let beta = event.beta; // X-axis (tilt front-to-back)
    let gamma = event.gamma; // Y-axis (tilt left-to-right)

    if (typeof startTime === 'undefined') {
        startTime = new Date();
    }

    ball.x += gamma * 0.5;
    ball.y += beta * 0.5;

    if (ball.x - ball.radius < 0) ball.x = ball.radius;
    if (ball.x + ball.radius > canvas.width) ball.x = canvas.width - ball.radius;
    if (ball.y - ball.radius < 0) ball.y = ball.radius;
    if (ball.y + ball.radius > canvas.height) ball.y = canvas.height - ball.radius;

    draw();

    if (isBallInHole()) {
        const endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;
        records.push(timeTaken.toFixed(2));
        updateRecords();
        resetGame();
    }
}

function isBallInHole() {
    return ball.x + ball.radius > hole.x &&
        ball.x - ball.radius < hole.x + hole.size &&
        ball.y + ball.radius > hole.y &&
        ball.y - ball.radius < hole.y + hole.size;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the hole (square)
    ctx.fillStyle = 'black';
    ctx.fillRect(hole.x, hole.y, hole.size, hole.size);

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function resetGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    hole.x = Math.random() * (canvas.width - 40) + 20;
    hole.y = Math.random() * (canvas.height - 40) + 20;
    startTime = undefined;
    draw();
}

function updateRecords() {
    recordList.innerHTML = '';
    records.forEach((record, index) => {
        const li = document.createElement('li');
        li.textContent = `Record ${index + 1}: ${record} seconds`;
        recordList.appendChild(li);
    });
}

draw();
