import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'; // Confetti package for background effect
import { useWindowSize } from 'react-use'; // Use window size for confetti placement

const SuccessPage = ({ timeTaken, totalQuestions, attemptedQuestions }) => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize(); // Get window size for confetti
  const totalTime = timeTaken || 'N/A'; // Default to 'N/A' if not provided

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/student/dashboard'); // Redirect after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Minimal Confetti effect */}
      <Confetti width={width} height={height} numberOfPieces={100} gravity={0.2} />
      
      {/* Popup Box */}
      <div className="absolute z-20 text-center p-8 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-4xl font-bold text-green-600 mb-4">
          <span role="img" aria-label="checkmark">✔️</span> Success!
        </h2>
        <p className="text-xl text-gray-800 mb-4">You have completed the test.</p>

        <div className="text-lg text-gray-600 mb-4">
          <p><strong>Questions Attempted:</strong> {attemptedQuestions || 0}</p>
          <p><strong>Total Questions:</strong> {totalQuestions || 0}</p>
          <p><strong>Time Taken:</strong> {totalTime} minutes</p>
        </div>

        <p className="text-lg text-gray-600">You will be redirected to your dashboard shortly.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
