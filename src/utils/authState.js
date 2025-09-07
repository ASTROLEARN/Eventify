/**
 * Authentication state management
 * Handles user session state and auth-related utilities
 */

import { auth } from '../config/supabase.js';

class AuthenticationState {
  constructor() {
    this.user = null;
    this.session = null;
    this.listeners = [];
    this.initialized = false;
    
    this.initialize();
  }

  async initialize() {
    try {
      // Get current session
      const { data: { session }, error } = await auth.getCurrentSession();
      
      if (error) {
        console.error('Error getting session:', error);
      } else {
        this.session = session;
        this.user = session?.user || null;
      }

      // Listen for auth changes
      auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'No user');
        
        this.session = session;
        this.user = session?.user || null;
        
        // Notify listeners
        this.notifyListeners(event, this.user);
        
        // Update navigation (but don't redirect during login process)
        if (!window.isLoggingIn) {
          this.updateNavigation();
        }
      });

      this.initialized = true;
      this.updateNavigation();
      
    } catch (error) {
      console.error('Error initializing auth state:', error);
    }
  }

  // Set user (for manual updates)
  setUser(user) {
    this.user = user;
    this.notifyListeners('SIGNED_IN', user);
    this.updateNavigation();
  }

  // Get current user
  getUser() {
    return this.user;
  }

  // Get current session
  getSession() {
    return this.session;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.user;
  }

  // Check if user has specific role
  hasRole(role) {
    return this.user?.user_metadata?.user_type === role || 
           this.user?.app_metadata?.user_type === role;
  }

  // Add auth state listener
  addListener(callback) {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners
  notifyListeners(event, user) {
    this.listeners.forEach(callback => {
      try {
        callback(event, user);
      } catch (error) {
        console.error('Error in auth listener:', error);
      }
    });
  }

  // Update navigation based on auth state
  updateNavigation() {
    const authButtons = document.querySelector('.nav-right');
    if (!authButtons) return;

    if (this.isAuthenticated()) {
      // Show user menu
      authButtons.innerHTML = `
        <div class="user-menu">
          <button class="user-avatar" id="user-menu-toggle">
            <span class="avatar-text">${this.getUserInitials()}</span>
          </button>
          <div class="user-dropdown" id="user-dropdown">
            <div class="dropdown-header">
              <div class="user-info">
                <div class="user-name">${this.getUserDisplayName()}</div>
                <div class="user-email">${this.user.email}</div>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <a href="#dashboard" class="dropdown-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
              Dashboard
            </a>
            <a href="#profile" class="dropdown-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              Profile
            </a>
            <a href="#my-events" class="dropdown-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              My Events
            </a>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" id="logout-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      `;

      // Add user menu styles
      if (!document.getElementById('user-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'user-menu-styles';
        style.textContent = `
          .user-menu {
            position: relative;
          }
          
          .user-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--brand);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s ease;
          }
          
          .user-avatar:hover {
            background: var(--accent);
            transform: scale(1.05);
          }
          
          .user-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 8px;
            background: var(--card);
            border: 1px solid var(--accent-2);
            border-radius: 8px;
            box-shadow: var(--shadow);
            min-width: 220px;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s ease;
          }
          
          .user-dropdown.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          
          .dropdown-header {
            padding: 16px;
          }
          
          .user-info {
            text-align: left;
          }
          
          .user-name {
            font-weight: 600;
            color: var(--ink);
            font-size: 14px;
            margin-bottom: 2px;
          }
          
          .user-email {
            font-size: 12px;
            color: var(--muted);
          }
          
          .dropdown-divider {
            height: 1px;
            background: var(--accent-2);
            margin: 0 8px;
          }
          
          .dropdown-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            color: var(--ink);
            text-decoration: none;
            border: none;
            background: none;
            width: 100%;
            text-align: left;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s ease;
          }
          
          .dropdown-item:hover {
            background: rgba(248, 113, 113, 0.1);
          }
          
          .dropdown-item svg {
            color: var(--muted);
          }
        `;
        document.head.appendChild(style);
      }

      // Add menu toggle functionality
      const menuToggle = document.getElementById('user-menu-toggle');
      const dropdown = document.getElementById('user-dropdown');
      const logoutButton = document.getElementById('logout-button');

      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        dropdown.classList.remove('show');
      });

      // Logout functionality
      logoutButton.addEventListener('click', async () => {
        try {
          await auth.signOut();
          window.location.hash = '#home';
        } catch (error) {
          console.error('Logout error:', error);
        }
      });

    } else {
      // Show login/register buttons
      authButtons.innerHTML = `
        <a href="#login" class="secondary-button">Login</a>
        <a href="#register" class="primary-button">Get Started</a>
      `;
    }
  }

  // Get user display name
  getUserDisplayName() {
    if (!this.user) return '';
    
    const firstName = this.user.user_metadata?.first_name || '';
    const lastName = this.user.user_metadata?.last_name || '';
    
    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim();
    }
    
    return this.user.email?.split('@')[0] || 'User';
  }

  // Get user initials
  getUserInitials() {
    if (!this.user) return '';
    
    const firstName = this.user.user_metadata?.first_name || '';
    const lastName = this.user.user_metadata?.last_name || '';
    
    if (firstName || lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    
    return this.user.email?.charAt(0).toUpperCase() || 'U';
  }

  // Sign out
  async signOut() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
}

// Create and export singleton instance
export const AuthState = new AuthenticationState();

// Export utilities
export const requireAuth = (callback) => {
  return (...args) => {
    if (!AuthState.isAuthenticated()) {
      window.location.hash = '#login';
      return;
    }
    return callback(...args);
  };
};

export const redirectIfAuthenticated = () => {
  if (AuthState.isAuthenticated()) {
    window.location.hash = '#dashboard';
    return true;
  }
  return false;
};