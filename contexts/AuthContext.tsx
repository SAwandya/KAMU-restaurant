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
        const valid = await validateToken();
        if (valid) {
          // You may want to fetch user info here from an API endpoint
          // For demo, just set a dummy user or fetch from backend
          setUser({
            id: "1",
            fullName: "User",
            email: "user@example.com",
            role: "customer",
          });
        } else {
          setUser(null);
        }
      } catch {
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
