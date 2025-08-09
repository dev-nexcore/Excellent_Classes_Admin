"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const AddBlogPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dateInputRef = useRef(null);

  // Load blogs from localStorage on component mount
  // useEffect(() => {
  //   const savedBlogs = localStorage.getItem("blogs");
  //   if (savedBlogs) {
  //     setBlogs(JSON.parse(savedBlogs));
  //   }
  // }, []);

  // // Save blogs to localStorage whenever blogs array changes
  // useEffect(() => {
  //   localStorage.setItem("blogs", JSON.stringify(blogs));
  // }, [blogs]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate fields
  if (!title || !date || !content) {
    alert("Please fill in all required fields");
    return;
  }

  // Prepare FormData
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("date", date);
  
  if (image) {
    formData.append("image", image); // MUST match multer field name
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/admin/blogs",
      formData,
      {
       headers: {
          "Content-Type": "multipart/form-data",
          // "Authorization": `Bearer ${token}`, // Uncomment if using auth
        },
      }
    );

    const newBlog = response.data;

    // Update local state
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);

    // Reset form
    setTitle("");
    setDate("");
    setImage(null);
    setContent("");
    setImagePreview(null);

    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";

    alert("Blog created successfully!");
  } catch (error) {
    console.error("Failed to create blog:", error?.response?.data || error.message);
    alert("Error creating blog.");
  }
};

