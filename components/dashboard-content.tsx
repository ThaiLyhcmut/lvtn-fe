"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileText, CheckCircle, Clock, AlertTriangle, TrendingUp, Calendar, Star } from "lucide-react"

export function DashboardContent() {
  const { user } = useAuth()

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

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Chào buổi sáng"
    if (hour < 18) return "Chào buổi chiều"
    return "Chào buổi tối"
  }

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Đề tài của tôi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-gray-800 mb-2">Xây dựng hệ thống quản lý thư viện số</h3>
            <p className="text-sm text-gray-600 mb-3">GVHD: TS. Trần Thị Bình</p>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Đang thực hiện
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Tiến độ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Hoàn thành</span>
                <span className="font-semibold">75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-gray-500">Đã nộp báo cáo giữa kỳ</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span>Deadline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">Nộp luận văn cuối kỳ</p>
            <p className="font-semibold text-orange-600">15/12/2024</p>
            <p className="text-xs text-gray-500 mt-2">Còn 25 ngày</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Lịch sử nộp bài</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Báo cáo giữa kỳ</p>
                  <p className="text-sm text-gray-500">15/10/2024</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Đã duyệt
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Luận văn cuối kỳ</p>
                  <p className="text-sm text-gray-500">Chưa nộp</p>
                </div>
                <Badge variant="outline">Chờ nộp</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Điểm số</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Điểm giữa kỳ</span>
                <span className="font-semibold text-green-600">8.5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Điểm cuối kỳ</span>
                <span className="text-gray-400">Chưa có</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Điểm tổng kết</span>
                <span className="text-gray-400">Chưa có</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSupervisorDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Đề tài hướng dẫn</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">5</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Chờ duyệt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">2</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Đã hoàn thành</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">3</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Cần xem xét</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">1</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đề tài cần xử lý</CardTitle>
          <CardDescription>Danh sách đề tài cần đánh giá hoặc duyệt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Hệ thống quản lý bán hàng",
                student: "Nguyễn Văn A",
                status: "Chờ đánh giá giữa kỳ",
                urgent: true,
              },
              {
                title: "Ứng dụng học tập trực tuyến",
                student: "Trần Thị B",
                status: "Chờ duyệt cuối kỳ",
                urgent: false,
              },
              { title: "Website thương mại điện tử", student: "Lê Văn C", status: "Đã hoàn thành", urgent: false },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">Sinh viên: {item.student}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {item.urgent && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  <Badge variant={item.urgent ? "destructive" : "secondary"}>{item.status}</Badge>
                  <Button size="sm" variant="outline">
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAcademicOfficeDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Tổng sinh viên</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">150</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Đề tài đã duyệt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">45</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Chờ xếp hội đồng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">12</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600">Hội đồng đã xếp</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">8</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Cảnh báo lệch điểm</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-medium text-red-800">Đề tài: Hệ thống AI</p>
                <p className="text-sm text-red-600">Lệch điểm GVHD - GVPB: 2.5 điểm</p>
                <p className="text-xs text-red-500">Cần xem xét lại</p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-yellow-800">Đề tài: App Mobile</p>
                <p className="text-sm text-yellow-600">Lệch điểm GVHD - GVPB: 2.0 điểm</p>
                <p className="text-xs text-yellow-500">Cần theo dõi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Lịch bảo vệ sắp tới</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Hội đồng 1</p>
                  <p className="text-sm text-gray-600">20/12/2024 - 8:00 AM</p>
                </div>
                <Badge>5 đề tài</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Hội đồng 2</p>
                  <p className="text-sm text-gray-600">22/12/2024 - 2:00 PM</p>
                </div>
                <Badge>3 đề tài</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderDefaultDashboard = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chức năng chính</CardTitle>
          <CardDescription>Các tính năng dành cho {getRoleDisplayName(user?.role || "")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <BookOpen className="w-6 h-6" />
              <span>Theo dõi đề tài</span>
            </Button>
            {user?.role === "department_lecturer" && (
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <CheckCircle className="w-6 h-6" />
                <span>Duyệt đề tài</span>
              </Button>
            )}
            {user?.role === "reviewer" && (
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <FileText className="w-6 h-6" />
                <span>Phản biện</span>
              </Button>
            )}
            {user?.role === "council" && (
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Star className="w-6 h-6" />
                <span>Chấm điểm</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">
          {getWelcomeMessage()}, {user?.name}!
        </h1>
        <p className="text-blue-100">
          Vai trò: {getRoleDisplayName(user?.role || "")} | Hôm nay là {new Date().toLocaleDateString("vi-VN")}
        </p>
      </div>

      {/* Role-specific Dashboard */}
      {user?.role === "student" && renderStudentDashboard()}
      {user?.role === "supervisor" && renderSupervisorDashboard()}
      {user?.role === "academic_office" && renderAcademicOfficeDashboard()}
      {["department_lecturer", "reviewer", "council"].includes(user?.role || "") && renderDefaultDashboard()}
    </div>
  )
}
