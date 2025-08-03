import axiosInstance from '../utils/axiosInstance';

export const createShortUrl = async (url) => {
  try {
    const { data } = await axiosInstance.post('/api/create', {
      url,
    });
    return data.shortUrl;
  } catch (error) {
    throw new Error(error.userMessage || 'Failed to create short URL');
  }
};
