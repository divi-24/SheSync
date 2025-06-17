import { Clerk } from '@clerk/clerk-sdk-node';

export async function clerkAuth(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const sessionToken = token.split(' ')[1];
    
    const session = await Clerk.verifyToken(sessionToken);
    
    if (!session) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    
    const user = await Clerk.users.getUser(session.sub);
    
    req.user = {
      _id: user.id, 
      clerkId: user.id,
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.emailAddresses[0]?.emailAddress,
    };
    
    next();
  } catch (error) {
    console.error("Error verifying Clerk token:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}