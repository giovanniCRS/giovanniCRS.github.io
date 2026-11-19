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

// Chiudi menu al click su un link
document.querySelectorAll('.nav-right a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    });
});

// ============================================
// 2. DATI STATICI DI FALLBACK (progetti)
// ============================================
const username = 'giovanniCRS';

// Lista dei repository che vuoi mostrare (in ordine di preferenza)
const featuredRepos = [
    'MHEALTH_BodySensors-Spark',
    'Quantum-Computing',
    'AI_SmartScheduler',
    'PSWProject_backend',
    'PSWProject_frontend',
    'ZolaGameCompetition',
    'IngSoft_ProjectMiniCAD'
];

// Dati statici di fallback (usati se l'API non risponde)
// Aggiorna descrizioni, stelle e fork quando vuoi
const fallbackProjects = [
    {
        name: 'AiTranslator_ForWebSites',
        description: 'Traduttore AI client-side per siti statici (HTML, JS, PHP) con Groq API. Trascina cartella o ZIP e scarica il sito tradotto mantenendo CSS e asset intatti. https://giovannicrs.github.io/site-ai-translator/',
        url: 'https://github.com/giovanniCRS/site-ai-translator',
        language: 'HTML',
        stars: 0,
        forks: 0
    },
    {
        name: 'MHEALTH_BodySensors-Spark',
        description: 'Analisi di dati da sensori corporei con Apache Spark e PySpark per il monitoraggio della salute.',
        url: 'https://github.com/giovanniCRS/MHEALTH_BodySensors-Spark',
        language: 'Python',
        stars: 0,
        forks: 0
    },
    {
        name: 'Quantum-Computing',
        description: 'Esperimenti e implementazioni di algoritmi quantistici con Qiskit e calcolo quantistico.',
        url: 'https://github.com/giovanniCRS/Quantum-Computing',
        language: 'Python',
        stars: 0,
        forks: 0
    },
    {
        name: 'AI_SmartScheduler',
        description: 'Sistema multi-agente LLM per la pianificazione equa dei turni ospedalieri.',
        url: 'https://github.com/giovanniCRS/AI_SmartScheduler',
        language: 'Python',
        stars: 0,
        forks: 0
    },
    {
        name: 'PSWProject_backend',
        description: 'Backend di un progetto universitario sviluppato con Java e Spring Boot.',
        url: 'https://github.com/giovanniCRS/PSWProject_backend',
        language: 'Java',
        stars: 0,
        forks: 0
    },
    {
        name: 'PSWProject_frontend',
        description: 'Frontend di un progetto universitario sviluppato con Angular e TypeScript.',
        url: 'https://github.com/giovanniCRS/PSWProject_frontend',
        language: 'TypeScript',
        stars: 0,
        forks: 0
    },
    {
        name: 'ZolaGameCompetition',
        description: 'Competizione di sviluppo di un gioco con Zola e strategie di intelligenza artificiale.',
        url: 'https://github.com/giovanniCRS/ZolaGameCompetition',
        language: 'Java',
        stars: 0,
        forks: 0
    },
    {
        name: 'IngSoft_ProjectMiniCAD',
        description: 'Progetto di Ingegneria del Software: implementazione di un MiniCAD con design pattern.',
        url: 'https://github.com/giovanniCRS/IngSoft_ProjectMiniCAD',
        language: 'Java',
        stars: 0,
        forks: 0
    }
];

