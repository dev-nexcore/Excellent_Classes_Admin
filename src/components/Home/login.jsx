"use client"
import Image from "next/image"
import React from "react"

const Login = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Section */}
      <div className="bg-[#233B77] text-white flex flex-col justify-center items-center relative px-6 py-10">
        {/* Content Container */}
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
          {/* Logo */}
          <Image
            src="/images/logo.png"
            alt="Excellent Classes Logo"
            width={240}
            height={120}
            className="object-contain"
          />

          {/* Illustration */}
          <Image
            src="/images/classroom.png"
            alt="Classroom Illustration"
            width={300}
            height={260}
            className="object-contain"
          />

          {/* Tagline */}
          <p className="text-[#E85222] font-times text-2xl text-center mt-4 ">
            Please Login to manage the website.
          </p>
        </div>

        {/* Bottom Orange Bar */}
        <div className="absolute bottom-0 left-0 w-full h-14 bg-[#E85222]" />
      </div>

      {/* Right Section */}
      <div className="bg-white flex items-center justify-center px-4 md:px-10 py-16">
        <div className="w-full max-w-xl bg-white p-6 sm:p-10">
          <h2 className="text-3xl font- text-center mb-12 sm:mb-14">
            Welcome to Excellent Classes
          </h2>

          <form className="w-full flex flex-col gap-4">
            {/* Email Input */}
            <label htmlFor="email" className="font-medium">
              Enter Email ID
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email ID"
              className="bg-[#f4faff] px-4 py-3 rounded-md shadow-md focus:border-2 focus:border-[#233B77] focus:outline-none transition-all"
            />

            {/* Password Input */}
            <label htmlFor="password" className="font-medium">
              Enter Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="bg-[#f4faff] px-4 py-3 rounded-md shadow-md focus:border-2 focus:border-[#233B77] focus:outline-none transition-all"
            />

            {/* Forgot Password Link */}
            <div className="flex justify-end text-sm text-black hover:underline">
              <a href="#">Forgot Password ?</a>
            </div>

            {/* Button Wrapper to Center the Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-[150px] bg-[#233B77] cursor-pointer text-white py-3 rounded-md hover:bg-[#16294A] transition text-center"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
