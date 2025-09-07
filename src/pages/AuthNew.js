import { navigate } from '../App.js';
import { auth, profiles } from '../config/supabase.js';
import { 
  createValidatedInput, 
  createPasswordMeter, 
  createLoadingState, 
  showToast, 
  handleFormSubmission 
} from '../utils/authHelpers.js';

// Enhanced authentication state management
class AuthState {
  constructor() {
    this.user = null;
    this.session = null;
    this.loading = true;
    this.callbacks = new Set();
    
    // Initialize auth state
    this.init();
  }
  
  async init() {
    try {
      // Get initial session
      const { data: { session } } = await auth.getCurrentSession();
      this.setSession(session);
      
      // Listen for auth changes
      auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session);
        this.setSession(session);
        
        if (event === 'SIGNED_IN') {
          await this.handleSignIn(session);
        } else if (event === 'SIGNED_OUT') {
          this.handleSignOut();
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      this.loading = false;
      this.notifyCallbacks();
    }
  }
  
  setSession(session) {
    this.session = session;
    this.user = session?.user || null;
    this.notifyCallbacks();
  }
  
  async handleSignIn(session) {
    if (session?.user) {
      // Check if profile exists, create if not
      const { data: profile, error } = await profiles.getProfile(session.user.id);
      
      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const profileData = {
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          avatar_url: session.user.user_metadata?.avatar_url,
          provider: session.user.app_metadata?.provider || 'email',
          created_at: new Date().toISOString()
        };
        
        await profiles.createProfile(session.user.id, profileData);
      }
      
      showToast('Welcome back!', 'success');
      navigate('/dashboard');
    }
  }
  
  handleSignOut() {
    showToast('You have been signed out', 'info');
    navigate('/auth');
  }
  
  subscribe(callback) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }
  
  notifyCallbacks() {
    this.callbacks.forEach(callback => callback(this));
  }
}

// Global auth state
const authState = new AuthState();

function createEl(tag, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}

// Enhanced Google Sign-In button
function GoogleSignInButton(onClickHandler) {
  const button = createEl('button', 'google-btn');
  button.type = 'button';
  button.innerHTML = `
    <div class="google-icon"></div>
    <span>Continue with Google</span>
  `;
  
  const loadingState = createLoadingState();
  
  button.addEventListener('click', async () => {
    try {
      loadingState.start([button]);
      await onClickHandler();
    } catch (error) {
      showToast(error.message || 'Google sign-in failed', 'error');
    } finally {
      loadingState.stop();
    }
  });
  
  return button;
}

