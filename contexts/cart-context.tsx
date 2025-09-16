"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product, CartItem, CartState } from "@/lib/types"

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState }

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find((item) => item.product.id === action.payload.product.id)
      let newItems: CartItem[]

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        )
      } else {
        newItems = [...state.items, { product: action.payload.product, quantity: action.payload.quantity }]
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
      }
    }
    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter((item) => item.product.id !== action.payload)
      return {
        items: newItems,
        total: calculateTotal(newItems),
      }
    }
    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.product.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item,
      )
      return {
        items: newItems,
        total: calculateTotal(newItems),
      }
    }
    case "CLEAR_CART":
      return { items: [], total: 0 }
    case "LOAD_CART":
      return action.payload
    default:
      return state
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: parsedCart })
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state))
  }, [state])

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
