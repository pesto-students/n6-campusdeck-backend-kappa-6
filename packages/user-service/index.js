// importing dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// route
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

// constants go here
const PORT = process.env.PORT || 8040;

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
app.use("/users", userRoutes);

// add greetings for deployed API. this is just for testing whether our API works after deployment
app.get("/", (req, res) => {
  res.send("Welcome to CampusDeck User Service API by Pushpak Bhattacharya");
});

app.listen(PORT, () => console.log(`User Service started on port ${PORT}`));
