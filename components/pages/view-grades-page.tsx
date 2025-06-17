"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react"

export function ViewGradesPage() {
  const grades = {
    midterm: {
      status: "passed",
      grade: 8.5,
      feedback: "Sinh viên thể hiện tốt tiến độ nghiên cứu, báo cáo đầy đủ và rõ ràng.",
      evaluatedBy: "TS. Trần Thị Bình",
      evaluatedDate: "2024-10-20",
    },
    final: {
      status: "pending",
      grade: null,
      feedback: null,
      evaluatedBy: null,
      evaluatedDate: null,
    },
    defense: {
      status: "not_scheduled",
      grade: null,
      feedback: null,
      evaluatedBy: null,
      evaluatedDate: null,
    },
  }

  const getStatusBadge = (status: string, type: string) => {
    switch (status) {
      case "passed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Đạt
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            Không đạt
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            {type === "final" ? "Chờ chấm" : "Chờ đánh giá"}
          </Badge>
        )
      case "not_scheduled":
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Chưa xếp lịch
          </Badge>
        )
      default:
        return null
    }
  }

  const calculateOverallProgress = () => {
    let progress = 0
    if (grades.midterm.status === "passed") progress += 40
    if (grades.final.grade && grades.final.grade >= 5.5) progress += 40
    if (grades.defense.grade && grades.defense.grade >= 5.5) progress += 20
    return progress
  }

  const getOverallStatus = () => {
    if (grades.midterm.status === "failed") return "Rớt môn"
    if (grades.final.grade && grades.final.grade < 5.5) return "Rớt môn"
    if (grades.defense.grade && grades.defense.grade < 5.5) return "Rớt môn"
    if (grades.defense.grade && grades.defense.grade >= 5.5) return "Đạt môn"
    return "Đang học"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Star className="w-6 h-6 text-yellow-600" />
        <h1 className="text-2xl font-bold text-gray-800">Xem điểm</h1>
      </div>

      {/* Overall Progress */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Tổng quan tiến độ</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Tiến độ hoàn thành</span>
                <span className="text-sm font-bold text-blue-600">{calculateOverallProgress()}%</span>
              </div>
              <Progress value={calculateOverallProgress()} className="h-3 mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <Badge
                    className={
                      getOverallStatus() === "Đạt môn"
                        ? "bg-green-100 text-green-800"
                        : getOverallStatus() === "Rớt môn"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                    }
                  >
                    {getOverallStatus()}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đề tài:</span>
                  <span className="font-medium">Xây dựng hệ thống quản lý thư viện số</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GVHD:</span>
                  <span className="font-medium">TS. Trần Thị Bình</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Thống kê điểm</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Điểm giữa kỳ:</span>
                  <span className="font-bold text-green-600">
                    {grades.midterm.grade ? `${grades.midterm.grade}/10` : "Chưa có"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Điểm cuối kỳ:</span>
                  <span className="font-bold text-gray-400">
                    {grades.final.grade ? `${grades.final.grade}/10` : "Chưa có"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Điểm bảo vệ:</span>
                  <span className="font-bold text-gray-400">
                    {grades.defense.grade ? `${grades.defense.grade}/10` : "Chưa có"}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">Điểm tổng kết:</span>
                    <span className="font-bold text-blue-600">
                      {grades.defense.grade
                        ? `${((grades.midterm.grade || 0) * 0.3 + (grades.final.grade || 0) * 0.4 + (grades.defense.grade || 0) * 0.3).toFixed(1)}/10`
                        : "Chưa có"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Grades */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Midterm Grade */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Đánh giá giữa kỳ</CardTitle>
            <CardDescription>Đánh giá tiến độ và báo cáo giữa kỳ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Kết quả:</span>
                {getStatusBadge(grades.midterm.status, "midterm")}
              </div>

              {grades.midterm.grade && (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Điểm:</span>
                  <span className="text-2xl font-bold text-green-600">{grades.midterm.grade}/10</span>
                </div>
              )}

              {grades.midterm.feedback && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Nhận xét: </span>
                    {grades.midterm.feedback}
                  </p>
                </div>
              )}

              <div className="text-xs text-gray-500 space-y-1">
                {grades.midterm.evaluatedBy && (
                  <p>
                    <span className="font-medium">Người đánh giá:</span> {grades.midterm.evaluatedBy}
                  </p>
                )}
                {grades.midterm.evaluatedDate && (
                  <p>
                    <span className="font-medium">Ngày đánh giá:</span>{" "}
                    {new Date(grades.midterm.evaluatedDate).toLocaleDateString("vi-VN")}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Grade */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Điểm cuối kỳ</CardTitle>
            <CardDescription>Chấm điểm luận văn cuối kỳ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Trạng thái:</span>
                {getStatusBadge(grades.final.status, "final")}
              </div>

              {grades.final.grade ? (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Điểm:</span>
                  <span className="text-2xl font-bold text-blue-600">{grades.final.grade}/10</span>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Chưa có điểm</p>
                </div>
              )}

              {grades.final.feedback && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Nhận xét: </span>
                    {grades.final.feedback}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Defense Grade */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Điểm bảo vệ</CardTitle>
            <CardDescription>Kết quả bảo vệ luận văn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Trạng thái:</span>
                {getStatusBadge(grades.defense.status, "defense")}
              </div>

              {grades.defense.grade ? (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Điểm:</span>
                  <span className="text-2xl font-bold text-purple-600">{grades.defense.grade}/10</span>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Chưa xếp lịch bảo vệ</p>
                </div>
              )}

              {grades.defense.feedback && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Nhận xét: </span>
                    {grades.defense.feedback}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grade History */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử điểm</CardTitle>
          <CardDescription>Chi tiết quá trình đánh giá và chấm điểm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div className="flex-1">
                <h3 className="font-medium text-green-800">Đánh giá giữa kỳ - Đạt</h3>
                <p className="text-sm text-green-600">Điểm: 8.5/10</p>
                <p className="text-xs text-green-500">20/10/2024 - TS. Trần Thị Bình</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
              <div className="flex-1">
                <h3 className="font-medium text-yellow-800">Chấm điểm cuối kỳ - Chờ xử lý</h3>
                <p className="text-sm text-yellow-600">Đã nộp luận văn, chờ giảng viên chấm điểm</p>
                <p className="text-xs text-yellow-500">Dự kiến: 15/12/2024</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <AlertCircle className="w-6 h-6 text-gray-400" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-600">Bảo vệ luận văn - Chưa xếp lịch</h3>
                <p className="text-sm text-gray-500">Chờ hoàn thành chấm điểm cuối kỳ</p>
                <p className="text-xs text-gray-400">Dự kiến: Tháng 1/2025</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
