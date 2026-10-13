import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { TopNavigation } from './TopNavigation';
import { ToastContainer } from '../common/ToastContainer';
import { Feather, ArrowUpRight } from 'lucide-react';

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] flex flex-col antialiased selection:bg-[#EFF6FF] selection:text-[#1E56A0] transition-colors">
      <TopNavigation isPublic />

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[#E9E6E0] dark:border-[#232A38] bg-[#FFFFFF] dark:bg-[#151A24] py-16 text-[#77736E] dark:text-[#9CA3AF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-editorial text-3xl text-[#191919] dark:text-[#F3F4F6] tracking-tight block">
                  Quillora
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
              </div>
              <p className="text-sm max-w-sm leading-relaxed text-[#77736E] dark:text-[#9CA3AF]">
                A digital sanctuary designed for the craft of writing and the pleasure of deep reading. Free of sensationalist clickbait and ephemeral outrage.
              </p>
              <p className="text-xs text-[#77736E] dark:text-[#6B7280]">
                Edinburgh · Nairobi · Stockholm · Oxford
              </p>
            </div>

            <div>
              <h4 className="font-serif-display text-sm text-[#191919] dark:text-[#F3F4F6] uppercase tracking-wider mb-3">
                Publication
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/explore" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    Explore Stories
                  </Link>
                </li>
                <li>
                  <Link to="/explore?tab=writers" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    Featured Writers
                  </Link>
                </li>
                <li>
                  <Link to="/feed" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    The Reader Feed
                  </Link>
                </li>
                <li>
                  <Link to="/write" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    Writing Studio
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif-display text-sm text-[#191919] dark:text-[#F3F4F6] uppercase tracking-wider mb-3">
                Community
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/signup" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    Join the Guild
                  </Link>
                </li>
                <li>
                  <a href="#manifesto" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    Editorial Manifesto
                  </a>
                </li>
                <li>
                  <a href="#guidelines" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <Link to="/onboarding" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    Writer Onboarding
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif-display text-sm text-[#191919] dark:text-[#F3F4F6] uppercase tracking-wider mb-3">
                Platform
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    About Quillora
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#help" className="hover:text-[#191919] dark:hover:text-white transition-colors">
                    Help & Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E9E6E0] dark:border-[#232A38] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77736E] dark:text-[#6B7280]">
            <p>© 2026 Quillora Inc. Designed for thoughtful writers and readers worldwide.</p>
            <div className="flex items-center gap-6">
              <span>Instrument Serif & DM Serif Typography</span>
              <span aria-hidden="true">·</span>
              <span>Independent Platform</span>
            </div>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};
