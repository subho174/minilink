const rateLimit = require("express-rate-limit");

// Limit to 45 requests per 15 minutes per IP
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 45, // limit each IP to 45 requests per windowMs
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Send RateLimit headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { rateLimiter };
