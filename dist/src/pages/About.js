export function About() {
  const el = document.createElement('main');
  el.className = 'content-section';
  el.innerHTML = `
    <section class="panel about-section">
      <h2 class="section-title">About Eventify</h2>
      <p class="lead">Mission: <strong>Making event planning stress-free, affordable, and transparent.</strong></p>
      <p>Eventify was born when our founders struggled to coordinate their own family events. Too many spreadsheets, endless phone calls, and opaque pricing led us to build a better way.</p>
    </section>

    <section class="features-grid">
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">🤖</div>
        <h3>AI-powered recommendations</h3>
        <p>Personalized vendor suggestions that match your style, location, and budget.</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">⏱️</div>
        <h3>Real-time availability</h3>
        <p>Live calendars ensure you only see vendors available on your event date.</p>
      </article>
      <article class="feature-card">
        <div class="feature-icon" aria-hidden="true">🔒</div>
        <h3>Secure bookings</h3>
        <p>Encrypted payments and clear cancellation policies protect your plans.</p>
      </article>
    </section>

    <section class="team-section">
      <h3 class="section-title">Meet the Team</h3>
      <div class="team-grid">
        ${['Shaan Goswami','Pankaj Kumar Sharma','Satish Kumar Sai','Sri Sai Srinivash Panda'].map((name, i) => `
          <article class="team-card">
            <img src="https://picsum.photos/seed/eventify-${i}/240/240" width="240" height="240" alt="${name} portrait" loading="lazy"/>
            <h4>${name}</h4>
            <p class="role">${['CEO','CEO','Head of Design','Head of Ops'][i]}</p>
            <p>Passionate about simplifying events through technology and design.</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
  return el;
}
