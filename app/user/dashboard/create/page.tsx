"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const bookFormSchema = z.object({
  childName: z.string().min(1, { message: "お子様のお名前を入力してください" }),
  childNameKana: z.string().min(1, { message: "ふりがなを入力してください" }),
  childAge: z.string().min(1, { message: "年齢を選択してください" }),
  childGender: z.string().optional(),
  childInterests: z.string().min(1, { message: "興味・好きなものを入力してください" }),
  messageToChild: z.string().optional(),
  bookTheme: z.string().min(1, { message: "テーマを選択してください" }),
})

export default function CreateBookPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      childName: "",
      childNameKana: "",
      childAge: "",
      childGender: "",
      childInterests: "",
      messageToChild: "",
      bookTheme: "",
    },
  })

  function onSubmit(values: z.infer<typeof bookFormSchema>) {
    setIsSubmitting(true)
    console.log(values)

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false)
      // In a real app, we would create the book here
      router.push("/user/dashboard/books")
    }, 2000)
  }

  const bookThemes = [
    {
      id: "adventure",
      title: "冒険",
      description: "主人公が未知の世界で冒険をする物語",
      image: "/adventure-children-book.png",
    },
    {
      id: "fantasy",
      title: "ファンタジー",
      description: "魔法や不思議な生き物が登場する物語",
      image: "/placeholder.svg?height=120&width=120&query=fantasy children book illustration",
    },
    {
      id: "animals",
      title: "動物",
      description: "様々な動物たちとの触れ合いを描いた物語",
      image: "/placeholder.svg?height=120&width=120&query=animals children book illustration",
    },
    {
      id: "friendship",
      title: "友情",
      description: "友達との絆を育む心温まる物語",
      image: "/placeholder.svg?height=120&width=120&query=friendship children book illustration",
    },
  ]

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">新しい絵本を作る</h1>
          <p className="text-gray-500">お子様の情報を入力して、オリジナルの絵本を作成しましょう</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="basic">基本情報</TabsTrigger>
              <TabsTrigger value="theme">テーマ選択</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <TabsContent value="basic" className="mt-0">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="childName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              お子様のお名前 <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="山田 太郎" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="childNameKana"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              ふりがな <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="やまだ たろう" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="childAge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              年齢 <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="選択してください" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {/* Changed the empty value to "placeholder" */}
                                <SelectItem value="placeholder" disabled>
                                  お子様の年齢を選択してください
                                </SelectItem>
                                <SelectItem value="0">0歳</SelectItem>
                                <SelectItem value="1">1歳</SelectItem>
                                <SelectItem value="2">2歳</SelectItem>
                                <SelectItem value="3">3歳</SelectItem>
                                <SelectItem value="4">4歳</SelectItem>
                                <SelectItem value="5">5歳</SelectItem>
                                <SelectItem value="6">6歳</SelectItem>
                                <SelectItem value="7">7歳</SelectItem>
                                <SelectItem value="8">8歳</SelectItem>
                                <SelectItem value="9">9歳</SelectItem>
                                <SelectItem value="10">10歳以上</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="childGender"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>性別（任意）</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-6"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="boy" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">男の子</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="girl" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">女の子</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="childInterests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            お子様の興味・好きなもの <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormDescription>例：恐竜、電車、プリンセス、動物、スポーツなど</FormDescription>
                          <FormControl>
                            <Textarea
                              placeholder="例：恐竜、電車、プリンセス、動物、スポーツ、宇宙、楽器、お絵かき、ヒーロー、など"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="messageToChild"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>お子様に伝えたいこと（任意）</FormLabel>
                          <FormDescription>絵本のストーリーに込めたいメッセージがあれば教えてください</FormDescription>
                          <FormControl>
                            <Textarea
                              placeholder="例：いつも笑顔でいてほしい、チャレンジする気持ちを大切にしてほしい、など"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => setActiveTab("theme")}
                        className="bg-pink-500 hover:bg-pink-600"
                      >
                        次へ
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="theme" className="mt-0">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="bookTheme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            絵本のテーマを選択 <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormDescription>お子様に合ったテーマを選んでください</FormDescription>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {bookThemes.map((theme) => (
                              <div
                                key={theme.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                  field.value === theme.id
                                    ? "border-pink-500 bg-pink-50 ring-2 ring-pink-500 ring-opacity-50"
                                    : "hover:border-gray-300"
                                }`}
                                onClick={() => form.setValue("bookTheme", theme.id)}
                              >
                                <div className="flex items-center gap-4">
                                  <Image
                                    src={theme.image || "/placeholder.svg"}
                                    alt={theme.title}
                                    width={80}
                                    height={80}
                                    className="rounded-md"
                                  />
                                  <div>
                                    <h3 className="font-semibold">{theme.title}</h3>
                                    <p className="text-sm text-gray-500">{theme.description}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                        戻る
                      </Button>
                      <Button type="submit" className="bg-pink-500 hover:bg-pink-600" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                            作成中...
                          </>
                        ) : (
                          <>
                            <BookOpen className="mr-2 h-4 w-4" />
                            絵本を作成する
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
