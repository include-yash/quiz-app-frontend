import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [selectedTest, setSelectedTest] = useState(null); // State to store selected test
  const navigate = useNavigate();

  // Mock student profile (you can replace this with dynamic data)
  const studentProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    semester: "6",
    section: "B",
  };

  useEffect(() => {
    // Mock upcoming tests (replace with your API call)
    const mockTests = [
      {
        title: "Math Quiz",
        date: "2024-01-10",
        time: "10:00 AM",
        duration: 30,
        subject: "Mathematics",
      },
      {
        title: "Physics Test",
        date: "2024-01-15",
        time: "12:00 PM",
        duration: 45,
        subject: "Physics",
      },
    ];

    // Set mock data as the upcoming tests
    setUpcomingTests(mockTests);
    setLoading(false);
  }, []);

  const handleAttemptTest = (test) => {
    setSelectedTest(test);
    setShowPopup(true); // Show the popup when a test is selected
  };

  const handleContinue = () => {
    // Redirect to the test-taking page
    navigate('/student/take-test');
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-center mb-6">Student Dashboard</h1>
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Name:</h3>
            <p>{studentProfile.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Email:</h3>
            <p>{studentProfile.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Semester:</h3>
            <p>{studentProfile.semester}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Section:</h3>
            <p>{studentProfile.section}</p>
          </div>
        </div>
      </div>

      {/* Upcoming Tests Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingTests.length > 0 ? (
            upcomingTests.map((test, index) => (
              <div
                key={index}
                className="border p-4 rounded-md shadow-sm bg-gray-50 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{test.title}</h3>
                <p>Date: {test.date}</p>
                <p>Time: {test.time}</p>
                <p>Duration: {test.duration} mins</p>
                <p>Subject: {test.subject}</p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => handleAttemptTest(test)}
                >
                  Attempt Test
                </button>
              </div>
            ))
          ) : (
            <p>No upcoming tests available.</p>
          )}
        </div>
      </div>

      {/* Popup Modal for Test Instructions */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Test Instructions</h3>
            <p className="mb-4">
              Please read the following instructions carefully before attempting the test:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Attempt all questions within the given time.</li>
              <li>No external help is allowed during the test.</li>
              <li>You have 2 minutes to complete the test.</li>
            </ul>
            <div className="flex justify-between items-center">
              <p className="font-semibold">Time: 2:00 mins</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
