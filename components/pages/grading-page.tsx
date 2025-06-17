"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Star, Search, FileText, Clock, Download, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function GradingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [gradingData, setGradingData] = useState({
    presentationScore: "",
    contentScore: "",
    questionScore: "",
    overallScore: "",
    feedback: "",
  })
  const { toast } = useToast()

  const topics = [
    {
      id: 1,
      titleVi: "Xây dựng hệ thống quản lý thư viện số",
      titleEn: "Building Digital Library Management System",
      students: ["Nguyễn Văn An", "Trần Thị Bình"],
      supervisor: "TS. Trần Thị Bình",
      reviewer: "TS. Phạm Thị Dung",
      category: "Chuyên môn A",
      supervisorScore: 8.5,
      reviewerScore: 8.0,
      averageScore: 8.25,
      defenseDate: "2024-12-15",
      defenseTime: "09:00",
      defenseRoom: "Phòng 301 - Tòa B1",
      status: "scheduled",
      councilMembers: ["PGS. Nguyễn Văn Phong", "TS. Lê Văn Hùng", "ThS. Phạm Thị Lan"],
      hasFile: true,
      fileName: "LuanVan_NguyenVanAn_Final.pdf",
      fileSize: "5.2 MB",
    },
    {
      id: 2,
      titleVi: "Website thương mại điện tử",
      titleEn: "E-commerce Website",
      students: ["Lê Thị Em", "Hoàng Văn Phong"],
      supervisor: "ThS. Nguyễn Thị Dung",
      reviewer: "TS. Võ Văn Minh",
      category: "Chuyên môn A",
      supervisorScore: 7.5,
      reviewerScore: 7.8,
      averageScore: 7.65,
      defenseDate: "2024-12-15",
      defenseTime: "10:30",
      defenseRoom: "Phòng 302 - Tòa B1",
      status: "scheduled",
      councilMembers: ["PGS. Nguyễn Văn Phong", "TS. Trần Thị Giang", "ThS. Phạm Thị Lan"],
      hasFile: true,
      fileName: "LuanVan_LeThiEm_Final.pdf",
      fileSize: "4.8 MB",
    },
    {
      id: 3,
      titleVi: "Ứng dụng AI trong phân tích dữ liệu",
      titleEn: "AI Application in Data Analysis",
      students: ["Phạm Văn Cường"],
      supervisor: "PGS. Lê Văn Cường",
      reviewer: "TS. Hoàng Văn Em",
      category: "Chuyên môn B",
      supervisorScore: 8.0,
      reviewerScore: 7.8,
      averageScore: 7.9,
      defenseDate: "2024-12-10",
      defenseTime: "14:00",
      defenseRoom: "Phòng 201 - Tòa B2",
      status: "graded",
      councilMembers: ["PGS. Nguyễn Văn Phong", "TS. Lê Văn Hùng", "TS. Võ Văn Minh"],
      hasFile: true,
      fileName: "LuanVan_PhamVanCuong_Final.pdf",
      fileSize: "6.1 MB",
      presentationScore: 8.2,
      contentScore: 8.0,
      questionScore: 7.8,
      finalScore: 8.0,
      gradedDate: "2024-12-10",
      councilFeedback: "Sinh viên trình bày tốt, nội dung luận văn chất lượng cao. Trả lời câu hỏi chính xác.",
    },
  ]

  const handleSubmitGrading = (topicId: number) => {
    const { presentationScore, contentScore, questionScore, overallScore, feedback } = gradingData

    if (!presentationScore || !contentScore || !questionScore || !overallScore || !feedback) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ tất cả điểm số và nhận xét",
        variant: "destructive",
      })
      return
    }

    const scores = [presentationScore, contentScore, questionScore, overallScore].map(Number.parseFloat)
    if (scores.some((score) => score < 0 || score > 10)) {
      toast({
        title: "Lỗi",
        description: "Tất cả điểm số phải từ 0 đến 10",
        variant: "destructive",
      })
      return
    }

    const topic = topics.find((t) => t.id === topicId)
    toast({
      title: "Chấm điểm thành công",
      description: `Đã hoàn thành chấm điểm cho đề tài "${topic?.titleVi}"`,
    })

    setSelectedTopic(null)
    setGradingData({
      presentationScore: "",
      contentScore: "",
      questionScore: "",
      overallScore: "",
      feedback: "",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="w-3 h-3 mr-1" />
            Chờ chấm điểm
          </Badge>
        )
      case "graded":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Star className="w-3 h-3 mr-1" />
            Đã chấm điểm
          </Badge>
        )
      default:
        return null
    }
  }

  const getScoreDifference = (supervisorScore: number, reviewerScore: number) => {
    const diff = Math.abs(supervisorScore - reviewerScore)
    if (diff >= 2.0) return { level: "high", color: "text-red-600", bg: "bg-red-50" }
    if (diff >= 1.0) return { level: "medium", color: "text-yellow-600", bg: "bg-yellow-50" }
    return { level: "low", color: "text-green-600", bg: "bg-green-50" }
  }

  const filteredTopics = topics.filter(
    (topic) =>
      topic.titleVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.students.some((student) => student.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const scheduledTopics = filteredTopics.filter((topic) => topic.status === "scheduled")
  const gradedTopics = filteredTopics.filter((topic) => topic.status === "graded")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Star className="w-6 h-6 text-yellow-600" />
          <h1 className="text-2xl font-bold text-gray-800">Chấm điểm bảo vệ</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {scheduledTopics.length} chờ chấm
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {gradedTopics.length} đã chấm
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

      {/* Scheduled Defense */}
      {scheduledTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Chờ chấm điểm ({scheduledTopics.length})</span>
            </CardTitle>
            <CardDescription>Các luận văn đã bảo vệ, chờ chấm điểm</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledTopics.map((topic) => {
                const scoreDiff = getScoreDifference(topic.supervisorScore, topic.reviewerScore)

                return (
                  <div key={topic.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{topic.titleVi}</h3>
                        <p className="text-sm text-gray-600 mb-2">{topic.titleEn}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Sinh viên: {topic.students.join(", ")}</span>
                          <span>•</span>
                          <span>
                            Bảo vệ: {topic.defenseDate} - {topic.defenseTime}
                          </span>
                          <span>•</span>
                          <span>{topic.defenseRoom}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {scoreDiff.level === "high" && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Lệch điểm cao
                          </Badge>
                        )}
                        {getStatusBadge(topic.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-blue-800">Điểm GVHD</p>
                        <p className="text-lg font-bold text-blue-600">{topic.supervisorScore}/10</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-purple-800">Điểm GVPB</p>
                        <p className="text-lg font-bold text-purple-600">{topic.reviewerScore}/10</p>
                      </div>
                      <div className={`${scoreDiff.bg} rounded-lg p-3`}>
                        <p className="text-sm font-medium text-gray-800">Lệch điểm</p>
                        <p className={`text-lg font-bold ${scoreDiff.color}`}>
                          {Math.abs(topic.supervisorScore - topic.reviewerScore).toFixed(1)}
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-green-800">TB hiện tại</p>
                        <p className="text-lg font-bold text-green-600">{topic.averageScore}/10</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Hội đồng:</p>
                      <div className="flex flex-wrap gap-2">
                        {topic.councilMembers.map((member, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-600">
                          {topic.fileName} ({topic.fileSize})
                        </span>
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
                              className="bg-yellow-600 hover:bg-yellow-700 flex items-center space-x-1"
                              onClick={() => setSelectedTopic(topic)}
                            >
                              <Star className="w-3 h-3" />
                              <span>Chấm điểm</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Chấm điểm bảo vệ luận văn</DialogTitle>
                              <DialogDescription>{topic.titleVi}</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-600">Sinh viên:</span>
                                  <p>{topic.students.join(", ")}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">Thời gian bảo vệ:</span>
                                  <p>
                                    {topic.defenseDate} - {topic.defenseTime}
                                  </p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">Điểm GVHD:</span>
                                  <p className="font-bold text-blue-600">{topic.supervisorScore}/10</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-600">Điểm GVPB:</span>
                                  <p className="font-bold text-purple-600">{topic.reviewerScore}/10</p>
                                </div>
                              </div>

                              <div className="bg-gray-50 border rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">Hội đồng chấm điểm:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {topic.councilMembers.map((member, index) => (
                                    <Badge key={index} variant="outline">
                                      {member}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <label className="text-sm font-medium text-gray-700">Điểm thuyết trình (0-10):</label>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    placeholder="Điểm thuyết trình"
                                    value={gradingData.presentationScore}
                                    onChange={(e) =>
                                      setGradingData({ ...gradingData, presentationScore: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="space-y-3">
                                  <label className="text-sm font-medium text-gray-700">Điểm nội dung (0-10):</label>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    placeholder="Điểm nội dung"
                                    value={gradingData.contentScore}
                                    onChange={(e) => setGradingData({ ...gradingData, contentScore: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-3">
                                  <label className="text-sm font-medium text-gray-700">
                                    Điểm trả lời câu hỏi (0-10):
                                  </label>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    placeholder="Điểm Q&A"
                                    value={gradingData.questionScore}
                                    onChange={(e) => setGradingData({ ...gradingData, questionScore: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-3">
                                  <label className="text-sm font-medium text-gray-700">Điểm tổng kết (0-10):</label>
                                  <Input
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    placeholder="Điểm tổng kết"
                                    value={gradingData.overallScore}
                                    onChange={(e) => setGradingData({ ...gradingData, overallScore: e.target.value })}
                                  />
                                </div>
                              </div>

                              <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">Nhận xét của hội đồng:</label>
                                <Textarea
                                  placeholder="Nhận xét về buổi bảo vệ và chất lượng luận văn..."
                                  value={gradingData.feedback}
                                  onChange={(e) => setGradingData({ ...gradingData, feedback: e.target.value })}
                                  rows={4}
                                />
                              </div>

                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-medium text-blue-800 mb-2">Điểm cuối cùng dự kiến:</h4>
                                <div className="grid grid-cols-4 gap-4 text-center">
                                  <div>
                                    <p className="text-sm text-gray-600">GVHD</p>
                                    <p className="text-lg font-bold text-blue-600">{topic.supervisorScore}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">GVPB</p>
                                    <p className="text-lg font-bold text-purple-600">{topic.reviewerScore}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Hội đồng</p>
                                    <p className="text-lg font-bold text-yellow-600">
                                      {gradingData.overallScore || "--"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Trung bình</p>
                                    <p className="text-xl font-bold text-green-600">
                                      {gradingData.overallScore
                                        ? (
                                            (topic.supervisorScore +
                                              topic.reviewerScore +
                                              Number.parseFloat(gradingData.overallScore)) /
                                            3
                                          ).toFixed(1)
                                        : "--"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                                <Button
                                  className="bg-yellow-600 hover:bg-yellow-700"
                                  onClick={() => handleSubmitGrading(topic.id)}
                                >
                                  <Star className="w-4 h-4 mr-1" />
                                  Hoàn thành chấm điểm
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Graded Topics */}
      {gradedTopics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-green-600" />
              <span>Đã chấm điểm ({gradedTopics.length})</span>
            </CardTitle>
            <CardDescription>Các luận văn đã hoàn thành chấm điểm</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gradedTopics.map((topic) => (
                <div key={topic.id} className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{topic.titleVi}</h3>
                      <p className="text-sm text-gray-600 mb-2">{topic.titleEn}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Sinh viên: {topic.students.join(", ")}</span>
                        <span>•</span>
                        <span>Chấm điểm: {new Date(topic.gradedDate!).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </div>
                    {getStatusBadge(topic.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-3">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-800">GVHD</p>
                      <p className="text-lg font-bold text-blue-600">{topic.supervisorScore}/10</p>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-purple-800">GVPB</p>
                      <p className="text-lg font-bold text-purple-600">{topic.reviewerScore}/10</p>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-yellow-800">Hội đồng</p>
                      <p className="text-lg font-bold text-yellow-600">{topic.finalScore}/10</p>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-800">Điểm cuối</p>
                      <p className="text-lg font-bold text-green-600">
                        {((topic.supervisorScore + topic.reviewerScore + topic.finalScore!) / 3).toFixed(1)}/10
                      </p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-800">Kết quả</p>
                      <p
                        className={`text-lg font-bold ${
                          ((topic.supervisorScore + topic.reviewerScore + topic.finalScore!) / 3) >= 5.5
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {(topic.supervisorScore + topic.reviewerScore + topic.finalScore!) / 3 >= 5.5
                          ? "ĐẠT"
                          : "KHÔNG ĐẠT"}
                      </p>
                    </div>
                  </div>

                  {topic.councilFeedback && (
                    <div className="bg-white rounded-lg p-3 border">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Nhận xét hội đồng: </span>
                        {topic.councilFeedback}
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
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Không tìm thấy luận văn</h3>
            <p className="text-gray-600">
              {searchTerm ? "Thử thay đổi từ khóa tìm kiếm" : "Chưa có luận văn nào cần chấm điểm"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
