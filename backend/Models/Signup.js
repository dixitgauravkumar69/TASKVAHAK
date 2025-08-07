const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"], 
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
    mobile: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"], 
    },
    designation: {
      type: String,
      enum: ["Faculty", "HOD", "Principal"], 
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Signup", signupSchema);
