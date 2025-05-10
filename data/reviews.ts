import type { Review } from "@/lib/types"

export const mockReviews: Review[] = [
  {
    id: "r1",
    customerName: "Alice Johnson",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Amazing food! The burger was cooked perfectly and the fries were crispy. Will definitely order again!",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    response:
      "Thank you for your kind words, Alice! We're glad you enjoyed your meal and look forward to serving you again soon.",
  },
  {
    id: "r2",
    customerName: "Bob Smith",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "Good food and quick delivery. The salad was fresh but could use a bit more dressing.",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r3",
    customerName: "Charlie Davis",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 3,
    text: "Food was okay but took longer than expected to arrive. The brownie was delicious though!",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    response:
      "We apologize for the delay in your delivery, Charlie. We're working on improving our delivery times. Thank you for the feedback about our brownie!",
  },
  {
    id: "r4",
    customerName: "Diana Evans",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 2,
    text: "Order was incorrect and customer service took a while to respond. Food was cold when it arrived.",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r5",
    customerName: "Ethan Foster",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "Best burger in town! The special sauce is amazing. Delivery was quick and the food was still hot.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r6",
    customerName: "Fiona Garcia",
    customerAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    text: "Mozzarella sticks were perfect! Crispy outside and gooey inside. The marinara sauce was a bit bland though.",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
]
