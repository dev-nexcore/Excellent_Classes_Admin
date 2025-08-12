import api from "@/lib/api-client";

// const seeded = [
//   {
//     id: "admin1-2025-06-19",
//     user: "admin1@.com",
//     description: 'Added a new notice:\n"Final Exam Timetable"',
//     date: "2025-06-19",
//   },
//   {
//     id: "admin2-2025-06-15",
//     user: "admin2@.com",
//     description: 'Deleted the notice:\n"Old Timetable Notice"',
//     date: "2025-06-15",
//   },
//   {
//     id: "admin3-2025-06-12",
//     user: "admin3@.com",
//     description: 'Updated the notice:\n"Library Closed on Friday"',
//     date: "2025-06-12",
//   },
// ];

export async function fetchNotices() {
  try {
    const { data } = await api.get("/notices");
    return data;
  } catch (err) {
    throw err.response?.data || { message: "Network error" };
  }
}

export async function addNotice(payload) {
  try {
    const { data } = await api.post("/notices", payload);
    return data;
  } catch (err) {
    throw err.response?.data || { message: "Network error" };
  }
}

export async function updateNotice(id, payload) {
  try {
    const { data } = await api.put(`/notices/${id}`, payload);
    return data;
  } catch (err) {
    throw err.response?.data || { message: "Network error" };
  }
}

export async function deleteNotice(id) {
  try {
    await api.delete(`/notices/${id}`);
    return { ok: true };
  } catch (err) {
    throw err.response?.data || { message: "Network error" };
  }
}
