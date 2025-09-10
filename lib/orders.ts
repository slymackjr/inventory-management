export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image?: string
}

export interface Customer {
  name: string
  email: string
  phone: string
}

export interface Order {
  id: string
  customer: Customer
  date: string
  status: "pending" | "shipped" | "delivered" | "cancelled"
  total: number
  items: OrderItem[]
  shippingAddress: string
  paymentMethod: string
  trackingNumber?: string
  shippedDate?: string
  deliveredDate?: string
  specialInstructions?: string
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `ORD-${timestamp}${random}`
}

export function calculateOrderTotals(items: OrderItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  }
}

export function getOrderStatusColor(status: Order["status"]) {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }
  return colors[status]
}

export function canCancelOrder(order: Order): boolean {
  return order.status === "pending"
}

export function getNextOrderStatus(currentStatus: Order["status"]): Order["status"] | null {
  const statusFlow = {
    pending: "shipped",
    shipped: "delivered",
    delivered: null,
    cancelled: null,
  }
  return statusFlow[currentStatus] as Order["status"] | null
}
