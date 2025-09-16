"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import type { Product, Order } from "@/lib/types"

interface AnalyticsChartsProps {
  products: Product[]
  orders: Order[]
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ products, orders }) => {
  // Calculate analytics data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  // Monthly revenue calculation (mock data for demo)
  const currentMonth = new Date().getMonth()
  const currentMonthOrders = orders.filter((order) => new Date(order.createdAt).getMonth() === currentMonth)
  const currentMonthRevenue = currentMonthOrders.reduce((sum, order) => sum + order.total, 0)

  // Product performance
  const productSales = products.map((product) => {
    const sales = orders.reduce((sum, order) => {
      const item = order.items.find((item) => item.product.id === product.id)
      return sum + (item ? item.quantity : 0)
    }, 0)
    return { ...product, sales }
  })

  const topProducts = productSales.sort((a, b) => b.sales - a.sales).slice(0, 5)
  const lowStockProducts = products.filter((p) => p.stock < 10).length

  // Category performance
  const categoryStats = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { count: 0, value: 0 }
      }
      acc[product.category].count += 1
      acc[product.category].value += product.price * product.stock
      return acc
    },
    {} as Record<string, { count: number; value: number }>,
  )

  const topCategories = Object.entries(categoryStats)
    .sort(([, a], [, b]) => b.value - a.value)
    .slice(0, 3)

  // Order status distribution
  const orderStatusStats = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              This month: ${currentMonthRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Avg. order value: ${averageOrderValue.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-yellow-600 flex items-center">
              <TrendingDown className="w-3 h-3 mr-1" />
              {lowStockProducts} low stock
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(categoryStats).length}</div>
            <p className="text-xs text-muted-foreground">Product categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{product.sales} sold</p>
                    <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map(([category, stats], index) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{category}</p>
                      <p className="text-xs text-muted-foreground">{stats.count} products</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${stats.value.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">inventory value</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(orderStatusStats).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        status === "delivered" ? "default" : status === "cancelled" ? "destructive" : "secondary"
                      }
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{count} orders</p>
                    <p className="text-xs text-muted-foreground">{((count / totalOrders) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Out of Stock</p>
                  <p className="text-xs text-muted-foreground">Immediate attention needed</p>
                </div>
                <Badge variant="destructive">{products.filter((p) => p.stock === 0).length}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Low Stock</p>
                  <p className="text-xs text-muted-foreground">Below 10 units</p>
                </div>
                <Badge variant="secondary">{lowStockProducts}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Well Stocked</p>
                  <p className="text-xs text-muted-foreground">Above 10 units</p>
                </div>
                <Badge variant="default">{products.filter((p) => p.stock >= 10).length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
