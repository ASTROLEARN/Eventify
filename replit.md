# Eventify - Event Management Platform

## Overview
Eventify is a vanilla JavaScript single-page application for event management, featuring a custom Node.js static file server. The application uses ES6 modules and hash-based routing for navigation.

## Project Architecture
- **Frontend**: Vanilla JavaScript SPA with ES6 modules
- **Backend**: Node.js static file server
- **Routing**: Hash-based SPA routing
- **Styling**: CSS with Google Fonts (Dancing Script, Poppins)

## Structure
```
/public/          - Static assets (CSS, HTML)
/src/             - Source code
  /components/    - Reusable components (Navbar, Footer)
  /pages/         - Page components
  /styles/        - Additional CSS files
server.js         - Static file server
package.json      - Dependencies and scripts
```

## Setup Configuration
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows proxy access)
- **Cache Control**: no-store (prevents iframe caching issues)
- **Deployment**: Configured for autoscale deployment target

## Recent Changes
- 2025-09-07: Initial Replit environment setup
  - Updated server to bind to 0.0.0.0:5000
  - Configured workflow for development
  - Set up deployment configuration

## Development
Run `npm start` to start the development server on port 5000.