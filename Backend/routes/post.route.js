import express from 'express';
import { getPosts, createPost, likePost } from '../controllers/post.controller.js';
// import {clerkAuth} from "../middlewares/clerkMiddleware.js";
import { requireAuth } from '@clerk/express';

const postRoutes = express.Router();

postRoutes.get('/post-health', (req, res) => {
  res.send('Post service is running');
});

postRoutes.post('/createPost', requireAuth(), createPost);
postRoutes.get('/getPost', requireAuth(), getPosts);
postRoutes.get('/like/:id', requireAuth(), likePost);

export default postRoutes;
