const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./src/routes/userRouter");
const connectDB = require("./src/db/connectDB");
const urlRouter = require("./src/routes/urlRouter");
const { rateLimiter } = require("./src/middleware/rateLimiter.middleware");

const app = express();
require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://minilink.onrender.com"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);

app.use("/user", userRouter);
app.use("/url", urlRouter);

connectDB();

app.listen(process.env.PORT || 7000, () => {
  console.log("Server is running at PORT", process.env.PORT || 7000);
});
