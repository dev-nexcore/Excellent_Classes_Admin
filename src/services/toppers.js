import api from "@/lib/api-client";

// const seeded = [
//   {
//     id: "hassan-2024",
//     name: "Hassan Salim Shaikh",
//     course: "10th MSB",
//     percentage: "91.16%",
//     year: "2024",
//   },
//   {
//     id: "varad-2024",
//     name: "Varad Jagdish Gurav",
//     course: "10th CBSC",
//     percentage: "85.33%",
//     year: "2024",
//   },
//   {
//     id: "mufeez-2024",
//     name: "Mufeez Moin Shaban",
//     course: "10th MSB",
//     percentage: "72.83%",
//     year: "2024",
//   },
//   {
//     id: "saurabh-2025",
//     name: "Saurabh Tanaji Talape",
//     course: "12th SCIENCE",
//     percentage: "91.00%",
//     year: "2025",
//   },
//   {
//     id: "surve-2025",
//     name: "Surve Devendra Jitendra",
//     course: "12th COMMERCE",
//     percentage: "87.16%",
//     year: "2025",
//   },
// ];

export async function fetchToppers() {
  try {
    const { data } = await api.get("/toppers/getTopper");
    return data;
  } catch (error) {
    console.error("Error fetching toppers:", error);
    throw error;
  }
}

export async function addTopper(payload) {
  try {
    const { data } = await api.post("/toppers/addTopper", payload);
    return data;
  } catch (error) {
    console.error("Error adding topper:", error);
    throw error;
  }
}

export async function updateTopper(id, payload) {
  try {
    const { data } = await api.put(`/toppers/updateTopper/${id}`, payload);
    return data;
  } catch (error) {
    console.error(`Error updating topper with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteTopper(id) {
  try {
    await api.delete(`/toppers/deleteTopper/${id}`);
    return { ok: true };
  } catch (error) {
    console.error(`Error deleting topper with ID ${id}:`, error);
    throw error;
  }
}
