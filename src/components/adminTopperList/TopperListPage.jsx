"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import {
  addTopper,
  deleteTopper,
  fetchToppers,
  updateTopper,
} from "@/services/toppers";
import EditTopper from "./EditTopper";
import AddTopper from "./AddTopper";

// Utility to lock scrolling when a modal is open
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

export default function TopperListPage() {
  const [year, setYear] = useState("");
  const [topperData, setTopperData] = useState(() => {
    // Seed with the same initial dataset for no visual change,
    // then hydrate from the service (keeps current behavior).
    return [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadToppers = async () => {
    try {
      const data = await fetchToppers();
      setTopperData(data);
    } catch (err) {
      console.error("Error fetching toppers:", err);
    }
  };
  useEffect(() => {
    loadToppers();
  }, []);

  // Prevent background scrolling when a modal is open
  const modalOpen = showAddModal || editIndex !== null;
  useScrollLock(modalOpen);

  const filteredRows = useMemo(() => {
    // Keep stable ids and original indices to avoid wrong target
    return topperData
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => (year ? item.year === year : true));
  }, [topperData, year]);
  // console.log("FilterRows: ", filteredRows);

  const handleEdit = (originalIndex) => setEditIndex(originalIndex);

  const handleDelete = async (originalIndex) => {
    try {
      const id = topperData[originalIndex]._id; // get the backend ID

      await deleteTopper(id); // call backend
      await loadToppers(); // refresh list from server
    } catch (err) {
      console.error("Failed to delete topper:", err);
    }
  };

  const handleUpdate = async (updatedTopper) => {
    if (editIndex === null) return;

    try {
      const id = topperData[editIndex]._id;

      const payload = {
        _id: id,
        name: updatedTopper.name.trim(),
        course: updatedTopper.course.trim(),
        percentage: Number(updatedTopper.percentage),
        year: updatedTopper.year.trim(),
      };

      await updateTopper(id, payload);

      await loadToppers(); // refresh table
      setEditIndex(null);
    } catch (err) {
      console.error("Failed to update topper:", err);
    }
  };
  const handleAddTopper = async (newTopper) => {
    try {
      // Call backend
      const savedTopper = await addTopper({
        name: newTopper.name, // maps "name" → "name"
        course: newTopper.course, // maps "course" → "course"
        percentage: Number(newTopper.percentage), // ensure it's a Number
        year: newTopper.year,
         category: newTopper.category,
      });

      // // Update local state with the saved data from backend
      // setTopperData((prev) => [savedTopper, ...prev]);
      setShowAddModal(false);
      await loadToppers();
    } catch (error) {
      console.error("Failed to add topper:", error);
      alert("Error adding topper. Please try again.");
    }
  };

  const onKeyDownCloseModal = (e) => {
    if (e.key === "Escape") {
      if (showAddModal) setShowAddModal(false);
      if (editIndex !== null) setEditIndex(null);
    }
  };

  return (
    <div
      className="h-auto bg-[#F4F9FF] p-4 md:p-6 font-[poppins]"
      onKeyDown={onKeyDownCloseModal}
      role="region"
      aria-label="Topper list management"
    >
      <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2A44] mb-6">
        Edit Topper List
      </h1>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="relative w-full max-w-[180px]">
          <label htmlFor="year-filter" className="sr-only">
            Filter by year
          </label>
          <select
            id="year-filter"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        <button
          type="button"
          className="bg-[#1F2A44] text-white text-sm px-4 py-2 rounded-lg font-medium shadow-md hover:scale-105 transition"
          onClick={() => setShowAddModal(true)}
        >
          Add New Column
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white text-center ">
          <thead>
            <tr className="bg-[#E85222] text-white text-sm font-semibold">
              <th scope="col" className="px-4 py-3 border-r border-black">
                Name of Student
              </th>
              <th scope="col" className="px-4 py-3 border-r border-black">
                Name of Course/Section
              </th>
              <th scope="col" className="px-4 py-3 border-r border-black">
                Percentage
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredRows.length > 0 ? (
              filteredRows.map(({ item, idx }) => (
                <tr
                  key={item._id || idx}
                  className="border-t  border-black text-center"
                >
                  <td className="px-4 py-3 border-r border-black font-medium">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 border-r border-black font-medium">
                    {item.course}
                  </td>
                  <td className="px-4 py-3 border-r border-black font-medium">
                    {item.percentage}%
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(idx)}
                      className="text-[#096604] hover:underline font-medium"
                    >
                      Edit
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="text-[#C70000] hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No toppers found for selected year.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredRows.length > 0 ? (
          filteredRows.map(({ item, idx }) => (
            <div
              key={item._id || idx}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
            >
              <p className="font-semibold text-[#1F2A44] text-lg mb-2">
                {item.name}
              </p>
              <p className="text-[#1F2A44] font-semibold">
                <span className="font-medium">Course/Section: </span>
                {item.course}
              </p>
              <p className="text-[#1F2A44] font-semibold">
                <span className="font-medium">Percentage: </span>
                {item.percentage}%
              </p>
              <div className="flex justify-end mt-4 space-x-3">
                <button
                  type="button"
                  onClick={() => handleEdit(idx)}
                  className="text-[#096604] text-sm hover:underline font-medium"
                >
                  Edit
                </button>
                <span className="text-gray-400" aria-hidden="true">
                  |
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="text-[#C70000] text-sm hover:underline font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#1F2A44] text-center py-4">
            No toppers found for selected year.
          </p>
        )}
      </div>

      {/* Edit Modal */}
      {editIndex !== null && topperData[editIndex] && (
        <div
          className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex justify-center items-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Edit Topper"
        >
          <div className="bg-[#F4F9FF] rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              type="button"
              onClick={() => setEditIndex(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
              aria-label="Close edit modal"
            >
              {"×"}
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
        <div
          className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex justify-center items-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Add New Topper"
        >
          <div className="bg-[#F4F9FF] rounded-lg shadow-lg max-w-2xl w-full relative">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
              aria-label="Close add modal"
            >
              {"×"}
            </button>
            <AddTopper onAdd={handleAddTopper} />
          </div>
        </div>
      )}
    </div>
  );
}
