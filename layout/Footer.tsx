import type React from "react"
import { Package } from "lucide-react"

export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">InventoryHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional inventory management system with role-based access and comprehensive analytics.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Electronics</li>
              <li>Furniture</li>
              <li>Home & Garden</li>
              <li>Sports & Fitness</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Order Tracking</li>
              <li>Returns</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 InventoryHub. All rights reserved. Built with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  )
}
