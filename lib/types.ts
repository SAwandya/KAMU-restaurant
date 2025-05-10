export interface Restaurant {
  id: string
  restaurantName: string
  ownerName: string
  email: string
  phone: string
  address: string
  description: string
  cuisine: string
  approved: boolean
  createdAt: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

export interface Order {
  id: string
  items: OrderItem[]
  customer: Customer
  status: string
  subtotal: number
  deliveryFee: number
  orderTime: string
  notes?: string
}

export interface Review {
  id: string
  customerName: string
  customerAvatar?: string
  rating: number
  text: string
  date: string
  response?: string
}

export interface SalesData {
  today: number
  todayPercentage: number
  week: number
  weekPercentage: number
  month: number
  monthPercentage: number
  averageOrderValue: number
  aovPercentage: number
  dailyRevenue: Array<{ date: string; revenue: number }>
  monthlyRevenue: Array<{ month: string; revenue: number }>
}

export interface InsightsData {
  salesData: SalesData
  ordersByDay: Array<{ day: string; orders: number }>
  ordersByHour: Array<{ hour: string; orders: number }>
  topSellingItems: Array<{ name: string; quantity: number; revenue: number }>
  revenueByCategory: Array<{ name: string; value: number }>
}
