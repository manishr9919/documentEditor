const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // HTML content from CKEditor
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSignup", // Reference to the User model
      required: true,
    },
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("Document", documentSchema);
