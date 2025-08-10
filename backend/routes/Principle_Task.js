const express = require("express");
const router = express.Router();
const Task = require("../Models/Tasks");

// Create task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body); // Ensure isVisibleToHod defaults false unless set
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error saving task", error });
  }
});

// Get all tasks created by a specific user (Principal)
router.get("/:createdBy", async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.params.createdBy });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

// Get tasks for HOD (only visible ones for their department)
router.get("/hod-tasks/:branch", async (req, res) => {
  try {
    const tasks = await Task.find({
      assignTo: "hod",
      department: req.params.branch,
      isVisibleToHod: true
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching HOD tasks", error });
  }
});

// Update task (general purpose)
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

// Assign Now — Principal makes task visible to HOD
router.put("/assignnow/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { isVisibleToHod: true },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task assigned to HOD", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error assigning task", error });
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

module.exports = router;
