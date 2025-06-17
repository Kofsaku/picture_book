"use client"

import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// jQueryとturn.jsの型定義
declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

interface PageData {
  id: number
  title: string
  content?: React.ReactNode
  image?: string
  type: "cover" | "table-of-contents" | "story" | "ending"
  text?: string
}

const pages: PageData[] = [
  { id: -1, title: "", type: "cover", image: "/itatop.png" },
  { id: 0, title: "", type: "cover", image: "/mori_top.png" },
  { id: 1, title: "", type: "table-of-contents", image: "/mori_top.png" },
  { id: 2, title: "", type: "story", image: "/page2.png" },
  { id: 3, title: "", type: "story", image: "/page2.png" },
  { id: 4, title: "", type: "story", image: "/page2.png" },
  { id: 5, title: "", type: "story", image: "/page2.png" },
  { id: 6, title: "", type: "story", image: "/mori_top.png" },
  { id: 7, title: "", type: "ending", image: "/mori_top.png" },
  { id: 8, title: "", type: "ending", image: "/mori_top.png" },
]

function getHalfImageSync(src: string, side: 'left' | 'right', onReady: (url: string) => void) {
  const img = new window.Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const fullWidth = img.width;
    const halfWidth = Math.floor(fullWidth / 2);
    const sx = side === 'left' ? 0 : fullWidth - halfWidth;
    const canvas = document.createElement('canvas');
    canvas.width = halfWidth;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, sx, 0, halfWidth, img.height, 0, 0, halfWidth, img.height);
      onReady(canvas.toDataURL());
    }
  };
  img.src = src;
}

function useHalfImage(image: string | undefined, side: 'left' | 'right') {
  const [halfImg, setHalfImg] = useState<string | null>(null);
  useEffect(() => {
    if (image) getHalfImageSync(image, side, setHalfImg);
  }, [image, side]);
  return halfImg;
}

const TurnjsFlipbook: React.FC = () => {
  const flipbookRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  const goToNextPage = () => {
    if (flipbookRef.current && window.$ && isReady) {
      const $flipbook = window.$(flipbookRef.current)
      try {
        $flipbook.turn('next')
      } catch (error) {
        console.warn('Error turning to next page:', error)
      }
    }
  }

  const goToPrevPage = () => {
    if (flipbookRef.current && window.$ && isReady) {
      const $flipbook = window.$(flipbookRef.current)
      try {
        $flipbook.turn('previous')
      } catch (error) {
        console.warn('Error turning to previous page:', error)
      }
    }
  }

  useEffect(() => {
    const initializeFlipbook = async () => {
      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = src
          script.async = true
          script.onload = () => resolve()
          script.onerror = () => reject(`Failed to load ${src}`)
          document.head.appendChild(script)
        })
      }

      try {
        await loadScript('/jquery.min.js')
        await new Promise(r => setTimeout(r, 100))
        await loadScript('/turn.min.js')
        await new Promise(r => setTimeout(r, 300))

        const $fb = window.$(flipbookRef.current)
        if ($fb.data('turn')) $fb.turn('destroy')
        $fb.turn({
          width: 800,
          height: 600,
          autoCenter: true,
          display: 'double',
          elevation: 20,
          duration: 800,
          when: {
            turning: (_: any, page: number) => setCurrentPage(page),
            turned: (_: any, page: number) => setCurrentPage(page),
          },
        })
        setIsReady(true)
      } catch (e) {
        console.error(e)
        setHasError(true)
      }
    }

    initializeFlipbook()
  }, [])

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={flipbookRef}
        className="bg-amber-50 rounded shadow overflow-hidden"
        style={{ width: 800, height: 600 }}
      >
        {pages.map((page, index) => {
          // 最初のページ（index === 0）は左右両方表示
          if (index === 0) {
            const leftImg = useHalfImage(pages[0].image, 'left');
            const rightImg = useHalfImage(pages[0].image, 'right');
            return (
              <div key={pages[0].id} className="flipbook-page relative flex" style={{ backgroundColor: '#fff8e6', border: '1px solid #fde9b2', height: '100%' }}>
                <div style={{ width: '50%', height: '100%', position: 'relative' }}>
                  {leftImg && (
                    <img
                      src={leftImg}
                      alt="page-left"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill' }}
                    />
                  )}
                </div>
                <div style={{ width: '50%', height: '100%', position: 'relative' }}>
                  {rightImg && (
                    <img
                      src={rightImg}
                      alt="page-right"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill' }}
                    />
                  )}
                </div>
              </div>
            );
          }
          // 2ページ目以降は従来通り
          let side: 'left' | 'right' = index % 2 === 0 ? 'right' : 'left';
          const halfImg = useHalfImage(page.image, side);
          return (
            <div
              key={page.id}
              className="flipbook-page relative"
              style={{ backgroundColor: '#fff8e6', border: '1px solid #fde9b2', height: '100%' }}
            >
              {halfImg && (
                <img
                  src={halfImg}
                  alt="page"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill' }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <Button onClick={goToPrevPage} disabled={!isReady || currentPage <= 1}><ChevronLeft /></Button>
        <span>{currentPage} / {pages.length}</span>
        <Button onClick={goToNextPage} disabled={!isReady || currentPage >= pages.length}><ChevronRight /></Button>
      </div>
    </div>
  )
}

export default TurnjsFlipbook;
