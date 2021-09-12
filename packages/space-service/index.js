// importing dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// route
import spaceRoutes from "./routes/space.js";

const app = express();
dotenv.config();

// constants go here
const PORT = process.env.PORT || 8030;

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
app.use("/space", spaceRoutes);

// add greetings for deployed API. this is just for testing whether our API works after deployment
app.get("/", (req, res) => {
  res.send("Welcome to CampusDeck Space Service API by Pushpak Bhattacharya");
});

// connect to mongo atlas instance
mongoose
  .connect(process.env.MONGO_ATLAS_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    // when connection to mongodb atlas is sucessfull, start the user service
    app.listen(PORT, () =>
      console.log(`Space Service started on port ${PORT}`)
    );
  })
  .catch(error => console.error(error.message));
