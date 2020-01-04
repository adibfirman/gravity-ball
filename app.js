const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const w = Math.floor(innerWidth / 1.3);
const h = Math.floor(innerHeight / 2);

canvas.width = w;
canvas.height = h;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];
const gravity = 1;
const friction = 0.69;

// Event Listeners
window.addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener("resize", () => {
  canvas.width = w;
  canvas.height = h;
});

class Ball {
  constructor(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else this.dy += gravity;

    this.y += this.dy;
    this.draw();
  }
}

// Implementation
let balls = [];
function init() {
  const r = 30;

  for (let i = 0; i < 100; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length) + 1;
    let x = Math.floor(Math.random() * w - r);
    x = x < r ? r : x;

    const y = Math.floor((Math.random() * h) / -1);
    const color = colors[randomIndex];

    balls.push(new Ball(x, y, 2, r, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach(ball => ball.update());
}

init();
animate();
