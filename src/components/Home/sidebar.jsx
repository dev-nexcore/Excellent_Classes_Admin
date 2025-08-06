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

  // useEffect(() => {
  //   const preventScroll = (e) => e.preventDefault();

  //   if (sidebarOpen) {
  //     document.documentElement.style.overflow = "hidden";
  //     document.body.style.overflow = "hidden";
  //     document.addEventListener("touchmove", preventScroll, { passive: false });
  //   } else {
  //     document.documentElement.style.overflow = "";
  //     document.body.style.overflow = "";
  //     document.removeEventListener("touchmove", preventScroll);
  //   }

  //   return () => {
  //     document.documentElement.style.overflow = "";
  //     document.body.style.overflow = "";
  //     document.removeEventListener("touchmove", preventScroll);
  //   };
  // }, [sidebarOpen]);

  const navItems = [
    { label: "Dashboard", icon: "/images/dashboard.png", href: "/dashboard" },
    { label: "Gallery", icon: "/images/gallery.png", href: "/gallery" },
    { label: "Video Gallery", icon: "/images/videogallery.png", href: "/video-gallery" },
    { label: "Notice board", icon: "/images/noticeboard.png", href: "/notice-board" },
    { label: "Blogs", icon: "/images/blogs.png", href: "/blogs" },
    { label: "Topper List", icon: "/images/topperlist.png", href: "/topper-list" },
    { label: "Logout", icon: "/images/logout.png", href: null},
  ];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
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
          <img src="/images/logo.png" alt="Logo" className="w-44 h-auto" />
        </div>

        {/* Nav Items */}
        <div className="flex-1 w-full px-2">
          <ul className="flex flex-col gap-3 sm:ml-6">
  {navItems.map((item) => (
    <li key={item.label}>
      {item.label === "Logout" ? (
        // 👇 Logout item without <Link>
        <div
          className={getLinkClass("", item.label)}
          onClick={() => {
            setActive(item.label);
            setSidebarOpen(false);
            setShowLogoutConfirm(true); // 👈 show modal
          }}
        >
          <Image src={item.icon} alt={`${item.label} icon`} width={14} height={14} />
          <span>{item.label}</span>
        </div>
      ) : (
        // 👇 Normal nav items
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

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <p className="mb-4 text-lg font-extrabold text-[#1F3A64]">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-[#1F3A64] text-white font-semibold px-5 py-2 rounded-full hover:bg-[#163258]"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-300 text-black font-semibold px-5 py-2 rounded-full hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
