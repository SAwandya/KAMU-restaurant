"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Search, Star, ThumbsDown, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useReviews } from "@/hooks/use-reviews"
import type { Review } from "@/lib/types"

export default function ReviewsPage() {
  const { toast } = useToast()
  const { reviews, respondToReview } = useReviews()
  const [searchQuery, setSearchQuery] = useState("")
  const [responses, setResponses] = useState<Record<string, string>>({})

  const filteredReviews = reviews.filter(
    (review) =>
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleResponseChange = (reviewId: string, response: string) => {
    setResponses((prev) => ({
      ...prev,
      [reviewId]: response,
    }))
  }

  const handleSubmitResponse = (review: Review) => {
    const response = responses[review.id]
    if (!response) return

    respondToReview(review.id, response)

    setResponses((prev) => {
      const newResponses = { ...prev }
      delete newResponses[review.id]
      return newResponses
    })

    toast({
      title: "Response Submitted",
      description: "Your response has been submitted successfully.",
    })
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customer Reviews</h2>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reviews by customer name or content..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="positive">Positive (4-5★)</TabsTrigger>
          <TabsTrigger value="neutral">Neutral (3★)</TabsTrigger>
          <TabsTrigger value="negative">Negative (1-2★)</TabsTrigger>
          <TabsTrigger value="unresponded">Unresponded</TabsTrigger>
        </TabsList>

        {["all", "positive", "neutral", "negative", "unresponded"].map((filter) => (
          <TabsContent key={filter} value={filter} className="space-y-4">
            {filteredReviews.filter((review) => {
              if (filter === "all") return true
              if (filter === "positive") return review.rating >= 4
              if (filter === "neutral") return review.rating === 3
              if (filter === "negative") return review.rating <= 2
              if (filter === "unresponded") return !review.response
              return true
            }).length === 0 ? (
              <div className="flex h-[300px] w-full items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  <div className="text-muted-foreground">No reviews found</div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredReviews
                  .filter((review) => {
                    if (filter === "all") return true
                    if (filter === "positive") return review.rating >= 4
                    if (filter === "neutral") return review.rating === 3
                    if (filter === "negative") return review.rating <= 2
                    if (filter === "unresponded") return !review.response
                    return true
                  })
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={review.customerAvatar || "/placeholder.svg?height=40&width=40"} />
                              <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{review.customerName}</CardTitle>
                              <CardDescription>{new Date(review.date).toLocaleDateString()}</CardDescription>
                              <div className="mt-1 flex">{renderStars(review.rating)}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon">
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{review.text}</p>
                        {review.response && (
                          <div className="mt-4 rounded-md bg-muted p-3">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" />
                                <AvatarFallback>R</AvatarFallback>
                              </Avatar>
                              <p className="text-xs font-medium">Your Response</p>
                            </div>
                            <p className="mt-2 text-sm">{review.response}</p>
                          </div>
                        )}
                      </CardContent>
                      {!review.response && (
                        <CardFooter className="flex flex-col items-start space-y-2">
                          <Input
                            placeholder="Write a response to this review..."
                            value={responses[review.id] || ""}
                            onChange={(e) => handleResponseChange(review.id, e.target.value)}
                          />
                          <Button
                            size="sm"
                            disabled={!responses[review.id]}
                            onClick={() => handleSubmitResponse(review)}
                          >
                            Submit Response
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
