import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { StoryPreview } from '../../components/story/StoryPreview';
import { useApp } from '../../context/AppContext';
import { Bookmark, Search, Compass } from 'lucide-react';

export const BookmarksPage: React.FC = () => {
  const { stories, toggleBookmark } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const bookmarkedStories = stories.filter((s) => s.isBookmarked);

  // Available topics among bookmarks
  const topics = Array.from(new Set(bookmarkedStories.map((s) => s.topic)));

  const filtered = bookmarkedStories.filter((s) => {
    const matchesTopic = selectedTopic ? s.topic === selectedTopic : true;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = q
      ? s.title.toLowerCase().includes(q) || s.author.name.toLowerCase().includes(q)
      : true;
    return matchesTopic && matchesSearch;
  });

  return (
    <AppLayout showRightSidebar={true}>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-[#E9E6E0] dark:border-[#272E3B] pb-4">
          <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-0.5">
            Personal Library
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl text-[#191919] dark:text-[#F3F4F6]">
            Saved Dispatches ({bookmarkedStories.length})
          </h1>
          <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] mt-1">
            Essays and stories saved for your quiet afternoon reading.
          </p>
        </div>

        {/* Search and Topic Filters */}
        {bookmarkedStories.length > 0 && (
          <div className="space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-3 text-[#77736E] dark:text-[#9CA3AF]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved dispatches..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] text-[#191919] dark:text-[#F3F4F6] rounded focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            {topics.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setSelectedTopic('')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    !selectedTopic
                      ? 'bg-[#191919] dark:bg-white text-[#FAF9F6] dark:text-[#111827]'
                      : 'bg-[#F1EFEA] dark:bg-[#1E2430] text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
                  }`}
                >
                  All ({bookmarkedStories.length})
                </button>
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTopic(t === selectedTopic ? '' : t)}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      selectedTopic === t
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'bg-[#F1EFEA] dark:bg-[#1E2430] text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stories list (All rectangular or text-only) */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-6">
            <Bookmark size={36} className="text-[#77736E] dark:text-[#9CA3AF] mx-auto mb-2" />
            <h3 className="font-serif-display text-lg text-[#191919] dark:text-[#F3F4F6] mb-1">
              Your library is empty
            </h3>
            <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] max-w-sm mx-auto mb-4">
              {searchQuery
                ? 'No saved stories matched your search.'
                : 'Save essays while browsing the feed or explore page to read them anytime.'}
            </p>
            <Link
              to="/explore"
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded inline-flex items-center gap-1.5 transition-colors"
            >
              <Compass size={13} />
              <span>Explore Dispatches</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((story) => (
              <StoryPreview
                key={story.id}
                story={story}
                layout="horizontal"
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};
