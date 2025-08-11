// lib/api-client.js
import axios from "axios";

const baseURL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api/admin"
    : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api/admin";

const api = axios.create({
  baseURL,
  timeout: 15000,
});

// Attach token automatically to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // store your JWT here after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
