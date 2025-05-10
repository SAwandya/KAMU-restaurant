"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LogoutButton() {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      // signOut redirects to /signin, so no need to do anything else here
    } catch (error) {
      console.error("Logout failed:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        padding: "8px 16px",
        backgroundColor: "#E53E3E", // red color
        color: "white",
        border: "none",
        borderRadius: 4,
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.6 : 1,
      }}
      aria-label="Logout"
      type="button"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