// Enhanced login form
function LoginForm() {
  const container = createEl('div', 'auth-card');
  
  const header = createEl('header', 'auth-header');
  header.innerHTML = `
    <h3 class="auth-title">Welcome Back</h3>
    <p class="auth-tagline">Sign in to your account to continue</p>
  `;
  
  const form = createEl('form', 'auth-form');
  form.noValidate = true;
  
  // Create validated inputs
  const emailField = createValidatedInput({
    type: 'email',
    id: 'login-email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
    validation: { email: true }
  });
  
  const passwordField = createValidatedInput({
    type: 'password',
    id: 'login-password',
    label: 'Password',
    placeholder: 'Enter your password',
    required: true,
    showPasswordToggle: true
  });
  
  // Remember me checkbox
  const rememberContainer = createEl('div', 'checkbox-field');
  const rememberCheckbox = createEl('input');
  rememberCheckbox.type = 'checkbox';
  rememberCheckbox.id = 'remember-me';
  rememberCheckbox.checked = localStorage.getItem('rememberMe') === 'true';
  
  const rememberLabel = createEl('label');
  rememberLabel.setAttribute('for', 'remember-me');
  rememberLabel.textContent = 'Remember me';
  
  rememberContainer.append(rememberCheckbox, rememberLabel);
  
  // Submit button
  const submitButton = createEl('button', 'primary-button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Sign In';
  
  // Forgot password link
  const forgotLink = createEl('button', 'link-button');
  forgotLink.type = 'button';
  forgotLink.textContent = 'Forgot your password?';
  forgotLink.style.marginTop = '0.5rem';
  
  // Divider
  const divider = createEl('div', 'auth-divider');
  divider.innerHTML = '<span>or</span>';
  
  // Google sign-in
  const googleButton = GoogleSignInButton(async () => {
    const { error } = await auth.signInWithGoogle();
    if (error) {
      throw new Error(error.message);
    }
  });
  
  // Sign up link
  const signupLink = createEl('p', 'auth-link');
  signupLink.innerHTML = `Don't have an account? <button type="button" class="link-button">Sign up</button>`;
  
  form.append(
    emailField.container,
    passwordField.container,
    rememberContainer,
    submitButton,
    forgotLink,
    divider,
    googleButton,
    signupLink
  );
  
  const loadingState = createLoadingState();
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailValid = emailField.validate();
    const passwordValid = passwordField.validate();
    
    if (!emailValid || !passwordValid) {
      showToast('Please fix the errors above', 'error');
      return;
    }
    
    const formData = {
      email: emailField.getValue(),
      password: passwordField.getValue(),
      remember: rememberCheckbox.checked
    };
    
    const result = await handleFormSubmission(
      formData,
      async (data) => {
        // Save remember preference
        localStorage.setItem('rememberMe', data.remember.toString());
        
        return await auth.signIn(data.email, data.password);
      },
      loadingState
    );
    
    if (result.success) {
      showToast('Welcome back!', 'success');
      // Navigation is handled by auth state change
    }
  });
  
  // Forgot password handler
  forgotLink.addEventListener('click', async () => {
    const email = emailField.getValue();
    if (!email) {
      showToast('Please enter your email address first', 'warning');
      emailField.focus();
      return;
    }
    
    loadingState.start([forgotLink]);
    const { error } = await auth.resetPassword(email);
    loadingState.stop();
    
    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('Password reset email sent! Check your inbox.', 'success');
    }
  });
  
  // Sign up link handler
  signupLink.querySelector('.link-button').addEventListener('click', () => {
    showSignupForm();
  });
  
  container.append(header, form);
  return container;
}

