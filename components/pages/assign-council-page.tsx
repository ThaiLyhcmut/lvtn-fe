"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Users, Calendar, CheckCircle } from "lucide-react"

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
                  type="date"\
