"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signUpCustomer } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signUpCustomer({
        fullName,
        email,
        password,
        role: "RestaurantAdmin",
      });
      router.push("/signin"); // Redirect to signin after successful signup
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={loading}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          disabled={loading}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          disabled={loading}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ padding: 10, width: "100%" }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}
