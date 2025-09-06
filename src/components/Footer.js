export function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-content">
      <nav class="footer-links" aria-label="Footer">
        <a href="#/about" class="footer-link">About</a>
        <a href="#/services" class="footer-link">Services</a>
        <a href="#/contact" class="footer-link">Contact</a>
        <a href="#/privacy" class="footer-link" aria-disabled="true">Privacy Policy</a>
      </nav>
      <div class="social-links">
        <a class="social-icon" href="#" aria-label="Twitter" title="Twitter" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.22 4.22 0 0 0 1.85-2.33 8.38 8.38 0 0 1-2.67 1.02 4.19 4.19 0 0 0-7.12 3.82A11.9 11.9 0 0 1 3.16 4.9a4.18 4.18 0 0 0 1.3 5.6c-.65-.02-1.27-.2-1.81-.5v.05c0 2.03 1.45 3.73 3.38 4.12-.35.1-.72.15-1.1.15-.27 0-.53-.03-.79-.07.53 1.66 2.06 2.88 3.88 2.91A8.4 8.4 0 0 1 2 19.54a11.85 11.85 0 0 0 6.44 1.89c7.73 0 11.96-6.4 11.96-11.95 0-.18 0-.36-.01-.54a8.55 8.55 0 0 0 2.07-2.16z"/></svg></a>
        <a class="social-icon" href="#" aria-label="Instagram" title="Instagram" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM18.5 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg></a>
        <a class="social-icon" href="#" aria-label="Facebook" title="Facebook" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 22v-8h2.5l.5-3H13V9.5c0-.9.3-1.5 1.7-1.5H16V5.1c-.3 0-1 0-1.8 0-2 0-3.2 1.2-3.2 3.3V11H8v3h3v8h2z"/></svg></a>
      </div>
      <p class="site-footer__note">© <span id="year"></span> Eventify</p>
    </div>
  `;

  footer.addEventListener('click', (e) => {
    const t = e.target;
    if (t instanceof HTMLAnchorElement && t.getAttribute('href')?.startsWith('#/')) {
      e.preventDefault();
      window.location.hash = t.getAttribute('href');
    }
  });

  return footer;
}
