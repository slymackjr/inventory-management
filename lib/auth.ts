export interface User {
  id: string
  email: string
  username: string
  role: "admin" | "customer"
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock users for demo purposes
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@inventory.com",
    username: "admin",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "customer@example.com",
    username: "customer",
    role: "customer",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export const getStoredAuth = (): AuthState => {
  if (typeof window === 'undefined') {
    // Return default state for server-side rendering
    return { user: null, isAuthenticated: false, isLoading: false }
  }
  try {
    const stored = localStorage.getItem('auth')
    return stored ? JSON.parse(stored) : { user: null, isAuthenticated: false, isLoading: false }
  } catch (error) {
    console.error('Failed to parse stored auth:', error)
    return { user: null, isAuthenticated: false, isLoading: false }
  }
}

export const storeAuth = (auth: AuthState): void => {
  if (typeof window === 'undefined') return // Avoid localStorage access on server
  try {
    localStorage.setItem('auth', JSON.stringify(auth))
  } catch (error) {
    console.error('Failed to store auth:', error)
  }
}

export const clearAuth = (): void => {
  if (typeof window === 'undefined') return // Avoid localStorage access on server
  try {
    localStorage.removeItem('auth')
  } catch (error) {
    console.error('Failed to clear auth:', error)
  }
}

export const authenticateUser = (email: string, password: string): User | null => {
  // Mock authentication logic - replace with real API call in production
  if (email === 'test@example.com' && password === 'password') {
    return {
      id: '1',
      email,
      username: 'Test User',
      role: 'admin',
      createdAt: new Date().toISOString(),
    }
  }
  // Check mock users for demo
  const mockUser = mockUsers.find(user => user.email === email)
  if (mockUser && password === 'password') {
    return mockUser
  }
  return null
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
    localStorage.removeItem("auth")
    window.location.href = "/auth/login"
  }
}

export function requireAuth(requiredRole?: "admin" | "customer") {
  const user = getCurrentUser()

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login"
    }
    return null
  }

  if (requiredRole && user.role !== requiredRole) {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login"
    }
    return null
  }

  return user
}