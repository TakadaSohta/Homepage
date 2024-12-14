const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const PARTICLE_COUNT = 50; // 点の数
const MAX_DISTANCE = 150;  // 線を引く最大距離
const SPEED = 0.5;         // 粒子の移動速度

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 粒子の初期化
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  // 粒子の位置更新
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    // 画面端で反転
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }

  // 粒子間に線を引く
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      let p1 = particles[i];
      let p2 = particles[j];
      let dist = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
      if (dist < MAX_DISTANCE) {
        // 近い粒子同士を線で結ぶ（半透明）
        ctx.strokeStyle = 'rgba(100,100,100,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }

  // 粒子自身を描画(小さな丸)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let p = particles[i];
    ctx.fillStyle = 'rgba(50, 50, 50, 0.3)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2, false);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();