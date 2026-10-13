import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { AuthorAvatar } from '../../components/common/AuthorAvatar';
import { FollowButton } from '../../components/common/FollowButton';
import { ReactionButton } from '../../components/common/ReactionButton';
import { BookmarkButton } from '../../components/common/BookmarkButton';
import { useApp } from '../../context/AppContext';
import { ReactionType } from '../../types';
import {
  ArrowLeft,
  Share2,
  MessageSquare,
  Clock,
  Sparkles,
  Send,
  Trash2,
  CornerDownRight,
  Bookmark,
} from 'lucide-react';

export const StoryReadingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    stories,
    comments,
    toggleClap,
    setStoryReaction,
    toggleBookmark,
    addComment,
    deleteComment,
    toggleCommentClap,
    currentUser,
    showToast,
  } = useApp();

  const [readingProgress, setReadingProgress] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Find story
  const story = stories.find((s) => s.slug === slug) || stories.find((s) => s.id === slug);

  // Scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!story) {
    return (
      <AppLayout showRightSidebar={false}>
        <div className="text-center py-20 bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-8">
          <h2 className="font-serif-display text-2xl text-[#191919] dark:text-[#F3F4F6] mb-2">
            Dispatch Not Found
          </h2>
          <p className="text-sm text-[#77736E] dark:text-[#9CA3AF] mb-6">
            The requested story might have been unpublished or moved.
          </p>
          <Link
            to="/feed"
            className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-colors"
          >
            Return to Feed
          </Link>
        </div>
      </AppLayout>
    );
  }

  // Related stories (exclude current, matching topic or other stories)
  const relatedStories = stories
    .filter((s) => s.id !== story.id)
    .slice(0, 3);

  // Story comments
  const storyComments = comments.filter((c) => c.storyId === story.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link to this story copied to clipboard', 'info');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(story.id, commentText.trim());
    setCommentText('');
  };

  const handlePostReply = (parentCommentId: string) => {
    if (!replyText.trim()) return;
    addComment(story.id, replyText.trim(), parentCommentId);
    setReplyText('');
    setReplyingToId(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] selection:bg-[#EFF6FF] selection:text-[#1E56A0]">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#2563EB] z-50 transition-all duration-75"
        style={{ width: `${readingProgress}%` }}
      />

      <AppLayout showRightSidebar={false} maxWidth="reading">
        <article className="max-w-2xl mx-auto py-4">
          {/* Back Navigation */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          </div>

          {/* Story Header */}
          <header className="space-y-4 mb-8">
            {/* Zero-pill metadata */}
            <div className="flex items-center gap-2 text-xs text-[#77736E] dark:text-[#9CA3AF]">
              <span className="font-semibold text-[#2563EB] dark:text-[#60A5FA]">{story.topic}</span>
              <span aria-hidden="true">·</span>
              <span>{story.readingTimeMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <span>Published {story.publishedAt}</span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#191919] dark:text-[#F3F4F6] leading-[1.12] tracking-tight">
              {story.title}
            </h1>

            {story.subtitle && (
              <p className="text-lg sm:text-xl text-[#77736E] dark:text-[#9CA3AF] font-normal leading-relaxed">
                {story.subtitle}
              </p>
            )}

            {/* Author Byline & Follow */}
            <div className="pt-4 pb-4 border-t border-b border-[#E9E6E0] dark:border-[#272E3B] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AuthorAvatar
                  name={story.author.name}
                  avatar={story.author.avatar}
                  username={story.author.username}
                  size="md"
                />
                <div>
                  <Link
                    to={`/u/${story.author.username}`}
                    className="block text-sm font-semibold text-[#191919] dark:text-[#F3F4F6] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
                  >
                    {story.author.name}
                  </Link>
                  <p className="text-xs text-[#77736E] dark:text-[#9CA3AF]">
                    {story.author.bio?.slice(0, 52)}...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FollowButton authorId={story.authorId} size="sm" />
              </div>
            </div>
          </header>

          {/* Wide Rectangular Cover Image (Strictly 16:9 or 3:2, never circular!) */}
          {story.coverImage && (
            <div className="mb-10 overflow-hidden rounded-md bg-[#F1EFEA] dark:bg-[#161B24] border border-[#E9E6E0] dark:border-[#272E3B] aspect-[16/9] shadow-2xs">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Story Body Prose */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none text-[#191919] dark:text-[#E2E8F0] font-prose-serif leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          {/* Tags */}
          {story.tags && story.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-[#E9E6E0] dark:border-[#272E3B] flex flex-wrap gap-2 text-xs">
              {story.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/explore?topic=${tag}`}
                  className="px-2.5 py-1 rounded bg-[#F1EFEA] dark:bg-[#1E2430] text-[#77736E] dark:text-[#9CA3AF] hover:bg-[#EFF6FF] dark:hover:bg-[#1E293B] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Interactive Appreciation & Bookmarking Bar with Emoji Reactions */}
          <div className="my-10 p-4 bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-lg shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ReactionButton
                clapsCount={story.clapsCount}
                userReaction={story.userReaction}
                isLiked={story.isLiked}
                onToggleLike={() => toggleClap(story.id)}
                onSelectReaction={(r: ReactionType) => setStoryReaction(story.id, r)}
                size="md"
              />
              <a
                href="#comments"
                className="flex items-center gap-1.5 text-xs text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6] transition-colors p-1"
              >
                <MessageSquare size={18} />
                <span className="tabular-nums font-medium">{story.commentsCount}</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <BookmarkButton
                isBookmarked={story.isBookmarked}
                onBookmark={() => toggleBookmark(story.id)}
                size="md"
              />
              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 rounded text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-[#F3F4F6] hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430] transition-colors"
                title="Share story"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Author Card at Story Bottom */}
          <div className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-lg p-6 mb-12 flex flex-col sm:flex-row items-start gap-4">
            <AuthorAvatar
              name={story.author.name}
              avatar={story.author.avatar}
              username={story.author.username}
              size="lg"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#77736E] dark:text-[#9CA3AF]">
                    Written By
                  </span>
                  <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6]">
                    {story.author.name}
                  </h3>
                </div>
                <FollowButton authorId={story.authorId} size="sm" />
              </div>
              <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] leading-relaxed mb-3">
                {story.author.bio}
              </p>
              <Link
                to={`/u/${story.author.username}`}
                className="text-xs font-semibold text-[#2563EB] dark:text-[#60A5FA] hover:underline"
              >
                View all publications by {story.author.name} →
              </Link>
            </div>
          </div>

          {/* Comments & Discussions Section */}
          <section id="comments" className="pt-8 border-t border-[#E9E6E0] dark:border-[#272E3B] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-display text-2xl text-[#191919] dark:text-[#F3F4F6]">
                Marginalia & Responses ({storyComments.length})
              </h3>
            </div>

            {/* Write Comment Form */}
            <form
              onSubmit={handlePostComment}
              className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center gap-2 text-xs text-[#77736E] dark:text-[#9CA3AF]">
                <AuthorAvatar
                  name={currentUser.name}
                  avatar={currentUser.avatar}
                  size="xs"
                  clickable={false}
                />
                <span>
                  Commenting as <strong className="text-[#191919] dark:text-[#F3F4F6]">{currentUser.name}</strong>
                </span>
              </div>
              <textarea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What thoughts did this piece awaken in you?"
                className="w-full text-sm bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded p-3 focus:outline-none focus:border-[#2563EB] transition-colors placeholder-[#77736E] dark:placeholder-[#6B7280]"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-1.5 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-colors disabled:opacity-40 inline-flex items-center gap-1.5"
                >
                  <Send size={12} />
                  <span>Post Reflection</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4 pt-2">
              {storyComments.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#77736E] dark:text-[#9CA3AF]">
                  Be the first to share an annotation on this piece.
                </div>
              ) : (
                storyComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-lg p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <AuthorAvatar
                          name={comment.author.name}
                          avatar={comment.author.avatar}
                          username={comment.author.username}
                          size="xs"
                        />
                        <div>
                          <Link
                            to={`/u/${comment.author.username}`}
                            className="text-xs font-semibold text-[#191919] dark:text-[#F3F4F6] hover:text-[#2563EB] dark:hover:text-[#60A5FA]"
                          >
                            {comment.author.name}
                          </Link>
                          <span className="text-[11px] text-[#77736E] dark:text-[#9CA3AF] ml-2">
                            {comment.createdAt}
                          </span>
                        </div>
                      </div>

                      {comment.author.username === currentUser.username && (
                        <button
                          type="button"
                          onClick={() => deleteComment(comment.id)}
                          className="text-[#77736E] hover:text-[#C44949] p-1"
                          title="Delete reflection"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#191919] dark:text-[#E2E8F0] leading-relaxed font-sans">
                      {comment.content}
                    </p>

                    <div className="flex items-center gap-4 pt-1 text-xs">
                      <button
                        type="button"
                        onClick={() => toggleCommentClap(comment.id)}
                        className={`inline-flex items-center gap-1 ${
                          comment.isLiked ? 'text-[#2563EB] dark:text-[#60A5FA]' : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
                        }`}
                      >
                        <Sparkles size={13} className="text-[#EAB308]" />
                        <span className="tabular-nums">{comment.clapsCount}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setReplyingToId(replyingToId === comment.id ? null : comment.id)
                        }
                        className="text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white"
                      >
                        Reply
                      </button>
                    </div>

                    {/* Inline Reply Composer */}
                    {replyingToId === comment.id && (
                      <div className="pt-2 pl-4 border-l-2 border-[#2563EB] space-y-2 mt-2">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Reply to ${comment.author.name}...`}
                          className="w-full text-xs px-3 py-2 bg-[#FAF9F6] dark:bg-[#0E121A] border border-[#E9E6E0] dark:border-[#272E3B] text-[#191919] dark:text-[#F3F4F6] rounded focus:outline-none focus:border-[#2563EB]"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReplyingToId(null)}
                            className="text-[11px] text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white px-2 py-1"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePostReply(comment.id)}
                            className="px-3 py-1 text-[11px] font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Nested Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="pt-3 pl-4 border-l border-[#E9E6E0] dark:border-[#272E3B] space-y-3 mt-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <AuthorAvatar
                                name={reply.author.name}
                                avatar={reply.author.avatar}
                                username={reply.author.username}
                                size="xs"
                              />
                              <span className="text-xs font-semibold text-[#191919] dark:text-[#F3F4F6]">
                                {reply.author.name}
                              </span>
                              <span className="text-[10px] text-[#77736E] dark:text-[#9CA3AF]">
                                {reply.createdAt}
                              </span>
                            </div>
                            <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] leading-relaxed pl-6">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Related Stories (STRICTLY RECTANGULAR PREVIEWS!) */}
          <section className="pt-16 mt-16 border-t border-[#E9E6E0] dark:border-[#272E3B] space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block">
              Continue Reading
            </span>
            <h3 className="font-serif-display text-2xl text-[#191919] dark:text-[#F3F4F6]">
              Related Dispatches
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedStories.map((relStory) => (
                <div
                  key={relStory.id}
                  className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md overflow-hidden group flex flex-col justify-between"
                >
                  <div>
                    {relStory.coverImage && (
                      <Link
                        to={`/story/${relStory.slug}`}
                        className="block aspect-[16/9] overflow-hidden bg-[#F1EFEA] dark:bg-[#1E2430]"
                      >
                        <img
                          src={relStory.coverImage}
                          alt={relStory.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    )}
                    <div className="p-4">
                      <span className="text-[10px] text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-1">
                        {relStory.topic}
                      </span>
                      <Link
                        to={`/story/${relStory.slug}`}
                        className="font-serif-display text-base text-[#191919] dark:text-[#F3F4F6] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors line-clamp-2"
                      >
                        {relStory.title}
                      </Link>
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-1 flex items-center justify-between text-[11px] text-[#77736E] dark:text-[#9CA3AF] border-t border-[#E9E6E0]/60 dark:border-[#272E3B]/60">
                    <span>{relStory.author.name}</span>
                    <span>{relStory.readingTimeMinutes}m read</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>
      </AppLayout>
    </div>
  );
};
