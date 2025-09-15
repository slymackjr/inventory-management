"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "@/lib/types"
import { mockProducts } from "@/lib/mock-data"

interface InventoryState {
  products: Product[]
  isLoading: boolean
}

interface InventoryContextType extends InventoryState {
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => void
  updateProduct: (id: string, product: Omit<Product, "id" | "createdAt" | "updatedAt">) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined)

type InventoryAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: { id: string; product: Product } }
  | { type: "DELETE_PRODUCT"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }

const inventoryReducer = (state: InventoryState, action: InventoryAction): InventoryState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, isLoading: false }
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] }
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) => (p.id === action.payload.id ? action.payload.product : p)),
      }
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, {
    products: [],
    isLoading: true,
  })

  useEffect(() => {
    // Load products from localStorage or use mock data
    const savedProducts = localStorage.getItem("inventory_products")
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts)
        dispatch({ type: "SET_PRODUCTS", payload: parsedProducts })
      } catch (error) {
        console.error("Failed to load products from localStorage:", error)
        dispatch({ type: "SET_PRODUCTS", payload: mockProducts })
      }
    } else {
      dispatch({ type: "SET_PRODUCTS", payload: mockProducts })
    }
  }, [])

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem("inventory_products", JSON.stringify(state.products))
    }
  }, [state.products, state.isLoading])

  const addProduct = (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    dispatch({ type: "ADD_PRODUCT", payload: newProduct })
  }

  const updateProduct = (id: string, productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const existingProduct = state.products.find((p) => p.id === id)
    if (existingProduct) {
      const updatedProduct: Product = {
        ...productData,
        id,
        createdAt: existingProduct.createdAt,
        updatedAt: new Date().toISOString(),
      }
      dispatch({ type: "UPDATE_PRODUCT", payload: { id, product: updatedProduct } })
    }
  }

  const deleteProduct = (id: string) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id })
  }

  const getProduct = (id: string) => {
    return state.products.find((p) => p.id === id)
  }

  return (
    <InventoryContext.Provider
      value={{
        ...state,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}

export const useInventory = () => {
  const context = useContext(InventoryContext)
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider")
  }
  return context
}
