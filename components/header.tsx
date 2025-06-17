"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GraduationCap, Home, BookOpen, Users, UserCheck, LogOut, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      student: "Sinh viên",
      supervisor: "Giảng viên hướng dẫn",
      department_lecturer: "Giảng viên bộ môn",
      reviewer: "Giảng viên phản biện",
      council: "Hội đồng",
      academic_office: "Giáo vụ",
    }
    return roleNames[role as keyof typeof roleNames] || role
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Đại học Bách Khoa TP.HCM</h1>
              <p className="text-xs text-gray-500">Hệ thống quản lý luận văn</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Trang chủ</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Đề tài</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user?.role === "supervisor" && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/submit-topic" className="w-full">
                    Gửi đề tài
                  </Link>
                </DropdownMenuItem>
              )}
              {user?.role === "department_lecturer" && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/approve-topics" className="w-full">
                    Duyệt đề tài
                  </Link>
                </DropdownMenuItem>
              )}
              {user?.role === "student" && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/track-topics" className="w-full">
                    Xem đề tài
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href="/dashboard/track-topics" className="w-full">
                  Theo dõi đề tài
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/dashboard/upload-lists"
            className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Danh sách sinh viên</span>
          </Link>

          <Link
            href="/dashboard/assign-council"
            className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <UserCheck className="w-4 h-4" />
            <span>Ban hội đồng</span>
          </Link>
        </nav>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gray-100">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-600 text-white text-sm">{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">{getRoleDisplayName(user?.role || "")}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Thông tin cá nhân</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
