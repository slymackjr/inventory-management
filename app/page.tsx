import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Users, ShoppingCart, BarChart3 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Inventory Management System - Dashboard",
  description:
    "Professional inventory management system for businesses. Manage products, orders, and customers efficiently.",
  keywords: ["inventory", "management", "business", "products", "orders"],
}

export default function HomePage() {
  // Check if user is logged in - in real app, this would check actual auth
  const isLoggedIn = false // This would come from auth context

  if (isLoggedIn) {
    // Redirect based on user role
    redirect("/admin/dashboard") // or "/customer/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Inventory Management
            <span className="text-primary block">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline your business operations with our comprehensive inventory management system. Track products,
            manage orders, and grow your business efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="w-full sm:w-auto">
                Sign In to Dashboard
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Package className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Add, edit, and organize your products with detailed information, images, and stock tracking.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Order Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Efficiently manage customer orders from placement to delivery with real-time status updates.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Customer Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Maintain customer relationships with detailed profiles, order history, and communication tools.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Analytics & Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get insights into your business with comprehensive analytics, sales reports, and inventory trends.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Demo Accounts */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Try Demo Accounts</CardTitle>
            <CardDescription className="text-center">
              Experience the system with pre-configured demo accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Admin Account</h3>
                <p className="text-sm text-muted-foreground mb-3">Full access to all features</p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Email:</strong> admin@demo.com
                  </p>
                  <p>
                    <strong>Password:</strong> admin123
                  </p>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Customer Account</h3>
                <p className="text-sm text-muted-foreground mb-3">Customer shopping experience</p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Email:</strong> customer@demo.com
                  </p>
                  <p>
                    <strong>Password:</strong> customer123
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
