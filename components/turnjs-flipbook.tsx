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

// ページデータの型定義
interface PageData {
  id: number
  title: string
  content?: React.ReactNode
  image?: string
  type: "cover" | "table-of-contents" | "story" | "ending"
  text?: string
}

// ページデータ配列
const pages: PageData[] = [
  // トップの右側に表示
  {
    id: -1,
    title: "",
    type: "cover",
    image: "/itatop.png",
    text: ""
  },
  // 1ページ目左
  {
    id: 0,
    title: "",
    type: "cover",
    image: "/mori_top.png",
    text: ""
  },
  // 2ページ目右
  {
    id: 1,
    title: "",
    type: "table-of-contents",
    image: "/mori_top.png",
    text: ""
  },
  // 3ページ目左
  {
    id: 2,
    title: "",
    type: "story",
    image: "/page2.png",
    text: ""
  },
  // 4ページ目右
  {
    id: 3,
    title: "",
    type: "story",
    image: "/page2.png",
    text: ""
  },
  // 5ページ目左
  {
    id: 4,
    title: "",
    type: "story",
    image: "/page2.png",
    text: ""
  },
  // 5ページ目右
  {
    id: 5,
    title: "",
    type: "story",
    image: "/page2.png",
    text: ""
  },
  // 6ページ目左
  {
    id: 6,
    title: "",
    type: "story",
    image: "/mori_top.png",
    text: ""
  },
  // 6ページ目右
  {
    id: 7,
    title: "",
    type: "ending",
    image: "/mori_top.png",
    text: ""
  },
  // 最後左
  {
    id: 8,
    title: "",
    type: "ending",
    image: "/mori_top.png",
    text: ""
  },
]

// 画像をcanvasで左右半分に分割してDataURLを返す（厳密版）
function getHalfImageSync(src: string, side: 'left' | 'right', onReady: (url: string) => void) {
  const img = new window.Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    // 幅が奇数でも中央で1pxズレないように
    const fullWidth = img.width;
    const halfWidth = Math.floor(fullWidth / 2);
    const leftStart = 0;
    const rightStart = fullWidth - halfWidth;
    const sx = side === 'left' ? leftStart : rightStart;
    const canvas = document.createElement('canvas');
    canvas.width = halfWidth;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(
        img,
        sx, 0, halfWidth, img.height, // 切り出し元
        0, 0, halfWidth, img.height    // 描画先
      );
      onReady(canvas.toDataURL());
    }
  };
  img.src = src;
}

// カスタムフック: 画像の左右半分のDataURLを取得
function useHalfImage(image: string | undefined, side: 'left' | 'right') {
  const [halfImg, setHalfImg] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (image) {
      getHalfImageSync(image, side, setHalfImg);
    }
  }, [image, side]);
  return halfImg;
}

