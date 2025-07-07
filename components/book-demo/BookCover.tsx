"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Play, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sampleBook } from './sample-data';
import { cn } from '@/lib/utils';

interface BookCoverProps {
  className?: string;
}

export function BookCover({ className }: BookCoverProps) {
  return (
    <section 
      id="book-demo"
      className={cn("py-16 bg-gradient-to-br from-blue-50 via-white to-pink-50", className)}
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              実際の絵本を体験してみよう
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            お子様が夢中になる、パーソナライズされた絵本の世界
          </p>
        </div>

        {/* Book Cover Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative group cursor-pointer">
            {/* Book cover container */}
            <Link href="/demo">
              <div className="relative mx-auto max-w-xs md:max-w-md aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl">
                <Image
                  src={sampleBook.coverImage}
                  alt={`${sampleBook.title}の表紙`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                
                {/* Play button overlay */}
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 transform transition-all duration-300 group-hover:scale-110 shadow-xl">
                    <Play className="w-8 h-8 text-pink-600 ml-1" />
                  </div>
                </div> */}
                
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl md:text-2xl font-bold text-center">
                    {sampleBook.title}
                  </h3>
                  <p className="text-white/90 text-center mt-2">
                    クリックして絵本を読んでみる
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Features highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👶</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">お子様の名前入り</h3>
            <p className="text-sm text-gray-600">
              物語の主人公として、お子様の名前が登場します
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">オリジナルイラスト</h3>
            <p className="text-sm text-gray-600">
              プロのイラストレーターが描く、美しい挿絵
            </p>
          </div>
          
          <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📖</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">教育的価値</h3>
            <p className="text-sm text-gray-600">
              読み聞かせを通じて、想像力と語彙力を育みます
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="text-center space-y-4">
          <Link href="/demo">
            <Button
              size="lg"
              variant="outline"
              className="border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg mr-4"
            >
              <Eye className="w-5 h-5 mr-2" />
              絵本デモを体験する
            </Button>
          </Link>
          
          <div className="mt-4">
            <Button
              onClick={() => {
                const formSection = document.getElementById('form');
                if (formSection) {
                  formSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
            >
              この絵本を我が子用に作る
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-3">
            下のフォームから簡単に注文できます
          </p>
        </div>
      </div>
    </section>
  );
}