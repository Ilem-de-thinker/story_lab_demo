import React from 'react';
import { Link } from 'react-router-dom';

interface AuthorAvatarProps {
  name: string;
  avatar: string;
  username?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  clickable?: boolean;
  className?: string;
}

export const AuthorAvatar: React.FC<AuthorAvatarProps> = ({
  name,
  avatar,
  username,
  size = 'md',
  clickable = true,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-lg',
  }[size];

  const content = (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 bg-[#F1EFEA] border border-[#E9E6E0] ${sizeClasses} ${className}`}
    >
      <img
        src={avatar}
        alt={name}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback initial
          const target = e.currentTarget;
          target.style.display = 'none';
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center font-medium text-[#77736E] uppercase pointer-events-none select-none">
        {name.charAt(0)}
      </div>
    </div>
  );

  if (clickable && username) {
    return (
      <Link
        to={`/u/${username}`}
        className="inline-block transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2563EB]"
        title={name}
      >
        {content}
      </Link>
    );
  }

  return content;
};
