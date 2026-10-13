import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { StoryPreview } from '../components/story/StoryPreview';
import { AuthorAvatar } from '../components/common/AuthorAvatar';
import { FollowButton } from '../components/common/FollowButton';
import { useApp } from '../context/AppContext';
import { ArrowRight, Compass } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { stories, authors } = useApp();

  const featuredStory = stories.find((s) => s.id === 'story-african-tech') || stories[0];
  const secondaryStories = stories.filter((s) => s.id !== featuredStory.id).slice(0, 3);
  const popularStories = [...stories].sort((a, b) => b.clapsCount - a.clapsCount).slice(0, 4);
  const featuredWriters = authors.slice(1, 5);

  const categories = [
    {
      title: 'Essays & Nonfiction',
      desc: 'Deep long-form arguments, memoirs, and cultural criticism.',
      count: '420+ essays',
      slug: 'creative-nonfiction',
    },
    {
      title: 'African Technology',
      desc: 'Autonomous engineering, local infrastructure, and communal systems.',
      count: '110+ pieces',
      slug: 'african-technology',
    },
    {
      title: 'The Craft of Writing',
      desc: 'Discipline, manuscript revision, style, and literary architecture.',
      count: '315+ reflections',
      slug: 'the-craft-of-writing',
    },
    {
      title: 'Philosophy & Mind',
      desc: 'Slow cognition, quiet ethics, and the art of deliberate thinking.',
      count: '180+ treatises',
      slug: 'philosophy-of-mind',
    },
    {
      title: 'Poetry & Translation',
      desc: 'Verse, cadence, and cross-linguistic meaning preservation.',
      count: '240+ poems',
      slug: 'poetry-and-translation',
    },
    {
      title: 'Digital Craftsmanship',
      desc: 'Engineering with prose clarity and philosophical restraint.',
      count: '195+ stories',
      slug: 'digital-craftsmanship',
    },
  ];

  return (
    <PublicLayout>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#E9E6E0] dark:border-[#272E3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold">
                An Independent Publication Network
              </span>
              <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl text-[#191919] dark:text-[#F3F4F6] leading-[1.05] tracking-tight text-balance">
                Your words deserve a world of their own.
              </h1>
              <p className="text-lg sm:text-xl text-[#77736E] dark:text-[#9CA3AF] max-w-xl font-normal leading-relaxed">
                A home for writers to share their stories, discover remarkable voices, and build a community around the enduring power of words.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/signup"
                  className="px-6 py-3 text-sm uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-all duration-150 inline-flex items-center gap-2"
                >
                  <span>Start Writing</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/explore"
                  className="px-6 py-3 text-sm uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6] bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430] rounded transition-colors inline-flex items-center gap-2"
                >
                  <Compass size={16} className="text-[#2563EB] dark:text-[#60A5FA]" />
                  <span>Explore Stories</span>
                </Link>
              </div>

              {/* Zero-pill metadata proof */}
              <div className="pt-6 border-t border-[#E9E6E0] dark:border-[#272E3B] flex items-center gap-6 text-xs text-[#77736E] dark:text-[#9CA3AF]">
                <span>24,000+ essays published</span>
                <span aria-hidden="true">·</span>
                <span>Zero algorithmic rage bait</span>
                <span aria-hidden="true">·</span>
                <span>Distraction-free typography</span>
              </div>
            </div>

            {/* Right Column: Premium Rectangular Editorial Composition (Never circular!) */}
            <div className="lg:col-span-5">
              <div className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-lg p-5 shadow-sm space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded bg-[#F1EFEA] dark:bg-[#161B24] border border-[#E9E6E0] dark:border-[#272E3B]">
                  <img
                    src="/assets/images/hero_editorial_desk_1791912314353.jpg"
                    alt="Author study workspace"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#191919]/90 text-white text-[11px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-xs">
                    Editor's Selection
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#77736E] dark:text-[#9CA3AF]">
                    <span className="text-[#2563EB] dark:text-[#60A5FA] font-medium">The Craft of Writing</span>
                    <span aria-hidden="true">·</span>
                    <span>5 min read</span>
                  </div>
                  <h3 className="font-serif-display text-2xl text-[#191919] dark:text-[#F3F4F6] leading-snug">
                    The Quiet Discipline of Starting Again
                  </h3>
                  <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] leading-relaxed line-clamp-2">
                    Every serious writer knows the sudden chill of page forty-two: the moment when the incandescent certainty burns down to gray embers...
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E9E6E0] dark:border-[#272E3B] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <AuthorAvatar
                      name="Elena Rostova"
                      avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80"
                      size="xs"
                    />
                    <span className="font-medium text-[#191919] dark:text-[#F3F4F6]">Elena Rostova</span>
                  </div>
                  <Link
                    to="/story/the-quiet-discipline-of-starting-again"
                    className="text-[#2563EB] dark:text-[#60A5FA] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    Read Story
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Stories (Wide rectangular compositions) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E9E6E0] dark:border-[#272E3B]">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10 pb-4 border-b border-[#E9E6E0] dark:border-[#272E3B]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-1">
              Curated Prose
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#191919] dark:text-[#F3F4F6]">
              Featured Stories
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA] hover:text-[#1D4ED8] dark:hover:text-[#93C5FD] inline-flex items-center gap-1 mt-2 sm:mt-0"
          >
            Browse all stories <ArrowRight size={14} />
          </Link>
        </div>

        {/* Lead Featured Story (Format B: Wide rectangular landscape) */}
        <div className="mb-14">
          <StoryPreview story={featuredStory} layout="featured" />
        </div>

        {/* Secondary Stories Grid (All Rectangular Previews!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {secondaryStories.map((story) => (
            <StoryPreview key={story.id} story={story} layout="grid" />
          ))}
        </div>
      </section>

      {/* 3. Discover Your Community / Topics */}
      <section className="py-20 bg-[#F1EFEA] dark:bg-[#111622] border-b border-[#E9E6E0] dark:border-[#272E3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-1">
              Communities of Inquiry
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#191919] dark:text-[#F3F4F6] mb-3">
              Discover Your Community
            </h2>
            <p className="text-sm sm:text-base text-[#77736E] dark:text-[#9CA3AF] leading-relaxed">
              From speculative prose to computational systems, explore deep conversations curated by domain writers who respect nuance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={`/explore?topic=${encodeURIComponent(cat.slug)}`}
                className="group bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-6 transition-all duration-150 hover:shadow-xs hover:border-[#2563EB] dark:hover:border-[#3B82F6]"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                    {cat.title}
                  </h3>
                  <ArrowRight
                    size={16}
                    className="text-[#77736E] dark:text-[#9CA3AF] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] group-hover:translate-x-1 transition-all"
                  />
                </div>
                <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] leading-relaxed mb-4">
                  {cat.desc}
                </p>
                <div className="text-[11px] font-medium text-[#2563EB] dark:text-[#60A5FA]">
                  {cat.count}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Meet the Writers (Circular avatars permitted, accompanying story previews RECTANGULAR!) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E9E6E0] dark:border-[#272E3B]">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12 pb-4 border-b border-[#E9E6E0] dark:border-[#272E3B]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-1">
              The Horizon Guild
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#191919] dark:text-[#F3F4F6]">
              Meet the Writers
            </h2>
          </div>
          <Link
            to="/explore?tab=writers"
            className="text-sm font-medium text-[#2563EB] dark:text-[#60A5FA] hover:text-[#1D4ED8] dark:hover:text-[#93C5FD] inline-flex items-center gap-1 mt-2 sm:mt-0"
          >
            Explore all authors <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWriters.map((author) => {
            const authorStory = stories.find((s) => s.authorId === author.id);
            return (
              <div
                key={author.id}
                className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Human avatar: circular */}
                    <AuthorAvatar
                      name={author.name}
                      avatar={author.avatar}
                      username={author.username}
                      size="lg"
                    />
                    <FollowButton authorId={author.id} size="sm" />
                  </div>
                  <Link
                    to={`/u/${author.username}`}
                    className="block font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors mb-1"
                  >
                    {author.name}
                  </Link>
                  <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] leading-relaxed line-clamp-3 mb-4">
                    {author.bio}
                  </p>
                </div>

                {/* Accompanying story preview: STRICTLY RECTANGULAR THUMBNAIL */}
                {authorStory && (
                  <div className="pt-4 border-t border-[#E9E6E0] dark:border-[#272E3B]">
                    <span className="text-[10px] uppercase tracking-wider text-[#77736E] dark:text-[#9CA3AF] block mb-2">
                      Recent Piece
                    </span>
                    <Link
                      to={`/story/${authorStory.slug}`}
                      className="group/story flex items-center gap-2.5"
                    >
                      {authorStory.coverImage && (
                        <div className="w-14 h-10 shrink-0 overflow-hidden rounded bg-[#F1EFEA] dark:bg-[#161B24] border border-[#E9E6E0] dark:border-[#272E3B]">
                          <img
                            src={authorStory.coverImage}
                            alt={authorStory.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <p className="text-xs font-medium text-[#191919] dark:text-[#F3F4F6] group-hover/story:text-[#2563EB] dark:group-hover/story:text-[#60A5FA] transition-colors line-clamp-2 leading-snug">
                        {authorStory.title}
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="py-20 bg-[#FFFFFF] dark:bg-[#0E121A] border-b border-[#E9E6E0] dark:border-[#272E3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-1">
              The Architecture
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#191919] dark:text-[#F3F4F6] mb-3">
              How Quillora Works
            </h2>
            <p className="text-sm sm:text-base text-[#77736E] dark:text-[#9CA3AF]">
              Designed from the blank page up to eliminate noise, honor pacing, and reward long-form clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <span className="font-serif-display text-4xl text-[#2563EB] dark:text-[#60A5FA]">01.</span>
              <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6]">Write in Sanctuary</h3>
              <p className="text-xs sm:text-sm text-[#77736E] dark:text-[#9CA3AF] leading-relaxed">
                A clean, distraction-free TipTap editor crafted for the quiet rhythm of paragraphs, drafts, and autosaved manuscripts.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-serif-display text-4xl text-[#2563EB] dark:text-[#60A5FA]">02.</span>
              <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6]">Publish Freely</h3>
              <p className="text-xs sm:text-sm text-[#77736E] dark:text-[#9CA3AF] leading-relaxed">
                Release your stories with wide rectangular editorial banners, unboxed metadata, and custom tags directly to your personal publication.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-serif-display text-4xl text-[#2563EB] dark:text-[#60A5FA]">03.</span>
              <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6]">Deep Discovery</h3>
              <p className="text-xs sm:text-sm text-[#77736E] dark:text-[#9CA3AF] leading-relaxed">
                Readers discover essays through intentional topic archives and reader recommendations, not manipulative doom-scrolling feeds.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-serif-display text-4xl text-[#2563EB] dark:text-[#60A5FA]">04.</span>
              <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6]">Meaningful Dialogue</h3>
              <p className="text-xs sm:text-sm text-[#77736E] dark:text-[#9CA3AF] leading-relaxed">
                Engage in thoughtful, civil marginalia, nested replies, and direct author discussions without character-limit shouting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Popular This Week */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E9E6E0] dark:border-[#272E3B]">
        <div className="mb-10 pb-4 border-b border-[#E9E6E0] dark:border-[#272E3B]">
          <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-1">
            Weekly Reading List
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-[#191919] dark:text-[#F3F4F6]">
            Popular This Week
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {popularStories.map((story) => (
            <StoryPreview key={story.id} story={story} layout="horizontal" />
          ))}
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="py-24 bg-[#FAF9F6] dark:bg-[#111622] text-center border-t border-[#E9E6E0] dark:border-[#272E3B]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold">
            Begin Your Chapter
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#191919] dark:text-[#F3F4F6] leading-tight">
            The page is quiet. The reader is waiting.
          </h2>
          <p className="text-base sm:text-lg text-[#77736E] dark:text-[#9CA3AF] leading-relaxed">
            Join thousands of writers, poets, and storytellers who chose depth over brevity.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3.5 text-sm uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-all duration-150 inline-flex items-center gap-2"
            >
              <span>Create Free Account</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/feed"
              className="px-8 py-3.5 text-sm uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6] bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430] rounded transition-colors"
            >
              Open Reader Feed
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
