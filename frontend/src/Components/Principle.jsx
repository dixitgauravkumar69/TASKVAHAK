import React, { useState, useEffect } from "react";
import axios from "axios";

const Principle = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignTo, setAssignTo] = useState("himself");
  const [department, setDepartment] = useState("");
  const [user, setUser] = useState(null);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.designation === "Principal") {
      setUser(storedUser);
      fetchTasks(storedUser.email); 
    } else {
      alert("Access Denied! Only Principal can access this dashboard.");
      window.location.href = "/";
    }
  }, []);

  const fetchTasks = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${email}`);
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
    }
  };

  const addTask = async () => {
    if (!title.trim() || !desc.trim()) {
      alert("Please fill all fields");
      return;
    }
    if (assignTo === "hod" && !department) {
      alert("Please select a department");
      return;
    }
    const newTask = {
      title,
      desc,
      assignTo,
      department: assignTo === "hod" ? department : null,
      status: "Pending",
      hodStatus: null,
      createdBy: user.email,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", newTask);
      setTasks((prev) => [...prev, res.data]);
      setTitle("");
      setDesc("");
      setAssignTo("himself");
      setDepartment("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const removeFromUI = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  } catch (err) {
    console.error("Error deleting task:", err);
    alert("Failed to delete task from server.");
  }
};


  const markComplete = async (id) => {
    try {
      const updated = await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: "Completed" });
      setTasks((prev) => prev.map((task) => (task._id === id ? updated.data : task)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const assignToHOD = async (id) => {
  try {
    const updated = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      status: "Assigned to HOD",
      hodStatus: "Pending",
      isVisibleToHod: true // ✅ Added
    });
    setTasks((prev) => prev.map((task) => (task._id === id ? updated.data : task)));
  } catch (err) {
    console.error("Error assigning task:", err);
  }
};


  const viewHODStatus = (status) => {
    alert(`HOD Status: ${status}`);
  };

  if (!user) {
    return <div className="p-5 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Welcome Card */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600 mt-2">
          Designation: <span className="font-medium">{user.designation}</span>
        </p>
      </div>

      {/* Toggle Report */}
      <div className="max-w-4xl mx-auto mb-4">
        <button
          onClick={() => setShowReport((prev) => !prev)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {showReport ? "Hide Report" : "View All Tasks Report"}
        </button>
      </div>

      {/* Task Input Card */}
      {!showReport && (
        <div className="max-w-3xl mx-auto p-6 font-sans bg-white shadow-md rounded-lg">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <textarea
            placeholder="Task Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>

          <div className="flex gap-6 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="himself"
                checked={assignTo === "himself"}
                onChange={(e) => setAssignTo(e.target.value)}
              />
              <span>Do Myself</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="hod"
                checked={assignTo === "hod"}
                onChange={(e) => setAssignTo(e.target.value)}
              />
              <span>Assign to HODs</span>
            </label>
          </div>

          {assignTo === "hod" && (
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Department</option>
              <option value="CSE & Allied">CSE & Allied</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="EC">EC</option>
              <option value="EE">EE</option>
            </select>
          )}

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </button>

          {/* Task List */}
          <div className="mt-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center">No tasks added yet.</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white shadow-sm rounded-lg p-4 mb-3 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.assignTo === "himself"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.assignTo === "himself" ? "Self" : "HODs"}
                    </span>
                  </div>
                  <p className="text-gray-600">{task.desc}</p>

                  {task.assignTo === "hod" && task.department && (
                    <p className="text-sm text-gray-500 mt-1">
                      Department: {task.department}
                    </p>
                  )}

                  <p
                    className={`mt-2 text-sm font-medium ${
                      task.status === "Pending"
                        ? "text-yellow-600"
                        : task.status === "Completed"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    Status: {task.status}
                  </p>

                  <div className="flex gap-3 mt-3 flex-wrap">
                    {task.assignTo === "himself" &&
                      task.status === "Pending" && (
                        <button
                          onClick={() => markComplete(task._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                        >
                          Mark Complete
                        </button>
                      )}

                    {task.assignTo === "hod" && task.status === "Pending" && (
                      <button
                        onClick={() => assignToHOD(task._id)}
                        className="bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600 transition"
                      >
                        Assign Now
                      </button>
                    )}

                    {task.assignTo === "hod" && task.hodStatus && (
                      <button
                        onClick={() => viewHODStatus(task.hodStatus)}
                        className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition"
                      >
                        View Status
                      </button>
                    )}

                    <button
                      onClick={() => removeFromUI(task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete Task
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Report Table */}
      {showReport && (
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 mt-4">
          <h2 className="text-xl font-bold mb-4">All Tasks Report</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Assign To</th>
                  <th className="border p-2">Department</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">HOD Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="border p-2">{task.title}</td>
                    <td className="border p-2">{task.desc}</td>
                    <td className="border p-2">{task.assignTo}</td>
                    <td className="border p-2">{task.department || "-"}</td>
                    <td className="border p-2">{task.status}</td>
                    <td className="border p-2">{task.hodStatus || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Principle;
