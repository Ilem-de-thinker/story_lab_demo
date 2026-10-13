import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Story, ReactionType } from '../../types';
import { AuthorAvatar } from '../common/AuthorAvatar';
import { ReactionButton } from '../common/ReactionButton';
import { BookmarkButton } from '../common/BookmarkButton';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Share2, Send, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface StoryPreviewProps {
  story: Story;
  layout?: 'horizontal' | 'featured' | 'text-only' | 'grid' | 'compact';
  showAuthor?: boolean;
}

export const StoryPreview: React.FC<StoryPreviewProps> = ({
  story,
  layout = 'horizontal',
  showAuthor = true,
}) => {
  const {
    toggleClap,
    setStoryReaction,
    toggleBookmark,
    showToast,
    comments,
    addComment,
    currentUser,
    toggleCommentClap,
  } = useApp();

  const [showCommentsDropdown, setShowCommentsDropdown] = useState(false);
  const [inlineCommentText, setInlineCommentText] = useState('');

  // Comments for this story
  const storyComments = comments.filter((c) => c.storyId === story.id);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `/story/${story.slug}`);
    showToast('Link copied to clipboard', 'info');
  };

  const handlePostInlineComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineCommentText.trim()) return;
    addComment(story.id, inlineCommentText.trim());
    setInlineCommentText('');
  };

  // Reusable inline comment drawer
  const renderCommentsDropdown = () => (
    <div className="mt-4 pt-4 border-t border-[#E9E6E0] dark:border-[#272E3B] space-y-3 bg-[#FAF9F6]/80 dark:bg-[#0E121A]/80 p-3.5 rounded-md animate-in fade-in duration-150">
      <div className="flex items-center justify-between text-xs text-[#77736E] dark:text-[#9CA3AF]">
        <span className="font-semibold text-[#191919] dark:text-[#F3F4F6]">
          Feed Marginalia & Comments ({storyComments.length})
        </span>
        <button
          type="button"
          onClick={() => setShowCommentsDropdown(false)}
          className="hover:text-[#191919] dark:hover:text-white"
        >
          Close
        </button>
      </div>

      {/* Inline composer */}
      <form onSubmit={handlePostInlineComment} className="flex items-center gap-2">
        <AuthorAvatar
          name={currentUser.name}
          avatar={currentUser.avatar}
          size="xs"
          clickable={false}
        />
        <input
          type="text"
          value={inlineCommentText}
          onChange={(e) => setInlineCommentText(e.target.value)}
          placeholder={`Leave a comment on "${story.title.slice(0, 24)}..."`}
          className="flex-1 px-3 py-1.5 text-xs bg-[#FFFFFF] dark:bg-[#161B24] border border-[#E9E6E0] dark:border-[#272E3B] rounded text-[#191919] dark:text-[#F3F4F6] focus:outline-none focus:border-[#2563EB]"
        />
        <button
          type="submit"
          disabled={!inlineCommentText.trim()}
          className="p-1.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white disabled:opacity-40 transition-colors"
          title="Send comment"
        >
          <Send size={13} />
        </button>
      </form>

      {/* Recent comments list */}
      {storyComments.length > 0 && (
        <div className="space-y-2 pt-1 max-h-48 overflow-y-auto divide-y divide-[#E9E6E0] dark:divide-[#272E3B]/60">
          {storyComments.slice(0, 3).map((cmt) => (
            <div key={cmt.id} className="pt-2 first:pt-0 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <AuthorAvatar
                    name={cmt.author.name}
                    avatar={cmt.author.avatar}
                    size="xs"
                    clickable={false}
                  />
                  <span className="font-semibold text-[#191919] dark:text-[#F3F4F6]">
                    {cmt.author.name}
                  </span>
                  <span className="text-[#77736E] dark:text-[#9CA3AF]">· {cmt.createdAt}</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleCommentClap(cmt.id)}
                  className="flex items-center gap-1 text-[#77736E] hover:text-[#2563EB]"
                >
                  <Sparkles size={11} />
                  <span className="tabular-nums">{cmt.clapsCount}</span>
                </button>
              </div>
              <p className="text-xs text-[#191919] dark:text-[#E2E8F0] leading-relaxed pl-6">
                {cmt.content}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="text-right pt-1">
        <Link
          to={`/story/${story.slug}#comments`}
          className="text-[11px] font-semibold text-[#2563EB] dark:text-[#60A5FA] hover:underline"
        >
          Open full conversation page →
        </Link>
      </div>
    </div>
  );

  // Format B: Featured Story (Large rectangular banner)
  if (layout === 'featured') {
    return (
      <article className="group mb-12 border-b border-[#E9E6E0] dark:border-[#272E3B] pb-10">
        {story.coverImage && (
          <Link
            to={`/story/${story.slug}`}
            className="block mb-6 overflow-hidden rounded-md bg-[#F1EFEA] dark:bg-[#161B24] border border-[#E9E6E0] dark:border-[#272E3B] aspect-[16/9] max-h-[440px]"
          >
            <img
              src={story.coverImage}
              alt={story.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </Link>
        )}

        {showAuthor && (
          <div className="flex items-center gap-2.5 mb-3 text-xs text-[#77736E] dark:text-[#9CA3AF]">
            <AuthorAvatar
              name={story.author.name}
              avatar={story.author.avatar}
              username={story.author.username}
              size="xs"
            />
            <Link
              to={`/u/${story.author.username}`}
              className="font-medium text-[#191919] dark:text-[#F3F4F6] hover:text-[#2563EB] transition-colors"
            >
              {story.author.name}
            </Link>
            <span aria-hidden="true">·</span>
            <span>{story.publishedAt}</span>
          </div>
        )}

        <Link to={`/story/${story.slug}`} className="block group">
          <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl text-[#191919] dark:text-[#F3F4F6] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors leading-tight mb-3">
            {story.title}
          </h2>
          {story.subtitle && (
            <p className="text-base sm:text-lg text-[#77736E] dark:text-[#9CA3AF] font-normal leading-relaxed mb-4 line-clamp-2">
              {story.subtitle}
            </p>
          )}
        </Link>

        <div className="flex items-center justify-between pt-2">
          {/* Zero-pill metadata with Blue/Yellow accents */}
          <div className="flex items-center gap-2 text-xs text-[#77736E] dark:text-[#9CA3AF]">
            <span className="font-medium text-[#2563EB] dark:text-[#60A5FA]">{story.topic}</span>
            <span aria-hidden="true">·</span>
            <span>{story.readingTimeMinutes} min read</span>
          </div>

          <div className="flex items-center gap-3">
            <ReactionButton
              clapsCount={story.clapsCount}
              userReaction={story.userReaction}
              isLiked={story.isLiked}
              onToggleLike={() => toggleClap(story.id)}
              onSelectReaction={(r: ReactionType) => setStoryReaction(story.id, r)}
              size="sm"
            />

            <button
              type="button"
              onClick={() => setShowCommentsDropdown(!showCommentsDropdown)}
              className={`flex items-center gap-1 text-xs p-1 rounded transition-colors ${
                showCommentsDropdown
                  ? 'text-[#2563EB] bg-[#EFF6FF] dark:bg-[#1E293B]'
                  : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6]'
              }`}
              title="Toggle inline comments"
            >
              <MessageSquare size={16} />
              <span className="tabular-nums">{story.commentsCount}</span>
              {showCommentsDropdown ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            <BookmarkButton
              isBookmarked={story.isBookmarked}
              onBookmark={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(story.id);
              }}
              size="sm"
            />
            <button
              onClick={handleShare}
              className="text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors p-1"
              title="Share story"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Inline Comments Dropdown in Feed */}
        {showCommentsDropdown && renderCommentsDropdown()}
      </article>
    );
  }

  // Format D: Editorial Grid (Consistent 16:9 or 3:2 rectangular image crop)
  if (layout === 'grid') {
    return (
      <article className="group flex flex-col justify-between h-full bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-5 transition-shadow hover:shadow-sm">
        <div>
          {story.coverImage && (
            <Link
              to={`/story/${story.slug}`}
              className="block mb-4 overflow-hidden rounded bg-[#F1EFEA] dark:bg-[#161B24] border border-[#E9E6E0] dark:border-[#272E3B] aspect-[16/9]"
            >
              <img
                src={story.coverImage}
                alt={story.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </Link>
          )}

          {showAuthor && (
            <div className="flex items-center gap-2 mb-2.5 text-xs text-[#77736E] dark:text-[#9CA3AF]">
              <AuthorAvatar
                name={story.author.name}
                avatar={story.author.avatar}
                username={story.author.username}
                size="xs"
              />
              <Link
                to={`/u/${story.author.username}`}
                className="font-medium text-[#191919] dark:text-[#F3F4F6] hover:text-[#2563EB] transition-colors truncate"
              >
                {story.author.name}
              </Link>
              <span aria-hidden="true">·</span>
              <span className="truncate">{story.publishedAt}</span>
            </div>
          )}

          <Link to={`/story/${story.slug}`} className="block group">
            <h3 className="font-serif-display text-lg sm:text-xl text-[#191919] dark:text-[#F3F4F6] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors leading-snug mb-2 line-clamp-2">
              {story.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#77736E] dark:text-[#9CA3AF] leading-relaxed line-clamp-3 mb-4">
              {story.excerpt}
            </p>
          </Link>
        </div>

        <div className="pt-3 border-t border-[#E9E6E0] dark:border-[#272E3B] flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-[#77736E] dark:text-[#9CA3AF]">
            <span className="text-[#2563EB] dark:text-[#60A5FA] font-medium">{story.topic}</span>
            <span aria-hidden="true">·</span>
            <span>{story.readingTimeMinutes}m</span>
          </div>

          <div className="flex items-center gap-2">
            <ReactionButton
              clapsCount={story.clapsCount}
              userReaction={story.userReaction}
              isLiked={story.isLiked}
              onToggleLike={() => toggleClap(story.id)}
              onSelectReaction={(r: ReactionType) => setStoryReaction(story.id, r)}
              size="sm"
            />
            <BookmarkButton
              isBookmarked={story.isBookmarked}
              onBookmark={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(story.id);
              }}
              size="sm"
            />
          </div>
        </div>
      </article>
    );
  }

  // Format C: Text-Only Story (Generous typographic focus, no image)
  if (layout === 'text-only' || !story.coverImage) {
    return (
      <article className="group py-6 border-b border-[#E9E6E0] dark:border-[#272E3B] last:border-b-0">
        {showAuthor && (
          <div className="flex items-center gap-2.5 mb-2.5 text-xs text-[#77736E] dark:text-[#9CA3AF]">
            <AuthorAvatar
              name={story.author.name}
              avatar={story.author.avatar}
              username={story.author.username}
              size="xs"
            />
            <Link
              to={`/u/${story.author.username}`}
              className="font-medium text-[#191919] dark:text-[#F3F4F6] hover:text-[#2563EB] transition-colors"
            >
              {story.author.name}
            </Link>
            <span aria-hidden="true">·</span>
            <span>{story.publishedAt}</span>
          </div>
        )}

        <Link to={`/story/${story.slug}`} className="block group">
          <h3 className="font-serif-display text-xl sm:text-2xl text-[#191919] dark:text-[#F3F4F6] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors leading-tight mb-2">
            {story.title}
          </h3>
          <p className="text-sm text-[#77736E] dark:text-[#9CA3AF] leading-relaxed line-clamp-2 mb-3">
            {story.excerpt}
          </p>
        </Link>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-xs text-[#77736E] dark:text-[#9CA3AF]">
            <span className="font-medium text-[#2563EB] dark:text-[#60A5FA]">{story.topic}</span>
            <span aria-hidden="true">·</span>
            <span>{story.readingTimeMinutes} min read</span>
          </div>

          <div className="flex items-center gap-3">
            <ReactionButton
              clapsCount={story.clapsCount}
              userReaction={story.userReaction}
              isLiked={story.isLiked}
              onToggleLike={() => toggleClap(story.id)}
              onSelectReaction={(r: ReactionType) => setStoryReaction(story.id, r)}
              size="sm"
            />

            <button
              type="button"
              onClick={() => setShowCommentsDropdown(!showCommentsDropdown)}
              className={`flex items-center gap-1 text-xs p-1 rounded transition-colors ${
                showCommentsDropdown
                  ? 'text-[#2563EB] bg-[#EFF6FF] dark:bg-[#1E293B]'
                  : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6]'
              }`}
              title="Toggle inline comments"
            >
              <MessageSquare size={15} />
              <span className="tabular-nums">{story.commentsCount}</span>
              {showCommentsDropdown ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            </button>

            <BookmarkButton
              isBookmarked={story.isBookmarked}
              onBookmark={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(story.id);
              }}
              size="sm"
            />
            <button
              onClick={handleShare}
              className="text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors p-1"
              title="Share story"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>

        {/* Inline Comments Dropdown in Feed */}
        {showCommentsDropdown && renderCommentsDropdown()}
      </article>
    );
  }

  // Format A: Horizontal Story Preview (Rectangular thumbnail on side, title & text on other)
  return (
    <article className="group py-6 border-b border-[#E9E6E0] dark:border-[#272E3B] last:border-b-0">
      <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          {showAuthor && (
            <div className="flex items-center gap-2.5 mb-2 text-xs text-[#77736E] dark:text-[#9CA3AF]">
              <AuthorAvatar
                name={story.author.name}
                avatar={story.author.avatar}
                username={story.author.username}
                size="xs"
              />
              <Link
                to={`/u/${story.author.username}`}
                className="font-medium text-[#191919] dark:text-[#F3F4F6] hover:text-[#2563EB] transition-colors"
              >
                {story.author.name}
              </Link>
              <span aria-hidden="true">·</span>
              <span>{story.publishedAt}</span>
            </div>
          )}

          <Link to={`/story/${story.slug}`} className="block group">
            <h3 className="font-serif-display text-xl sm:text-2xl text-[#191919] dark:text-[#F3F4F6] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors leading-snug mb-2">
              {story.title}
            </h3>
            <p className="text-sm text-[#77736E] dark:text-[#9CA3AF] leading-relaxed line-clamp-2 mb-3">
              {story.excerpt}
            </p>
          </Link>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-xs text-[#77736E] dark:text-[#9CA3AF]">
              <span className="font-medium text-[#2563EB] dark:text-[#60A5FA]">{story.topic}</span>
              <span aria-hidden="true">·</span>
              <span>{story.readingTimeMinutes} min read</span>
            </div>

            <div className="flex items-center gap-3">
              <ReactionButton
                clapsCount={story.clapsCount}
                userReaction={story.userReaction}
                isLiked={story.isLiked}
                onToggleLike={() => toggleClap(story.id)}
                onSelectReaction={(r: ReactionType) => setStoryReaction(story.id, r)}
                size="sm"
              />

              <button
                type="button"
                onClick={() => setShowCommentsDropdown(!showCommentsDropdown)}
                className={`flex items-center gap-1 text-xs p-1 rounded transition-colors ${
                  showCommentsDropdown
                    ? 'text-[#2563EB] bg-[#EFF6FF] dark:bg-[#1E293B]'
                    : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6]'
                }`}
                title="Toggle inline comments"
              >
                <MessageSquare size={15} />
                <span className="tabular-nums">{story.commentsCount}</span>
                {showCommentsDropdown ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              </button>

              <BookmarkButton
                isBookmarked={story.isBookmarked}
                onBookmark={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleBookmark(story.id);
                }}
                size="sm"
              />
              <button
                onClick={handleShare}
                className="text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors p-1"
                title="Share story"
              >
                <Share2 size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Strictly rectangular thumbnail (4:3 or 16:9 aspect ratio, 0-8px corners) */}
        {story.coverImage && (
          <Link
            to={`/story/${story.slug}`}
            className="w-full sm:w-44 md:w-48 aspect-[16/10] sm:aspect-[4/3] shrink-0 overflow-hidden rounded bg-[#F1EFEA] dark:bg-[#161B24] border border-[#E9E6E0] dark:border-[#272E3B]"
          >
            <img
              src={story.coverImage}
              alt={story.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        )}
      </div>

      {/* Inline Comments Dropdown in Feed */}
      {showCommentsDropdown && renderCommentsDropdown()}
    </article>
  );
};
