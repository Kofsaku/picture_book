"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-2">
            <span className="text-sm font-bold text-pink-600">絵</span>
          </div>
          <span className="font-bold text-lg text-pink-600">うちのこえほん</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("features")}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            特徴
          </button>
          <button
            onClick={() => scrollToSection("education")}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            教育効果
          </button>
          <button
            onClick={() => scrollToSection("future")}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            将来機能
          </button>
          {/* <button
            onClick={() => scrollToSection("samples")}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            サンプル
          </button> */}
          <button
            onClick={() => scrollToSection("faq")}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            よくある質問
          </button>
          <div className="flex items-center gap-2">
            <Link href="/user/login">
              <Button variant="outline" className="ml-4">
                ログイン
              </Button>
            </Link>
            <Link href="/user/dashboard">
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 hover:text-pink-600 transition-colors py-2"
            >
              特徴
            </button>
            <button
              onClick={() => scrollToSection("education")}
              className="text-gray-700 hover:text-pink-600 transition-colors py-2"
            >
              教育効果
            </button>
            <button
              onClick={() => scrollToSection("future")}
              className="text-gray-700 hover:text-pink-600 transition-colors py-2"
            >
              将来機能
            </button>
            <button
              onClick={() => scrollToSection("samples")}
              className="text-gray-700 hover:text-pink-600 transition-colors py-2"
            >
              サンプル
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-700 hover:text-pink-600 transition-colors py-2"
            >
              よくある質問
            </button>
            <div className="flex gap-2 pt-2">
              <Link href="/user/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  ログイン
                </Button>
              </Link>
              <Link href="/user/dashboard" className="flex-1">
                <Button className="w-full bg-pink-500 hover:bg-pink-600">マイページ</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
