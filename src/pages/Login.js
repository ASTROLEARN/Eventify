import { auth } from '../config/supabase.js';
import { AuthState } from '../utils/authState.js';

export function Login() {
  const section = document.createElement('main');
  section.className = 'content-section page-enter';
  section.innerHTML = `
    <div class="auth-container">
      <!-- Background decoration -->
      <div class="auth-background">
        <div class="auth-shapes">
          <div class="auth-shape auth-shape-1"></div>
          <div class="auth-shape auth-shape-2"></div>
          <div class="auth-shape auth-shape-3"></div>
        </div>
      </div>
      
      <div class="auth-card animate-on-scroll" role="main" aria-labelledby="login-title">
        <div class="auth-header">
          <div class="auth-brand">
            <div class="brand-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 2v11h3v9l7-12h-4L17 2H7z"/>
              </svg>
            </div>
            <h1 id="login-title" class="auth-title">Welcome Back to Eventify</h1>
          </div>
          <p class="auth-subtitle">Sign in to manage your events and connect with vendors</p>
        </div>
        
        <form class="auth-form" id="login-form" novalidate>
          <!-- Email Field -->
          <div class="form-group">
            <label for="email" class="form-label">
              Email Address
              <span class="required" aria-label="required">*</span>
            </label>
            <div class="input-wrapper">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-input" 
                placeholder="your@email.com"
                required
                autocomplete="email"
                aria-describedby="email-error"
                spellcheck="false"
                data-testid="email-input"
              />
              <div class="input-status" id="email-status" aria-hidden="true"></div>
            </div>
            <div class="form-error" id="email-error" role="alert" aria-live="polite"></div>
            <div class="form-success" id="email-success" aria-live="polite"></div>
          </div>
          
          <!-- Password Field -->
          <div class="form-group">
            <label for="password" class="form-label">
              Password
              <span class="required" aria-label="required">*</span>
            </label>
            <div class="input-wrapper">
              <div class="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-input" 
                placeholder="Enter your password"
                required
                autocomplete="current-password"
                aria-describedby="password-error password-strength"
                data-testid="password-input"
              />
              <button type="button" class="password-toggle" id="toggle-password" aria-label="Toggle password visibility">
                <svg class="password-show" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg class="password-hide" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
            
            <!-- Password Strength Indicator -->
            <div class="password-strength" id="password-strength" aria-label="Password strength indicator">
              <div class="strength-bars">
                <div class="strength-bar" data-strength="1"></div>
                <div class="strength-bar" data-strength="2"></div>
                <div class="strength-bar" data-strength="3"></div>
                <div class="strength-bar" data-strength="4"></div>
              </div>
              <span class="strength-text" id="strength-text">Password strength</span>
            </div>
            
            <div class="form-error" id="password-error" role="alert" aria-live="polite"></div>
          </div>
          
          <!-- Form Options -->
          <div class="form-options">
            <label class="checkbox-wrapper">
              <input type="checkbox" id="remember-me" name="remember" class="checkbox-input">
              <span class="checkbox-custom" aria-hidden="true">
                <svg class="checkbox-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
              </span>
              <span class="checkbox-label">Keep me signed in</span>
            </label>
            <a href="#forgot-password" class="forgot-password-link">Forgot your password?</a>
          </div>
          
          <!-- Submit Button -->
          <button type="submit" class="primary-button auth-button" id="login-button" aria-describedby="login-button-help">
            <span class="button-content">
              <span class="button-text">Sign In</span>
              <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </span>
            <div class="button-loading" style="display: none;">
              <div class="loading-dots">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
              </div>
            </div>
          </button>
          <div id="login-button-help" class="sr-only">Press Enter or click to sign in to your account</div>
          
          <!-- Divider -->
          <div class="form-divider" role="separator" aria-label="or">
            <span>or</span>
          </div>
          
          <!-- Social Login -->
          <div class="social-login">
            <button type="button" class="social-button google-button" id="google-login" aria-label="Sign in with Google">
              <svg class="social-icon" width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="social-text">Continue with Google</span>
            </button>
            
            <!-- Additional Social Options -->
            <div class="social-grid">
              <button type="button" class="social-button-mini apple-button" aria-label="Sign in with Apple" title="Sign in with Apple">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
                  <path d="M15.53 3.83c.893-1.09 1.477-2.602 1.315-4.11-1.274.052-2.82.847-3.739 1.91-.831.952-1.56 2.471-1.364 3.927 1.44.111 2.91-.717 3.788-1.727z"/>
                </svg>
              </button>
              
              <button type="button" class="social-button-mini facebook-button" aria-label="Sign in with Facebook" title="Sign in with Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              
              <button type="button" class="social-button-mini linkedin-button" aria-label="Sign in with LinkedIn" title="Sign in with LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Auth Footer -->
          <div class="auth-footer">
            <p>New to Eventify? <a href="#register" class="auth-link">Create your account</a></p>
            <div class="auth-help">
              <a href="#help" class="help-link">Need help?</a>
              <span class="divider">•</span>
              <a href="#privacy" class="help-link">Privacy</a>
              <span class="divider">•</span>
              <a href="#terms" class="help-link">Terms</a>
            </div>
          </div>
        </form>
        
        <!-- Success State -->
        <div class="auth-success" id="auth-success" style="display: none;" role="alert" aria-live="polite">
          <div class="success-animation">
            <div class="success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
          </div>
          <h3>Welcome back!</h3>
          <p>You've been successfully signed in. Redirecting to your dashboard...</p>
        </div>
        
        <!-- Loading State -->
        <div class="auth-loading" id="auth-loading" style="display: none;" role="alert" aria-live="polite">
          <div class="loading-animation">
            <div class="loading-pulse"></div>
            <div class="loading-spinner"></div>
          </div>
          <p>Signing you in securely...</p>
        </div>
      </div>
      
      <!-- Toast Notifications -->
      <div class="toast-container" id="toast-container" aria-live="polite"></div>
    </div>
  `;

  // Enhanced authentication styles with 2025 design patterns
  const style = document.createElement('style');
  style.textContent = `
    /* Modern Auth Container with Glassmorphism */
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      position: relative;
      background: linear-gradient(135deg, 
        rgba(248, 113, 113, 0.08) 0%,
        rgba(251, 191, 36, 0.05) 50%,
        rgba(157, 23, 77, 0.03) 100%
      );
      overflow: hidden;
    }
    
    /* Animated Background Shapes */
    .auth-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
    }
    
    .auth-shapes {
      position: relative;
      width: 100%;
      height: 100%;
    }
    
    .auth-shape {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(45deg, var(--brand), var(--accent-2));
      opacity: 0.1;
      animation: floatShape 20s ease-in-out infinite;
    }
    
    .auth-shape-1 {
      width: 300px;
      height: 300px;
      top: -150px;
      right: -150px;
      animation-delay: 0s;
    }
    
    .auth-shape-2 {
      width: 200px;
      height: 200px;
      bottom: -100px;
      left: -100px;
      animation-delay: 7s;
    }
    
    .auth-shape-3 {
      width: 150px;
      height: 150px;
      top: 50%;
      left: 10%;
      animation-delay: 14s;
    }
    
    @keyframes floatShape {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-30px) rotate(120deg); }
      66% { transform: translateY(20px) rotate(240deg); }
    }
    
    /* Enhanced Auth Card with Glassmorphism */
    .auth-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(248, 113, 113, 0.2);
      border-radius: 24px;
      padding: 48px 40px;
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      width: 100%;
      max-width: 480px;
      position: relative;
      z-index: 1;
      transform: translateY(0);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    :root[data-theme="dark"] .auth-card {
      background: rgba(26, 34, 51, 0.95);
      border: 1px solid rgba(255, 107, 107, 0.3);
    }
    
    .auth-card:hover {
      transform: translateY(-8px);
      box-shadow: 
        0 35px 60px -12px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .auth-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--brand), var(--accent));
      border-radius: 24px 24px 0 0;
    }
    
    /* Enhanced Auth Header */
    .auth-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .auth-brand {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .brand-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--brand), var(--accent-2));
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 8px 25px rgba(248, 113, 113, 0.3);
      transform: rotate(-5deg);
      transition: transform 0.3s ease;
    }
    
    .brand-icon:hover {
      transform: rotate(0deg) scale(1.05);
    }
    
    .auth-title {
      font-size: clamp(24px, 5vw, 32px);
      font-weight: 700;
      color: var(--ink);
      margin: 0;
      line-height: 1.2;
      background: linear-gradient(135deg, var(--ink), var(--brand));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .auth-subtitle {
      color: var(--muted);
      margin: 0;
      font-size: 16px;
      line-height: 1.5;
      max-width: 360px;
    }
    
    /* Enhanced Form Styling */
    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .form-group {
      position: relative;
    }
    
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--ink);
      font-size: 14px;
      transition: color 0.2s ease;
    }
    
    .required {
      color: var(--brand);
      margin-left: 4px;
    }
    
    /* Enhanced Input Styling */
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .input-icon {
      position: absolute;
      left: 16px;
      z-index: 2;
      color: var(--muted);
      transition: all 0.2s ease;
      pointer-events: none;
    }
    
    .form-input {
      width: 100%;
      padding: 16px 16px 16px 52px;
      border: 2px solid var(--accent-2);
      border-radius: 16px;
      font-size: 16px;
      background: rgba(255, 255, 255, 0.8);
      color: var(--ink);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-sizing: border-box;
      backdrop-filter: blur(10px);
    }
    
    :root[data-theme="dark"] .form-input {
      background: rgba(26, 34, 51, 0.8);
      border-color: rgba(255, 107, 107, 0.2);
    }
    
    .form-input:focus {
      outline: none;
      border-color: var(--brand);
      background: rgba(255, 255, 255, 1);
      box-shadow: 
        0 0 0 4px rgba(248, 113, 113, 0.1),
        0 8px 25px rgba(248, 113, 113, 0.15);
      transform: translateY(-2px);
    }
    
    :root[data-theme="dark"] .form-input:focus {
      background: rgba(26, 34, 51, 1);
      box-shadow: 
        0 0 0 4px rgba(255, 107, 107, 0.2),
        0 8px 25px rgba(255, 107, 107, 0.25);
    }
    
    .form-input:focus + .input-icon {
      color: var(--brand);
      transform: scale(1.1);
    }
    
    .form-input::placeholder {
      color: var(--muted);
      opacity: 0.7;
    }
    
    /* Input Status Indicators */
    .input-status {
      position: absolute;
      right: 16px;
      z-index: 2;
      opacity: 0;
      transition: all 0.2s ease;
    }
    
    .input-wrapper.valid .input-status {
      opacity: 1;
      color: #10b981;
    }
    
    .input-wrapper.error .input-status {
      opacity: 1;
      color: #ef4444;
    }
    
    .input-wrapper.valid .form-input {
      border-color: #10b981;
      background: rgba(240, 253, 244, 0.8);
    }
    
    .input-wrapper.error .form-input {
      border-color: #ef4444;
      background: rgba(254, 242, 242, 0.8);
    }
    
    /* Password Toggle Button */
    .password-toggle {
      position: absolute;
      right: 16px;
      z-index: 2;
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .password-toggle:hover {
      color: var(--brand);
      background: rgba(248, 113, 113, 0.1);
      transform: scale(1.05);
    }
    
    .password-toggle:focus {
      outline: 2px solid var(--brand);
      outline-offset: 2px;
    }
    
    /* Password Strength Indicator */
    .password-strength {
      margin-top: 12px;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    }
    
    .password-strength.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .strength-bars {
      display: flex;
      gap: 4px;
      margin-bottom: 8px;
    }
    
    .strength-bar {
      height: 4px;
      flex: 1;
      background: var(--accent-2);
      border-radius: 2px;
      transition: all 0.3s ease;
    }
    
    .strength-bar.active {
      background: var(--brand);
    }
    
    .strength-bar.active[data-strength="1"] { background: #ef4444; }
    .strength-bar.active[data-strength="2"] { background: #f59e0b; }
    .strength-bar.active[data-strength="3"] { background: #3b82f6; }
    .strength-bar.active[data-strength="4"] { background: #10b981; }
    
    .strength-text {
      font-size: 12px;
      color: var(--muted);
      font-weight: 500;
    }
    
    /* Error and Success Messages */
    .form-error {
      color: #ef4444;
      font-size: 14px;
      margin-top: 8px;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .form-error.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .form-success {
      color: #10b981;
      font-size: 14px;
      margin-top: 8px;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .form-success.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Enhanced Form Options */
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px 0;
      flex-wrap: wrap;
      gap: 12px;
    }
    
    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      font-size: 14px;
      color: var(--ink);
      transition: color 0.2s ease;
    }
    
    .checkbox-input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
    
    .checkbox-custom {
      width: 20px;
      height: 20px;
      border: 2px solid var(--accent-2);
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      position: relative;
    }
    
    .checkbox-icon {
      opacity: 0;
      transform: scale(0);
      transition: all 0.2s ease;
      color: white;
    }
    
    .checkbox-input:checked + .checkbox-custom {
      background: var(--brand);
      border-color: var(--brand);
    }
    
    .checkbox-input:checked + .checkbox-custom .checkbox-icon {
      opacity: 1;
      transform: scale(1);
    }
    
    .checkbox-wrapper:hover .checkbox-custom {
      border-color: var(--brand);
      transform: scale(1.05);
    }
    
    .forgot-password-link {
      color: var(--brand);
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    
    .forgot-password-link:hover {
      text-decoration: underline;
      transform: translateY(-1px);
    }
    
    /* Enhanced Primary Button */
    .primary-button {
      width: 100%;
      background: linear-gradient(135deg, var(--brand), var(--accent-2));
      color: white;
      border: none;
      padding: 18px 24px;
      border-radius: 16px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      min-height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 
        0 8px 25px rgba(248, 113, 113, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .primary-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }
    
    .primary-button:hover::before {
      left: 100%;
    }
    
    .primary-button:hover {
      transform: translateY(-3px);
      box-shadow: 
        0 12px 35px rgba(248, 113, 113, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    
    .primary-button:active {
      transform: translateY(-1px);
    }
    
    .primary-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: 
        0 4px 15px rgba(248, 113, 113, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    
    .button-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      transition: opacity 0.2s ease;
    }
    
    .button-icon {
      transition: transform 0.2s ease;
    }
    
    .primary-button:hover .button-icon {
      transform: translateX(4px);
    }
    
    .button-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .loading-dots {
      display: flex;
      gap: 4px;
    }
    
    .loading-dot {
      width: 6px;
      height: 6px;
      background: white;
      border-radius: 50%;
      animation: loadingDot 1.4s ease-in-out infinite both;
    }
    
    .loading-dot:nth-child(1) { animation-delay: -0.32s; }
    .loading-dot:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes loadingDot {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    
    /* Enhanced Divider */
    .form-divider {
      text-align: center;
      position: relative;
      margin: 32px 0;
      color: var(--muted);
      font-size: 14px;
      font-weight: 500;
    }
    
    .form-divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent-2), transparent);
    }
    
    .form-divider span {
      background: var(--card);
      padding: 0 20px;
      position: relative;
      z-index: 1;
    }
    
    /* Enhanced Social Login */
    .social-login {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .social-button {
      width: 100%;
      padding: 16px 20px;
      border: 2px solid var(--accent-2);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.9);
      color: var(--ink);
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);
    }
    
    :root[data-theme="dark"] .social-button {
      background: rgba(26, 34, 51, 0.9);
      border-color: rgba(255, 107, 107, 0.2);
    }
    
    .social-button:hover {
      border-color: var(--brand);
      background: rgba(255, 255, 255, 1);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    :root[data-theme="dark"] .social-button:hover {
      background: rgba(26, 34, 51, 1);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }
    
    .social-icon {
      flex-shrink: 0;
    }
    
    .social-text {
      font-weight: 500;
    }
    
    .social-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 8px;
    }
    
    .social-button-mini {
      aspect-ratio: 1;
      padding: 12px;
      border: 2px solid var(--accent-2);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.9);
      color: var(--muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
    }
    
    :root[data-theme="dark"] .social-button-mini {
      background: rgba(26, 34, 51, 0.9);
      border-color: rgba(255, 107, 107, 0.2);
    }
    
    .social-button-mini:hover {
      border-color: var(--brand);
      background: rgba(255, 255, 255, 1);
      transform: translateY(-2px) scale(1.05);
      color: var(--ink);
    }
    
    /* Auth Footer */
    .auth-footer {
      text-align: center;
      margin-top: 24px;
    }
    
    .auth-footer p {
      margin: 0 0 16px 0;
      color: var(--muted);
      font-size: 14px;
    }
    
    .auth-link {
      color: var(--brand);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    
    .auth-link:hover {
      text-decoration: underline;
      transform: translateY(-1px);
    }
    
    .auth-help {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 12px;
    }
    
    .help-link {
      color: var(--muted);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .help-link:hover {
      color: var(--brand);
    }
    
    .divider {
      color: var(--accent-2);
    }
    
    /* Enhanced Success State */
    .auth-success {
      text-align: center;
      padding: 40px 20px;
    }
    
    .success-animation {
      margin-bottom: 24px;
    }
    
    .success-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #10b981, #34d399);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      animation: successPulse 2s ease-in-out infinite;
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
    }
    
    @keyframes successPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .auth-success h3 {
      color: var(--ink);
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 700;
    }
    
    .auth-success p {
      color: var(--muted);
      margin: 0;
      font-size: 16px;
    }
    
    /* Enhanced Loading State */
    .auth-loading {
      text-align: center;
      padding: 40px 20px;
    }
    
    .loading-animation {
      position: relative;
      margin-bottom: 24px;
    }
    
    .loading-pulse {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, var(--brand), var(--accent-2));
      border-radius: 50%;
      margin: 0 auto;
      animation: loadingPulse 2s ease-in-out infinite;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top: 3px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes loadingPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .auth-loading p {
      color: var(--muted);
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }
    
    /* Toast Notifications */
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    }
    
    .toast {
      min-width: 300px;
      max-width: 400px;
      padding: 16px 20px;
      border-radius: 12px;
      color: white;
      font-weight: 500;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      transform: translateX(120%);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: auto;
      backdrop-filter: blur(10px);
    }
    
    .toast.show {
      transform: translateX(0);
    }
    
    .toast-success {
      background: linear-gradient(135deg, #10b981, #34d399);
    }
    
    .toast-error {
      background: linear-gradient(135deg, #ef4444, #f87171);
    }
    
    .toast-info {
      background: linear-gradient(135deg, #3b82f6, #60a5fa);
    }
    
    /* Screen Reader Only */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    /* Enhanced Responsive Design */
    @media (max-width: 768px) {
      .auth-container {
        padding: 16px;
        min-height: 100vh;
      }
      
      .auth-card {
        padding: 32px 24px;
        margin: 0;
        border-radius: 20px;
        max-width: 100%;
        min-height: auto;
      }
      
      .auth-title {
        font-size: 24px;
      }
      
      .auth-subtitle {
        font-size: 14px;
      }
      
      .form-input {
        padding: 14px 14px 14px 48px;
        font-size: 16px;
      }
      
      .primary-button {
        padding: 16px 20px;
        min-height: 52px;
      }
      
      .social-button {
        padding: 14px 16px;
      }
      
      .social-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }
      
      .social-button-mini {
        padding: 10px;
      }
      
      .form-options {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .toast-container {
        left: 16px;
        right: 16px;
        top: 16px;
      }
      
      .toast {
        min-width: auto;
        max-width: none;
        transform: translateY(-120%);
      }
      
      .toast.show {
        transform: translateY(0);
      }
    }
    
    @media (max-width: 480px) {
      .auth-card {
        padding: 24px 20px;
        border-radius: 16px;
      }
      
      .brand-icon {
        width: 56px;
        height: 56px;
      }
      
      .auth-title {
        font-size: 22px;
      }
      
      .form-input {
        padding: 12px 12px 12px 44px;
      }
      
      .primary-button {
        min-height: 48px;
        padding: 14px 18px;
      }
    }
    
    /* Accessibility Enhancements */
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    
    @media (prefers-contrast: high) {
      .form-input {
        border-width: 3px;
      }
      
      .primary-button {
        border: 2px solid rgba(255, 255, 255, 0.5);
      }
      
      .social-button {
        border-width: 3px;
      }
    }
    
    /* Focus Management */
    .form-input:focus,
    .primary-button:focus,
    .social-button:focus,
    .social-button-mini:focus,
    .auth-link:focus,
    .help-link:focus,
    .forgot-password-link:focus {
      outline: 2px solid var(--brand);
      outline-offset: 2px;
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

  // Enhanced JavaScript functionality
  const form = section.querySelector('#login-form');
  const loadingDiv = section.querySelector('#auth-loading');
  const successDiv = section.querySelector('#auth-success');
  const emailInput = section.querySelector('#email');
  const passwordInput = section.querySelector('#password');
  const emailError = section.querySelector('#email-error');
  const passwordError = section.querySelector('#password-error');
  const emailSuccess = section.querySelector('#email-success');
  const emailWrapper = emailInput.closest('.input-wrapper');
  const passwordWrapper = passwordInput.closest('.input-wrapper');
  const passwordStrength = section.querySelector('#password-strength');
  const strengthBars = section.querySelectorAll('.strength-bar');
  const strengthText = section.querySelector('#strength-text');
  const loginButton = section.querySelector('#login-button');
  const buttonContent = loginButton.querySelector('.button-content');
  const buttonLoading = loginButton.querySelector('.button-loading');
  const toastContainer = section.querySelector('#toast-container');

  // Enhanced Password Strength Calculator
  function calculatePasswordStrength(password) {
    if (!password) return { score: 0, feedback: 'Enter a password' };
    
    let score = 0;
    const feedback = [];
    
    // Length check
    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');
    
    // Complexity checks
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Include lowercase letters');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Include uppercase letters');
    
    if (/\d/.test(password)) score += 1;
    else feedback.push('Include numbers');
    
    if (/[^a-zA-Z\d]/.test(password)) score += 1;
    else feedback.push('Include special characters');
    
    // Additional strength factors
    if (password.length >= 12) score += 1;
    if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters
    if (/123|abc|qwe|password|admin/i.test(password)) score -= 2; // Common patterns
    
    score = Math.max(0, Math.min(4, score));
    
    const strengthLevels = [
      { text: 'Very weak', color: '#ef4444' },
      { text: 'Weak', color: '#f59e0b' },
      { text: 'Fair', color: '#3b82f6' },
      { text: 'Good', color: '#10b981' },
      { text: 'Strong', color: '#10b981' }
    ];
    
    return {
      score,
      level: strengthLevels[score],
      feedback: feedback.slice(0, 3) // Show max 3 suggestions
    };
  }

  // Enhanced Email Validation
  function validateEmail(email) {
    if (!email) return { valid: false, message: 'Email is required' };
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'Please enter a valid email address' };
    }
    
    return { valid: true, message: 'Email looks good!' };
  }

  // Enhanced Password Validation
  function validatePassword(password) {
    if (!password) return { valid: false, message: 'Password is required' };
    if (password.length < 6) return { valid: false, message: 'Password must be at least 6 characters' };
    return { valid: true, message: '' };
  }

  // Toast Notification System
  function showToast(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    
    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // Enhanced Form Validation with Visual Feedback
  function updateFieldValidation(input, wrapper, errorElement, successElement, validation) {
    const { valid, message } = validation;
    
    // Clear previous states
    wrapper.classList.remove('valid', 'error');
    errorElement.classList.remove('visible');
    if (successElement) successElement.classList.remove('visible');
    
    if (input.value.trim()) {
      if (valid) {
        wrapper.classList.add('valid');
        if (successElement) {
          successElement.textContent = message;
          successElement.classList.add('visible');
        }
        // Update status icon
        const statusIcon = wrapper.querySelector('.input-status');
        if (statusIcon) {
          statusIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>';
        }
      } else {
        wrapper.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
        // Update status icon
        const statusIcon = wrapper.querySelector('.input-status');
        if (statusIcon) {
          statusIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
        }
      }
    }
    
    return valid;
  }

  // Enhanced Password Strength Display
  function updatePasswordStrength(password) {
    const strength = calculatePasswordStrength(password);
    
    if (password.length > 0) {
      passwordStrength.classList.add('visible');
      
      // Update strength bars
      strengthBars.forEach((bar, index) => {
        bar.classList.toggle('active', index < strength.score);
      });
      
      // Update strength text
      strengthText.textContent = strength.level.text;
      strengthText.style.color = strength.level.color;
      
    } else {
      passwordStrength.classList.remove('visible');
    }
  }

  // Enhanced Password Toggle
  const togglePassword = section.querySelector('#toggle-password');
  const passwordShow = togglePassword.querySelector('.password-show');
  const passwordHide = togglePassword.querySelector('.password-hide');
  
  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    passwordShow.style.display = isPassword ? 'none' : 'block';
    passwordHide.style.display = isPassword ? 'block' : 'none';
    
    // Update aria-label
    togglePassword.setAttribute('aria-label', 
      isPassword ? 'Hide password' : 'Show password'
    );
    
    // Brief focus animation
    togglePassword.style.transform = 'scale(1.1)';
    setTimeout(() => {
      togglePassword.style.transform = '';
    }, 150);
  });

  // Real-time Email Validation
  let emailTimeout;
  emailInput.addEventListener('input', () => {
    clearTimeout(emailTimeout);
    emailTimeout = setTimeout(() => {
      const validation = validateEmail(emailInput.value.trim());
      updateFieldValidation(emailInput, emailWrapper, emailError, emailSuccess, validation);
    }, 300);
  });

  // Real-time Password Validation and Strength
  let passwordTimeout;
  passwordInput.addEventListener('input', () => {
    clearTimeout(passwordTimeout);
    const password = passwordInput.value;
    
    // Update strength indicator
    updatePasswordStrength(password);
    
    // Validate password
    passwordTimeout = setTimeout(() => {
      const validation = validatePassword(password);
      updateFieldValidation(passwordInput, passwordWrapper, passwordError, null, validation);
    }, 300);
  });

  // Enhanced Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailValidation = validateEmail(emailInput.value.trim());
    const passwordValidation = validatePassword(passwordInput.value);
    
    const emailValid = updateFieldValidation(emailInput, emailWrapper, emailError, emailSuccess, emailValidation);
    const passwordValid = updateFieldValidation(passwordInput, passwordWrapper, passwordError, null, passwordValidation);
    
    if (!emailValid || !passwordValid) {
      showToast('Please fix the errors above', 'error');
      // Focus first invalid field
      const firstInvalid = section.querySelector('.input-wrapper.error input');
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = section.querySelector('#remember-me').checked;
    
    try {
      // Enhanced loading state
      setLoadingState(true);
      showToast('Signing you in...', 'info', 2000);
      
      // Attempt authentication
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        throw error;
      }
      
      // Success handling
      setLoadingState(false);
      showSuccessState();
      
      // Update auth state
      AuthState.setUser(data.user);
      
      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('eventify_remember_email', email);
      } else {
        localStorage.removeItem('eventify_remember_email');
      }
      
      showToast('Welcome back! Redirecting...', 'success');
      
      // Redirect with smooth transition
      setTimeout(() => {
        window.location.hash = '#dashboard';
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      setLoadingState(false);
      handleAuthError(error);
    }
  });

  // Enhanced Loading State Management
  function setLoadingState(loading) {
    loginButton.disabled = loading;
    
    if (loading) {
      buttonContent.style.opacity = '0';
      buttonLoading.style.display = 'flex';
      loginButton.style.cursor = 'not-allowed';
    } else {
      buttonContent.style.opacity = '1';
      buttonLoading.style.display = 'none';
      loginButton.style.cursor = 'pointer';
    }
  }

  // Enhanced Success State
  function showSuccessState() {
    form.style.display = 'none';
    successDiv.style.display = 'block';
    
    // Trigger success animation
    const successIcon = successDiv.querySelector('.success-icon svg');
    if (successIcon) {
      successIcon.style.strokeDasharray = '100';
      successIcon.style.strokeDashoffset = '100';
      successIcon.style.animation = 'drawCheck 0.8s ease-in-out forwards';
    }
  }

  // Enhanced Error Handling
  function handleAuthError(error) {
    let userMessage = 'An error occurred during sign in';
    let fieldToFocus = null;
    
    if (error.message) {
      if (error.message.includes('Invalid login credentials') || 
          error.message.includes('Invalid email or password')) {
        userMessage = 'Invalid email or password. Please try again.';
        fieldToFocus = passwordInput;
        updateFieldValidation(passwordInput, passwordWrapper, passwordError, null, 
          { valid: false, message: 'Invalid email or password' });
      } else if (error.message.includes('Email not confirmed')) {
        userMessage = 'Please check your email and click the confirmation link.';
        fieldToFocus = emailInput;
      } else if (error.message.includes('Too many requests')) {
        userMessage = 'Too many attempts. Please wait a moment and try again.';
      } else if (error.message.includes('Network')) {
        userMessage = 'Network error. Please check your connection and try again.';
      } else {
        userMessage = error.message;
      }
    }
    
    showToast(userMessage, 'error', 5000);
    
    // Focus relevant field
    if (fieldToFocus) {
      setTimeout(() => {
        fieldToFocus.focus();
        fieldToFocus.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  // Enhanced Google Authentication
  section.querySelector('#google-login').addEventListener('click', async () => {
    try {
      showToast('Redirecting to Google...', 'info');
      const { data, error } = await auth.signInWithGoogle();
      if (error) throw error;
    } catch (error) {
      console.error('Google login error:', error);
      showToast('Google sign in failed. Please try again.', 'error');
    }
  });

  // Additional Social Login Handlers (placeholder functionality)
  section.querySelector('.apple-button')?.addEventListener('click', () => {
    showToast('Apple Sign In coming soon!', 'info');
  });
  
  section.querySelector('.facebook-button')?.addEventListener('click', () => {
    showToast('Facebook Sign In coming soon!', 'info');
  });
  
  section.querySelector('.linkedin-button')?.addEventListener('click', () => {
    showToast('LinkedIn Sign In coming soon!', 'info');
  });

  // Smart Email Suggestions (restore remembered email)
  const rememberedEmail = localStorage.getItem('eventify_remember_email');
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    section.querySelector('#remember-me').checked = true;
    // Trigger validation
    const validation = validateEmail(rememberedEmail);
    updateFieldValidation(emailInput, emailWrapper, emailError, emailSuccess, validation);
  }

  // Enhanced Accessibility Features
  function setupAccessibility() {
    // Add live region announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    section.appendChild(liveRegion);
  }

  // Keyboard Navigation Enhancements
  function setupKeyboardNavigation() {
    // Enhanced form navigation
    const inputs = section.querySelectorAll('input, button');
    
    inputs.forEach((input, index) => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.type !== 'submit') {
          e.preventDefault();
          const nextInput = inputs[index + 1];
          if (nextInput) {
            nextInput.focus();
          }
        }
      });
    });
    
    // Escape key handling
    section.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const activeToast = toastContainer.querySelector('.toast.show');
        if (activeToast) {
          activeToast.classList.remove('show');
        }
      }
    });
  }

  // Enhanced Animation Observer
  const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Stagger child animations
        const children = entry.target.querySelectorAll('.form-group, .social-button, .auth-footer > *');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Initialize enhanced features
  function initializeEnhancements() {
    setupAccessibility();
    setupKeyboardNavigation();
    
    // Add stagger animation styles
    const children = section.querySelectorAll('.form-group, .social-button, .auth-footer > *');
    children.forEach(child => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(20px)';
      child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Observe auth card for enhanced animations
    section.querySelectorAll('.animate-on-scroll').forEach(el => {
      enhancedObserver.observe(el);
    });
  }

  // Initialize all enhancements
  initializeEnhancements();

  return section;
}