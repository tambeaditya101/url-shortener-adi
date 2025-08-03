import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { redirectFromShortUrl } from './src/controllers/shortUrl.controller.js';
import { connectDB } from './src/mongo.config.js';
import shortUrlRoute from './src/routes/shortUrl.route.js';
import { errorHandler } from './src/utils/errorHandler.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/create', shortUrlRoute);
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
