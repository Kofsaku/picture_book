"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Download, Share, Clock, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for the book
const mockBook = {
  id: 1,
  title: "太郎の恐竜大冒険",
  childName: "太郎",
  childAge: 5,
  childGender: "boy",
  interests: "恐竜、冒険",
  message: "いつも元気いっぱいの太郎へ。どんな冒険も楽しんでね。",
  createdAt: "2023-05-15",
  status: "completed",
  coverImage: "/dinosaur-children-book-cover.png",
  pages: [
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=400&query=dinosaur children book page 1",
      text: "むかしむかし、恐竜が住む世界に、太郎という男の子がいました。太郎は恐竜が大好きで、いつも恐竜の本を読んでいました。",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=300&width=400&query=dinosaur children book page 2",
      text: "ある日、太郎が寝ている間に、不思議なことが起こりました。太郎のベッドが光り始め、気がつくと太郎は恐竜の世界にいたのです。",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=300&width=400&query=dinosaur children book page 3",
      text: "そこには大きなティラノサウルスがいました。でも、このティラノサウルスは優しい目をしていて、太郎に「こんにちは」と話しかけてきました。",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=300&width=400&query=dinosaur children book page 4",
      text: "太郎とティラノサウルスは友達になり、一緒に恐竜の世界を冒険することになりました。山や川、森を越えて、たくさんの恐竜に会いました。",
    },
    {
      id: 5,
      image: "/placeholder.svg?height=300&width=400&query=dinosaur children book page 5",
      text: "冒険の終わりに、太郎は恐竜たちに「また会いに来るね」と約束しました。目を覚ますと、太郎は自分のベッドにいました。",
    },
    {
      id: 6,
      image: "/placeholder.svg?height=300&width=400&query=dinosaur children book page 6",
      text: "それからも太郎は、夢の中で恐竜の友達と冒険を続けました。太郎の恐竜大冒険は、これからもずっと続いていくのです。",
    },
  ],
}

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

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(0)

  // In a real app, we would fetch the book data based on the ID
  const book = mockBook

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="sm" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-gray-500">
              {book.childName}のための絵本 • {book.createdAt}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusLabels[book.status].bgColor
            } ${statusLabels[book.status].color}`}
          >
            {statusLabels[book.status].icon}
            {statusLabels[book.status].label}
          </span>
          {book.status === "completed" && (
            <>
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                共有
              </Button>
              <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                <Download className="mr-2 h-4 w-4" />
                PDFをダウンロード
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="preview">
        <TabsList className="mb-6">
          <TabsTrigger value="preview">プレビュー</TabsTrigger>
          <TabsTrigger value="details">詳細情報</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-0">
          {book.status === "completed" ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-gray-100 p-4 rounded-lg inline-flex">
                  <div className="flex items-center gap-2">
                    {[0, ...book.pages.map((_, i) => i + 1)].map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentPage === pageNum
                            ? "bg-pink-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                {currentPage === 0 ? (
                  // Cover
                  <div className="max-w-md">
                    <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={
                          book.coverImage || "/placeholder.svg?height=400&width=300&query=dinosaur children book cover"
                        }
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex flex-col justify-end p-6">
                        <h2 className="text-white text-2xl font-bold">{book.title}</h2>
                        <p className="text-white/80">{book.childName}のための絵本</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Book pages
                  <div className="max-w-4xl w-full">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 aspect-video md:aspect-auto relative">
                          <Image
                            src={
                              book.pages[currentPage - 1].image ||
                              "/placeholder.svg?height=400&width=600&query=children book page illustration"
                            }
                            alt={`ページ ${currentPage}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="w-full md:w-1/2 p-6 flex items-center">
                          <p className="text-lg leading-relaxed">{book.pages[currentPage - 1].text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                >
                  前のページ
                </Button>
                <Button
                  onClick={() => setCurrentPage(Math.min(book.pages.length, currentPage + 1))}
                  disabled={currentPage === book.pages.length}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  次のページ
                </Button>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <Clock className="h-16 w-16 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">絵本を作成中です</h3>
                <p className="text-gray-600 mb-6">
                  AIと作家があなたのお子様のための特別な絵本を作成しています。
                  <br />
                  完成までしばらくお待ちください。
                </p>
                <div className="w-full max-w-md space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>作成中...</span>
                    <span>66%</span>
                  </div>
                  <Progress value={66} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="details" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">絵本情報</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">タイトル</dt>
                      <dd className="mt-1">{book.title}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">作成日</dt>
                      <dd className="mt-1">{book.createdAt}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">ステータス</dt>
                      <dd className="mt-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusLabels[book.status].bgColor
                          } ${statusLabels[book.status].color}`}
                        >
                          {statusLabels[book.status].icon}
                          {statusLabels[book.status].label}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">ページ数</dt>
                      <dd className="mt-1">{book.pages.length}ページ</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">お子様情報</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">お名前</dt>
                      <dd className="mt-1">{book.childName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">年齢</dt>
                      <dd className="mt-1">{book.childAge}歳</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">性別</dt>
                      <dd className="mt-1">{book.childGender === "boy" ? "男の子" : "女の子"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">興味・好きなもの</dt>
                      <dd className="mt-1">{book.interests}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">伝えたいメッセージ</dt>
                      <dd className="mt-1">{book.message}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
