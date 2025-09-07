import { navigate } from '../App.js';

function createEl(tag, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}

function InputRow({ id, label, type = 'text', placeholder = '', value = '' }) {
  const row = createEl('div', 'form-row');
  const lbl = createEl('label', 'field-label');
  lbl.setAttribute('for', id);
  lbl.textContent = label;
  const input = createEl('input', 'input-control');
  input.id = id; input.name = id; input.type = type; input.placeholder = placeholder; input.value = value;
  row.appendChild(lbl); row.appendChild(input);
  return { row, input };
}

function TextAreaRow({ id, label, rows = 3, placeholder = '' }) {
  const row = createEl('div', 'form-row');
  const lbl = createEl('label', 'field-label');
  lbl.setAttribute('for', id);
  lbl.textContent = label;
  const input = createEl('textarea', 'input-control');
  input.id = id; input.name = id; input.rows = rows; input.placeholder = placeholder;
  row.appendChild(lbl); row.appendChild(input);
  return { row, input };
}

function SelectRow({ id, label, options }) {
  const row = createEl('div', 'form-row');
  const lbl = createEl('label', 'field-label');
  lbl.setAttribute('for', id);
  lbl.textContent = label;
  const select = createEl('select', 'input-control');
  select.id = id; select.name = id;
  options.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o; opt.textContent = o;
    select.appendChild(opt);
  });
  row.appendChild(lbl); row.appendChild(select);
  return { row, select };
}

function GoogleButton(onClick) {
  const btn = createEl('button', 'google-button');
  btn.type = 'button';
  btn.innerHTML = `<span class="gicon" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.6 12.23c0-.73-.07-1.43-.2-2.11H12v4h5.4c-.23 1.25-.94 2.31-2 3l3.23 2.51c1.89-1.75 2.97-4.33 2.97-7.4z" fill="#4285F4"/>
        <path d="M12 22c2.7 0 4.97-.9 6.63-2.37l-3.23-2.51c-.9.6-2.05.96-3.4.96-2.62 0-4.84-1.77-5.63-4.16H2.98v2.61C4.63 19.98 8.04 22 12 22z" fill="#34A853"/>
        <path d="M6.37 13.92A6.03 6.03 0 015.99 12c0-.67.11-1.33.32-1.92V7.47H2.98A10 10 0 002 12c0 1.62.38 3.15 1.06 4.53l3.31-2.61z" fill="#FBBC05"/>
        <path d="M12 5.84c1.47 0 2.79.51 3.84 1.5l2.88-2.88C16.96 2.41 14.69 1.5 12 1.5 8.04 1.5 4.63 3.53 2.98 7.47l3.33 2.61C7.16 7.69 9.38 5.84 12 5.84z" fill="#EA4335"/>
      </svg>
    </span>
    <span>Login with Google</span>`;
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}

function SeekerForm() {
  const wrap = createEl('div', 'auth-card');

  const header = createEl('header', 'auth-header');
  header.innerHTML = `
    <h3 class="auth-title">Welcome Back</h3>
    <p class="auth-tagline">Find the perfect vendors for your dream event.</p>
  `;

  const form = createEl('form', 'auth-form');
  const nameRow = InputRow({ id: 'seeker-name', label: 'Name', placeholder: 'Your full name' });
  const emailRow = InputRow({ id: 'seeker-email', label: 'Email', type: 'email', placeholder: 'you@example.com' });
  const passRow = InputRow({ id: 'seeker-password', label: 'Password', type: 'password', placeholder: 'Enter a secure password' });

  const submit = createEl('button', 'primary-button auth-submit');
  submit.type = 'submit';
  submit.textContent = 'Continue';

  const divider = createEl('div', 'auth-divider');
  divider.innerHTML = '<span>or</span>';

  const gbtn = GoogleButton(() => alert('Google auth UI only'));

  form.append(nameRow.row, emailRow.row, passRow.row, submit, divider, gbtn);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Logged in (demo)');
  });

  wrap.append(header, form);
  return wrap;
}

function StepIndicator(current, total) {
  const bar = createEl('div', 'progress');
  const inner = createEl('div', 'progress-bar');
  inner.style.width = `${Math.round((current / total) * 100)}%`;
  bar.appendChild(inner);
  return bar;
}

