const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import database connection
const { testConnection } = require('./config/database');

// Import middleware
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const vendorRoutes = require('./routes/vendors');
const bookingRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contact');

// Import response utilities
const { successResponse } = require('./utils/responses');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy (important for Replit and other cloud platforms)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    // In development, allow all origins
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // In production, you should specify allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5000',
      'https://your-frontend-domain.com'
    ];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // For Replit and similar platforms, allow replit.dev domains
    if (origin && origin.includes('.replit.dev')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for health check
    return req.path === '/health';
  }
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  return successResponse(res, {
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime()
  }, 'API is healthy');
});

// API documentation endpoint
app.get('/api', (req, res) => {
  return successResponse(res, {
    name: 'Eventify API',
    version: '1.0.0',
    description: 'Backend API for Eventify event management platform',
    endpoints: {
      auth: '/api/auth',
      events: '/api/events',
      vendors: '/api/vendors',
      bookings: '/api/bookings',
      contact: '/api/contact'
    },
    documentation: {
      health: 'GET /health - API health check',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile (protected)',
        updateProfile: 'PUT /api/auth/profile (protected)',
        changePassword: 'PUT /api/auth/change-password (protected)'
      },
      events: {
        getAll: 'GET /api/events',
        getById: 'GET /api/events/:id',
        getMyEvents: 'GET /api/events/my-events (protected)',
        create: 'POST /api/events (protected)',
        update: 'PUT /api/events/:id (protected)',
        delete: 'DELETE /api/events/:id (protected)'
      },
      vendors: {
        getAll: 'GET /api/vendors',
        getById: 'GET /api/vendors/:id',
        getByCategory: 'GET /api/vendors/category/:category',
        getAvailable: 'GET /api/vendors/available/:date',
        create: 'POST /api/vendors (protected)',
        update: 'PUT /api/vendors/:id (protected)',
        delete: 'DELETE /api/vendors/:id (protected)'
      },
      bookings: {
        getUserBookings: 'GET /api/bookings (protected)',
        getById: 'GET /api/bookings/:id (protected)',
        getStats: 'GET /api/bookings/stats (protected)',
        create: 'POST /api/bookings (protected)',
        updateStatus: 'PUT /api/bookings/:id (protected)',
        cancel: 'DELETE /api/bookings/:id (protected)'
      },
      contact: {
        submit: 'POST /api/contact',
        getAll: 'GET /api/contact (admin)',
        getById: 'GET /api/contact/:id (admin)',
        delete: 'DELETE /api/contact/:id (admin)',
        getStats: 'GET /api/contact/stats (admin)'
      }
    }
  }, 'Eventify API Documentation');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start server
const startServer = async () => {
  try {
    console.log('🚀 Starting Eventify Backend API...');
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Test database connection
    console.log('🔍 Testing database connection...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Database connection failed. Please check your Supabase configuration.');
      console.log('Make sure you have set the following environment variables:');
      console.log('- SUPABASE_URL');
      console.log('- SUPABASE_ANON_KEY');
      process.exit(1);
    }
    
    // Start the server
    app.listen(PORT, '0.0.0.0', () => {
      console.log('✅ Eventify Backend API is running!');
      console.log(`🌐 Server: http://0.0.0.0:${PORT}`);
      console.log(`📚 API Documentation: http://0.0.0.0:${PORT}/api`);
      console.log(`🏥 Health Check: http://0.0.0.0:${PORT}/health`);
      console.log('');
      console.log('📋 Available API Endpoints:');
      console.log('  Authentication: /api/auth');
      console.log('  Events: /api/events');
      console.log('  Vendors: /api/vendors');
      console.log('  Bookings: /api/bookings');
      console.log('  Contact: /api/contact');
      console.log('');
      console.log('🔧 Next Steps:');
      console.log('1. Set up your Supabase database tables');
      console.log('2. Configure your environment variables');
      console.log('3. Test the API endpoints');
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Initialize server
startServer();

module.exports = app;