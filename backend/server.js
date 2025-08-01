import express from "express";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import { connectDB } from "./src/mongo.config.js";
import { ShortUrl } from "./src/models/shorturl.model.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create", (req, res) => {
  const { url } = req.body;
  const shortUrl = nanoid(6);
  const newUrl = new ShortUrl({
    originalUrl: url,
    shortUrl,
  });
  newUrl.save();
  res.send(`URL created successfully`, newUrl);
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const requestedUrl = await ShortUrl.findOne({ shortUrl: id });
  if (requestedUrl) {
    res.redirect(requestedUrl.originalUrl);
  } else {
    res.status(404).send("Requested url does not exist!");
  }
});

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
