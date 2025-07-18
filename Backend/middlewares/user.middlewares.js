// import { clerkAuth } from './auth.middlewares.js';
// import { User } from '../models/user.model.js';

// export async function checkUser(req, res, next) {
//   return clerkAuth(req, res, next);
// }

// export async function setUser(req, res) {
//   const userId = req.params.id;

//   if (!userId) {
//     return res.status(401).json({ message: 'User Id is required' });
//   }

//   try {
//     const user = await User.findById(userId);

//       if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//       }

//       req.user = user;
//       return res.status(200).json({ user });
//   } catch (error) {
//       console.error('Error fetching user profile:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//   }
// }

// import jwt from 'jsonwebtoken';

// const JWT_SECRET="123456";

// export const authenticateToken = (req, res, next) => {

//   const token = req.cookies.cookie;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided.' });
//   }
//   console.log("<>Token<>", token)
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.userId = decoded.id;
//     console.log("<>Decoded<>", decoded)
//     console.log("<>User Id<>", req.userId)
//     next();
//   } catch (error) {
//     console.log("<>Error<>", error)
//     if (error instanceof jwt.TokenExpiredError) {
//       return res.status(401).json({ message: 'Unauthorized: Token expired.' });
//     }
//     if (error instanceof jwt.JsonWebTokenError) {
//       console.log("<>jwt<>", jwt)
//       return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
//     }
//     console.error('Authentication error:<><> ', error);
//     return res.status(500).json({ message: 'Internal server error during authentication.' });
//   }
// };
