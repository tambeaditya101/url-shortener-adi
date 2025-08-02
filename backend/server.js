import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/mongo.config.js";
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/create", shortUrlRoute);
app.get("/:id", redirectFromShortUrl);

app.listen(process.env.PORT, () => {
  try {
    connectDB();
    console.log(
      `Server is running on port : http://localhost:${process.env.PORT}`
    );
  } catch (error) {
    console.log("Failed to connect to server", error);
  }
});
