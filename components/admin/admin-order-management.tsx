"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Package, Truck, CheckCircle, X, Calendar, DollarSign } from "lucide-react"
import { OrderDetailsDialog } from "@/components/admin/order-details-dialog"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    customer: {
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
    },
    date: "2024-01-15",
    status: "pending",
    total: 299.99,
    items: [
      { id: "PRD-001", name: "Wireless Bluetooth Headphones", quantity: 1, price: 99.99 },
      { id: "PRD-003", name: "Laptop Stand Adjustable", quantity: 2, price: 49.99 },
      { id: "PRD-004", name: "USB-C Cable 6ft", quantity: 1, price: 19.99 },
    ],
    shippingAddress: "123 Main St, City, State 12345",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 987-6543",
    },
    date: "2024-01-14",
    status: "shipped",
    total: 149.5,
    items: [{ id: "PRD-002", name: "Ergonomic Office Chair", quantity: 1, price: 299.99 }],
    shippingAddress: "456 Oak Ave, Town, State 67890",
    paymentMethod: "Cash on Delivery",
    trackingNumber: "TRK123456789",
    shippedDate: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+1 (555) 456-7890",
    },
    date: "2024-01-13",
    status: "delivered",
    total: 89.99,
    items: [
      { id: "PRD-005", name: "Desk Organizer Set", quantity: 1, price: 34.99 },
      { id: "PRD-004", name: "USB-C Cable 6ft", quantity: 2, price: 19.99 },
    ],
    shippingAddress: "789 Pine Rd, Village, State 13579",
    paymentMethod: "Cash on Delivery",
    trackingNumber: "TRK987654321",
    deliveredDate: "2024-01-16",
  },
]

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800", icon: Package },
  shipped: { color: "bg-blue-100 text-blue-800", icon: Truck },
  delivered: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { color: "bg-red-100 text-red-800", icon: X },
}

const statusOptions = ["All", "pending", "shipped", "delivered", "cancelled"]

export function AdminOrderManagement() {
  const [orders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Mock update - in real app, this would update the database
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
  }

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    const StatusIcon = config.icon
    return (
      <Badge className={config.color}>
        <StatusIcon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Order Management</h1>
        <p className="text-muted-foreground">Manage customer orders and track fulfillment</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Pending Orders</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "pending").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Shipped Orders</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "shipped").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Delivered Orders</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "delivered").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold">${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Orders</CardTitle>
          <CardDescription>Search and filter customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID, customer name, or email..."
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
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "All" ? "All Orders" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>Manage customer orders and update their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{order.date}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="font-medium">${order.total}</TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          open={!!selectedOrder}
          onOpenChange={(open) => !open && setSelectedOrder(null)}
        />
      )}
    </div>
  )
}