function ProviderForm() {
  const wrap = createEl('div', 'auth-card');
  let step = 1;
  const total = 3;
  const state = {
    businessName: '', email: '', password: '',
    category: 'Catering', website: '', logoFile: null,
    instagram: '', facebook: '', linkedin: '',
    review1: '', review2: ''
  };

  const header = createEl('header', 'auth-header');
  const title = createEl('h3', 'auth-title');
  title.textContent = 'Join as a Vendor';
  const tagline = createEl('p', 'auth-tagline');
  tagline.textContent = 'Showcase your services to thousands of planners.';

  const progressWrap = createEl('div', 'stepper');
  let progress = StepIndicator(step, total);
  progressWrap.appendChild(progress);

  const form = createEl('form', 'auth-form');
  const navWrap = createEl('div', 'step-nav');
  const prevBtn = createEl('button', 'secondary-button step-prev'); prevBtn.type = 'button'; prevBtn.textContent = 'Back';
  const nextBtn = createEl('button', 'primary-button step-next'); nextBtn.type = 'button'; nextBtn.textContent = 'Next';
  navWrap.append(prevBtn, nextBtn);

  function renderStep() {
    form.innerHTML = '';
    if (step === 1) {
      const r1 = InputRow({ id: 'business-name', label: 'Business Name', placeholder: 'e.g., Coral Weddings' });
      const r2 = InputRow({ id: 'vendor-email', label: 'Email', type: 'email', placeholder: 'you@business.com' });
      const r3 = InputRow({ id: 'vendor-password', label: 'Password', type: 'password', placeholder: 'Create a strong password' });
      r1.input.value = state.businessName; r2.input.value = state.email; r3.input.value = state.password;
      form.append(r1.row, r2.row, r3.row);
    }
    if (step === 2) {
      const r1 = SelectRow({ id: 'business-category', label: 'Business Category', options: ['Catering', 'Decoration', 'Photography', 'Venue', 'Entertainment', 'Planning', 'Music', 'Florist'] });
      const r2 = InputRow({ id: 'business-website', label: 'Website URL', type: 'url', placeholder: 'https://yourbusiness.com' });
      const r3 = createEl('div', 'form-row');
      const lbl = createEl('label', 'field-label'); lbl.setAttribute('for', 'business-logo'); lbl.textContent = 'Upload Logo/Image';
      const input = createEl('input', 'input-control'); input.type = 'file'; input.id = 'business-logo'; input.name = 'business-logo'; input.accept = 'image/*';
      const preview = createEl('img', 'logo-preview'); preview.alt = 'Logo preview'; preview.style.display = 'none';
      input.addEventListener('change', () => {
        const file = input.files && input.files[0];
        state.logoFile = file || null;
        if (file) {
          const url = URL.createObjectURL(file);
          preview.src = url; preview.style.display = 'block';
        } else { preview.style.display = 'none'; }
      });
      r3.append(lbl, input, preview);
      form.append(r1.row, r2.row, r3);
      r1.select.value = state.category; r2.input.value = state.website;
    }
    if (step === 3) {
      const s1 = InputRow({ id: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/yourhandle' });
      const s2 = InputRow({ id: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/yourpage' });
      const s3 = InputRow({ id: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/yourcompany' });
      const t1 = TextAreaRow({ id: 'review1', label: 'Customer Review 1', rows: 3, placeholder: '“Amazing experience!” — Riya S.' });
      const t2 = TextAreaRow({ id: 'review2', label: 'Customer Review 2', rows: 3, placeholder: '“Highly professional and friendly.” — Aarav K.' });
      s1.input.value = state.instagram; s2.input.value = state.facebook; s3.input.value = state.linkedin;
      t1.input.value = state.review1; t2.input.value = state.review2;
      form.append(s1.row, s2.row, s3.row, t1.row, t2.row);
    }
    const submit = createEl('button', 'primary-button auth-submit'); submit.type = 'submit'; submit.textContent = step === total ? 'Create Account' : 'Save & Continue';
    form.append(submit, navWrap);

    // Update progress
    progressWrap.innerHTML = ''; progress = StepIndicator(step, total); progressWrap.appendChild(progress);

    // Update nav states
    prevBtn.disabled = step === 1; nextBtn.style.display = step === total ? 'none' : 'inline-block';
  }

  function persistCurrentStep() {
    if (step === 1) {
      const name = form.querySelector('#business-name');
      const email = form.querySelector('#vendor-email');
      const pass = form.querySelector('#vendor-password');
      state.businessName = name && name.value || ''; state.email = email && email.value || ''; state.password = pass && pass.value || '';
    }
    if (step === 2) {
      const cat = form.querySelector('#business-category');
      const web = form.querySelector('#business-website');
      state.category = cat && cat.value || 'Catering'; state.website = web && web.value || '';
    }
    if (step === 3) {
      const ig = form.querySelector('#instagram');
      const fb = form.querySelector('#facebook');
      const li = form.querySelector('#linkedin');
      const r1 = form.querySelector('#review1');
      const r2 = form.querySelector('#review2');
      state.instagram = ig && ig.value || ''; state.facebook = fb && fb.value || ''; state.linkedin = li && li.value || '';
      state.review1 = r1 && r1.value || ''; state.review2 = r2 && r2.value || '';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (step < total) {
      persistCurrentStep();
      step++; renderStep();
      return;
    }
    persistCurrentStep();
    alert('Vendor profile created (demo)');
    navigate('/dashboard');
  });

  prevBtn.addEventListener('click', () => { if (step > 1) { persistCurrentStep(); step--; renderStep(); } });
  nextBtn.addEventListener('click', () => { if (step < total) { persistCurrentStep(); step++; renderStep(); } });

  header.append(title, tagline, progressWrap);
  wrap.append(header, form);
  renderStep();
  return wrap;
}

export function Auth() {
  const main = createEl('main', 'content-section');

  const section = createEl('section', 'auth-section');
  const grid = createEl('div', 'auth-grid');

  // Tabs
  const tabs = createEl('div', 'tabs auth-tabs');
  const tabSeeker = createEl('button', 'tab active'); tabSeeker.type = 'button'; tabSeeker.textContent = 'Service Seeker';
  const tabProvider = createEl('button', 'tab'); tabProvider.type = 'button'; tabProvider.textContent = 'Service Provider';
  tabs.append(tabSeeker, tabProvider);

  // Panels
  const panels = createEl('div', 'tab-panels');
  const seekerPanel = createEl('div', 'tab-panel active');
  const providerPanel = createEl('div', 'tab-panel');
  seekerPanel.appendChild(SeekerForm());
  providerPanel.appendChild(ProviderForm());
  panels.append(seekerPanel, providerPanel);

  // Illustration
  const aside = createEl('aside', 'auth-illustration');
  aside.innerHTML = `
    <div class="illustration-card">
      <svg class="illustration-svg" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FF6B6B"/>
            <stop offset="100%" stop-color="#FDE2D9"/>
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="280" height="120" rx="16" fill="url(#g1)" opacity="0.9"/>
        <rect x="26" y="34" width="110" height="18" rx="9" fill="#fff" opacity="0.9"/>
        <rect x="26" y="60" width="190" height="12" rx="6" fill="#fff" opacity="0.9"/>
        <rect x="26" y="80" width="160" height="12" rx="6" fill="#fff" opacity="0.9"/>
        <rect x="26" y="100" width="120" height="12" rx="6" fill="#fff" opacity="0.9"/>
        <g transform="translate(10,148)">
          <circle cx="28" cy="28" r="28" fill="#FFB4A2"/>
          <circle cx="98" cy="28" r="28" fill="#FDE2D9"/>
          <circle cx="168" cy="28" r="28" fill="#FF6B6B"/>
          <circle cx="238" cy="28" r="28" fill="#FCA5A5"/>
        </g>
      </svg>
      <p class="illustration-caption">Eventify connects seekers with top-rated vendors. Join the community today.</p>
    </div>
  `;

  // Toggle logic
  tabs.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLButtonElement)) return;
    if (t === tabSeeker) {
      tabSeeker.classList.add('active'); tabProvider.classList.remove('active');
      seekerPanel.classList.add('active'); providerPanel.classList.remove('active');
    } else {
      tabProvider.classList.add('active'); tabSeeker.classList.remove('active');
      providerPanel.classList.add('active'); seekerPanel.classList.remove('active');
    }
  });

  grid.appendChild(createEl('div', 'auth-left'));
  grid.appendChild(createEl('div', 'auth-right'));
  const left = grid.children[0];
  const right = grid.children[1];
  left.append(tabs, panels);
  right.append(aside);

  section.appendChild(grid);
  main.appendChild(section);
  return main;
}
