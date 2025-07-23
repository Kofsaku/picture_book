"use client";

import { BookViewer } from '@/components/book-demo/BookViewer';
import { monitorBook } from '@/components/book-demo/monitor-book-data';

export default function MonitorPage() {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      {/* Full screen book viewer for monitor */}
      <BookViewer 
        book={monitorBook}
        className="h-full w-full bg-black"
      />
    </div>
  );
}