// custom error class to return consistent api error with statusCode
class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessage = message;
    this.errors = errors;
  }
}

module.exports = ApiError;
