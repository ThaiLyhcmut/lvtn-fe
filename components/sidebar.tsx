"use client"

import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"
import { Upload, Eye, Send, CheckCircle, Users, Star, MessageSquare, BookOpen } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function Sidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  const getMenuItems = () => {
    switch (user?.role) {
      case "student":
        return [
          { icon: Upload, label: "Nộp luận văn", href: "/dashboard/submit-thesis" },
          { icon: Eye, label: "Xem điểm", href: "/dashboard/view-grades" },
          { icon: BookOpen, label: "Theo dõi đề tài", href: "/dashboard/track-topics" },
        ]

      case "supervisor":
        return [
          { icon: Send, label: "Gửi đề tài", href: "/dashboard/submit-topic" },
          { icon: CheckCircle, label: "Đánh giá giữa kỳ", href: "/dashboard/midterm-evaluation" },
          { icon: CheckCircle, label: "Duyệt luận văn cuối kỳ", href: "/dashboard/final-approval" },
          { icon: BookOpen, label: "Theo dõi đề tài", href: "/dashboard/track-topics" },
        ]

      case "department_lecturer":
        return [
          { icon: CheckCircle, label: "Duyệt đề tài", href: "/dashboard/approve-topics" },
          { icon: BookOpen, label: "Theo dõi đề tài", href: "/dashboard/track-topics" },
        ]

      case "reviewer":
        return [
          { icon: MessageSquare, label: "Phản biện", href: "/dashboard/review" },
          { icon: BookOpen, label: "Theo dõi đề tài", href: "/dashboard/track-topics" },
        ]

      case "council":
        return [
          { icon: Star, label: "Chấm điểm", href: "/dashboard/grading" },
          { icon: BookOpen, label: "Theo dõi đề tài", href: "/dashboard/track-topics" },
        ]

      case "academic_office":
        return [
          { icon: Upload, label: "Upload danh sách SV & HĐ", href: "/dashboard/upload-lists" },
          { icon: Users, label: "Xếp hội đồng & bảo vệ", href: "/dashboard/assign-council" },
          { icon: BookOpen, label: "Theo dõi đề tài", href: "/dashboard/track-topics" },
        ]

      default:
        return []
    }
  }

  const menuItems = getMenuItems()

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Menu chức năng</h2>
          <div className="w-12 h-1 bg-blue-600 rounded"></div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-start space-x-3 h-12 text-left transition-all duration-200 px-3 rounded-md w-full",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-gray-400")} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Thống kê nhanh</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {user?.role === "student" && (
              <>
                <div className="flex justify-between">
                  <span>Đề tài:</span>
                  <span className="font-medium text-blue-600">1</span>
                </div>
                <div className="flex justify-between">
                  <span>Tiến độ:</span>
                  <span className="font-medium text-green-600">75%</span>
                </div>
              </>
            )}
            {user?.role === "supervisor" && (
              <>
                <div className="flex justify-between">
                  <span>Đề tài hướng dẫn:</span>
                  <span className="font-medium text-blue-600">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Chờ duyệt:</span>
                  <span className="font-medium text-orange-600">2</span>
                </div>
              </>
            )}
            {user?.role === "academic_office" && (
              <>
                <div className="flex justify-between">
                  <span>Tổng sinh viên:</span>
                  <span className="font-medium text-blue-600">150</span>
                </div>
                <div className="flex justify-between">
                  <span>Đề tài đã duyệt:</span>
                  <span className="font-medium text-green-600">45</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
