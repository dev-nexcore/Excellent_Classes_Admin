"use client";

import React from "react";
import Image from "next/image";

export default function Navbar({ onSidebarToggle }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white h-16 flex items-center justify-between px-4 md:pl-[15rem]">
      {/* Sidebar toggle for mobile */}
      <button
        onClick={onSidebarToggle}
        className="md:hidden p-2 text-black"
        aria-label="Toggle sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Email + Profile */}
      <div className="ml-auto flex items-center gap-3">
        <p className="text-sm md:text-base font-semibold text-[#1F1F1F]">abc@gmail.com</p>
        <Image
          src="/images/user.png"
          alt="Profile Icon"
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
    </header>
  );
}
