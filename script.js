const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

window.addEventListener('scroll', function () {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 40) {
        nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let tick = 0;

function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resize);
resize();

const waves = [
    { amplitude: 22, frequency: 0.018, speed: 0.022, offset: 0, alpha: 0.18, yBase: 0.45 },
    { amplitude: 18, frequency: 0.022, speed: 0.018, offset: 2.1, alpha: 0.22, yBase: 0.58 },
    { amplitude: 26, frequency: 0.014, speed: 0.014, offset: 4.3, alpha: 0.28, yBase: 0.70 },
    { amplitude: 14, frequency: 0.028, speed: 0.030, offset: 1.0, alpha: 0.35, yBase: 0.82 },
    { amplitude: 20, frequency: 0.016, speed: 0.010, offset: 3.2, alpha: 0.55, yBase: 0.92 }
];

function drawWave(wave) {
    ctx.beginPath();
    ctx.moveTo(0, height);

    for (let x = 0; x <= width; x++) {
        const y = wave.yBase * height
            + Math.sin(x * wave.frequency + tick * wave.speed + wave.offset) * wave.amplitude
            + Math.sin(x * wave.frequency * 1.7 + tick * wave.speed * 0.6 + wave.offset + 1.2) * (wave.amplitude * 0.4);
        ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, `rgba(21, 101, 192, ${wave.alpha})`);
    grad.addColorStop(1, `rgba(13, 71, 161, ${wave.alpha * 0.6})`);
    ctx.fillStyle = grad;
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    waves.forEach(drawWave);
    tick++;
    requestAnimationFrame(animate);
}

animate();

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .info-item').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});
