import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  Compass,
  Bookmark,
  Bell,
  MessageSquare,
  User,
  PenTool,
  Settings,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SidebarNavigation: React.FC = () => {
  const { currentUser, notifications } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { label: 'Home Feed', path: '/feed', icon: Home },
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
    { label: 'Drafts', path: '/drafts', icon: FileText },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { label: 'Messages', path: '/messages', icon: MessageSquare },
    { label: 'My Publication', path: `/u/${currentUser.username}`, icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-56 shrink-0 hidden lg:block sticky top-24 self-start space-y-6">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB] dark:text-[#60A5FA] font-semibold'
                    : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6] hover:bg-[#F1EFEA] dark:hover:bg-[#1B212D]'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full bg-[#EAB308] text-[#191919]">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="pt-2">
        <Link
          to="/write"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded shadow-xs transition-colors"
        >
          <PenTool size={14} />
          <span>Write Story</span>
        </Link>
      </div>

      <div className="pt-6 border-t border-[#E9E6E0] dark:border-[#232A38] text-xs text-[#77736E] dark:text-[#9CA3AF] leading-relaxed">
        <div className="flex items-center gap-1.5">
          <p className="font-editorial text-sm text-[#191919] dark:text-[#F3F4F6]">Quillora</p>
          <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
        </div>
        <p className="mt-1">For writers, thinkers, and those who treasure the slow craft of prose.</p>
      </div>
    </aside>
  );
};
