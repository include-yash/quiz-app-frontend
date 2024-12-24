import { useNavigate } from 'react-router-dom';

function TeacherDashboard() {
  const navigate = useNavigate();
  
  // Dummy teacher data (replace with actual data from API or context)
  const teacher = {
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  const handleCreateTest = () => {
    navigate('/teacher/create-test');
  };

  const handleViewTest = () => {
    navigate('/teacher/view-tests');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 text-center rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Teacher Dashboard</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Profile</h3>
          <p className="text-gray-600">Name: {teacher.name}</p>
          <p className="text-gray-600">Email: {teacher.email}</p>
        </div>

        <div className="mb-4 space-y-4">
          <button 
            onClick={handleCreateTest} 
            className="w-full py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Create Test
          </button>

          <button 
            onClick={handleViewTest} 
            className="w-full py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300"
          >
            View Tests
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
