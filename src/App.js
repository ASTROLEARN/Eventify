// Simple hash-based SPA router and app shell for Eventify
import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { Homepage } from './pages/Homepage.js';
import { About } from './pages/About.js';
import { Services } from './pages/Services.js';
import { HowItWorks } from './pages/HowItWorks.js';
import { Vendors } from './pages/Vendors.js';
import { Dashboard } from './pages/Dashboard.js';
import { Contact } from './pages/Contact.js';
import { Blog } from './pages/Blog.js';

const routes = {
  '/': Homepage,
  '/about': About,
  '/services': Services,
  '/how-it-works': HowItWorks,
  '/vendors': Vendors,
  '/dashboard': Dashboard,
  '/contact': Contact,
  '/blog': Blog
};

function parseLocation() {
  const hash = window.location.hash || '#/';
  const path = hash.replace(/^#/, '');
  return path === '' ? '/' : path;
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

function render(route) {
  const app = document.getElementById('app');
  if (!app) return;

  const Page = routes[route] || routes['/'];
  app.innerHTML = '';

  app.appendChild(renderNavbar());
  app.appendChild(Page());
  app.appendChild(renderFooter());

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const cta = document.getElementById('cta');
  if (cta) cta.addEventListener('click', () => navigate('/how-it-works'));

  scrollToTop();
}

export function navigate(path) {
  if (!path.startsWith('/')) path = `/${path}`;
  if (parseLocation() === path) return render(path);
  window.location.hash = `#${path}`;
}

function onRouteChange() {
  render(parseLocation());
}

window.addEventListener('hashchange', onRouteChange);
window.addEventListener('DOMContentLoaded', () => render(parseLocation()));
