"use client"

import type React from "react"

import { useEffect } from "react"
import { requireAuth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AuthProvider } from "@/contexts/auth-context"
import { InventoryProvider } from "@/contexts/inventory-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    requireAuth("admin")
  }, [])

  return (
    <AuthProvider>
      <InventoryProvider>
        <div className="flex h-screen bg-background">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </InventoryProvider>
    </AuthProvider>
  )
}
