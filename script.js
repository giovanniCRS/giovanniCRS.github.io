// ============================================
// 1. NAVBAR MOBILE TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.innerHTML = isOpen
        ? '<i class="fas fa-times" aria-hidden="true"></i>'
        : '<i class="fas fa-bars" aria-hidden="true"></i>';
});

document.querySelectorAll('.nav-right a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    });
});

// ============================================
// 2. CARICAMENTO PROGETTI GITHUB (curati)
// ============================================
const username = 'giovanniCRS';
const featuredRepos = [
    'nome-repo-1',
    'nome-repo-2',
    'nome-repo-3',
    'nome-repo-4'
];

async function loadProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    try {
        const repos = await Promise.all(
            featuredRepos.map(async (repoName) => {
                const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
                if (!res.ok) throw new Error(`Repo ${repoName} non trovato`);
                return res.json();
            })
        );

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
                    <span><i class="fas fa-code" aria-hidden="true"></i> ${lang}</span>
                    <span><i class="fas fa-star" aria-hidden="true"></i> ${stars}</span>
                    <span><i class="fas fa-code-branch" aria-hidden="true"></i> ${forks}</span>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Errore nel caricamento dei repo:', error);
        container.innerHTML = `<p style="color: var(--text-secondary);">⚠️ Impossibile caricare i progetti in questo momento. Puoi comunque vederli su <a href="https://github.com/${username}" target="_blank" style="color: var(--accent-start);">GitHub</a>.</p>`;
    }
}

// ============================================
// 3. SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 60;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================
// 4. FADE-IN ALLO SCROLL
// ============================================
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(12px)';
    section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(section);
});

// ============================================
// 5. INIZIALIZZAZIONE
// ============================================
document.addEventListener('DOMContentLoaded', loadProjects);