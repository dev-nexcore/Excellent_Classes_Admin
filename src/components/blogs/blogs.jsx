"use client";

import React, { useState } from "react";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, date, image, content });
  };

  return (
    <div className="bg-[#f0f6ff] min-h-screen px-4 py-8">
      <h2 className="text-2xl font-bold text-[#1F2A44] mb-4">Add New Blog</h2>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="w-[800px]">
          <label className="block mb-2 text-sm font-semibold text-black">
            Title :
          </label>
          <div className="bg-white rounded-md px-4 py-2 shadow-[0px_4px_4px_0px_#00000040] mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Blog Title"
              className="w-full outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
              style={{ WebkitAppearance: "none" }}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 mb-6">
          <div className="w-[150px]">
            <label className="block mb-2 text-base font-semibold text-black">
              Date :
            </label>
            <div className="bg-white rounded-md px-2 py-2 shadow-[0px_4px_4px_0px_#00000040] overflow-hidden">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full outline-none text-gray-700 placeholder:text-gray-400 bg-transparent text-sm"
                style={{ WebkitAppearance: "none" }} // Optional to reduce default style
              />
            </div>
          </div>
          <div className="relative w-full sm:w-auto">
            <label className="block mb-2 text-base font-semibold text-black">
              Add Image :
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex items-center bg-[#D9D9D9] text-black rounded-md border-2 border-[#877575] px-4 py-2 cursor-pointer shadow-[0px_4.44px_4.44px_0px_#00000040]">
              <span className="bg-white text-black px-2 py-1 rounded mr-3 text-sm shadow-[0px_4.44px_4.44px_0px_#00000040]">
                Choose File
              </span>
              <span className="text-sm">No File chosen</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-black">
            Content :
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here"
            className="w-full border px-4 py-2 rounded h-32 shadow-sm"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#1F2A44] text-white px-6 py-2 rounded hover:bg-[#162035]"
        >
          SUBMIT
        </button>
      </form>

      <h3 className="text-xl font-bold text-center mt-10 text-[#1F2A44]">
        Latest Blogs
      </h3>

      <div className="bg-[#1F2A44] text-white rounded-md p-4 max-w-3xl mx-auto mt-4 space-y-6">
        {[1, 2].map((item) => (
          <div key={item} className="border-b border-gray-500 pb-4">
            <div className="flex justify-end text-sm mb-1">
              <span className="text-blue-300 cursor-pointer mr-2">Edit</span>|
              <span className="text-red-400 cursor-pointer ml-2">Delete</span>
            </div>
            <p className="text-sm text-gray-300">Uncategorized</p>
            <p className="text-base font-medium underline text-white mt-1">
              {item === 1
                ? "Best Classes for Commerce & Science in Kurla , Kalina"
                : "S.S.C Exams to be postponed to April"}
            </p>
            {item === 2 && (
              <p className="text-sm text-gray-300 mt-1">
                Posted on <span className="text-blue-300">March 4, 2021</span>
              </p>
            )}
            <p className="text-sm text-gray-300 mt-1">
              {item === 1
                ? "Excellent Classes provides a conducive atmosphere to our students, where they are encouraged to channelize [...]"
                : "Excellent Classes has been catering to the S.S.C. students from the past 30 years and producing spectacular results. We are also imparting education to post S.S.C. [...]"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBlogPage;
