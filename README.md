# Carthago Food - Food Delivery Platform

A comprehensive food delivery platform built for Moulares, Gafsa, Tunisia. Features multi-role authentication, real-time order tracking, GPS integration, and a complete admin panel.

## 🌟 Features

### Customer Features
- Browse nearby restaurants with GPS filtering
- Real-time order tracking with rider location
- Multiple payment methods (Cash on Delivery, Card payments coming soon)
- Order history and re-ordering
- Multi-language support (Arabic, French, English)
- Rating and review system

### Restaurant Features
- Complete menu management with image support
- Real-time order notifications
- Sales analytics and reports
- Operating hours and delivery settings
- Admin approval system for new restaurants

### Rider Features  
- Order assignment and acceptance system
- GPS navigation and real-time location sharing
- Delivery confirmation with proof
- Earnings tracking and history
- Availability management

### Admin Features
- Comprehensive dashboard with analytics
- User and restaurant management
- Order monitoring and management
- Reports and data export
- System settings and configuration

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Socket.IO Client** - Real-time communication
- **Google Maps API** - Location services

### Backend
- **Node.js & Express** - Server framework
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions
- **Socket.IO** - Real-time notifications
- **JWT** - Authentication
- **Twilio** - SMS services
- **AWS S3** - Image storage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis
- Google Maps API key
- Twilio account (for SMS)

### 1. Clone and Install

```bash
git clone <repository-url>
cd carthago-food
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/carthago_food"
REDIS_URL="redis://localhost:6379"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Services
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
GOOGLE_MAPS_API_KEY="your-maps-api-key"

# Storage
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_S3_BUCKET="your-s3-bucket"

# URLs
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### 3. Database Setup

```bash
# Start PostgreSQL and Redis
# Run database migrations (backend)
cd backend
npm run migrate
npm run seed

# Return to frontend
cd ..
```

### 4. Start Development

```bash
# Start frontend
npm run dev

# In another terminal, start backend
cd backend
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🐳 Docker Deployment

### Quick Start with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build
```

This starts:
- Frontend (Next.js) on port 3000
- Backend (Node.js) on port 3001  
- PostgreSQL on port 5432
- Redis on port 6379
- Nginx reverse proxy on port 80

### Individual Docker Build

```bash
# Build frontend image
docker build -t carthago-food-frontend .

