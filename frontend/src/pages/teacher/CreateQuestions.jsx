import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const CreateQuestions = () => {
    const location = useLocation();
    const { testName, testID, department, semester, section } = location.state || {};

    const [showPopup, setShowPopup] = useState(false);
    const [questionType, setQuestionType] = useState(''); // To track selected question type
    const [questions, setQuestions] = useState([]); // Store all created questions

    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState(null); // Index of correct option for MCQ
    const [trueFalseAnswer, setTrueFalseAnswer] = useState(null); // Correct answer for True/False

    // Reset form when popup is closed
    const resetForm = () => {
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectOption(null);
        setTrueFalseAnswer(null);
        setQuestionType('');
    };

    const handleSaveQuestion = () => {
        const newQuestion = {
            type: questionType,
            question: questionText,
            ...(questionType === 'mcq' && { options, correctOption }),
            ...(questionType === 'true-false' && { correctAnswer: trueFalseAnswer }),
        };

        setQuestions([...questions, newQuestion]);
        setShowPopup(false);
        resetForm();
    };

    const isFormValid = () => {
        if (!questionText) return false;

        if (questionType === 'mcq') {
            return options.every((opt) => opt.trim() !== '') && correctOption !== null;
        }

        if (questionType === 'true-false') {
            return trueFalseAnswer !== null;
        }

        if (questionType === 'type-answer') {
            return questionText.trim() !== '';
        }

        return false;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <header className="w-full text-center py-4 bg-blue-600 text-white">
                <h1 className="text-2xl font-bold">Create Questions for {testName}</h1>
                <p>
                    <strong>Department:</strong> {department} | <strong>Semester:</strong> {semester} |{' '}
                    <strong>Section:</strong> {section} | <strong>Quiz ID:</strong> {testID}
                </p>
            </header>

            <div className="w-full max-w-2xl mt-6 space-y-4">
                {/* Button to Add a Question */}
                <button
                    onClick={() => setShowPopup(true)}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                    Add Question
                </button>

                {/* Display Created Questions */}
                {questions.length > 0 && (
                    <div className="mt-4 space-y-2">
                        <h2 className="text-lg font-semibold">Created Questions:</h2>
                        <ul className="space-y-2">
                            {questions.map((q, index) => (
                                <li key={index} className="p-2 border rounded-md bg-gray-100">
                                    <strong>{q.type.toUpperCase()}:</strong> {q.question}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Popup for Adding a Question */}
                {showPopup && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 w-full max-w-lg space-y-4">
                            <h2 className="text-lg font-semibold">Add a Question</h2>
                            {/* Question Type Selector */}
                            <div>
                                <label className="font-medium">Select Question Type:</label>
                                <select
                                    value={questionType}
                                    onChange={(e) => setQuestionType(e.target.value)}
                                    className="w-full mt-1 p-2 border rounded-md"
                                >
                                    <option value="">Select Type</option>
                                    <option value="mcq">Multiple Choice</option>
                                    <option value="true-false">True/False</option>
                                    <option value="type-answer">Type Answer</option>
                                </select>
                            </div>

                            {/* Question Form */}
                            {questionType && (
                                <div>
                                    <label className="font-medium">Question:</label>
                                    <input
                                        type="text"
                                        value={questionText}
                                        onChange={(e) => setQuestionText(e.target.value)}
                                        placeholder="Enter the question"
                                        className="w-full mt-1 p-2 border rounded-md"
                                    />
                                </div>
                            )}

                            {/* Multiple Choice Question Form */}
                            {questionType === 'mcq' && (
                                <div className="space-y-2">
                                    <h3 className="font-medium">Options:</h3>
                                    {options.map((option, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) =>
                                                    setOptions((prev) =>
                                                        prev.map((opt, i) =>
                                                            i === index ? e.target.value : opt
                                                        )
                                                    )
                                                }
                                                placeholder={`Option ${index + 1}`}
                                                className="flex-1 p-2 border rounded-md"
                                            />
                                            <input
                                                type="radio"
                                                name="correctOption"
                                                checked={correctOption === index}
                                                onChange={() => setCorrectOption(index)}
                                                className="h-5 w-5"
                                            />
                                            <label>Correct</label>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* True/False Question Form */}
                            {questionType === 'true-false' && (
                                <div className="space-y-2">
                                    <h3 className="font-medium">Select Correct Answer:</h3>
                                    <div className="flex items-center space-x-4">
                                        <label>
                                            <input
                                                type="radio"
                                                name="trueFalse"
                                                value="true"
                                                checked={trueFalseAnswer === true}
                                                onChange={() => setTrueFalseAnswer(true)}
                                                className="h-5 w-5"
                                            />
                                            True
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="trueFalse"
                                                value="false"
                                                checked={trueFalseAnswer === false}
                                                onChange={() => setTrueFalseAnswer(false)}
                                                className="h-5 w-5"
                                            />
                                            False
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Type Answer Question Form */}
                            {questionType === 'type-answer' && (
                                <p className="text-sm text-gray-500">Simply enter the question above.</p>
                            )}

                            {/* Save and Close Buttons */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => {
                                        setShowPopup(false);
                                        resetForm();
                                    }}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                {isFormValid() && (
                                    <button
                                        onClick={handleSaveQuestion}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateQuestions;
