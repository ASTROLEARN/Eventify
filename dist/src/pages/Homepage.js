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
  section.className = 'content-section page-enter';
  section.innerHTML = `
    <section class="hero-panel hero-banner">
      <div class="hero-grid">
        <div class="hero-copy">
          <div class="hero-badge">✨ #1 Event Planning Platform</div>
          <h1 class="hero-panel__title">Create Unforgettable Events in <span class="title-highlight">Minutes</span></h1>
          <p class="hero-panel__description">From intimate gatherings to grand celebrations, Eventify connects you with the perfect vendors, manages your budget, and brings your vision to life effortlessly.</p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">10K+</span>
              <span class="stat-label">Events Created</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">500+</span>
              <span class="stat-label">Trusted Vendors</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">98%</span>
              <span class="stat-label">Happy Clients</span>
            </div>
          </div>
          <div class="hero-actions">
            <button id="cta" class="primary-button hero-cta" type="button">
              <span>Start Planning Now</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </button>
            <button class="secondary-button" type="button" id="browse-vendors">
              <span>Browse Vendors</span>
            </button>
          </div>
          <div class="hero-trust">
            <p class="trust-text">Trusted by event planners nationwide</p>
            <div class="trust-indicators">
              <span class="trust-badge">⭐ 4.9/5 Rating</span>
              <span class="trust-badge">🔒 Secure Payments</span>
              <span class="trust-badge">📞 24/7 Support</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-image-container">
            <div class="floating-card card-1">
              <span class="card-emoji">🎉</span>
              <span class="card-text">Birthday Party</span>
            </div>
            <div class="floating-card card-2">
              <span class="card-emoji">💒</span>
              <span class="card-text">Wedding</span>
            </div>
            <div class="floating-card card-3">
              <span class="card-emoji">🏢</span>
              <span class="card-text">Corporate Event</span>
            </div>
            <div class="hero-main-visual">
              <div class="visual-backdrop"></div>
              <div class="event-preview">
                <h3>Your Dream Event</h3>
                <p>Everything planned to perfection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="section-divider" aria-hidden="true"></div>

    <section class="category-section animate-on-scroll">
      <div class="section-header animate-on-scroll delay-1">
        <h3 class="section-title">Find Perfect Vendors</h3>
        <p class="section-subtitle">Browse our curated network of top-rated event professionals</p>
      </div>
      <div class="category-grid animate-on-scroll delay-2">
        ${categoryItem('Catering', icons.Catering)}
        ${categoryItem('Decoration', icons.Decoration)}
        ${categoryItem('Photography', icons.Photography)}
        ${categoryItem('Venue', icons.Venue)}
        ${categoryItem('Entertainment', icons.Entertainment)}
      </div>
      <div class="category-footer">
        <button class="view-all-btn" id="view-all-vendors">
          View All Categories
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 12h14m-7-7l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>
    <div class="section-divider" aria-hidden="true"></div>

    <section class="testimonials-section animate-on-scroll" aria-label="Testimonials">
      <div class="section-header animate-on-scroll delay-1">
        <h3 class="section-title">Success Stories</h3>
        <p class="section-subtitle">See what our customers are saying about their events</p>
      </div>
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
    <div class="section-divider" aria-hidden="true"></div>

    <section class="cta-section animate-on-scroll">
      <div class="cta-content">
        <h3 class="cta-title animate-on-scroll delay-1">Ready to Plan Your Next Event?</h3>
        <p class="cta-description animate-on-scroll delay-2">Join thousands of happy customers who trust Eventify for their special moments</p>
        <div class="cta-actions">
          <button class="primary-button cta-primary" id="get-started">
            Get Started Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 12h14m-7-7l7 7-7 7"/>
            </svg>
          </button>
          <button class="secondary-button" id="learn-more">Learn More</button>
        </div>
      </div>
    </section>
  `;

  const browse = section.querySelector('#browse-vendors');
  if (browse) browse.addEventListener('click', () => navigate('/vendors'));

  // New button event listeners
  const viewAllVendors = section.querySelector('#view-all-vendors');
  if (viewAllVendors) viewAllVendors.addEventListener('click', () => navigate('/vendors'));

  const getStarted = section.querySelector('#get-started');
  if (getStarted) getStarted.addEventListener('click', () => navigate('/auth'));

  const learnMore = section.querySelector('#learn-more');
  if (learnMore) learnMore.addEventListener('click', () => navigate('/about'));

  // category buttons route with filter param
  section.querySelectorAll('.category-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      const category = String(cat || '').toLowerCase();
      navigate(`/vendors?category=${encodeURIComponent(category)}&minRating=4`);
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

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  section.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Enhanced button interactions
  const buttons = section.querySelectorAll('.primary-button, .secondary-button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Add loading state
      this.classList.add('btn-loading');
      
      // Remove loading state after a short delay (simulating action)
      setTimeout(() => {
        this.classList.remove('btn-loading');
      }, 1500);
    });
  });

  // Category button hover effects with audio feedback (if available)
  const categoryButtons = section.querySelectorAll('.category-button');
  categoryButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      // Create subtle feedback
      button.style.transform = 'translateY(-3px) scale(1.03)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
    
    button.addEventListener('click', function() {
      // Add click feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // Parallax effect for hero section
  let ticking = false;
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = section.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  }

  function requestParallaxTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestParallaxTick);

  // Add stagger animation to stats
  const statItems = section.querySelectorAll('.stat-item');
  statItems.forEach((item, index) => {
    item.style.animationDelay = `${0.2 + (index * 0.2)}s`;
    item.classList.add('animate-on-scroll');
    observer.observe(item);
  });

  // Add stagger animation to category buttons
  const categoryItems = section.querySelectorAll('.category-button');
  categoryItems.forEach((item, index) => {
    item.style.animationDelay = `${0.1 + (index * 0.1)}s`;
    item.classList.add('animate-on-scroll');
    observer.observe(item);
  });

  return section;
}