# Build backend image
docker build -t carthago-food-backend ./backend
```

## 📱 Mobile-First Design

The platform is built with a mobile-first approach:

- **Responsive Design**: Works on all screen sizes (320px+)
- **Touch-Friendly**: Large buttons and touch targets
- **PWA Ready**: Add to home screen capability
- **Fast Loading**: Optimized images and lazy loading
- **Offline Support**: Basic offline functionality

## 🌍 Multi-Language Support

Supports three languages:
- **Arabic (العربية)**: RTL layout, Arabic fonts
- **French (Français)**: Standard LTR layout  
- **English**: Default language

Language detection:
1. User preference (saved in localStorage)
2. Browser language
3. Defaults to English

## 🔐 Authentication & Security

### Supported Auth Methods
- **Google OAuth**: Sign in with Google account
- **SMS OTP**: Phone number verification (+216 Tunisia)
- **Email/Password**: Traditional login (fallback)

### Security Features
- JWT token authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting on auth endpoints
- HTTPS enforcement in production

## 📊 Real-Time Features

### Order Tracking
- Live order status updates
- Real-time rider location
- Push notifications
- SMS notifications for critical updates

### Dashboard Updates
- Live order counts
- Real-time earnings
- Instant notifications
- Auto-refresh data

## 🎯 Location Services

### GPS Integration
- **Default Location**: Moulares, Gafsa, Tunisia (34.4667, 8.6667)
- **Geolocation**: Browser GPS permission
- **Address Search**: Google Places Autocomplete
- **Delivery Radius**: Configurable per restaurant
- **Distance Calculation**: Real-time routing

### Supported Areas
Currently focused on:
- **Moulares** (Primary)
- **Gafsa Governorate**
- **Surrounding areas** (within delivery range)

## 💳 Payment System

### Current Payment Methods
- **Cash on Delivery**: Primary payment method
- **Card Payments**: Coming soon (Stripe integration ready)

### Payment Flow
1. Order total calculation (items + delivery + tip)
2. Payment method selection
3. Order confirmation
4. Cash collection on delivery

## 📸 Image Handling

### Supported Formats
- Direct JPG/JPEG URLs
- File upload (JPG, PNG, WebP)
- Automatic image optimization
- S3 storage for uploads

### Image Validation
- File size limits (5MB max)
- Format validation
- URL validation for direct links
- Automatic resizing

## 🔧 API Endpoints

### Authentication
```
POST /auth/google          - Google OAuth login
POST /auth/sms/request-otp - Request SMS OTP
POST /auth/sms/verify-otp  - Verify SMS OTP
POST /auth/login           - Email/password login
POST /auth/register        - User registration
```

### Restaurants
```
GET /restaurants               - List nearby restaurants
GET /restaurants/:id           - Restaurant details
GET /restaurants/:id/menu      - Restaurant menu
POST /restaurants/:id/menu-item - Create menu item
```

### Orders
```
POST /orders              - Create order
GET /orders/:id           - Order details  
GET /orders/history       - Order history
PATCH /orders/:id/status  - Update order status
```

### Admin
```
GET /admin/dashboard      - Dashboard stats
GET /admin/restaurants    - Manage restaurants
GET /admin/orders         - Manage orders
GET /admin/users          - Manage users
```

## 🧪 Testing

### Test Accounts
Default test accounts are created:

**Customers:**
- customer1@test.com / password123
- customer2@test.com / password123

**Restaurant:**
- restaurant@test.com / password123

**Rider:**
- rider@test.com / password123

**Admin:**
- admin@test.com / password123

### Test Data
Seed includes:
- 3 sample restaurants in Moulares
- 15 menu items with images
- Sample categories and modifiers

### Running Tests
```bash
# Unit tests
npm test

# E2E tests  
npm run test:e2e

# Test coverage
npm run test:coverage
```

## 📈 Performance Optimization

### Frontend Optimizations
- Next.js Image Optimization
- Code splitting and lazy loading
- Service Worker for caching
- Font optimization
- Minification and compression

### Backend Optimizations
- Database indexing
- Redis caching
- Connection pooling
- Response compression
- Static file serving

## 🚀 Deployment Options

### Heroku Deployment
```bash
# Create Heroku apps
heroku create carthago-food-frontend
heroku create carthago-food-backend

# Add database
heroku addons:create heroku-postgresql:mini -a carthago-food-backend
heroku addons:create heroku-redis:mini -a carthago-food-backend

# Deploy
git push heroku main
```

### Vercel Deployment (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### DigitalOcean Deployment
- Use Docker Compose on a Droplet
- Set up load balancer
- Configure domain and SSL

## 🛠️ Development Commands

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend
```bash
npm run dev          # Start with nodemon
npm run start        # Start production server
npm run migrate      # Run database migrations
npm run seed         # Seed test data
```

## 📋 Environment Variables

### Required Variables
- `DATABASE_URL` - PostgreSQL connection
- `JWT_SECRET` - JWT signing key
- `TWILIO_ACCOUNT_SID` - SMS service
- `GOOGLE_MAPS_API_KEY` - Maps integration

### Optional Variables
- `REDIS_URL` - Caching (recommended)
- `AWS_*` - File uploads
- `GOOGLE_CLIENT_*` - OAuth login

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Database connection failed:**
- Check PostgreSQL is running
- Verify DATABASE_URL format
- Check firewall settings

**SMS not working:**
- Verify Twilio credentials
- Check phone number format (+216)
- Ensure sufficient Twilio credits

**Maps not loading:**
- Verify Google Maps API key
- Enable required APIs (Maps, Places, Geocoding)
- Check billing account

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Create Pull Request

### Code Standards
- TypeScript for type safety
- ESLint + Prettier for formatting
- Conventional Commits for messages
- Component documentation

## 📞 Support

For issues and questions:
- Create GitHub issue
- Email: support@carthagofood.com
- Phone: +216 XX XXX XXX

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ for Moulares, Gafsa, Tunisia 🇹🇳**