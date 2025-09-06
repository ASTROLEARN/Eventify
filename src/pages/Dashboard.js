export function Dashboard() {
  const el = document.createElement('main');
  el.className = 'content-section';
  el.innerHTML = `
    <section class="panel">
      <h2 class="section-title">Dashboard</h2>
      <div class="tabs" role="tablist">
        <button class="tab active" role="tab" aria-selected="true" data-tab="user">User View</button>
        <button class="tab" role="tab" aria-selected="false" data-tab="vendor">Vendor View</button>
      </div>

      <div class="tab-panels">
        <div class="tab-panel active" id="panel-user">
          <div class="dashboard-grid">
            <div class="card">
              <h3>Budget Tracker</h3>
              <p><strong>Total Budget:</strong> ₹2,00,000</p>
              <p><strong>Spent:</strong> ₹1,20,000</p>
              <div class="progress"><div class="progress-bar" style="width: 60%"></div></div>
            </div>
            <div class="card">
              <h3>Booked Vendors</h3>
              <ul class="list">
                <li>Venue: Grand Royal Hall — 12 Oct</li>
                <li>Catering: Taste Buds — 12 Oct</li>
                <li>Photography: ShutterCraft — 12 Oct</li>
              </ul>
            </div>
            <div class="card">
              <h3>To-do List</h3>
              <ul class="list checklist">
                <li><input type="checkbox" checked> Finalize guest list</li>
                <li><input type="checkbox"> Choose decor theme</li>
                <li><input type="checkbox"> Send invitations</li>
              </ul>
            </div>
            <div class="card">
              <h3>Calendar</h3>
              <p>All bookings synced to your calendar.</p>
              <div class="calendar-placeholder">Oct 2025</div>
            </div>
          </div>
        </div>

        <div class="tab-panel" id="panel-vendor">
          <div class="dashboard-grid">
            <div class="card">
              <h3>Manage Bookings</h3>
              <p>2 new booking requests pending approval.</p>
              <button class="primary-button" type="button">Review Requests</button>
            </div>
            <div class="card">
              <h3>Set Availability</h3>
              <p>Update your calendar to accept new bookings.</p>
              <input type="date" />
              <button class="secondary-button" type="button">Save</button>
            </div>
            <div class="card">
              <h3>Update Services</h3>
              <p>Add packages, change pricing, or update photos.</p>
              <button class="secondary-button" type="button">Open Editor</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const tabs = el.querySelectorAll('.tab');
  const panels = el.querySelectorAll('.tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      const target = tab.getAttribute('data-tab');
      const panel = el.querySelector(`#panel-${target}`);
      if (panel) panel.classList.add('active');
    });
  });

  return el;
}