// ============================================
// 2b. PROGETTI PER CLIENTI
// Per aggiungerne uno nuovo: copia un oggetto qui sotto e modifica i campi.
//  - title / sector / description: testo della card (niente nomi se il cliente preferisce restare anonimo)
//  - highlights: elenco puntato di cosa hai fatto
//  - tags: badge in fondo alla card
//  - url: link al sito online (lascia '' per non mostrare il pulsante)
//  - image: percorso di uno screenshot, es. 'assets/images/cliente1.jpg' (lascia '' per nasconderlo)
// ============================================
const clientProjects = [
    {
        title: 'Sito vetrina per azienda di liquori artigianali',
        sector: 'Sito vetrina · Food & Beverage',
        description: 'Progetto seguito dall\'idea alla messa online: sito vetrina responsive con modulo contatti, che continuo a gestire e mantenere dopo il lancio.',
        highlights: [
            'Progettazione e sviluppo del sito vetrina, con verifica della maggiore età',
            'Caricamento sul dominio e configurazione dell\'hosting tramite cPanel',
            'Attivazione e configurazione del servizio email dell\'hosting',
            'Banner cookie e informativa privacy',
            'Indicizzazione su Google tramite sitemap e Googlebot',
            'Gestione e manutenzione continuativa'
        ],
        tags: ['Web design', 'Sviluppo web', 'Hosting & cPanel', 'Email', 'Indicizzazione Google', 'Privacy & cookie'],
        url: 'https://www.linaretto.com',
        image: ''
    }
];

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderClientProjects() {
    const container = document.getElementById('clients-grid');
    if (!container) return;
    container.innerHTML = '';

    clientProjects.forEach(project => {
        const card = document.createElement('article');
        card.className = 'client-card';

        const image = project.image
            ? `<img class="client-image" src="${escapeHtml(project.image)}" alt="Anteprima del progetto: ${escapeHtml(project.title)}" loading="lazy" />`
            : '';
        const highlights = (project.highlights || [])
            .map(item => `<li>${escapeHtml(item)}</li>`)
            .join('');
        const tags = (project.tags || [])
            .map(tag => `<span class="badge">${escapeHtml(tag)}</span>`)
            .join('');
        const link = project.url
            ? `<a href="${escapeHtml(project.url)}" target="_blank" rel="noopener" class="btn btn-secondary client-link">Visita il sito <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
            : '';

        card.innerHTML = `
            ${image}
            <div class="client-body">
                <span class="client-sector">${escapeHtml(project.sector || '')}</span>
                <h3 class="client-title">${escapeHtml(project.title)}</h3>
                <p class="client-desc">${escapeHtml(project.description)}</p>
                <ul class="client-highlights">${highlights}</ul>
                <div class="skill-tags">${tags}</div>
                ${link}
            </div>
        `;
        container.appendChild(card);
    });
}

// ============================================
// 3. CARICAMENTO PROGETTI (con fallback statico)
// ============================================
async function loadProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    // Prova a caricare da GitHub
    try {
        const repos = await Promise.all(
            featuredRepos.map(async (repoName) => {
                const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
                if (!res.ok) {
                    throw new Error(`Repo ${repoName} non trovato (status: ${res.status})`);
                }
                return res.json();
            })
        );
        renderProjects(repos);
    } catch (error) {
        // Se fallisce (rate limit o errore), usa i dati statici
        console.warn('GitHub API fallita, uso dati statici:', error);
        renderProjects(fallbackProjects);
    }
}

function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    container.innerHTML = '';

    projects.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const lang = repo.language || 'Altro';
        const stars = repo.stargazers_count ?? repo.stars ?? 0;
        const forks = repo.forks_count ?? repo.forks ?? 0;
        const url = repo.html_url || repo.url || '#';
        const name = repo.name || 'Progetto';
        const desc = repo.description || 'Nessuna descrizione disponibile';

        card.innerHTML = `
            <div class="project-title"><a href="${url}" target="_blank">${name}</a></div>
            <div class="project-desc">${desc}</div>
            <div class="project-meta">
                <span><i class="fas fa-code" aria-hidden="true"></i> ${lang}</span>
                <span><i class="fas fa-star" aria-hidden="true"></i> ${stars}</span>
                <span><i class="fas fa-code-branch" aria-hidden="true"></i> ${forks}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// ============================================
// 4. SMOOTH SCROLL PER LINK INTERNI
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
// 5. FADE-IN ALLO SCROLL (leggero)
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
// 6. INIZIALIZZAZIONE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderClientProjects();
    loadProjects();
});