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
    { amplitude: 22, frequency: 0.018, speed: 0.022, offset: 0,   alpha: 0.18, yBase: 0.45 },
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

const heroContent = document.getElementById('heroContent');
const wheelWrap = document.getElementById('wheelWrap');

let rockTick = 0;

function rockAnimation() {
    rockTick += 0.008; // overall speed

    // --- Text rocking (slightly less) ---
    const contentRock = Math.sin(rockTick * 0.9) * 2   // reduced rotation
        + Math.sin(rockTick * 0.5 + 0.5) * 0.5;       // secondary sway smaller

    const contentBob = Math.sin(rockTick * 0.9 + 1.0) * 3  // reduced vertical bob
        + Math.sin(rockTick * 0.4) * 1;

    heroContent.style.transform =
        `rotate(${contentRock}deg) translateY(${contentBob}px)`;

    // --- Wheel independent spinning ---
    const wheelRock = Math.sin(rockTick * 0.4 + 0.3) * 6  // big wheel rotation
        + Math.sin(rockTick * 0.2 + 1.2) * 2;            // secondary sway

    const wheelBob = Math.sin(rockTick * 0.8 + 0.8) * 4
        + Math.sin(rockTick * 0.3 + 0.2) * 2;

    wheelWrap.style.transform =
        `translate(-50%, -50%) rotate(${wheelRock}deg) translateY(${wheelBob}px)`;

    requestAnimationFrame(rockAnimation);
}

rockAnimation();

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

// TYPEWRITER EFFECT WITH DYNAMIC PREFIX FIXED
const phrases = [
    { text: "New York Seafood Market", stay: 3000 }, // main phrase
    { text: "Seafood Boils", stay: 1500 },
    { text: "Crab Trays", stay: 1500 },
    { text: "Chinese Food", stay: 1500 },
    { text: "Fried Fish", stay: 1500 },
    { text: "Wings", stay: 1500 },
    { text: "Pasta", stay: 1500 },
    { text: "Beverages", stay: 1500 }
];

const typeEl = document.getElementById("typeText");
const prefixEl = document.getElementById("typePrefix");

if (typeEl && prefixEl) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const current = phrases[phraseIndex];

        // Dynamic prefix
        prefixEl.textContent = (current.text === "New York Seafood Market") ? "Welcome to " : "Try our ";

        // Type or delete characters
        if (isDeleting) {
            typeEl.textContent = current.text.substring(0, charIndex);
            charIndex--;
        } else {
            charIndex++;
            typeEl.textContent = current.text.substring(0, charIndex);
        }

        // Speed settings
        let speed = isDeleting ? 40 : 70;

        // Pause at full phrase
        if (!isDeleting && charIndex === current.text.length) {
            speed = current.stay; // pause longer on main phrase
            isDeleting = true;
        }
        // Move to next phrase after deleting
        else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            charIndex = 0; // reset for next phrase
            speed = 300; // short pause before typing next
        }

        setTimeout(typeEffect, speed);
    }

    window.addEventListener("load", () => setTimeout(typeEffect, 500));
}
