import React, { useState, useEffect } from "react";

const Principle = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignTo, setAssignTo] = useState("himself");
  const [department, setDepartment] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.designation === "Principal") {
      setUser(storedUser);
    } else {
      alert("Access Denied! Only Principal can access this dashboard.");
      window.location.href = "/";
    }
  }, []);

  if (!user) {
    return <div className="p-5 text-center text-gray-600">Loading...</div>;
  }

  const addTask = () => {
    if (!title.trim() || !desc.trim()) {
      alert("Please fill all fields");
      return;
    }
    if (assignTo === "hod" && !department) {
      alert("Please select a department");
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      desc,
      assignTo,
      department: assignTo === "hod" ? department : null,
      status: "Pending",
      hodStatus: null, // this will store the HOD's status
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDesc("");
    setAssignTo("himself");
    setDepartment("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const markComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
  };

  const assignToHOD = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: "Assigned to HOD", hodStatus: "Pending" }
          : task
      )
    );
  };

  const viewHODStatus = (status) => {
    alert(`HOD Status: ${status}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Welcome Card */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600 mt-2">
          Designation: <span className="font-medium">{user.designation}</span>
        </p>
      </div>

      {/* Task Input Card */}
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
                key={task.id}
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
                        onClick={() => markComplete(task.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                      >
                        Mark Complete
                      </button>
                    )}

                  {task.assignTo === "hod" && task.status === "Pending" && (
                    <button
                      onClick={() => assignToHOD(task.id)}
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
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Principle;
