import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router for navigation

const CreateTest = () => {
    const [testName, setTestName] = useState('');
    const [testID] = useState(Math.random().toString(36).substring(2, 12).toUpperCase());
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [section, setSection] = useState('');
    const [timer, setTimer] = useState(0); // Timer state to store the time in minutes

    const navigate = useNavigate();

    const handleNavigate = () => {
        if (!testName || !department || !semester || !section || timer === 0) {
            alert("Please fill in all fields before proceeding.");
            return;
        }
        // Navigate to the Create Questions page with state
        navigate('/teacher/create-questions', {
            state: { testName, testID, department, semester, section, timer },
        });
    };

    // Functions to increment timer by specific values
    const addTime = (minutes) => {
        setTimer((prevTime) => prevTime + minutes);
    };

    // Function to reset the timer
    const resetTimer = () => {
        setTimer(0);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <header className="w-full text-center py-4 bg-blue-600 text-white">
                <h1 className="text-2xl font-bold">{testName || "Quiz Name Placeholder"}</h1>
            </header>

            <div className="w-full max-w-2xl mt-6 space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-semibold">Quiz Name:</label>
                    <input
                        type="text"
                        placeholder="Enter Quiz Name"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-semibold">Department:</label>
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Department</option>
                        <option value="ISE">ISE</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="AIML">AIML</option>
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-semibold">Semester:</label>
                    <select
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Semester</option>
                        {[...Array(8)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-semibold">Section:</label>
                    <select
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Section</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-lg font-semibold">Timer (in minutes):</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            value={timer}
                            readOnly
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={() => addTime(10)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                +10 min
                            </button>
                            <button
                                onClick={() => addTime(15)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                +15 min
                            </button>
                            <button
                                onClick={() => addTime(30)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                +30 min
                            </button>
                            <button
                                onClick={() => addTime(60)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                +60 min
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={resetTimer}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Reset Timer
                    </button>
                </div>

                <p className="text-lg font-semibold">
                    <strong>Quiz ID:</strong> {testID}
                </p>

                <button
                    onClick={handleNavigate}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                    Go to Create Questions
                </button>
            </div>
        </div>
    );
};

export default CreateTest;
