"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { BookViewerProps } from './types';
import { PageContent } from './PageContent';
import { NavigationControls } from './NavigationControls';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BookViewer({ book, className }: BookViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const totalPages = book.pages.length;
  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;
  const isFullScreen = className?.includes("h-full");

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage < 1 || newPage > totalPages || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentPage(newPage);
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [totalPages, isAnimating]);

  const goToNext = useCallback(() => {
    if (canGoNext) {
      handlePageChange(currentPage + 1);
      setShowTooltip(false);
    }
  }, [currentPage, canGoNext, handlePageChange]);

  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      handlePageChange(currentPage - 1);
      setShowTooltip(false);
    }
  }, [currentPage, canGoPrevious, handlePageChange]);

  // Touch/Swipe handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    
    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    
    touchStartRef.current = null;
  }, [goToNext, goToPrevious]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'Escape' && isFullScreen) {
        e.preventDefault();
        router.push('/#book-demo');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, isFullScreen, router]);

  // Click handlers for navigation areas
  const handlePreviousClick = useCallback(() => {
    goToPrevious();
    setShowTooltip(false);
  }, [goToPrevious]);

  const handleNextClick = useCallback(() => {
    goToNext();
    setShowTooltip(false);
  }, [goToNext]);

  return (
    <div
      className={cn(
        "relative w-full mx-auto",
        "bg-white overflow-hidden",
        // Full screen for demo page, responsive for LP
        className?.includes("h-full") 
          ? "h-full w-full" 
          : "h-[85vh] landscape:h-[90vh] sm:h-auto sm:max-w-5xl sm:rounded-2xl sm:shadow-2xl",
        "flex flex-col",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="絵本スライドショー"
    >
      {/* Close button for full screen */}
      {isFullScreen && (
        <button
          onClick={() => router.push('/#book-demo')}
          className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
          aria-label="閉じる"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-pink-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm animate-bounce shadow-lg">
            スワイプまたはクリックでページをめくる
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-600"></div>
            </div>
          </div>
        </div>
      )}

      {/* Slideshow container */}
      <div className={cn(
        "relative overflow-hidden",
        className?.includes("h-full") 
          ? "flex-1" 
          : "flex-1 sm:aspect-[16/10] sm:flex-none"
      )}>
        {/* Slides container */}
        <div 
          ref={containerRef}
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{
            transform: `translateX(-${(currentPage - 1) * 100}%)`
          }}
        >
          {book.pages.map((page, index) => (
            <div
              key={page.id}
              className="w-full flex-shrink-0 h-full"
            >
              <PageContent
                page={page}
                isVisible={!isAnimating}
                className="h-full"
              />
            </div>
          ))}
        </div>

        {/* Navigation click areas */}
        <button
          onClick={handlePreviousClick}
          disabled={!canGoPrevious}
          className={cn(
            "absolute left-0 top-0 w-1/4 h-full z-10",
            "hover:bg-black/5 transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-inset",
            !canGoPrevious && "cursor-not-allowed"
          )}
          aria-label="前のページに戻る"
        />

        <button
          onClick={handleNextClick}
          disabled={!canGoNext}
          className={cn(
            "absolute right-0 top-0 w-1/4 h-full z-10",
            "hover:bg-black/5 transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-inset",
            !canGoNext && "cursor-not-allowed"
          )}
          aria-label="次のページに進む"
        />
      </div>

      {/* Navigation controls */}
      <div className={cn(
        "flex-shrink-0",
        className?.includes("h-full") 
          ? "p-2 bg-black/80 backdrop-blur-sm absolute bottom-0 left-0 right-0 z-30" 
          : "p-2 sm:p-4 bg-gradient-to-r from-blue-50 to-pink-50"
      )}>
        <NavigationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={goToNext}
          onPrevious={goToPrevious}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          isFullScreen={isFullScreen}
        />
      </div>
    </div>
  );
}