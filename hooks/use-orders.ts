"use client"

import { useState, useEffect } from "react"
import type { Order } from "@/lib/types"
import { mockOrders } from "@/data/orders"

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchOrders = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setOrders(mockOrders)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch orders")
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In a real app, this would send data to an API
      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
      return true
    } catch (err) {
      throw new Error("Failed to update order status")
    }
  }

  return {
    orders,
    isLoading,
    error,
    updateOrderStatus,
  }
}
