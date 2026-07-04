const username = "giovanniCRS";

async function loadRepos() {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
    const repos = await res.json();

    const container = document.getElementById("projects");

    repos.slice(0, 6).forEach(repo => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <div class="project-title">${repo.name}</div>
            <div class="project-desc">${repo.description || "No description provided"}</div>
            <a href="${repo.html_url}" target="_blank">View on GitHub →</a>
        `;

        container.appendChild(card);
    });
}

function toggleDark() {
    document.body.classList.toggle("dark");
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

document.querySelectorAll("section").forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease";
    observer.observe(section);
});

loadRepos();