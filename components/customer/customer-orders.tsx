"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Download, X, Search, Package, Truck, CheckCircle } from "lucide-react"

// Mock orders data
const orders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "shipped",
    total: 299.99,
    items: [
      { name: "Wireless Bluetooth Headphones", quantity: 1, price: 99.99 },
      { name: "Laptop Stand Adjustable", quantity: 2, price: 49.99 },
      { name: "USB-C Cable 6ft", quantity: 1, price: 19.99 },
    ],
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-18",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "delivered",
    total: 149.5,
    items: [{ name: "Ergonomic Office Chair", quantity: 1, price: 299.99 }],
    trackingNumber: "TRK987654321",
    deliveredDate: "2024-01-12",
  },
  {
    id: "ORD-003",
    date: "2024-01-08",
    status: "pending",
    total: 89.99,
    items: [
      { name: "Desk Organizer Set", quantity: 1, price: 34.99 },
      { name: "USB-C Cable 6ft", quantity: 2, price: 19.99 },
    ],
  },
]

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800", icon: Package },
  shipped: { color: "bg-blue-100 text-blue-800", icon: Truck },
  delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { color: "bg-red-100 text-red-800", icon: X },
}

export function CustomerOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your order history</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders by ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
          return (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{order.id}</CardTitle>
                    <CardDescription>Ordered on {order.date}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <span className="text-lg font-bold">${order.total}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-2">
                  <h4 className="font-medium">Items ({order.items.length})</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Tracking Info */}
                {order.trackingNumber && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Tracking Number</p>
                        <p className="text-sm text-muted-foreground">{order.trackingNumber}</p>
                      </div>
                      {order.estimatedDelivery && (
                        <div className="text-right">
                          <p className="text-sm font-medium">Estimated Delivery</p>
                          <p className="text-sm text-muted-foreground">{order.estimatedDelivery}</p>
                        </div>
                      )}
                      {order.deliveredDate && (
                        <div className="text-right">
                          <p className="text-sm font-medium">Delivered</p>
                          <p className="text-sm text-muted-foreground">{order.deliveredDate}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Invoice
                    </Button>
                  </div>
                  {order.status === "pending" && (
                    <Button variant="destructive" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
