"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const loginFormSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
  password: z.string().min(6, {
    message: "パスワードは6文字以上で入力してください。",
  }),
})

const registerFormSchema = z
  .object({
    name: z.string().min(1, {
      message: "お名前を入力してください。",
    }),
    email: z.string().email({
      message: "有効なメールアドレスを入力してください。",
    }),
    password: z.string().min(6, {
      message: "パスワードは6文字以上で入力してください。",
    }),
    confirmPassword: z.string().min(6, {
      message: "パスワードは6文字以上で入力してください。",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません。",
    path: ["confirmPassword"],
  })

export default function UserLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("login")

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onLoginSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true)
    setError("")

    // For demo purposes, we'll just check for a hardcoded user credential
    if (values.email === "user@example.com" && values.password === "password") {
      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false)
        router.push("/user/dashboard")
      }, 1000)
    } else {
      setTimeout(() => {
        setIsLoading(false)
        setError("メールアドレスまたはパスワードが正しくありません。")
      }, 1000)
    }
  }

  function onRegisterSubmit(values: z.infer<typeof registerFormSchema>) {
    setIsLoading(true)
    setError("")

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, we would register the user here
      // For demo purposes, we'll just redirect to the login tab
      setActiveTab("login")
      alert("登録が完了しました。ログインしてください。")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-pink-600">
        <ArrowLeft className="mr-2" size={20} />
        トップページに戻る
      </Link>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            {/* Replace with a more reliable image implementation */}
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-pink-600">絵</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">うちのこえほん</h1>
          <p className="text-gray-600 mt-2">ログインして絵本を作成・管理</p>
        </div>

        <Card>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 px-6 pt-6">
              <TabsTrigger value="login">ログイン</TabsTrigger>
              <TabsTrigger value="register">新規登録</TabsTrigger>
            </TabsList>

            <CardContent className="p-6">
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>メールアドレス</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>パスワード</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "ログイン中..." : "ログイン"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>お名前</FormLabel>
                          <FormControl>
                            <Input placeholder="山田 花子" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>メールアドレス</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>パスワード</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>パスワード（確認）</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "登録中..." : "アカウント作成"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </CardContent>
          </Tabs>

          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">デモ用: メール: user@example.com / パスワード: password</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
