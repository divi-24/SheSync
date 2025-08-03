import { Post } from '../models/post.model.js';
import { createPostSchema, likePostSchema } from '../validators/post.zod.js';

export async function createPost(req, res) {
  try {
    const { title, category, content } = createPostSchema.parse(req.body);
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    try {
      const newPost = await Post.create({
        title,
        category,
        content,
        author: userId,
      });

      console.log('sent the post', newPost);
      return res.status(200).json({ message: 'Post created successfully', newPost });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to create post' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to create post' });
  }
}

export async function getPosts(_, res) {
  try {
    const posts = await Post.find({ limit: 10 });
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to get posts' });
  }
}

export async function likePost(req, res) {
  try {
    const { id } = likePostSchema.parse(req.params);
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: 'User already liked the post' });
    }

    post.likes.push(userId);
    await post.save();

    return res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
