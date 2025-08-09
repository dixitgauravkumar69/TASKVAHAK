const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  assignTo: { type: String, enum: ["himself", "hod"], required: true },
  department: { type: String, default: null },
  status: { type: String, default: "Pending" },
  hodStatus: { type: String, default: null },
  createdBy: { type: String, required: true }, // Principal's ID or email
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
