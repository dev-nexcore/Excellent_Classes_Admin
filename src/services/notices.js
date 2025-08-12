import api from "@/lib/api-client";

// Seed with stable ids and ISO dates. Keep behavior identical on the UI.
const seeded = [
  {
    id: "admin1-2025-06-19",
    user: "admin1@.com",
    description: 'Added a new notice:\n"Final Exam Timetable"',
    date: "2025-06-19",
  },
  {
    id: "admin2-2025-06-15",
    user: "admin2@.com",
    description: 'Deleted the notice:\n"Old Timetable Notice"',
    date: "2025-06-15",
  },
  {
    id: "admin3-2025-06-12",
    user: "admin3@.com",
    description: 'Updated the notice:\n"Library Closed on Friday"',
    date: "2025-06-12",
  },
];

// Ready for axios later; for now, return the in-memory seed to preserve behavior.
export async function createNotice(_payload) {
  const { data } = await api.post("/notices", _payload);
  return data;
}

export async function addNotice(_payload) {
  const { data } = await api.post("/notices", _payload);
  return data;
}

export async function fetchNotices() {
  const { data } = await api.get("/notices");
  return data;
}
export async function updateNotice(_id, _payload) {
  const { data } = await api.put(`/notices/${_id}`, _payload);
  return data;
}

export async function deleteNotice(_id) {
  await api.delete(`/notices/${_id}`);
  return { ok: true };
}
