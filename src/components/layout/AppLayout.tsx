import React, { ReactNode } from 'react';
import { TopNavigation } from './TopNavigation';
import { SidebarNavigation } from './SidebarNavigation';
import { RightSidebar } from './RightSidebar';
import { MobileBottomNavigation } from './MobileBottomNavigation';
import { ToastContainer } from '../common/ToastContainer';

interface AppLayoutProps {
  children: ReactNode;
  showRightSidebar?: boolean;
  maxWidth?: 'standard' | 'reading' | 'full';
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showRightSidebar = true,
  maxWidth = 'standard',
}) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] flex flex-col antialiased selection:bg-[#EFF6FF] selection:text-[#1E56A0] dark:selection:bg-[#1E293B] dark:selection:text-[#60A5FA] transition-colors">
      <TopNavigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-12">
        <div className="flex gap-8 items-start">
          {/* Left Sidebar */}
          <SidebarNavigation />

          {/* Center Main Content */}
          <div
            className={`flex-1 min-w-0 ${
              maxWidth === 'reading'
                ? 'max-w-3xl mx-auto'
                : maxWidth === 'full'
                ? 'w-full'
                : 'max-w-3xl'
            }`}
          >
            {children}
          </div>

          {/* Right Sidebar (Optional) */}
          {showRightSidebar && <RightSidebar />}
        </div>
      </main>

      <MobileBottomNavigation />
      <ToastContainer />
    </div>
  );
};
