import { getRequestedUrlObj } from '../dao/shortUrl.dao.js';
import {
  createShortUrlServiceWithoutUser,
  createShortUrlServiceWithUser,
} from '../services/shortUrl.service.js';
import tryCatchWrapper from '../utils/tryCatchWrapper.js';

export const createShortUrl = tryCatchWrapper(async (req, res, next) => {
  const { url, slug } = req.body;

  const user = req.user;
  let shortUrl;
  if (user) {
    shortUrl = await createShortUrlServiceWithUser(url, user._id, slug);
    res.status(200).json({ shortUrl: `${process.env.BASE_URL}${shortUrl}` });
  } else {
    shortUrl = await createShortUrlServiceWithoutUser(url);
    res.status(200).json({ shortUrl: `${process.env.BASE_URL}${shortUrl}` });
  }
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
