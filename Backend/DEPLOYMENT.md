# Backend Deployment Guide for Render

## Prerequisites
- A Render account
- MongoDB Atlas database
- Clerk authentication setup
- SerpAPI key

## Environment Variables Required

Set these environment variables in your Render dashboard:

### Database Configuration
- `MONGO_URL`: Your MongoDB Atlas connection string 
- `APP_NAME`: Your database name (e.g., `shesync`)

### Server Configuration
- `PORT`: Port number (default: 3000)
- `NODE_ENV`: Environment (set to `production`)

### Frontend Configuration
- `FRONTEND_URL`: Your frontend application URL (for CORS)

### API Keys
- `VITE_SERPAPI_KEY`: Your SerpAPI key for product search functionality

### Clerk Authentication
- `CLERK_SECRET_KEY`: Your Clerk secret key
- `CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key

