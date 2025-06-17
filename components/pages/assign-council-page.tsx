"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Users, Search, Calendar, Plus, Trash2, Clock, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function AssignCouncilPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("")
  const { toast } = useToast()

  const [councilMembers] = useState([
    {
      id: "GV001",
      name: "PGS. Nguyễn Văn Phong",
      email: "phong.nguyen@hcmut.edu.vn",
      department: "KHMT",
      role: "Chủ tịch HĐ",
      available: true,
    },
    {
      id: "GV002",
      name: "TS. Trần Thị Giang",
      email: "giang.tran@hcmut.edu.vn",
      department: "KTPM",
      role: "Ủy viên",
      available: true,
    },
    {
      id: "GV003",
      name: "TS. Lê Văn Hùng",
      email: "hung.le@hcmut.edu.vn",
      department: "KHMT",
      role: "Ủy viên",
      available: false,
    },
    {
      id: "GV004",
      name: "ThS. Phạm Thị Lan",
      email: "lan.pham@hcmut.edu.vn",
      department: "KTPM",
      role: "Thư ký",
      available: true,
    },
    {
      id: "GV005",
      name: "TS. Võ Văn Minh",
      email: "minh.vo@hcmut.edu.vn",
      department: "KHMT",
      role: "Ủy viên",
      available: true,
    },
  ])

  const [defenseSchedules, setDefenseSchedules] = useState([
    {
      id: 1,
      date: "2024-12-15",
      time: "09:00",
      room: "Phòng 301 - Tòa B1",
      status: "scheduled",
      topics: [
        {
          id: 1,
          titleVi: "Xây dựng hệ thống quản lý thư viện số",
          students: ["Nguyễn Văn An", "Trần Thị Bình"],
          supervisor: "TS. Trần Thị Bình",
        },
        {
          id: 2,
          titleVi: "Website thương mại điện tử",
          students: ["Lê Thị Em", "Hoàng Văn Phong"],
          supervisor: "ThS. Nguyễn Thị Dung",
        },
      ],
      council: [
        { id: "GV001", name: "PGS. Nguyễn Văn Phong", role: "Chủ tịch HĐ" },
        { id: "GV002", name: "TS. Trần Thị Giang", role: "Ủy viên" },
        { id: "GV004", name: "ThS. Phạm Thị Lan", role: "Thư ký" },
      ],
    },
    {
      id: 2,
      date: "2024-12-15",
      time: "14:00",
      room: "Phòng 302 - Tòa B1",
      status: "scheduled",
      topics: [
        {
          id: 3,
          titleVi: "Ứng dụng AI trong phân tích dữ liệu",
          students: ["Phạm Văn Cường"],
          supervisor: "PGS. Lê Văn Cường",
        },
      ],
      council: [
        { id: "GV001", name: "PGS. Nguyễn Văn Phong", role: "Chủ tịch HĐ" },
        { id: "GV003", name: "TS. Lê Văn Hùng", role: "Ủy viên" },
        { id: "GV005", name: "TS. Võ Văn Minh", role: "Ủy viên" },
      ],
    },
  ])

  const [pendingTopics] = useState([
    {
      id: 4,
      titleVi: "Hệ thống chatbot hỗ trợ khách hàng",
      titleEn: "Customer Support Chatbot System",
      students: ["Võ Văn Khánh"],
      supervisor: "TS. Phạm Thị Dung",
      category: "Chuyên môn B",
      supervisorScore: 8.0,
      reviewerScore: 7.8,
    },
    {
      id: 5,
      titleVi: "Ứng dụng IoT trong nông nghiệp thông minh",
      titleEn: "IoT Application in Smart Agriculture",
      students: ["Nguyễn Thị Hoa"],
      supervisor: "TS. Hoàng Văn Em",
      category: "Chuyên môn C",
      supervisorScore: 7.5,
      reviewerScore: 8.0,
    },
  ])

  const handleCreateSchedule = () => {
    if (!selectedDate || !selectedTime || !selectedRoom) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn đầy đủ ngày, giờ và phòng",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Tạo lịch bảo vệ thành công",
      description: `Đã tạo lịch bảo vệ ngày ${selectedDate} lúc ${selectedTime}`,
    })

    setSelectedDate("")
    setSelectedTime("")
    setSelectedRoom("")
  }

  const handleAssignCouncil = (scheduleId: number, memberId: string, role: string) => {
    const member = councilMembers.find((m) => m.id === memberId)
    if (member) {
      toast({
        title: "Phân công thành công",
        description: `Đã phân công ${member.name} làm ${role}`,
      })
    }
  }

  const handleAddTopicToSchedule = (scheduleId: number, topicId: number) => {
    const topic = pendingTopics.find((t) => t.id === topicId)
    if (topic) {
      toast({
        title: "Thêm đề tài thành công",
        description: `Đã thêm đề tài "${topic.titleVi}" vào lịch bảo vệ`,
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Calendar className="w-3 h-3 mr-1" />
            Đã xếp lịch
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Hoàn thành
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredSchedules = defenseSchedules.filter((schedule) =>
    schedule.topics.some(
      (topic) =>
        topic.titleVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.students.some((student) => student.toLowerCase().includes(searchTerm.toLowerCase())),
    ),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Xếp hội đồng & bảo vệ</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {defenseSchedules.length} lịch bảo vệ
          </Badge>
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            {pendingTopics.length} đề tài chờ xếp
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Tạo lịch bảo vệ mới</span>
            </CardTitle>
            <CardDescription>Tạo lịch bảo vệ và phân công hội đồng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ngày bảo vệ</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Giờ bảo vệ</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phòng bảo vệ</label>
              <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phòng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phòng 301 - Tòa B1">Phòng 301 - Tòa B1</SelectItem>
                  <SelectItem value="Phòng 302 - Tòa B1">Phòng 302 - Tòa B1</SelectItem>
                  <SelectItem value="Phòng 303 - Tòa B1">Phòng 303 - Tòa B1</SelectItem>
                  <SelectItem value="Phòng 201 - Tòa B2">Phòng 201 - Tòa B2</SelectItem>
                  <SelectItem value="Phòng 202 - Tòa B2">Phòng 202 - Tòa B2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleCreateSchedule} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Tạo lịch bảo vệ
            </Button>
          </CardContent>
        </Card>

        {/* Pending Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span>Đề tài chờ xếp lịch</span>
            </CardTitle>
            <CardDescription>Các đề tài đã được duyệt, chờ xếp lịch bảo vệ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTopics.map((topic) => (
                <div key={topic.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-800 text-sm mb-1">{topic.titleVi}</h3>
                  <p className="text-xs text-gray-600 mb-2">Sinh viên: {topic.students.join(", ")}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-gray-500">GVHD: {topic.supervisorScore}</span>
                      <span className="text-gray-500">GVPB: {topic.reviewerScore}</span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs h-6">
                      Xếp lịch
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm lịch bảo vệ, đề tài, sinh viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Defense Schedules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Lịch bảo vệ đã xếp</span>
          </CardTitle>
          <CardDescription>Danh sách các buổi bảo vệ và hội đồng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredSchedules.map((schedule) => (
              <div key={schedule.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Buổi bảo vệ {new Date(schedule.date).toLocaleDateString("vi-VN")}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Thời gian: {schedule.time}</span>
                      <span>•</span>
                      <span>Địa điểm: {schedule.room}</span>
                      <span>•</span>
                      <span>{schedule.topics.length} đề tài</span>
                    </div>
                  </div>
                  {getStatusBadge(schedule.status)}
                </div>

                {/* Council Members */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Hội đồng:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {schedule.council.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <div>
                          <p className="text-sm font-medium text-blue-800">{member.name}</p>
                          <p className="text-xs text-blue-600">{member.role}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-500 hover:bg-red-100">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="mt-2">
                        <Plus className="w-3 h-3 mr-1" />
                        Thêm thành viên
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Thêm thành viên hội đồng</DialogTitle>
                        <DialogDescription>Chọn giảng viên và vai trò trong hội đồng</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Giảng viên</TableHead>
                              <TableHead>Bộ môn</TableHead>
                              <TableHead>Trạng thái</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {councilMembers
                              .filter((member) => !schedule.council.some((c) => c.id === member.id))
                              .map((member) => (
                                <TableRow key={member.id}>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{member.name}</p>
                                      <p className="text-sm text-gray-500">{member.email}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>{member.department}</TableCell>
                                  <TableCell>
                                    <Badge variant={member.available ? "default" : "secondary"}>
                                      {member.available ? "Có thể" : "Bận"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Select
                                      onValueChange={(role) => handleAssignCouncil(schedule.id, member.id, role)}
                                      disabled={!member.available}
                                    >
                                      <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Vai trò" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Chủ tịch HĐ">Chủ tịch HĐ</SelectItem>
                                        <SelectItem value="Ủy viên">Ủy viên</SelectItem>
                                        <SelectItem value="Thư ký">Thư ký</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Topics */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Đề tài bảo vệ:</h4>
                  <div className="space-y-2">
                    {schedule.topics.map((topic) => (
                      <div key={topic.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800 text-sm">{topic.titleVi}</h5>
                          <p className="text-xs text-gray-600">
                            Sinh viên: {topic.students.join(", ")} | GVHD: {topic.supervisor}
                          </p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-100">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="mt-2">
                        <Plus className="w-3 h-3 mr-1" />
                        Thêm đề tài
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Thêm đề tài vào lịch bảo vệ</DialogTitle>
                        <DialogDescription>Chọn đề tài từ danh sách chờ xếp lịch</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        {pendingTopics.map((topic) => (
                          <div key={topic.id} className="flex items-center justify-between p-3 border rounded">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-800 text-sm">{topic.titleVi}</h5>
                              <p className="text-xs text-gray-600">Sinh viên: {topic.students.join(", ")}</p>
                            </div>
                            <Button size="sm" onClick={() => handleAddTopicToSchedule(schedule.id, topic.id)}>
                              Thêm
                            </Button>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
