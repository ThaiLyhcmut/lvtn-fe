"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import { BookOpen, Search, Download, Eye, Users, Calendar, FileText, Filter } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function TrackTopicsPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const allTopics = [
    {
      id: 1,
      titleVi: "Xây dựng hệ thống quản lý thư viện số",
      titleEn: "Building Digital Library Management System",
      supervisor: "TS. Trần Thị Bình",
      category: "Chuyên môn A",
      students: ["Nguyễn Văn An", "Trần Thị Bình"],
      status: "in_progress",
      submittedDate: "2024-09-15",
      approvedDate: "2024-09-20",
      description:
        "Xây dựng hệ thống quản lý thư viện số với các tính năng tìm kiếm, mượn trả sách điện tử, quản lý người dùng và thống kê.",
      hasFile: true,
      progress: 75,
    },
    {
      id: 2,
      titleVi: "Ứng dụng AI trong phân tích dữ liệu",
      titleEn: "AI Application in Data Analysis",
      supervisor: "PGS. Lê Văn Cường",
      category: "Chuyên môn B",
      students: ["Phạm Văn Cường"],
      status: "completed",
      submittedDate: "2024-08-10",
      approvedDate: "2024-08-15",
      description:
        "Nghiên cứu và ứng dụng các thuật toán machine learning để phân tích dữ liệu lớn trong lĩnh vực kinh doanh.",
      hasFile: true,
      progress: 100,
    },
    {
      id: 3,
      titleVi: "Hệ thống thương mại điện tử",
      titleEn: "E-commerce System",
      supervisor: "ThS. Nguyễn Thị Dung",
      category: "Chuyên môn A",
      students: ["Lê Thị Em", "Hoàng Văn Phong", "Trần Văn Giang"],
      status: "pending_approval",
      submittedDate: "2024-11-01",
      approvedDate: null,
      description:
        "Phát triển website thương mại điện tử hoàn chỉnh với tính năng thanh toán, quản lý đơn hàng và phân tích doanh số.",
      hasFile: false,
      progress: 30,
    },
    {
      id: 4,
      titleVi: "Ứng dụng IoT trong nông nghiệp thông minh",
      titleEn: "IoT Application in Smart Agriculture",
      supervisor: "TS. Hoàng Văn Em",
      category: "Chuyên môn C",
      students: ["Nguyễn Thị Hoa"],
      status: "in_progress",
      submittedDate: "2024-09-25",
      approvedDate: "2024-09-30",
      description: "Phát triển hệ thống IoT để giám sát và điều khiển tự động các yếu tố môi trường trong nông nghiệp.",
      hasFile: true,
      progress: 60,
    },
    {
      id: 5,
      titleVi: "Hệ thống nhận dạng khuôn mặt",
      titleEn: "Face Recognition System",
      supervisor: "TS. Phạm Thị Dung",
      category: "Chuyên môn B",
      students: ["Võ Văn Khánh", "Đặng Thị Lan"],
      status: "failed",
      submittedDate: "2024-07-15",
      approvedDate: "2024-07-20",
      description: "Xây dựng hệ thống nhận dạng khuôn mặt sử dụng deep learning cho ứng dụng bảo mật.",
      hasFile: true,
      progress: 45,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Hoàn thành</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Đang thực hiện</Badge>
      case "pending_approval":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Chờ duyệt</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Không đạt</Badge>
      default:
        return null
    }
  }

  const filteredTopics = allTopics.filter((topic) => {
    const matchesSearch =
      topic.titleVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.supervisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.students.some((student) => student.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || topic.status === statusFilter
    const matchesCategory = categoryFilter === "all" || topic.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getMyTopics = () => {
    if (user?.role === "student") {
      return filteredTopics.filter((topic) => topic.students.includes("Nguyễn Văn An"))
    }
    if (user?.role === "supervisor") {
      return filteredTopics.filter((topic) => topic.supervisor === "TS. Trần Thị Bình")
    }
    return filteredTopics
  }

  const topicsToShow = getMyTopics()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Theo dõi đề tài</h1>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {topicsToShow.length} đề tài
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm đề tài, giảng viên, sinh viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending_approval">Chờ duyệt</SelectItem>
                <SelectItem value="in_progress">Đang thực hiện</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="failed">Không đạt</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Chuyên môn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả chuyên môn</SelectItem>
                <SelectItem value="Chuyên môn A">Chuyên môn A</SelectItem>
                <SelectItem value="Chuyên môn B">Chuyên môn B</SelectItem>
                <SelectItem value="Chuyên môn C">Chuyên môn C</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Lọc nâng cao</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Topics List */}
      <div className="grid grid-cols-1 gap-6">
        {topicsToShow.map((topic) => (
          <Card key={topic.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{topic.titleVi}</CardTitle>
                  <CardDescription className="text-sm mb-3">{topic.titleEn}</CardDescription>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>GVHD: {topic.supervisor}</span>
                    <span>•</span>
                    <span>{topic.category}</span>
                    <span>•</span>
                    <span>Ngày gửi: {new Date(topic.submittedDate).toLocaleDateString("vi-VN")}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">{getStatusBadge(topic.status)}</div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {/* Students */}
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Sinh viên:</span>
                  <div className="flex flex-wrap gap-1">
                    {topic.students.map((student, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {student}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                {topic.status === "in_progress" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tiến độ:</span>
                      <span className="font-medium">{topic.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{topic.description}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    {topic.approvedDate && (
                      <>
                        <Calendar className="w-3 h-3" />
                        <span>Duyệt: {new Date(topic.approvedDate).toLocaleDateString("vi-VN")}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>Chi tiết</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{topic.titleVi}</DialogTitle>
                          <DialogDescription>{topic.titleEn}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-600">GVHD:</span>
                              <p>{topic.supervisor}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Chuyên môn:</span>
                              <p>{topic.category}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Trạng thái:</span>
                              <div className="mt-1">{getStatusBadge(topic.status)}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Tiến độ:</span>
                              <p>{topic.progress}%</p>
                            </div>
                          </div>

                          <div>
                            <span className="font-medium text-gray-600">Sinh viên tham gia:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {topic.students.map((student, index) => (
                                <Badge key={index} variant="outline">
                                  {student}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-medium text-gray-600">Mô tả chi tiết:</span>
                            <p className="mt-1 text-gray-700">{topic.description}</p>
                          </div>

                          {topic.hasFile && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <FileText className="w-5 h-5 text-blue-600" />
                                  <div>
                                    <p className="font-medium text-blue-800">Luận văn đã nộp</p>
                                    <p className="text-sm text-blue-600">File PDF - Phiên bản mới nhất</p>
                                  </div>
                                </div>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  <Download className="w-3 h-3 mr-1" />
                                  Tải xuống
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {topic.hasFile && (
                      <Button size="sm" variant="outline" className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>Tải PDF</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {topicsToShow.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Không tìm thấy đề tài</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                : "Chưa có đề tài nào"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
