import React from 'react';
import { Sparkles } from 'lucide-react';

interface ClapButtonProps {
  clapsCount: number;
  isLiked?: boolean;
  onClap: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export const ClapButton: React.FC<ClapButtonProps> = ({
  clapsCount,
  isLiked = false,
  onClap,
  size = 'md',
  showCount = true,
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
      onClick={onClap}
      className={`inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2563EB] group ${
        isLiked ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
      } ${className}`}
      title={isLiked ? 'Appreciated' : 'Appreciate this story'}
    >
      <span className="p-1 rounded-md group-hover:bg-[#EFF6FF] dark:group-hover:bg-[#1E293B] transition-colors">
        <Sparkles
          size={iconSizes}
          className={`transition-transform active:scale-125 ${
            isLiked ? 'fill-[#EAB308] text-[#EAB308]' : 'text-current'
          }`}
        />
      </span>
      {showCount && (
        <span className="text-xs font-medium tabular-nums">{clapsCount}</span>
      )}
    </button>
  );
};
