"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clientLogin } from "@/services/clientAuthService"; // Using our client-side-only auth service
import styles from "./login.module.css";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // This useEffect ensures we're running on the client side
  useEffect(() => {
    // This will only execute in browser environment
    console.log("Sign-in page mounted on client-side");
  }, []);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Using clientLogin from our new client-side-only auth service
      const { accessToken, user } = await clientLogin(email, password);
      // Token and user info are already stored in localStorage by clientLogin
      console.log("Login successful", { user, accessToken });

      // Redirect based on user role
      if (user.role === "RestaurantAdmin") {
        router.push("/dashboard"); // RestaurantAdmin goes to dashboard
      } else {
        // For other roles, redirect to appropriate dashboard or home
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              disabled={isLoading}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              disabled={isLoading}
            />
          </div>
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p className={styles.link}>
          Don\'t have an account? <Link href="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
