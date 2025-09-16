"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import { type User, type AuthState } from "@/lib/auth"
import { getStoredAuth, storeAuth, clearAuth, authenticateUser } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, password: string, username: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "INIT"; payload: AuthState }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true }
    case "LOGIN_SUCCESS":
      return { user: action.payload, isAuthenticated: true, isLoading: false }
    case "LOGIN_FAILURE":
      return { user: null, isAuthenticated: false, isLoading: false }
    case "LOGOUT":
      return { user: null, isAuthenticated: false, isLoading: false }
    case "INIT":
      return action.payload
    default:
      return state
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    const storedAuth = getStoredAuth()
    dispatch({ type: "INIT", payload: storedAuth })
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = authenticateUser(email, password)
    if (user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: user })
      storeAuth({ user, isAuthenticated: true, isLoading: false })
      return true
    } else {
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    clearAuth()
  }

  const register = async (email: string, password: string, username: string): Promise<boolean> => {
    // Mock registration - in real app, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      email,
      username,
      role: "customer",
      createdAt: new Date().toISOString(),
    }

    dispatch({ type: "LOGIN_SUCCESS", payload: newUser })
    storeAuth({ user: newUser, isAuthenticated: true, isLoading: false })
    return true
  }

  return <AuthContext.Provider value={{ ...state, login, logout, register }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}