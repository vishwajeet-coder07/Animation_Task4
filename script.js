// Get DOM elements
const ball = document.getElementById('animatedBall');
const playBtn = document.getElementById('playBtn');
const speedBtn = document.getElementById('speedBtn');
const colorBtn = document.getElementById('colorBtn');

// Animation state
let isPaused = false;
let isFast = false;
let colorIndex = 0;

// Color classes for cycling through different colors
const colors = ['', 'color-blue', 'color-green', 'color-purple'];

// Play/Pause functionality
playBtn.addEventListener('click', () => {
    const animationArea = document.querySelector('.animation-area');
    const pulseCircle = document.querySelector('.pulse-circle');
    
    if (isPaused) {
        ball.classList.remove('paused');
        pulseCircle.classList.remove('paused');
        playBtn.textContent = 'Pause';
        isPaused = false;
    } else {
        ball.classList.add('paused');
        pulseCircle.classList.add('paused');
        playBtn.textContent = 'Play';
        isPaused = true;
    }
});

// Speed control functionality
speedBtn.addEventListener('click', () => {
    if (isFast) {
        ball.classList.remove('fast');
        speedBtn.textContent = 'Speed Up';
        isFast = false;
    } else {
        ball.classList.add('fast');
        speedBtn.textContent = 'Slow Down';
        isFast = true;
    }
});

// Color change functionality
colorBtn.addEventListener('click', () => {
    // Remove current color class
    colors.forEach(color => {
        if (color) ball.classList.remove(color);
    });
    
    // Cycle to next color
    colorIndex = (colorIndex + 1) % colors.length;
    
    // Add new color class
    if (colors[colorIndex]) {
        ball.classList.add(colors[colorIndex]);
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add click effect to the ball
    ball.addEventListener('click', () => {
        ball.style.transform += ' scale(1.2)';
        setTimeout(() => {
            ball.style.transform = ball.style.transform.replace(' scale(1.2)', '');
        }, 200);
    });

    // Add mouse enter effect to animation area
    const animationArea = document.querySelector('.animation-area');
    animationArea.addEventListener('mouseenter', () => {
        animationArea.style.transform = 'scale(1.02)';
        animationArea.style.transition = 'transform 0.3s ease';
    });

    animationArea.addEventListener('mouseleave', () => {
        animationArea.style.transform = 'scale(1)';
    });

    // Add keyboard controls
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case ' ': // Spacebar for play/pause
                event.preventDefault();
                playBtn.click();
                break;
            case 's': // 's' for speed
                speedBtn.click();
                break;
            case 'c': // 'c' for color
                colorBtn.click();
                break;
        }
    });

    // Show keyboard shortcuts info after a delay
    setTimeout(() => {
        console.log('Keyboard shortcuts:');
        console.log('Spacebar: Play/Pause');
        console.log('S: Speed Up/Down');
        console.log('C: Change Color');
    }, 1000);
});