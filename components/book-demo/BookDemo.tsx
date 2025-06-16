"use client";

import { BookViewer } from './BookViewer';
import { sampleBook } from './sample-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BookDemo() {
  const handleScrollToForm = () => {
    const formSection = document.getElementById('form');
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      id="book-demo"
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-pink-50"
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
          <div className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <span>スワイプまたはクリックでページをめくってください</span>
            </div>
          </div>
        </div>

        {/* Book viewer */}
        <div className="mb-12">
          <BookViewer 
            book={sampleBook}
            className="shadow-2xl"
          />
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

        {/* CTA button */}
        <div className="text-center">
          <Button
            onClick={handleScrollToForm}
            size="lg"
            className={cn(
              "bg-gradient-to-r from-pink-500 to-pink-600",
              "hover:from-pink-600 hover:to-pink-700",
              "text-white font-semibold px-8 py-4 rounded-full",
              "shadow-lg hover:shadow-xl",
              "transform hover:scale-105 transition-all duration-200",
              "text-lg"
            )}
          >
            この絵本を我が子用に作る
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            下のフォームから簡単に注文できます
          </p>
        </div>
      </div>
    </section>
  );
}