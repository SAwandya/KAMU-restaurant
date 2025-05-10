"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function AuthDebugHelper() {
  const { user, isAuthenticated, loading } = useAuth();
  const [cookieInfo, setCookieInfo] = useState<string>("");
  const [localStorageInfo, setLocalStorageInfo] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCookieInfo(document.cookie);

      try {
        const accessToken = localStorage.getItem("accessToken");
        const userStr = localStorage.getItem("user");
        setLocalStorageInfo(`
          accessToken: ${accessToken ? "present" : "missing"}
          user: ${userStr ? "present" : "missing"}
        `);
      } catch (e) {
        setLocalStorageInfo("Error reading localStorage");
      }
    }
  }, [user, isAuthenticated]);

  const refreshAuthStatus = () => {
    window.location.reload();
  };

  return (
    <div className="p-4 border rounded-md bg-slate-50 text-left">
      <h3 className="text-lg font-bold mb-2">Auth Debug Info</h3>

      <div className="mb-2">
        <p>
          <strong>Loading:</strong> {loading ? "Yes" : "No"}
        </p>
        <p>
          <strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}
        </p>
        <p>
          <strong>User:</strong>{" "}
          {user ? `${user.fullName} (${user.role})` : "Not signed in"}
        </p>
      </div>

      <div className="mb-2">
        <h4 className="font-semibold">Cookies:</h4>
        <pre className="text-xs bg-slate-100 p-2 rounded overflow-auto max-h-20">
          {cookieInfo || "No cookies found"}
        </pre>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">LocalStorage:</h4>
        <pre className="text-xs bg-slate-100 p-2 rounded overflow-auto max-h-20">
          {localStorageInfo || "No localStorage data"}
        </pre>
      </div>

      <Button onClick={refreshAuthStatus} className="mt-2">
        Refresh Auth Status
      </Button>
    </div>
  );
}
