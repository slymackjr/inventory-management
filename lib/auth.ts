export interface User {
  name: string
  email: string
  role: "admin" | "customer"
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
