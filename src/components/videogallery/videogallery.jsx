"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function VideoGallery() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/admin/media/videos"
        );
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };

    fetchVideos();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("video", selectedFile);

        const res = await axios.post(
          "http://localhost:5001/api/admin/media/videos",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setVideos([...videos, res.data]);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/admin/media/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setVideos(videos.filter((v) => v._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleClearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
                ref={fileInputRef}
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
          <div key={video._id} className="flex flex-col">
            <div className="bg-[#D9D9D9] shadow-sm aspect-video w-full sm:h-[20vw] h-[24vh] relative overflow-hidden rounded-lg">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <button
              onClick={() => handleDelete(video._id)}
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


export default VideoGallery;
