// Application constants and configuration
export const APP_CONFIG = {
  name: 'SheSync',
  version: '1.0.0',
  description: 'Comprehensive women\'s health and wellness platform',
};

export const API_ENDPOINTS = {
  server: process.env.NEXT_PUBLIC_SERVER_URL || 'https://shesync.onrender.com/',
  local: 'http://localhost:3000/',
  render: 'https://shesync.onrender.com/',
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  EDUCATION: '/blogs',
  SHOP: '/ecom',
  TRACKER: '/tracker',
  DIAGNOSIS: '/partner',
  CONSULTATIONS: '/consultations',
  CHATBOT: '/chatbot',
  SYMPTOM_ANALYZER: '/symptomsanalyzer',
  PARENT_DASHBOARD: '/parents',
  FORUMS: '/forums',
  LOGIN: '/login',
  SIGNUP: '/signup',
  TEAM: '/team',
};

export const EXTERNAL_LINKS = {
  SHARE_JOY: 'https://thepadproject.org/donate/',
  BLISS_GAME: 'https://she-syncgame.vercel.app/',
  NGO_RESOURCES: 'https://www.hercircle.in/engage/wellness/reproductive-health/5-organisations-working-towards-eradicating-period-poverty-2239.html',
};

export const THEME_CONFIG = {
  STORAGE_KEY: 'shesync-theme',
  DEFAULT_THEME: 'light',
};

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
};