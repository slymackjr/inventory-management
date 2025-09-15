"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Order, CartItem } from "@/lib/types"
import { mockOrders } from "@/lib/mock-data"

interface OrderState {
  orders: Order[]
  isLoading: boolean
}

interface OrderContextType extends OrderState {
  createOrder: (userId: string, items: CartItem[], shippingAddress: Order["shippingAddress"]) => Promise<string>
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  getUserOrders: (userId: string) => Order[]
  getOrder: (orderId: string) => Order | undefined
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

type OrderAction =
  | { type: "SET_ORDERS"; payload: Order[] }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER_STATUS"; payload: { orderId: string; status: Order["status"] } }
  | { type: "SET_LOADING"; payload: boolean }

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state, orders: action.payload, isLoading: false }
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] }
    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status, updatedAt: new Date().toISOString() }
            : order,
        ),
      }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, {
    orders: [],
    isLoading: true,
  })

  useEffect(() => {
    // Load orders from localStorage or use mock data
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders)
        dispatch({ type: "SET_ORDERS", payload: parsedOrders })
      } catch (error) {
        console.error("Failed to load orders from localStorage:", error)
        dispatch({ type: "SET_ORDERS", payload: mockOrders })
      }
    } else {
      dispatch({ type: "SET_ORDERS", payload: mockOrders })
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem("orders", JSON.stringify(state.orders))
    }
  }, [state.orders, state.isLoading])

  const createOrder = async (
    userId: string,
    items: CartItem[],
    shippingAddress: Order["shippingAddress"],
  ): Promise<string> => {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId,
      items,
      total,
      status: "pending",
      shippingAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch({ type: "ADD_ORDER", payload: newOrder })
    return newOrder.id
  }

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, status } })
  }

  const getUserOrders = (userId: string) => {
    return state.orders.filter((order) => order.userId === userId)
  }

  const getOrder = (orderId: string) => {
    return state.orders.find((order) => order.id === orderId)
  }

  return (
    <OrderContext.Provider
      value={{
        ...state,
        createOrder,
        updateOrderStatus,
        getUserOrders,
        getOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
