// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="grid grid-cols-2 gap-8 w-3/4">
        <button
          className="bg-blue-500 text-white p-8 rounded-lg hover:bg-blue-600 transition-all"
          onClick={() => navigate('/student/login')}
        >
          <h2 className="text-2xl font-bold">Student Login</h2>
        </button>
        <button
          className="bg-green-500 text-white p-8 rounded-lg hover:bg-green-600 transition-all"
          onClick={() => navigate('/teacher/login')}
        >
          <h2 className="text-2xl font-bold">Teacher Login</h2>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
