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
function createParticles(){
    particles = [];
    const particleCount  = Math.floor((canvas.width*canvas.height)/8000);
    for(let i = 0; i<particleCount; i++){
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
resizeCanvas();
createParticles();
