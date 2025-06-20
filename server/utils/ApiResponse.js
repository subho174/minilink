class ApiResponse {
  constructor(statusCode, message = "Success", data = null) {
    (this.statusCode = statusCode),
      (this.data = data),
      (this.message = message);
  }
}

module.exports = ApiResponse;
