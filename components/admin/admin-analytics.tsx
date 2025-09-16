"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, TrendingUp, Users, DollarSign, TrendingDown, Eye } from "lucide-react"
import { useInventory } from "@/contexts/inventory-context"

// Placeholder components (replace with actual implementations)
const SalesChart = () => (
  <div className="h-[300px] bg-muted rounded-lg flex items-center justify-center">
    [Sales Chart Placeholder]
  </div>
)

const TopProducts = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex justify-between items-center">
        <span>Product {i}</span>
        <span>{(Math.random() * 100).toFixed(0)} units sold</span>
      </div>
    ))}
  </div>
)

const CustomerActivity = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex justify-between items-center">
        <span>Customer {i}</span>
        <span>{Math.floor(Math.random() * 10)} orders</span>
      </div>
    ))}
  </div>
)

// Mock data - in real app, this would come from API or context
const analyticsStats = {
  totalSales: 154320,
  salesChange: 8.7,
  topProductsCount: 5,
  activeCustomers: 245,
  avgOrderValue: 89.50,
}

export default function AnalyticsPage() {
  const { products } = useInventory() // Access inventory context for product-related analytics

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Overview</h1>
        <p className="text-muted-foreground">Track your sales, products, and customer trends.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsStats.totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant={analyticsStats.salesChange > 0 ? "default" : "destructive"}>
                {analyticsStats.salesChange > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(analyticsStats.salesChange)}%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Compared to last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Products</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsStats.topProductsCount}</div>
            <p className="text-xs text-muted-foreground">Best-selling items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsStats.activeCustomers}</div>
            <p className="text-xs text-muted-foreground">Engaged this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trends</CardTitle>
            <CardDescription>Revenue performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best-performing products this month</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <TopProducts />
          </CardContent>
        </Card>
      </div>

      {/* Customer Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Customer Activity</CardTitle>
            <CardDescription>Recent customer orders and engagement</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View All Activity
          </Button>
        </CardHeader>
        <CardContent>
          <CustomerActivity />
        </CardContent>
      </Card>

      {/* Example: Product Count from Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Summary</CardTitle>
          <CardDescription>Total products in inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{products.length}</div>
          <p className="text-xs text-muted-foreground">Active products in stock</p>
        </CardContent>
      </Card>
    </div>
  )
}