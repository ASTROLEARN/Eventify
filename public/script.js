document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const cta = document.getElementById('cta');
  if (cta) {
    cta.addEventListener('click', () => {
      alert('Welcome to Eventify!');
    });
  }

  // Simple hydration check
  console.log('Eventify client initialized');
});
