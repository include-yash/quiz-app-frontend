// src/pages/teacher/TeacherLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Teacher Login:', { email, password });
    // Handle login logic and redirect
    navigate('/teacher/dashboard');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 text-center rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Teacher Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <button type="submit" className="w-full p-3 bg-green-500 text-white rounded-md">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <a href="/teacher/signup" className="text-green-500">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default TeacherLogin;
