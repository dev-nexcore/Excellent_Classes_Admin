"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  addNotice,
  deleteNotice,
  fetchNotices,
  updateNotice,
} from "@/services/notices";
import EditActivity from "./EditActivity";

// Display date like: 19 June 2025
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Simple scroll lock hook for modals
function useScrollLock(locked) {
  useEffect(() => {
    const { body } = document;
    if (!body) return;
    if (locked) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [locked]);
}

export default function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [noticeText, setNoticeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock body scroll when modal is open
  useScrollLock(isModalOpen || editingIndex !== null);

  // Hydrate notices (seed for now, axios later)
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchNotices();
      setNotices(data);
    } catch {
      setError("Failed to fetch notices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 4000);
  }, [error, success]);

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
        description: noticeText,
        date: new Date().toISOString(),
      };

      await addNotice(newNotice); // ✅ API call to backend

      setNoticeText("");
      setSuccess("Notice submitted successfully.");

      // Refresh list
      await load();
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

  const handleUpdate = async (index, updatedNotice) => {
    try {
      // Call the API
      await updateNotice(notices[index]._id, updatedNotice);

      // Update local state
      setNotices((prev) => {
        const next = prev.slice();
        next[index] = updatedNotice;
        return next;
      });

      // Refresh the notices
      await load();
    } catch (err) {
      console.error(err);
      setError("Failed to update notice.");
    }
  };

  const handleDelete = async (index) => {
    try {
      // Call the API
      await deleteNotice(notices[index]._id);

      // Update local state
      setNotices((prev) => prev.filter((_, i) => i !== index));

      // Refresh the notices
      await load();
    } catch (err) {
      console.error(err);
      setError("Failed to delete notice.");
    }
  };

  // Stable key selection (prefer id if present)
  const rows = useMemo(
    () => notices.map((n, i) => ({ n, i, key: n.id ?? String(i) })),
    [notices]
  );

  const onKeyDownCloseModal = (e) => {
    if (e.key === "Escape") {
      if (isModalOpen) setIsModalOpen(false);
      if (editingIndex !== null) setEditingIndex(null);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f2f7ff] font-[poppins] p-4 md:p-6"
      onKeyDown={onKeyDownCloseModal}
      role="region"
      aria-label="Notice board"
    >
      <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2A44] mb-6 ml-2 md:ml-4">
        {"Notice Board"}
      </h1>

      {/* Add Notice */}
      <div className="mb-10 ml-2 mr-2 md:ml-4 md:mr-4">
        <h2 className="text-lg md:text-xl font-semibold text-[#1F2A44] mb-3">
          {"Add New Notice"}
        </h2>

        <div className="mr-4 md:mr-20 ml-4 md:ml-6">
          <div className="bg-white rounded-lg shadow-lg">
            <label htmlFor="notice-input" className="sr-only">
              {"Notice content"}
            </label>
            <textarea
              id="notice-input"
              placeholder="Enter your notice here"
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              className="w-full min-h-[120px] p-3 md:p-4 text-gray-800 rounded-md resize-none text-sm md:text-base"
              disabled={submitting}
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className={`bg-[#1F2A44] text-white px-5 py-2 md:px-6 md:py-2 rounded-md font-medium cursor-pointer shadow-md text-sm md:text-base transition transform hover:scale-105 hover:bg-[#162033] ${
                submitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
              aria-disabled={submitting}
            >
              {submitting ? "Submitting..." : "SUBMIT"}
            </button>
          </div>

          {error && (
            <p className="text-[#C70000] text-sm mt-3 font-medium" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p
              className="text-[#096604] text-sm mt-3 font-medium"
              role="status"
            >
              {success}
            </p>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <h2 className="text-lg md:text-2xl font-semibold text-[#1F2A44] mb-4 ml-2 md:ml-4">
        {"Recent Activity"}
      </h2>

      {loading ? (
        <div className="text-center text-gray-600">{"Loading..."}</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl mx-4 md:mx-8 ">
            <table className="w-full min-w-[600px] shadow-md text-sm md:text-base">
              <thead>
                <tr className="bg-[#E85222] text-white font-bold text-center text-xs md:text-sm lg:text-base">
                  <th
                    scope="col"
                    className="px-2 md:px-4 py-2 md:py-3 border-r border-black"
                  >
                    {"User"}
                  </th>
                  <th
                    scope="col"
                    className="px-2 md:px-4 py-2 md:py-3 border-r border-black"
                  >
                    {"Description"}
                  </th>
                  <th
                    scope="col"
                    className="px-2 md:px-4 py-2 md:py-3 border-r border-black"
                  >
                    {"Date"}
                  </th>
                  <th scope="col" className="px-2 md:px-4 py-2 md:py-3">
                    {"Action"}
                  </th>
                </tr>
              </thead>

              <tbody className="bg-[#BAC7E5] text-black text-center align-top text-xs sm:text-sm md:text-base">
                {rows.map(({ n, i, key }) => (
                  <tr key={key}>
                    {/* User column - no wrapping */}
                    <td className="px-2 md:px-4 py-2 md:py-3 border-r border-black font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                      {n.user}
                    </td>

                    {/* Description column - allow wrapping only here */}
                    <td className="px-2 md:px-4 py-2 md:py-3 border-r border-black font-medium whitespace-pre-line">
                      {n.description}
                    </td>

                    {/* Date column - no wrapping */}
                    <td className="px-2 md:px-4 py-2 md:py-3 border-r border-black font-medium whitespace-nowrap">
                      {formatDate(n.date)}
                    </td>

                    {/* Action column - no wrapping */}
                    <td className="px-2 md:px-4 py-2 md:py-3 space-x-1 md:space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        className="text-green-600 cursor-pointer hover:underline"
                        onClick={() => handleEdit(i)}
                      >
                        {"Edit"}
                      </button>
                      <span className="text-gray-400" aria-hidden="true">
                        {"|"}
                      </span>
                      <button
                        type="button"
                        className="text-red-600 cursor-pointer hover:underline"
                        onClick={() => handleDelete(i)}
                      >
                        {"Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden px-4">
            {rows.map(({ n, i, key }) => (
              <div key={key} className="bg-[#BAC7E5] rounded-lg shadow-md p-4">
                <p className="text-sm font-semibold text-[#1F2A44]">
                  {"User: "}
                  <span className="font-normal">{n.user}</span>
                </p>
                <p className="text-sm mt-2 whitespace-pre-line">
                  {n.description}
                </p>
                <p className="text-xs text-gray-700 mt-2">
                  {formatDate(n.date)}
                </p>
                <div className="flex justify-end mt-3 space-x-3">
                  <button
                    type="button"
                    className="text-green-600 text-sm font-medium"
                    onClick={() => handleEdit(i)}
                  >
                    {"Edit"}
                  </button>
                  <button
                    type="button"
                    className="text-red-600 text-sm font-medium"
                    onClick={() => handleDelete(i)}
                  >
                    {"Delete"}
                  </button>
                </div>
              </div>
            ))}
            {rows.length === 0 && (
              <p className="text-gray-600 text-center py-4">
                {"No notices found."}
              </p>
            )}
          </div>
        </>
      )}

      {/* Edit Modal */}
      <EditActivity
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        onUpdate={handleUpdate}
        initialData={{
          ...editData,
          // Preserve your behavior: pass formatted date into the modal
          date: formatDate(editData?.date),
        }}
        index={editingIndex}
      />
    </div>
  );
}
