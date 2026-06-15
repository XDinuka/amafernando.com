(function () {
    const navLinks = [
        { href: './publications.html', label: 'Publications', match: 'publications.html' },
        { href: './contact.html', label: 'Contact', match: 'contact.html' },
    ];

    function getTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = document.getElementById('theme-toggle-icon');
        if (icon) icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }

    const currentPath = window.location.pathname;

    const linksHtml = navLinks.map(({ href, label, match }) => {
        const isActive = currentPath.endsWith(match);
        return `<a class="navbar-item${isActive ? ' is-active has-text-light' : ''}" href="${href}">${label}</a>`;
    }).join('');

    const navHtml = `
<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container px-4">
        <div class="navbar-brand">
            <a class="navbar-item is-flex is-align-items-center" href="./">
                <img src="favicon.ico" alt="Amanda Fernando" class="is-rounded mr-3" style="max-height: 24px;">
                <span class="is-size-5 has-text-weight-bold">Amanda Fernando</span>
            </a>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-end">
                ${linksHtml}
                <div class="navbar-item">
                    <button id="theme-toggle" class="button is-ghost" aria-label="Toggle dark mode" style="padding: 0.25rem 0.5rem;">
                        <span class="icon">
                            <span class="material-symbols-outlined" id="theme-toggle-icon">dark_mode</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</nav>`;

    const root = document.getElementById('navbar-root');
    if (root) root.innerHTML = navHtml;

    applyTheme(getTheme());

    document.querySelector('.navbar-burger').addEventListener('click', function () {
        const menu = document.getElementById(this.dataset.target);
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        this.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });

    document.getElementById('theme-toggle').addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });
})();
