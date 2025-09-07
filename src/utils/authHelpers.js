/**
 * Authentication utility functions and form validation
 */

// Password strength checker
export const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const strength = Object.values(checks).filter(Boolean).length;
  
  return {
    score: strength,
    checks,
    label: strength < 2 ? 'Weak' : strength < 4 ? 'Medium' : 'Strong',
    color: strength < 2 ? '#ef4444' : strength < 4 ? '#f59e0b' : '#10b981'
  };
};

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Form validation helpers
export const validateField = (value, rules) => {
  const errors = [];
  
  if (rules.required && (!value || value.trim() === '')) {
    errors.push('This field is required');
  }
  
  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`Must be at least ${rules.minLength} characters`);
  }
  
  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`Must be no more than ${rules.maxLength} characters`);
  }
  
  if (rules.email && !isValidEmail(value)) {
    errors.push('Please enter a valid email address');
  }
  
  if (rules.password) {
    const strength = checkPasswordStrength(value);
    if (strength.score < 3) {
      errors.push('Password is too weak');
    }
  }
  
  return errors;
};

// Create input field with validation
export const createValidatedInput = (options = {}) => {
  const {
    type = 'text',
    id,
    label,
    placeholder = '',
    required = false,
    validation = {},
    showPasswordToggle = false
  } = options;

  const container = document.createElement('div');
  container.className = 'form-field';

  const labelEl = document.createElement('label');
  labelEl.className = 'field-label';
  labelEl.setAttribute('for', id);
  labelEl.innerHTML = `${label}${required ? ' <span class="required">*</span>' : ''}`;

  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';

  const input = document.createElement('input');
  input.className = 'input-control';
  input.type = type;
  input.id = id;
  input.name = id;
  input.placeholder = placeholder;
  input.required = required;

  // Add password toggle if needed
  if (showPasswordToggle && type === 'password') {
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'password-toggle';
    toggleBtn.innerHTML = '👁️';
    toggleBtn.setAttribute('aria-label', 'Toggle password visibility');
    
    toggleBtn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      toggleBtn.innerHTML = isPassword ? '🙈' : '👁️';
    });
    
    inputContainer.appendChild(toggleBtn);
  }

  const errorContainer = document.createElement('div');
  errorContainer.className = 'field-error';

  // Validation on input/blur
  const validateInput = () => {
    const errors = validateField(input.value, { required, ...validation });
    errorContainer.textContent = errors[0] || '';
    container.classList.toggle('error', errors.length > 0);
    container.classList.toggle('valid', input.value && errors.length === 0);
    return errors.length === 0;
  };

  input.addEventListener('blur', validateInput);
  input.addEventListener('input', () => {
    // Clear errors on input, validate on blur
    if (errorContainer.textContent) {
      validateInput();
    }
  });

  inputContainer.appendChild(input);
  container.append(labelEl, inputContainer, errorContainer);

  return {
    container,
    input,
    validate: validateInput,
    getValue: () => input.value.trim(),
    setValue: (value) => { input.value = value; },
    focus: () => input.focus()
  };
};

// Create password strength meter
export const createPasswordMeter = (passwordInput) => {
  const container = document.createElement('div');
  container.className = 'password-strength';

  const meterBar = document.createElement('div');
  meterBar.className = 'strength-meter';

  const meterFill = document.createElement('div');
  meterFill.className = 'strength-fill';
  meterBar.appendChild(meterFill);

  const strengthLabel = document.createElement('div');
  strengthLabel.className = 'strength-label';

  const requirementsList = document.createElement('ul');
  requirementsList.className = 'password-requirements';
  requirementsList.innerHTML = `
    <li data-check="length">At least 8 characters</li>
    <li data-check="lowercase">One lowercase letter</li>
    <li data-check="uppercase">One uppercase letter</li>
    <li data-check="number">One number</li>
    <li data-check="special">One special character</li>
  `;

  container.append(meterBar, strengthLabel, requirementsList);

  const updateMeter = () => {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    
    meterFill.style.width = `${(strength.score / 5) * 100}%`;
    meterFill.style.backgroundColor = strength.color;
    strengthLabel.textContent = password ? `Password strength: ${strength.label}` : '';
    
    // Update requirements checklist
    Object.entries(strength.checks).forEach(([check, passed]) => {
      const li = requirementsList.querySelector(`[data-check="${check}"]`);
      if (li) {
        li.classList.toggle('met', passed);
      }
    });
    
    container.style.display = password ? 'block' : 'none';
  };

  passwordInput.addEventListener('input', updateMeter);
  updateMeter(); // Initial state

  return container;
};

// Loading state manager
export const createLoadingState = () => {
  let isLoading = false;
  const loadingElements = new Set();

  return {
    start: (elements = []) => {
      isLoading = true;
      elements.forEach(el => {
        if (el) {
          loadingElements.add(el);
          el.disabled = true;
          if (el.tagName === 'BUTTON') {
            el.dataset.originalText = el.textContent;
            el.innerHTML = '<span class="spinner"></span> Loading...';
          }
        }
      });
    },
    
    stop: () => {
      isLoading = false;
      loadingElements.forEach(el => {
        el.disabled = false;
        if (el.tagName === 'BUTTON' && el.dataset.originalText) {
          el.textContent = el.dataset.originalText;
          delete el.dataset.originalText;
        }
      });
      loadingElements.clear();
    },
    
    isActive: () => isLoading
  };
};

// Toast notification helper
export const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remove after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 4000);
};

// Form submission helper
export const handleFormSubmission = async (formData, submitFunction, loadingState) => {
  try {
    loadingState.start();
    const result = await submitFunction(formData);
    
    if (result.error) {
      showToast(result.error.message || 'An error occurred', 'error');
      return { success: false, error: result.error };
    }
    
    return { success: true, data: result.data };
  } catch (error) {
    showToast(error.message || 'An unexpected error occurred', 'error');
    return { success: false, error };
  } finally {
    loadingState.stop();
  }
};