import { User } from "../models/userModel.js";

export async function createUserFromClerk(req, res) {
  const { data } = req.body;
  
  if (!data || !data.id) {
    return res.status(400).json({ message: "Invalid webhook data" });
  }
  
  try {
    const existingUser = await User.findOne({ clerkId: data.id });
    if (existingUser) {
      existingUser.name = `${data.first_name || ''} ${data.last_name || ''}`.trim();
      existingUser.email = data.email_addresses[0]?.email_address;
      await existingUser.save();
      return res.status(200).json({ message: "User updated successfully" });
    }
    
    const newUser = new User({
      clerkId: data.id,
      name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      email: data.email_addresses[0]?.email_address,
    });
    
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating/updating user from Clerk webhook:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getUserProfile(req, res) {
  try {
    const { _id, name, email } = req.user;
    
    return res.status(200).json({
      user: {
        id: _id,
        name,
        email,
      }
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
