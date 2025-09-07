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
  /window\.ENV = \{[\s\S]*?\};/,
  `window.ENV = {
        SUPABASE_URL: '${process.env.SUPABASE_URL || 'https://kduqigxfckhkoesghbct.supabase.co'}',
        SUPABASE_ANON_KEY: '${process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkdXFpZ3hmY2toa29lc2doYmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNDQyMzEsImV4cCI6MjA3MjgyMDIzMX0.98kfcPWk7XDsBlYQTYcag4ZwCNLrLPo2RMBJs9fnSK0'}'
      };`
);

// Write the processed index.html to dist
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);

console.log('✅ Build completed successfully');
console.log('📁 Files copied to dist/');
console.log('🔧 Environment variables configured');