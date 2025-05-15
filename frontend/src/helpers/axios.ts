// src/api/axios.ts
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // ensures cookies (tokens) are sent
});

export default axiosInstance;
