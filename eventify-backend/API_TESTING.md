# Eventify Backend API Testing Guide

## Base URL
- Development: `http://localhost:3001`
- All API endpoints are prefixed with `/api`

## Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format
All API responses follow this consistent format:
```json
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "pagination": object (for list endpoints)
}
```

## Error Responses
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional detailed errors
}
```

## API Endpoints

### Health Check
```bash
# Check API health
curl http://localhost:3001/health
```

### Authentication Endpoints

#### Register User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

#### Get User Profile (Protected)
```bash
curl -H "Authorization: Bearer <your_jwt_token>" \
  http://localhost:3001/api/auth/profile
```

#### Update Profile (Protected)
```bash
curl -X PUT http://localhost:3001/api/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "name": "John Updated"
  }'
```

#### Change Password (Protected)
```bash
curl -X PUT http://localhost:3001/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "currentPassword": "SecurePass123",
    "newPassword": "NewSecurePass456"
  }'
```

### Event Endpoints

#### Get All Events
```bash
# Basic request
curl http://localhost:3001/api/events

# With pagination and filters
curl "http://localhost:3001/api/events?page=1&limit=5&category=wedding&location=new%20york"
```

#### Get Single Event
```bash
curl http://localhost:3001/api/events/{event_id}
```

#### Create Event (Protected)
```bash
curl -X POST http://localhost:3001/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "title": "Summer Wedding",
    "description": "Beautiful outdoor wedding ceremony",
    "event_date": "2024-06-15T14:00:00Z",
    "location": "Central Park, New York",
    "category": "wedding"
  }'
```

#### Update Event (Protected - Owner Only)
```bash
curl -X PUT http://localhost:3001/api/events/{event_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "title": "Updated Summer Wedding",
    "description": "Updated description",
    "event_date": "2024-06-16T14:00:00Z",
    "location": "Brooklyn Bridge Park",
    "category": "wedding"
  }'
```

#### Delete Event (Protected - Owner Only)
```bash
curl -X DELETE http://localhost:3001/api/events/{event_id} \
  -H "Authorization: Bearer <your_jwt_token>"
```

#### Get My Events (Protected)
```bash
curl -H "Authorization: Bearer <your_jwt_token>" \
  "http://localhost:3001/api/events/my-events?page=1&limit=10"
```

### Vendor Endpoints

#### Get All Vendors
```bash
# Basic request
curl http://localhost:3001/api/vendors

# With filters
curl "http://localhost:3001/api/vendors?category=catering&min_rating=4.0&page=1&limit=10"
```

#### Get Single Vendor
```bash
curl http://localhost:3001/api/vendors/{vendor_id}
```

#### Get Vendors by Category
```bash
curl http://localhost:3001/api/vendors/category/catering
```

#### Get Available Vendors for Date
```bash
curl http://localhost:3001/api/vendors/available/2024-06-15
```

#### Create Vendor (Protected - Admin Only)
```bash
curl -X POST http://localhost:3001/api/vendors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "name": "Amazing Catering Co",
    "category": "Catering",
    "rating": 4.5,
    "description": "Premium catering services",
    "image_url": "https://example.com/image.jpg",
    "availability": ["2024-06-15", "2024-06-16"]
  }'
```

#### Update Vendor (Protected - Admin Only)
```bash
curl -X PUT http://localhost:3001/api/vendors/{vendor_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "name": "Updated Catering Co",
    "rating": 4.8
  }'
```

#### Delete Vendor (Protected - Admin Only)
```bash
curl -X DELETE http://localhost:3001/api/vendors/{vendor_id} \
  -H "Authorization: Bearer <your_jwt_token>"
```

### Booking Endpoints

#### Get User Bookings (Protected)
```bash
curl -H "Authorization: Bearer <your_jwt_token>" \
  "http://localhost:3001/api/bookings?status=pending&page=1&limit=10"
```

#### Get Single Booking (Protected)
```bash
curl -H "Authorization: Bearer <your_jwt_token>" \
  http://localhost:3001/api/bookings/{booking_id}
```

#### Create Booking (Protected)
```bash
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "event_id": "{event_id}",
    "vendor_id": "{vendor_id}"
  }'
```

#### Update Booking Status (Protected - Event Owner Only)
```bash
curl -X PUT http://localhost:3001/api/bookings/{booking_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "status": "confirmed"
  }'
```

#### Cancel Booking (Protected - Event Owner Only)
```bash
curl -X DELETE http://localhost:3001/api/bookings/{booking_id} \
  -H "Authorization: Bearer <your_jwt_token>"
```

#### Get Booking Statistics (Protected)
```bash
curl -H "Authorization: Bearer <your_jwt_token>" \
  http://localhost:3001/api/bookings/stats
```

### Contact Endpoints

#### Submit Contact Form
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "I would like more information about your services."
  }'
```

#### Get All Contact Submissions (Protected - Admin Only)
```bash
curl -H "Authorization: Bearer <your_jwt_token>" \
  "http://localhost:3001/api/contact?page=1&limit=10"
```

#### Get Single Contact Submission (Protected - Admin Only)
```bash
curl -H "Authorization: Bearer <your_jwt_token>" \
  http://localhost:3001/api/contact/{contact_id}
```

#### Delete Contact Submission (Protected - Admin Only)
```bash
curl -X DELETE http://localhost:3001/api/contact/{contact_id} \
  -H "Authorization: Bearer <your_jwt_token>"
```

#### Get Contact Statistics (Protected - Admin Only)
```bash
curl -H "Authorization: Bearer <your_jwt_token>" \
  http://localhost:3001/api/contact/stats
```

## Testing Workflow

### 1. Register and Login
```bash
# Register a new user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"TestPass123"}'

# Login to get JWT token
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123"}'

# Save the returned token for subsequent requests
```

### 2. Create and Manage Events
```bash
# Create an event
TOKEN="your_jwt_token_here"
curl -X POST http://localhost:3001/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Test Event",
    "description": "A test event",
    "event_date": "2024-12-25T18:00:00Z",
    "location": "Test Location",
    "category": "celebration"
  }'

# Get all events
curl http://localhost:3001/api/events

# Get your events
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/events/my-events
```

### 3. Browse and Manage Vendors
```bash
# Get all vendors
curl http://localhost:3001/api/vendors

# Filter vendors by category
curl "http://localhost:3001/api/vendors?category=catering"

# Get vendors available on a specific date
curl http://localhost:3001/api/vendors/available/2024-12-25
```

### 4. Create and Manage Bookings
```bash
# Create a booking (need event_id and vendor_id from previous steps)
curl -X POST http://localhost:3001/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "event_id": "your_event_id",
    "vendor_id": "your_vendor_id"
  }'

# Get your bookings
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/bookings

# Update booking status
curl -X PUT http://localhost:3001/api/bookings/{booking_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"status": "confirmed"}'
```

### 5. Submit Contact Form
```bash
# Submit a contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer Name",
    "email": "customer@example.com",
    "message": "Hello, I need help with event planning."
  }'
```

## Error Codes
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

## Rate Limiting
- 100 requests per 15 minutes per IP address
- Rate limit headers included in responses

## Database Setup Note
If you see errors about tables not being found, the Supabase schema cache may need to be refreshed. This can happen with new databases. The API is properly configured and will work once the database tables are accessible.

## Frontend Integration

For your frontend JavaScript application, you can use fetch or axios:

```javascript
// Register user
const registerUser = async (userData) => {
  const response = await fetch('http://localhost:3001/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Get events with auth
const getEvents = async (token) => {
  const response = await fetch('http://localhost:3001/api/events', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

Your backend is now fully configured and ready to handle all event management operations!