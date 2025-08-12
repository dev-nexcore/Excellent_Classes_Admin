"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [currentStep, setCurrentStep] = useState(1); // 1 = Email, 2 = OTP, 3 = Reset Password

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post("http://localhost:5001/api/admin/auth/send-otp", { email });
      setSuccessMsg(res.data.message);
      setCurrentStep(2);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post("http://localhost:5001/api/admin/auth/verify-otp", { email, otp });
      setSuccessMsg(res.data.message);
      setCurrentStep(3);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/admin/auth/reset-password", { email, otp, newPassword });
      setSuccessMsg(res.data.message);
      setCurrentStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  // Render form based on step
  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <form onSubmit={handleSendOtp} className="space-y-4 w-full">
            <label>Email ID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
              className="w-full px-4 py-2 border rounded-xl"
            />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleVerifyOtp} className="space-y-4 w-full">
            <label>Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full px-4 py-2 border rounded-xl"
            />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handleResetPassword} className="space-y-4 w-full">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              required
              className="w-full px-4 py-2 border rounded-xl"
            />
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border rounded-xl"
            />
            <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-lg">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen bg-[#233B77] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Forgot Password</h1>

        {errorMsg && <div className="text-red-600 text-sm mb-2">{errorMsg}</div>}
        {successMsg && <div className="text-green-600 text-sm mb-2">{successMsg}</div>}

        {renderStepForm()}

        <div className="text-center mt-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
