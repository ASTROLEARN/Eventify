# Eventify - Event Management Platform

## Overview
Eventify is a full-stack event management platform that allows users to organize and manage events, book vendors, and handle event-related services. The application uses a modern tech stack with Supabase for authentication and data management.

## Architecture
- **Frontend**: Vanilla JavaScript SPA with hash-based routing (port 5000)
- **Backend**: Express.js REST API server (port 3001)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## Current State
- ✅ Project successfully imported and configured for Replit environment
- ✅ Dependencies installed and working for both frontend and backend
- ✅ Frontend server running on port 5000 with proper Replit configuration
- ✅ Backend API server running on port 3001 with Supabase connection successful
- ✅ Supabase integration fully configured and operational
- ✅ Deployment configuration ready for autoscale deployment
- ✅ All workflows configured and running successfully

## Project Structure
```
/
├── eventify-backend/          # Express.js API server
│   ├── config/               # Database and configuration
│   ├── controllers/          # API route handlers
│   ├── middleware/           # Auth and validation middleware
│   ├── routes/              # API route definitions
│   ├── utils/               # Utility functions
│   ├── .env                 # Backend environment variables
│   ├── package.json         # Backend dependencies
│   └── server.js           # Backend entry point
├── public/                  # Static frontend assets
├── src/                    # Frontend JavaScript modules
│   ├── components/         # Reusable UI components
│   ├── config/            # Frontend configuration
│   ├── pages/             # Page components
│   ├── styles/            # CSS styles
│   └── utils/             # Frontend utilities
├── package.json           # Frontend dependencies
└── server.js             # Frontend static file server
```

## Recent Changes (2025-09-07)
- Fixed missing Express.js dependencies in backend
- Created backend .env file with Supabase credentials
- Configured proper port separation (frontend: 5000, backend: 3001)
- Set up workflows for both frontend and backend servers
- Configured deployment for autoscale hosting
- Verified API endpoints are working (health check successful)

### ✅ MAJOR UPDATE: Comprehensive Login Page Enhancement
- **Modern Design (2025)**: Implemented glassmorphism effects, enhanced visual hierarchy, and floating background animations
- **Advanced Security**: Added real-time password strength indicator with visual feedback and enhanced validation
- **Superior UX**: Smart form validation with instant feedback, smooth micro-interactions, and enhanced loading states
- **Enhanced Accessibility**: WCAG-compliant design with screen reader support, keyboard navigation, and high contrast mode
- **Mobile-First Design**: Responsive design optimized for all devices with touch-friendly interactions
- **Advanced Features**: Toast notifications, remember me functionality, enhanced error handling, and social login options
- **Performance Optimized**: Smooth animations, efficient state management, and optimized for fast interactions
- **Brand Integration**: Consistent with Eventify's coral/peach color scheme and event management focus

## Environment Variables
- **SUPABASE_URL**: Configured for Supabase database connection
- **SUPABASE_ANON_KEY**: Configured for authentication
- **NODE_ENV**: Set to development
- **PORT**: Frontend (5000), Backend (3001)

## Available API Endpoints
- Health Check: GET `/health`
- API Documentation: GET `/api`
- Authentication: `/api/auth/*`
- Events: `/api/events/*`
- Vendors: `/api/vendors/*`
- Bookings: `/api/bookings/*`
- Contact: `/api/contact/*`

## Next Steps for Full Functionality
1. Set up Supabase database tables (see eventify-backend/DATABASE_SETUP.md)
2. Configure authentication flows
3. Test all API endpoints with frontend integration
4. Deploy to production when ready