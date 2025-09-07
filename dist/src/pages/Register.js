import { auth } from '../config/supabase.js';
import { AuthState } from '../utils/authState.js';

export function Register() {
  const section = document.createElement('main');
  section.className = 'content-section page-enter';
  section.innerHTML = `
    <div class="auth-container">
      <div class="auth-card animate-on-scroll">
        <div class="auth-header">
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Join Eventify and start planning amazing events</p>
        </div>
        
        <form class="auth-form" id="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="first-name" class="form-label">First Name</label>
              <input 
                type="text" 
                id="first-name" 
                name="firstName" 
                class="form-input" 
                placeholder="Enter your first name"
                required
                autocomplete="given-name"
              />
              <div class="form-error" id="first-name-error"></div>
            </div>
            
            <div class="form-group">
              <label for="last-name" class="form-label">Last Name</label>
              <input 
                type="text" 
                id="last-name" 
                name="lastName" 
                class="form-input" 
                placeholder="Enter your last name"
                required
                autocomplete="family-name"
              />
              <div class="form-error" id="last-name-error"></div>
            </div>
          </div>
          
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
                placeholder="Create a strong password"
                required
                autocomplete="new-password"
              />
              <button type="button" class="password-toggle" id="toggle-password">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>
            <div class="password-strength" id="password-strength">
              <div class="strength-bar">
                <div class="strength-fill" id="strength-fill"></div>
              </div>
              <div class="strength-text" id="strength-text">Password strength</div>
            </div>
            <div class="form-error" id="password-error"></div>
          </div>
          
          <div class="form-group">
            <label for="confirm-password" class="form-label">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirmPassword" 
              class="form-input" 
              placeholder="Confirm your password"
              required
              autocomplete="new-password"
            />
            <div class="form-error" id="confirm-password-error"></div>
          </div>
          
          <div class="form-group">
            <label for="user-type" class="form-label">I want to</label>
            <select id="user-type" name="userType" class="form-input" required>
              <option value="">Select your primary goal</option>
              <option value="customer">Plan and book events</option>
              <option value="vendor">Offer event services</option>
              <option value="both">Both plan events and offer services</option>
            </select>
            <div class="form-error" id="user-type-error"></div>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="terms" name="terms" required>
              <span class="checkmark"></span>
              I agree to the <a href="#terms" class="auth-link">Terms of Service</a> and <a href="#privacy" class="auth-link">Privacy Policy</a>
            </label>
            <div class="form-error" id="terms-error"></div>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="newsletter" name="newsletter">
              <span class="checkmark"></span>
              Send me helpful tips and updates about event planning
            </label>
          </div>
          
          <button type="submit" class="primary-button auth-button" id="register-button">
            <span class="button-text">Create Account</span>
            <svg class="button-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 17l5-5-5-5v10z"/>
            </svg>
          </button>
          
          <div class="form-divider">
            <span>or</span>
          </div>
          
          <button type="button" class="google-auth-button" id="google-register">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          <div class="auth-footer">
            <p>Already have an account? <a href="#login" class="auth-link">Sign in here</a></p>
          </div>
        </form>
        
        <div class="auth-success" id="auth-success" style="display: none;">
          <div class="success-icon">✓</div>
          <h3>Account Created!</h3>
          <p>Please check your email to verify your account.</p>
        </div>
        
        <div class="auth-loading" id="auth-loading" style="display: none;">
          <div class="loading-spinner"></div>
          <p>Creating your account...</p>
        </div>
      </div>
    </div>
  `;

  // Add additional styles for registration
  const style = document.createElement('style');
  style.textContent = `
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    
    .password-strength {
      margin-top: 8px;
    }
    
    .strength-bar {
      height: 4px;
      background: var(--accent-2);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 4px;
    }
    
    .strength-fill {
      height: 100%;
      width: 0%;
      background: #ef4444;
      transition: all 0.3s ease;
      border-radius: 2px;
    }
    
    .strength-fill.weak { background: #ef4444; }
    .strength-fill.fair { background: #f59e0b; }
    .strength-fill.good { background: #10b981; }
    .strength-fill.strong { background: #059669; }
    
    .strength-text {
      font-size: 12px;
      color: var(--muted);
    }
    
    .checkmark {
      width: 16px;
      height: 16px;
      border: 2px solid var(--accent-2);
      border-radius: 3px;
      margin-right: 8px;
      display: inline-block;
      position: relative;
      flex-shrink: 0;
    }
    
    .checkbox-label input[type="checkbox"]:checked + .checkmark {
      background: var(--brand);
      border-color: var(--brand);
    }
    
    .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
      content: '✓';
      position: absolute;
      color: white;
      font-size: 12px;
      top: -2px;
      left: 2px;
    }
    
    .checkbox-label input[type="checkbox"] {
      display: none;
    }
    
    @media (max-width: 480px) {
      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Form functionality
  const form = section.querySelector('#register-form');
  const loadingDiv = section.querySelector('#auth-loading');
  const successDiv = section.querySelector('#auth-success');
  const passwordInput = section.querySelector('#password');
  const strengthFill = section.querySelector('#strength-fill');
  const strengthText = section.querySelector('#strength-text');

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) score++;
    else feedback.push('At least 8 characters');
    
    if (/[a-z]/.test(password)) score++;
    else feedback.push('Lowercase letter');
    
    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Uppercase letter');
    
    if (/[0-9]/.test(password)) score++;
    else feedback.push('Number');
    
    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push('Special character');
    
    const levels = ['weak', 'weak', 'fair', 'good', 'strong'];
    const level = levels[score];
    const percentage = (score / 5) * 100;
    
    return { level, percentage, feedback, score };
  };

  // Password strength indicator
  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    if (password) {
      const strength = checkPasswordStrength(password);
      strengthFill.style.width = strength.percentage + '%';
      strengthFill.className = `strength-fill ${strength.level}`;
      
      if (strength.score === 5) {
        strengthText.textContent = 'Strong password';
      } else {
        strengthText.textContent = `Add: ${strength.feedback.join(', ')}`;
      }
    } else {
      strengthFill.style.width = '0%';
      strengthText.textContent = 'Password strength';
    }
  });

  // Password toggle
  section.querySelector('#toggle-password').addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
  });

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const formData = new FormData(form);
    
    // Clear previous errors
    section.querySelectorAll('.form-error').forEach(error => error.textContent = '');
    
    // First name validation
    const firstName = formData.get('firstName').trim();
    if (!firstName) {
      section.querySelector('#first-name-error').textContent = 'First name is required';
      isValid = false;
    }
    
    // Last name validation
    const lastName = formData.get('lastName').trim();
    if (!lastName) {
      section.querySelector('#last-name-error').textContent = 'Last name is required';
      isValid = false;
    }
    
    // Email validation
    const email = formData.get('email').trim();
    if (!email) {
      section.querySelector('#email-error').textContent = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      section.querySelector('#email-error').textContent = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Password validation
    const password = formData.get('password');
    const strength = checkPasswordStrength(password);
    if (!password) {
      section.querySelector('#password-error').textContent = 'Password is required';
      isValid = false;
    } else if (strength.score < 3) {
      section.querySelector('#password-error').textContent = 'Please choose a stronger password';
      isValid = false;
    }
    
    // Confirm password validation
    const confirmPassword = formData.get('confirmPassword');
    if (!confirmPassword) {
      section.querySelector('#confirm-password-error').textContent = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      section.querySelector('#confirm-password-error').textContent = 'Passwords do not match';
      isValid = false;
    }
    
    // User type validation
    const userType = formData.get('userType');
    if (!userType) {
      section.querySelector('#user-type-error').textContent = 'Please select your primary goal';
      isValid = false;
    }
    
    // Terms validation
    const terms = formData.get('terms');
    if (!terms) {
      section.querySelector('#terms-error').textContent = 'You must agree to the terms to continue';
      isValid = false;
    }
    
    return isValid;
  };

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const formData = new FormData(form);
    const userData = {
      first_name: formData.get('firstName').trim(),
      last_name: formData.get('lastName').trim(),
      user_type: formData.get('userType'),
      marketing_emails: formData.get('newsletter') === 'on'
    };
    
    try {
      // Show loading state
      form.style.display = 'none';
      loadingDiv.style.display = 'block';
      
      const { data, error } = await auth.signUp(
        formData.get('email').trim(),
        formData.get('password'),
        userData
      );
      
      if (error) {
        throw error;
      }
      
      // Show success state
      loadingDiv.style.display = 'none';
      successDiv.style.display = 'block';
      
      // Note: User will need to verify email before they can sign in
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Show form again
      loadingDiv.style.display = 'none';
      form.style.display = 'block';
      
      // Show error message
      if (error.message.includes('already registered')) {
        section.querySelector('#email-error').textContent = 'An account with this email already exists';
      } else {
        section.querySelector('#email-error').textContent = error.message || 'An error occurred during registration';
      }
    }
  });

  // Google auth
  section.querySelector('#google-register').addEventListener('click', async () => {
    try {
      const { data, error } = await auth.signInWithGoogle();
      if (error) throw error;
      
      // Google auth will redirect, so no need to handle success here
    } catch (error) {
      console.error('Google registration error:', error);
      section.querySelector('#email-error').textContent = 'Google registration failed. Please try again.';
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