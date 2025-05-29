"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, Users, BookOpen, Settings, LogOut } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

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
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/colorful-children-book-logo.png"
              alt="うちのこえほん"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="font-bold text-lg text-pink-600">うちのこえほん 管理画面</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-pink-600 transition-colors"
          >
            <LogOut size={18} className="mr-1" />
            <span>ログアウト</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-[calc(100vh-64px)] fixed">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center p-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                >
                  <LayoutDashboard size={20} className="mr-3" />
                  <span>ダッシュボード</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center p-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                >
                  <Users size={20} className="mr-3" />
                  <span>ユーザー管理</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/books"
                  className="flex items-center p-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                >
                  <BookOpen size={20} className="mr-3" />
                  <span>絵本管理</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className="flex items-center p-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 rounded-lg transition-colors"
                >
                  <Settings size={20} className="mr-3" />
                  <span>設定</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
