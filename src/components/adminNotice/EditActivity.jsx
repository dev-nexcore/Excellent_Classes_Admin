"use client";

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
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

// Convert from "19 June 2025" → "2025-06-19" for <input type="date">
const parseDateForInput = (dateString) => {
  if (!dateString) return "";
  const parts = String(dateString).split(" ");
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

export default function EditActivity({
  isOpen,
  onClose,
  onUpdate,
  initialData,
  index,
}) {
  const [formData, setFormData] = useState({
    user: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dateInputRef = useRef(null);

  // Initialize form data when modal opens or initial data changes
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
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleDateChange = (e) => {
    const rawDate = e.target.value; // yyyy-mm-dd
    const formatted = formatDate(rawDate);
    setFormData((prev) => ({ ...prev, date: formatted }));
  };

  const openDatePicker = (e) => {
    try {
      e?.preventDefault?.();
      const input = dateInputRef.current;
      if (!input) return;

      // Try the native picker if available (Chromium)
      if (typeof input.showPicker === "function") {
        input.showPicker();
        return;
      }
      // Fallbacks for browsers without showPicker
      input.focus();
      // Programmatically trigger the date input
      input.click?.();
    } catch (_err) {
      // Last resort: focus the field, let the user open it manually
      dateInputRef.current?.focus?.();
    }
  };

  const handleSubmit = async () => {
    if (!formData.description || !formData.date) {
      setError("Description and date are required.");
      return;
    }
    setLoading(true);
    try {
      // Prepare the payload according to your controller requirements
      const payload = {
        user: formData.user,
        description: formData.description,
        date: formData.date, // The formatted date string (e.g., "19 June 2025")
      };

      await onUpdate(index, payload);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update notice.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Edit Notice"
    >
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg relative">
        <h2 className="text-xl font-bold mb-4 text-[#1F2A44]">
          {"Edit Notice"}
        </h2>

        <div className="space-y-4">
          <label htmlFor="edit-user" className="sr-only">
            {"User Email"}
          </label>
          <input
            id="edit-user"
            type="text"
            placeholder="User Email"
            value={formData.user}
            onChange={handleChange("user")}
            className="w-full px-4 py-2 border text-[#1F2A44] border-gray-300 rounded-md text-sm"
            disabled // Making user field read-only as it comes from admin
          />

          <label htmlFor="edit-description" className="sr-only">
            {"Notice Description"}
          </label>
          <textarea
            id="edit-description"
            placeholder="Notice Description"
            value={formData.description}
            onChange={handleChange("description")}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 text-[#1F2A44] rounded-md text-sm resize-none"
          />

          {/* Date Input with Calendar Icon */}
          <div className="relative w-full">
            <label htmlFor="edit-date" className="sr-only">
              {"Date"}
            </label>
            <input
              id="edit-date"
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
              style={{ width: "auto", height: "auto" }}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onMouseDown={openDatePicker}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openDatePicker(e);
                }
              }}
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 mt-2" role="alert">
            {error}
          </p>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-400 text-gray-700"
            disabled={loading}
          >
            {"Cancel"}
          </button>
          <button
            type="button"
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
}

EditActivity.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    user: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string, // formatted string like "19 June 2025"
  }),
  index: PropTypes.number,
};
