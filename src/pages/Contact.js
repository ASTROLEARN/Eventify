export function Contact() {
  const el = document.createElement('main');
  el.className = 'content-section contact-theme';
  el.innerHTML = `
    <section class="panel contact-panel">
      <h2 class="section-title">Contact Us</h2>
      <div class="contact-grid two-col">
        <form class="contact-form" id="contact-form" novalidate>
          <div class="field-group"><label for="name">Name</label><input id="name" type="text" name="name" required /></div>
          <div class="field-group"><label for="email">Email</label><input id="email" type="email" name="email" required /></div>
          <div class="field-group"><label for="type">Event Type</label>
            <select id="type" name="type" required>
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Corporate</option>
              <option>Other</option>
            </select>
          </div>
          <div class="field-group full"><label for="message">Message</label><textarea id="message" name="message" rows="4" required></textarea></div>
          <div class="actions"><button class="primary-button contact-submit" type="submit">Send Message</button></div>

          <section class="plan-section">
            <div class="plan-inner">
              <div class="plan-illustration" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v3H5a2 2 0 0 0-2 2v2h18V7a2 2 0 0 0-2-2h-2V2h-2v3H9V2H7zm14 9H3v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9zm-4 3h-4v4h4v-4z"/></svg>
              </div>
              <div class="plan-copy">
                <h3 class="plan-title">Let's Plan Together</h3>
                <p class="plan-tagline">Have a dream event in mind? Our team will get back to you within 24 hours.</p>
              </div>
            </div>
          </section>
        </form>

        <div class="contact-info">
          <ul class="info-list">
            <li class="contact-row"><svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2 0l8 6 8-6H4zm16 16V7.2l-8 6-8-6V20h16z"/></svg><span>hello@eventify.example</span></li>
            <li class="contact-row"><svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1 .3 2 .5 3 .5.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1 0 1 .2 2 .5 3 .1.4 0 .8-.3 1.1l-2.2 2.2z"/></svg><span>+91 98765 43210</span></li>
            <li class="contact-row"><svg class="contact-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a8 8 0 0 0-8 8c0 5.3 8 12 8 12s8-6.7 8-12a8 8 0 0 0-8-8zm0 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg><span>San Francisco, CA</span></li>
          </ul>
          <div class="map-card">
            <iframe title="Eventify Office" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019342819637!2d-122.401363!3d37.793621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c2f0f0b1%3A0x2b3bdecb2b3!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1610000000000" width="100%" height="260" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
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
