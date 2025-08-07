"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Convert date to display format: 19 June 2025
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Convert from 19 June 2025 → 2025-06-19
const parseDateForInput = (dateString) => {
  if (!dateString) return "";
  const parts = dateString.split(" ");
  if (parts.length !== 3) return "";

  const [day, monthName, year] = parts;
  const months = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const month = months[monthName];
  if (!month) return "";

  const paddedDay = day.padStart(2, "0");
  return `${year}-${month}-${paddedDay}`;
};

const EditActivity = ({ isOpen, onClose, onUpdate, initialData, index }) => {
  const [formData, setFormData] = useState({
    user: "",
    description: "",
    date: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dateInputRef = useRef(null);

  // Initialize form data when modal opens
  useEffect(() => {
    if (initialData) {
      setFormData({
        user: initialData.user || "",
        description: initialData.description || "",
        date: initialData.date || "",
      });
    }
  }, [initialData]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleDateChange = (e) => {
    const rawDate = e.target.value;
    const formatted = formatDate(rawDate);
    setFormData({ ...formData, date: formatted });
  };

  const openDatePicker = () => {
    if (dateInputRef.current?.showPicker) {
      dateInputRef.current.showPicker();
    } else {
      dateInputRef.current?.focus();
    }
  };

  const handleSubmit = async () => {
    if (!formData.user || !formData.description || !formData.date) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await onUpdate(index, formData);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to update notice.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg relative">
        <h2 className="text-xl font-bold mb-4 text-[#1F2A44]">Edit Notice</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="User Email"
            value={formData.user}
            onChange={handleChange("user")}
            className="w-full px-4 py-2 border text-[#1F2A44] border-gray-300 rounded-md text-sm"
          />
          <textarea
            placeholder="Notice Description"
            value={formData.description}
            onChange={handleChange("description")}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 text-[#1F2A44] rounded-md text-sm resize-none"
          />

          {/* ✅ Date Input with Calendar Icon */}
          <div className="relative w-full">
            <input
              ref={dateInputRef}
              type="date"
              value={parseDateForInput(formData.date)}
              onChange={handleDateChange}
              className="w-full px-4 py-2 pr-10 text-[#1F2A44] border border-gray-300 rounded-md text-sm bg-white cursor-pointer"
              placeholder="Select date"
            />
            <Image
              src="/calendar.svg"
              alt="Calendar Icon"
              width={20}
              height={20}
              style={{ width: "auto", height: "auto" }} // ✅ maintain aspect ratio
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={openDatePicker}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-400 text-gray-700"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#1F2A44] text-white px-5 py-2 rounded-md text-sm font-medium shadow-md"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditActivity;
