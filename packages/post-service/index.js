// importing dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// route
import postRoutes from "./routes/post.js";

const app = express();
dotenv.config();

// constants go here
const PORT = process.env.PORT || 8020;

// since we are sending images in the request body, only allow 30mb of file size
app.use(
  bodyParser.json({
    limit: "5mb",
    extended: true
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true
  })
);

// allow CORS
app.use(cors());
// registering routes
app.use("/post", postRoutes);

// add greetings for deployed API. this is just for testing whether our API works after deployment
app.get("/", (_, res) => {
  res.send("Welcome to CampusDeck Post Service API by Pushpak Bhattacharya");
});

// connect to mongo atlas instance
mongoose
  .connect(process.env.MONGO_ATLAS_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    // when connection to mongodb atlas is sucessfull, start the user service
    app.listen(PORT, () => console.log(`Post Service started on port ${PORT}`));
  })
  .catch(error => console.error(error.message));
