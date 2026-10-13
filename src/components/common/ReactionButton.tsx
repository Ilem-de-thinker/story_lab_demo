import React, { useState, useRef, useEffect } from 'react';
import { ReactionType, ReactionDetail } from '../../types';
import { ThumbsUp } from 'lucide-react';

export const REACTION_DETAILS: Record<ReactionType, ReactionDetail> = {
  like: {
    type: 'like',
    emoji: '👍',
    label: 'Like',
    color: '#2563EB', // Blue accent
  },
  love: {
    type: 'love',
    emoji: '❤️',
    label: 'Love',
    color: '#E11D48',
  },
  insightful: {
    type: 'insightful',
    emoji: '💡',
    label: 'Insightful',
    color: '#EAB308', // Golden Yellow accent
  },
  applause: {
    type: 'applause',
    emoji: '👏',
    label: 'Applause',
    color: '#F59E0B',
  },
  profound: {
    type: 'profound',
    emoji: '🖋️',
    label: 'Craft',
    color: '#1E56A0',
  },
};

interface ReactionButtonProps {
  clapsCount: number;
  userReaction?: ReactionType;
  isLiked?: boolean;
  onToggleLike: (e: React.MouseEvent) => void;
  onSelectReaction: (reaction: ReactionType) => void;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export const ReactionButton: React.FC<ReactionButtonProps> = ({
  clapsCount,
  userReaction,
  isLiked,
  onToggleLike,
  onSelectReaction,
  size = 'md',
  showCount = true,
  className = '',
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState<ReactionType | null>(null);

  const holdTimerRef = useRef<number | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active detail
  const currentReaction = userReaction ? REACTION_DETAILS[userReaction] : null;

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hover detection to open popup
  const handleMouseEnter = () => {
    hoverTimerRef.current = window.setTimeout(() => {
      setShowPicker(true);
    }, 450); // Small natural hover delay like Facebook
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    // Give user a brief grace window before closing
    setTimeout(() => {
      if (containerRef.current && !containerRef.current.matches(':hover')) {
        setShowPicker(false);
      }
    }, 300);
  };

  // Click & hold (press down and hold)
  const handleMouseDown = () => {
    holdTimerRef.current = window.setTimeout(() => {
      setShowPicker(true);
    }, 300);
  };

  const handleMouseUp = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // If picker isn't open, regular click triggers default like
    if (!showPicker) {
      onToggleLike(e);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Facebook-style Pop-up Emoji Bar */}
      {showPicker && (
        <div
          className="absolute bottom-full left-0 mb-2.5 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] dark:bg-[#1E2430] border border-[#E9E6E0] dark:border-[#2D3546] rounded-full shadow-xl animate-in fade-in zoom-in-90 slide-in-from-bottom-2 duration-150"
          role="dialog"
          aria-label="Reaction menu"
        >
          {Object.values(REACTION_DETAILS).map((item) => {
            const isSelected = userReaction === item.type;
            const isHovered = hoveredReaction === item.type;
            return (
              <button
                key={item.type}
                type="button"
                onMouseEnter={() => setHoveredReaction(item.type)}
                onMouseLeave={() => setHoveredReaction(null)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelectReaction(item.type);
                  setShowPicker(false);
                }}
                className="relative group p-1 transition-transform duration-150 transform hover:scale-135 focus:outline-none"
                title={item.label}
              >
                {/* Tooltip Label */}
                {isHovered && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-semibold text-white bg-[#191919] dark:bg-black rounded-full whitespace-nowrap shadow-sm pointer-events-none">
                    {item.label}
                  </span>
                )}
                <span className="text-xl select-none leading-none block filter drop-shadow-2xs">
                  {item.emoji}
                </span>
                {isSelected && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Reaction Trigger Button */}
      <button
        type="button"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className={`inline-flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2563EB] group ${
          isLiked || currentReaction
            ? 'text-[#2563EB] dark:text-[#60A5FA]'
            : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6]'
        }`}
        title="Click to appreciate, or click & hold for reactions"
      >
        <span className="p-1 rounded-md group-hover:bg-[#EFF6FF] dark:group-hover:bg-[#1E293B] transition-colors flex items-center justify-center">
          {currentReaction ? (
            <span className="text-base select-none leading-none animate-in zoom-in-75 duration-100">
              {currentReaction.emoji}
            </span>
          ) : (
            <ThumbsUp
              size={17}
              className={`transition-transform active:scale-125 ${
                isLiked ? 'fill-[#2563EB] text-[#2563EB]' : 'text-current'
              }`}
            />
          )}
        </span>

        {showCount && (
          <span className="text-xs font-medium tabular-nums flex items-center gap-1">
            {clapsCount}
            {currentReaction && (
              <span className="hidden sm:inline text-[11px] font-medium" style={{ color: currentReaction.color }}>
                {currentReaction.label}
              </span>
            )}
          </span>
        )}
      </button>
    </div>
  );
};
