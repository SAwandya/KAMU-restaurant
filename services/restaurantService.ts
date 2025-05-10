// services/restaurantService.ts
import api from "./api";

export interface RegisterRestaurantData {
  name: string;
  address: string;
  images?: string[]; // optional, array of image URLs or base64 strings
  isAvailable?: boolean;
  status?: string;
}

export interface Restaurant {
  id: number;
  ownerId: number;
  name: string;
  address: string;
  images?: string[];
  isAvailable: boolean;
  status?: string;
}

export const registerRestaurant = async (
  ownerId: number,
  data: RegisterRestaurantData
): Promise<Restaurant> => {
  // Compose payload with ownerId and form data
  const payload = {
    ownerId,
    ...data,
  };

  const response = await api.post("/restaurant", payload);
  return response.data.restaurant;
};

export const getMyRestaurant = async (
  ownerId: number
): Promise<Restaurant | null> => {
  const response = await api.get("/restaurants/me");
  return response.data.restaurant || null;
};

// Add other service methods (update, delete, approve) as needed
