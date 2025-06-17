"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, Calendar, CheckCircle, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SubmitThesisPage() {
  const [selectedType, setSelectedType] = useState("")
  const { toast } = useToast()

  const [submissionHistory] = useState([
    {
      id: 1,
      fileName: "BaoCaoGiuaKy_NguyenVanAn.pdf",
      type: "Giữa kỳ",
      submittedDate: "2024-10-15",
      status: "approved",
      size: "2.5 MB",
    },
    {
      id: 2,
      fileName: "BaoCaoGiuaKy_NguyenVanAn_v2.pdf",
      type: "Giữa kỳ",
      submittedDate: "2024-10-20",
      status: "approved",
      size: "2.8 MB",
    },
  ])

  const handleFileUpload = (type: string) => {
    if (!type) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn loại báo cáo",
        variant: "destructive",
      })
      return
    }

    // Simulate file upload
    toast({
      title: "Nộp file thành công",
      description: `File ${type.toLowerCase()} đã được nộp thành công`,
    })

    setSelectedType("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Đã duyệt
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Chờ duyệt
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Upload className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Nộp luận văn</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Nộp file mới</span>
            </CardTitle>
            <CardDescription>Chọn loại báo cáo và tải lên file PDF</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Loại báo cáo</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại báo cáo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="giua-ky">Báo cáo giữa kỳ</SelectItem>
                  <SelectItem value="cuoi-ky">Luận văn cuối kỳ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Tải lên file PDF</h3>
              <p className="text-sm text-gray-600 mb-4">Kéo thả file vào đây hoặc nhấn để chọn file</p>
              <p className="text-xs text-gray-500">Chỉ chấp nhận file PDF, tối đa 10MB</p>
            </div>

            <Button onClick={() => handleFileUpload(selectedType)} className="w-full" disabled={!selectedType}>
              <Upload className="w-4 h-4 mr-2" />
              Nộp file
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Lưu ý quan trọng:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• File có thể nộp nhiều lần, hệ thống sẽ lưu file mới nhất</li>
                <li>• Đảm bảo file PDF không bị lỗi và có thể mở được</li>
                <li>• Tên file nên đặt theo format: LoaiBaoCao_HoTen.pdf</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Submission History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Lịch sử nộp bài</span>
            </CardTitle>
            <CardDescription>Danh sách các file đã nộp</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submissionHistory.map((submission) => (
                <div key={submission.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm mb-1">{submission.fileName}</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Badge variant="outline" className="text-xs">
                          {submission.type}
                        </Badge>
                        <span>•</span>
                        <span>{submission.size}</span>
                      </div>
                    </div>
                    {getStatusBadge(submission.status)}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Ngày nộp: {new Date(submission.submittedDate).toLocaleDateString("vi-VN")}</span>
                    <Button size="sm" variant="ghost" className="h-6 text-xs">
                      Tải xuống
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {submissionHistory.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Chưa có file nào được nộp</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Current Topic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin đề tài hiện tại</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Xây dựng hệ thống quản lý thư viện số</h3>
              <p className="text-sm text-gray-600 mb-4">Building Digital Library Management System</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">GVHD:</span>
                  <span className="font-medium">TS. Trần Thị Bình</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chuyên môn:</span>
                  <span className="font-medium">Chuyên môn A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <Badge className="bg-green-100 text-green-800">Đang thực hiện</Badge>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-3">Deadline quan trọng</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Báo cáo giữa kỳ:</span>
                  <Badge className="bg-green-100 text-green-800">Đã nộp</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Luận văn cuối kỳ:</span>
                  <span className="font-medium text-orange-600">15/12/2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bảo vệ:</span>
                  <span className="text-gray-500">Chưa xếp lịch</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
