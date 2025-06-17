"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, X, Search, FileText, Eye, ChevronDown, ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function ApproveTopicsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["chuyen-mon-a"])
  const { toast } = useToast()

  const topicsByCategory = {
    "chuyen-mon-a": [
      {
        id: 1,
        titleVi: "Xây dựng hệ thống quản lý thư viện số",
        titleEn: "Building Digital Library Management System",
        supervisor: "TS. Trần Thị Bình",
        submittedDate: "2024-11-01",
        description: "Hệ thống quản lý thư viện số với các tính năng tìm kiếm, mượn trả sách điện tử...",
      },
      {
        id: 2,
        titleVi: "Website thương mại điện tử",
        titleEn: "E-commerce Website",
        supervisor: "ThS. Nguyễn Văn An",
        submittedDate: "2024-11-02",
        description: "Xây dựng website bán hàng trực tuyến với đầy đủ chức năng thanh toán...",
      },
    ],
    "chuyen-mon-b": [
      {
        id: 3,
        titleVi: "Ứng dụng AI trong phân tích dữ liệu",
        titleEn: "AI Application in Data Analysis",
        supervisor: "PGS. Lê Văn Cường",
        submittedDate: "2024-10-28",
        description: "Nghiên cứu và ứng dụng các thuật toán AI để phân tích dữ liệu lớn...",
      },
      {
        id: 4,
        titleVi: "Hệ thống nhận dạng khuôn mặt",
        titleEn: "Face Recognition System",
        supervisor: "TS. Phạm Thị Dung",
        submittedDate: "2024-10-30",
        description: "Xây dựng hệ thống nhận dạng khuôn mặt sử dụng deep learning...",
      },
    ],
    "chuyen-mon-c": [
      {
        id: 5,
        titleVi: "Ứng dụng IoT trong nông nghiệp thông minh",
        titleEn: "IoT Application in Smart Agriculture",
        supervisor: "TS. Hoàng Văn Em",
        submittedDate: "2024-11-03",
        description: "Phát triển hệ thống IoT để giám sát và điều khiển tự động trong nông nghiệp...",
      },
    ],
  }

  const categoryNames = {
    "chuyen-mon-a": "Chuyên môn A - Phần mềm & Web",
    "chuyen-mon-b": "Chuyên môn B - AI & Machine Learning",
    "chuyen-mon-c": "Chuyên môn C - IoT & Embedded Systems",
  }

  const handleApprove = (topicId: number, topicTitle: string) => {
    toast({
      title: "Duyệt đề tài thành công",
      description: `Đề tài "${topicTitle}" đã được duyệt`,
    })
  }

  const handleReject = (topicId: number, topicTitle: string) => {
    toast({
      title: "Từ chối đề tài",
      description: `Đề tài "${topicTitle}" đã bị từ chối`,
      variant: "destructive",
    })
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const filteredTopics = Object.entries(topicsByCategory).reduce(
    (acc, [categoryId, topics]) => {
      const filtered = topics.filter(
        (topic) =>
          topic.titleVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.supervisor.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      if (filtered.length > 0) {
        acc[categoryId] = filtered
      }
      return acc
    },
    {} as typeof topicsByCategory,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-800">Duyệt đề tài</h1>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {Object.values(filteredTopics).flat().length} đề tài chờ duyệt
        </Badge>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm đề tài, giảng viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Topics by Category */}
      <div className="space-y-4">
        {Object.entries(filteredTopics).map(([categoryId, topics]) => (
          <Card key={categoryId}>
            <Collapsible open={expandedCategories.includes(categoryId)} onOpenChange={() => toggleCategory(categoryId)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      {expandedCategories.includes(categoryId) ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                      <span>{categoryNames[categoryId as keyof typeof categoryNames]}</span>
                    </CardTitle>
                    <Badge variant="outline">{topics.length} đề tài</Badge>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {topics.map((topic) => (
                      <div key={topic.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 mb-1">{topic.titleVi}</h3>
                            <p className="text-sm text-gray-600 mb-2">{topic.titleEn}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>GVHD: {topic.supervisor}</span>
                              <span>Ngày gửi: {new Date(topic.submittedDate).toLocaleDateString("vi-VN")}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Button size="sm" variant="outline" className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>Xem</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => handleApprove(topic.id, topic.titleVi)}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Duyệt
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleReject(topic.id, topic.titleVi)}
                            >
                              <X className="w-3 h-3 mr-1" />
                              Từ chối
                            </Button>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded p-3 mt-3">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Mô tả: </span>
                            {topic.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {Object.keys(filteredTopics).length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Không tìm thấy đề tài</h3>
            <p className="text-gray-600">
              {searchTerm ? "Thử thay đổi từ khóa tìm kiếm" : "Chưa có đề tài nào chờ duyệt"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
