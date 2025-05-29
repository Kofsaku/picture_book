"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Clock, CheckCircle, AlertCircle, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Mock data for the dashboard
const mockBooks = [
  {
    id: 1,
    title: "太郎の恐竜大冒険",
    childName: "太郎",
    createdAt: "2023-05-15",
    status: "completed",
    coverImage: "/dinosaur-children-book-cover.png",
  },
  {
    id: 2,
    title: "さくらとピアノの国",
    childName: "さくら",
    createdAt: "2023-05-18",
    status: "processing",
    coverImage: "/piano-children-book-cover.png",
  },
]

const statusLabels: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  completed: {
    label: "完成",
    color: "text-green-600",
    icon: <CheckCircle size={16} className="mr-1" />,
  },
  processing: {
    label: "作成中",
    color: "text-blue-600",
    icon: <Clock size={16} className="mr-1" />,
  },
  error: {
    label: "エラー",
    color: "text-red-600",
    icon: <AlertCircle size={16} className="mr-1" />,
  },
}

export default function UserDashboard() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">ようこそ、山田さん</h1>
          <p className="text-gray-500">あなたの絵本作成状況を確認できます</p>
        </div>
        <Link href="/user/dashboard/create">
          <Button className="bg-pink-500 hover:bg-pink-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            新しい絵本を作る
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">作成した絵本</p>
                <h3 className="text-2xl font-bold mt-1">2</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">完成した絵本</p>
                <h3 className="text-2xl font-bold mt-1">1</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">作成中の絵本</p>
                <h3 className="text-2xl font-bold mt-1">1</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Books */}
      <div>
        <h2 className="text-xl font-semibold mb-4">最近の絵本</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-1/3 bg-gray-100 flex items-center justify-center p-4">
                  <Image
                    src={book.coverImage || "/placeholder.svg?height=200&width=150&query=children book cover"}
                    alt={book.title}
                    width={150}
                    height={200}
                    className="rounded-md shadow-sm"
                  />
                </div>
                <div className="w-2/3 p-6">
                  <CardHeader className="p-0 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <div className={`flex items-center text-xs font-medium ${statusLabels[book.status].color}`}>
                        {statusLabels[book.status].icon}
                        {statusLabels[book.status].label}
                      </div>
                    </div>
                    <CardDescription>
                      {book.childName}のための絵本 • {book.createdAt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 py-4">
                    {book.status === "processing" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>作成中...</span>
                          <span>66%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-0 pt-2">
                    <div className="flex gap-2">
                      <Link href={`/user/dashboard/books/${book.id}`}>
                        <Button variant="outline" size="sm">
                          詳細を見る
                        </Button>
                      </Link>
                      {book.status === "completed" && (
                        <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                          PDFをダウンロード
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Create New Book Card */}
      <Card className="bg-gradient-to-r from-pink-50 to-blue-50 border-dashed">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white p-4 rounded-full">
              <PlusCircle className="h-12 w-12 text-pink-500" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">新しい絵本を作りませんか？</h3>
              <p className="text-gray-600 mb-4">
                お子さまの名前、年齢、好きなものを教えていただくだけで、AIがオリジナルの絵本を作成します。
              </p>
              <Link href="/user/dashboard/create">
                <Button className="bg-pink-500 hover:bg-pink-600">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  新しい絵本を作る
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
