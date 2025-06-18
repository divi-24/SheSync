import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/blogs",
    "/ecom",
    "/team",
    "/login",
    "/signup",
    "/api/webhooks/(.*)",
  ],
  ignoredRoutes: [
    "/api/webhooks/(.*)",
    "/_next/(.*)",
    "/favicon.ico",
    "/images/(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};