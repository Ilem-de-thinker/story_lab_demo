import React from 'react';
import { Bookmark } from 'lucide-react';

interface BookmarkButtonProps {
  isBookmarked?: boolean;
  onBookmark: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isBookmarked = false,
  onBookmark,
  size = 'md',
  className = '',
}) => {
  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 22,
  }[size];

  return (
    <button
      type="button"
      onClick={onBookmark}
      className={`p-1.5 rounded-md transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2563EB] ${
        isBookmarked
          ? 'text-[#2563EB] dark:text-[#60A5FA] bg-[#EFF6FF] dark:bg-[#1E293B]'
          : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430]'
      } ${className}`}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark story'}
    >
      <Bookmark
        size={iconSizes}
        className={isBookmarked ? 'fill-[#2563EB] dark:fill-[#60A5FA]' : ''}
      />
    </button>
  );
};
