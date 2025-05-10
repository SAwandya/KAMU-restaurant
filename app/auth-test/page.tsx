"use client";

import { useState } from "react";
import Link from "next/link";
import AuthDebugger from "@/components/AuthDebugger";

export default function AuthTestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Authentication Test Page</h1>

      <div className="mb-6">
        <p className="mb-4">
          This page helps you test your authentication and authorization setup.
          It will show you your current authentication status and allow you to
          test accessing different role-restricted areas.
        </p>

        <AuthDebugger />
      </div>

      <div className="mt-8 border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/signin"
            className="p-3 bg-blue-100 hover:bg-blue-200 rounded"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="p-3 bg-green-100 hover:bg-green-200 rounded"
          >
            Sign Up
          </Link>
          <Link href="/" className="p-3 bg-gray-100 hover:bg-gray-200 rounded">
            Home Page
          </Link>
          <Link
            href="/unauthorized"
            className="p-3 bg-red-100 hover:bg-red-200 rounded"
          >
            Unauthorized Page
          </Link>
        </div>
      </div>
    </div>
  );
}
