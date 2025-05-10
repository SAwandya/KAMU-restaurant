"use client"

import { useState, useEffect } from "react"
import type { MenuItem } from "@/lib/types"
import { mockMenuItems } from "@/data/menu-items"

export function useMenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchMenuItems = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setMenuItems(mockMenuItems)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch menu items")
        setIsLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  const addMenuItem = async (item: MenuItem) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In a real app, this would send data to an API
      setMenuItems((prev) => [...prev, item])
      return true
    } catch (err) {
      throw new Error("Failed to add menu item")
    }
  }

  const updateMenuItem = async (item: MenuItem) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In a real app, this would send data to an API
      setMenuItems((prev) => prev.map((i) => (i.id === item.id ? item : i)))
      return true
    } catch (err) {
      throw new Error("Failed to update menu item")
    }
  }

  const deleteMenuItem = async (id: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In a real app, this would send data to an API
      setMenuItems((prev) => prev.filter((i) => i.id !== id))
      return true
    } catch (err) {
      throw new Error("Failed to delete menu item")
    }
  }

  return {
    menuItems,
    isLoading,
    error,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  }
}
