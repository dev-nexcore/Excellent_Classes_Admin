import React, { useState } from "react";

export default function AddTopper({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    course: "",
    percentage: "",
    year: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      form.name.trim() &&
      form.course.trim() &&
      form.percentage.trim() &&
      form.year.trim()
    ) {
      const trimmedForm = {
        ...form,
        year: form.year.trim(), // only year
      };
      onAdd(trimmedForm);
      setForm({
        name: "",
        course: "",
        percentage: "",
        year: "",
      });
    }
  };

  return (
    <div className="p-6 text-[#1F2A44]">
      <h2 className="text-2xl font-bold mb-4">Add New Topper</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name of Student</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Name of Course/Section
          </label>
          <input
            type="text"
            name="course"
            value={form.course}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Percentage</label>
          <input
            type="text"
            name="percentage"
            value={form.percentage}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Year</label>
          <input
            type="text"
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
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
