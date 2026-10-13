import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { StoryPreview } from '../../components/story/StoryPreview';
import { StatusTray } from '../../components/status/StatusTray';
import { useApp } from '../../context/AppContext';
import { PenTool, Sparkles, Filter } from 'lucide-react';
import { Story } from '../../types';

export const MainFeedPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'for-you';
  const { stories, followedAuthorIds } = useApp();

  const [visibleCount, setVisibleCount] = useState(6);

  // Filter based on tab
  const filteredStories = stories.filter((story) => {
    if (activeTab === 'following') {
      return followedAuthorIds.includes(story.authorId);
    }
    return true; // For You shows curated feed
  });

  const featuredLeadStory = filteredStories.find((s) => s.coverImage && s.format === 'featured') || filteredStories[0];
  const regularStories = filteredStories.filter((s) => s.id !== featuredLeadStory?.id);

  const displayedStories = regularStories.slice(0, visibleCount);
  const hasMore = regularStories.length > visibleCount;

  const handleTabChange = (tab: 'for-you' | 'following') => {
    setSearchParams(tab === 'for-you' ? {} : { tab });
    setVisibleCount(6);
  };

  return (
    <AppLayout showRightSidebar={true}>
      <div className="space-y-6">
        {/* Writers' Daily Dispatches Status Tray */}
        <StatusTray />

        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E6E0] dark:border-[#272E3B]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-0.5">
              Curated Reader
            </span>
            <h1 className="font-serif-display text-2xl sm:text-3xl text-[#191919] dark:text-[#F3F4F6]">
              The Daily Dispatch
            </h1>
          </div>

          {/* Interactive Filter Control Tabs */}
          <div className="inline-flex p-1 bg-[#F1EFEA] dark:bg-[#1E2430] rounded border border-[#E9E6E0] dark:border-[#272E3B] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleTabChange('for-you')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeTab === 'for-you'
                  ? 'bg-[#FFFFFF] dark:bg-[#151A24] text-[#191919] dark:text-white shadow-2xs font-semibold'
                  : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
              }`}
            >
              For You
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('following')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeTab === 'following'
                  ? 'bg-[#FFFFFF] dark:bg-[#151A24] text-[#191919] dark:text-white shadow-2xs font-semibold'
                  : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
              }`}
            >
              Following ({followedAuthorIds.length})
            </button>
          </div>
        </div>

        {/* Following Empty State */}
        {activeTab === 'following' && filteredStories.length === 0 && (
          <div className="text-center py-16 px-4 bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md">
            <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6] mb-2">
              No recent dispatches from followed writers
            </h3>
            <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] max-w-sm mx-auto mb-6">
              You aren't following any authors with recent stories yet. Discover new voices in Explore or switch to the For You tab.
            </p>
            <button
              type="button"
              onClick={() => handleTabChange('for-you')}
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] rounded hover:bg-[#1D4ED8] transition-colors"
            >
              Switch to For You
            </button>
          </div>
        )}

        {/* Lead Featured Story (Format B: Wide rectangular landscape) */}
        {featuredLeadStory && (
          <StoryPreview
            story={featuredLeadStory}
            layout="featured"
          />
        )}

        {/* Editorial Feed: Interleaving different formats (Format A horizontal, Format C text-only, Format D grid) */}
        <div className="space-y-4">
          {displayedStories.map((story, index) => {
            // Editorial layout variety:
            // Every 4th story with cover can be shown in grid or horizontal, text-only stays text-only
            let layout: 'horizontal' | 'text-only' | 'grid' = 'horizontal';
            if (!story.coverImage || story.format === 'text-only') {
              layout = 'text-only';
            } else if (story.format === 'grid' || index % 5 === 2) {
              layout = 'horizontal';
            }

            return (
              <StoryPreview
                key={story.id}
                story={story}
                layout={layout}
              />
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="pt-8 text-center border-t border-[#E9E6E0]">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-6 py-2.5 text-xs uppercase tracking-wider font-medium text-[#191919] bg-[#FFFFFF] border border-[#E9E6E0] hover:bg-[#F1EFEA] rounded transition-colors"
            >
              Load More Dispatches
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
