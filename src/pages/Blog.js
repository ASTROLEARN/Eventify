export function Blog() {
  const el = document.createElement('main');
  el.className = 'content-section';
  const posts = [
    {title:'Top 10 Wedding Decor Trends',excerpt:'From minimal palettes to floral ceilings, here are ideas to inspire your 2025 wedding.',tag:'Decor'},
    {title:'Budget Planning Tips',excerpt:'Stretch your budget with smart vendor bundling and off-peak bookings.',tag:'Finance'},
    {title:'How to Pick the Perfect Venue',excerpt:'Capacity, location, and amenities—compare like a pro.',tag:'Venue'}
  ];
  el.innerHTML = `
    <section class="panel">
      <h2 class="section-title">Tips & Guides</h2>
      <div class="blog-grid">
        ${posts.map(p => `
          <article class="blog-card">
            <span class="badge">${p.tag}</span>
            <h3>${p.title}</h3>
            <p>${p.excerpt}</p>
            <a class="nav-link read-more" href="#/blog">Read more</a>
          </article>`).join('')}
      </div>
    </section>
  `;
  return el;
}
