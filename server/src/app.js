const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const urlRouter = require("./routes/urlRouter");
const { rateLimiter } = require("./middleware/rateLimiter.middleware");

const app = express();

// ensures that application correctly identifies client ip while running behind reverse proxies like render vercel nginx
// important to set rate limiters
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);

app.use("/user", userRouter);
app.use("/url", urlRouter);


module.exports = app;