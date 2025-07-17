import z from 'zod';

export const postSchema = z.object({
  title: z.string(),
  category: z.string(),
  content: z.string(),
  author: z.string(),
  likes: z.array(z.string()),
});

export const createPostSchema = z.object({
  title: z.string().nonempty('Title is required'),
  category: z.string().nonempty('Category is required'),
  content: z.string().nonempty('Content is required'),
});

export const likePostSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ID format (expected MongoDB ObjectId)')
  .nonempty('User Id is required');
