import { ShortUrl } from "../models/shorturl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveUrl = async (url, shortUrl, userId) => {
  try {
    const newUrl = new ShortUrl({
      originalUrl: url,
      shortUrl: shortUrl,
    });
    if (userId) {
      newUrl.user = userId;
    }
    await newUrl.save();
  } catch (error) {
    if (error.code == 11000) {
      throw new ConflictError("Short URL already exists");
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
