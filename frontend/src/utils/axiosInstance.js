import axios from 'axios';
import config from './config';

const axiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: 10000, // Set a timeout for requests
  withCredentials: true,
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'An unexpected error occurred';

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          errorMessage = data.message || 'Bad request';
          break;
        case 401:
          errorMessage = data.message || 'Unauthorized';
          // Optional: Clear token on 401 and redirect to login
          localStorage.removeItem('accessToken');
          break;
        case 404:
          errorMessage = data.message || 'Resource not found';
          break;
        case 409:
          errorMessage = data.message || 'Conflict occurred';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        default:
          errorMessage = data.message || `Error ${status}`;
      }
    } else if (error.request) {
      // Network error
      errorMessage = 'Network error - please check your connection';
    } else {
      // Request setup error
      errorMessage = error.message;
    }

    // Attach user-friendly message
    error.userMessage = errorMessage;
    return Promise.reject(error);
  }
);

export default axiosInstance;
