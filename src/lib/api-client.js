// lib/api-client.js
import axios from "axios";

const baseURL = "https://excellent-api.code4bharat.com/api/admin";
//const baseURL = "http://localhost:5001/api/admin";

const api = axios.create({
  baseURL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
