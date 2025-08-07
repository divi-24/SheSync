import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getJson } from 'serpapi';
import { connectDb } from './config/db.js';
import periodTrackingRoutes from './routes/periodTracking.route.js';
import postRoutes from './routes/post.route.js';
// import authRoutes from './routes/user.route.js';
import spotifyRoutes from './routes/spotify.route.js';
import { clerkMiddleware } from '@clerk/express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';

dotenv.config();

// Verify Clerk environment variables are set
if (!process.env.CLERK_SECRET_KEY) {
  console.error('CLERK_SECRET_KEY is not set in environment variables');
  process.exit(1);
}

if (!process.env.CLERK_PUBLISHABLE_KEY) {
  console.error('CLERK_PUBLISHABLE_KEY is not set in environment variables');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow Clerk webhook requests
app.use(
  cors({
    origin: [
      'https://api.clerk.dev',
      process.env.FRONTEND_URL,
      'https://www.shesync.live',
      'http://localhost:5173',
      'http://localhost:5174'
    ].filter(Boolean),
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Svix-Id',
      'Svix-Timestamp',
      'Svix-Signature',
    ],
  })
);


// For Clerk webhooks, we need the raw body
app.use(
  express.json({
    verify: (req, res, buf) => {
      // Make the raw body available for webhook verification
      req.rawBody = buf.toString();
    },
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(clerkMiddleware());

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on : http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

// Server Health Check
app.get('/health', (req, res) => {
  res.json({ 
    message: 'Server is running',
    clerkConfigured: !!(process.env.CLERK_SECRET_KEY && process.env.CLERK_PUBLISHABLE_KEY)
  });
});

// Include auth routes for Clerk webhooks
app.use('/api/auth', userRoutes);
app.use('/api/period', periodTrackingRoutes);
app.use('/api/post', postRoutes);
app.use('/api/spotify', spotifyRoutes);

// Products Fetching
app.get('/api/products', async (req, res) => {
  const query = req.query.q || 'period products';

  try {
    const response = await getJson({
      engine: "google_shopping",
      q: query,
      location: "India",
      hl: "en",
      gl: "in",
      api_key: process.env.VITE_SERPAPI_KEY,
    });

    res.json({ products: response.shopping_results || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch' });
  }
});