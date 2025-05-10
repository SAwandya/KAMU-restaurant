"use client"

import { useState, useEffect } from "react"
import type { Review } from "@/lib/types"
import { mockReviews } from "@/data/reviews"

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchReviews = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setReviews(mockReviews)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch reviews")
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const respondToReview = async (reviewId: string, response: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In a real app, this would send data to an API
      setReviews((prev) => prev.map((review) => (review.id === reviewId ? { ...review, response } : review)))
      return true
    } catch (err) {
      throw new Error("Failed to respond to review")
    }
  }

  return {
    reviews,
    isLoading,
    error,
    respondToReview,
  }
}
