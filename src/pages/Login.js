import { auth } from '../config/supabase.js';
import { AuthState } from '../utils/authState.js';

export function Login() {
  const section = document.createElement('main');
  section.className = 'content-section page-enter';
  section.innerHTML = `
    <div class="auth-container">
      <div class="auth-card animate-on-scroll">
        <div class="auth-header">
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Sign in to your Eventify account</p>
        </div>
        
        <form class="auth-form" id="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              class="form-input" 
              placeholder="Enter your email"
              required
              autocomplete="email"
            />
            <div class="form-error" id="email-error"></div>
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="password-input-group">
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input" 
                placeholder="Enter your password"
                required
                autocomplete="current-password"
              />
              <button type="button" class="password-toggle" id="toggle-password">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>
            <div class="form-error" id="password-error"></div>
          </div>
          
          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" id="remember-me" name="remember">
              <span class="checkmark"></span>
              Remember me
            </label>
            <a href="#forgot-password" class="forgot-password-link">Forgot password?</a>
          </div>
          
          <button type="submit" class="primary-button auth-button" id="login-button">
            <span class="button-text">Sign In</span>
            <svg class="button-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 17l5-5-5-5v10z"/>
            </svg>
          </button>
          
          <div class="form-divider">
            <span>or</span>
          </div>
          
          <button type="button" class="google-auth-button" id="google-login">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          <div class="auth-footer">
            <p>Don't have an account? <a href="#register" class="auth-link">Sign up here</a></p>
          </div>
        </form>
        
        <div class="auth-success" id="auth-success" style="display: none;">
          <div class="success-icon">✓</div>
          <h3>Welcome back!</h3>
          <p>You've been successfully signed in.</p>
        </div>
        
        <div class="auth-loading" id="auth-loading" style="display: none;">
          <div class="loading-spinner"></div>
          <p>Signing you in...</p>
        </div>
      </div>
    </div>
  `;

  // Add authentication styles
  const style = document.createElement('style');
  style.textContent = `
    .auth-container {
      min-height: calc(100vh - 80px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.1), rgba(251, 191, 36, 0.1));
    }
    
    .auth-card {
      background: var(--card);
      border-radius: 16px;
      padding: 40px;
      box-shadow: var(--shadow);
      border: 1px solid var(--accent-2);
      width: 100%;
      max-width: 420px;
      position: relative;
      overflow: hidden;
    }
    
    .auth-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--brand), var(--accent));
    }
    
    .auth-header {
      text-align: center;
      margin-bottom: 32px;
    }
    
    .auth-title {
      font-size: 28px;
      font-weight: 700;
      color: var(--ink);
      margin: 0 0 8px 0;
    }
    
    .auth-subtitle {
      color: var(--muted);
      margin: 0;
      font-size: 16px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--ink);
      font-size: 14px;
    }
    
    .form-input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid var(--accent-2);
      border-radius: 8px;
      font-size: 16px;
      background: var(--bg);
      color: var(--ink);
      transition: all 0.2s ease;
      box-sizing: border-box;
    }
    
    .form-input:focus {
      outline: none;
      border-color: var(--brand);
      box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1);
    }
    
    .form-input::placeholder {
      color: var(--muted);
    }
    
    .password-input-group {
      position: relative;
    }
    
    .password-toggle {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: color 0.2s ease;
    }
    
    .password-toggle:hover {
      color: var(--brand);
    }
    
    .form-error {
      color: #ef4444;
      font-size: 14px;
      margin-top: 8px;
      min-height: 20px;
    }
    
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    
    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 14px;
      color: var(--ink);
    }
    
    .checkbox-label input[type="checkbox"] {
      margin-right: 8px;
    }
    
    .forgot-password-link {
      color: var(--brand);
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
    }
    
    .forgot-password-link:hover {
      text-decoration: underline;
    }
    
    .auth-button {
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .form-divider {
      text-align: center;
      position: relative;
      margin: 24px 0;
    }
    
    .form-divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--accent-2);
    }
    
    .form-divider span {
      background: var(--card);
      padding: 0 16px;
      color: var(--muted);
      font-size: 14px;
    }
    
    .google-auth-button {
      width: 100%;
      padding: 12px 20px;
      border: 2px solid var(--accent-2);
      border-radius: 8px;
      background: var(--bg);
      color: var(--ink);
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      transition: all 0.2s ease;
      margin-bottom: 24px;
    }
    
    .google-auth-button:hover {
      border-color: var(--brand);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .auth-footer {
      text-align: center;
    }
    
    .auth-footer p {
      margin: 0;
      color: var(--muted);
      font-size: 14px;
    }
    
    .auth-link {
      color: var(--brand);
      text-decoration: none;
      font-weight: 600;
    }
    
    .auth-link:hover {
      text-decoration: underline;
    }
    
    .auth-success,
    .auth-loading {
      text-align: center;
      padding: 40px 20px;
    }
    
    .success-icon {
      width: 60px;
      height: 60px;
      background: var(--brand);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      margin: 0 auto 20px;
    }
    
    .auth-success h3 {
      color: var(--ink);
      margin: 0 0 8px 0;
    }
    
    .auth-success p,
    .auth-loading p {
      color: var(--muted);
      margin: 0;
    }
    
    @media (max-width: 480px) {
      .auth-container {
        padding: 20px;
      }
      
      .auth-card {
        padding: 24px;
      }
      
      .auth-title {
        font-size: 24px;
      }
    }
  `;
  document.head.appendChild(style);

  // Form functionality
  const form = section.querySelector('#login-form');
  const loadingDiv = section.querySelector('#auth-loading');
  const successDiv = section.querySelector('#auth-success');
  const emailInput = section.querySelector('#email');
  const passwordInput = section.querySelector('#password');
  const emailError = section.querySelector('#email-error');
  const passwordError = section.querySelector('#password-error');

  // Password toggle functionality
  const togglePassword = section.querySelector('#toggle-password');
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
  });

  // Form validation
  const validateForm = () => {
    let isValid = true;
    
    // Email validation
    const email = emailInput.value.trim();
    if (!email) {
      emailError.textContent = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError.textContent = 'Please enter a valid email address';
      isValid = false;
    } else {
      emailError.textContent = '';
    }
    
    // Password validation
    const password = passwordInput.value;
    if (!password) {
      passwordError.textContent = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters';
      isValid = false;
    } else {
      passwordError.textContent = '';
    }
    
    return isValid;
  };

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    try {
      // Show loading state
      form.style.display = 'none';
      loadingDiv.style.display = 'block';
      
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        throw error;
      }
      
      // Show success state
      loadingDiv.style.display = 'none';
      successDiv.style.display = 'block';
      
      // Update auth state
      AuthState.setUser(data.user);
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        window.location.hash = '#dashboard';
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Show form again
      loadingDiv.style.display = 'none';
      form.style.display = 'block';
      
      // Show error message
      if (error.message.includes('Invalid login credentials')) {
        passwordError.textContent = 'Invalid email or password';
      } else {
        passwordError.textContent = error.message || 'An error occurred during login';
      }
    }
  });

  // Google auth
  section.querySelector('#google-login').addEventListener('click', async () => {
    try {
      const { data, error } = await auth.signInWithGoogle();
      if (error) throw error;
      
      // Google auth will redirect, so no need to handle success here
    } catch (error) {
      console.error('Google login error:', error);
      passwordError.textContent = 'Google login failed. Please try again.';
    }
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