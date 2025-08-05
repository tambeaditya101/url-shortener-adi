import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './src/config/mongo.config.js';
import { redirectFromShortUrl } from './src/controllers/shortUrl.controller.js';
import authRoute from './src/routes/auth.route.js';
import shortUrlRoute from './src/routes/shortUrl.route.js';
import { attachUser } from './src/utils/attachUser.js';
import { errorHandler } from './src/utils/errorHandler.js';
dotenv.config();

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachUser);

app.use('/api/auth', authRoute);
app.use('/api/short-url', shortUrlRoute);
app.get('/:id', redirectFromShortUrl);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  try {
    connectDB();
    console.log(
      `Server is running on port : http://localhost:${process.env.PORT}`
    );
  } catch (error) {
    console.log('Failed to connect to server', error);
  }
});
