const fs = require('fs');
const path = require('path');

// Create the dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Read the template index.html
const templatePath = path.join(__dirname, 'public', 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Replace environment variables
const html = template.replace(
  /window\.ENV = window\.ENV \|\| \{\};/,
  `window.ENV = {
        SUPABASE_URL: '${process.env.SUPABASE_URL || ''}',
        SUPABASE_ANON_KEY: '${process.env.SUPABASE_ANON_KEY || ''}'
      };`
);

// Write the processed index.html to dist
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);

console.log('✅ Build completed successfully');
console.log('📁 Files copied to dist/');
console.log('🔧 Environment variables configured');