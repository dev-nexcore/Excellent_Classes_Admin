"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";

export default function AddTopper({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    course: "",
    percentage: "",
    year: "",
    category: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "percentage") {
      // Allow empty string (when deleting) or partial typing
      if (value === "" || Number(value) <= 100) {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  
  const percentageValue = Number(form.percentage);
  if (
    !form.name.trim() ||
    !form.course.trim() ||
    !form.year.trim() ||
    isNaN(percentageValue) ||
    percentageValue < 0 ||
    percentageValue > 100
  ) {
    alert("Please fill all fields correctly. Percentage must be between 0 and 100.");
    return;
  }

  const trimmedForm = {
    name: form.name.trim(),
    course: form.course.trim(),
    percentage: percentageValue,
    year: form.year.trim(),
    category: form.category.trim(),
  };

  console.log("📌 Submitting topper:", trimmedForm); // <-- Debug line

  onAdd(trimmedForm);
  setForm({ name: "", course: "", percentage: "", year: "", category: "" });
};


  return (
    <div className="p-6 text-[#1F2A44]">
      <h2 className="text-2xl font-bold mb-4">Add New Topper</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="add-name" className="block font-semibold mb-1">
            Name of Student
          </label>
          <input
            id="add-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter student's full name"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Course */}
        <div>
          <label htmlFor="add-course" className="block font-semibold mb-1">
            Name of Course/Section
          </label>
          <input
            id="add-course"
            type="text"
            name="course"
            value={form.course}
            onChange={handleChange}
            placeholder="e.g., B.Sc Computer Science"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
          {/* category Dropdown */}
        <div>
          <label htmlFor="add-category" className="block font-semibold mb-1">
            category
          </label>
          <select
            id="add-category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">-- Select category --</option>
            <option value="SSC">SSC</option>
            <option value="HSC Science">HSC Science</option>
            <option value="HSC Commerce">HSC Commerce</option>
          </select>
        </div>

        {/* Percentage */}
        <div>
          <label htmlFor="add-percentage" className="block font-semibold mb-1">
            Percentage
          </label>
          <input
            id="add-percentage"
            type="number"
            name="percentage"
            value={form.percentage}
            onChange={handleChange}
            placeholder="Enter percentage (35-100)"
            className="w-full border border-gray-300 rounded-md p-2"
            min="35"
            max="100"
            required
          />
        </div>

        {/* Year */}
        <div>
          <label htmlFor="add-year" className="block font-semibold mb-1">
            Year
          </label>
          <input
            id="add-year"
            type="text"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="e.g., 2024"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#1F2A44] text-white px-4 py-2 rounded-md hover:scale-105 transition"
        >
          Add Topper
        </button>
      </form>
    </div>
  );
}

AddTopper.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
