"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"

interface MockUser {
  email: string
  role: "admin" | "patient"
  name: string
}

interface MockAuthContextValue {
  user: MockUser | null
  login: (email: string, password: string) => Promise<"success" | "invalid">
  logout: () => void
  isAuthenticated: boolean
}

const MOCK_CREDENTIALS = [
  { email: "admin@drmezhoud.dz", password: "Admin123!", role: "admin" as const, name: "Dr Mezhoud Hadj" },
  { email: "patient@drmezhoud.dz", password: "Patient123!", role: "patient" as const, name: "Patient Test" },
]

const MockAuthContext = createContext<MockAuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const router = useRouter()

  const login = useCallback(
    async (email: string, password: string): Promise<"success" | "invalid"> => {
      const match = MOCK_CREDENTIALS.find(
        (c) => c.email === email && c.password === password
      )
      if (!match) return "invalid"
      const mockUser: MockUser = { email: match.email, role: match.role, name: match.name }
      setUser(mockUser)
      router.push(match.role === "admin" ? "/admin" : "/patient")
      return "success"
    },
    [router]
  )

  const logout = useCallback(() => {
    setUser(null)
    router.push("/auth/login")
  }, [router])

  return (
    <MockAuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </MockAuthContext.Provider>
  )
}

export function useAuth(): MockAuthContextValue {
  const ctx = useContext(MockAuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
