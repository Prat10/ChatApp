import axios from "axios";
// const BASE_URL =import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : `${import.meta.env.VITE_BASE_URL}/api`,
  // baseURL:BASE_URL,
  withCredentials: true,
});
