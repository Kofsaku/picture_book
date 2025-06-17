"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MessageCircle, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// ページデータの型定義
interface PageData {
  id: number
  title: string
  content?: React.ReactNode
  image?: string
  type: "cover" | "table-of-contents" | "story" | "ending"
}

// ページデータ配列
const pages: PageData[] = [
  {
    id: 0,
    title: "表紙",
    type: "cover",
    image: "/mori_top.png",
  },
  {
    id: 1,
    title: "目次",
    type: "table-of-contents",
    image: "/mori_top.png",
  },
  {
    id: 2,
    title: "たろうくんの ゆめ",
    type: "story",
    image: "/page2.png",
  },
  {
    id: 3,
    title: "もりの なかまたち",
    type: "story",
    image: "/page2.png",
  },
  {
    id: 4,
    title: "そらへの おくりもの",
    type: "story",
    image: "/mori_top.png",
  },
  {
    id: 5,
    title: "みんなで うたおう",
    type: "story",
    image: "/mori_top.png",
  },
  {
    id: 6,
    title: "おしまい",
    type: "ending",
    image: "/mori_top.png",
  },
]

export default function InteractiveEbookDemo() {
  const [currentSpread, setCurrentSpread] = useState(0) // 見開きの左ページindex
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next")

  const handleNextPage = () => {
    if (isFlipping || currentSpread >= pages.length - 2) return
    setFlipDirection("next")
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentSpread((prev) => prev + 2)
      setIsFlipping(false)
    }, 1200)
  }

  const handlePrevPage = () => {
    if (isFlipping || currentSpread <= 0) return
    setFlipDirection("prev")
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentSpread((prev) => prev - 2)
      setIsFlipping(false)
    }, 1200)
  }

  const leftPage = pages[currentSpread]
  const rightPage = pages[currentSpread + 1]

  return (
    <div className="relative w-full h-[600px] bg-amber-50 rounded-lg shadow-lg overflow-hidden">
      <div className="book-container">
        <div className="page left-page bg-cover bg-no-repeat" style={{
          backgroundImage: `url(${leftPage?.image})`,
          backgroundSize: "200% 100%",
          backgroundPosition: "left center"
        }}>
        </div>
        <div className={`page right-page ${isFlipping ? `flipping-${flipDirection}` : ""} bg-cover bg-no-repeat`} style={{
          backgroundImage: `url(${rightPage?.image})`,
          backgroundSize: "200% 100%",
          backgroundPosition: "right center"
        }}>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevPage}
          disabled={currentSpread === 0 || isFlipping}
          className="bg-white/80 hover:bg-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextPage}
          disabled={currentSpread >= pages.length - 2 || isFlipping}
          className="bg-white/80 hover:bg-white"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
} 