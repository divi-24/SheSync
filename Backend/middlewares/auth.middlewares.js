// import { clerkClient } from '@clerk/express';

// import {  getAuth  } from '@clerk/express';

// export default async function clerkAuth(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Authentication required' });
//   }

//   try {
//     const sessionToken = token.split(' ')[1];

//     const session = await auth(req);

//     if (!session) {
//       return res.status(401).json({ message: 'Invalid or expired token' });
//     }

//     const user = await clerkClient.users.getUser(session.userId);

//     req.user = {
//       _id: user.id,
//       clerkId: user.id,
//       name: `${user.firstName} ${user.lastName}`.trim(),
//       email: user.emailAddresses[0]?.emailAddress,
//     };

//     return next(user);
//   } catch (error) {
//     console.error('Error verifying Clerk token:', error);
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// }

// export default function checkAuth(req, res, next) {

//   const auth = getAuth(req);
//   console.log("checking if session exists");

//   if (!auth) {
//     console.log("session does not exist");
//     return res.status(401).json({ message: 'Authentication required' });
//   }
//   console.log("session exists");
//   return next();
// }
