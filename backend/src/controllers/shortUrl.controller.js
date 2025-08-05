import { getRequestedUrlObj } from '../dao/shortUrl.dao.js';
import {
  createShortUrlServiceWithoutUser,
  createShortUrlServiceWithUser,
  getUserUrlsService,
} from '../services/shortUrl.service.js';
import { BadRequestError } from '../utils/errorHandler.js';
import tryCatchWrapper from '../utils/tryCatchWrapper.js';

export const createShortUrl = tryCatchWrapper(async (req, res, next) => {
  let { url, slug } = req.body;
  // Simple validation
  if (!url || !url.trim()) {
    throw new BadRequestError('URL is required');
  }
  if (url.length > 2000) {
    throw new BadRequestError('URL is too long');
  }
  // Fix URL format - but validate first
  if (url.includes('://')) {
    // If it has protocol, check if it's valid
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new BadRequestError('Invalid URL format. Use http:// or https://');
    }
  } else {
    // No protocol, add https
    url = 'https://' + url;
  }

  // Basic format check - must have at least one dot
  if (!url.includes('.') || url.endsWith('://')) {
    throw new BadRequestError('Please enter a valid URL');
  }

  const user = req.user;
  let shortUrl;

  if (user) {
    shortUrl = await createShortUrlServiceWithUser(url, user._id, slug);
    console.log('Service completed, shortUrl:', shortUrl); // Keep this one
  } else {
    shortUrl = await createShortUrlServiceWithoutUser(url);
    console.log('Service completed, shortUrl:', shortUrl); // Keep this one
  }

  res.status(200).json({ shortUrl: `${process.env.BASE_URL}${shortUrl}` });
});

export const redirectFromShortUrl = tryCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const requestedUrlObj = await getRequestedUrlObj(id);

  if (requestedUrlObj) {
    res.redirect(requestedUrlObj.originalUrl);
  } else {
    res.status(404).json({ message: 'Requested url does not exist!' });
  }
});

export const getUserUrls = tryCatchWrapper(async (req, res) => {
  const userId = req.user._id;
  const urls = await getUserUrlsService(userId);
  res.status(200).json({ urls });
});