// Enhanced signup form
function SignupForm() {
  const container = createEl('div', 'auth-card');
  
  const header = createEl('header', 'auth-header');
  header.innerHTML = `
    <h3 class="auth-title">Create Account</h3>
    <p class="auth-tagline">Join Eventify to connect with amazing vendors</p>
  `;
  
  const form = createEl('form', 'auth-form');
  form.noValidate = true;
  
  // Create validated inputs
  const nameField = createValidatedInput({
    type: 'text',
    id: 'signup-name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
    validation: { minLength: 2, maxLength: 255 }
  });
  
  const emailField = createValidatedInput({
    type: 'email',
    id: 'signup-email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
    validation: { email: true }
  });
  
  const passwordField = createValidatedInput({
    type: 'password',
    id: 'signup-password',
    label: 'Password',
    placeholder: 'Create a strong password',
    required: true,
    validation: { password: true },
    showPasswordToggle: true
  });
  
  // Password strength meter
  const passwordMeter = createPasswordMeter(passwordField.input);
  passwordField.container.appendChild(passwordMeter);
  
  const confirmPasswordField = createValidatedInput({
    type: 'password',
    id: 'signup-confirm-password',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    required: true,
    showPasswordToggle: true
  });
  
  // Custom validation for password confirmation
  const validatePasswordMatch = () => {
    const password = passwordField.getValue();
    const confirmPassword = confirmPasswordField.getValue();
    const errorContainer = confirmPasswordField.container.querySelector('.field-error');
    
    if (confirmPassword && password !== confirmPassword) {
      errorContainer.textContent = 'Passwords do not match';
      confirmPasswordField.container.classList.add('error');
      return false;
    } else {
      errorContainer.textContent = '';
      confirmPasswordField.container.classList.remove('error');
      return true;
    }
  };
  
  confirmPasswordField.input.addEventListener('blur', validatePasswordMatch);
  confirmPasswordField.input.addEventListener('input', validatePasswordMatch);
  passwordField.input.addEventListener('input', validatePasswordMatch);
  
  // Account type selection
  const accountTypeContainer = createEl('div', 'form-field');
  const accountTypeLabel = createEl('label', 'field-label');
  accountTypeLabel.textContent = 'Account Type';
  
  const radioContainer = createEl('div', 'radio-group');
  
  const seekerOption = createEl('label', 'radio-option');
  seekerOption.innerHTML = `
    <input type="radio" name="account-type" value="seeker" checked>
    <div class="radio-content">
      <strong>Event Planner</strong>
      <span>Find and book vendors for your events</span>
    </div>
  `;
  
  const vendorOption = createEl('label', 'radio-option');
  vendorOption.innerHTML = `
    <input type="radio" name="account-type" value="vendor">
    <div class="radio-content">
      <strong>Service Vendor</strong>
      <span>Offer your services to event planners</span>
    </div>
  `;
  
  radioContainer.append(seekerOption, vendorOption);
  accountTypeContainer.append(accountTypeLabel, radioContainer);
  
  // Terms and conditions
  const termsContainer = createEl('div', 'checkbox-field');
  const termsCheckbox = createEl('input');
  termsCheckbox.type = 'checkbox';
  termsCheckbox.id = 'terms-agreement';
  termsCheckbox.required = true;
  
  const termsLabel = createEl('label');
  termsLabel.setAttribute('for', 'terms-agreement');
  termsLabel.innerHTML = `I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>`;
  
  termsContainer.append(termsCheckbox, termsLabel);
  
  // Submit button
  const submitButton = createEl('button', 'primary-button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Create Account';
  
  // Divider
  const divider = createEl('div', 'auth-divider');
  divider.innerHTML = '<span>or</span>';
  
  // Google sign-in
  const googleButton = GoogleSignInButton(async () => {
    const { error } = await auth.signInWithGoogle();
    if (error) {
      throw new Error(error.message);
    }
  });
  
  // Login link
  const loginLink = createEl('p', 'auth-link');
  loginLink.innerHTML = `Already have an account? <button type="button" class="link-button">Sign in</button>`;
  
  form.append(
    nameField.container,
    emailField.container,
    passwordField.container,
    confirmPasswordField.container,
    accountTypeContainer,
    termsContainer,
    submitButton,
    divider,
    googleButton,
    loginLink
  );
  
  const loadingState = createLoadingState();
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const nameValid = nameField.validate();
    const emailValid = emailField.validate();
    const passwordValid = passwordField.validate();
    const confirmPasswordValid = validatePasswordMatch();
    const termsValid = termsCheckbox.checked;
    
    if (!termsValid) {
      showToast('Please agree to the Terms of Service and Privacy Policy', 'error');
      return;
    }
    
    if (!nameValid || !emailValid || !passwordValid || !confirmPasswordValid) {
      showToast('Please fix the errors above', 'error');
      return;
    }
    
    const accountType = form.querySelector('input[name="account-type"]:checked').value;
    
    const formData = {
      name: nameField.getValue(),
      email: emailField.getValue(),
      password: passwordField.getValue(),
      accountType
    };
    
    const result = await handleFormSubmission(
      formData,
      async (data) => {
        return await auth.signUp(data.email, data.password, {
          full_name: data.name,
          account_type: data.accountType
        });
      },
      loadingState
    );
    
    if (result.success) {
      showToast('Account created! Please check your email to verify your account.', 'success');
      // Navigation is handled by auth state change
    }
  });
  
  // Login link handler
  loginLink.querySelector('.link-button').addEventListener('click', () => {
    showLoginForm();
  });
  
  container.append(header, form);
  return container;
}

