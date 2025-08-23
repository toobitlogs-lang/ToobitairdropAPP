import React from "react";
import { useNavigate } from "react-router-dom";

const AskAuth = () => {
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    if (answer === "yes") {
      navigate("/auth"); // or your desired route
    } else {
      navigate("/alternative-setup"); // or another route
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
      {/* Main Card */}
      <div className="w-full max-w-md bg-[#1c1c1e] rounded-2xl shadow-lg p-8 text-center border border-gray-800">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-3">
          Do you have an Authenticator App?
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          For better security, you can use Google Authenticator, Microsoft
          Authenticator, or similar apps.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleAnswer("yes")}
            className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 transition duration-300 font-semibold text-lg"
          >
            Yes
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition duration-300 font-semibold text-lg"
          >
            No
          </button>
        </div>

        {/* Extra Info */}
        <p className="text-gray-500 text-xs mt-6">
          You can always enable this later from settings.
        </p>
      </div>
    </div>
  );
};

export default AskAuth;
