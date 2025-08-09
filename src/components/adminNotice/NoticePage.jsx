"use client";

import React, { useState, useEffect } from "react";
import EditActivity from "./EditActivity";
import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [noticeText, setNoticeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotices = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/admin/notices");

      // Assuming API returns an array of notices
      setNotices(res.data);
    } catch (err) {
      console.error("Error fetching notices:", err);
      setError("Failed to fetch notices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!noticeText.trim()) {
      setError("Notice text cannot be empty.");
      return;
    }

    setSubmitting(true);

    try {
      const newNotice = {
        user: "admin@domain.com",
        description: `Added a new notice:\n"${noticeText}"`,
        date: new Date().toISOString(),
      };

      // ✅ For now, just log instead of updating list
      console.log("Submitted Notice:", newNotice);
      alert("Notice submitted: " + noticeText);

      setNoticeText("");
      setSuccess("Notice submitted successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to submit notice.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (index) => {
    setEditData(notices[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleUpdate = (index, updatedNotice) => {
    const updatedNotices = [...notices];
    updatedNotices[index] = updatedNotice;
    setNotices(updatedNotices);
  };

  const handleDelete = (index) => {
    const updated = notices.filter((_, i) => i !== index);
    setNotices(updated);
  };

  return (
    <div className="min-h-screen bg-[#f2f7ff] font-[poppins] p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-extrabold font-[poppins] text-[#1F2A44] mb-6 ml-2 md:ml-4">
        Notice Board
      </h1>

      {/* Add Notice */}
      <div className="mb-10 ml-2 mr-2 md:ml-4 md:mr-4">
        <h2 className="text-lg md:text-xl font-semibold text-[#1F2A44] mb-3">
          Add New Notice
        </h2>

        <div className="mr-4 md:mr-20 ml-4 md:ml-6">
          <div className="bg-white rounded-lg shadow-lg">
            <textarea
              placeholder="Enter your notice here"
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              className="w-full min-h-[120px] p-3 md:p-4 text-gray-800 rounded-md resize-none text-sm md:text-base"
              disabled={submitting}
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className={`bg-[#1F2A44] text-white px-5 py-2 md:px-6 md:py-2 rounded-md font-medium cursor-pointer shadow-md text-sm md:text-base transition transform hover:scale-105 hover:bg-[#162033] ${
                submitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Submitting..." : "SUBMIT"}
            </button>
          </div>

          {/* Success or Error Messages */}
          {error && (
            <p className="text-[#C70000] text-sm mt-3 font-medium">{error}</p>
          )}
          {success && (
            <p className="text-[#096604] text-sm mt-3 font-medium">{success}</p>
          )}
        </div>
      </div>

      {/* Recent Activity Table */}
      <h2 className="text-lg md:text-2xl font-semibold text-[#1F2A44] mb-4 ml-2 md:ml-4">
        Recent Activity
      </h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl mx-4 md:mx-8">
          <table className="w-full min-w-[600px]  shadow-md text-sm md:text-base">
            <thead>
              <tr className="bg-[#E85222] text-white font-bold text-center text-xs md:text-sm lg:text-base">
                <th className="px-2 md:px-4 py-2 md:py-3 border-r border-black">
                  User
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 border-r border-black">
                  Description
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 border-r border-black">
                  Date
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-[#BAC7E5] text-black text-center align-top text-xs md:text-sm">
              {notices.map((notice, index) => (
                <tr key={index}>
                  <td className="px-2 md:px-4 py-2 md:py-3 border-r border-black font-medium break-words">
                    {notice.user}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 border-r border-black whitespace-pre-line break-words">
                    {notice.description}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 border-r border-black">
                    {formatDate(notice.date)}
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 space-x-1 md:space-x-2">
                    <button
                      className="text-green-600 cursor-pointer hover:underline"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      className="text-red-600 cursor-pointer hover:underline"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {notices.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 text-gray-600">
                    No notices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <EditActivity
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdate}
        initialData={{
          ...editData,
          date: formatDate(editData?.date),
        }}
        index={editingIndex}
      />
    </div>
  );
};

export default NoticePage;