const handleEdit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("date", date);
  if (imageFile) formData.append("image", imageFile); // only if a new image is selected

  try {
    const res = await axios.put(
      `/api/admin/blogs/${editingId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    // Handle success: update UI or reset form
    console.log("Blog updated", res.data);
  } catch (err) {
    console.error("Error updating blog", err.response?.data || err.message);
  }
};



  // const handleEdit = (blog) => {
  //   setTitle(blog.title);
  //   setDate(blog.date);
  //   setContent(blog.content);
  //   setImagePreview(blog.image);
  //   setEditingId(blog.id);

  //   // Scroll to top
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
  if (!confirmDelete) return;

  try {
    const res = await axios.delete(`/api/admin/blogs/${id}`); // Adjust path if needed

    if (res.data.message === "Blog deleted successfully") {
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    }
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);
    alert("Failed to delete the blog. Please try again.");
  }
};


  const cancelEdit = () => {
    setTitle("");
    setDate("");
    setImage(null);
    setContent("");
    setImagePreview(null);
    setEditingId(null);

    // Reset file input
    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="bg-[#F4F9FF] min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2A44] mb-4 sm:mb-6 md:mb-8 lg:mb-12">
        {editingId ? "Edit Blog" : "Add New Blog"}
      </h2> 
      <form
        onSubmit={handleSubmit}
        className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto md:mx-auto lg:ml-6 xl:ml-10 lg:mx-0"
      >
        <div className="w-full md:w-full lg:w-[900px] xl:w-[1000px]">
          <label className="block mb-2 text-sm sm:text-base font-semibold text-black">
            Title :
          </label>
          <div className="bg-white rounded-md px-3 sm:px-4 py-2 shadow-[0px_4px_4px_0px_#00000040] mb-4 sm:mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Blog Title"
              className="w-full outline-none text-gray-700 placeholder:text-gray-400 bg-transparent text-sm sm:text-base"
              style={{ WebkitAppearance: "none" }}
              required
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-row sm:items-start lg:items-center gap-4 sm:gap-6 md:gap-6 lg:gap-8 mb-4 sm:mb-6">
          <div className="w-full sm:w-auto md:w-auto sm:min-w-[150px] md:min-w-[150px] lg:mr-20">
            <label className="block mb-2 text-sm sm:text-base font-semibold text-black">
              Date :
            </label>
            <div className="relative">
              {/* Hidden native input positioned to open below */}
              <input
                ref={dateInputRef}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="absolute top-full left-0 opacity-0 pointer-events-none z-10"
                style={{ transform: "translateY(-10px)" }}
                required
              />
              {/* Custom calendar UI */}
              <div
                onClick={() =>
                  dateInputRef.current?.showPicker?.() ||
                  dateInputRef.current?.click()
                }
                className="flex items-center justify-between bg-white rounded-md px-2 py-2 shadow-[0px_4px_4px_0px_#00000040] cursor-pointer relative z-20 min-w-[140px] sm:min-w-[150px] md:min-w-[150px]"
              >
                <span className="text-xs sm:text-sm text-gray-700">
                  {date
                    ? new Date(date).toLocaleDateString("en-GB")
                    : "DD/MM/YYYY"}
                </span>
                <img
                  src="/images/cal.svg"
                  alt="Calendar"
                  className="w-5 h-5 sm:w-6 sm:h-6 ml-2"
                />
              </div>
            </div>
          </div>

          <div className="relative w-full sm:w-auto md:w-auto flex-1">
            <label className="block mb-2 text-sm sm:text-base font-semibold text-black">
              Add Image :
            </label>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative flex-1 sm:flex-none md:flex-none">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center bg-[#D9D9D9] text-black rounded-md border-2 border-[#877575] px-2 sm:px-4 py-2 cursor-pointer shadow-[0px_4.44px_4.44px_0px_#00000040] min-w-0">
                  <span className="bg-white text-black px-2 py-1 rounded mr-2 sm:mr-3 text-xs sm:text-sm shadow-[0px_4.44px_4.44px_0px_#00000040] whitespace-nowrap">
                    Choose File
                  </span>
                  <span className="text-xs sm:text-sm truncate">
                    {image ? image.name : "No File chosen"}
                  </span>
                </div>
              </div>

              {/* Delete Icon */}
              <img
                src="/images/delete.png"
                alt="Delete"
                className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer flex-shrink-0"
                onClick={removeImage}
              />
            </div>
          </div>
        </div>
        <div className="mb-4 sm:mb-6 w-full md:w-full lg:w-[900px] xl:w-[1000px]">
          <label className="block mb-2 text-sm sm:text-base font-semibold text-black">
            Content :
          </label>
          <div className="bg-white rounded-lg shadow-[0_2px_4px_0px_rgba(0,0,0,0.2)] p-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here"
              className="w-full h-48 sm:h-60 md:h-72 resize-none outline-none text-gray-700 placeholder:text-gray-500 bg-transparent px-2 py-1 text-xs sm:text-sm"
              required
            />
          </div>  
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#1F2A44] text-white px-6 py-2 rounded-md hover:bg-[#162035] text-sm sm:text-base"
          >
            {editingId ? "UPDATE" : "SUBMIT"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 text-sm sm:text-base"
            >
              CANCEL
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 sm:mt-8 md:mt-10">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F2A44] text-center mb-4">
          Latest Blogs ({blogs.length})
        </h3>

        <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto md:mx-auto lg:ml-6 xl:ml-10 lg:mx-0">
          {blogs.length === 0 ? (
            <div className="bg-white p-6 sm:p-8 w-full md:w-full lg:w-[900px] xl:w-[1000px] mt-4 text-center rounded-lg shadow-md">
              <p className="text-gray-500 text-base sm:text-lg">
                No blogs available. Create your first blog!
              </p>
            </div>
          ) : (
            <div className="bg-[#1F2A44] text-white p-3 sm:p-4 md:p-6 w-full md:w-full lg:w-[900px] xl:w-[1000px] mt-4 space-y-8 sm:space-y-10 md:space-y-12">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="border-b border-gray-600 pb-6 sm:pb-8 last:border-b-0"
                >
                  <div className="flex justify-start text-xs sm:text-sm mb-3 sm:mb-4">
                    <span
                      className="text-blue-300 cursor-pointer mr-2 hover:text-blue-200"
                      onClick={() => handleEdit(blog)}
                    >
                      Edit
                    </span>
                    <span style={{ color: "#FFD700" }}>|</span>
                    <span
                      className="text-red-400 cursor-pointer ml-2 hover:text-red-300"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </span>
                  </div>

                  {blog.image && (
                    <div className="mb-3 sm:mb-4">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full max-w-full sm:max-w-md md:max-w-lg h-32 sm:h-40 md:h-48 object-cover rounded-md"
                      />
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-gray-300">Uncategorized</p>
                  <p className="text-sm sm:text-base md:text-lg font-medium underline text-white mt-1 break-words">
                    {blog.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    Posted on{" "}
                    <span className="text-blue-300">
                      {new Date(blog.date).toLocaleDateString("en-GB")}
                    </span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed break-words">
                    {blog.content.length > 200
                      ? `${blog.content.substring(0, 200)}...`
                      : blog.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBlogPage;