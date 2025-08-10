const express = require("express");
const Task = require("../Models/Tasks");
const router = express.Router();

router.get("/hod-tasks/:branch", async (req, res) => {
  try {
    const { branch } = req.params;
    const tasks = await Task.find({
      assignTo: "hod",
      department: branch,
      isVisibleToHod: true
    }).select("title desc createdAt");

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching HOD tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
