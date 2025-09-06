export function Services() {
  const el = document.createElement('main');
  el.className = 'content-section';
  el.innerHTML = `
    <section class="panel">
      <h2 class="section-title">Our Services</h2>
      <div class="services-grid">
        ${[
          {title:'Vendor Matching',desc:'Find trusted vendors within your budget.',icon:'🧭'},
          {title:'Budget Planner',desc:'Track spending in real-time.',icon:'💰'},
          {title:'Booking & Scheduling',desc:'Instant booking with calendar sync.',icon:'📅'},
          {title:'Vendor Dashboard',desc:'Vendors manage services and availability.',icon:'📊'},
          {title:'Custom Packages',desc:'AI-suggested bundles tailored to you.',icon:'🎁'}
        ].map(s => `
          <article class="service-card">
            <div class="service-icon">${s.icon}</div>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
          </article>`).join('')}
      </div>
    </section>

    <section class="panel scenario">
      <h3 class="section-title">Example Scenario</h3>
      <p>A user with <strong>₹2 lakh</strong> budget for a wedding receives 3–5 vendor suggestions per category, optimized for ratings and availability.</p>
      <ul class="scenario-list">
        <li>Catering: 3 curated options within ₹60k–₹90k</li>
        <li>Decoration: 4 options matching the theme</li>
        <li>Photography: 3 options with 4.5★+ ratings</li>
        <li>Venue: 5 shortlisted venues within 15 km</li>
        <li>Entertainment: 3 bands/DJs with your preferred genres</li>
      </ul>
    </section>
  `;
  return el;
}
