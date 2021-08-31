// importing dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

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

// add greetings for deployed API. this is just for testing whether our API works after deployment
app.get("/", (req, res) => {
  res.send("Welcome to CampusDeck Space Service API by Pushpak Bhattacharya");
});

app.listen(PORT, () => console.log(`Space Service started on port ${PORT}`));
