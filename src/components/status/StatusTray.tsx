import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AuthorAvatar } from '../common/AuthorAvatar';
import { Plus, Sparkles } from 'lucide-react';
import { StatusViewerModal } from './StatusViewerModal';
import { CreateStatusModal } from './CreateStatusModal';

export const StatusTray: React.FC = () => {
  const { statuses, currentUser } = useApp();
  const [activeViewerIndex, setActiveViewerIndex] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
          <h3 className="font-serif-display text-base text-[#191919] dark:text-[#F3F4F6]">
            Writers' Daily Dispatches
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] hover:underline inline-flex items-center gap-1"
        >
          <Plus size={13} />
          <span>New Dispatch</span>
        </button>
      </div>

      {/* Horizontally scrollable rectangular tray */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
        {/* Card 1: Add New Status (Strictly Rectangular!) */}
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="w-28 sm:w-32 aspect-[3/4] shrink-0 rounded-md border-2 border-dashed border-[#2563EB]/40 hover:border-[#2563EB] bg-[#EFF6FF]/50 dark:bg-[#1E293B]/40 p-3 flex flex-col items-center justify-center text-center transition-all group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 transition-transform">
            <Plus size={20} />
          </div>
          <span className="font-semibold text-xs text-[#191919] dark:text-[#F3F4F6] block leading-tight">
            Post Status
          </span>
          <span className="text-[10px] text-[#77736E] dark:text-[#9CA3AF] mt-0.5">
            24h thought
          </span>
        </button>

        {/* Existing Statuses (Strictly Rectangular Cards 3:4 aspect ratio!) */}
        {statuses.map((status, index) => (
          <div
            key={status.id}
            onClick={() => setActiveViewerIndex(index)}
            className="w-28 sm:w-32 aspect-[3/4] shrink-0 rounded-md relative overflow-hidden p-2.5 flex flex-col justify-between text-white cursor-pointer group shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 border border-[#E9E6E0] dark:border-[#272E3B]"
          >
            {/* Background image or gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${
                status.bgGradient || 'from-blue-900 to-indigo-950'
              }`}
            />
            {status.imageUrl && (
              <img
                src={status.imageUrl}
                alt={status.author.name}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

            {/* Author Avatar (Circular avatar allowed for humans) */}
            <div className="relative z-10 flex items-center gap-1.5">
              <div className="rounded-full ring-2 ring-[#2563EB] overflow-hidden">
                <AuthorAvatar
                  name={status.author.name}
                  avatar={status.author.avatar}
                  size="xs"
                  clickable={false}
                />
              </div>
            </div>

            {/* Bottom info */}
            <div className="relative z-10 space-y-0.5">
              <p className="font-serif text-[11px] leading-snug line-clamp-2 text-white/95">
                "{status.text}"
              </p>
              <div className="flex items-center justify-between text-[9px] text-white/70 pt-0.5">
                <span className="font-medium truncate">{status.author.name.split(' ')[0]}</span>
                <span>{status.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Viewer Modal */}
      <StatusViewerModal
        statuses={statuses}
        initialIndex={activeViewerIndex ?? 0}
        isOpen={activeViewerIndex !== null}
        onClose={() => setActiveViewerIndex(null)}
      />

      {/* Create Modal */}
      <CreateStatusModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};
