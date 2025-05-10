"use client"

import { useState, useEffect } from "react"
import type { InsightsData } from "@/lib/types"
import { mockInsightsData } from "@/data/insights"

export function useInsights() {
  const [insights, setInsights] = useState<InsightsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchInsights = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setInsights(mockInsightsData)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch insights data")
        setIsLoading(false)
      }
    }

    fetchInsights()
  }, [])

  return {
    ...insights!,
    isLoading,
    error,
  }
}
