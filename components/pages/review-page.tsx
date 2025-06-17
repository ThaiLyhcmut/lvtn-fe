"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Search, FileText, Eye, Clock, Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ReviewPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [reviewData, setReviewData] = useState({
    score: "",
    feedback: "",
    strengths: "",
    weaknesses: "",
    suggestions: "",
  })
  const { toast } = useToast()

  const topics = [
    {
      id: 1,
      titleVi: "Xây dựng hệ thống quản lý thư viện số",
      titleEn: "Building Digital Library Management System",
      students: ["Nguyễn Văn An", "Trần Thị Bình"],
      supervisor: "TS. Trần Thị Bình",
      category: "Chuyên môn A",
      submittedDate: "2024-11-20",
      hasFile: true,
      fileName: "LuanVan_NguyenVanAn_Final.pdf",
      fileSize: "5.2 MB",
      status: "pending",
      description: "Hệ thống quản lý thư viện số hoàn chỉnh với đầy đủ tính năng quản lý sách, người dùng và thống kê.",
      supervisorScore: 8.5,
      defenseDate: "2024-12-15",
      defenseTime: "09:00",
      defenseRoom: "Phòng 301 - Tòa B1",
    },
    {
      id: 2,
      titleVi: "Website thương mại điện tử",
      titleEn: "E-commerce Website",
      students: ["Lê Thị Em", "Hoàng Văn Phong"],
      supervisor: "ThS. Nguyễn Thị Dung",
      category: "Chuyên môn A",
      submittedDate: "2024-11-18",
      hasFile: true,
      fileName: "LuanVan_LeThiEm_Final.pdf",
      fileSize: "4.8 MB",
      status: "pending",
      description: "Website thương mại điện tử với tính năng thanh toán, quản lý đơn hàng và phân tích doanh số.",
      supervisorScore: 7.5,
      defenseDate: "2024-12-15",
      defenseTime: "10:30",
      defenseRoom: "Phòng 302 - Tòa B1",
    },
    {
      id: 3,
      titleVi: "Ứng dụng AI trong phân tích dữ liệu",
      titleEn: "AI Application in Data Analysis",
      students: ["Phạm Văn Cường"],
      supervisor: "PGS. Lê Văn Cường",
      category: "Chuyên môn B",
      submittedDate: "2024-11-10",
      hasFile: true,
      fileName: "LuanVan_PhamVanCuong_Final.pdf",
      fileSize: "6.1 MB",
      status: "reviewed",
      description: "Nghiên cứu và ứng dụng các thuật toán machine learning để phân tích dữ liệu lớn.",
      supervisorScore: 8.0,
      reviewerScore: 7.8,
      reviewDate: "2024-11-25",
      reviewFeedback:
        "Luận văn có nội dung tốt, thuật toán được implement đúng. Tuy nhiên cần cải thiện phần trình bày kết quả.",
      defenseDate: "2024-12-10",
      defenseTime: "14:00",
      defenseRoom: "Phòng 201 - Tòa B2",
    },
  ]

  const handleSubmitReview = (topicId: number) => {
    if (!reviewData.score || !reviewData.feedback) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ điểm số và nhận xét",
        variant: "destructive",
      })
      return
    }

    const score = Number.parseFloat(reviewData.score)
    if (score < 0 || score > 10) {
      toast({
        title: "Lỗi",
        description: "Điểm số phải từ 0 đến 10",
        variant: "destructive",
      })
      return
    }

    const topic = topics.find((t) => t.id === topicId)
    toast({
      title: "Phản biện thành công",
      description: `Đã hoàn thành phản biện cho đề tài "${topic?.titleVi}"`,
    })

    setSelectedTopic(null)
    setReviewData({
      score: "",
      feedback: "",
      strengths: "",
      weaknesses: "",
      suggestions: "",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Chờ phản biện
          </Badge>
        )
      case "reviewed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <MessageSquare className="w-3 h-3 mr-1" />
            Đã phản biện
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredTopics = topics.filter(
    (topic) =>
      topic.titleVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.students.some((student) => student.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const pendingTopics = filteredTopics.filter((topic) => topic.status === "pending")
  const reviewedTopics = filteredTopics.filter((topic) => topic.status === "reviewed")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-800">Phản biện luận văn</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            {pendingTopics.length} chờ phản biện
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {reviewedTopics.length} đã phản biện
          </Badge>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm đề tài, sinh viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews */}
      {pendingTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span>Chờ phản biện ({pendingTopics.length})</span>
            </CardTitle>
            <CardDescription>Các luận văn cần phản biện</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTopics.map((topic) => (
                <div key={topic.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{topic.titleVi}</h3>
                      <p className="text-sm text-gray-600 mb-2">{topic.titleEn}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Sinh viên: {topic.students.join(", ")}</span>
                        <span>•</span>
                        <span>GVHD: {topic.supervisor}</span>
                        <span>•</span>
                        <span>{topic.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">{getStatusBadge(topic.status)}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-800">Điểm GVHD</p>
                      <p className="text-lg font-bold text-blue-600">{topic.supervisorScore}/10</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-800">Bảo vệ</p>
                      <p className="text-sm font-bold text-green-600">{topic.defenseDate}</p>
                      <p className="text-xs text-green-600">
                        {topic.defenseTime} - {topic.defenseRoom}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-purple-800">File luận văn</p>
                      <p className="text-sm font-bold text-purple-600">{topic.fileName}</p>
                      <p className="text-xs text-purple-600">{topic.fileSize}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600">Có file đính kèm</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>Tải PDF</span>
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-1"
                            onClick={() => setSelectedTopic(topic)}
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Phản biện</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Phản biện luận văn</DialogTitle>
                            <DialogDescription>{topic.titleVi}</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-600">Sinh viên:</span>
                                <p>{topic.students.join(", ")}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">GVHD:</span>
                                <p>{topic.supervisor}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Điểm GVHD:</span>
                                <p className="font-bold text-blue-600">{topic.supervisorScore}/10</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Bảo vệ:</span>
                                <p>
                                  {topic.defenseDate} - {topic.defenseTime}
                                </p>
                              </div>
                            </div>

                            <div>
                              <span className="font-medium text-gray-600">Mô tả đề tài:</span>
                              <p className="mt-1 text-gray-700">{topic.description}</p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <FileText className="w-5 h-5 text-blue-600" />
                                  <div>
                                    <p className="font-medium text-blue-800">Luận văn</p>
                                    <p className="text-sm text-blue-600">
                                      {topic.fileName} - {topic.fileSize}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-3 h-3 mr-1" />
                                    Xem PDF
                                  </Button>
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    <Download className="w-3 h-3 mr-1" />
                                    Tải xuống
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">Điểm phản biện (0-10):</label>
                                <Input
                                  type="number"
                                  min="0"
                                  max="10"
                                  step="0.1"
                                  placeholder="Nhập điểm số"
                                  value={reviewData.score}
                                  onChange={(e) => setReviewData({ ...reviewData, score: e.target.value })}
                                />
                              </div>
                              <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">Điểm trung bình dự kiến:</label>
                                <div className="p-2 bg-gray-100 rounded border text-center">
                                  <span className="text-lg font-bold text-gray-700">
                                    {reviewData.score
                                      ? ((topic.supervisorScore + Number.parseFloat(reviewData.score)) / 2).toFixed(1)
                                      : "--"}
                                    /10
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700">Điểm mạnh:</label>
                              <Textarea
                                placeholder="Nêu những điểm mạnh của luận văn..."
                                value={reviewData.strengths}
                                onChange={(e) => setReviewData({ ...reviewData, strengths: e.target.value })}
                                rows={3}
                              />
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700">Điểm yếu:</label>
                              <Textarea
                                placeholder="Nêu những điểm cần cải thiện..."
                                value={reviewData.weaknesses}
                                onChange={(e) => setReviewData({ ...reviewData, weaknesses: e.target.value })}
                                rows={3}
                              />
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700">Nhận xét tổng quan:</label>
                              <Textarea
                                placeholder="Nhận xét tổng quan về luận văn..."
                                value={reviewData.feedback}
                                onChange={(e) => setReviewData({ ...reviewData, feedback: e.target.value })}
                                rows={4}
                              />
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700">Đề xuất cải thiện:</label>
                              <Textarea
                                placeholder="Đề xuất những cải thiện cho luận văn..."
                                value={reviewData.suggestions}
                                onChange={(e) => setReviewData({ ...reviewData, suggestions: e.target.value })}
                                rows={3}
                              />
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                              <Button
                                className="bg-purple-600 hover:bg-purple-700"
                                onClick={() => handleSubmitReview(topic.id)}
                              >
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Hoàn thành phản biện
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviewed Topics */}
      {reviewedTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <span>Đã phản biện ({reviewedTopics.length})</span>
            </CardTitle>
            <CardDescription>Các luận văn đã hoàn thành phản biện</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviewedTopics.map((topic) => (
                <div key={topic.id} className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{topic.titleVi}</h3>
                      <p className="text-sm text-gray-600 mb-2">{topic.titleEn}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Sinh viên: {topic.students.join(", ")}</span>
                        <span>•</span>
                        <span>Phản biện: {new Date(topic.reviewDate!).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </div>
                    {getStatusBadge(topic.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-800">Điểm GVHD</p>
                      <p className="text-lg font-bold text-blue-600">{topic.supervisorScore}/10</p>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-purple-800">Điểm phản biện</p>
                      <p className="text-lg font-bold text-purple-600">{topic.reviewerScore}/10</p>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-800">Điểm trung bình</p>
                      <p className="text-lg font-bold text-green-600">
                        {((topic.supervisorScore! + topic.reviewerScore!) / 2).toFixed(1)}/10
                      </p>
                    </div>
                  </div>

                  {topic.reviewFeedback && (
                    <div className="bg-white rounded-lg p-3 border">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Nhận xét phản biện: </span>
                        {topic.reviewFeedback}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredTopics.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Không tìm thấy luận văn</h3>
            <p className="text-gray-600">
              {searchTerm ? "Thử thay đổi từ khóa tìm kiếm" : "Chưa có luận văn nào cần phản biện"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