const TurnjsFlipbook: React.FC = () => {
  const flipbookRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isPortrait, setIsPortrait] = useState(false)
  const [flipbookSize, setFlipbookSize] = useState({ width: 800, height: 600 });

  // 各ページの左右画像を先に計算
  const halfImages = pages.map((page, index) => {
    if (index === 0 || !page.image) return null;
    const side: 'left' | 'right' = (index % 2 === 0) ? 'right' : 'left';
    return useHalfImage(page.image, side);
  });

  useEffect(() => {
    let isMounted = true

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`)
        if (existingScript) {
          resolve()
          return
        }
        
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
        document.head.appendChild(script)
      })
    }

    const initializeFlipbook = async () => {
      try {
        // jQueryを最初に読み込む
        await loadScript('/jquery.min.js')
        
        // jQuery読み込み完了を確認
        let retries = 0
        while (!window.$ && retries < 50) {
          await new Promise(resolve => setTimeout(resolve, 100))
          retries++
        }
        
        if (!window.$) {
          throw new Error('jQuery failed to load')
        }

        // turn.jsを読み込む
        await loadScript('/turn.min.js')
        
        // turn.js読み込み完了を確認
        retries = 0
        while ((!window.$.fn.turn) && retries < 50) {
          await new Promise(resolve => setTimeout(resolve, 100))
          retries++
        }
        
        if (!window.$.fn.turn) {
          throw new Error('Turn.js failed to load')
        }

        // DOMが更新されるまで少し待つ
        await new Promise(resolve => setTimeout(resolve, 300))
        
        if (!isMounted || !flipbookRef.current) return

        const $flipbook = window.$(flipbookRef.current)
        
        // 既存のturn.jsインスタンスを破棄
        if ($flipbook.data('turn')) {
          $flipbook.turn('destroy')
        }

        // Flipbookを初期化
        $flipbook.turn({
          width: flipbookSize.width,
          height: flipbookSize.height,
          autoCenter: true,
          elevation: 20,
          gradients: true,
          duration: 800,
          display: (typeof window !== 'undefined' && window.innerWidth <= 768) ? 'single' : 'double',
          when: {
            turning: function(event: any, page: number) {
              if (isMounted) setCurrentPage(page)
            },
            turned: function(event: any, page: number) {
              if (isMounted) setCurrentPage(page)
            }
          }
        })
        
        if (isMounted) {
          setIsReady(true)
          setHasError(false)
        }
      } catch (error) {
        console.error('Failed to initialize flipbook:', error)
        if (isMounted) {
          setHasError(true)
          setIsReady(false)
        }
      }
    }

    initializeFlipbook()

    return () => {
      isMounted = false
      if (flipbookRef.current && window.$ && window.$.fn.turn) {
        const $flipbook = window.$(flipbookRef.current)
        if ($flipbook.data('turn')) {
          try {
            $flipbook.turn('destroy')
          } catch (error) {
            console.warn('Error destroying flipbook:', error)
          }
        }
      }
    }
  }, [])

  useEffect(() => {
    // 画面の向きを判定する関数
    const checkOrientation = () => {
      if (typeof window !== 'undefined') {
        setIsPortrait(window.innerHeight > window.innerWidth)
      }
    }
    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)
    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  useEffect(() => {
    function updateSize() {
      if (typeof window !== 'undefined') {
        // ヘッダーの高さを仮に64pxとする
        const headerHeight = 64;
        const maxW = window.innerWidth;
        const maxH = window.innerHeight - headerHeight;
        // 絵本のアスペクト比 4:3
        let width = maxW * 0.96;
        let height = width * 0.75;
        if (height > maxH * 0.96) {
          height = maxH * 0.96;
          width = height * (4 / 3);
        }
        // 最小サイズ制限
        width = Math.max(width, 240);
        height = Math.max(height, 180);
        setFlipbookSize({ width, height });
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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

  const totalPages = pages.length

  const renderPageContent = (page: PageData, index: number) => {
    // スマホ判定
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
    // デフォルトで表示される表紙（index 0, type: 'cover'）を右ページ全体で大きく表示
    if (index === 0 && page.type === 'cover') {
      return (
        <div className="relative h-full w-full flex items-center justify-center">
          <img
            src={page.image}
            alt="表紙画像"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              width: isMobile ? '100%' : '100%',
              height: isMobile ? '100%' : '100%',
              objectFit: isMobile ? 'contain' : 'contain',
              display: 'block',
              margin: 0,
              padding: 0,
              border: 'none',
              borderRadius: '24px',
              boxShadow: '0 8px 32px 0 rgba(60,60,60,0.10)'
            }}
            draggable={false}
          />
          {/* タイトルやテキストがあればここにレイヤー表示 */}
          {page.title && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center w-full z-20 pointer-events-none">
              <h1 className="text-4xl font-bold text-gray-800 mb-2 drop-shadow-lg" style={{textShadow:'0 2px 8px #fff,0 1px 0 #333'}}>{page.title}</h1>
              {page.text && (
                <p className="text-lg text-gray-700 drop-shadow bg-white/80 rounded-xl px-6 py-3 mt-2 shadow inline-block" style={{textShadow:'0 1px 6px #fff'}}>{page.text}</p>
              )}
            </div>
          )}
        </div>
      );
    }

    // 見開き分割画像対応
    if (page.image && totalPages > 1) {
      let side: 'left' | 'right' = 'left';
      if (index % 2 === 0) {
        side = 'right';
      } else {
        side = 'left';
      }
      if (index === 0) {
        return <div className="h-full w-full bg-transparent" />;
      }
      const halfImg = halfImages[index];
      return (
        <div className="h-full w-full flex flex-col relative p-0 m-0" style={{boxSizing: 'border-box'}}>
          {halfImg && (
            <img
              src={halfImg}
              alt="page"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                maxWidth: '100%',
                maxHeight: '100%',
                boxSizing: 'border-box',
                border: 0,
                padding: 0,
                margin: 0,
                display: 'block'
              }}
              draggable={false}
            />
          )}
        </div>
      );
    }

    if (page.type === "cover") {
      return (
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 to-blue-100/60 z-0" />
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            {page.image ? (
              <img
                src={page.image}
                alt="表紙画像"
                style={{
                  maxHeight: '80%',
                  maxWidth: '60%',
                  objectFit: 'contain',
                  borderRadius: '32px',
                  boxShadow: '0 8px 32px 0 rgba(60,60,60,0.10)',
                  marginBottom: '2rem',
                  background: '#fff8e6',
                  border: '2px solid #fde9b2',
                  padding: '1.5rem',
                }}
                draggable={false}
              />
            ) : null}
            <div className="mt-2 text-center">
              {page.title && (
                <h1 className="text-4xl font-bold text-gray-800 mb-2 drop-shadow-lg" style={{textShadow:'0 2px 8px #fff,0 1px 0 #333'}}>{page.title}</h1>
              )}
              {page.text && (
                <p className="text-lg text-gray-700 drop-shadow bg-white/80 rounded-xl px-6 py-3 mt-2 shadow" style={{textShadow:'0 1px 6px #fff'}}>{page.text}</p>
              )}
            </div>
          </div>
        </div>
      )
    }

    if (page.type === "ending") {
      return (
        <div className="h-full flex flex-col justify-center items-center text-center relative p-4">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-400/20 to-pink-400/20"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-4">{page.title}</h2>
            {page.text && (
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 mx-4">
                <p className="text-base text-gray-800 leading-relaxed">{page.text}</p>
              </div>
            )}
          </div>
        </div>
      )
    }

    // Story pages
    return (
      <div className="h-full flex flex-col relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="flex-1 flex items-center justify-center p-4">
          <h2 className="text-xl font-bold text-white drop-shadow-lg text-center">{page.title}</h2>
        </div>
        {page.text && (
          <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-t-lg p-4 m-4 mt-0">
            <p className="text-base text-gray-800 leading-relaxed text-center">{page.text}</p>
          </div>
        )}
      </div>
    )
  }

  if (isPortrait) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-lg">
        <div className="flex flex-col items-center justify-center p-8">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-6 animate-bounce"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
          <div className="text-2xl font-bold text-pink-500 mb-2">横向きにしてください</div>
          <div className="text-gray-700 text-base">この絵本はスマートフォンを横向き（ランドスケープ）でご覧ください。</div>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="relative w-full h-[600px] bg-amber-50 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-xl font-bold text-gray-800 mb-4">絵本の読み込みに失敗しました</div>
          <div className="text-gray-600 mb-4">ページを再読み込みしてお試しください</div>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            再読み込み
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full bg-amber-50 rounded-lg shadow-lg overflow-hidden flex justify-center items-center" style={{ height: `${flipbookSize.height + 50}px`, marginBottom: '70px' }}>
        <div 
          ref={flipbookRef}
          id="flipbook"
          className="mx-auto"
          style={{ 
            margin: '25px auto',
            width: `${flipbookSize.width}px`,
            height: `${flipbookSize.height}px`,
            maxWidth: '100vw',
            maxHeight: 'calc(100vh - 64px)',
            transition: 'width 0.2s, height 0.2s',
          }}
        >
          {pages.map((page, index) => (
            <div
              key={page.id}
              className="flipbook-page relative"
              style={{
                backgroundColor: '#fff8e6',
                border: '1px solid #fde9b2',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                width: '100%',
              }}
            >
              {/* 背景用オーバーレイ */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0 pointer-events-none" />
              {/* ページ内容 */}
              {renderPageContent(page, index)}
            </div>
          ))}
        </div>
        {/* ローディング状態 */}
        {!isReady && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <div className="text-lg font-medium text-gray-600">
                絵本を準備中...
              </div>
            </div>
          </div>
        )}
      </div>
      {/* ナビゲーションボタンをflipbook本体の外側・下部中央に完全分離 */}
      <div className="relative w-full flex justify-center items-center" style={{ marginTop: '-40px', zIndex: 30, position: 'relative' }}>
        <div className="flex space-x-4 bg-white/90 backdrop-blur-sm rounded-md shadow-lg px-4 py-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevPage}
            disabled={!isReady || currentPage <= 1}
            className="bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm font-medium text-gray-800">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={!isReady || currentPage >= totalPages}
            className="bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default TurnjsFlipbook 