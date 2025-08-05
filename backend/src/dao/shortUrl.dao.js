import { ShortUrl } from '../models/shorturl.model.js';
import { ConflictError } from '../utils/errorHandler.js';

export const saveUrl = async (url, shortUrl, userId) => {
  try {
    const newUrl = new ShortUrl({
      originalUrl: url,
      shortUrl: shortUrl,
    });
    if (userId) {
      newUrl.user = userId;
    }
    const savedUrl = await newUrl.save();
    console.log('url saved');
    return savedUrl;
  } catch (error) {
    if (error.code == 11000) {
      throw new ConflictError('Short URL already exists');
    }
    throw new Error(error);
  }
};

export const getRequestedUrlObj = async (id) => {
  return await ShortUrl.findOneAndUpdate(
    { shortUrl: id },
    { $inc: { clicks: 1 } }
  );
};

export const getShortUrlBySlug = async (slug) => {
  return await ShortUrl.findOne({ shortUrl: slug });
};

export const getUserUrls = async (userId) => {
  return await ShortUrl.find({ user: userId }).sort({ createdAt: -1 });
};
