function vendorCard(v) {
  return `
    <article class="vendor-card">
      <img src="${v.photo}" alt="${v.name} promo" width="320" height="200" loading="lazy" />
      <div class="vendor-info">
        <h4>${v.name}</h4>
        <p class="price">Price Range: <span class="price-number">${v.priceRange}</span></p>
        <p class="reviews">${'★'.repeat(v.rating)}${'☆'.repeat(5 - v.rating)} <span class="muted">(${v.reviews} reviews)</span></p>
        <div class="card-divider"></div>
        <button class="check-availability" data-id="${v.id}" type="button">Check Availability</button>
      </div>
    </article>
  `;
}

const sampleVendors = [
  {id:1,name:'Taste Buds Catering',category:'Catering',services:['Buffet','Live Counter'],priceRange:'₹80k–₹1.2L',rating:5,reviews:128,photo:'https://picsum.photos/seed/catering/320/200'},
  {id:2,name:'Floral Aura',category:'Decoration',services:['Floral','Lighting'],priceRange:'₹40k–₹90k',rating:4,reviews:86,photo:'https://picsum.photos/seed/decor/320/200'},
  {id:3,name:'ShutterCraft',category:'Photography',services:['Candid','Cinematography'],priceRange:'₹70k–₹1.5L',rating:5,reviews:210,photo:'https://picsum.photos/seed/photo/320/200'},
  {id:4,name:'Grand Royal Hall',category:'Venue',services:['Indoor','Catering'],priceRange:'₹1.2L–₹3L',rating:4,reviews:145,photo:'https://picsum.photos/seed/venue/320/200'},
  {id:5,name:'BeatBlaze DJs',category:'Entertainment',services:['DJ','Sound'],priceRange:'₹30k–₹70k',rating:4,reviews:64,photo:'https://picsum.photos/seed/dj/320/200'}
];

export function Vendors() {
  const el = document.createElement('main');
  el.className = 'content-section';
  el.innerHTML = `
    <section class="panel">
      <h2 class="section-title">Find Vendors</h2>
      <form class="filters" id="vendor-filters">
        <label>Category
          <select name="category">
            <option value="">All</option>
            ${['Catering','Decoration','Photography','Venue','Entertainment'].map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </label>
        <label>Price Range
          <select name="price">
            <option value="">Any</option>
            <option value="low">Under ₹50k</option>
            <option value="mid">₹50k–₹1L</option>
            <option value="high">Over ₹1L</option>
          </select>
        </label>
        <label>Availability
          <input type="date" name="date" />
        </label>
        <label>Ratings
          <select name="rating">
            <option value="">Any</option>
            <option value="4">4★ & up</option>
            <option value="5">5★</option>
          </select>
        </label>
        <button class="secondary-button" type="submit">Apply Filters</button>
      </form>
      <div class="vendor-grid" id="vendor-grid"></div>
    </section>
  `;

  const grid = el.querySelector('#vendor-grid');
  const form = el.querySelector('#vendor-filters');

  function priceBucket(p) {
    const n = parseInt(p.replace(/[^0-9]/g,''), 10);
    if (n < 50000) return 'low';
    if (n <= 100000) return 'mid';
    return 'high';
  }

  function render(list) {
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = `<div class="card">No vendors available with 4+ stars in this category</div>`;
      return;
    }
    grid.innerHTML = list.map(vendorCard).join('');
    grid.querySelectorAll('.view-profile').forEach(btn => {
      btn.addEventListener('click', () => alert('Viewing vendor profile (demo)'));
    });
  }

  function applyFilters() {
    const data = new FormData(form);
    const activeCategory = (data.get('category') || '').toString();
    const rating = Number(data.get('rating')) || 0;
    const price = (data.get('price') || '').toString();

    let list = sampleVendors.slice();
    if (activeCategory) list = list.filter(v => v.category === activeCategory);
    if (rating) list = list.filter(v => v.rating >= rating);
    if (price) list = list.filter(v => priceBucket(v.priceRange) === price);

    render(list);
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); applyFilters(); });

  // preselect from URL: supports lowercase category and minRating
  try {
    const url = new URL(window.location.href);
    const q = url.hash.split('?')[1];
    if (q) {
      const params = new URLSearchParams(q);
      const categoryParam = (params.get('category') || '').toString();
      const minRating = Number(params.get('minRating')) || 0;
      const toTitle = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;
      if (categoryParam) {
        const select = form.querySelector('select[name="category"]');
        if (select) select.value = toTitle(categoryParam);
      }
      if (minRating) {
        const ratingSelect = form.querySelector('select[name="rating"]');
        if (ratingSelect) ratingSelect.value = String(minRating);
      }
      applyFilters();
      const panel = el.querySelector('.panel');
      if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return el;
    }
  } catch {}

  render(sampleVendors);
  return el;
}
