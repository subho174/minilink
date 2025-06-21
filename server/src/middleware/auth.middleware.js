const jwt = require("jsonwebtoken");
const ApiError = require("../../utils/ApiError");
const asyncHandler = require("../../utils/asyncHandler");
const User = require("../model/user.model");
const { refreshTokens } = require("../../utils/generateTokens");

// middleware  to check authenticity of user before accessing any route
const verifyJWT = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) return await refreshTokens(req, res, next); // generating new tokens silently to letting user continue without logging in again

    // if accessToken is expired, error will be catched in catch block, there tokens wil be regenerated if refreshtoken is avilabkle
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user)
      return res.status(401).json(new ApiError(401, "Invaild access token"));

    // adding user details, in req.user to use in further requests
    req.user = user;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") refreshTokens(req, res, next);
    else console.error(error);
  }
};

module.exports = verifyJWT;
