"use client"

import { UserTable } from "@/components/admin/user-table"
import { mockUsers } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function AdminUsersPage() {
  const router = useRouter()

  const handleViewOrders = (userId: string) => {
    // In a real app, this would filter orders by user ID
    router.push(`/admin/orders?userId=${userId}`)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-balance">User Management</h1>
        <p className="text-muted-foreground text-pretty">Manage customer accounts and view user activity.</p>
      </div>

      <UserTable users={mockUsers} onViewOrders={handleViewOrders} />
    </div>
  )
}
