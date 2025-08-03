import { Router } from 'express';
import { createUserFromClerk, getUserProfile } from '../controllers/user.controller.js';
import { requireAuth } from '@clerk/express';
// import { setUser } from '../middlewares/user.middlewares.js';

const userRoutes = Router();

// Webhook endpoint for Clerk user creation/updates
userRoutes.post('/clerk-webhook', createUserFromClerk);

// Get user profile (requires authentication)
userRoutes.get('/profile', requireAuth(), getUserProfile);

// Set user in the requests
// userRoutes.get('/profile/:id', setUser);

export default userRoutes;
