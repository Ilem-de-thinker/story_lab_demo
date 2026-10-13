import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PenTool, Bell, Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthorAvatar } from '../common/AuthorAvatar';

interface TopNavigationProps {
  isPublic?: boolean;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ isPublic = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, notifications, theme, toggleTheme } = useApp();
  const location = useLocation();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 dark:bg-[#0E121A]/95 backdrop-blur-xs border-b border-[#E9E6E0] dark:border-[#232A38] transition-colors">
      {/* 3-Zone Contract: Brand — 4-5 Nav Links — 1 Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to={isPublic ? '/' : '/feed'}
          className="flex items-center gap-2 group whitespace-nowrap shrink-0"
        >
          <span className="font-editorial text-3xl sm:text-4xl text-[#191919] dark:text-[#F3F4F6] tracking-tight group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
            Quillora
          </span>
          {/* Subtle golden yellow dot for literary brand identity */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] self-baseline mt-2" />
        </Link>

        {/* Zone 2: Navigation Links */}
        {isPublic ? (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#77736E] dark:text-[#9CA3AF]">
            <Link
              to="/explore"
              className={`hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/explore' ? 'text-[#191919] dark:text-[#F3F4F6] font-semibold' : ''
              }`}
            >
              Explore
            </Link>
            <Link
              to="/explore?tab=writers"
              className="hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors whitespace-nowrap shrink-0"
            >
              Discover Writers
            </Link>
            <Link
              to="/feed"
              className="hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors whitespace-nowrap shrink-0"
            >
              Reader Feed
            </Link>
            <Link
              to="/login"
              className="hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors whitespace-nowrap shrink-0"
            >
              Sign In
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#77736E] dark:text-[#9CA3AF]">
            <Link
              to="/feed"
              className={`hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/feed' ? 'text-[#191919] dark:text-[#F3F4F6] font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/explore' ? 'text-[#191919] dark:text-[#F3F4F6] font-semibold' : ''
              }`}
            >
              Explore
            </Link>
            <Link
              to="/bookmarks"
              className={`hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/bookmarks' ? 'text-[#191919] dark:text-[#F3F4F6] font-semibold' : ''
              }`}
            >
              Bookmarks
            </Link>
            <Link
              to="/drafts"
              className={`hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/drafts' ? 'text-[#191919] dark:text-[#F3F4F6] font-semibold' : ''
              }`}
            >
              Drafts
            </Link>
          </nav>
        )}

        {/* Zone 3: Primary Action, Theme Toggle & User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6] rounded-md transition-colors hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430] focus:outline-none"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-[#FACC15]" />
            ) : (
              <Moon size={18} className="text-[#1E56A0]" />
            )}
          </button>

          {isPublic ? (
            <Link
              to="/signup"
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              Start Writing
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/write"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-colors whitespace-nowrap shrink-0 shadow-xs"
              >
                <PenTool size={13} />
                <span>Write</span>
              </Link>
              <Link
                to="/notifications"
                className="relative p-2 text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors"
                title="Notifications"
              >
                <Bell size={19} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EAB308]" />
                )}
              </Link>
              <AuthorAvatar
                name={currentUser.name}
                avatar={currentUser.avatar}
                username={currentUser.username}
                size="sm"
              />
            </div>
          )}

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drop menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E9E6E0] dark:border-[#232A38] bg-[#FAF9F6] dark:bg-[#0E121A] px-4 pt-3 pb-5 space-y-2">
          {isPublic ? (
            <>
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-[#191919] dark:text-[#F3F4F6]"
              >
                Explore Stories
              </Link>
              <Link
                to="/explore?tab=writers"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-[#191919] dark:text-[#F3F4F6]"
              >
                Discover Writers
              </Link>
              <Link
                to="/feed"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-[#191919] dark:text-[#F3F4F6]"
              >
                Reader Feed
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-[#191919] dark:text-[#F3F4F6]"
              >
                Sign In
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                className="w-full flex items-center justify-between py-2 px-3 rounded text-sm font-medium bg-[#F1EFEA] dark:bg-[#1E2430] text-[#191919] dark:text-[#F3F4F6] transition-colors"
              >
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? <Sun size={16} className="text-[#FACC15]" /> : <Moon size={16} className="text-[#2563EB]" />}
                  <span>{theme === 'dark' ? 'Midnight Dark' : 'Alabaster Light'}</span>
                </span>
                <span className="text-xs text-[#2563EB] dark:text-[#60A5FA]">Switch</span>
              </button>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center mt-3 py-2.5 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] rounded"
              >
                Start Writing
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/feed"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-[#191919] dark:text-[#F3F4F6]"
              >
                Home Feed
              </Link>
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-[#191919] dark:text-[#F3F4F6]"
              >
                Explore & Topics
              </Link>
              <Link
                to="/bookmarks"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-[#191919] dark:text-[#F3F4F6]"
              >
                Saved Stories
              </Link>
              <Link
                to="/drafts"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-[#191919] dark:text-[#F3F4F6]"
              >
                My Drafts
              </Link>
              <Link
                to="/messages"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-[#191919] dark:text-[#F3F4F6]"
              >
                Direct Messages
              </Link>
              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-[#191919] dark:text-[#F3F4F6]"
              >
                Account Settings
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                className="w-full flex items-center justify-between py-2 px-3 rounded text-sm font-medium bg-[#F1EFEA] dark:bg-[#1E2430] text-[#191919] dark:text-[#F3F4F6] transition-colors"
              >
                <span className="flex items-center gap-2">
                  {theme === 'dark' ? <Sun size={16} className="text-[#FACC15]" /> : <Moon size={16} className="text-[#2563EB]" />}
                  <span>Theme: {theme === 'dark' ? 'Midnight Dark' : 'Alabaster Light'}</span>
                </span>
                <span className="text-xs text-[#2563EB] dark:text-[#60A5FA]">Switch</span>
              </button>
              <Link
                to="/write"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center mt-3 py-2.5 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] rounded"
              >
                Open Writing Studio
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
