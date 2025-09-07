/**
 * API documentation endpoint for Vercel deployment
 */
export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Eventify API Documentation',
    data: {
      name: 'Eventify API',
      version: '1.0.0',
      description: 'Backend API for Eventify event management platform',
      platform: 'Vercel',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth/*',
        events: '/api/events/*',
        vendors: '/api/vendors/*',
        bookings: '/api/bookings/*',
        contact: '/api/contact/*'
      },
      documentation: {
        health: 'GET /api/health - API health check',
        auth: {
          register: 'POST /api/auth/register',
          login: 'POST /api/auth/login',
          profile: 'GET /api/auth/profile (protected)',
          updateProfile: 'PUT /api/auth/profile (protected)',
          changePassword: 'PUT /api/auth/change-password (protected)'
        },
        events: {
          getAll: 'GET /api/events',
          getById: 'GET /api/events/[id]',
          getMyEvents: 'GET /api/events/my-events (protected)',
          create: 'POST /api/events (protected)',
          update: 'PUT /api/events/[id] (protected)',
          delete: 'DELETE /api/events/[id] (protected)'
        },
        vendors: {
          getAll: 'GET /api/vendors',
          getById: 'GET /api/vendors/[id]',
          getByCategory: 'GET /api/vendors/category/[category]',
          getAvailable: 'GET /api/vendors/available/[date]',
          create: 'POST /api/vendors (protected)',
          update: 'PUT /api/vendors/[id] (protected)',
          delete: 'DELETE /api/vendors/[id] (protected)'
        },
        bookings: {
          getUserBookings: 'GET /api/bookings (protected)',
          getById: 'GET /api/bookings/[id] (protected)',
          getStats: 'GET /api/bookings/stats (protected)',
          create: 'POST /api/bookings (protected)',
          updateStatus: 'PUT /api/bookings/[id] (protected)',
          cancel: 'DELETE /api/bookings/[id] (protected)'
        },
        contact: {
          submit: 'POST /api/contact',
          getAll: 'GET /api/contact (admin)',
          getById: 'GET /api/contact/[id] (admin)',
          delete: 'DELETE /api/contact/[id] (admin)',
          getStats: 'GET /api/contact/stats (admin)'
        }
      }
    }
  });
}