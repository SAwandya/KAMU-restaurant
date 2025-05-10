// contexts/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation"; // Changed from next/router
import {
  login,
  logout,
  validateToken,
  registerCustomer,
  registerRider,
  User,
  RegisterCustomerData,
  RegisterRiderData,
} from "../services/authService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUpCustomer: (data: RegisterCustomerData) => Promise<User>;
  signUpRider: (data: RegisterRiderData) => Promise<User>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get stored user from localStorage
        const storedUser =
          typeof window !== "undefined" ? localStorage.getItem("user") : null;

        if (storedUser) {
          // First set the user from localStorage to avoid flicker
          setUser(JSON.parse(storedUser));

          // Then validate the token
          const valid = await validateToken();

          if (!valid) {
            console.log("Token validation failed, logging out");
            // Only clear user if token is invalid
            setUser(null);

            // Clear localStorage if token is invalid
            if (typeof window !== "undefined") {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("user");

              // Clear cookies
              document.cookie = "userRole=; path=/; max-age=0";
              document.cookie = "accessToken=; path=/; max-age=0";
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      setUser(data.user);

      // Store user data in localStorage and cookies
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);

        // Set cookies for middleware
        document.cookie = `userRole=${data.user.role}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`; // 7 days
        document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${
          60 * 60 * 24 * 7
        }`; // 7 days
      }

      return data.user;
    } finally {
      setLoading(false);
    }
  };
  const signUpCustomer = async (data: RegisterCustomerData) => {
    setLoading(true);
    try {
      const user = await registerCustomer(data);
      setUser(user);

      // No need to store in localStorage yet since they need to sign in first

      return user;
    } finally {
      setLoading(false);
    }
  };
  const signUpRider = async (data: RegisterRiderData) => {
    setLoading(true);
    try {
      const user = await registerRider(data);
      setUser(user);

      // No need to store in localStorage yet since they need to sign in first

      return user;
    } finally {
      setLoading(false);
    }
  };
  const signOut = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);

      // Clear user data from localStorage and cookies
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");

        // Clear cookies
        document.cookie = "userRole=; path=/; max-age=0";
        document.cookie = "accessToken=; path=/; max-age=0";
      }

      router.push("/signin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signIn,
        signUpCustomer,
        signUpRider,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
