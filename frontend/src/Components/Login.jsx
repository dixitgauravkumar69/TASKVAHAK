import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        const role = data.designation;
        const branch = data.branch;
        console.log('Branch:', branch);

        console.log('Role:', role);

        // Store user data in localStorage (optional)
        localStorage.setItem('user', JSON.stringify({
          name: data.name,
          email: data.email,
          designation: role,
          branch: branch,
        }));

        // ✅ Navigate based on role
        if (role === 'HOD') {
          navigate('/hod-dashboard');
        } else if (role === 'Faculty') {
          navigate('/faculty-dashboard');
        } else if (role === 'Principal') {
          navigate('/principal-dashboard');
        } else {
          setMessage('Invalid role or dashboard not set');
        }

        console.log('Login Success:', data);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {message && (
          <div className="mb-4 text-center text-sm text-red-500">{message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
