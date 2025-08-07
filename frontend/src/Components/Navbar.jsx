import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.png'; 

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
        <span className="text-2xl font-bold">TASKVAHAK</span>
      </div>
      <div className="space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-gray-900 transition">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition">
            Signup
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
