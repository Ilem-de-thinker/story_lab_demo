import React, { useState, useEffect } from 'react';
import { WriterStatus, ReactionType } from '../../types';
import { AuthorAvatar } from '../common/AuthorAvatar';
import { REACTION_DETAILS } from '../common/ReactionButton';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';

interface StatusViewerModalProps {
  statuses: WriterStatus[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const StatusViewerModal: React.FC<StatusViewerModalProps> = ({
  statuses,
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [reactionsCount, setReactionsCount] = useState<Record<string, number>>({});
  const [userReactions, setUserReactions] = useState<Record<string, ReactionType | undefined>>({});

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
  }, [initialIndex, isOpen]);

  // Active status
  const currentStatus = statuses[currentIndex];

  // Auto-advance timer (e.g. 7 seconds per status)
  useEffect(() => {
    if (!isOpen || !currentStatus) return;

    setProgress(0);
    const interval = 70; // 70ms tick for 100 ticks = 7000ms
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < statuses.length - 1) {
            setCurrentIndex((idx) => idx + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, currentIndex, statuses.length, onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex < statuses.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, statuses.length, onClose]);

  if (!isOpen || !currentStatus) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < statuses.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handleReact = (type: ReactionType) => {
    setUserReactions((prev) => ({ ...prev, [currentStatus.id]: type }));
    setReactionsCount((prev) => ({
      ...prev,
      [currentStatus.id]: (prev[currentStatus.id] || currentStatus.reactionsCount) + 1,
    }));
  };

  const activeReaction = userReactions[currentStatus.id];
  const count = reactionsCount[currentStatus.id] ?? currentStatus.reactionsCount;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Viewer Box */}
      <div
        className="relative w-full max-w-md aspect-[9/16] max-h-[88vh] rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between text-white border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Image / Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${
            currentStatus.bgGradient || 'from-blue-900 to-indigo-950'
          }`}
        />
        {currentStatus.imageUrl && (
          <img
            src={currentStatus.imageUrl}
            alt="Status artwork"
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

        {/* Top Progress Segmented Bar */}
        <div className="relative z-20 px-4 pt-3 flex items-center gap-1.5">
          {statuses.map((s, idx) => (
            <div
              key={s.id}
              className="flex-1 h-1 rounded-full bg-white/25 overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all ease-linear"
                style={{
                  width:
                    idx < currentIndex
                      ? '100%'
                      : idx === currentIndex
                      ? `${progress}%`
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Top Header: Author details & Close */}
        <div className="relative z-20 px-4 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AuthorAvatar
              name={currentStatus.author.name}
              avatar={currentStatus.author.avatar}
              size="sm"
              clickable={false}
            />
            <div>
              <span className="font-semibold text-sm leading-tight block">
                {currentStatus.author.name}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-white/75">
                <span>@{currentStatus.author.username}</span>
                <span>·</span>
                <span>{currentStatus.createdAt}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Middle: Full Text Dispatch */}
        <div className="relative z-20 px-6 sm:px-8 py-6 my-auto text-center">
          <p className="font-serif-display text-xl sm:text-2xl leading-relaxed text-white drop-shadow-md select-text">
            "{currentStatus.text}"
          </p>
        </div>

        {/* Bottom Bar: Views & Emoji Reactions */}
        <div className="relative z-20 p-4 pt-2 bg-gradient-to-t from-black/90 to-transparent space-y-3">
          <div className="flex items-center justify-between text-xs text-white/70 px-1">
            <span className="flex items-center gap-1">
              <Eye size={13} />
              <span className="tabular-nums">{currentStatus.viewsCount + 1} views</span>
            </span>
            <span className="flex items-center gap-1 text-amber-300 font-medium">
              <Sparkles size={13} />
              <span className="tabular-nums">{count} reactions</span>
            </span>
          </div>

          {/* Quick Reaction Emoji Pills */}
          <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/15">
            {Object.values(REACTION_DETAILS).map((r) => {
              const isSelected = activeReaction === r.type;
              return (
                <button
                  key={r.type}
                  type="button"
                  onClick={() => handleReact(r.type)}
                  className={`p-1.5 rounded-full transition-transform hover:scale-125 focus:outline-none ${
                    isSelected ? 'bg-white/30 scale-120' : 'hover:bg-white/10'
                  }`}
                  title={r.label}
                >
                  <span className="text-xl leading-none block select-none">
                    {r.emoji}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Left / Right Tap zones or Arrow Navigators */}
        {currentIndex > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 text-white/90 hover:bg-black/70 hover:text-white transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        {currentIndex < statuses.length - 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 text-white/90 hover:bg-black/70 hover:text-white transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>
    </div>
  );
};
