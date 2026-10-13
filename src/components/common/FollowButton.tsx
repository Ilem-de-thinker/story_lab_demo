import React from 'react';
import { useApp } from '../../context/AppContext';

interface FollowButtonProps {
  authorId: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  authorId,
  size = 'md',
  className = '',
}) => {
  const { isFollowing, toggleFollow, currentUser } = useApp();

  if (currentUser.id === authorId) {
    return null;
  }

  const following = isFollowing(authorId);

  const sizeClasses = size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFollow(authorId);
      }}
      className={`font-medium transition-all duration-150 rounded-full border whitespace-nowrap shrink-0 ${sizeClasses} ${
        following
          ? 'bg-transparent text-[#77736E] dark:text-[#9CA3AF] border-[#E9E6E0] dark:border-[#272E3B] hover:border-[#C44949] hover:text-[#C44949]'
          : 'bg-[#191919] dark:bg-white text-[#FAF9F6] dark:text-[#191919] border-[#191919] dark:border-white hover:bg-[#2563EB] dark:hover:bg-[#3B82F6] hover:text-white dark:hover:text-white hover:border-[#2563EB] dark:hover:border-[#3B82F6]'
      } ${className}`}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  );
};
