import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sign In - Inventory Management System",
  description:
    "Sign in to your inventory management account. Access your dashboard, manage products, and track orders.",
  keywords: ["login", "sign in", "authentication", "inventory", "management"],
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Main Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">IM</span>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-primary">Welcome Back</CardTitle>
              <CardDescription className="text-base">Sign in to your inventory management account</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <LoginForm />

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                  Create one here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-center">Demo Accounts</CardTitle>
            <CardDescription className="text-center">Try the system with pre-configured accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Admin Access</span>
                  <Badge variant="default">Full Access</Badge>
                </div>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <p>
                    <strong>Email:</strong> admin@demo.com
                  </p>
                  <p>
                    <strong>Password:</strong> admin123
                  </p>
                </div>
              </div>

              <div className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Customer Access</span>
                  <Badge variant="secondary">Shopping</Badge>
                </div>
                <div className="text-xs space-y-1 text-muted-foreground">
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

        {/* Features Preview */}
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h3 className="font-medium text-sm">System Features</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Product Management
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Order Processing
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Inventory Tracking
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Customer Management
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Analytics & Reports
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
