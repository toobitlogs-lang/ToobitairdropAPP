import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const Claim = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClaim = () => {
    navigate("/wallet");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={300}
        gravity={0.3}
      />

      {/* Content */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-bounce">
        🎉 You’ve Won <span className="text-yellow-400">15,000 USDT</span>! 🎉
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8">
        Congratulations! Claim your reward now.
      </p>

      {/* Claim Button */}
      <button
        onClick={handleClaim}
        className="bg-yellow-400 text-black font-bold text-xl px-10 py-4 rounded-full shadow-xl hover:bg-yellow-500 hover:scale-105 transform transition-all duration-300"
      >
        Claim
      </button>
    </div>
  );
};

export default Claim;
