import type { Restaurant } from "@/lib/types"

export const mockRestaurant: Restaurant = {
  id: "1",
  restaurantName: "Tasty Bites",
  ownerName: "John Smith",
  email: "john@tastybites.com",
  phone: "555-123-4567",
  address: "123 Main St, Anytown, CA 12345",
  description: "Serving delicious meals made with fresh ingredients.",
  cuisine: "American",
  approved: true,
  createdAt: new Date().toISOString(),
}
