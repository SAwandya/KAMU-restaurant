// services/api.ts
"use client"; // This ensures the file only runs on the client side

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

// Use relative URL to leverage Next.js API route proxying
// This will use the current origin (e.g. http://localhost:3001)
const API_BASE_URL = "http://localhost:3000/api";

// Only initialize these variables in a client-side context
let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials must be false when using Next.js proxy to avoid CORS issues
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: any) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/auth/refresh-token");
        const newAccessToken = response.data.accessToken;

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return api(originalRequest);
        }
      } catch (refreshError) {
        clearAccessToken();
        if (typeof window !== "undefined") {
          window.location.href = "/signin";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
