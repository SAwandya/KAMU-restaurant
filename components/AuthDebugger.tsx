"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * This component is for testing role-based authorization
 */
export default function AuthDebugger() {
  const { user, isAuthenticated } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [cookies, setCookies] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get token from localStorage
      const storedToken = localStorage.getItem("accessToken");
      setAccessToken(storedToken);

      // Parse cookies
      const cookieObj: Record<string, string> = {};
      document.cookie.split(";").forEach((cookie) => {
        const [key, value] = cookie.trim().split("=");
        if (key && value) cookieObj[key] = value;
      });
      setCookies(cookieObj);
    }
  }, [user]);

  return (
    <div className="p-6 bg-white rounded shadow max-w-lg mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">Auth Debugger</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Authentication Status</h2>
        <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
      </div>

      {user && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">User Info</h2>
          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Token (first 20 chars)</h2>
        <p className="break-all">
          {accessToken ? `${accessToken.substring(0, 20)}...` : "No token"}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Cookies</h2>
        <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-40">
          {JSON.stringify(cookies, null, 2)}
        </pre>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <a
          href="/dashboard"
          className="px-4 py-2 bg-blue-500 text-white rounded text-center"
        >
          Customer Dashboard
        </a>
        <a
          href="/dashboard/restaurant"
          className="px-4 py-2 bg-green-500 text-white rounded text-center"
        >
          Restaurant Dashboard
        </a>
        <a
          href="/dashboard/rider"
          className="px-4 py-2 bg-yellow-500 text-white rounded text-center"
        >
          Rider Dashboard
        </a>
        <a
          href="/dashboard/admin"
          className="px-4 py-2 bg-red-500 text-white rounded text-center"
        >
          Admin Dashboard
        </a>
      </div>
    </div>
  );
}
