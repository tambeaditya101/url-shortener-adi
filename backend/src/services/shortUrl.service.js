import { saveUrl } from "../dao/shortUrl.dao.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlServiceWithoutUser = async (url) => {
  const shortUrl = await generateNanoId(7);
  await saveUrl(url, shortUrl);
  return shortUrl;
};

export const createShortUrlServiceWithUser = async (url, userId) => {
  const shortUrl = await generateNanoId(7);
  await saveUrl(url, shortUrl, userId);
  return shortUrl;
};
