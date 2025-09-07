# Vercel Deployment Guide for Eventify

## 🚀 Quick Deployment Steps

### 1. **Prepare Your Repository**
- Ensure all files are committed to your Git repository
- Push your latest changes to GitHub/GitLab

### 2. **Deploy to Vercel**

#### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your repository
4. Vercel will automatically detect the configuration

### 3. **Environment Variables Setup**
In your Vercel dashboard, add these environment variables:

```
SUPABASE_URL=https://kduqigxfckhkoesghbct.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. **Custom Domain (Optional)**
- Go to your project settings in Vercel
- Add your custom domain
- Update DNS settings as instructed

## 🔧 Configuration Files Created

- **`vercel.json`** - Main Vercel configuration
- **`build-env.js`** - Build script for environment variables
- **`dist/`** - Build output directory
- **`_redirects`** - SPA routing configuration
- **`.vercelignore`** - Files to exclude from deployment

## 🚨 Important Notes

1. **Backend Deployment**: The API routes will be deployed as serverless functions
2. **Environment Variables**: Make sure to set them in Vercel dashboard
3. **Build Process**: Vercel will run `npm run build` automatically
4. **SPA Routing**: All routes redirect to index.html for client-side routing

## 🐛 Troubleshooting

### Blank Page Issues
- Check browser console for JavaScript errors
- Verify environment variables are set correctly
- Ensure all file paths are correct

### API Issues
- Check that backend environment variables are configured
- Verify Supabase connection settings
- Test API endpoints individually

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Review build logs in Vercel dashboard

## 📱 Testing Deployment

After deployment:
1. Visit your Vercel URL
2. Test login functionality
3. Verify all pages load correctly
4. Check that API calls work properly

Your app should now be live and accessible at your Vercel URL!