const User = require("../model/user.model");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const { generateAccessAndRefreshToken } = require("../../utils/generateTokens");
const options = require("../../utils/constants");

const signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json(new ApiError(400, "All fields are required"));

  const existingUser = await User.findOne({ email }).select("_id").lean();

  if (existingUser)
    return res.status(400).json(new ApiError(400, "User already exists"));

  const newUser = await User.create({
    email,
    password,
  });

  // generating token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    newUser._id
  );

  // storing token in db
  newUser.refreshToken = refreshToken;
  await newUser.save();

  // setting token as cookie
  return res
    .status(201)
    .cookie("accessToken", accessToken, { ...options, maxAge: 15 * 60 * 1000 }) // 15 mins
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json(new ApiResponse(201, "Registration successsful"));
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json(new ApiError(400, "All fields are required"));

  const existingUser = await User.findOne({ email }).select("password _id");

  if (!existingUser)
    return res
      .status(400)
      .json(new ApiError(400, "User not found. Please Sign Up"));

  // checking password validity
  const isPasswordCorrect = await existingUser.isPasswordCorrect(password);

  if (!isPasswordCorrect)
    return res.status(400).json(new ApiError(400, "Incorrect Password"));

  // generating token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existingUser._id
  );

  // storing token in db
  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  // setting token as cookie
  return res
    .status(200)
    .cookie("accessToken", accessToken, { ...options, maxAge: 15 * 60 * 1000 }) // 15 mins
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json(new ApiResponse(200, "Logged In successsfully"));
});

const logOut = asyncHandler(async (req, res) => {
  // deleting refreshToken from db
  const clearRefreshTokenFromDB = await User.updateOne(
    { _id: req.user._id },
    {
      $unset: { refreshToken: 1 },
    }
  );

  if (clearRefreshTokenFromDB.modifiedCount !== 1)
    return res
      .status(400)
      .json(new ApiError(400, "Failed to delete token from DB"));

  // clearing token from cookie
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "Logged Out successfully"));
});

module.exports = { signUp, signIn, logOut };
