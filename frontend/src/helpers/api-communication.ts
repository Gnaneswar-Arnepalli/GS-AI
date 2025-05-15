import axios from "axios";

// Create axios instance with base config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api", // Use Vite environment variable
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to inject token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Type definitions
type UserResponse = {
  message: string;
  token?: string;
  name: string;
  email: string;
};

type ChatResponse = {
  message: string;
  chats: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<UserResponse> => {
  try {
    const res = await api.post<UserResponse>("/user/login", { email, password });
    
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unable to login");
    }
    throw new Error("Unknown error occurred during login");
  }
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
): Promise<UserResponse> => {
  try {
    const res = await api.post<UserResponse>("/user/signup", {
      name,
      email,
      password,
    });

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.status === 409 
        ? "User already exists" 
        : error.response?.data?.message || "Unable to signup";
      throw new Error(errorMessage);
    }
    throw new Error("Unknown error occurred during signup");
  }
};

export const checkAuthStatus = async (): Promise<UserResponse> => {
  try {
    const res = await api.get<UserResponse>("/user/auth-status");
    return res.data;
  } catch (error) {
    localStorage.removeItem("token");
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Authentication failed");
    }
    throw new Error("Unknown authentication error");
  }
};

export const sendChatRequest = async (
  message: string
): Promise<ChatResponse> => {
  try {
    const res = await api.post<ChatResponse>("/chat/new", { message });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Session expired. Please login again.");
      }
      throw new Error(error.response?.data?.message || "Failed to send message");
    }
    throw new Error("Unknown error occurred while sending message");
  }
};

export const getUserChats = async (): Promise<ChatResponse> => {
  try {
    const res = await api.get<ChatResponse>("/chat/all-chats");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to load chats");
    }
    throw new Error("Unknown error occurred while loading chats");
  }
};

export const deleteUserChats = async (): Promise<{ message: string }> => {
  try {
    const res = await api.delete<{ message: string }>("/chat/delete");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to delete chats");
    }
    throw new Error("Unknown error occurred while deleting chats");
  }
};

export const logoutUser = async (): Promise<{ message: string }> => {
  try {
    const res = await api.get<{ message: string }>("/user/logout");
    localStorage.removeItem("token");
    return res.data;
  } catch (error) {
    localStorage.removeItem("token");
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Logout failed");
    }
    throw new Error("Unknown error occurred during logout");
  }
};
