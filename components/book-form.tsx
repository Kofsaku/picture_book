"use client"

import Link from "next/link"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  childName: z.string().min(1, { message: "お子様のお名前を入力してください" }),
  childNameKana: z.string().min(1, { message: "ふりがなを入力してください" }),
  childAge: z.string().min(1, { message: "年齢を選択してください" }),
  childGender: z.string().optional(),
  childInterests: z.string().min(1, { message: "興味・好きなものを入力してください" }),
  messageToChild: z.string().min(1, { message: "伝えたいことを入力してください" }),
  parentName: z.string().min(1, { message: "保護者様のお名前を入力してください" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  termsAgreed: z.literal(true, {
    errorMap: () => ({ message: "利用規約に同意してください" }),
  }),
})

export default function BookForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childName: "",
      childNameKana: "",
      childAge: "",
      childGender: "",
      childInterests: "",
      messageToChild: "",
      parentName: "",
      email: "",
      termsAgreed: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-4">お申し込みありがとうございます！</h3>
        <p className="text-gray-600 mb-6">
          ご入力いただいたメールアドレスに確認メールをお送りしました。
          <br />
          数日以内に、オリジナル絵本をPDFでお届けします。
        </p>
        <p className="text-sm text-gray-500">
          ※メールが届かない場合は、迷惑メールフォルダをご確認いただくか、お問い合わせください。
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">お子様の情報</h3>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
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

          <div className="mt-6">
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
          </div>

          <div className="mt-6">
            <FormField
              control={form.control}
              name="messageToChild"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    お子様に伝えたいこと <span className="text-red-500">*</span>
                  </FormLabel>
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
          </div>
        </div>

        <div className="p-6 bg-pink-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">保護者様の情報</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="parentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    保護者様のお名前 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormDescription>ニックネーム可</FormDescription>
                  <FormControl>
                    <Input placeholder="山田 花子" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    メールアドレス <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormDescription>絵本のお届け先となります</FormDescription>
                  <FormControl>
                    <Input type="email" placeholder="example@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="termsAgreed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm">
                  <span className="text-red-500">*</span> 利用規約・プライバシーポリシーに同意します
                </FormLabel>
                <FormDescription>
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    利用規約
                  </Link>
                  と
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    プライバシーポリシー
                  </Link>
                  をご確認ください
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-center">
          <Button
            type="submit"
            size="lg"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6 text-lg"
          >
            この情報で絵本を作ってもらう
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            ※現在は初期無料モニター期間中のため、制作にお時間をいただく場合があります。
            <br />
            ※内容を元にAIと作家が最適な絵本を制作します。
          </p>
        </div>
      </form>
    </Form>
  )
}
