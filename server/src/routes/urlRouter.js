const { Router } = require("express");
const {
  createShortUrl,
  redirectToOriginalURL,
  getClickStats,
} = require("../controllers/url.controller");
const verifyJWT = require("../middleware/auth.middleware");

const urlRouter = Router();

urlRouter.get("/:uniqueCode", redirectToOriginalURL);

urlRouter.use(verifyJWT); // applied to all routes below this line

urlRouter.post("/create-short-url", createShortUrl);
urlRouter.get("/analytics/click-stats", getClickStats);

module.exports = urlRouter;
