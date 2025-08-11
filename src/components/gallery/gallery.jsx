"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("No File chosen");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = "http://localhost:5001/api/admin/media";

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const response = await fetch(`${API_BASE_URL}/images/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete: ${response.status} ${response.statusText}`
        );
      }
      setImages((prev) => prev.filter((img) => img._id !== id));
      console.log("✅ Image deleted successfully");
    } catch (err) {
      console.error("❌ Failed to delete image", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        console.error("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        console.error("Image must be smaller than 5MB");
        return;
      }
      setSelectedFile(file);
      setSelectedFileName(file.name);
    } else {
      setSelectedFile(null);
      setSelectedFileName("No File chosen");
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(`${API_BASE_URL}/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText} - ${errorData}`
        );
      }

      const data = await response.json();
      console.log("✅ Upload response:", data);
      const newImage = {
        _id: data._id || data.public_id || String(Date.now()),
        imageUrl: data.imageUrl || data.secure_url || data.path || "",
      };
      setImages((prev) => [newImage, ...prev]);
      setSelectedFile(null);
      setSelectedFileName("No File chosen");
      const fileInput = document.getElementById("file-upload");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error("❌ Upload failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearSelectedFile = () => {
    setSelectedFile(null);
    setSelectedFileName("No File chosen");
    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/images`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        const normalized = (data || []).map((d) => ({
          _id: d._id ?? d.public_id ?? undefined,
          imageUrl: d.imageUrl ?? d.secure_url ?? d.path ?? "",
        }));
        setImages(normalized);
      } catch (err) {
        console.error("❌ Failed to fetch images", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-[#F4F9FF]">
      {/* Main Heading  */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[#1F2A44]">
        Gallery
      </h1>

      {/* Upload Section */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1F2A44]">
        Add New Photos
      </h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        {/* Custom File Input */}
        <div className="relative w-full sm:w-auto">
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSubmitting}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center bg-[#D9D9D9] text-black rounded-md border-2 border-[#877575] px-4 py-2 cursor-pointer shadow-[0px_4.44px_4.44px_0px_#00000040]">
            <span className="bg-white text-black px-2 py-1 rounded mr-3 text-sm shadow-[0px_4.44px_4.44px_0px_#00000040]">
              Choose File
            </span>
            <span className="text-sm">{selectedFileName}</span>
          </div>
        </div>

        {/* Clear Selected File Icon */}
        <img
          src="/images/delete.png"
          alt="Clear Selected File"
          onClick={handleClearSelectedFile}
          className="w-6 h-6 cursor-pointer ml-4 hover:opacity-70 transition-opacity"
        />

        {/* Submit Button  */}
        <button
          onClick={handleSubmit}
          disabled={!selectedFile || isSubmitting}
          className={`px-5 py-2 border border-white rounded-[9.7px] sm:ml-10 transition-all ${
            selectedFile && !isSubmitting
              ? "bg-[#1f2a44] text-white hover:bg-[#1b243b] cursor-pointer"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
        </button>
      </div>

      {/* Secondary Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-[#1F2A44]">
        Gallery
      </h1>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div key={img._id ?? index} className="relative">
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src={
                  img.imageUrl ||
                  "/placeholder.svg?height=300&width=400&query=gallery%20image%20placeholder"
                }
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => handleDelete(img._id)}
              className="mt-2 ml-4 text-red-600 hover:underline font-medium bg-transparent border-none p-0 relative z-10"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
