"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Upload, Users, FileText, Plus, Search, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function UploadListsPage() {
  const [selectedSemester, setSelectedSemester] = useState("")
  const [uploadType, setUploadType] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const { toast } = useToast()

  const [uploadedData] = useState({
    students: [
      { id: "2021001", name: "Nguyễn Văn An", email: "an.nguyen@hcmut.edu.vn", major: "KHMT", type: "LVTN" },
      { id: "2021002", name: "Trần Thị Bình", email: "binh.tran@hcmut.edu.vn", major: "KHMT", type: "LVTN" },
      { id: "2021003", name: "Lê Văn Cường", email: "cuong.le@hcmut.edu.vn", major: "KTPM", type: "ĐACN" },
      { id: "2021004", name: "Phạm Thị Dung", email: "dung.pham@hcmut.edu.vn", major: "KTPM", type: "ĐACN" },
      { id: "2021005", name: "Hoàng Văn Em", email: "em.hoang@hcmut.edu.vn", major: "KHMT", type: "LVTN" },
    ],
    council: [
      {
        id: "GV001",
        name: "PGS. Nguyễn Văn Phong",
        email: "phong.nguyen@hcmut.edu.vn",
        department: "KHMT",
        role: "Chủ tịch HĐ",
      },
      {
        id: "GV002",
        name: "TS. Trần Thị Giang",
        email: "giang.tran@hcmut.edu.vn",
        department: "KTPM",
        role: "Ủy viên",
      },
      { id: "GV003", name: "TS. Lê Văn Hùng", email: "hung.le@hcmut.edu.vn", department: "KHMT", role: "Ủy viên" },
      { id: "GV004", name: "ThS. Phạm Thị Lan", email: "lan.pham@hcmut.edu.vn", department: "KTPM", role: "Thư ký" },
      { id: "GV005", name: "TS. Võ Văn Minh", email: "minh.vo@hcmut.edu.vn", department: "KHMT", role: "Ủy viên" },
    ],
  })

  const [approvedTopics] = useState([
    {
      id: 1,
      titleVi: "Xây dựng hệ thống quản lý thư viện số",
      titleEn: "Building Digital Library Management System",
      supervisor: "TS. Trần Thị Bình",
      category: "Chuyên môn A",
      students: [],
      maxStudents: 3,
      status: "approved",
    },
    {
      id: 2,
      titleVi: "Ứng dụng AI trong phân tích dữ liệu",
      titleEn: "AI Application in Data Analysis",
      supervisor: "PGS. Lê Văn Cường",
      category: "Chuyên môn B",
      students: ["Nguyễn Văn An"],
      maxStudents: 2,
      status: "approved",
    },
    {
      id: 3,
      titleVi: "Website thương mại điện tử",
      titleEn: "E-commerce Website",
      supervisor: "ThS. Nguyễn Thị Dung",
      category: "Chuyên môn A",
      students: ["Trần Thị Bình", "Lê Văn Cường"],
      maxStudents: 3,
      status: "approved",
    },
  ])

  const handleFileUpload = () => {
    if (!selectedSemester || !uploadType) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn học kỳ và loại danh sách",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Upload thành công",
      description: `Đã upload danh sách ${uploadType === "students" ? "sinh viên" : "ban hội đồng"} cho ${selectedSemester}`,
    })

    setSelectedSemester("")
    setUploadType("")
  }

  const handleAddStudent = (topicId: number, studentId: string) => {
    const student = uploadedData.students.find((s) => s.id === studentId)
    if (student) {
      toast({
        title: "Thêm sinh viên thành công",
        description: `Đã thêm ${student.name} vào đề tài`,
      })
    }
  }

  const handleRemoveStudent = (topicId: number, studentName: string) => {
    toast({
      title: "Xóa sinh viên",
      description: `Đã xóa ${studentName} khỏi đề tài`,
    })
  }

  const availableStudents = uploadedData.students.filter(
    (student) => !approvedTopics.some((topic) => topic.students.includes(student.name)),
  )

  const filteredStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Upload className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Upload danh sách SV & Ban hội đồng</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Upload danh sách</span>
            </CardTitle>
            <CardDescription>Tải lên danh sách sinh viên và ban hội đồng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Học kỳ</label>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn học kỳ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hk1-2024-2025">HK1 2024-2025</SelectItem>
                    <SelectItem value="hk2-2024-2025">HK2 2024-2025</SelectItem>
                    <SelectItem value="hk3-2024-2025">HK3 2024-2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Loại danh sách</label>
                <Select value={uploadType} onValueChange={setUploadType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại danh sách" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="students">Danh sách sinh viên</SelectItem>
                    <SelectItem value="council">Danh sách ban hội đồng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">Tải lên file Excel</h3>
              <p className="text-sm text-gray-600 mb-4">Kéo thả file .xlsx vào đây hoặc nhấn để chọn file</p>
              <p className="text-xs text-gray-500">Chỉ chấp nhận file Excel (.xlsx), tối đa 5MB</p>
            </div>

            <Button onClick={handleFileUpload} className="w-full" disabled={!selectedSemester || !uploadType}>
              <Upload className="w-4 h-4 mr-2" />
              Upload danh sách
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Định dạng file Excel:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  • <strong>Sinh viên:</strong> MSSV | Họ tên | Email | Chuyên ngành | Loại (ĐACN/LVTN)
                </li>
                <li>
                  • <strong>Ban HĐ:</strong> Mã GV | Họ tên | Email | Bộ môn | Vai trò
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Current Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Dữ liệu hiện tại</span>
            </CardTitle>
            <CardDescription>Thống kê dữ liệu đã upload</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800">Sinh viên</h3>
                  <p className="text-2xl font-bold text-blue-600">{uploadedData.students.length}</p>
                  <p className="text-sm text-blue-600">
                    ĐACN: {uploadedData.students.filter((s) => s.type === "ĐACN").length} | LVTN:{" "}
                    {uploadedData.students.filter((s) => s.type === "LVTN").length}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800">Ban hội đồng</h3>
                  <p className="text-2xl font-bold text-green-600">{uploadedData.council.length}</p>
                  <p className="text-sm text-green-600">Giảng viên</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Sinh viên theo chuyên ngành:</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>KHMT:</span>
                    <span className="font-medium">
                      {uploadedData.students.filter((s) => s.major === "KHMT").length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>KTPM:</span>
                    <span className="font-medium">
                      {uploadedData.students.filter((s) => s.major === "KTPM").length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Ban hội đồng theo vai trò:</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Chủ tịch HĐ:</span>
                    <span className="font-medium">
                      {uploadedData.council.filter((c) => c.role === "Chủ tịch HĐ").length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ủy viên:</span>
                    <span className="font-medium">
                      {uploadedData.council.filter((c) => c.role === "Ủy viên").length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Thư ký:</span>
                    <span className="font-medium">
                      {uploadedData.council.filter((c) => c.role === "Thư ký").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Phân công sinh viên vào đề tài</span>
          </CardTitle>
          <CardDescription>Gán sinh viên vào các đề tài đã được duyệt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {approvedTopics.map((topic) => (
              <div key={topic.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{topic.titleVi}</h3>
                    <p className="text-sm text-gray-600 mb-2">{topic.titleEn}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>GVHD: {topic.supervisor}</span>
                      <span>•</span>
                      <span>{topic.category}</span>
                      <span>•</span>
                      <span>Tối đa: {topic.maxStudents} sinh viên</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {topic.students.length}/{topic.maxStudents}
                  </Badge>
                </div>

                {/* Current Students */}
                {topic.students.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Sinh viên đã gán:</h4>
                    <div className="flex flex-wrap gap-2">
                      {topic.students.map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-1 bg-blue-50 text-blue-800 px-2 py-1 rounded text-sm"
                        >
                          <span>{student}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0 hover:bg-red-100"
                            onClick={() => handleRemoveStudent(topic.id, student)}
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Student Button */}
                {topic.students.length < topic.maxStudents && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex items-center space-x-1">
                        <Plus className="w-3 h-3" />
                        <span>Thêm sinh viên</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Thêm sinh viên vào đề tài</DialogTitle>
                        <DialogDescription>{topic.titleVi}</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Tìm kiếm sinh viên..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>MSSV</TableHead>
                                <TableHead>Họ tên</TableHead>
                                <TableHead>Chuyên ngành</TableHead>
                                <TableHead>Loại</TableHead>
                                <TableHead></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredStudents.map((student) => (
                                <TableRow key={student.id}>
                                  <TableCell className="font-medium">{student.id}</TableCell>
                                  <TableCell>{student.name}</TableCell>
                                  <TableCell>{student.major}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline">{student.type}</Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Button size="sm" onClick={() => handleAddStudent(topic.id, student.id)}>
                                      Thêm
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        {filteredStudents.length === 0 && (
                          <div className="text-center py-8">
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">
                              {searchTerm ? "Không tìm thấy sinh viên" : "Không có sinh viên khả dụng"}
                            </p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
