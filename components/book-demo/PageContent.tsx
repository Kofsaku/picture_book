"use client";

import Image from 'next/image';
import { PageContentProps } from './types';
import { cn } from '@/lib/utils';

export function PageContent({ page, isVisible = true, className }: PageContentProps) {
  return (
    <div
      className={cn(
        "w-full h-full relative",
        "bg-gradient-to-br from-blue-50 to-pink-50",
        "transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {/* Image with minimal navigation spacing */}
      <div className="absolute inset-0 flex items-center justify-center pb-10">
        <Image
          src={page.imageUrl}
          alt={page.altText}
          width={1200}
          height={800}
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          priority={page.id <= 2}
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
      </div>
    </div>
  );
}