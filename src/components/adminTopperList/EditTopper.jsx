"use client";

import React, { useState } from "react";

export default function EditTopper({ data, onUpdate, onCancel }) {
  const [form, setForm] = useState({
    name: data.name,
    course: data.course,
    percentage: data.percentage,
    year: data.year,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-[#1F2A44]">Edit Topper</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Student Name"
          className="border border-gray-300 text-[#1F2A44] rounded-md px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="course"
          value={form.course}
          onChange={handleChange}
          placeholder="Course/Section"
          className="border border-gray-300 text-[#1F2A44] rounded-md px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="percentage"
          value={form.percentage}
          onChange={handleChange}
          placeholder="Percentage"
          className="border border-gray-300 text-[#1F2A44] rounded-md px-4 py-2 w-full"
          required
        />
        <select
          name="year"
          value={form.year}
          onChange={handleChange}
          className="border border-gray-300 text-[#1F2A44] rounded-md px-4 py-2 w-full"
          required
        >
          <option value="">Select Year</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#1F2A44] text-white px-6 py-2 rounded-md hover:bg-[#162035] transition"
        >
          Update
        </button>
      </div>
    </form>
  );
}
