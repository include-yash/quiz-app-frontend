import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TakeTest = () => {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120 seconds
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock random questions for now
    const mockQuestions = [
      {
        type: "multiple-choice",
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
      },
      {
        type: "true-false",
        question: "The sky is blue.",
        correctAnswer: "true",
      },
      {
        type: "type-answer",
        question: "What is the capital of France?",
        correctAnswer: "Paris",
      },
      {
        type: "multiple-choice",
        question: "What is the capital of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correctAnswer: "Tokyo",
      },
      {
        type: "true-false",
        question: "The earth is flat.",
        correctAnswer: "false",
      },
    ];

    // Simulating fetching random questions by shuffling the mock questions array
    const shuffledQuestions = mockQuestions.sort(() => Math.random() - 0.5);

    // Set random questions (take 3 random questions for the test)
    setQuestions(shuffledQuestions.slice(0, 3));

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate('/student/dashboard'); // Redirect to dashboard after time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset selected answer
    }
  };

  // In TakeTest.jsx, update handleSubmit function:
const handleSubmit = () => {
    // Instead of alert, navigate to SuccessPage
    navigate('/student/success');
  };
  

  // Ensure currentQuestion is defined before rendering
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading questions...</div>; // Display a loading message if no question is available
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Timer Section */}
      <div className="bg-blue-600 text-white text-xl p-3 text-center">
        Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>

      {/* Question Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Question {currentQuestionIndex + 1}</h2>
        <p>{currentQuestion.question}</p>

        {/* Answer Input for different types of questions */}
        {currentQuestion.type === "multiple-choice" && (
          <div className="mt-4">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="radio"
                  id={option}
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={handleAnswerChange}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        )}

        {currentQuestion.type === "true-false" && (
          <div className="mt-4">
            <input
              type="radio"
              id="true"
              name="answer"
              value="true"
              checked={selectedAnswer === "true"}
              onChange={handleAnswerChange}
              className="mr-2"
            />
            <label htmlFor="true">True</label>
            <br />
            <input
              type="radio"
              id="false"
              name="answer"
              value="false"
              checked={selectedAnswer === "false"}
              onChange={handleAnswerChange}
              className="mr-2"
            />
            <label htmlFor="false">False</label>
          </div>
        )}

        {currentQuestion.type === "type-answer" && (
          <div className="mt-4">
            <input
              type="text"
              value={selectedAnswer || ''}
              onChange={handleAnswerChange}
              placeholder="Type your answer here"
              className="p-2 border rounded"
            />
          </div>
        )}

        {/* Next Button or Submit Button for Final Question */}
        <div className="mt-6">
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
