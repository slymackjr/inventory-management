"use client"

import type React from "react"

import { useEffect } from "react"
import { requireAuth } from "@/lib/auth"
import { CustomerNavbar } from "@/components/customer/customer-navbar"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    requireAuth("customer")
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
