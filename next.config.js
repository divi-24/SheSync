/** @type {import('next').NextConfig} */
const nextConfig = {
    // Essential for static exports (GitHub Pages)
    output: 'export',

    // Required for static image exports
    images: {
        unoptimized: true, // Disables Next.js image optimization
        domains: [
            'images.pexels.com',
            'pexels.com',
            // Add other domains as needed
        ],
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        VITE_SERVER_URL: process.env.VITE_SERVER_URL,
        VITE_GEMINI_API_KEY: process.env.VITE_GEMINI_API_KEY,
        VITE_GOOGLE_MAPS_API_KEY: process.env.VITE_GOOGLE_MAPS_API_KEY,
    },

    // Optional: For GitHub Pages deployment in a subpath
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}