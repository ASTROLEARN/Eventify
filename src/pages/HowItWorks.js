export function HowItWorks() {
  const el = document.createElement('main');
  el.className = 'content-section';

  const steps = [
    {n:1,t:'Enter event details',d:'Provide date, type, location, and budget.',icon:'📝'},
    {n:2,t:'Get vendor suggestions',d:'Instant matches tailored to your budget.',icon:'⚡'},
    {n:3,t:'Compare vendors',d:'See price, reviews, and live availability.',icon:'📊'},
    {n:4,t:'Book & manage',d:'Secure booking and unified dashboard.',icon:'✅'}
  ];

  const services = [
    {icon:'🤖', title:'AI-powered recommendations', desc:'Smart matches based on your style, location, and budget.'},
    {icon:'⏱️', title:'Real-time availability', desc:'Only see vendors available on your preferred dates.'},
    {icon:'🔒', title:'Secure bookings', desc:'Protected payments and clear cancellation policies.'}
  ];

  el.innerHTML = `
    <section class="panel">
      <h2 class="section-title">How It Works</h2>
      <ol class="steps-grid">
        ${steps.map(s => `
          <li class="step-card fade-on-scroll">
            <div class="step-icon">${s.icon}</div>
            <h3><span class="step-index">${s.n}.</span> ${s.t}</h3>
            <p>${s.d}</p>
          </li>`).join('')}
      </ol>
    </section>

    <section class="hiw-services-section">
      <h3 class="section-title">Our Services</h3>
      <div class="hiw-services-grid">
        ${services.map(s => `
          <article class="hiw-service-card fade-on-scroll">
            <div class="hiw-icon" aria-hidden="true">${s.icon}</div>
            <h4 class="hiw-service-title">${s.title}</h4>
            <p class="hiw-service-desc">${s.desc}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="hiw-scenario fade-on-scroll">
      <header class="scenario-header">
        <h3 class="scenario-title">Example Scenario</h3>
        <span class="budget-badge">Budget: ₹2 lakh</span>
      </header>
      <ul class="scenario-list">
        <li><span class="bullet">✔</span> Shortlist top-rated caterers, decorators, and photographers.</li>
        <li><span class="bullet">✔</span> Check live availability and compare packages.</li>
        <li><span class="bullet">✔</span> Book securely and track everything from one dashboard.</li>
      </ul>
    </section>
  `;

  // fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.1 });
  el.querySelectorAll('.fade-on-scroll').forEach(elm => observer.observe(elm));

  return el;
}
