const username = 'giovanniCRS';

// 1. Caricamento Repository GitHub
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
        <div class="project-title">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </div>
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

// 2. Animazione contatori (About)
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = parseInt(counter.getAttribute('data-count'));
      const current = parseInt(counter.innerText);
      const increment = Math.ceil(target / speed);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// 3. Intersection Observer per animazioni sezioni
function setupScrollAnimations() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        // Se è la sezione about, faccio partire i contatori
        if (entry.target.id === 'about') {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(section);
  });
}

// 4. Smooth scroll
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// 5. Toggle "Glow" - cambia l'accento tra due palette fighe
function toggleTheme() {
  const root = document.documentElement;
  const btn = document.querySelector('#themeToggle i');
  
  if (root.style.getPropertyValue('--primary').trim() === '#00f0ff') {
    // Passa alla palette "Magma" (Arancio/Rosa)
    root.style.setProperty('--primary', '#ff6b00');
    root.style.setProperty('--secondary', '#ff0080');
    root.style.setProperty('--tertiary', '#ffaa00');
    btn.className = 'fas fa-fire';
  } else {
    // Torna alla palette "Neon" (Ciano/Rosa)
    root.style.setProperty('--primary', '#00f0ff');
    root.style.setProperty('--secondary', '#ff00a6');
    root.style.setProperty('--tertiary', '#7c3aed');
    btn.className = 'fas fa-bolt';
  }
}

// 6. Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  loadRepos();
  setupScrollAnimations();
  setupSmoothScroll();

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Se la sezione about è già visibile all'avvio, avvio i contatori
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      animateCounters();
    }
  }
});