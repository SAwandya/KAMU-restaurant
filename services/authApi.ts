// lib/authApi.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:80/api/auth";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  // Add other user properties as needed
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login");
  }

  return response.json();
}

export async function registerCustomer(userData: {
  fullName: string;
  email: string;
  password: string;
  role?: string;
}): Promise<{ user: User }> {
  const response = await fetch(`${API_BASE_URL}/register/customer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userData, role: userData.role || "Customer" }), // Default role or allow specification
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register");
  }

  return response.json();
}

export async function logoutUser(token: string | null): Promise<void> {
  // The backend logout clears the httpOnly refresh token cookie and might invalidate the access token.
  // The actual invalidation of the access token server-side depends on backend implementation.
  // For the frontend, we primarily clear local storage of the token.
  // If the backend has a specific logout endpoint that requires the access token, use it.
  if (!token) {
    console.warn("No access token found for logout.");
    // No specific client-side action needed if token is already null,
    // but if there was a server endpoint to hit even without a client token (e.g. to clear server session by other means)
    // it would go here.
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Logout failed on server:", errorData.message);
      // Decide if you want to throw an error or just log it and proceed with client-side logout
    }
  } catch (error) {
    console.error("Error during server logout:", error);
    // Decide if you want to throw an error or just log it
  }
}

// Optional: Function to fetch user details if you have an endpoint like /api/auth/user
// This would typically be called after login or when the app loads to verify an existing token
export async function fetchCurrentUser(token: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/user`, {
    // Assuming GET /api/auth/user or similar
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token is invalid or expired
      throw new Error("Unauthorized: Token is invalid or expired");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch user");
  }
  // The backend /user endpoint returns an array of users, we'll take the first one
  // This should be adjusted if the backend returns a single user object directly
  const users = await response.json();
  if (users && users.length > 0) {
    // Assuming the relevant user is the first in the array, or the structure is different
    // This needs to match how your backend /api/auth/user actually returns the current user
    // For now, let's assume it's an array and we need to find the user associated with the token,
    // or that the backend /user endpoint is actually meant to list all users and not get current user.
    // The semantic search showed `authController.getUser` which calls `authService.getAllUser()`.
    // This is not ideal for fetching the *current* authenticated user.
    // A dedicated endpoint like `/api/auth/me` would be better.
    // For now, this function might not work as expected without a proper backend endpoint.
    // I will proceed assuming you might adapt this or the backend.
    // A common pattern is for /api/auth/me or /api/auth/profile to return the current user.
    // If /api/auth/user is for admins to list users, this won't work for getting current user.
    // Let's assume for now there's a way to get the current user.
    // Given the backend code, `validateToken` might be more appropriate for checking token validity,
    // but it doesn't return user info.
    // For now, I'll leave this function but with a strong caveat.
    // A better approach would be to rely on the user object returned from login.
    throw new Error(
      "Fetching current user details from /api/auth/user is not correctly implemented based on backend structure."
    );
  }
  throw new Error("User data not found in response");
}

// Function to validate token (optional, if you want to check token validity without fetching full user data)
export async function validateToken(token: string): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/validate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status === 204; // Backend returns 204 on successful validation
}
