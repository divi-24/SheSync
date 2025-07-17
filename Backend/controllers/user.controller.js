import { User } from '../models/user.model.js';
import { createUserFromClerkSchema } from '../validators/user.zod.js';

export async function createUserFromClerk(req, res) {
  const validatedData = createUserFromClerkSchema.parse(req.body);

  const { clerkId, name, email } = validatedData;

  if (!clerkId || !name || !email) {
    return res.status(400).json({ message: 'Invalid webhook data' });
  }

  try {
    // Update user if exists
    const existingUser = await User.findOneAndUpdate(
      { clerkId },
      {
        name,
        email,
      }
    );
    if (existingUser) {
      return res.status(200).json({ message: 'User updated successfully' });
    }

    const newUser = await User.create({
      clerkId,
      name,
      email,
    });
    const token = generateToken(newUser.id);

    res.cookie('cookie', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: 'strict',
    });
    res.status(201).json({ message: 'User registered successfully!', userId: newUser.id });
  } catch (error) {
    console.error('Error creating/updating user from Clerk webhook:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function getUserProfile(req, res) {
  try {
    const { userId } = req.auth();

    const userProfile = await User.findOne({ clerkId: userId });
    if (!userProfile) {
      return res.json({ message: 'User not found.' });
    }

    res.status(200).json({
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
