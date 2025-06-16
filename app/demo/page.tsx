"use client";

import { BookViewer } from '@/components/book-demo/BookViewer';
import { sampleBook } from '@/components/book-demo/sample-data';

export default function DemoPage() {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      {/* Full screen book viewer */}
      <BookViewer 
        book={sampleBook}
        className="h-full w-full bg-black"
      />
    </div>
  );
}