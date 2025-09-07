export function Contact() {
  const el = document.createElement('main');
  el.className = 'content-section';
  el.innerHTML = `
    <section class="contact-wrap">
      <header class="contact-header">
        <img class="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2F7860fc63240248d9961d00aee706ff31%2F2211baeb183d454aaedf8ce769957f7a?format=webp&width=800" alt="Eventify logo" />
        <h2 class="section-title">Contact Us</h2>
      </header>

      <div class="contact-grid">
        <form class="contact-form" id="contact-form">
          <div class="form-row">
            <label class="field-label" for="name">Name</label>
            <input class="input-control" id="name" type="text" name="name" required />
          </div>
          <div class="form-row">
            <label class="field-label" for="email">Email</label>
            <input class="input-control" id="email" type="email" name="email" required />
          </div>
          <div class="form-row">
            <label class="field-label" for="type">Event Type</label>
            <select class="input-control" id="type" name="type" required>
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Corporate</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-row">
            <label class="field-label" for="message">Message</label>
            <textarea class="input-control" id="message" name="message" rows="5" required></textarea>
          </div>
          <button class="primary-button contact-submit" type="submit">Send Message</button>

          <section class="plan-together" aria-label="Let’s Plan Together">
            <div class="plan-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zm12 8H5v8h14v-8z"/></svg>
            </div>
            <div class="plan-copy">
              <h3 class="plan-title">Let’s Plan Together</h3>
              <p class="plan-tagline">Have a dream event in mind? Our team will get back to you within 24 hours.</p>
            </div>
          </section>
        </form>

        <aside class="contact-info">
          <ul class="info-list">
            <li class="info-item">
              <span class="info-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm2 0l8 5 8-5H4zm16 12V8l-8 5-8-5v10h16z"/></svg></span>
              <span class="info-text">hello@eventify.example</span>
            </li>
            <li class="info-item">
              <span class="info-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.5-.37 12 12 0 0 0 3.8.62 1.5 1.5 0 0 1 1.5 1.5V20a2 2 0 0 1-2.2 2 18 18 0 0 1-16-16A2 2 0 0 1 4 3h2.07A1.5 1.5 0 0 1 7.6 4.5c0 1.3.22 2.6.62 3.8.14.5.03 1-.37 1.5l-1.25 1z"/></svg></span>
              <span class="info-text">+91 98765 43210</span>
            </li>
            <li class="info-item">
              <span class="info-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg></span>
              <span class="info-text">Brigade Road, Bengaluru</span>
            </li>
          </ul>

          <div class="map-card">
            <iframe title="Eventify Office" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019342819637!2d-122.401363!3d37.793621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c2f0f0b1%3A0x2b3bdecb2b3!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1610000000000" width="100%" height="260" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </aside>
      </div>
    </section>
  `;

  const form = el.querySelector('#contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks! We\'ll get back to you shortly.');
    form.reset();
  });

  return el;
}
