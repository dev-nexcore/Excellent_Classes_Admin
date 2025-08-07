"use client";

import React, { useState, useRef, useEffect } from "react";

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
  useEffect(() => {
    const savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  }, []);

  // Save blogs to localStorage whenever blogs array changes
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !date || !content) {
      alert('Please fill in all required fields');
      return;
    }

    const blogData = {
      id: editingId || Date.now(),
      title,
      date,
      content,
      image: imagePreview,
      createdAt: editingId ? blogs.find(b => b.id === editingId)?.createdAt : new Date().toISOString()
    };

    if (editingId) {
      // Update existing blog
      setBlogs(blogs.map(blog => blog.id === editingId ? blogData : blog));
      setEditingId(null);
    } else {
      // Add new blog
      setBlogs([blogData, ...blogs]);
    }

    // Reset form
    setTitle("");
    setDate("");
    setImage(null);
    setContent("");
    setImagePreview(null);
    
    // Reset file input
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setDate(blog.date);
    setContent(blog.content);
    setImagePreview(blog.image);
    setEditingId(blog.id);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
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
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="bg-[#F4F9FF] min-h-screen px-4 py-8">
      <h2 className="text-3xl font-bold text-[#1F2A44] mb-8 md:mb-15">
        {editingId ? 'Edit Blog' : 'Add New Blog'}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto md:ml-10 md:mx-0"
      >
        <div className="w-full md:w-[900px]">
          <label className="block mb-2 text-base font-semibold text-black">
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
              required
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mb-6">
          <div className="w-full sm:w-[150px] sm:mr-20">
            <label className="block mb-2 text-base font-semibold text-black">
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
                style={{ transform: 'translateY(-10px)' }}
                required
              />
              {/* Custom calendar UI */}
              <div
                onClick={() =>
                  dateInputRef.current?.showPicker?.() ||
                  dateInputRef.current?.click()
                }
                className="flex items-center justify-between bg-white rounded-md px-2 py-2 shadow-[0px_4px_4px_0px_#00000040] cursor-pointer relative z-20"
              >
                <span className="text-sm text-gray-700">
                  {date
                    ? new Date(date).toLocaleDateString("en-GB")
                    : "DD/MM/YYYY"}
                </span>
                <img
                  src="/images/cal.svg"
                  alt="Calendar"
                  className="w-6 h-6 ml-2"
                />
              </div>
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <label className="block mb-2 text-base font-semibold text-black">
              Add Image :
            </label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center bg-[#D9D9D9] text-black rounded-md border-2 border-[#877575] px-4 py-2 cursor-pointer shadow-[0px_4.44px_4.44px_0px_#00000040]">
                  <span className="bg-white text-black px-2 py-1 rounded mr-3 text-sm shadow-[0px_4.44px_4.44px_0px_#00000040]">
                    Choose File
                  </span>
                  <span className="text-sm">
                    {image ? image.name : "No File chosen"}
                  </span>
                </div>
              </div>

              {/* Delete Icon */}
              <img
                src="/images/delete.png"
                alt="Delete"
                className="w-6 h-6 cursor-pointer"
                onClick={removeImage}
              />
            </div>
          </div>
        </div>
        <div className="mb-6 w-full md:w-[900px]">
          <label className="block mb-2 text-base font-semibold text-black">
            Content :
          </label>
          <div className="bg-white rounded-lg shadow-[0_2px_4px_0px_rgba(0,0,0,0.2)] p-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here"
              className="w-full h-72 resize-none outline-none text-gray-700 placeholder:text-gray-500 bg-transparent px-2 py-1 text-sm"
              required
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-start mt-6 md:ml-90 gap-4">
          <button
            type="submit"
            className="bg-[#1F2A44] text-white px-6 py-2 rounded-md hover:bg-[#162035]"
          >
            {editingId ? 'UPDATE' : 'SUBMIT'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
            >
              CANCEL
            </button>
          )}
        </div>
      </form>
      
      <div className="mt-10 px-4 md:ml-10 md:px-0">
        <h3 className="text-3xl font-bold text-[#1F2A44] text-center md:text-left md:ml-80">
          Latest Blogs ({blogs.length})
        </h3>
        
        {blogs.length === 0 ? (
          <div className="bg-white p-8 max-w-4xl mx-auto md:mx-0 mt-4 text-center rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">No blogs available. Create your first blog!</p>
          </div>
        ) : (
          <div className="bg-[#1F2A44] text-white p-4 max-w-4xl mx-auto md:mx-0 mt-4 space-y-12">
            {blogs.map((blog) => (
              <div key={blog.id} className="border-b border-gray-600 pb-8 last:border-b-0">
                <div className="flex justify-left text-sm mb-4">
                  <span 
                    className="text-blue-300 cursor-pointer mr-2 hover:text-blue-200"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </span>
                  <span style={{ color: '#FFD700' }}>|</span>
                  <span 
                    className="text-red-400 cursor-pointer ml-2 hover:text-red-300"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </span>
                </div>
                
                {blog.image && (
                  <div className="mb-4">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full max-w-md h-48 object-cover rounded-md"
                    />
                  </div>
                )}
                
                <p className="text-sm text-gray-300">Uncategorized</p>
                <p className="text-base font-medium underline text-white mt-1">
                  {blog.title}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  Posted on <span className="text-blue-300">
                    {new Date(blog.date).toLocaleDateString("en-GB")}
                  </span>
                </p>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                  {blog.content.length > 200 
                    ? `${blog.content.substring(0, 200)}...` 
                    : blog.content
                  }
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBlogPage;