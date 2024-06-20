const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const numBallsInput = document.getElementById('numBalls');
const distanceInput = document.getElementById('distance');

let balls = [];
let animationFrameId;
let running = false;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Ball {
    constructor(x, y, vx, vy, radius) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= this.radius || this.x >= canvas.width - this.radius) {
            this.vx *= -1;
        }
        if (this.y <= this.radius || this.y >= canvas.height - this.radius) {
            this.vy *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }
}

function calculateDistance(ball1, ball2) {
    const dx = ball1.x - ball2.x;
    const dy = ball1.y - ball2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function drawLine(ball1, ball2) {
    ctx.beginPath();
    ctx.moveTo(ball1.x, ball1.y);
    ctx.lineTo(ball2.x, ball2.y);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();
}

function createBalls(numBalls) {
    balls = [];
    for (let i = 0; i < numBalls; i++) {
        const radius = 10;
        const x = random(radius, canvas.width - radius);
        const y = random(radius, canvas.height - radius);
        const vx = random(-2, 2);
        const vy = random(-2, 2);
        balls.push(new Ball(x, y, vx, vy, radius));
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => ball.move());
    balls.forEach(ball => ball.draw());

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const distance = calculateDistance(balls[i], balls[j]);
            if (distance < distanceInput.value) {
                drawLine(balls[i], balls[j]);
            }
        }
    }

    if (running) {
        animationFrameId = requestAnimationFrame(update);
    }
}

startButton.addEventListener('click', () => {
    if (!running) {
        running = true;
        createBalls(parseInt(numBallsInput.value));
        update();
    }
});

resetButton.addEventListener('click', () => {
    running = false;
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
});
