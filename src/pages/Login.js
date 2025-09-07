import { auth } from '../config/supabase.js';
import { AuthState } from '../utils/authState.js';
import { navigate } from '../App.js';

export function Login() {
  const section = document.createElement('main');
  section.className = 'content-section page-enter';
  
  section.innerHTML = `
    <div class="modern-auth-container">
      <div class="auth-card-modern">
        <!-- Header -->
        <div class="auth-header-modern">
          <div class="brand-section">
            <div class="brand-icon-modern">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 2v11h3v9l7-12h-4L17 2H7z"/>
              </svg>
            </div>
            <h1 class="auth-title-modern">Welcome Back</h1>
          </div>
          <p class="auth-subtitle-modern">Sign in to your Eventify account</p>
        </div>

        <!-- Form -->
        <form class="auth-form-modern" id="login-form">
          <!-- Email -->
          <div class="input-group-modern">
            <label for="email" class="input-label-modern">Email</label>
            <div class="input-wrapper-modern">
              <svg class="input-icon-modern" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="input-field-modern" 
                placeholder="Enter your email"
                required
                autocomplete="email"
              />
            </div>
            <div class="error-message" id="email-error"></div>
          </div>

          <!-- Password -->
          <div class="input-group-modern">
            <label for="password" class="input-label-modern">Password</label>
            <div class="input-wrapper-modern">
              <svg class="input-icon-modern" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <circle cx="12" cy="16" r="1"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="input-field-modern" 
                placeholder="Enter your password"
                required
                autocomplete="current-password"
              />
              <button type="button" class="password-toggle-modern" id="toggle-password">
                <svg class="show-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg class="hide-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
            <div class="error-message" id="password-error"></div>
          </div>

          <!-- Form Options -->
          <div class="form-options-modern">
            <label class="checkbox-modern">
              <input type="checkbox" id="remember-me">
              <span class="checkbox-mark"></span>
              <span class="checkbox-text">Remember me</span>
            </label>
            <a href="#/forgot-password" class="forgot-link">Forgot password?</a>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn-primary-modern" id="login-btn">
            <span class="btn-text">Sign In</span>
            <div class="btn-loading" style="display: none;">
              <div class="loading-spinner"></div>
            </div>
          </button>

          <!-- Divider -->
          <div class="divider-modern">
            <span>or</span>
          </div>

          <!-- Google Button -->
          <button type="button" class="btn-google-modern" id="google-btn">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </form>

        <!-- Footer -->
        <div class="auth-footer-modern">
          <p>Don't have an account? <a href="#/register" class="signup-link">Sign up</a></p>
        </div>
      </div>

      <!-- Toast Container -->
      <div class="toast-container-modern" id="toast-container"></div>
    </div>
  `;

  // Add modern styles
  const style = document.createElement('style');
  style.textContent = `
    /* Modern Login Page Styles */
    .modern-auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
    }

    .modern-auth-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
      opacity: 0.5;
    }

    .auth-card-modern {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      padding: 40px;
      width: 100%;
      max-width: 420px;
      box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.2);
      position: relative;
      z-index: 1;
      animation: slideUp 0.6s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .auth-header-modern {
      text-align: center;
      margin-bottom: 32px;
    }

    .brand-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .brand-icon-modern {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    }

    .auth-title-modern {
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
      line-height: 1.2;
    }

    .auth-subtitle-modern {
      color: #6b7280;
      margin: 0;
      font-size: 16px;
      line-height: 1.5;
    }

    .auth-form-modern {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .input-group-modern {
      position: relative;
    }

    .input-label-modern {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #374151;
      font-size: 14px;
    }

    .input-wrapper-modern {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon-modern {
      position: absolute;
      left: 16px;
      color: #6b7280;
      z-index: 2;
      pointer-events: none;
    }

    .input-field-modern {
      width: 100%;
      padding: 16px 16px 16px 48px;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 16px;
      background: white;
      color: #1f2937;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .input-field-modern:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .input-field-modern::placeholder {
      color: #9ca3af;
    }

    .password-toggle-modern {
      position: absolute;
      right: 16px;
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .password-toggle-modern:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
    }

    .error-message {
      color: #ef4444;
      font-size: 14px;
      margin-top: 6px;
      min-height: 20px;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    }

    .error-message.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .form-options-modern {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px 0;
    }

    .checkbox-modern {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      color: #374151;
    }

    .checkbox-modern input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    .checkbox-mark {
      width: 18px;
      height: 18px;
      border: 2px solid #d1d5db;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      position: relative;
    }

    .checkbox-modern input:checked + .checkbox-mark {
      background: #667eea;
      border-color: #667eea;
    }

    .checkbox-modern input:checked + .checkbox-mark::after {
      content: '✓';
      color: white;
      font-size: 12px;
      font-weight: bold;
    }

    .forgot-link {
      color: #667eea;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .forgot-link:hover {
      color: #5a67d8;
      text-decoration: underline;
    }

    .btn-primary-modern {
      width: 100%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 16px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 52px;
      position: relative;
      overflow: hidden;
    }

    .btn-primary-modern:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }

    .btn-primary-modern:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .btn-loading {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .divider-modern {
      text-align: center;
      margin: 24px 0;
      position: relative;
      color: #6b7280;
      font-size: 14px;
    }

    .divider-modern::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e5e7eb;
    }

    .divider-modern span {
      background: rgba(255, 255, 255, 0.95);
      padding: 0 16px;
      position: relative;
    }

    .btn-google-modern {
      width: 100%;
      background: white;
      color: #374151;
      border: 2px solid #e5e7eb;
      padding: 16px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      min-height: 52px;
    }

    .btn-google-modern:hover:not(:disabled) {
      background: #f9fafb;
      border-color: #d1d5db;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .btn-google-modern:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .auth-footer-modern {
      text-align: center;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
    }

    .auth-footer-modern p {
      color: #6b7280;
      margin: 0;
      font-size: 14px;
    }

    .signup-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s ease;
    }

    .signup-link:hover {
      color: #5a67d8;
      text-decoration: underline;
    }

    /* Toast Notifications */
    .toast-container-modern {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }

    .toast-modern {
      background: #1f2937;
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      margin-bottom: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 350px;
      position: relative;
    }

    .toast-modern.show {
      transform: translateX(0);
    }

    .toast-modern.success {
      background: #10b981;
    }

    .toast-modern.error {
      background: #ef4444;
    }

    .toast-modern.info {
      background: #3b82f6;
    }

    /* Responsive Design */
    @media (max-width: 480px) {
      .modern-auth-container {
        padding: 16px;
      }

      .auth-card-modern {
        padding: 32px 24px;
        border-radius: 20px;
      }

      .auth-title-modern {
        font-size: 24px;
      }

      .input-field-modern {
        font-size: 16px;
        padding: 14px 14px 14px 44px;
      }

      .btn-primary-modern,
      .btn-google-modern {
        padding: 14px;
        font-size: 15px;
      }
    }

    /* Dark theme support */
    @media (prefers-color-scheme: dark) {
      .auth-card-modern {
        background: rgba(31, 41, 55, 0.95);
        border: 1px solid rgba(55, 65, 81, 0.3);
      }

      .auth-title-modern {
        color: #f9fafb;
      }

      .auth-subtitle-modern {
        color: #d1d5db;
      }

      .input-label-modern {
        color: #f3f4f6;
      }

      .input-field-modern {
        background: rgba(55, 65, 81, 0.5);
        border-color: #4b5563;
        color: #f9fafb;
      }

      .input-field-modern::placeholder {
        color: #9ca3af;
      }

      .input-field-modern:focus {
        border-color: #667eea;
        background: rgba(55, 65, 81, 0.8);
      }

      .checkbox-text {
        color: #f3f4f6;
      }

      .form-options-modern .checkbox-modern {
        color: #f3f4f6;
      }

      .auth-footer-modern p {
        color: #d1d5db;
      }

      .divider-modern span {
        background: rgba(31, 41, 55, 0.95);
      }

      .btn-google-modern {
        background: rgba(55, 65, 81, 0.8);
        border-color: #4b5563;
        color: #f9fafb;
      }

      .btn-google-modern:hover {
        background: rgba(55, 65, 81, 1);
        border-color: #6b7280;
      }
    }
  `;

  // Add styles to document
  if (!document.getElementById('modern-login-styles')) {
    style.id = 'modern-login-styles';
    document.head.appendChild(style);
  }

  // Enhanced functionality
  const form = section.querySelector('#login-form');
  const emailInput = section.querySelector('#email');
  const passwordInput = section.querySelector('#password');
  const loginBtn = section.querySelector('#login-btn');
  const googleBtn = section.querySelector('#google-btn');
  const passwordToggle = section.querySelector('#toggle-password');
  const toastContainer = section.querySelector('#toast-container');

  // Email validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Show error message
  function showError(input, message) {
    const errorEl = section.querySelector(`#${input.id}-error`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
      input.style.borderColor = '#ef4444';
    }
  }

  // Clear error message
  function clearError(input) {
    const errorEl = section.querySelector(`#${input.id}-error`);
    if (errorEl) {
      errorEl.classList.remove('visible');
      input.style.borderColor = '#e5e7eb';
    }
  }

  // Show toast notification
  function showToast(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast-modern ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // Set loading state
  function setLoading(loading) {
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoading = loginBtn.querySelector('.btn-loading');
    
    loginBtn.disabled = loading;
    googleBtn.disabled = loading;
    
    if (loading) {
      btnText.style.opacity = '0';
      btnLoading.style.display = 'flex';
    } else {
      btnText.style.opacity = '1';
      btnLoading.style.display = 'none';
    }
  }

  // Input validation
  emailInput.addEventListener('input', () => {
    clearError(emailInput);
    if (emailInput.value && !validateEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
    }
  });

  passwordInput.addEventListener('input', () => {
    clearError(passwordInput);
  });

  // Password toggle
  passwordToggle.addEventListener('click', () => {
    const showIcon = passwordToggle.querySelector('.show-icon');
    const hideIcon = passwordToggle.querySelector('.hide-icon');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showIcon.style.display = 'none';
      hideIcon.style.display = 'block';
    } else {
      passwordInput.type = 'password';
      showIcon.style.display = 'block';
      hideIcon.style.display = 'none';
    }
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = section.querySelector('#remember-me').checked;

    // Clear previous errors
    clearError(emailInput);
    clearError(passwordInput);

    // Validate inputs
    if (!email) {
      showError(emailInput, 'Email is required');
      emailInput.focus();
      return;
    }

    if (!validateEmail(email)) {
      showError(emailInput, 'Please enter a valid email address');
      emailInput.focus();
      return;
    }

    if (!password) {
      showError(passwordInput, 'Password is required');
      passwordInput.focus();
      return;
    }

    try {
      setLoading(true);
      
      const { data, error } = await auth.signIn(email, password);
      
      if (error) throw error;

      // Remember email if checked
      if (rememberMe) {
        localStorage.setItem('eventify_remember_email', email);
      } else {
        localStorage.removeItem('eventify_remember_email');
      }

      showToast('Sign in successful! Redirecting...', 'success');
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (error) {
      console.error('Login error:', error);
      
      let message = 'An error occurred during sign in';
      
      if (error.message?.includes('Invalid login credentials') || 
          error.message?.includes('Invalid email or password')) {
        message = 'Invalid email or password. Please try again.';
        showError(passwordInput, 'Invalid credentials');
      } else if (error.message?.includes('Email not confirmed')) {
        message = 'Please check your email and click the confirmation link.';
        showError(emailInput, 'Email not confirmed');
      } else if (error.message?.includes('Too many requests')) {
        message = 'Too many attempts. Please wait a moment and try again.';
      } else if (error.message) {
        message = error.message;
      }
      
      showToast(message, 'error', 5000);
    } finally {
      setLoading(false);
    }
  });

  // Google login
  googleBtn.addEventListener('click', async () => {
    try {
      googleBtn.disabled = true;
      showToast('Redirecting to Google...', 'info');
      
      const { data, error } = await auth.signInWithGoogle();
      if (error) throw error;
      
    } catch (error) {
      console.error('Google login error:', error);
      showToast('Google sign in failed. Please try again.', 'error');
      googleBtn.disabled = false;
    }
  });

  // Remember email functionality
  const rememberedEmail = localStorage.getItem('eventify_remember_email');
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    section.querySelector('#remember-me').checked = true;
  }

  // Keyboard navigation
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
      e.preventDefault();
      
      if (e.target === emailInput && emailInput.value) {
        passwordInput.focus();
      } else if (e.target === passwordInput && passwordInput.value) {
        form.dispatchEvent(new Event('submit'));
      }
    }
  });

  return section;
}