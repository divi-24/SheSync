import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import periodTrackingRoutes from './routes/periodTracking.route.js';
import postRoutes from './routes/post.route.js';
// import authRoutes from './routes/user.route.js';
import spotifyRoutes from './routes/spotify.route.js';
import { clerkMiddleware } from '@clerk/express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow Clerk webhook requests
app.use(
  cors({
    origin: ['https://api.clerk.dev', process.env.FRONTEND_URL || 'http://localhost:5173'],
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
  res.json({ message: 'Server is running' });
});

// Include auth routes for Clerk webhooks
app.use('/api/auth', userRoutes);
app.use('/api/period', periodTrackingRoutes);
app.use('/api/post', postRoutes);
app.use('/api/spotify', spotifyRoutes);
