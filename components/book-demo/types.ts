export interface BookPage {
  id: number;
  imageUrl: string;
  altText: string;
  text: string;
  highlightWords?: string[];
}

export interface DemoBook {
  title: string;
  pages: BookPage[];
  coverImage: string;
}

export interface BookViewerProps {
  book: DemoBook;
  className?: string;
}

export interface PageContentProps {
  page: BookPage;
  isVisible?: boolean;
  className?: string;
}

export interface NavigationControlsProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isFullScreen?: boolean;
}