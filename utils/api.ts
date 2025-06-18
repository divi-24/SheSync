import axios from 'axios';
import { API_ENDPOINTS } from '../config/constants';

// Create axios instance with default configuration
const createApiInstance = (baseURL: string, timeout = 10000) => {
  return axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// API instances for different endpoints
export const serverApi = createApiInstance(API_ENDPOINTS.server, 8000);
export const renderApi = createApiInstance(API_ENDPOINTS.render, 30000);
export const localApi = createApiInstance(API_ENDPOINTS.local, 5000);

// Request interceptor to add auth token
const addAuthInterceptor = (apiInstance: any) => {
  apiInstance.interceptors.request.use(
    async (config: any) => {
      // Get token from Clerk if available
      if (typeof window !== 'undefined' && (window as any).Clerk?.user) {
        try {
          const token = await (window as any).Clerk.user.getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.warn('Failed to get auth token:', error);
        }
      }
      return config;
    },
    (error: any) => Promise.reject(error)
  );
};

// Add auth interceptors to all instances
[serverApi, renderApi, localApi].forEach(addAuthInterceptor);

// Response interceptor for error handling
const addResponseInterceptor = (apiInstance: any) => {
  apiInstance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        console.warn('Unauthorized access - redirecting to login');
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
};

// Add response interceptors to all instances
[serverApi, renderApi, localApi].forEach(addResponseInterceptor);

// Utility function to try multiple endpoints with fallback
export const apiWithFallback = async (endpoint: string, options: any = {}) => {
  const apis = [serverApi, renderApi, localApi];
  const errors: any[] = [];

  for (const api of apis) {
    try {
      console.log(`Attempting request to ${api.defaults.baseURL}${endpoint}`);
      const response = await api.request({
        url: endpoint,
        ...options,
      });
      console.log(`Request successful to ${api.defaults.baseURL}`);
      return response;
    } catch (error: any) {
      console.warn(`Request failed to ${api.defaults.baseURL}:`, error.message);
      errors.push({
        baseURL: api.defaults.baseURL,
        error: error.message,
        status: error.response?.status,
      });
    }
  }

  // If all APIs fail, throw the last error with context
  const errorMessage = `All API endpoints failed:\n${errors
    .map(({ baseURL, error, status }) => `${baseURL}: ${error} (${status || 'Network Error'})`)
    .join('\n')}`;
  
  throw new Error(errorMessage);
};

// Specific API methods
export const periodApi = {
  submitTrackerData: (data: any) => apiWithFallback('/api/period/trackerdata', {
    method: 'POST',
    data,
  }),
  
  getPeriodTracking: (userId: string) => apiWithFallback(`/api/period/periodtracking/${userId}`, {
    method: 'GET',
  }),
  
  updateWaterIntake: (userId: string) => apiWithFallback(`/api/period/waterupdate/${userId}`, {
    method: 'GET',
  }),
};

export const authApi = {
  getUserProfile: () => apiWithFallback('/api/auth/profile', {
    method: 'GET',
  }),
};

export const postApi = {
  createPost: (data: any) => apiWithFallback('/api/post/createPost', {
    method: 'POST',
    data,
  }),
  
  getPosts: () => apiWithFallback('/api/post/getPost', {
    method: 'GET',
  }),
  
  likePost: (id: string) => apiWithFallback(`/api/post/like/${id}`, {
    method: 'GET',
  }),
};