// ============================================
// 1. PARTICLES CANVAS (connessioni interattive)
// ============================================
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 140;
const MOUSE_RADIUS = 200;

let mouse = { x: null, y: null };

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse repulsione
        if (mouse.x !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS) {
                const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.5;
                this.x += (dx / dist) * force;
                this.y += (dy / dist) * force;
            }
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_DIST) {
                const opacity = 1 - (dist / CONNECTION_DIST);
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Mouse tracking
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// ============================================
// 2. TYPEWRITER EFFECT
// ============================================
const typewriterEl = document.querySelector('.typewriter');
const phrases = [
    'Software Engineer',
    'AI / ML Specialist',
    'Data Engineer',
    'Quantum Computing Enthusiast'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const current = phrases[phraseIndex];
    if (!isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        setTimeout(typeEffect, 80 + Math.random() * 40);
    } else {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 400);
            return;
        }
        setTimeout(typeEffect, 40 + Math.random() * 30);
    }
}
typewriterEl.style.display = 'inline';
typeEffect();

// ============================================
// 3. CARICAMENTO REPOSITORY GITHUB
// ============================================
const username = 'giovanniCRS';

async function loadRepos() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!res.ok) throw new Error('GitHub API error');
        const repos = await res.json();

        container.innerHTML = '';
        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';
            const lang = repo.language || 'Altro';
            const stars = repo.stargazers_count || 0;
            const forks = repo.forks_count || 0;

            card.innerHTML = `
                <div class="project-title"><a href="${repo.html_url}" target="_blank">${repo.name}</a></div>
                <div class="project-desc">${repo.description || 'Nessuna descrizione'}</div>
                <div class="project-meta">
                    <span><i class="fas fa-code"></i> ${lang}</span>
                    <span><i class="fas fa-star"></i> ${stars}</span>
                    <span><i class="fas fa-code-branch"></i> ${forks}</span>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = `<p style="color: var(--secondary);">⚠️ Impossibile caricare i repo. Riprova.</p>`;
    }
}
loadRepos();

// ============================================
// 4. ANIMAZIONE CONTATORI (About)
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = Math.ceil(target / 80);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = current;
            }
        }, 25);
    });
}

// ============================================
// 5. ANIMAZIONE BARRE SKILL (Intersection Observer)
// ============================================
function setupSkillBars() {
    const bars = document.querySelectorAll('.bar-fill');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(bar => observer.observe(bar));
}

// ============================================
// 6. SCROLL PROGRESS BAR
// ============================================
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    document.getElementById('scrollProgress').style.width = progress + '%';
}
window.addEventListener('scroll', updateScrollProgress);

// ============================================
// 7. NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// 8. THEME TOGGLE (Bolt ↔ Flame)
// ============================================
function toggleTheme() {
    const root = document.documentElement;
    const btn = document.querySelector('#themeToggle i');
    const isFlame = root.getAttribute('data-theme') === 'flame';

    if (isFlame) {
        root.removeAttribute('data-theme');
        btn.className = 'fas fa-bolt';
    } else {
        root.setAttribute('data-theme', 'flame');
        btn.className = 'fas fa-fire';
    }
}

// ============================================
// 9. SMOOTH SCROLL (migliorato)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 70;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================
// 10. INTERSEZIONE OBSERVER per animazioni sezioni
// ============================================
function setupSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Attiva contatori solo per about
                if (entry.target.id === 'about') {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.12 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// ============================================
// 11. EFFETTO TILT 3D sulle card
// ============================================
document.querySelectorAll('.glass-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        this.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
});

// ============================================
// 12. MAGNETIC BUTTONS
// ============================================
document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        this.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// ============================================
// 13. INIZIALIZZAZIONE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    setupSectionAnimations();
    setupSkillBars();

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Se about è già visibile, avvia contatori
    const about = document.getElementById('about');
    if (about) {
        const rect = about.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            animateCounters();
        }
    }

    // Trigger iniziale per scroll progress
    updateScrollProgress();
});