export function Contact() {
  const el = document.createElement('main');
  el.className = 'content-section';
  el.innerHTML = `
    <section class="panel">
      <h2 class="section-title">Contact Us</h2>
      <div class="contact-grid">
        <form class="contact-form" id="contact-form">
          <label>Name<input type="text" name="name" required /></label>
          <label>Email<input type="email" name="email" required /></label>
          <label>Event Type
            <select name="type" required>
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Corporate</option>
              <option>Other</option>
            </select>
          </label>
          <label>Message<textarea name="message" rows="4" required></textarea></label>
          <button class="primary-button" type="submit">Send</button>
        </form>
        <div class="contact-info">
          <p><strong>Email:</strong> hello@eventify.example</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <div class="map-embed">
            <iframe title="Eventify Office" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019342819637!2d-122.401363!3d37.793621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c2f0f0b1%3A0x2b3bdecb2b3!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1610000000000" width="100%" height="260" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
