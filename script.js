// Mobile nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
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
}

// Navbar shadow on scroll
window.addEventListener('scroll', function () {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    if (window.scrollY > 40) {
        nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Canvas waves
const canvas = document.getElementById('waveCanvas');
let ctx = null;
let width = 0;
let height = 0;
let tick = 0;

if (canvas) {
    ctx = canvas.getContext('2d');

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
}

// Hero rocking animation
const heroContent = document.getElementById('heroContent');
const wheelWrap = document.getElementById('wheelWrap');

if (heroContent && wheelWrap) {
    let rockTick = 0;

    function rockAnimation() {
        rockTick += 0.008;

        const contentRock = Math.sin(rockTick * 0.9) * 2
            + Math.sin(rockTick * 0.5 + 0.5) * 0.5;

        const contentBob = Math.sin(rockTick * 0.9 + 1.0) * 3
            + Math.sin(rockTick * 0.4) * 1;

        heroContent.style.transform =
            `rotate(${contentRock}deg) translateY(${contentBob}px)`;

        const wheelRock = Math.sin(rockTick * 0.4 + 0.3) * 6
            + Math.sin(rockTick * 0.2 + 1.2) * 2;

        const wheelBob = Math.sin(rockTick * 0.8 + 0.8) * 4
            + Math.sin(rockTick * 0.3 + 0.2) * 2;

        wheelWrap.style.transform =
            `translate(-50%, -50%) rotate(${wheelRock}deg) translateY(${wheelBob}px)`;

        requestAnimationFrame(rockAnimation);
    }

    rockAnimation();
}

// Fade-in observer
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

// Typewriter
const phrases = [
    { text: "New York Seafood Market", stay: 3000 },
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

        prefixEl.textContent = (current.text === "New York Seafood Market") ? "Welcome to " : "Try our ";

        if (isDeleting) {
            typeEl.textContent = current.text.substring(0, charIndex);
            charIndex--;
        } else {
            charIndex++;
            typeEl.textContent = current.text.substring(0, charIndex);
        }

        let speed = isDeleting ? 40 : 70;

        if (!isDeleting && charIndex === current.text.length) {
            speed = current.stay;
            isDeleting = true;
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            charIndex = 0;
            speed = 300;
        }

        setTimeout(typeEffect, speed);
    }

    window.addEventListener("load", () => setTimeout(typeEffect, 500));
}

// Firebase view counter
document.addEventListener('DOMContentLoaded', function () {
    const loadFirebase = async () => {
        try {
            const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js");
            const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js");
            const { getDatabase, ref, get, set } = await import("https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js");

            const firebaseConfig = {
                apiKey: "AIzaSyCZrLCnjCyUvMOzDe-yeB185qrN8M97LP4",
                authDomain: "github-1ec60.firebaseapp.com",
                databaseURL: "https://github-1ec60-default-rtdb.firebaseio.com",
                projectId: "github-1ec60",
                storageBucket: "github-1ec60.firebasestorage.app",
                messagingSenderId: "370562737308",
                appId: "1:370562737308:web:6f9c9484c24368bf1c7959",
                measurementId: "G-JDV0KHPD7F"
            };

            const app = initializeApp(firebaseConfig);
            getAnalytics(app);
            const db = getDatabase(app);

            const numberEl = document.getElementById("viewNumber");
            if (!numberEl) return;

            const countRef = ref(db, 'views/count');

            get(countRef)
                .then((snapshot) => {
                    let count = snapshot.exists() ? snapshot.val() : 0;
                    count++;
                    numberEl.textContent = count.toLocaleString();
                    return set(countRef, count);
                })
                .catch((error) => {
                    console.error("Error updating view count:", error);
                });
        } catch (error) {
            console.error("Error loading Firebase:", error);
        }
    };

    loadFirebase();
});
