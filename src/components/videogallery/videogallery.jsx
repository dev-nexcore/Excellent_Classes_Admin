"use client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";

export default function VideoGallery() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videos, setVideos] = useState([
    { id: 1, thumbnail: null, file: null },
    { id: 2, thumbnail: null, file: null },
  ]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Create a new video object with unique ID
      const newVideo = {
        id: videos.length + 1,
        thumbnail: URL.createObjectURL(selectedFile),
        file: selectedFile,
        name: selectedFile.name,
      };

      // Add new video to the list
      setVideos([...videos, newVideo]);

      // Reset file input
      setSelectedFile(null);
      document.getElementById("video-upload").value = "";
    }
  };

  const handleDelete = (videoId) => {
    setVideos(videos.filter((video) => video.id !== videoId));
  };

  const handleClearSelectedFile = () => {
    setSelectedFile(null);
    document.getElementById("video-upload").value = "";
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-10 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
          Video Gallery
        </h1>

        {/* Add New Video Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
            Add New Video
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* File Upload */}
            <div className="relative w-full sm:w-auto">
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center bg-[#D9D9D9] text-black rounded-md px-4 py-2 cursor-pointer shadow-[0px_4.44px_4.44px_0px_#00000040]">
                <span className="bg-white text-black px-2 py-1 rounded mr-3 text-sm shadow-[0px_4.44px_4.44px_0px_#00000040]">
                  Choose File
                </span>
                <span className="text-sm">
                  {selectedFile ? selectedFile.name : "No File chosen"}
                </span>
              </div>
            </div>

            {/* Delete Icon */}
             <img
                src="/images/delete.png"
                alt="Delete"
                className="w-6 h-6 cursor-pointer"
                onClick={handleClearSelectedFile}
              />

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className={`px-6 sm:px-8 py-3 sm:ml-20 rounded-lg font-medium transition-colors cursor-pointer text-sm sm:text-base w-full sm:w-auto ${
                selectedFile
                  ? "bg-[#1F2A44] text-white hover:bg-[#163258]"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {videos.map((video) => (
          <div key={video.id} className="flex flex-col">
            {/* Video Thumbnail */}
            <div className="bg-[#D9D9D9] shadow-sm aspect-video w-full sm:h-[20vw] h-[24vh] relative overflow-hidden rounded-lg">
              {video.thumbnail ? (
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                >
                  <source src={video.thumbnail} type={video.file?.type} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm"></div>
              )}
            </div>

            {/* Delete Button - Outside the box */}
            <button
              onClick={() => handleDelete(video.id)}
              className="cursor-pointer text-[#C70000] font-medium transition-colors text-sm sm:text-base mt-2 text-left hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
