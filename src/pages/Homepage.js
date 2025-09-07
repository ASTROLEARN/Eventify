import { navigate } from '../App.js';

function categoryItem(label, icon) {
  return `
    <button class="category-button" data-category="${label}" type="button" aria-label="${label}">
      ${icon}
      <span class="category-label">${label}</span>
    </button>
  `;
}

const icons = {
  Catering: '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h2v8a4 4 0 1 1-2 0V2zm10 6h2v12h-2v-5h-2v5h-2V8a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3zm-9 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>',
  Decoration: '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4.1L18 20l-6-4-6 4 1.5-6.9L2 9h7z"/></svg>',
  Photography: '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 5h-3.6l-1.2-2H8.8L7.6 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-8 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6z"/></svg>',
  Venue: '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l9 7v11a2 2 0 0 1-2 2h-5v-6H10v6H5a2 2 0 0 1-2-2V9l9-7z"/></svg>',
  Entertainment: '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 10v8a2 2 0 0 0 2 2h3v-8H3zm13 0v8h3a2 2 0 0 0 2-2v-8l-8-5v5h3zM9 10h4v8H9v-8z"/></svg>'
};

const testimonials = [
  { name: 'Aarav S.', quote: 'Booked our entire wedding in a weekend. Eventify made it effortless!', rating: 5 },
  { name: 'Maya R.', quote: 'Loved the budget planner and real-time vendor availability.', rating: 5 },
  { name: 'Kabir N.', quote: 'Great vendor matches for our ₹2 lakh wedding. Highly recommend.', rating: 4 }
];

export function Homepage() {
  const section = document.createElement('main');
  section.className = 'content-section';
  section.innerHTML = `
    <section class="hero-panel hero-banner">
      <div class="hero-grid">
        <div class="hero-copy">
          <h2 class="hero-panel__title">Eventify – Your Event Your Control</h2>
          <p class="hero-panel__description">Find vendors, manage budgets, and book everything you need for your perfect event in minutes.</p>
          <div class="hero-actions">
            <button id="cta" class="primary-button hero-cta" type="button">Plan My Event</button>
            <button class="secondary-button" type="button" id="browse-vendors">Browse Vendors</button>
          </div>
        </div>
        <div class="hero-image" aria-label="Eventify logo showcase">
          <img class="hero-logo" src="https://cdn.builder.io/api/v1/image/assets%2F7860fc63240248d9961d00aee706ff31%2F5bbf49f45bce48719aeac92076406ba2?format=webp&width=800" alt="Eventify logo" />
        </div>
      </div>
    </section>
    <div class="section-divider" aria-hidden="true"></div>

    <section class="category-section">
      <h3 class="section-title">Quick Vendor Categories</h3>
      <div class="category-grid">
        ${categoryItem('Catering', icons.Catering)}
        ${categoryItem('Decoration', icons.Decoration)}
        ${categoryItem('Photography', icons.Photography)}
        ${categoryItem('Venue', icons.Venue)}
        ${categoryItem('Entertainment', icons.Entertainment)}
      </div>
    </section>
    <div class="section-divider" aria-hidden="true"></div>

    <section class="testimonials-section" aria-label="Testimonials">
      <h3 class="section-title">What Users Say</h3>
      <div class="carousel">
        <button class="carousel-control prev" aria-label="Previous testimonial">‹</button>
        <div class="carousel-track">
          ${testimonials.map(t => `
            <article class="testimonial-card">
              <div class="stars" aria-label="${t.rating} out of 5 stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
              <p class="quote">“${t.quote}”</p>
              <p class="author">— ${t.name}</p>
            </article>
          `).join('')}
        </div>
        <button class="carousel-control next" aria-label="Next testimonial">›</button>
      </div>
    </section>
  `;

  const browse = section.querySelector('#browse-vendors');
  if (browse) browse.addEventListener('click', () => navigate('/vendors'));

  // category buttons route with filter param
  section.querySelectorAll('.category-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      navigate(`/vendors?category=${encodeURIComponent(cat)}`);
    });
  });

  // carousel logic
  const track = section.querySelector('.carousel-track');
  const prev = section.querySelector('.carousel-control.prev');
  const next = section.querySelector('.carousel-control.next');
  let index = 0;
  const cardEls = track ? Array.from(track.children) : [];
  function setActiveCard() {
    cardEls.forEach((el, i) => el.classList.toggle('active', i === index));
  }
  function update() {
    if (!track) return;
    const cards = track.children.length;
    index = (index + cards) % cards;
    track.style.transform = `translateX(${-index * 100}%)`;
    setActiveCard();
  }
  if (prev) prev.addEventListener('click', () => { index--; update(); });
  if (next) next.addEventListener('click', () => { index++; update(); });
  setActiveCard();

  // autoplay (smooth)
  let autoplay = setInterval(() => { index++; update(); }, 4500);
  section.addEventListener('mouseenter', () => clearInterval(autoplay));
  section.addEventListener('mouseleave', () => { autoplay = setInterval(() => { index++; update(); }, 4500); });

  // swipe gestures for mobile
  let startX = 0; let isTouching = false;
  const threshold = 40;
  const carousel = section.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      if (!e.touches || e.touches.length === 0) return;
      startX = e.touches[0].clientX; isTouching = true; clearInterval(autoplay);
    }, { passive: true });
    carousel.addEventListener('touchmove', (e) => {
      if (!isTouching || !track) return;
    }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      if (!isTouching) return; isTouching = false;
      const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
      const delta = endX - startX;
      if (Math.abs(delta) > threshold) {
        if (delta < 0) { index++; } else { index--; }
        update();
      }
      autoplay = setInterval(() => { index++; update(); }, 4500);
    });
  }

  return section;
}
