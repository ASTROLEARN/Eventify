# Eventify Backend - Database Setup Instructions

## Quick Start

Your Eventify backend is now ready! Follow these steps to set up your Supabase database and get full functionality.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project name: "eventify-backend"
5. Enter a secure database password
6. Select your region
7. Click "Create new project"

## 2. Get Your Credentials

Once your project is created:

1. Go to your project dashboard
2. Click on "Settings" → "API"
3. Copy your **Project URL** and **anon/public key**

## 3. Configure Environment Variables

Update your `.env` file in the `eventify-backend` folder:

```bash
PORT=3001
NODE_ENV=development
SUPABASE_URL=YOUR_PROJECT_URL_HERE
SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
JWT_SECRET=dd9e333262066a18574f52d799d1a62a5fd94d08404bfba2c6734bb7c2a6363a4aa1f311d1d73bdca5b4f01a11bd6386238fbc83182776186d257474cd5b9b76
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
```

## 4. Create Database Tables

Go to your Supabase project dashboard → SQL Editor and run these SQL commands:

### Create Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX idx_users_email ON users(email);
```

### Create Events Table
```sql
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date TIMESTAMPTZ NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    created_by UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_category ON events(category);
```

### Create Vendors Table
```sql
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 0.00,
    availability JSONB DEFAULT '[]',
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for vendor searches
CREATE INDEX idx_vendors_category ON vendors(category);
CREATE INDEX idx_vendors_rating ON vendors(rating);
CREATE INDEX idx_vendors_name ON vendors(name);
```

### Create Bookings Table
```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure one booking per event-vendor combination
    UNIQUE(event_id, vendor_id)
);

-- Create indexes for booking queries
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_event_id ON bookings(event_id);
CREATE INDEX idx_bookings_vendor_id ON bookings(vendor_id);
CREATE INDEX idx_bookings_status ON bookings(status);
```

### Create Contact Table
```sql
CREATE TABLE contact (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for contact queries
CREATE INDEX idx_contact_created_at ON contact(created_at);
CREATE INDEX idx_contact_email ON contact(email);
```

## 5. Set Up Row Level Security (Optional but Recommended)

Enable RLS for better security:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

-- Users can only see and modify their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Events are public for reading, but only owners can modify
CREATE POLICY "Events are viewable by everyone" ON events
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own events" ON events
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own events" ON events
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own events" ON events
    FOR DELETE USING (auth.uid() = created_by);

-- Vendors are public for reading, authenticated users can manage
CREATE POLICY "Vendors are viewable by everyone" ON vendors
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage vendors" ON vendors
    FOR ALL USING (auth.role() = 'authenticated');

-- Bookings are only accessible by the user who made them
CREATE POLICY "Users can view own bookings" ON bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings" ON bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON bookings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookings" ON bookings
    FOR DELETE USING (auth.uid() = user_id);

-- Contact submissions are insertable by anyone, manageable by admins
CREATE POLICY "Anyone can submit contact forms" ON contact
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all contact submissions" ON contact
    FOR SELECT USING (auth.role() = 'authenticated'); -- Modify this for admin role
```

## 6. Add Sample Data (Optional)

```sql
-- Sample vendors
INSERT INTO vendors (name, category, rating, description) VALUES
('Elite Catering Services', 'Catering', 4.8, 'Premium catering for all event types'),
('Sound & Vision Pro', 'Audio/Visual', 4.5, 'Professional sound and lighting equipment'),
('Bloom & Blossom', 'Flowers', 4.9, 'Beautiful floral arrangements and decorations'),
('Capture Moments', 'Photography', 4.7, 'Professional event photography and videography'),
('Party Rentals Plus', 'Equipment', 4.3, 'Tables, chairs, tents, and party equipment');
```

## 7. Test Your Setup

1. Restart your backend workflow
2. You should see "✅ Database connection successful"
3. Test the API endpoints at: http://localhost:3001/api

## API Testing

Try these endpoints to test your setup:

### Health Check
```bash
curl http://localhost:3001/health
```

### Register a User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Get Vendors
```bash
curl http://localhost:3001/api/vendors
```

## Troubleshooting

### Common Issues:

1. **"Database connection failed"**
   - Double-check your SUPABASE_URL and SUPABASE_ANON_KEY
   - Make sure your Supabase project is active

2. **"Table doesn't exist"**
   - Run the SQL commands above in Supabase SQL Editor
   - Check that all tables were created successfully

3. **"Unauthorized"**
   - Make sure RLS policies allow the operation
   - For testing, you can temporarily disable RLS

### Need Help?

- Check the backend logs in your workflow console
- Visit [Supabase Documentation](https://supabase.com/docs)
- Ensure your .env file is properly configured

## Production Deployment

For production deployment:

1. Update NODE_ENV to "production"
2. Use strong, unique passwords
3. Configure proper CORS origins
4. Set up proper RLS policies
5. Enable database backups
6. Monitor API usage and performance

Your Eventify backend is now ready for development and testing! 🚀