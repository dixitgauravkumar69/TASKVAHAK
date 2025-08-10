import React, { useEffect, useState } from "react";

const HODDashboard = () => {
  const [username, setUsername] = useState("");
  const [branch, setBranch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false);
  

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.designation === "HOD") {
      setUsername(storedUser.name);
      setBranch(storedUser.branch);
      fetchTasks(storedUser.branch);
    } else {
      alert("Access Denied! Only HODs can access this dashboard.");
      window.location.href = "/";
    }
  }, []);

  const fetchTasks = (branchName) => {
    fetch(`http://localhost:5000/api/tasks/hod-tasks/${branchName}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  

    

  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {username}!
        </h1>

        <p className="text-gray-600 mt-3 text-lg font-semibold">
          Role: Head of Department (HOD)
          <br />
          Department: {branch}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 space-x-3">
          {!showTasks && (
            <button
              onClick={() => setShowTasks(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              See Your Tasks
            </button>
          )}
          
        </div>

       

        {/* Table for tasks */}
        {showTasks && tasks.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Assigned Date</th>
                 
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id} className="text-center">
                    <td className="px-4 py-2 border">{task.title}</td>
                    <td className="px-4 py-2 border">{task.desc}</td>
                    <td className="px-4 py-2 border">
                      {new Date(task.createdAt).toISOString().split("T")[0]}
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showTasks && tasks.length === 0 && (
          <p className="mt-4 text-gray-500">No tasks assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default HODDashboard;
