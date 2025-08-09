import React, { useEffect, useState } from "react";

const HODDashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [remarks, setRemarks] = useState({}); // store remark per task
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.designation === "HOD") {
      setUser(storedUser);
      fetchTasks(storedUser._id);
    } else {
      alert("Access Denied! Only HODs can access this dashboard.");
      window.location.href = "/";
    }
  }, []);

  
  if (loading) return <div className="p-5 text-center">Loading tasks...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome, {user?.name} ({user?.branch} Branch)
        </h1>

      </div>
    </div>
  );
};

export default HODDashboard;
