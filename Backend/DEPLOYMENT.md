# Backend Deployment Guide for Render

## Prerequisites
- A Render account
- MongoDB Atlas database
- Clerk authentication setup
- SerpAPI key

## Environment Variables Required

Set these environment variables in your Render dashboard:

### Database Configuration
- `MONGO_URL`: Your MongoDB Atlas connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net`)
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

## Deployment Steps

### Option 1: Using Render Dashboard

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Select the repository containing this backend

2. **Configure Service**
   - **Name**: `shesync-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd Backend && npm install`
   - **Start Command**: `cd Backend && npm start`
   - **Root Directory**: Root (render.yaml is in root directory)

3. **Set Environment Variables**
   - Add all the environment variables listed above
   - Make sure to use your actual values

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

### Option 2: Using render.yaml (Recommended)

1. **Push to Repository**
   - The `render.yaml` file is already configured
   - Push your code to GitHub

2. **Deploy via Render Dashboard**
   - Go to Render Dashboard
   - Click "New +" and select "Blueprint"
   - Connect your repository
   - Render will automatically detect the `render.yaml` file
   - Set your environment variables
   - Deploy

## Health Check

The application includes a health check endpoint at `/health` that returns:
```json
{
  "message": "Server is running"
}
```

## API Endpoints

After deployment, your API will be available at:
- `https://your-service-name.onrender.com/api/`

Available endpoints:
- `GET /health` - Health check
- `GET /api/products` - Get period products
- `POST /api/auth/*` - Authentication routes
- `POST /api/period/*` - Period tracking routes
- `POST /api/post/*` - Post routes
- `POST /api/spotify/*` - Spotify integration routes

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your `MONGO_URL` is correct
   - Ensure your MongoDB Atlas cluster allows connections from Render's IP addresses

2. **CORS Errors**
   - Update `FRONTEND_URL` to match your frontend domain
   - Add your frontend domain to the CORS configuration in `index.js`

3. **Environment Variables**
   - Double-check all environment variables are set correctly
   - Ensure no extra spaces or quotes in the values

### Logs

Check your application logs in the Render dashboard under the "Logs" tab for debugging information.

## Security Notes

- Never commit `.env` files to your repository
- Use Render's environment variable system for sensitive data
- Ensure your MongoDB Atlas cluster has proper security settings
- Use Clerk's webhook verification for authentication
