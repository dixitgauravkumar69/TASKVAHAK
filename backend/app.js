const express = require("express");
const mongoose = require("mongoose");
const signupRoutes = require("./routes/Signup");  
const loginRoutes = require("./routes/Login");  
const taskRoute=require("./routes/Principle_Task");


const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB 
mongoose
  .connect("mongodb://localhost:27017/ManPowerControl")
  .then(() => console.log(`ManPowerControl is activated at your local MongoDB`))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api", signupRoutes);  
app.use("/api", loginRoutes);  
app.use("/api/tasks", taskRoute);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
