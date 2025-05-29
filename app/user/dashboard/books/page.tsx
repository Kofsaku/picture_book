"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Clock, CheckCircle, AlertCircle, Download, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for the books
const mockBooks = [
  {
    id: 1,
    title: "太郎の恐竜大冒険",
    childName: "太郎",
    childAge: 5,
    interests: "恐竜、冒険",
    createdAt: "2023-05-15",
    status: "completed",
    coverImage: "/dinosaur-children-book-cover.png",
  },
  {
    id: 2,
    title: "さくらとピアノの国",
    childName: "さくら",
    childAge: 6,
    interests: "ピアノ、音楽",
    createdAt: "2023-05-18",
    status: "processing",
    coverImage: "/piano-children-book-cover.png",
  },
  {
    id: 3,
    title: "健太とサッカーボール",
    childName: "健太",
    childAge: 7,
    interests: "サッカー、スポーツ",
    createdAt: "2023-05-20",
    status: "completed",
    coverImage: "/placeholder.svg?height=200&width=150&query=soccer children book cover",
  },
]

const statusLabels: Record<string, { label: string; color: string; icon: React.ReactNode; bgColor: string }> = {
  completed: {
    label: "完成",
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: <CheckCircle size={16} className="mr-1" />,
  },
  processing: {
    label: "作成中",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    icon: <Clock size={16} className="mr-1" />,
  },
  error: {
    label: "エラー",
    color: "text-red-600",
    bgColor: "bg-red-100",
    icon: <AlertCircle size={16} className="mr-1" />,
  },
}

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.childName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || book.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">マイ絵本</h1>
          <p className="text-gray-500">作成した絵本の一覧と状況を確認できます</p>
        </div>
        <Link href="/user/dashboard/create">
          <Button className="bg-pink-500 hover:bg-pink-600">
            <BookOpen className="mr-2 h-4 w-4" />
            新しい絵本を作る
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="grid">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="grid">グリッド表示</TabsTrigger>
            <TabsTrigger value="list">リスト表示</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="絵本を検索..."
                className="pl-10 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="completed">完成</SelectItem>
                <SelectItem value="processing">作成中</SelectItem>
                <SelectItem value="error">エラー</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={book.coverImage || "/placeholder.svg?height=300&width=200&query=children book cover"}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusLabels[book.status].bgColor
                      } ${statusLabels[book.status].color}`}
                    >
                      {statusLabels[book.status].icon}
                      {statusLabels[book.status].label}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {book.childName}のための絵本 • {book.createdAt}
                  </p>
                  {book.status === "processing" && (
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span>作成中...</span>
                        <span>66%</span>
                      </div>
                      <Progress value={66} className="h-2" />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Link href={`/user/dashboard/books/${book.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        詳細を見る
                      </Button>
                    </Link>
                    {book.status === "completed" && (
                      <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>タイトル</TableHead>
                  <TableHead>子どもの名前</TableHead>
                  <TableHead>年齢</TableHead>
                  <TableHead>作成日</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>アクション</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.childName}</TableCell>
                    <TableCell>{book.childAge}歳</TableCell>
                    <TableCell>{book.createdAt}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusLabels[book.status].bgColor
                        } ${statusLabels[book.status].color}`}
                      >
                        {statusLabels[book.status].icon}
                        {statusLabels[book.status].label}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link href={`/user/dashboard/books/${book.id}`}>
                          <Button variant="outline" size="sm">
                            詳細
                          </Button>
                        </Link>
                        {book.status === "completed" && (
                          <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
