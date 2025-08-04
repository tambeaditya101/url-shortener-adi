import axiosInstance from '../utils/axiosInstance';

export const createShortUrl = async (url, slug = null) => {
  try {
    const payload = { url };
    if (slug && slug.trim()) {
      payload.slug = slug.trim();
    }

    const { data } = await axiosInstance.post('/api/short-url/create', payload);
    return data.shortUrl;
  } catch (error) {
    throw new Error(error.userMessage || 'Failed to create short URL');
  }
};

export const getUserUrls = async () => {
  try {
    const { data } = await axiosInstance.get('/api/short-url/my-urls');
    return data.urls;
  } catch (error) {
    throw new Error(error.userMessage || 'Failed to get user URLs');
  }
};
