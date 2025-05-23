// helpers/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // ✅ required to send HTTP-only cookie
});

export default axiosInstance;
