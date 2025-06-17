"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, X, Search, FileText, Eye, Clock, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function MidtermEvaluationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [feedback, setFeedback] = useState("")
  const { toast } = useToast()

  const topics = [
    {
      id: 1,
      titleVi: "Xây dựng hệ thống quản lý thư viện số",
      titleEn: "Building Digital Library Management System",
      students: ["Nguyễn Văn An", "Trần Thị Bình"],
      category: "Chuyên môn A",
      submittedDate: "2024-10-15",
      hasFile: true,
      fileName: "BaoCaoGiuaKy_NguyenVanAn.pdf",
      fileSize: "2.5 MB",
      status: "pending",
      description: "Xây dựng hệ thống quản lý thư viện số với các tính năng tìm kiếm, mượn trả sách điện tử.",
      progress: "Đã hoàn thành 70% yêu cầu, đang trong giai đoạn test và hoàn thiện giao diện.",
    },
    {
      id: 2,
      titleVi: "Website thương mại điện tử",
      titleEn: "E-commerce Website",
      students: ["Lê Thị Em", "Hoàng Văn Phong"],
      category: "Chuyên môn A",
      submittedDate: "2024-10-18",
      hasFile: true,
      fileName: "BaoCaoGiuaKy_LeThiEm.pdf",
      fileSize: "3.1 MB",
      status: "pending",
      description: "Phát triển website bán hàng trực tuyến với đầy đủ chức năng thanh toán.",
      progress: "Hoàn thành module đăng ký/đăng nhập, đang phát triển giỏ hàng và thanh toán.",
    },
    {
      id: 3,
      titleVi: "Ứng dụng quản lý chi tiêu cá nhân",
      titleEn: "Personal Finance Management App",
      students: ["Phạm Văn Cường"],
      category: "Chuyên môn A",
      submittedDate: "2024-10-12",
      hasFile: false,
      fileName: null,
      fileSize: null,
      status: "no_submission",
      description: "Ứng dụng mobile giúp người dùng quản lý thu chi và lập kế hoạch tài chính.",
      progress: "Chưa nộp báo cáo giữa kỳ.",
    },
    {
      id: 4,
      titleVi: "Hệ thống chatbot hỗ trợ khách hàng",
      titleEn: "Customer Support Chatbot System",
      students: ["Võ Văn Khánh"],
      category: "Chuyên môn B",
      submittedDate: "2024-10-20",
      hasFile: true,
      fileName: "BaoCaoGiuaKy_VoVanKhanh.pdf",
      fileSize: "1.8 MB",
      status: "evaluated",
      result: "pass",
      description: "Xây dựng chatbot AI để hỗ trợ tự động trả lời câu hỏi của khách hàng.",
      progress: "Đã hoàn thành training model và tích hợp vào website.",
      evaluatedDate: "2024-10-22",
      evaluatorFeedback: "Sinh viên thể hiện tốt, chatbot hoạt động ổn định và trả lời chính xác.",
    },
  ]

  const handleEvaluate = (topicId: number, result: "pass" | "fail") => {
    if (!feedback.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập nhận xét đánh giá",
        variant: "destructive",
      })
      return
    }

    const topic = topics.find((t) => t.id === topicId)
    toast({
      title: `Đánh giá ${result === "pass" ? "Pass" : "Fail"}`,
      description: `Đã đánh giá ${result === "pass" ? "đạt" : "không đạt"} cho đề tài "${topic?.titleVi}"`,
      variant: result === "pass" ? "default" : "destructive",
    })

    setSelectedTopic(null)
    setFeedback("")
  }

  const getStatusBadge = (status: string, result?: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Chờ đánh giá
          </Badge>
        )
      case "evaluated":
        return result === "pass" ? (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Đạt
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <X className="w-3 h-3 mr-1" />
            Không đạt
          </Badge>
        )
      case "no_submission":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Chưa nộp
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
  const evaluatedTopics = filteredTopics.filter((topic) => topic.status === "evaluated")
  const noSubmissionTopics = filteredTopics.filter((topic) => topic.status === "no_submission")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-800">Đánh giá giữa kỳ</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            {pendingTopics.length} chờ đánh giá
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {evaluatedTopics.length} đã đánh giá
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

      {/* Pending Evaluations */}
      {pendingTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span>Chờ đánh giá ({pendingTopics.length})</span>
            </CardTitle>
            <CardDescription>Các đề tài cần đánh giá giữa kỳ</CardDescription>
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
                        <span>{topic.category}</span>
                        <span>•</span>
                        <span>Nộp: {new Date(topic.submittedDate).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">{getStatusBadge(topic.status)}</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Tiến độ: </span>
                      {topic.progress}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {topic.hasFile && (
                        <div className="flex items-center space-x-1 text-sm text-blue-600">
                          <FileText className="w-4 h-4" />
                          <span>{topic.fileName}</span>
                          <span className="text-gray-500">({topic.fileSize})</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedTopic(topic)}
                            className="flex items-center space-x-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Xem & Đánh giá</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{topic.titleVi}</DialogTitle>
                            <DialogDescription>{topic.titleEn}</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-600">Sinh viên:</span>
                                <p>{topic.students.join(", ")}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Chuyên môn:</span>
                                <p>{topic.category}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">Ngày nộp:</span>
                                <p>{new Date(topic.submittedDate).toLocaleDateString("vi-VN")}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-600">File báo cáo:</span>
                                <p>{topic.hasFile ? topic.fileName : "Chưa nộp"}</p>
                              </div>
                            </div>

                            <div>
                              <span className="font-medium text-gray-600">Mô tả đề tài:</span>
                              <p className="mt-1 text-gray-700">{topic.description}</p>
                            </div>

                            <div>
                              <span className="font-medium text-gray-600">Tiến độ hiện tại:</span>
                              <p className="mt-1 text-gray-700">{topic.progress}</p>
                            </div>

                            {topic.hasFile && (
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <div>
                                      <p className="font-medium text-blue-800">{topic.fileName}</p>
                                      <p className="text-sm text-blue-600">Kích thước: {topic.fileSize}</p>
                                    </div>
                                  </div>
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Xem PDF
                                  </Button>
                                </div>
                              </div>
                            )}

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700">Nhận xét đánh giá:</label>
                              <Textarea
                                placeholder="Nhập nhận xét về tiến độ và chất lượng công việc của sinh viên..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={4}
                              />
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                              <Button
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() => handleEvaluate(topic.id, "fail")}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Fail
                              </Button>
                              <Button
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleEvaluate(topic.id, "pass")}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Pass
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

      {/* No Submission */}
      {noSubmissionTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Chưa nộp báo cáo ({noSubmissionTopics.length})</span>
            </CardTitle>
            <CardDescription>Các đề tài chưa nộp báo cáo giữa kỳ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {noSubmissionTopics.map((topic) => (
                <div key={topic.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-800 mb-1">{topic.titleVi}</h3>
                      <p className="text-sm text-red-600 mb-2">{topic.titleEn}</p>
                      <div className="flex items-center space-x-4 text-sm text-red-500">
                        <span>Sinh viên: {topic.students.join(", ")}</span>
                        <span>•</span>
                        <span>{topic.category}</span>
                      </div>
                    </div>
                    {getStatusBadge(topic.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Evaluated Topics */}
      {evaluatedTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Đã đánh giá ({evaluatedTopics.length})</span>
            </CardTitle>
            <CardDescription>Các đề tài đã hoàn thành đánh giá giữa kỳ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evaluatedTopics.map((topic) => (
                <div key={topic.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{topic.titleVi}</h3>
                      <p className="text-sm text-gray-600 mb-2">{topic.titleEn}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Sinh viên: {topic.students.join(", ")}</span>
                        <span>•</span>
                        <span>Đánh giá: {new Date(topic.evaluatedDate!).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </div>
                    {getStatusBadge(topic.status, topic.result)}
                  </div>

                  {topic.evaluatorFeedback && (
                    <div className="bg-white rounded-lg p-3 border">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Nhận xét: </span>
                        {topic.evaluatorFeedback}
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
            <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Không tìm thấy đề tài</h3>
            <p className="text-gray-600">
              {searchTerm ? "Thử thay đổi từ khóa tìm kiếm" : "Chưa có đề tài nào cần đánh giá"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
