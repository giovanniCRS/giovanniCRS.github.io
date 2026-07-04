const username = 'giovanniCRS';

// Caricamento repository da GitHub
async function loadRepos() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error('Errore nel caricamento dei repository');
    const repos = await res.json();

    container.innerHTML = ''; // pulisce lo spinner o contenuto precedente

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
    console.error('Errore nel caricamento dei repo:', error);
    container.innerHTML = `<p style="color: #ef4444;">Impossibile caricare i progetti. Riprova più tardi.</p>`;
  }
}

// Dark mode toggle
function toggleDark() {
  document.body.classList.toggle('dark');
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.className = document.body.classList.contains('dark') ? 'fas fa-sun' : 'fas fa-moon';
  }
  // Salva preferenza in localStorage
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Applica tema salvato
function applySavedTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = 'fas fa-sun';
  }
}

// Intersection Observer per animazione sezioni
function setupScrollAnimations() {
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
    section.style.transform = 'translateY(24px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// Smooth scroll per link interni
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

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();
  loadRepos();
  setupScrollAnimations();
  setupSmoothScroll();

  // Listener per il bottone tema
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleDark);
  }
});