"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight, MessageCircle, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// ページデータの型定義
interface PageData {
  id: number
  title: string
  content: React.ReactNode
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
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">くまのたろうくん</h1>
        <p className="text-lg text-amber-700">〜 もりの おんがく 〜</p>
      </div>
    ),
  },
  {
    id: 1,
    title: "目次",
    type: "table-of-contents",
    image: "/mori_top.png",
    content: (
      <div className="flex flex-col justify-center h-full">
        <h2 className="text-2xl text-amber-800 mb-6 text-center font-bold">もくじ</h2>
        <ul className="space-y-4 text-amber-800 text-lg">
          <li className="flex items-center">
            <span className="text-2xl mr-3">🎻</span>
            <span>1. たろうくんの ゆめ</span>
          </li>
          <li className="flex items-center">
            <span className="text-2xl mr-3">🐰</span>
            <span>2. もりの なかまたち</span>
          </li>
          <li className="flex items-center">
            <span className="text-2xl mr-3">🌟</span>
            <span>3. そらへの おくりもの</span>
          </li>
          <li className="flex items-center">
            <span className="text-2xl mr-3">🎵</span>
            <span>4. みんなで うたおう</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    title: "たろうくんの ゆめ",
    type: "story",
    image: "/page2.png",
    content: (
      <div className="story-text-overlay">
        <p>
          くまの たろうくん は、もりの なかで バイオリンを ひいていました。
          <br />
          <br />
          「ぼくの おとが、そらまで とどきますように」
          <br />
          <br />
          そんな ねがいを こめて、きょうも いっしょうけんめい ひいています。
        </p>
      </div>
    ),
  },
  {
    id: 3,
    title: "もりの なかまたち",
    type: "story",
    image: "/page2.png",
    content: (
      <div className="story-text-overlay">
        <p>
          たろうくんの きれいな おとを きいて、もりの どうぶつたちが あつまってきました。
          <br />
          <br />
          「すてきな おんがくですね！」
          <br />
          <br />
          うさぎさんも、りすさんも、ことりさんも、みんな うっとり きいています。
        </p>
      </div>
    ),
  },
  {
    id: 4,
    title: "そらへの おくりもの",
    type: "story",
    image: "/mori_top.png",
    content: (
      <div className="story-text-overlay">
        <p>
          ゆうやけの そらに、たろうくんの おんがくが ひびきました。
          <br />
          <br />
          おとが おんぷに なって、そらたかく まいあがります。
          <br />
          <br />
          「きっと そらの むこうまで とどいたね」
        </p>
      </div>
    ),
  },
  {
    id: 5,
    title: "みんなで うたおう",
    type: "story",
    image: "/mori_top.png",
    content: (
      <div className="story-text-overlay">
        <p>
          「みんなで いっしょに うたいましょう！」
          <br />
          <br />
          たろうくんが いうと、どうぶつたちも おおよろこび。
          <br />
          <br />
          もりじゅうに、たのしい うたごえが ひびきました。
        </p>
      </div>
    ),
  },
  {
    id: 6,
    title: "おしまい",
    type: "ending",
    image: "/mori_top.png",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="mb-6">
          <span className="text-6xl">🎵</span>
        </div>
        <h2 className="text-3xl font-bold text-amber-800 mb-4">おしまい</h2>
        <p className="text-xl text-amber-700 mb-6">よんでくれて ありがとう！</p>
        <div className="bg-amber-100 rounded-lg p-4 border border-amber-200">
          <p className="text-lg text-amber-800">
            🌟 たろうくんからの メッセージ 🌟
            <br />
            <br />
            「きみも すきな おんがくを みつけてね！」
          </p>
        </div>
      </div>
    ),
  },
]

export default function InteractiveEbookDemo() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next")

  const handleNextPage = () => {
    if (isFlipping || currentPage >= pages.length - 1) return

    setFlipDirection("next")
    setIsFlipping(true)
    
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1))
      setIsFlipping(false)
    }, 1200)
  }

  const handlePrevPage = () => {
    if (isFlipping || currentPage <= 0) return

    setFlipDirection("prev")
    setIsFlipping(true)
    
    setTimeout(() => {
      setCurrentPage((prev) => Math.max(prev - 1, 0))
      setIsFlipping(false)
    }, 1200)
  }

  const getPageData = (index: number): PageData | null => {
    if (index >= 0 && index < pages.length) {
      return pages[index]
    }
    return null
  }

  const currentPageData = getPageData(currentPage)
  const nextPageData = getPageData(currentPage + 1)

  if (!currentPageData) return null

  // 見開きの基準画像（偶数ページの画像）
  const spreadBaseIndex = currentPage % 2 === 0 ? currentPage : currentPage - 1;
  const spreadBaseImage = pages[spreadBaseIndex]?.image;
  // 次の見開きの基準画像
  const nextSpreadBaseIndex = spreadBaseIndex + 2 < pages.length ? spreadBaseIndex + 2 : spreadBaseIndex;
  const nextSpreadBaseImage = pages[nextSpreadBaseIndex]?.image;

  // 右ページの画像を決定
  const rightPageImage = isFlipping && flipDirection === "next"
    ? nextSpreadBaseImage
    : spreadBaseImage;

  return (
    <div className="relative w-full h-[600px] bg-amber-50 rounded-lg shadow-lg overflow-hidden">
      <div className="book-container">
        <div className="page left-page bg-cover bg-no-repeat" style={{
          backgroundImage: `url(${spreadBaseImage})`,
          backgroundSize: "200% 100%",
          backgroundPosition: "left center"
        }}>
          {currentPageData.type === "story" && currentPageData.content}
        </div>

        <div className={`page right-page ${isFlipping ? `flipping-${flipDirection}` : ""} bg-cover bg-no-repeat`} style={{
          backgroundImage: `url(${rightPageImage})`,
          backgroundSize: "200% 100%",
          backgroundPosition: "right center"
        }}>
          {currentPageData.type === "story" && currentPageData.content}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevPage}
          disabled={currentPage === 0 || isFlipping}
          className="bg-white/80 hover:bg-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextPage}
          disabled={currentPage === pages.length - 1 || isFlipping}
          className="bg-white/80 hover:bg-white"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
} 