const jwt = require("jsonwebtoken");
const User = require("../src/model/user.model");
const ApiError = require("./ApiError");

const options = process.env.options;

const generateAccessAndRefreshToken = async function (userId) {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw new Error("Token generation failed");
  }
};

const refreshTokens = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token)
      return res.status(401).json(new ApiError(401, "Unauthorized request"));
    
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findOne({
      _id: decodedToken._id,
      refreshToken: token,
    });
    if (!user)
      return res.status(401).json(new ApiError(401, "Invalid refresh token"));

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    user.refreshToken = refreshToken;
    await user.save();
    
    res
      .cookie("accessToken", accessToken, {
        ...options,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...options,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    req.user = user;
    next();
  } catch (error) {
    console.error(error);

    return res
      .status(401)
      .json(new ApiError(401, "Token expired. Please Login again"));
  }
};
module.exports = { generateAccessAndRefreshToken, refreshTokens };
