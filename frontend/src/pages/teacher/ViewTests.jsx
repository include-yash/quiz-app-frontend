import { useNavigate } from 'react-router-dom';

function ViewTests() {
  const navigate = useNavigate();

  // Dummy test data (replace with actual test data from an API)
  const tests = [
    { id: 1, name: 'Math Test 1' },
    { id: 2, name: 'Science Test 1' },
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 text-center rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">View Tests</h2>
        <ul className="space-y-4">
          {tests.map(test => (
            <li key={test.id} className="border p-4 rounded-md">
              {test.name}
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate('/teacher/dashboard')}
          className="w-full py-3 mt-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ViewTests;
