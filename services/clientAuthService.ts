"use client"; // Force this code to only run on client

import api, { setAccessToken } from "./api";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  [key: string]: any;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

// Client-side login function that will trigger network requests in the browser
export const clientLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  // Ensure we're on the client side
  if (typeof window === "undefined") {
    throw new Error("clientLogin must be called from client side code");
  }

  console.log("Client-side login request to:", "/auth/login");
  try {
    // Use relative URL path that will be proxied through Next.js
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("Login response received:", response.status);
    console.log("Response headers:", response.headers);

    if (response.data && response.data.accessToken) {
      setAccessToken(response.data.accessToken);
      // Store the token in localStorage to ensure client-side operation
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } else {
      console.warn("No access token in response:", response.data);
    }
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error);

    // Log detailed error information for debugging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
      throw new Error(
        error.response.data?.message || `Server error: ${error.response.status}`
      );
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      console.error("No response received:", error.request);
      throw new Error(
        "No response from server - check if the backend is running"
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request setup error:", error.message);
      throw new Error(`Request failed: ${error.message}`);
    }
  }
};
