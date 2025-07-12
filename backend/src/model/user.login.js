const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const loginModel = mongoose.model("UserLogin", loginSchema);
module.exports = loginModel;
