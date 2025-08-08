import React, { useEffect, useState } from "react";

const HODDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.designation === "HOD") {
      setUser(storedUser);
    } else {
      alert("Access Denied! Only HODs can access this dashboard.");
      window.location.href = "/";
    }
  }, []);

  if (!user) {
    return <div className="p-5 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-600 mt-2">
          Designation: <span className="font-medium">{user.designation}</span>
        </p>
        <p className="text-gray-600">
          Branch: <span className="font-medium text-blue-600">{user.branch}</span>
        </p>

      </div>
    </div>
  );
};

export default HODDashboard;
