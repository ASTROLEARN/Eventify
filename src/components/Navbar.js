import { navigate } from '../App.js';

export function renderNavbar() {
  const nav = document.createElement('header');
  nav.className = 'site-header';
  nav.innerHTML = `
    <div class="site-header__inner nav-bar">
      <a class="brand" href="#/" aria-label="Eventify Home">
        <span class="logo-dot" aria-hidden="true"></span>
        <span class="site-title">Eventify</span>
      </a>
      <p class="site-tagline">Your Smart Event Planner</p>
      <nav class="main-nav" aria-label="Main Navigation">
        <a href="#/" class="nav-link">Home</a>
        <a href="#/about" class="nav-link">About</a>
        <a href="#/services" class="nav-link">Services</a>
        <a href="#/how-it-works" class="nav-link">How It Works</a>
        <a href="#/vendors" class="nav-link">Vendors</a>
        <a href="#/dashboard" class="nav-link">Dashboard</a>
        <a href="#/contact" class="nav-link">Contact</a>
        <a href="#/blog" class="nav-link">Blog</a>
      </nav>
      <button class="primary-button nav-cta" id="cta" type="button">Plan My Event</button>
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>
    </div>
  `;

  const toggle = nav.querySelector('.menu-toggle');
  const mainNav = nav.querySelector('.main-nav');
  if (toggle && mainNav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
    });
  }

  nav.addEventListener('click', (e) => {
    const t = e.target;
    if (t instanceof HTMLAnchorElement && t.getAttribute('href')?.startsWith('#/')) {
      e.preventDefault();
      navigate(t.getAttribute('href').slice(1));
    }
  });

  return nav;
}
