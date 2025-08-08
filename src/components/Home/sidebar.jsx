"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import Image from "next/image";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showLoggedOut, setShowLoggedOut] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: "/images/dashboard.png", href: "/dashboard" },
    { label: "Gallery", icon: "/images/gallery.png", href: "/gallery" },
    { label: "Video Gallery", icon: "/images/videogallery.png", href: "/videogallery" },
    { label: "Notice board", icon: "/images/noticeboard.png", href: "/notice-board" },
    { label: "Blogs", icon: "/images/blogs.png", href: "/blogs" },
    { label: "Topper List", icon: "/images/topperlist.png", href: "/topper-list" },
    { label: "Logout", icon: "/images/logout.png", href: null},
  ];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setShowLogoutConfirm(false);
    setShowLoggedOut(true);
  };

  const handleLoginAgain = () => {
    setShowLoggedOut(false);
    router.push("/");
  };

  const getLinkClass = (href, label) =>
    `flex items-center gap-3 px-4 py-2 transition-all duration-200 text-sm font-semibold cursor-pointer
    ${
      active === label || pathname === href
        ? "bg-[#BAC7E5] text-[#1F2A44] rounded-lg mx-2 shadow-sm mb-1"
        : "text-yellow-400 hover:bg-white/20"
    }`;

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-60 bg-[#1F3A64] py-6 flex flex-col items-center transition-transform duration-300 overflow-y-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close for Mobile */}
        <button
          className="md:hidden absolute top-4 right-4 p-2 text-white"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="flex justify-center items-center mb-12 mt-6">
          <img src="/images/exlogo.png" alt="Logo" className="w-44 h-auto" />
        </div>

        {/* Nav Items */}
        <div className="flex-1 w-full px-2">
          <ul className="flex flex-col gap-3 sm:ml-6">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.label === "Logout" ? (
                  <div
                    className={getLinkClass("", item.label)}
                    onClick={() => {
                      setActive(item.label);
                      setSidebarOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                  >
                    <Image src={item.icon} alt={`${item.label} icon`} width={14} height={14} />
                    <span>{item.label}</span>
                  </div>
                ) : (
                  <Link href={item.href}>
                    <div
                      className={getLinkClass(item.href, item.label)}
                      onClick={() => {
                        setActive(item.label);
                        setSidebarOpen(false);
                      }}
                    >
                      <Image src={item.icon} alt={`${item.label} icon`} width={14} height={14} />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-12 rounded-2xl shadow-2xl w-120 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Logout Confirmation
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Are You sure you want to do Logout ?
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={handleLogout} 
                className="bg-[#2B4C7E] cursor-pointer text-white font-bold px-8 py-3 rounded-lg hover:bg-[#1F3A64] transition-colors shadow-lg hover:shadow-xl"
              >
                Confirm
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="border-2 cursor-pointer border-[#2B4C7E] text-[#2B4C7E] font-bold px-8 py-3 rounded-lg hover:bg-gray-100 hover:text-black transition-colors shadow-lg hover:shadow-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* You are Logged Out Modal */}
      {showLoggedOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-100 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              You are Logged Out
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              You have successfully Logged Out!!
            </p>
            <div className="flex justify-center">
              <button 
                onClick={handleLoginAgain}
                className="bg-[#2B4C7E] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#1F3A64] transition-colors cursor-pointer shadow-xl"
              >
                Login Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}