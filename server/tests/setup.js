require("dotenv").config();

const { default: mongoose } = require("mongoose");
const connectDB = require("../src/db/connectDB");

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.disconnect();
});
