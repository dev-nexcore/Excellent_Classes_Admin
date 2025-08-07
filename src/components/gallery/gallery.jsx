"use client";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Gallery = () => {
  const [images, setImages] = useState([
    "/images/img1.png",
    "/images/img1.png",
    "/images/img1.png",
    "/images/img1.png",
    "/images/img1.png",
    "/images/img1.png",
    "/images/img1.png",
  ]);

  const handleDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleFileChange = (e) => {
    console.log("Selected file:", e.target.files[0]);
  };

  return (
    <div className="p-4 sm:p-8 bg-[#F4F9FF]">
      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[#1F2A44]">
        Gallery
      </h1>

      {/* Upload Section */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1F2A44]">
        Add New Photos
      </h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        {/* Custom File Input */}
        <div className="relative w-full sm:w-auto">
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center bg-[#D9D9D9] text-black rounded-md border-2 border-[#877575] px-4 py-2 cursor-pointer shadow-[0px_4.44px_4.44px_0px_#00000040]">
            <span className="bg-white text-black px-2 py-1 rounded mr-3 text-sm shadow-[0px_4.44px_4.44px_0px_#00000040]">
              Choose File
            </span>
            <span className="text-sm">No File chosen</span>
          </div>
        </div>

        {/* Delete Icon */}
        <img
          src="/images/delete.png"
          alt="Delete"
          className="w-6 h-6 cursor-pointer ml-4"
        />

        {/* Submit Button */}
        <button className="bg-[#1f2a44]  text-white px-5 py-2 border border-white rounded-[9.7px] sm:ml-10 hover:bg-[#1b243b] transition-all">
          SUBMIT
        </button>
      </div>

      {/* Secondary Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-[#1F2A44]">
        Gallery
      </h1>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((imgSrc, index) => (
          <div key={index} className="relative">
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src={imgSrc}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="mt-2 ml-4 text-red-600 hover:underline font-medium bg-transparent border-none p-0 relative z-10"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