// Form switching functions
function showLoginForm() {
  const authContainer = document.querySelector('.auth-form-container');
  if (authContainer) {
    authContainer.innerHTML = '';
    authContainer.appendChild(LoginForm());
  }
}

function showSignupForm() {
  const authContainer = document.querySelector('.auth-form-container');
  if (authContainer) {
    authContainer.innerHTML = '';
    authContainer.appendChild(SignupForm());
  }
}

// Main Auth component
export function Auth() {
  const main = createEl('main', 'content-section');
  
  // Check if user is already authenticated
  if (authState.user && !authState.loading) {
    navigate('/dashboard');
    return main;
  }
  
  const section = createEl('section', 'auth-section');
  const container = createEl('div', 'auth-container');
  
  // Auth form container
  const formContainer = createEl('div', 'auth-form-container');
  
  // Start with login form by default
  formContainer.appendChild(LoginForm());
  
  // Illustration
  const illustration = createEl('div', 'auth-illustration');
  illustration.innerHTML = `
    <div class="illustration-card">
      <svg class="illustration-svg" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6"/>
            <stop offset="100%" stop-color="#1d4ed8"/>
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10b981"/>
            <stop offset="100%" stop-color="#059669"/>
          </linearGradient>
        </defs>
        
        <!-- Main illustration elements -->
        <rect x="50" y="50" width="300" height="200" rx="20" fill="url(#gradient1)" opacity="0.1"/>
        
        <!-- Event planning elements -->
        <circle cx="120" cy="120" r="25" fill="url(#gradient1)" opacity="0.8"/>
        <circle cx="200" cy="140" r="20" fill="url(#gradient2)" opacity="0.8"/>
        <circle cx="280" cy="115" r="22" fill="#f59e0b" opacity="0.8"/>
        
        <!-- Connection lines -->
        <line x1="145" y1="120" x2="180" y2="140" stroke="url(#gradient1)" stroke-width="3" opacity="0.6"/>
        <line x1="220" y1="140" x2="258" y2="115" stroke="url(#gradient2)" stroke-width="3" opacity="0.6"/>
        
        <!-- Text elements -->
        <text x="200" y="220" text-anchor="middle" font-family="system-ui" font-size="16" font-weight="600" fill="#374151">
          Connect. Plan. Celebrate.
        </text>
        <text x="200" y="240" text-anchor="middle" font-family="system-ui" font-size="12" fill="#6b7280">
          Join thousands of event planners and trusted vendors
        </text>
      </svg>
    </div>
  `;
  
  container.append(formContainer, illustration);
  section.appendChild(container);
  main.appendChild(section);
  
  return main;
}

// Auth state utilities for other parts of the app
export { authState };

// Enhanced styles (added to existing styles)
const additionalStyles = `
.auth-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  align-items: center;
}

.auth-form-container {
  max-width: 450px;
  width: 100%;
}

.radio-group {
  display: grid;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.radio-option {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-option:hover {
  border-color: #3b82f6;
  background-color: #f8fafc;
}

.radio-option input[type="radio"]:checked + .radio-content {
  color: #3b82f6;
}

.radio-option:has(input:checked) {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.radio-content {
  flex: 1;
}

.radio-content strong {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.radio-content span {
  font-size: 0.875rem;
  color: #6b7280;
}

.link-button {
  background: none;
  border: none;
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
}

.link-button:hover {
  color: #1d4ed8;
}

.auth-link {
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 1.5rem;
  margin-bottom: 0;
}

.illustration-card {
  text-align: center;
  padding: 2rem;
}

.illustration-svg {
  width: 100%;
  max-width: 400px;
  height: auto;
}

@media (max-width: 768px) {
  .auth-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
  }
  
  .illustration-card {
    order: -1;
  }
}
`;

// Inject additional styles
if (!document.querySelector('#enhanced-auth-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'enhanced-auth-styles';
  styleSheet.textContent = additionalStyles;
  document.head.appendChild(styleSheet);
}