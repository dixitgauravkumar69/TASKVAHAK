const express = require("express");
const router = express.Router();
const Signup = require("../Models/Signup");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password (plaintext check – not secure for production)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Success: include designation in response
    console.log("User logged in:", user);

    res.json({
      message: "Login successful",
      name: user.name,
      designation: user.designation, // include this
      branch: user.branch,
      email: user.email
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
