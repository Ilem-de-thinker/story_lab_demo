import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { AuthorAvatar } from '../../components/common/AuthorAvatar';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  MessageSquare,
  UserPlus,
  BookOpen,
  CheckCheck,
  Bell,
  AtSign,
} from 'lucide-react';
import { Notification } from '../../types';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'clap':
        return <Sparkles size={14} className="text-[#EAB308]" />;
      case 'comment':
        return <MessageSquare size={14} className="text-[#2563EB]" />;
      case 'follow':
        return <UserPlus size={14} className="text-[#2563EB]" />;
      case 'mention':
        return <AtSign size={14} className="text-[#2563EB]" />;
      case 'publication':
        return <BookOpen size={14} className="text-[#2563EB]" />;
    }
  };

  return (
    <AppLayout showRightSidebar={true}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E6E0] dark:border-[#272E3B]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-0.5">
              Activity
            </span>
            <h1 className="font-serif-display text-2xl sm:text-3xl text-[#191919] dark:text-[#F3F4F6]">
              Notifications
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter buttons */}
            <div className="inline-flex p-1 bg-[#F1EFEA] dark:bg-[#1E2430] rounded border border-[#E9E6E0] dark:border-[#272E3B]">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  filter === 'all'
                    ? 'bg-[#FFFFFF] dark:bg-[#151A24] text-[#191919] dark:text-white shadow-2xs font-semibold'
                    : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  filter === 'unread'
                    ? 'bg-[#FFFFFF] dark:bg-[#151A24] text-[#191919] dark:text-white shadow-2xs font-semibold'
                    : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
                }`}
              >
                Unread
              </button>
            </div>

            <button
              type="button"
              onClick={markAllNotificationsAsRead}
              className="px-3 py-1.5 text-xs text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white border border-[#E9E6E0] dark:border-[#272E3B] rounded bg-[#FFFFFF] dark:bg-[#151A24] transition-colors inline-flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck size={14} />
              <span className="hidden sm:inline">Mark all read</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-6">
            <Bell size={36} className="text-[#77736E] dark:text-[#9CA3AF] mx-auto mb-2" />
            <h3 className="font-serif-display text-lg text-[#191919] dark:text-[#F3F4F6] mb-1">
              You are completely caught up
            </h3>
            <p className="text-xs text-[#77736E] dark:text-[#9CA3AF]">
              {filter === 'unread'
                ? 'No unread notifications at this time.'
                : 'No notification activity recorded yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-4 rounded-md border transition-all cursor-pointer flex items-start gap-3.5 ${
                  !notif.read
                    ? 'bg-[#FFFFFF] dark:bg-[#151A24] border-[#2563EB]/40 dark:border-[#2563EB]/50 shadow-2xs'
                    : 'bg-[#FAF9F6] dark:bg-[#111620] border-[#E9E6E0] dark:border-[#272E3B]'
                }`}
              >
                <div className="relative">
                  <AuthorAvatar
                    name={notif.actor.name}
                    avatar={notif.actor.avatar}
                    username={notif.actor.username}
                    size="sm"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#FFFFFF] dark:bg-[#1E2430] rounded-full p-0.5 border border-[#E9E6E0] dark:border-[#272E3B] shadow-2xs">
                    {getIcon(notif.type)}
                  </div>
                </div>

                <div className="flex-1 min-w-0 text-xs sm:text-sm">
                  <p className="text-[#191919] dark:text-[#F3F4F6] leading-relaxed">
                    <Link
                      to={`/u/${notif.actor.username}`}
                      className="font-semibold hover:text-[#2563EB] dark:hover:text-[#60A5FA]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {notif.actor.name}
                    </Link>{' '}
                    {notif.type === 'clap' && 'appreciated your dispatch'}
                    {notif.type === 'comment' && 'commented on'}
                    {notif.type === 'follow' && 'began reading your publication'}
                    {notif.type === 'mention' && 'mentioned you in'}
                    {notif.type === 'publication' && 'published a new essay'}
                    {notif.storyTitle && notif.storySlug && (
                      <Link
                        to={`/story/${notif.storySlug}`}
                        className="font-serif text-[#2563EB] dark:text-[#60A5FA] hover:underline ml-1 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        "{notif.storyTitle}"
                      </Link>
                    )}
                  </p>

                  {notif.message && (
                    <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] mt-1 italic pl-2 border-l border-[#E9E6E0] dark:border-[#272E3B]">
                      {notif.message}
                    </p>
                  )}

                  <span className="text-[11px] text-[#77736E] dark:text-[#9CA3AF] mt-1.5 block">
                    {notif.createdAt}
                  </span>
                </div>

                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-[#EAB308] shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};
