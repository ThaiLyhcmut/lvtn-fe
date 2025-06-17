"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Send, FileText, Eye, CheckCircle, X, Clock } from "lucide-react"

export function SubmitTopicPage() {
  const [formData, setFormData] = useState({
    titleVi: "",
    titleEn: "",
    category: "",
    description: "",
    supervisor: "",
  })
  const { toast } = useToast()

  const [submittedTopics] = useState([
    {
      id: 1,
      titleVi: "Xây dựng hệ thống quản lý thư viện số",
      titleEn: "Building Digital Library Management System",
      category: "Chuyên môn A",
      status: "approved",
      submittedDate: "2024-10-15",
    },
    {
      id: 2,
      titleVi: "Ứng dụng AI trong phân tích dữ liệu",
      titleEn: "AI Application in Data Analysis",
      category: "Chuyên môn B",
      status: "pending",
      submittedDate: "2024-11-01",
    },
    {
      id: 3,
      titleVi: "Hệ thống thương mại điện tử",
      titleEn: "E-commerce System",
      category: "Chuyên môn A",
      status: "rejected",
      submittedDate: "2024-09-20",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.titleVi || !formData.titleEn || !formData.category || !formData.supervisor) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Gửi đề tài thành công",
      description: "Đề tài của bạn đã được gửi và đang chờ duyệt",
    })

    // Reset form
    setFormData({
      titleVi: "",
      titleEn: "",
      category: "",
      description: "",
      supervisor: "",
    })
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
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <X className="w-3 h-3 mr-1" />
            Bị từ chối
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Send className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Gửi đề tài</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Thông tin đề tài mới</span>
            </CardTitle>
            <CardDescription>Điền đầy đủ thông tin để gửi đề tài mới</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleVi">Tên đề tài (Tiếng Việt) *</Label>
                <Input
                  id="titleVi"
                  value={formData.titleVi}
                  onChange={(e) => setFormData({ ...formData, titleVi: e.target.value })}
                  placeholder="Nhập tên đề tài bằng tiếng Việt"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="titleEn">Tên đề tài (Tiếng Anh) *</Label>
                <Input
                  id="titleEn"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  placeholder="Nhập tên đề tài bằng tiếng Anh"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Nhóm chuyên môn *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhóm chuyên môn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chuyen-mon-a">Chuyên môn A</SelectItem>
                    <SelectItem value="chuyen-mon-b">Chuyên môn B</SelectItem>
                    <SelectItem value="chuyen-mon-c">Chuyên môn C</SelectItem>
                    <SelectItem value="chuyen-mon-d">Chuyên môn D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supervisor">Giảng viên hướng dẫn *</Label>
                <Input
                  id="supervisor"
                  value={formData.supervisor}
                  onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                  placeholder="Nhập tên giảng viên hướng dẫn"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả đề tài</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả chi tiết về đề tài..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Tài liệu mô tả (tùy chọn)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Kéo thả file .doc hoặc .pdf vào đây</p>
                  <p className="text-xs text-gray-500">hoặc nhấn để chọn file</p>
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Gửi đề tài
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Submitted Topics List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Danh sách đề tài đã gửi</span>
            </CardTitle>
            <CardDescription>Theo dõi trạng thái các đề tài bạn đã gửi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {submittedTopics.map((topic) => (
                <div key={topic.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm">{topic.titleVi}</h3>
                    {getStatusBadge(topic.status)}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{topic.titleEn}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Chuyên môn: {topic.category}</span>
                    <span>Ngày gửi: {new Date(topic.submittedDate).toLocaleDateString("vi-VN")}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
