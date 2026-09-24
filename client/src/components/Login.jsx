import React, { useState } from 'react';
import API from '../api';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    API.post('/login', { 
      username: username.trim(), 
      pass: password.trim() 
    })
      .then((res) => {
        if (res.data === true) {
          localStorage.setItem('isLoggedIn', 'true');
          onLoginSuccess();
        } else {
          setError('Invalid Admin Email or Password');
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError('Server connection error. Ensure backend is running.');
      });
  };

  return (
    <div className="min-h-screen bg-[#111613] flex items-center justify-center p-4 font-['Roboto',sans-serif]">
      <div className="bg-[#111613] text-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-4 border-[#3366ff]">
        <h2 className="text-3xl font-black mb-2 text-[#3366ff]">Login</h2>
        <p className="text-gray-300 font-medium text-md mb-6">Login to access the bulk mail system.</p>

        {error && (
          <div className="p-3 mb-4 bg-red-950 text-red-300 text-sm font-bold rounded-lg border border-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-lg font-bold text-[#3366ff] mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-[#eaebfe] text-black placeholder-gray-500 rounded-lg outline-none font-medium border-2 border-[#3366ff] focus:ring-2 focus:ring-[#3366ff]"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-bold text-[#3366ff] mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#eaebfe] text-black placeholder-gray-500 rounded-lg outline-none font-medium border-2 border-[#3366ff] focus:ring-2 focus:ring-[#3366ff]"
              required
            />
          </div>

          {/* Login Button: Scales up on hover */}
          <button
            type="submit"
            className="w-full py-3 bg-[#3366ff] text-white font-black rounded-lg transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md uppercase tracking-wider cursor-pointer"
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
}