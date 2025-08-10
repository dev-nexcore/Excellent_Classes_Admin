"use client";
import axios from 'axios';
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Mount animation for mobile layout
  useEffect(() => {
    setMounted(true);
  }, []);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setErrorMsg("");

  //   // Simulate a client-side login process
  //   await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  //   if (email === "admin@example.com" && password === "password") {
  //     // Simulate successful login
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const callbackUrl = urlParams.get("callbackUrl") || "/dashboard";
  //     window.location.href = callbackUrl; // Client-side navigation
  //   } else {
  //     setErrorMsg("Invalid email or password.");
  //   }

  //   setLoading(false);
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5001/api/admin/auth/login', { email, password }); // ✅ Ensure correct route
      const { token } = res.data;

      // Store token locally (could be cookie instead)
      localStorage.setItem('token', token);

      // Redirect to dashboard or admin page
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-[#233B77] overflow-hidden"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 w-full h-full bg-white shadow-2xl overflow-hidden">
        {/* Left Section */}
        <div className="bg-[#233B77] text-white flex flex-col justify-center items-center relative px-6 py-10">
          {/* Content Container */}
          <div
            className={`flex flex-col items-center gap-6 w-full max-w-md mx-auto transition-all duration-1000 ease-out ${
              mounted
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            {/* Logo */}
            <div
              className={`transition-all duration-700 delay-300 ease-out transform ${
                mounted
                  ? "scale-100 opacity-100 rotate-0"
                  : "scale-75 opacity-0 rotate-12"
              }`}
            >
              <Image
                src="/images/exlogo.png"
                alt="Excellent Classes Logo"
                width={240}
                height={120}
                className="object-contain hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            {/* Illustration */}
            <div
              className={`transition-all duration-700 delay-500 ease-out transform ${
                mounted ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            >
              <Image
                src="/images/classroom.png"
                alt="Classroom Illustration"
                width={300}
                height={260}
                className="object-contain hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            {/* Tagline */}
            <p
              className={`text-[#E85222] text-2xl text-center mt-4 transition-all duration-700 delay-700 ease-out ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {"Please Login to manage the website."}
            </p>
          </div>
          {/* Bottom Orange Bar */}
          <div
            className={`absolute bottom-0 left-0 w-full h-14 bg-[#E85222] transition-all duration-1000 delay-200 ease-out ${
              mounted
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          />
        </div>
        {/* Right Section */}
        <div className="bg-white flex items-center justify-center px-4 md:px-10 py-16">
          <div
            className={`w-full max-w-xl bg-white p-6 sm:p-10 transition-all duration-1000 ease-out ${
              mounted
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <h2
              className={`text-3xl font-bold text-center mb-12 sm:mb-14 transition-all duration-700 delay-200 ease-out ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-8 opacity-0"
              }`}
            >
              {"Welcome to Excellent Classes"}
            </h2>
            <form
              onSubmit={handleLogin}
              className={`w-full flex flex-col gap-4 transition-all duration-700 delay-400 ease-out ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
            >
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-lg font-bold mb-2">
                  {"Enter Email ID"}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email ID"
                  required
                  className="w-full bg-[#f4faff] px-4 py-3 rounded-md shadow-md focus:border-2 focus:border-[#233B77] focus:outline-none transition-all duration-300 ease-in-out transform focus:scale-[1.02] hover:shadow-lg"
                />
              </div>
              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-lg font-bold mb-2"
                >
                  {"Enter Password"}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                  className="w-full bg-[#f4faff] px-4 py-3 rounded-md shadow-md focus:border-2 focus:border-[#233B77] focus:outline-none transition-all duration-300 ease-in-out transform focus:scale-[1.02] hover:shadow-lg"
                />
                {/* Forgot Password Link */}
                <div className="text-right mt-2">
                  <a
                    href="/forgetpassword"
                    className="text-[#E85222] text-base font-medium hover:underline transition-colors duration-200"
                  >
                    {"Forgot Password ?"}
                  </a>
                </div>
              </div>
              {/* Error Message */}
              {error && (
                <div className="text-red-600 text-sm font-semibold text-center animate-fadeInUp">
                  {error}
                </div>
              )}
              {/* Button Wrapper to Center the Button */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-[150px] bg-[#233B77] cursor-pointer text-white py-3 rounded-md hover:bg-[#16294A] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 text-center disabled:opacity-70 disabled:cursor-not-allowed shadow-[0px_5.75px_5.75px_0px_#00000040]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    "Log In"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center w-full h-full relative overflow-hidden">
        {/* Top section with logo and illustration - Enhanced with slide-down animation */}
        <div
          className={`w-full flex flex-col items-center justify-center bg-[#233B77] pt-2 pb-10 sm:pb-8 md:pb-10 rounded-b-[20px] relative z-0 transition-all duration-1000 ease-out ${
            mounted
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div
            className={`transition-all duration-700 delay-500 ease-out transform ${
              mounted
                ? "scale-100 opacity-100 rotate-0"
                : "scale-75 opacity-0 rotate-12"
            }`}
          >
            <Image
              src="/images/exlogo.png"
              alt="Excellent Classes Logo"
              width={200}
              height={180}
              className="w-[200px] h-[180px] xs:w-[220px] xs:h-[200px] sm:w-[260px] sm:h-[240px] md:w-[300px] md:h-[280px] bg-[#233B77] p-3 sm:p-4 rounded-lg object-contain hover:scale-105 transition-transform duration-300 ease-in-out shadow-md"
            />
          </div>
          <Image
            src="/images/classroom.png"
            alt="Classroom Illustration"
            width={200}
            height={180}
            className="w-[200px] h-[180px] xs:w-[220px] xs:h-[200px] sm:w-[260px] sm:h-[240px] md:w-[300px] md:h-[280px] object-contain mt-4"
          />
        </div>

        {/* Login Form Card - Enhanced with slide-up animation */}
        <div
          className={`absolute top-[200px] xs:top-[220px] sm:top-[260px] md:top-[300px] w-[85%] xs:w-[80%] sm:w-[75%] md:w-9/12 max-w-[400px] bg-white rounded-t-[20px] rounded-b-xl z-20 p-0 min-h-[350px] xs:min-h-[380px] sm:min-h-[400px] overflow-hidden transition-all duration-1000 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
          style={{ boxShadow: "0px 4px 10px 0px #00000040" }}
        >
          {/* Header with border touching edges */}
          <div
            className={`w-full transition-all duration-700 delay-200 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
            }`}
          >
            <h2
              className="text-lg xs:text-xl sm:text-xl font-bold text-black bg-white text-center py-3 xs:py-4 m-0 rounded-t-[20px] rounded-b-[20px]"
              style={{
                border: "0.5px solid #000000",
                fontFamily: "Times New Roman, serif",
                fontWeight: "600",
              }}
            >
              {"Welcome to Excellent Classes"}
            </h2>
          </div>
          {/* Login Form */}
          <div
            className={`p-4 xs:p-5 sm:p-6 md:p-8 transition-all duration-700 delay-400 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <form
              onSubmit={handleLogin}
              className="space-y-4 xs:space-y-5 sm:space-y-6 w-full"
            >
              {/* Email Input */}
              <div>
                <label className="block text-base xs:text-lg font-bold mb-2">
                  {"Enter Email ID"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email ID"
                  required
                  className="w-full px-3 xs:px-4 sm:px-5 py-2.5 xs:py-3 text-sm xs:text-base text-gray-800 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233B77] placeholder:font-medium transition-all duration-300 ease-in-out transform focus:scale-[1.02] hover:shadow-lg"
                  style={{
                    boxShadow: "0px 4px 10px 0px #00000040",
                    fontFamily: "Times New Roman, serif",
                    fontWeight: "500",
                  }}
                />
              </div>
              {/* Password */}
              <div>
                <label className="block text-base xs:text-lg font-bold mb-2">
                  {"Enter Password"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                  className="w-full px-3 xs:px-4 sm:px-5 py-2.5 xs:py-3 text-sm xs:text-base text-gray-800 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233B77] placeholder:font-medium transition-all duration-300 ease-in-out transform focus:scale-[1.02] hover:shadow-lg"
                  style={{
                    boxShadow: "0px 4px 10px 0px #00000040",
                    fontFamily: "Times New Roman, serif",
                    fontWeight: "500",
                  }}
                />
                <div className="text-right mt-2">
                  <a
                    href="/forgetpassword"
                    className="text-xs xs:text-sm font-semibold hover:underline transition-colors duration-200"
                    style={{
                      color: "#E85222",
                      fontFamily: "Times New Roman, serif",
                      fontWeight: "600",
                    }}
                  >
                    {"Forgot Password ?"}
                  </a>
                </div>
              </div>
              {/* Error Message */}
              {error && (
                <div className="text-red-600 text-xs xs:text-sm font-semibold text-center animate-fadeInUp">
                  {error}
                </div>
              )}
              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-[160px] xs:w-[180px] sm:w-[200px] cursor-pointer bg-[#233B77] text-white font-bold py-2.5 xs:py-3 text-sm xs:text-base rounded-xl hover:bg-[#16294A] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ boxShadow: "0px 4px 10px 0px #00000040" }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    "Log In"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Quote section positioned directly below the card */}
        <div
          className={`absolute top-[570px] xs:top-[620px] sm:top-[680px] md:top-[720px] w-[85%] xs:w-[80%] sm:w-[75%] md:w-9/12 max-w-[400px] z-10 transition-all duration-700 delay-600 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-[#E85222] text-sm xs:text-base sm:text-lg font-semibold text-center leading-relaxed">
            {"Please Login to manage the website."}
          </p>
        </div>
      </div>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        /* Pulse animation for loading states */
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;