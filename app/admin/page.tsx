"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  BookOpen,
  Mail,
  Users,
  RefreshCw,
  Search,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

// Mock data for the dashboard
const mockUsers = [
  {
    id: 1,
    parentName: "佐藤 花子",
    email: "hanako@example.com",
    childName: "佐藤 太郎",
    childAge: 5,
    interests: "恐竜、電車、宇宙",
    createdAt: "2023-05-15",
    status: "completed",
  },
  {
    id: 2,
    parentName: "田中 美咲",
    email: "misaki@example.com",
    childName: "田中 健太",
    childAge: 4,
    interests: "動物、サッカー、虫",
    createdAt: "2023-05-16",
    status: "processing",
  },
  {
    id: 3,
    parentName: "鈴木 裕子",
    email: "yuko@example.com",
    childName: "鈴木 さくら",
    childAge: 6,
    interests: "プリンセス、お絵かき、ピアノ",
    createdAt: "2023-05-17",
    status: "pending",
  },
  {
    id: 4,
    parentName: "高橋 直樹",
    email: "naoki@example.com",
    childName: "高橋 大輔",
    childAge: 7,
    interests: "野球、ゲーム、科学実験",
    createdAt: "2023-05-18",
    status: "completed",
  },
  {
    id: 5,
    parentName: "渡辺 真理",
    email: "mari@example.com",
    childName: "渡辺 結衣",
    childAge: 3,
    interests: "音楽、ダンス、お料理",
    createdAt: "2023-05-19",
    status: "error",
  },
]

const statusLabels: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  completed: {
    label: "完了",
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle size={16} className="mr-1 text-green-600" />,
  },
  processing: {
    label: "生成中",
    color: "bg-blue-100 text-blue-800",
    icon: <RefreshCw size={16} className="mr-1 text-blue-600" />,
  },
  pending: {
    label: "未着手",
    color: "bg-yellow-100 text-yellow-800",
    icon: <Clock size={16} className="mr-1 text-yellow-600" />,
  },
  error: {
    label: "エラー",
    color: "bg-red-100 text-red-800",
    icon: <AlertCircle size={16} className="mr-1 text-red-600" />,
  },
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isResendModalOpen, setIsResendModalOpen] = useState(false)

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.childName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleResend = (user: any) => {
    setSelectedUser(user)
    setIsResendModalOpen(true)
  }

  const confirmResend = () => {
    // In a real app, we would handle the resend logic here
    alert(`${selectedUser.childName}の絵本を${selectedUser.email}に再送信しました。`)
    setIsResendModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ダッシュボード</h1>
        <p className="text-gray-500">最終更新: 2023年5月20日 15:30</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">総ユーザー数</p>
                <h3 className="text-2xl font-bold mt-1">42</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">作成済み絵本</p>
                <h3 className="text-2xl font-bold mt-1">28</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">処理待ち</p>
                <h3 className="text-2xl font-bold mt-1">8</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">送信完了率</p>
                <h3 className="text-2xl font-bold mt-1">67%</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="users">
        <TabsList className="mb-4">
          <TabsTrigger value="users">ユーザー一覧</TabsTrigger>
          <TabsTrigger value="analytics">分析</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>ユーザー管理</CardTitle>
              <CardDescription>登録ユーザーと絵本生成状況の管理</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="名前、メールで検索..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                      <SelectItem value="processing">生成中</SelectItem>
                      <SelectItem value="pending">未着手</SelectItem>
                      <SelectItem value="error">エラー</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>子どもの名前</TableHead>
                      <TableHead>年齢</TableHead>
                      <TableHead>保護者</TableHead>
                      <TableHead>メール</TableHead>
                      <TableHead>登録日</TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell className="font-medium">{user.childName}</TableCell>
                        <TableCell>{user.childAge}歳</TableCell>
                        <TableCell>{user.parentName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.createdAt}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusLabels[user.status].color
                            }`}
                          >
                            {statusLabels[user.status].icon}
                            {statusLabels[user.status].label}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleResend(user)}
                              disabled={user.status !== "completed"}
                            >
                              <Mail size={16} className="mr-1" />
                              再送信
                            </Button>
                            {user.status === "completed" && (
                              <Button variant="outline" size="sm">
                                <Download size={16} className="mr-1" />
                                PDF
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>分析データ</CardTitle>
              <CardDescription>絵本生成と利用状況の分析</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-80">
              <div className="text-center">
                <BarChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium">分析データ準備中</h3>
                <p className="text-gray-500 mt-2">現在MVPフェーズのため、詳細な分析機能は今後追加予定です。</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resend Modal */}
      {isResendModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">絵本を再送信</h3>
            <p className="mb-4">{selectedUser.childName}の絵本を以下のメールアドレスに再送信します：</p>
            <div className="mb-4">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" defaultValue={selectedUser.email} className="mt-1" />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsResendModalOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={confirmResend}>送信する</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
