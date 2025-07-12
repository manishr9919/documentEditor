const express = require("express");
const bcrypt = require("bcrypt");
const signupModel = require("../model/user.signup"); // Adjust the path to your schema file

const signupRouter = express.Router();

signupRouter.post("/registration", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    // Check if the user already exists
    const existingUser = await signupModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password
    const saltRounds = 10; // Adjust salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new signupModel({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful!", newUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = signupRouter;
