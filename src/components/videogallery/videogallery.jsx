"use client"
import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function VideoGallery() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videos, setVideos] = useState([
    { id: 1, thumbnail: null },
    { id: 2, thumbnail: null }
  ]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Add logic to handle video upload
      console.log('Submitting video:', selectedFile);
      // Reset file input
      setSelectedFile(null);
      document.getElementById('video-upload').value = '';
    }
  };

  const handleDelete = (videoId) => {
    setVideos(videos.filter(video => video.id !== videoId));
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Video Gallery</h1>
        
        {/* Add New Video Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Video</h2>
          
          <div className="flex items-center gap-4">
            {/* File Upload */}
            <div className="relative">
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="bg-gray-200 border border-gray-300 rounded-lg px-6 py-3 text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors min-w-[200px]">
                {selectedFile ? selectedFile.name : 'Choose File    No File chosen'}
              </div>
            </div>

            {/* Delete Icon */}
            <button className="p-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
              <Trash2 size={20} />
            </button>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-[#1F2A44] text-white ml-26 px-8 py-3 rounded-lg font-medium hover:bg-[#163258] transition-colors cursor-pointer"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>

      {/* Video Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="flex flex-col mt-8">
            {/* Video Thumbnail */}
            <div className="bg-[#D9D9D9] shadow-sm h-[20vw]">
              {/* Placeholder for video thumbnail */}
              {/* <div className="w-full h-full bg-gray-300 rounded-lg"></div> */}
            </div>
            
            {/* Delete Button - Outside the box */}
            <button
              onClick={() => handleDelete(video.id)}
              className="cursor-pointer text-[#C70000] font-medium transition-colors text-md mt-2 text-left"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}