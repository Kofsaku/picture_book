"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { User, Mail, Phone, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

const profileFormSchema = z.object({
  name: z.string().min(1, { message: "お名前を入力してください" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  phone: z.string().optional(),
})

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, { message: "現在のパスワードを入力してください" }),
    newPassword: z.string().min(6, { message: "パスワードは6文字以上で入力してください" }),
    confirmPassword: z.string().min(6, { message: "パスワードは6文字以上で入力してください" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "新しいパスワードが一致しません",
    path: ["confirmPassword"],
  })

export default function ProfilePage() {
  const [isProfileSaving, setIsProfileSaving] = useState(false)
  const [isPasswordSaving, setIsPasswordSaving] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "山田 花子",
      email: "user@example.com",
      phone: "090-1234-5678",
    },
  })

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsProfileSaving(true)
    setProfileSuccess(false)

    // Simulate API call delay
    setTimeout(() => {
      console.log(values)
      setIsProfileSaving(false)
      setProfileSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => setProfileSuccess(false), 3000)
    }, 1000)
  }

  function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    setIsPasswordSaving(true)
    setPasswordSuccess(false)

    // Simulate API call delay
    setTimeout(() => {
      console.log(values)
      setIsPasswordSaving(false)
      setPasswordSuccess(true)
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // Hide success message after 3 seconds
      setTimeout(() => setPasswordSuccess(false), 3000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">プロフィール設定</h1>
        <p className="text-gray-500">アカウント情報の確認と変更ができます</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-64 h-fit">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-pink-100 text-pink-600">YH</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">山田 花子</h2>
              <p className="text-gray-500 text-sm">user@example.com</p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                画像を変更
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">プロフィール情報</TabsTrigger>
              <TabsTrigger value="password">パスワード変更</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>プロフィール情報</CardTitle>
                  <CardDescription>アカウントの基本情報を変更できます</CardDescription>
                </CardHeader>
                <CardContent>
                  {profileSuccess && (
                    <Alert className="mb-6 bg-green-50 text-green-700 border-green-200">
                      <AlertDescription>プロフィール情報を更新しました</AlertDescription>
                    </Alert>
                  )}

                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>お名前</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                  size={18}
                                />
                                <Input className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>メールアドレス</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                  size={18}
                                />
                                <Input className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>電話番号（任意）</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                  size={18}
                                />
                                <Input className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={profileForm.handleSubmit(onProfileSubmit)}
                    className="bg-pink-500 hover:bg-pink-600"
                    disabled={isProfileSaving}
                  >
                    {isProfileSaving ? (
                      <>
                        <Save className="mr-2 h-4 w-4 animate-spin" />
                        保存中...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        変更を保存
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="password" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>パスワード変更</CardTitle>
                  <CardDescription>アカウントのパスワードを変更できます</CardDescription>
                </CardHeader>
                <CardContent>
                  {passwordSuccess && (
                    <Alert className="mb-6 bg-green-50 text-green-700 border-green-200">
                      <AlertDescription>パスワードを変更しました</AlertDescription>
                    </Alert>
                  )}

                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>現在のパスワード</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>新しいパスワード</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormDescription>パスワードは6文字以上で設定してください</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>新しいパスワード（確認）</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="bg-pink-500 hover:bg-pink-600"
                    disabled={isPasswordSaving}
                  >
                    {isPasswordSaving ? (
                      <>
                        <Save className="mr-2 h-4 w-4 animate-spin" />
                        保存中...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        パスワードを変更
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
