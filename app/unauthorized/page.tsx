"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user } = useAuth();
  // Redirect to appropriate dashboard if user is logged in
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        switch (user.role) {
          case "Customer":
            router.push("/dashboard");
            break;
          case "Restaurant":
            router.push("/dashboard/restaurant");
            break;
          case "RestaurantAdmin":
            router.push("/dashboard/restaurant"); // RestaurantAdmin goes to restaurant dashboard
            break;
          case "Rider":
            router.push("/dashboard/rider");
            break;
          case "Admin":
            router.push("/dashboard/admin");
            break;
          default:
            router.push("/");
        }
      }, 5000); // Redirect after 5 seconds
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <div className="mb-6 text-gray-700">
          <p className="mb-4">
            You don&apos;t have permission to access this page.
          </p>
          <p>You will be redirected to your dashboard in 5 seconds.</p>
        </div>

        <button
          onClick={() => {
            if (user) {
              switch (user.role) {
                case "Customer":
                  router.push("/dashboard");
                  break;
                case "Restaurant":
                  router.push("/dashboard/restaurant");
                  break;
                case "RestaurantAdmin":
                  router.push("/dashboard/restaurant"); // RestaurantAdmin goes to restaurant dashboard
                  break;
                case "Rider":
                  router.push("/dashboard/rider");
                  break;
                case "Admin":
                  router.push("/dashboard/admin");
                  break;
                default:
                  router.push("/");
              }
            } else {
              router.push("/");
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
