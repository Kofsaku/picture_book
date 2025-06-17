"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationControlsProps } from './types';
import { cn } from '@/lib/utils';

export function NavigationControls({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isFullScreen = false
}: NavigationControlsProps) {
  const buttonBaseClasses = isFullScreen
    ? "bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
    : "bg-white/90 backdrop-blur-sm border-pink-200 hover:bg-pink-50 hover:border-pink-300";
    
  const indicatorClasses = isFullScreen
    ? "bg-white/60 hover:bg-white/80"
    : "bg-pink-200 hover:bg-pink-300";
    
  const activeIndicatorClasses = isFullScreen
    ? "bg-white shadow-md"
    : "bg-pink-500 shadow-md";
    
  const pageCountClasses = isFullScreen
    ? "text-white bg-black/30"
    : "text-gray-600 bg-white/80";

  return (
    <div className="flex items-center justify-center w-full gap-3 sm:gap-6">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={cn(
          "flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 rounded-full",
          buttonBaseClasses,
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "transition-all duration-200"
        )}
        aria-label="前のページ"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="text-xs font-medium hidden sm:inline">前</span>
      </Button>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                // This would need to be passed as a prop to directly navigate to a page
                // For now, we'll just show the indicators
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300 hover:scale-110",
                index === currentPage - 1
                  ? activeIndicatorClasses
                  : indicatorClasses
              )}
              aria-label={`ページ ${index + 1}に移動`}
            />
          ))}
        </div>
        <div className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          pageCountClasses
        )}>
          {currentPage}/{totalPages}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={!canGoNext}
        className={cn(
          "flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 rounded-full",
          buttonBaseClasses,
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "transition-all duration-200"
        )}
        aria-label="次のページ"
      >
        <span className="text-xs font-medium hidden sm:inline">次</span>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </Button>
    </div>
  );
}