
import { clerkAuth } from './clerkMiddleware.js';

export async function checkUser(req, res, next) {
  
  return clerkAuth(req, res, next);
}
