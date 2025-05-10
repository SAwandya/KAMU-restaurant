"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if not authenticated or not an Admin
  useEffect(() => {
    if (mounted && !loading) {
      if (!isAuthenticated) {
        router.push("/signin");
      } else if (user?.role !== "Admin") {
        router.push("/unauthorized");
      }
    }
  }, [user, isAuthenticated, loading, router, mounted]);

  if (!mounted || loading || !isAuthenticated || !user) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">
            Welcome, {user.fullName}!
          </h2>
          <p className="text-gray-600">
            Your role: <span className="font-semibold">{user.role}</span>
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded p-4 mb-6">
          <h3 className="font-bold text-red-800">Admin Access Only</h3>
          <p className="text-red-700">
            This page is only accessible to users with the Admin role.
          </p>
        </div>

        <div className="flex space-x-4">
          <Link
            href="/auth-test"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Auth Test Page
          </Link>
        </div>
      </div>
    </div>
  );
}
