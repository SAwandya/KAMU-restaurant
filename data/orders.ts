import type { Order } from "@/lib/types"

export const mockOrders: Order[] = [
  {
    id: "1001",
    items: [
      { id: "1", name: "Classic Burger", price: 12.99, quantity: 2 },
      { id: "3", name: "French Fries", price: 4.99, quantity: 1 },
    ],
    customer: {
      id: "c1",
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "555-111-2222",
      address: "456 Oak St, Anytown, CA 12345",
    },
    status: "pending",
    subtotal: 30.97,
    deliveryFee: 3.99,
    orderTime: new Date().toISOString(),
    notes: "Extra ketchup please",
  },
  {
    id: "1002",
    items: [
      { id: "2", name: "Chicken Caesar Salad", price: 10.99, quantity: 1 },
      { id: "5", name: "Iced Tea", price: 2.99, quantity: 1 },
    ],
    customer: {
      id: "c2",
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "555-333-4444",
      address: "789 Pine St, Anytown, CA 12345",
    },
    status: "preparing",
    subtotal: 13.98,
    deliveryFee: 3.99,
    orderTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "1003",
    items: [
      { id: "1", name: "Classic Burger", price: 12.99, quantity: 1 },
      { id: "4", name: "Chocolate Brownie", price: 6.99, quantity: 1 },
      { id: "5", name: "Iced Tea", price: 2.99, quantity: 2 },
    ],
    customer: {
      id: "c3",
      name: "Charlie Davis",
      email: "charlie@example.com",
      phone: "555-555-6666",
      address: "101 Maple St, Anytown, CA 12345",
    },
    status: "completed",
    subtotal: 25.96,
    deliveryFee: 3.99,
    orderTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "1004",
    items: [
      { id: "6", name: "Mozzarella Sticks", price: 7.99, quantity: 1 },
      { id: "2", name: "Chicken Caesar Salad", price: 10.99, quantity: 1 },
    ],
    customer: {
      id: "c4",
      name: "Diana Evans",
      email: "diana@example.com",
      phone: "555-777-8888",
      address: "202 Elm St, Anytown, CA 12345",
    },
    status: "cancelled",
    subtotal: 18.98,
    deliveryFee: 3.99,
    orderTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    notes: "No croutons on the salad",
  },
]
