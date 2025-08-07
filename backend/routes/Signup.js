const express = require("express");
const router = express.Router();
const Signup = require("../Models/Signup");

// POST /api/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email,password, mobile, designation } = req.body;

    // Create new signup document
    const newUser = new Signup({
      name,
      email,
      password,
      mobile,
      designation,
    });

    // Save to database
    await newUser.save();

    res.json({ message: "User registered successfully" });
    console.log("User registered:", newUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error saving user", error });
  }
});

module.exports = router;
