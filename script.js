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
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.35)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .info-item, .hours-table tr').forEach(function (el) {
    el.classList.add('fade-in');
    observer.observe(el);
});
