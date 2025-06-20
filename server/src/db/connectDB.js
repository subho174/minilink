const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
};

module.exports = connectDB;