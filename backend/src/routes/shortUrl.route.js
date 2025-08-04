import express from 'express';
import {
  createShortUrl,
  getUserUrls,
} from '../controllers/shortUrl.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', createShortUrl);
router.get('/my-urls', authMiddleware, getUserUrls);

export default router;
