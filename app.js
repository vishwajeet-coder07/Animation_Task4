let canvas = document.querySelector('canvas');
let ctx;
let particles = [];
let mouse = { x: 0, y: 0 };
let isPaused = false;
let speed = 1;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            hue: Math.random() * 360,
            pulse: Math.random() * Math.PI * 2
        });
    }
}

function togglePause() {
    isPaused = !isPaused;
    const button = document.getElementById('pause');
    if (button) button.textContent = isPaused ? 'Resume' : 'Pause';
}

function reset() {
    createParticles();
}

function updateParticles() {
    if (isPaused) return;
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * speed;
        p.y += p.vy * speed;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        if (distance < 100) {
            const force = (100 - distance) / 100;
            p.vx += (dx / distance) * force * 0.01;
            p.vy += (dy / distance) * force * 0.01;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.pulse += 0.02;
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulseSize = p.size + Math.sin(p.pulse) * 0.5;
        const gradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, pulseSize * 2
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 70%, 60%, ${p.opacity})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 70%, 60%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
    }

    if (mouse.x && mouse.y) {
        const gradient = ctx.createRadialGradient(
            mouse.x, mouse.y, 0,
            mouse.x, mouse.y, 100
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
}

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('particleCanvas');
    ctx = canvas.getContext('2d');

    resizeCanvas();
    createParticles();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    const pauseButton = document.getElementById('pause');
    if (pauseButton) pauseButton.addEventListener('click', togglePause);

    const resetButton = document.getElementById('resetBtn');
    if (resetButton) resetButton.addEventListener('click', reset);

    const speedSlider = document.getElementById('speedSlider');
    if (speedSlider) speedSlider.addEventListener('input', (e) => {
        speed = parseFloat(e.target.value);
    });

    animate();
});