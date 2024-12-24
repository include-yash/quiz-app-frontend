import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login validation here
    console.log('Student Login', { email, password });

    // If login is successful, navigate to the dashboard
    navigate('/student/dashboard');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
      <h2 className="text-3xl text-center mb-6">Student Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <a href="/student/signup" className="text-blue-500">Sign up</a>
      </p>
    </div>
  );
}

export default StudentLogin;
