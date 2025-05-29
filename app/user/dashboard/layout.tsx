"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, BookOpen, PlusCircle, User, Settings, LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // In a real app, we would check if the user is authenticated
    // For demo purposes, we'll just assume they are
  }, [])

  if (!isMounted) {
    return null
  }

  const handleLogout = () => {
    // In a real app, we would handle logout logic here
    router.push("/user/login")
  }

  const navigation = [
    { name: "ダッシュボード", href: "/user/dashboard", icon: LayoutDashboard },
    { name: "マイ絵本", href: "/user/dashboard/books", icon: BookOpen },
    { name: "新しい絵本を作る", href: "/user/dashboard/create", icon: PlusCircle },
    { name: "プロフィール", href: "/user/dashboard/profile", icon: User },
    { name: "設定", href: "/user/dashboard/settings", icon: Settings },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Dashboard Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/user/dashboard" className="flex items-center">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-sm font-bold text-pink-600">絵</span>
              </div>
              <span className="font-bold text-lg text-pink-600 hidden sm:inline">うちのこえほん</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">メニューを開く</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-sm font-bold text-pink-600">絵</span>
                  </div>
                  <span className="font-bold text-lg text-pink-600">うちのこえほん</span>
                </div>
                <nav className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center p-3 rounded-lg transition-colors ${
                        isActive(item.href) ? "bg-pink-50 text-pink-600" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mt-4"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span>ログアウト</span>
                  </button>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-pink-600 transition-colors"
              >
                <LogOut size={18} className="mr-1" />
                <span>ログアウト</span>
              </Button>
              <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-medium">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop only */}
        <aside className="w-64 bg-white shadow-sm h-[calc(100vh-64px)] fixed left-0 top-16 hidden md:block">
          <nav className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActive(item.href) ? "bg-pink-50 text-pink-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon size={20} className="mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:ml-64 flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
