// services/authService.ts
"use client"; // Force client-side only execution

import api, { setAccessToken, clearAccessToken } from "./api";

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

export interface RegisterCustomerData {
  fullName: string;
  email: string;
  password: string;
  role?: string;
}

export interface RegisterRiderData extends RegisterCustomerData {
  vehicleREG: string;
}

export const registerCustomer = async (
  data: RegisterCustomerData
): Promise<User> => {
  const response = await api.post("/auth/register/customer", data);
  return response.data.user;
};

export const registerRider = async (data: RegisterRiderData): Promise<User> => {
  const response = await api.post("/auth/register/rider", data);
  return response.data.user;
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  console.log("Login request being made to:", "/auth/login");

  try {
    const response = await api.post("/auth/login", { email, password });
    console.log("Login response received:", response.status);

    if (response.data.accessToken) {
      setAccessToken(response.data.accessToken);

      // Store user data in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Set a cookie for the user role (for middleware)
        document.cookie = `userRole=${
          response.data.user.role
        }; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
        // Also set the access token as a cookie for middleware
        document.cookie = `accessToken=${
          response.data.accessToken
        }; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
      }
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    // Get the access token from localStorage as a fallback
    let token = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("accessToken");
    }

    // Send the token in headers and an empty refreshToken in the body
    await api.post("/auth/logout", { refreshToken: "" });
    clearAccessToken();

    // Clear user data from localStorage and cookies
    if (typeof window !== "undefined") {
      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // Clear cookies
      document.cookie = "userRole=; path=/; max-age=0";
      document.cookie = "accessToken=; path=/; max-age=0";
    }
  } catch (error) {
    console.error("Logout error:", error);
    // Even if the server logout fails, clear local storage and cookies
    if (typeof window !== "undefined") {
      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // Clear cookies
      document.cookie = "userRole=; path=/; max-age=0";
      document.cookie = "accessToken=; path=/; max-age=0";
    }
    clearAccessToken();
  }
};

export const validateToken = async (): Promise<boolean> => {
  // Check if we have a token stored
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("accessToken");

    if (!storedToken) {
      return false;
    }

    // Set the token for API calls
    setAccessToken(storedToken);
  }

  try {
    await api.get("/auth/validate");
    return true;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
};
