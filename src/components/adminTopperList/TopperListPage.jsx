"use client";

import React, { useState } from "react";
import Image from "next/image";
import EditTopper from "./EditTopper";
import AddTopper from "./AddTopper";

const initialTopperData = [
  {
    name: "Hassan Salim Shaikh",
    course: "10th MSB",
    percentage: "91.16%",
    year: "2024",
  },
  {
    name: "Varad Jagdish Gurav",
    course: "10th CBSC",
    percentage: "85.33%",
    year: "2024",
  },
  {
    name: "Mufeez Moin Shaban",
    course: "10th MSB",
    percentage: "72.83%",
    year: "2024",
  },
  {
    name: "Saurabh Tanaji Talape",
    course: "12th SCIENCE",
    percentage: "91.00%",
    year: "2025",
  },
  {
    name: "Surve Devendra Jitendra",
    course: "12th COMMERCE",
    percentage: "87.16%",
    year: "2025",
  },
];

export default function TopperListPage() {
  const [year, setYear] = useState("");
  const [topperData, setTopperData] = useState(initialTopperData);
  const [editIndex, setEditIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = [...topperData];
    updatedData.splice(index, 1);
    setTopperData(updatedData);
  };

  const handleUpdate = (updatedTopper) => {
    const updatedData = [...topperData];
    updatedData[editIndex] = updatedTopper;
    setTopperData(updatedData);
    setEditIndex(null);
  };

  const handleAddTopper = (newTopper) => {
    const updatedData = [newTopper, ...topperData]; // insert at index 0
    setTopperData(updatedData);
    setShowAddModal(false);
  };

  const filteredData = year
    ? topperData.filter((item) => item.year === year)
    : topperData;

  return (
    <div className="min-h-screen bg-[#F4F9FF] p-6">
      <h1 className="text-3xl font-extrabold text-[#1F2A44] mb-6">
        Edit Topper List
      </h1>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="relative w-full max-w-[180px]">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full appearance-none bg-white text-gray-800 border border-gray-300 rounded-lg p-2 text-sm px-4 shadow-md cursor-pointer"
          >
            <option value="">SELECT YEAR</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
          <Image
            src="/calendar.svg"
            alt="Calendar Icon"
            width={20}
            height={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
        </div>

        <button
          className="bg-[#1F2A44] text-white text-sm px-4 py-2 rounded-lg font-medium shadow-md hover:scale-105 transition"
          onClick={() => setShowAddModal(true)}
        >
          Add New Column
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full  shadow-md bg-white text-center">
          <thead>
            <tr className="bg-[#E85222] text-white text-sm font-semibold">
              <th className="px-4 py-3 border-r border-black">
                Name of Student
              </th>
              <th className="px-4 py-3 border-r border-black">
                Name of Course/Section
              </th>
              <th className="px-4 py-3 border-r border-black">Percentage</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-900">
            {filteredData.length > 0 ? (
              filteredData.map((student, index) => (
                <tr key={index} className="border-t text-center">
                  <td className="px-4 py-3 border-r  border-gray-300 font-medium">
                    {student.name}
                  </td>
                  <td className="px-4 py-3 border-r border-gray-300">
                    {student.course}
                  </td>
                  <td className="px-4 py-3 border-r border-gray-300">
                    {student.percentage}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-[#096604] hover:underline"
                    >
                      Edit
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-[#C70000] hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No toppers found for selected year.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editIndex !== null && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              onClick={() => setEditIndex(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
            <EditTopper
              data={topperData[editIndex]}
              onUpdate={handleUpdate}
              onCancel={() => setEditIndex(null)}
            />
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
            <AddTopper onAdd={handleAddTopper} />
          </div>
        </div>
      )}
    </div>
  );
}
