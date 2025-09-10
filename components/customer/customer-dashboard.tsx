"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Clock, Eye, Star } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"

// Mock data
const recentlyViewed = [
  {
    id: "PRD-001",
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    image: "/wireless-headphones.png",
    rating: 4.5,
  },
  {
    id: "PRD-002",
    name: "Ergonomic Office Chair",
    price: 299.99,
    image: "/ergonomic-office-chair.png",
    rating: 4.8,
  },
  {
    id: "PRD-003",
    name: "Laptop Stand Adjustable",
    price: 49.99,
    image: "/laptop-stand.png",
    rating: 4.3,
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    total: 299.99,
    status: "shipped",
    items: 2,
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    total: 149.5,
    status: "delivered",
    items: 1,
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export function CustomerDashboard() {
  const user = getCurrentUser()

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name?.split(" ")[0] || "Customer"}!</h1>
        <p className="text-muted-foreground mt-2">Discover amazing products and track your orders</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Items in Cart</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-secondary/10 rounded-full">
                <Package className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{recentOrders.length}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recently Viewed Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recently Viewed</CardTitle>
            <CardDescription>Products you've looked at recently</CardDescription>
          </div>
          <Link href="/customer/products">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Browse All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentlyViewed.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest order history</CardDescription>
          </div>
          <Link href="/customer/orders">
            <Button variant="outline" size="sm">
              <Package className="h-4 w-4 mr-2" />
              View All Orders
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-muted rounded-full">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items} item{order.items > 1 ? "s" : ""} • {order.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
