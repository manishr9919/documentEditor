const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const signupModel = mongoose.model("UserSignup", signUpSchema);

module.exports = signupModel;
