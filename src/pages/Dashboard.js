import { AuthState, requireAuth } from '../utils/authState.js';

function DashboardComponent() {
  const section = document.createElement('main');
  section.className = 'content-section page-enter';
  
  const user = AuthState.getUser();
  const userName = AuthState.getUserDisplayName();
  
  section.innerHTML = `
    <div class="dashboard-container">
      <div class="dashboard-header animate-on-scroll">
        <div class="header-content">
          <h1 class="dashboard-title">Welcome back, ${userName}!</h1>
          <p class="dashboard-subtitle">Here's what's happening with your events</p>
        </div>
        <div class="header-actions">
          <button class="primary-button" id="create-event-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Create Event
          </button>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="stats-section animate-on-scroll delay-1">
          <h2 class="section-title">Quick Stats</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📅</div>
              <div class="stat-content">
                <div class="stat-number">3</div>
                <div class="stat-label">Active Events</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-content">
                <div class="stat-number">12</div>
                <div class="stat-label">Completed Events</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-content">
                <div class="stat-number">8</div>
                <div class="stat-label">Trusted Vendors</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">💰</div>
              <div class="stat-content">
                <div class="stat-number">₹45,000</div>
                <div class="stat-label">Budget Saved</div>
              </div>
            </div>
          </div>
        </div>

        <div class="recent-events animate-on-scroll delay-2">
          <div class="section-header">
            <h2 class="section-title">Recent Events</h2>
            <a href="#my-events" class="view-all-link">View All</a>
          </div>
          <div class="events-list">
            <div class="event-card">
              <div class="event-date">
                <div class="date-day">15</div>
                <div class="date-month">Oct</div>
              </div>
              <div class="event-content">
                <h3 class="event-title">Sarah's Birthday Party</h3>
                <p class="event-details">Garden Restaurant • 30 guests • ₹25,000</p>
                <div class="event-status status-active">Active</div>
              </div>
              <div class="event-actions">
                <button class="icon-button" title="Edit Event">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="event-card">
              <div class="event-date">
                <div class="date-day">28</div>
                <div class="date-month">Oct</div>
              </div>
              <div class="event-content">
                <h3 class="event-title">Corporate Workshop</h3>
                <p class="event-details">Conference Center • 100 guests • ₹75,000</p>
                <div class="event-status status-planning">Planning</div>
              </div>
              <div class="event-actions">
                <button class="icon-button" title="Edit Event">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="event-card">
              <div class="event-date">
                <div class="date-day">05</div>
                <div class="date-month">Nov</div>
              </div>
              <div class="event-content">
                <h3 class="event-title">Wedding Anniversary</h3>
                <p class="event-details">Beach Resort • 150 guests • ₹120,000</p>
                <div class="event-status status-confirmed">Confirmed</div>
              </div>
              <div class="event-actions">
                <button class="icon-button" title="Edit Event">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="quick-actions animate-on-scroll delay-3">
          <h2 class="section-title">Quick Actions</h2>
          <div class="actions-grid">
            <button class="action-card" id="browse-vendors">
              <div class="action-icon">🏪</div>
              <div class="action-title">Browse Vendors</div>
              <div class="action-subtitle">Find perfect service providers</div>
            </button>
            
            <button class="action-card" id="view-calendar">
              <div class="action-icon">📅</div>
              <div class="action-title">Event Calendar</div>
              <div class="action-subtitle">See all your upcoming events</div>
            </button>
            
            <button class="action-card" id="budget-tracker">
              <div class="action-icon">💰</div>
              <div class="action-title">Budget Tracker</div>
              <div class="action-subtitle">Monitor event expenses</div>
            </button>
            
            <button class="action-card" id="vendor-reviews">
              <div class="action-icon">⭐</div>
              <div class="action-title">Write Reviews</div>
              <div class="action-subtitle">Share your experience</div>
            </button>
          </div>
        </div>

        <div class="vendor-recommendations animate-on-scroll delay-4">
          <h2 class="section-title">Recommended for You</h2>
          <div class="vendor-cards">
            <div class="vendor-card">
              <div class="vendor-image">
                <div class="placeholder-image">📸</div>
              </div>
              <div class="vendor-info">
                <h4 class="vendor-name">Elegant Catering Co.</h4>
                <p class="vendor-category">Catering Service</p>
                <div class="vendor-rating">
                  <span class="rating">4.8</span>
                  <span class="rating-stars">⭐⭐⭐⭐⭐</span>
                  <span class="rating-count">(156 reviews)</span>
                </div>
                <div class="vendor-price">₹800 per plate</div>
              </div>
            </div>
            
            <div class="vendor-card">
              <div class="vendor-image">
                <div class="placeholder-image">📸</div>
              </div>
              <div class="vendor-info">
                <h4 class="vendor-name">Bloom & Blossom</h4>
                <p class="vendor-category">Decoration</p>
                <div class="vendor-rating">
                  <span class="rating">4.9</span>
                  <span class="rating-stars">⭐⭐⭐⭐⭐</span>
                  <span class="rating-count">(89 reviews)</span>
                </div>
                <div class="vendor-price">₹15,000 starting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add dashboard styles
  const style = document.createElement('style');
  style.textContent = `
    .dashboard-container {
      padding: 32px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 40px;
      gap: 20px;
    }
    
    .dashboard-title {
      font-size: 32px;
      font-weight: 700;
      color: var(--ink);
      margin: 0 0 8px 0;
    }
    
    .dashboard-subtitle {
      color: var(--muted);
      margin: 0;
      font-size: 18px;
    }
    
    .dashboard-grid {
      display: grid;
      gap: 32px;
    }
    
    .section-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--ink);
      margin: 0 0 20px 0;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .view-all-link {
      color: var(--brand);
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
    }
    
    .view-all-link:hover {
      text-decoration: underline;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .stat-card {
      background: var(--card);
      border: 1px solid var(--accent-2);
      border-radius: 12px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: all 0.2s ease;
    }
    
    .stat-card:hover {
      box-shadow: var(--shadow);
      transform: translateY(-2px);
    }
    
    .stat-icon {
      font-size: 32px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(248, 113, 113, 0.1);
      border-radius: 8px;
    }
    
    .stat-number {
      font-size: 24px;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 4px;
    }
    
    .stat-label {
      color: var(--muted);
      font-size: 14px;
    }
    
    .events-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .event-card {
      background: var(--card);
      border: 1px solid var(--accent-2);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: all 0.2s ease;
    }
    
    .event-card:hover {
      box-shadow: var(--shadow);
    }
    
    .event-date {
      text-align: center;
      min-width: 60px;
    }
    
    .date-day {
      font-size: 24px;
      font-weight: 700;
      color: var(--brand);
      line-height: 1;
    }
    
    .date-month {
      font-size: 12px;
      color: var(--muted);
      text-transform: uppercase;
      font-weight: 600;
    }
    
    .event-content {
      flex: 1;
    }
    
    .event-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--ink);
      margin: 0 0 8px 0;
    }
    
    .event-details {
      color: var(--muted);
      font-size: 14px;
      margin: 0 0 12px 0;
    }
    
    .event-status {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .status-active {
      background: rgba(34, 197, 94, 0.1);
      color: #16a34a;
    }
    
    .status-planning {
      background: rgba(251, 191, 36, 0.1);
      color: #d97706;
    }
    
    .status-confirmed {
      background: rgba(59, 130, 246, 0.1);
      color: #2563eb;
    }
    
    .event-actions {
      display: flex;
      gap: 8px;
    }
    
    .icon-button {
      width: 36px;
      height: 36px;
      border: 1px solid var(--accent-2);
      background: var(--bg);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--muted);
      transition: all 0.2s ease;
    }
    
    .icon-button:hover {
      color: var(--brand);
      border-color: var(--brand);
    }
    
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .action-card {
      background: var(--card);
      border: 1px solid var(--accent-2);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }
    
    .action-card:hover {
      box-shadow: var(--shadow);
      transform: translateY(-2px);
      border-color: var(--brand);
    }
    
    .action-icon {
      font-size: 32px;
      margin-bottom: 16px;
    }
    
    .action-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 8px;
    }
    
    .action-subtitle {
      color: var(--muted);
      font-size: 14px;
    }
    
    .vendor-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    
    .vendor-card {
      background: var(--card);
      border: 1px solid var(--accent-2);
      border-radius: 12px;
      padding: 20px;
      transition: all 0.2s ease;
    }
    
    .vendor-card:hover {
      box-shadow: var(--shadow);
      transform: translateY(-2px);
    }
    
    .vendor-image {
      width: 100%;
      height: 120px;
      background: var(--accent-2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    
    .placeholder-image {
      font-size: 32px;
      opacity: 0.5;
    }
    
    .vendor-name {
      font-size: 16px;
      font-weight: 600;
      color: var(--ink);
      margin: 0 0 4px 0;
    }
    
    .vendor-category {
      color: var(--muted);
      font-size: 14px;
      margin: 0 0 12px 0;
    }
    
    .vendor-rating {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    .rating {
      font-weight: 600;
      color: var(--ink);
    }
    
    .rating-count {
      color: var(--muted);
    }
    
    .vendor-price {
      font-weight: 600;
      color: var(--brand);
      font-size: 16px;
    }
    
    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        align-items: stretch;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .actions-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .vendor-cards {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 480px) {
      .dashboard-container {
        padding: 20px 16px;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .actions-grid {
        grid-template-columns: 1fr;
      }
      
      .event-card {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
      }
      
      .event-date {
        align-self: flex-end;
      }
    }
  `;
  document.head.appendChild(style);

  // Add event listeners
  const createEventBtn = section.querySelector('#create-event-btn');
  createEventBtn.addEventListener('click', () => {
    // Navigate to event creation page (will be implemented later)
    window.location.hash = '#create-event';
  });

  // Quick action buttons
  section.querySelector('#browse-vendors').addEventListener('click', () => {
    window.location.hash = '#vendors';
  });

  section.querySelector('#view-calendar').addEventListener('click', () => {
    window.location.hash = '#calendar';
  });

  section.querySelector('#budget-tracker').addEventListener('click', () => {
    window.location.hash = '#budget';
  });

  section.querySelector('#vendor-reviews').addEventListener('click', () => {
    window.location.hash = '#reviews';
  });

  // Add scroll animation observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  section.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  return section;
}

// Export dashboard with auth protection
export const Dashboard = requireAuth(DashboardComponent);
