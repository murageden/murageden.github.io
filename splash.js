const canvas = document.getElementById('splash-canvas');
const ctx = canvas.getContext('2d');

let particles = [];

// Determine color array mapping conditions dynamically based on current template rules
function getPalette() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        // Deep glowing vibrant colors for dark mode context
        return [
            'rgba(139, 92, 246, ',  // Neon Violet
            'rgba(20, 184, 166, ',  // Electric Teal
            'rgba(244, 63, 94, ',   // Deep Coral
            'rgba(99, 102, 241, '   // Indigo Accent
        ];
    } else {
        // High luxury soft watercolor pastel shades for light mode layout
        return [
            'rgba(167, 139, 250, ', // Violet
            'rgba(45, 212, 191, ',  // Teal
            'rgba(253, 186, 116, ', // Peach
            'rgba(248, 113, 113, '  // Coral
        ];
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class WatercolorParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 40 + 40; 
        
        const activePalette = getPalette();
        this.color = activePalette[Math.floor(Math.random() * activePalette.length)];
        
        this.opacity = 0.25; 
        this.vx = (Math.random() - 0.5) * 0.4; // Brownian motion velocity variables
        this.vy = (Math.random() - 0.5) * 0.4;
        this.growth = Math.random() * 0.1 + 0.05;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.radius += this.growth;
        this.opacity -= 0.0015; // Clean linear decay rule sequence
    }

    draw() {
        if (this.opacity <= 0) return;
        
        ctx.save();
        ctx.globalCompositeOperation = 'multiply'; // Cross-layer fluid simulation blend
        
        let gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.1, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color + this.opacity + ')');
        gradient.addColorStop(0.6, this.color + this.opacity * 0.4 + ')');
        gradient.addColorStop(1, this.color + '0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Optimization throttling constraint parameters
let lastMove = 0;
window.addEventListener('mousemove', (e) => {
    let now = Date.now();
    if (now - lastMove > 40) { 
        particles.push(new WatercolorParticle(e.clientX, e.clientY));
        lastMove = now;
    }
});

window.addEventListener('touchmove', (e) => {
    let now = Date.now();
    if (now - lastMove > 50) {
        let touch = e.touches[0];
        particles.push(new WatercolorParticle(touch.clientX, touch.clientY));
        lastMove = now;
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].opacity <= 0) {
            particles.splice(i, 1);
        }
    }
    requestAnimationFrame(animate);
}

animate();