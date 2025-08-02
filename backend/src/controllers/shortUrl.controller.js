import { getRequestedUrlObj } from "../dao/shortUrl.dao.js";
import { createShortUrlServiceWithoutUser } from "../services/shortUrl.service.js";

export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  const shortUrl = await createShortUrlServiceWithoutUser(url);
  res.send(`URL created successfully,${process.env.BASE_URL}${shortUrl}`);
};

export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;
  const requestedUrlObj = await getRequestedUrlObj(id);
  if (requestedUrlObj) {
    res.redirect(requestedUrlObj.originalUrl);
  } else {
    res.status(404).send("Requested url does not exist!");
  }
};
