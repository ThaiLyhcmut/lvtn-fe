"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "student" | "supervisor" | "department_lecturer" | "reviewer" | "council" | "academic_office"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, role: UserRole) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo accounts for testing
const DEMO_ACCOUNTS: Record<string, User> = {
  "student@hcmut.edu.vn": {
    id: "1",
    name: "Nguyễn Văn An",
    email: "student@hcmut.edu.vn",
    role: "student",
  },
  "supervisor@hcmut.edu.vn": {
    id: "2",
    name: "TS. Trần Thị Bình",
    email: "supervisor@hcmut.edu.vn",
    role: "supervisor",
  },
  "department@hcmut.edu.vn": {
    id: "3",
    name: "PGS. Lê Văn Cường",
    email: "department@hcmut.edu.vn",
    role: "department_lecturer",
  },
  "reviewer@hcmut.edu.vn": {
    id: "4",
    name: "TS. Phạm Thị Dung",
    email: "reviewer@hcmut.edu.vn",
    role: "reviewer",
  },
  "council@hcmut.edu.vn": {
    id: "5",
    name: "PGS. Hoàng Văn Em",
    email: "council@hcmut.edu.vn",
    role: "council",
  },
  "office@hcmut.edu.vn": {
    id: "6",
    name: "Nguyễn Thị Phương",
    email: "office@hcmut.edu.vn",
    role: "academic_office",
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, role: UserRole) => {
    const demoUser = DEMO_ACCOUNTS[email]
    if (demoUser && demoUser.role === role) {
      setUser(demoUser)
      localStorage.setItem("user", JSON.stringify(demoUser))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
