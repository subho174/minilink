const jwt = require("jsonwebtoken");
const User = require("../src/model/user.model");
const ApiError = require("./ApiError");
const options = require("../utils/constants");

// utility function to generate tokens
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

// regenerating token if refreshtoken is available
const refreshTokens = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token)
      return res.status(401).json(new ApiError(401, "Unauthorized request"));

    // if refreshtoken is expired error will be catched in catch block
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // finding user along with checking that refreshtoken sent with req is same as of db or not
    const user = await User.findOne({
      _id: decodedToken._id,
      refreshToken: token,
    });
    if (!user)
      return res.status(401).json(new ApiError(401, "Invalid refresh token"));

    // generating tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    // storing token in db;
    user.refreshToken = refreshToken;
    await user.save();

    // storing fresh tokens in cookie
    res
      .cookie("accessToken", accessToken, {
        ...options,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...options,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

    // storing user details in req for further use
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
