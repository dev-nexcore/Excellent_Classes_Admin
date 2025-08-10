import api from "@/lib/api-client";

// Seed data with stable ids to avoid key/index issues and preserve behaviors.
const seeded = [
  {
    id: "hassan-2024",
    name: "Hassan Salim Shaikh",
    course: "10th MSB",
    percentage: "91.16%",
    year: "2024",
  },
  {
    id: "varad-2024",
    name: "Varad Jagdish Gurav",
    course: "10th CBSC",
    percentage: "85.33%",
    year: "2024",
  },
  {
    id: "mufeez-2024",
    name: "Mufeez Moin Shaban",
    course: "10th MSB",
    percentage: "72.83%",
    year: "2024",
  },
  {
    id: "saurabh-2025",
    name: "Saurabh Tanaji Talape",
    course: "12th SCIENCE",
    percentage: "91.00%",
    year: "2025",
  },
  {
    id: "surve-2025",
    name: "Surve Devendra Jitendra",
    course: "12th COMMERCE",
    percentage: "87.16%",
    year: "2025",
  },
];

// In the future, swap these with real axios calls using `api`.
// For now, they return the in-memory data to preserve existing behavior.
export async function fetchToppers() {
  // Example (future):
  const { data } = await api.get("/toppers/getTopper");
  return data;
}

export async function addTopper(payload) {
  const { data } = await api.post("/toppers/addTopper", payload);
  return data;
}

export async function updateTopper(id, payload) {
  const data = await api.put(`/toppers/updateTopper/${id}`, payload);
  // console.log(data);

  return data;
}

export async function deleteTopper(id) {
  await api.delete(`/toppers/deleteTopper/${id}`);
}

/*
// In the future, swap these with real axios calls using `api`.
// For now, they return the in-memory data to preserve existing behavior.
export async function fetchToppers() {
  try {
    const { data } = await api.get("/toppers")
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.warn("fetchToppers: falling back to seeded data", err)
    return seeded.map((x) => ({ ...x }))
  }
}

export async function addTopper(payload) {
  try {
    const { data } = await api.post("/toppers", payload)
    return data
  } catch (err) {
    console.warn("addTopper: request failed", err)
    return { ok: false, error: "Request failed (using placeholder)" }
  }
}

export async function updateTopper(id, payload) {
  try {
    const { data } = await api.put(`/toppers/${encodeURIComponent(id)}`, payload)
    return data
  } catch (err) {
    console.warn("updateTopper: request failed", err)
    return { ok: false, error: "Request failed (using placeholder)" }
  }
}

export async function deleteTopper(id) {
  try {
    const { data } = await api.delete(`/toppers/${encodeURIComponent(id)}`)
    return data
  } catch (err) {
    console.warn("deleteTopper: request failed", err)
    return { ok: false, error: "Request failed (using placeholder)" }
  }
}

*/
