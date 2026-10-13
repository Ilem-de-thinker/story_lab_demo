import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AuthorAvatar } from '../common/AuthorAvatar';
import { FollowButton } from '../common/FollowButton';
import { WRITING_PROMPT_OF_THE_DAY } from '../../data/mockData';
import { PenTool, TrendingUp, Sparkles } from 'lucide-react';

export const RightSidebar: React.FC = () => {
  const { authors, stories, currentUser } = useApp();

  // Recommended writers (excluding current user)
  const recommendedWriters = authors
    .filter((a) => a.id !== currentUser.id)
    .slice(0, 4);

  // Popular stories (highest claps)
  const popularStories = [...stories]
    .sort((a, b) => b.clapsCount - a.clapsCount)
    .slice(0, 3);

  // Trending topics
  const topics = [
    { name: 'African Technology', count: 89 },
    { name: 'The Craft of Writing', count: 142 },
    { name: 'Philosophy of Mind', count: 98 },
    { name: 'Digital Craftsmanship', count: 114 },
    { name: 'Creative Nonfiction', count: 210 },
  ];

  return (
    <aside className="w-80 shrink-0 hidden xl:block sticky top-24 self-start space-y-8 pl-6 border-l border-[#E9E6E0] dark:border-[#232A38]">
      {/* Writing Prompt of the Day */}
      <div className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-5 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2563EB] dark:text-[#60A5FA] mb-2">
          <Sparkles size={14} className="text-[#EAB308]" />
          <span>Writing Prompt</span>
        </div>
        <h4 className="font-serif-display text-lg text-[#191919] dark:text-[#F3F4F6] mb-1.5">
          {WRITING_PROMPT_OF_THE_DAY.title}
        </h4>
        <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] leading-relaxed mb-4">
          {WRITING_PROMPT_OF_THE_DAY.prompt}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-[#E9E6E0] dark:border-[#272E3B]">
          <span className="text-[11px] text-[#77736E] dark:text-[#9CA3AF]">
            {WRITING_PROMPT_OF_THE_DAY.contributionsCount} responses
          </span>
          <Link
            to="/write"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] hover:underline transition-colors"
          >
            <PenTool size={12} />
            <span>Respond</span>
          </Link>
        </div>
      </div>

      {/* Recommended Writers */}
      <div>
        <h3 className="font-serif-display text-base text-[#191919] dark:text-[#F3F4F6] mb-4">
          Voices to Read
        </h3>
        <div className="space-y-4">
          {recommendedWriters.map((author) => (
            <div key={author.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <AuthorAvatar
                  name={author.name}
                  avatar={author.avatar}
                  username={author.username}
                  size="sm"
                />
                <div className="min-w-0">
                  <Link
                    to={`/u/${author.username}`}
                    className="block text-sm font-medium text-[#191919] dark:text-[#F3F4F6] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors truncate"
                  >
                    {author.name}
                  </Link>
                  <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] truncate max-w-[140px]">
                    {author.bio}
                  </p>
                </div>
              </div>
              <FollowButton authorId={author.id} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Trending Stories with RECTANGULAR thumbnails */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={15} className="text-[#2563EB] dark:text-[#60A5FA]" />
          <h3 className="font-serif-display text-base text-[#191919] dark:text-[#F3F4F6]">
            Popular This Week
          </h3>
        </div>
        <div className="space-y-4">
          {popularStories.map((story, idx) => (
            <Link
              key={story.id}
              to={`/story/${story.slug}`}
              className="group flex items-start gap-3"
            >
              <span className="font-serif-display text-lg text-[#E9E6E0] dark:text-[#2A3142] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors shrink-0 w-4">
                0{idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#191919] dark:text-[#F3F4F6] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors line-clamp-2 leading-snug">
                  {story.title}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#77736E] dark:text-[#9CA3AF] mt-1">
                  <span>{story.author.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>{story.readingTimeMinutes}m</span>
                </div>
              </div>
              {/* Strictly rectangular thumbnail */}
              {story.coverImage && (
                <div className="w-14 h-10 shrink-0 overflow-hidden rounded bg-[#F1EFEA] dark:bg-[#161B24] border border-[#E9E6E0] dark:border-[#272E3B]">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div>
        <h3 className="font-serif-display text-base text-[#191919] dark:text-[#F3F4F6] mb-3">
          Explore Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Link
              key={topic.name}
              to={`/explore?topic=${encodeURIComponent(topic.name)}`}
              className="text-xs text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white hover:bg-[#EFF6FF] dark:hover:bg-[#1E293B] px-2.5 py-1 rounded bg-[#F1EFEA] dark:bg-[#1B212D] transition-colors"
            >
              {topic.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Editorial Footer Links */}
      <div className="pt-4 border-t border-[#E9E6E0] dark:border-[#232A38] text-[11px] text-[#77736E] dark:text-[#9CA3AF] space-y-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <Link to="/" className="hover:underline">About</Link>
          <Link to="/" className="hover:underline">Manifesto</Link>
          <Link to="/" className="hover:underline">Guild</Link>
          <Link to="/" className="hover:underline">Privacy</Link>
          <Link to="/" className="hover:underline">Terms</Link>
        </div>
        <p>© 2026 Quillora Publishing Network. All words reserved.</p>
      </div>
    </aside>
  );
};
