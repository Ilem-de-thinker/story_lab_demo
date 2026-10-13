import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { StoryPreview } from '../../components/story/StoryPreview';
import { AuthorAvatar } from '../../components/common/AuthorAvatar';
import { FollowButton } from '../../components/common/FollowButton';
import { useApp } from '../../context/AppContext';
import { Search, Compass, X, Sparkles, BookOpen } from 'lucide-react';
import { MOCK_TOPICS } from '../../data/mockData';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTopic = searchParams.get('topic') || '';
  const initialTab = searchParams.get('tab') || 'stories';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [activeTab, setActiveTab] = useState<'stories' | 'writers' | 'collections'>(
    initialTab === 'writers' ? 'writers' : 'stories'
  );

  const { stories, authors, currentUser } = useApp();

  // Search and filter logic
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesTopic = selectedTopic
        ? story.topic.toLowerCase().includes(selectedTopic.toLowerCase()) ||
          story.tags.some((t) => t.toLowerCase().includes(selectedTopic.toLowerCase()))
        : true;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = q
        ? story.title.toLowerCase().includes(q) ||
          story.excerpt.toLowerCase().includes(q) ||
          story.author.name.toLowerCase().includes(q) ||
          story.topic.toLowerCase().includes(q)
        : true;

      return matchesTopic && matchesSearch;
    });
  }, [stories, selectedTopic, searchQuery]);

  const filteredAuthors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return authors.filter((author) => {
      if (author.id === currentUser.id) return false;
      if (!q) return true;
      return (
        author.name.toLowerCase().includes(q) ||
        author.username.toLowerCase().includes(q) ||
        author.bio.toLowerCase().includes(q)
      );
    });
  }, [authors, searchQuery, currentUser]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTopic('');
    setSearchParams({});
  };

  return (
    <AppLayout showRightSidebar={true} maxWidth="standard">
      <div className="space-y-8">
        {/* Header & Search */}
        <div className="space-y-4">
          <div className="border-b border-[#E9E6E0] dark:border-[#272E3B] pb-4">
            <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-0.5">
              The Literary Index
            </span>
            <h1 className="font-serif-display text-3xl sm:text-4xl text-[#191919] dark:text-[#F3F4F6]">
              Explore & Discover
            </h1>
            <p className="text-xs sm:text-sm text-[#77736E] dark:text-[#9CA3AF] mt-1">
              Search essays, discover new authors, and browse curated archives.
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3.5 top-3 text-[#77736E] dark:text-[#9CA3AF] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, topic, excerpt, or writer..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] text-[#191919] dark:text-[#F3F4F6] rounded focus:outline-none focus:border-[#2563EB] dark:focus:border-[#60A5FA] transition-colors shadow-2xs placeholder-[#77736E] dark:placeholder-[#6B7280]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Suggestion Keywords */}
          {!searchQuery && (
            <div className="flex items-center gap-2 text-xs text-[#77736E] dark:text-[#9CA3AF]">
              <span className="shrink-0 font-medium text-[#191919] dark:text-[#F3F4F6]">Suggestions:</span>
              <div className="flex flex-wrap gap-1.5">
                {['African Technology', 'Starting Again', 'Code', 'Solitude', 'Prose'].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSearchQuery(term)}
                      className="hover:text-[#2563EB] dark:hover:text-[#60A5FA] hover:underline"
                    >
                      {term}
                      <span className="text-[#E9E6E0] dark:text-[#272E3B] ml-1.5" aria-hidden="true">·</span>
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Topic Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedTopic('')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                !selectedTopic
                  ? 'bg-[#191919] dark:bg-white text-[#FAF9F6] dark:text-[#111827]'
                  : 'bg-[#F1EFEA] dark:bg-[#1E2430] text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
              }`}
            >
              All Topics
            </button>
            {MOCK_TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTopic(t.name === selectedTopic ? '' : t.name)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                  selectedTopic === t.name
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-[#F1EFEA] dark:bg-[#1E2430] text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Tabs: Stories / Writers / Editorial Collections */}
          <div className="flex items-center gap-6 border-b border-[#E9E6E0] dark:border-[#272E3B] text-sm">
            <button
              type="button"
              onClick={() => setActiveTab('stories')}
              className={`pb-3 font-medium transition-colors relative ${
                activeTab === 'stories'
                  ? 'text-[#191919] dark:text-[#F3F4F6] font-semibold'
                  : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
              }`}
            >
              Stories ({filteredStories.length})
              {activeTab === 'stories' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('writers')}
              className={`pb-3 font-medium transition-colors relative ${
                activeTab === 'writers'
                  ? 'text-[#191919] dark:text-[#F3F4F6] font-semibold'
                  : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
              }`}
            >
              Writers ({filteredAuthors.length})
              {activeTab === 'writers' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('collections')}
              className={`pb-3 font-medium transition-colors relative ${
                activeTab === 'collections'
                  ? 'text-[#191919] dark:text-[#F3F4F6] font-semibold'
                  : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
              }`}
            >
              Editorial Collections
              {activeTab === 'collections' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
              )}
            </button>
          </div>
        </div>

        {/* Content based on Tab */}
        {activeTab === 'stories' && (
          <div>
            {filteredStories.length === 0 ? (
              <div className="text-center py-16 bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md px-4">
                <Compass size={36} className="text-[#77736E] dark:text-[#9CA3AF] mx-auto mb-3" />
                <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6] mb-1">
                  No dispatches matched your inquiry
                </h3>
                <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] max-w-sm mx-auto mb-4">
                  Try adjusting your query, clearing topic filters, or searching for broader terms.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStories.map((story, idx) => (
                  <StoryPreview
                    key={story.id}
                    story={story}
                    layout={idx === 0 && !searchQuery ? 'featured' : 'horizontal'}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'writers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAuthors.map((author) => (
              <div
                key={author.id}
                className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <AuthorAvatar
                      name={author.name}
                      avatar={author.avatar}
                      username={author.username}
                      size="md"
                    />
                    <FollowButton authorId={author.id} size="sm" />
                  </div>
                  <Link
                    to={`/u/${author.username}`}
                    className="font-serif-display text-lg text-[#191919] dark:text-[#F3F4F6] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors block"
                  >
                    {author.name}
                  </Link>
                  <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] mt-1 line-clamp-2 leading-relaxed">
                    {author.bio}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E9E6E0] dark:border-[#272E3B] mt-4 flex items-center justify-between text-xs text-[#77736E] dark:text-[#9CA3AF]">
                  <span>{author.followersCount.toLocaleString()} followers</span>
                  <span aria-hidden="true">·</span>
                  <span>{author.publishedCount} essays</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Editorial Collections (STRICTLY RECTANGULAR PREVIEWS!) */}
        {activeTab === 'collections' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md overflow-hidden group">
                <div className="aspect-[16/9] overflow-hidden bg-[#F1EFEA] dark:bg-[#1E2430]">
                  <img
                    src="/assets/images/story_african_tech_1791912314761.jpg"
                    alt="African tech collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs text-[#2563EB] dark:text-[#60A5FA] font-medium mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
                    Curated Volume I
                  </div>
                  <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6] mb-1.5">
                    The Nairobi & Accra Technologists
                  </h3>
                  <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] leading-relaxed line-clamp-2 mb-4">
                    Essays on distributed protocols, local solar grids, and the digital sovereignty of the continent.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedTopic('African Technology');
                      setActiveTab('stories');
                    }}
                    className="text-xs uppercase tracking-wider text-[#2563EB] dark:text-[#60A5FA] font-semibold hover:underline"
                  >
                    View Selected Stories →
                  </button>
                </div>
              </div>

              <div className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md overflow-hidden group">
                <div className="aspect-[16/9] overflow-hidden bg-[#F1EFEA] dark:bg-[#1E2430]">
                  <img
                    src="/assets/images/story_ideas_time_1791912316437.jpg"
                    alt="Letterpress and slow writing"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs text-[#2563EB] dark:text-[#60A5FA] font-medium mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
                    Curated Volume II
                  </div>
                  <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6] mb-1.5">
                    The Monastic Practice of Prose
                  </h3>
                  <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] leading-relaxed line-clamp-2 mb-4">
                    Reflections on setting movable lead type, rewriting opening paragraphs, and the ethics of patience.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedTopic('The Craft of Writing');
                      setActiveTab('stories');
                    }}
                    className="text-xs uppercase tracking-wider text-[#2563EB] dark:text-[#60A5FA] font-semibold hover:underline"
                  >
                    View Selected Stories →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
