import axios from "axios";
import { useAuthStore } from "@/store/auth";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // required to send refresh_token cookie
});

// 🔐 Add Authorization header from Zustand
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔁 Token refresh on 401
let isRefreshing = false;
let failedQueue: Array<() => void> = [];

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    console.log(err);

    if (
      err.response?.data?.detail.toLowerCase() === "signature has expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push(() => resolve(api(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        const refreshRes = await api.post("/auth/refresh-token");
        const newToken = refreshRes.data?.content?.access_token;

        if (newToken) {
          useAuthStore.getState().setAccessToken(newToken);
          failedQueue.forEach((cb) => cb());
          failedQueue = [];
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshErr) {
        useAuthStore.getState().clearAuth();
        failedQueue = [];
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
