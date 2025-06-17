"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth, type UserRole } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { GraduationCap, BookOpen, Users, FileText } from "lucide-react"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<UserRole | "">("")
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = () => {
    if (!email || !role) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin",
        variant: "destructive",
      })
      return
    }

    login(email, role as UserRole)

    // Check if login successful
    setTimeout(() => {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn đến với hệ thống quản lý luận văn",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: "Email hoặc vai trò không đúng",
          variant: "destructive",
        })
      }
    }, 100)
  }

  const demoAccounts = [
    { email: "student@hcmut.edu.vn", role: "student", name: "Sinh viên" },
    { email: "supervisor@hcmut.edu.vn", role: "supervisor", name: "Giảng viên hướng dẫn" },
    { email: "department@hcmut.edu.vn", role: "department_lecturer", name: "Giảng viên bộ môn" },
    { email: "reviewer@hcmut.edu.vn", role: "reviewer", name: "Giảng viên phản biện" },
    { email: "council@hcmut.edu.vn", role: "council", name: "Hội đồng" },
    { email: "office@hcmut.edu.vn", role: "academic_office", name: "Giáo vụ" },
  ]

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-white space-y-8 animate-fade-in-up">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Đại học Bách Khoa TP.HCM</h1>
              <p className="text-blue-100">Ho Chi Minh City University of Technology</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Hệ thống quản lý
              <br />
              <span className="text-yellow-300">Luận văn tốt nghiệp</span>
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <BookOpen className="w-6 h-6 text-yellow-300" />
                <span className="text-sm">Quản lý đề tài</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <Users className="w-6 h-6 text-yellow-300" />
                <span className="text-sm">Phân công hội đồng</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <FileText className="w-6 h-6 text-yellow-300" />
                <span className="text-sm">Nộp luận văn</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <GraduationCap className="w-6 h-6 text-yellow-300" />
                <span className="text-sm">Chấm điểm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="animate-slide-in-right">
          <Card className="w-full max-w-md mx-auto shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-800">Đăng nhập hệ thống</CardTitle>
              <CardDescription>Chọn tài khoản demo để trải nghiệm hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Vai trò</Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò của bạn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Sinh viên</SelectItem>
                    <SelectItem value="supervisor">Giảng viên hướng dẫn</SelectItem>
                    <SelectItem value="department_lecturer">Giảng viên bộ môn</SelectItem>
                    <SelectItem value="reviewer">Giảng viên phản biện</SelectItem>
                    <SelectItem value="council">Hội đồng</SelectItem>
                    <SelectItem value="academic_office">Giáo vụ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
                Đăng nhập
              </Button>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-3 font-medium">Tài khoản demo:</p>
                <div className="grid gap-2 text-xs">
                  {demoAccounts.map((account) => (
                    <div
                      key={account.email}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setEmail(account.email)
                        setRole(account.role as UserRole)
                      }}
                    >
                      <span className="font-medium">{account.name}</span>
                      <span className="text-gray-500">{account.email}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
