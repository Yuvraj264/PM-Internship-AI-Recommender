import axios from 'axios';

// Create axios instance with base configuration
const apiConnector = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/auth tokens
});

// Request interceptor - Add auth token to requests
apiConnector.interceptors.request.use(
  (config) => {
    // Get token from localStorage if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiConnector.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const url = error.config?.url || '';
      // Don't redirect for auth-related endpoints (login, signup, sendOTP)
      const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/signup') || url.includes('/auth/sendotp');
      
      switch (error.response.status) {
        case 401:
          // Unauthorized - only redirect if not an auth endpoint
          if (!isAuthEndpoint) {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error('An error occurred:', error.response.data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - please check your connection');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Helper functions for common HTTP methods
export const apiMethods = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await apiConnector.get(url, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status,
      };
    }
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await apiConnector.post(url, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      // Extract error message from response
      const errorData = error.response?.data || {};
      const errorMessage = errorData.message || errorData.error || error.message || 'Request failed';
      
      return {
        success: false,
        error: {
          message: errorMessage,
          data: errorData,
        },
        status: error.response?.status,
      };
    }
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await apiConnector.put(url, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status,
      };
    }
  },

  // PATCH request
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await apiConnector.patch(url, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status,
      };
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await apiConnector.delete(url, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status,
      };
    }
  },
};

// Export the configured axios instance
export default apiConnector;

// Export specific API endpoints for convenience
export const endpoints = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    SEND_OTP: '/auth/sendotp',
    CHANGE_PASSWORD: '/auth/changepassword',
    RESET_PASSWORD_TOKEN: '/auth/reset-password-token',
    RESET_PASSWORD: '/auth/reset-password',
  },
  // Profile endpoints
  PROFILE: {
    GET_USER_DETAILS: '/profile/getUserDetails',
    GET_USER_DETAILS_BY_ID: (userId) => `/profile/getUserDetails/${userId}`,
    UPDATE_PROFILE: '/profile/updateProfile',
    DELETE_PROFILE: '/profile/deleteProfile',
  },
  // Internship endpoints
  INTERNSHIP: {
    CREATE: '/internship/createInternship',
    GET_ALL: '/internship/showAllInternships',
    ENROLL_STUDENT: '/internship/enrollStudent',
    GET_ORGANIZATION_INTERNSHIPS: '/internship/getOrganizationInternships',
    CREATE_CATEGORY: '/internship/createCategory',
    GET_ALL_CATEGORIES: '/internship/showAllCategories',
  },
};

