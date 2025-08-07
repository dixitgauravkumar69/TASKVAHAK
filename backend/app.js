const express = require("express");
const mongoose = require("mongoose");
const signupRoutes = require("./routes/Signup");  // should export a router
const loginRoutes = require("./routes/Login");  // should export a router
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (optional)
mongoose
  .connect("mongodb://localhost:27017/ManPowerControl")
  .then(() => console.log(`ManPowerControl is activated at your local MongoDB`))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api", signupRoutes);  // will make route /api/signup
app.use("/api", loginRoutes);  // will make route /api/login

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
