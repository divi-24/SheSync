import { z } from 'zod';
export const createUserFromClerkSchema = z.object({
  clerkId: z.string().nonempty('Clerk ID is required'),
  name: z.string().nonempty('Name is required'),
  email: z.string().email().nonempty('Email is required'),
});

export const getUserProfileSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ID format (expected MongoDB ObjectId)')
  .nonempty('User Id is required');
