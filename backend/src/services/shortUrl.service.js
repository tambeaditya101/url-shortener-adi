import { getShortUrlBySlug, saveUrl } from '../dao/shortUrl.dao.js';
import { generateNanoId } from '../utils/helper.js';

export const createShortUrlServiceWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);
  if (!shortUrl) {
    throw new Error('Short url not generated');
  }
  await saveUrl(url, shortUrl);
  return shortUrl;
};

export const createShortUrlServiceWithUser = async (
  url,
  userId,
  slug = null
) => {
  const shortUrl = slug || generateNanoId(7);
  if (!shortUrl) {
    throw new Error('Short url not generated');
  }
  const exists = await getShortUrlBySlug(shortUrl);
  if (exists) {
    throw new Error('This custom url already exists');
  }
  await saveUrl(url, shortUrl, userId);
  return shortUrl;
};
