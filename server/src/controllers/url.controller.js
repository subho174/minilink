const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const crypto = require("crypto");
const { nanoid } = require("nanoid");
const URL = require("../model/url.model");
const ApiResponse = require("../../utils/ApiResponse");

const createShortUrl = asyncHandler(async (req, res) => {
  const { originalURL, customCode } = req.body;

  if (!originalURL)
    return res.status(400).json(new ApiError(400, "Long URL is required"));

  let doesAlreadyExistAsUrl = 1,
    uniqueCode;

  while (doesAlreadyExistAsUrl) {
    uniqueCode = customCode || nanoid(6);

    doesAlreadyExistAsUrl = await URL.countDocuments({ uniqueCode });
    if (customCode && doesAlreadyExistAsUrl)
      return res
        .status(400)
        .json(new ApiError(400, "URL with this Custom Alias already exists"));
  }

  const storeURLs = await URL.create({
    uniqueCode,
    originalURL,
    createdBy: req.user._id,
  });

  if (!storeURLs)
    return res
      .status(400)
      .json(new ApiError(400, "Failed to create short url"));

  return res
    .status(201)
    .json(new ApiResponse(201, "Created Short URL successfully", storeURLs));
});

const redirectToOriginalURL = asyncHandler(async (req, res) => {
  const { uniqueCode } = req.params;

  const doesURLexist = await URL.findOneAndUpdate(
    { uniqueCode },
    { $inc: { clickCount: 1 }, $set: { lastClickedAt: new Date() } },
    { new: true, lean: true }
  ).select("originalURL");

  if (!doesURLexist)
    return res.status(404).json(new ApiError(404, "No existing URL found"));

  return res.redirect(doesURLexist.originalURL);
});

const getClickStats = asyncHandler(async (req, res) => {
  const clickStatsForURLs = await URL.find({ createdBy: req.user._id })
    .select("+expiresAt")
    .sort({ expiresAt: -1 })
    .lean();
    
  if (!clickStatsForURLs)
    return res.status(404).json(new ApiError(404, "No Short URL stats found"));

  return res
    .status(200)
    .json(new ApiResponse(200, "Short URL stats found", clickStatsForURLs));
});

module.exports = { createShortUrl, redirectToOriginalURL, getClickStats };
