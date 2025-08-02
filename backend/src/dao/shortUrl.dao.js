import { ShortUrl } from "../models/shorturl.model.js";

export const saveUrl = (url, shortUrl, userId) => {
  const newUrl = new ShortUrl({
    originalUrl: url,
    shortUrl: shortUrl,
  });
  if (userId) {
    newUrl.user = userId;
  }
  newUrl.save();
};

export const getRequestedUrlObj = async (id) => {
  return await ShortUrl.findOneAndUpdate(
    { shortUrl: id },
    { $inc: { clicks: 1 } }
  );
};
