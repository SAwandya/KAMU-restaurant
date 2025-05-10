"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Check, Clock, Search, Truck, X } from "lucide-react"
import { useOrders } from "@/hooks/use-orders"

export default function OrdersPage() {
  const { toast } = useToast()
  const { orders, updateOrderStatus } = useOrders()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(searchQuery) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleStatusChange = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status)

    toast({
      title: "Order Updated",
      description: `Order #${orderId} has been marked as ${status}`,
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "preparing":
        return <Truck className="h-4 w-4" />
      case "completed":
        return <Check className="h-4 w-4" />
      case "cancelled":
        return <X className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "preparing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search orders by ID, customer name, or items..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        {["all", "pending", "preparing", "completed", "cancelled"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {filteredOrders.filter((order) => status === "all" || order.status === status).length === 0 ? (
              <div className="flex h-[300px] w-full items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="text-muted-foreground">No orders found</div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredOrders
                  .filter((order) => status === "all" || order.status === status)
                  .sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime())
                  .map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
                          <div>
                            <CardTitle className="flex items-center">
                              Order #{order.id}
                              <Badge className={`ml-2 ${getStatusColor(order.status)}`} variant="outline">
                                <span className="flex items-center">
                                  {getStatusIcon(order.status)}
                                  <span className="ml-1 capitalize">{order.status}</span>
                                </span>
                              </Badge>
                            </CardTitle>
                            <CardDescription>
                              {new Date(order.orderTime).toLocaleString()} - {order.customer.name} (
                              {order.customer.phone})
                            </CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            {order.status !== "completed" && order.status !== "cancelled" && (
                              <>
                                {order.status === "pending" && (
                                  <Button size="sm" onClick={() => handleStatusChange(order.id, "preparing")}>
                                    Start Preparing
                                  </Button>
                                )}
                                {order.status === "preparing" && (
                                  <Button size="sm" onClick={() => handleStatusChange(order.id, "completed")}>
                                    Mark Completed
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusChange(order.id, "cancelled")}
                                >
                                  Cancel Order
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium">Order Items</h4>
                            <div className="mt-2 divide-y">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between py-2">
                                  <div className="flex items-center">
                                    <span className="font-medium">{item.quantity}x</span>
                                    <span className="ml-2">{item.name}</span>
                                  </div>
                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Subtotal:</span>
                              <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                     
                            <div className="flex justify-between font-medium">
                              <span>Total:</span>
                              <span>${(order.subtotal + order.deliveryFee).toFixed(2)}</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Delivery Address</h4>
                            <p className="mt-1 text-sm text-muted-foreground">{order.customer.address}</p>
                          </div>
                          {order.notes && (
                            <div>
                              <h4 className="text-sm font-medium">Notes</h4>
                              <p className="mt-1 text-sm text-muted-foreground">{order.notes}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
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
