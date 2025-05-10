import type { MenuItem } from "@/lib/types"

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    price: 12.99,
    category: "main",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Chicken Caesar Salad",
    description: "Fresh romaine lettuce with grilled chicken, croutons, and Caesar dressing",
    price: 10.99,
    category: "main",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "French Fries",
    description: "Crispy golden fries with a sprinkle of sea salt",
    price: 4.99,
    category: "appetizer",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with vanilla ice cream",
    price: 6.99,
    category: "dessert",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Iced Tea",
    description: "Refreshing iced tea with lemon",
    price: 2.99,
    category: "drink",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "6",
    name: "Mozzarella Sticks",
    description: "Crispy on the outside, melty on the inside, served with marinara sauce",
    price: 7.99,
    category: "appetizer",
    image: "/placeholder.svg?height=100&width=100",
  },
]
