const { default: mongoose, Schema } = require("mongoose");

const urlSchema = new Schema(
  {
    originalURL: {
      type: String,
      trim: true,
      required: [true, "Original URL is required"],
    },
    uniqueCode: {
      type: String,
      unique: true,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    lastClickedAt: Date,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      index: { expires: 0 }, // this has created a TTL index , now docs containing expiresAt less than current time, will be auto deleted
      select: false,
    },
  }
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
