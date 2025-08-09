"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount animation for mobile layout
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Simulate success after 1 second (demo purpose only)
    setTimeout(() => {
      if (email.includes("@")) {
        setSuccessMsg("OTP has been sent to your email (simulated)");
      } else {
        setErrorMsg("Please enter a valid email address.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen w-screen bg-[#233B77]">
      {/* Desktop Layout - ORIGINAL UNCHANGED */}
      <div className="hidden lg:flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)] px-20 py-28">
          <h1 className="text-3xl font-bold text-center text-black mb-10">Forget Password</h1>

          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
            <div className="w-full max-w-sm">
              <label htmlFor="email" className="text-lg font-semibold block mb-2 text-black">
                Email ID
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email ID"
                required
                className="w-full px-4 py-3 bg-white text-gray-800 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#233B77] shadow-md"
              />
            </div>

            {errorMsg && (
              <div className="text-red-600 text-sm font-semibold text-center">{errorMsg}</div>
            )}
            {successMsg && (
              <div className="text-green-600 text-sm font-semibold text-center">{successMsg}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-50 bg-[#284389] text-white font-bold py-2 px-4 cursor-pointer shadow-md rounded-lg hover:bg-[#233b77e0] transition duration-200"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <div className="text-center mt-2">
              <Link href="/" className="text-gray-800 font-medium hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Layout - UPDATED TO MATCH LOGIN PAGE */}
      <div className="lg:hidden flex flex-col items-center w-full h-full relative overflow-hidden" style={{ fontFamily: "Times New Roman, serif" }}>
        {/* Top section with logo only - Enhanced with slide-down animation */}
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
        </div>

        {/* Forget Password Form Card - Enhanced with slide-up animation */}
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
              {"Forget Password"}
            </h2>
          </div>
          {/* Forget Password Form */}
          <div
            className={`p-4 xs:p-5 sm:p-6 md:p-8 transition-all duration-700 delay-400 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5 sm:space-y-6 w-full">
              {/* Email Input */}
              <div>
                <label className="block text-base xs:text-lg font-bold mb-2">
                  {"Email ID"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email ID"
                  required
                  className="w-full px-3 xs:px-4 sm:px-5 py-2.5 xs:py-3 text-sm xs:text-base text-gray-800 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233B77] placeholder:font-medium transition-all duration-300 ease-in-out transform focus:scale-[1.02] hover:shadow-lg"
                  style={{
                    boxShadow: "0px 4px 10px 0px #00000040",
                    fontFamily: "Times New Roman, serif",
                    fontWeight: "500",
                  }}
                />
              </div>

              {/* Error/Success Messages */}
              {errorMsg && (
                <div className="text-red-600 text-xs xs:text-sm font-semibold text-center animate-fadeInUp">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="text-green-600 text-xs xs:text-sm font-semibold text-center animate-fadeInUp">
                  {successMsg}
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
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>

              {/* Back to Login Link */}
              <div className="text-center mt-2">
                <Link
                  href="/"
                  className="text-sm xs:text-base font-semibold hover:underline transition-colors duration-200"
                  style={{
                    color: "#E85222",
                    fontFamily: "Times New Roman, serif",
                    fontWeight: "600",
                  }}
                >
                  {"Back to Login"}
                </Link>
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
            {"Reset your password to continue managing the website."}
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

export default ForgotPassword;