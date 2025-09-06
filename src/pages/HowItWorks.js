export function HowItWorks() {
  const el = document.createElement('main');
  el.className = 'content-section';
  const steps = [
    {n:1,t:'Enter event details',d:'Provide date, type, location, and budget.',icon:'📝'},
    {n:2,t:'Get vendor suggestions',d:'Instant matches tailored to your budget.',icon:'⚡'},
    {n:3,t:'Compare vendors',d:'See price, reviews, and live availability.',icon:'📊'},
    {n:4,t:'Book & manage',d:'Secure booking and unified dashboard.',icon:'✅'}
  ];
  el.innerHTML = `
    <section class="panel">
      <h2 class="section-title">How It Works</h2>
      <ol class="steps-grid">
        ${steps.map(s => `
          <li class="step-card">
            <div class="step-icon">${s.icon}</div>
            <h3><span class="step-index">${s.n}.</span> ${s.t}</h3>
            <p>${s.d}</p>
          </li>`).join('')}
      </ol>
    </section>
  `;
  return el;
}
