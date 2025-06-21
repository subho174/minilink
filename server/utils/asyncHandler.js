// try catch wrapper 
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error(error);
  }
};

module.exports = asyncHandler;
