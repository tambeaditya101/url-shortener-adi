import axiosInstance from '../utils/axiosInstance';

export const loginUser = async (email, password) => {
  try {
    const { data } = await axiosInstance.post('/api/auth/login', {
      email,
      password,
    });
    return data;
  } catch (error) {
    throw new Error(error.userMessage || 'Failed to login');
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const { data } = await axiosInstance.post('/api/auth/register', {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    throw new Error(error.userMessage || 'Failed to register');
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axiosInstance.get('/api/auth/me');
    return data;
  } catch (error) {
    throw new Error(error.userMessage || 'Failed to get user');
  }
};
