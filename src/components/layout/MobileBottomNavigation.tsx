import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, PenTool, Bell, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomNavigation: React.FC = () => {
  const { currentUser, notifications } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 dark:bg-[#0E121A]/95 backdrop-blur-md border-t border-[#E9E6E0] dark:border-[#232A38] h-16 flex items-center justify-around px-2"
      aria-label="Mobile navigation bar"
    >
      <NavLink
        to="/feed"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] text-xs font-medium transition-colors ${
            isActive ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-[#77736E] dark:text-[#9CA3AF]'
          }`
        }
      >
        <Home size={20} />
        <span className="text-[10px] mt-1">Home</span>
      </NavLink>

      <NavLink
        to="/explore"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] text-xs font-medium transition-colors ${
            isActive ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-[#77736E] dark:text-[#9CA3AF]'
          }`
        }
      >
        <Compass size={20} />
        <span className="text-[10px] mt-1">Explore</span>
      </NavLink>

      <NavLink
        to="/write"
        className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] text-white"
      >
        <div className="w-10 h-10 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] flex items-center justify-center text-white shadow-xs">
          <PenTool size={18} />
        </div>
      </NavLink>

      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          `relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] text-xs font-medium transition-colors ${
            isActive ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-[#77736E] dark:text-[#9CA3AF]'
          }`
        }
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-[#EAB308]" />
        )}
        <span className="text-[10px] mt-1">Alerts</span>
      </NavLink>

      <NavLink
        to={`/u/${currentUser.username}`}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] text-xs font-medium transition-colors ${
            isActive ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-[#77736E] dark:text-[#9CA3AF]'
          }`
        }
      >
        <User size={20} />
        <span className="text-[10px] mt-1">Profile</span>
      </NavLink>
    </nav>
  );
};
