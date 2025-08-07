import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import HODDashboard from './Components/HODDashboard';
import FacultyDashboard from './Components/FacultyDashboard';
import Principle from './Components/Principle';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/hod-dashboard" element={<HODDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/principal-dashboard" element={<Principle />} />
      </Routes>
    </Router>
  );
}

export default App;
