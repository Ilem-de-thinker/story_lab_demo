import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { StoryPreview } from '../../components/story/StoryPreview';
import { AuthorAvatar } from '../../components/common/AuthorAvatar';
import { FollowButton } from '../../components/common/FollowButton';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Calendar,
  Globe,
  Share2,
  PenTool,
  Settings,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

export const WriterProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { authors, currentUser, stories, comments, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'stories' | 'replies' | 'about'>('stories');

  // Find author
  const author =
    username === currentUser.username
      ? currentUser
      : authors.find((a) => a.username === username) || currentUser;

  if (!author) {
    return (
      <AppLayout showRightSidebar={false}>
        <div className="text-center py-20 bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-8">
          <h2 className="font-serif-display text-2xl text-[#191919] dark:text-[#F3F4F6] mb-2">
            Author Not Found
          </h2>
          <p className="text-sm text-[#77736E] dark:text-[#9CA3AF] mb-6">
            The writer profile @{username} does not exist in the Quillora directory.
          </p>
          <Link
            to="/explore"
            className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded"
          >
            Explore Authors
          </Link>
        </div>
      </AppLayout>
    );
  }

  const isSelf = currentUser.id === author.id;
  const authorStories = stories.filter((s) => s.authorId === author.id);
  const authorComments = comments.filter((c) => c.author.username === author.username);

  const handleShareProfile = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Author profile link copied to clipboard', 'info');
  };

  return (
    <AppLayout showRightSidebar={true} maxWidth="standard">
      <div className="space-y-8">
        {/* Profile Card & Header */}
        <div className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-lg overflow-hidden shadow-2xs">
          {/* Rectangular Profile Banner (Never circular) */}
          <div className="h-44 sm:h-52 bg-[#F1EFEA] dark:bg-[#1E2430] border-b border-[#E9E6E0] dark:border-[#272E3B] relative overflow-hidden">
            <img
              src="/src/assets/images/hero_editorial_desk_1791912314353.jpg"
              alt="Author banner"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="px-6 pb-6 pt-0 relative">
            {/* Avatar & Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-14 mb-4 gap-4">
              <div className="relative">
                {/* Circular avatar allowed for human author */}
                <div className="w-24 h-24 rounded-full border-4 border-[#FFFFFF] dark:border-[#151A24] shadow-sm overflow-hidden bg-[#FFFFFF] dark:bg-[#151A24]">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                {isSelf ? (
                  <>
                    <Link
                      to="/write"
                      className="px-4 py-1.5 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded inline-flex items-center gap-1.5 transition-colors"
                    >
                      <PenTool size={13} />
                      <span>Write</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="px-3 py-1.5 text-xs uppercase tracking-wider font-medium text-[#77736E] dark:text-[#9CA3AF] border border-[#E9E6E0] dark:border-[#272E3B] hover:text-[#191919] dark:hover:text-white rounded inline-flex items-center gap-1.5"
                    >
                      <Settings size={13} />
                      <span>Edit Profile</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <FollowButton authorId={author.id} size="md" />
                    <button
                      type="button"
                      onClick={() => navigate('/messages')}
                      className="px-3.5 py-1.5 text-xs font-medium text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430] rounded inline-flex items-center gap-1.5"
                    >
                      <MessageSquare size={14} />
                      <span>Message</span>
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={handleShareProfile}
                  className="p-2 text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white border border-[#E9E6E0] dark:border-[#272E3B] rounded hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430]"
                  title="Share profile"
                >
                  <Share2 size={15} />
                </button>
              </div>
            </div>

            {/* Author Identity & Bio */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-display text-2xl sm:text-3xl text-[#191919] dark:text-[#F3F4F6]">
                  {author.name}
                </h1>
                <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
              </div>
              <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] mb-3">@{author.username}</p>
              <p className="text-sm text-[#191919] dark:text-[#E2E8F0] leading-relaxed max-w-2xl mb-4 font-normal">
                {author.bio}
              </p>

              {/* Metadata details */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#77736E] dark:text-[#9CA3AF]">
                {author.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={13} />
                    <span>{author.location}</span>
                  </span>
                )}
                {author.website && (
                  <a
                    href={author.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-[#2563EB] dark:hover:text-[#60A5FA] hover:underline"
                  >
                    <Globe size={13} />
                    <span>{author.website.replace('https://', '')}</span>
                  </a>
                )}
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  <span>Joined {author.joinedDate}</span>
                </span>
              </div>

              {/* Follower Stats */}
              <div className="flex items-center gap-6 text-xs text-[#191919] dark:text-[#F3F4F6] pt-4 mt-4 border-t border-[#E9E6E0] dark:border-[#272E3B]">
                <div>
                  <strong className="font-semibold tabular-nums">
                    {author.followersCount.toLocaleString()}
                  </strong>{' '}
                  <span className="text-[#77736E] dark:text-[#9CA3AF]">Followers</span>
                </div>
                <div>
                  <strong className="font-semibold tabular-nums">
                    {author.followingCount.toLocaleString()}
                  </strong>{' '}
                  <span className="text-[#77736E] dark:text-[#9CA3AF]">Following</span>
                </div>
                <div>
                  <strong className="font-semibold tabular-nums">
                    {authorStories.length}
                  </strong>{' '}
                  <span className="text-[#77736E] dark:text-[#9CA3AF]">Published Dispatches</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs: Published Stories / Replies / About */}
        <div>
          <div className="flex items-center gap-8 border-b border-[#E9E6E0] dark:border-[#272E3B] text-sm mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('stories')}
              className={`pb-3 font-medium transition-colors relative ${
                activeTab === 'stories'
                  ? 'text-[#191919] dark:text-[#F3F4F6] font-semibold'
                  : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
              }`}
            >
              Published Stories ({authorStories.length})
              {activeTab === 'stories' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('replies')}
              className={`pb-3 font-medium transition-colors relative ${
                activeTab === 'replies'
                  ? 'text-[#191919] dark:text-[#F3F4F6] font-semibold'
                  : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
              }`}
            >
              Marginalia & Replies ({authorComments.length})
              {activeTab === 'replies' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('about')}
              className={`pb-3 font-medium transition-colors relative ${
                activeTab === 'about'
                  ? 'text-[#191919] dark:text-[#F3F4F6] font-semibold'
                  : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white'
              }`}
            >
              Author Manifesto
              {activeTab === 'about' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" />
              )}
            </button>
          </div>

          {/* Stories Tab: ALL RECTANGULAR PREVIEWS! */}
          {activeTab === 'stories' && (
            <div>
              {authorStories.length === 0 ? (
                <div className="text-center py-16 bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-6">
                  <BookOpen size={36} className="text-[#77736E] dark:text-[#9CA3AF] mx-auto mb-2" />
                  <h3 className="font-serif-display text-lg text-[#191919] dark:text-[#F3F4F6] mb-1">
                    No published stories yet
                  </h3>
                  <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] max-w-sm mx-auto mb-4">
                    {isSelf
                      ? 'You haven’t published any stories yet. Open the writing studio to begin.'
                      : `${author.name} hasn’t released any public dispatches yet.`}
                  </p>
                  {isSelf && (
                    <Link
                      to="/write"
                      className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded inline-flex items-center gap-1.5"
                    >
                      <PenTool size={12} />
                      <span>Start First Draft</span>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {authorStories.map((story) => (
                    <StoryPreview
                      key={story.id}
                      story={story}
                      layout="horizontal"
                      showAuthor={false}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Replies Tab */}
          {activeTab === 'replies' && (
            <div className="space-y-4">
              {authorComments.length === 0 ? (
                <div className="text-center py-12 bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-6 text-xs text-[#77736E] dark:text-[#9CA3AF]">
                  No public marginalia or discussions recorded yet.
                </div>
              ) : (
                authorComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-[#77736E] dark:text-[#9CA3AF]">
                      <span>Commented on an essay · {comment.createdAt}</span>
                      <span className="tabular-nums text-[#EAB308]">♥ {comment.clapsCount}</span>
                    </div>
                    <p className="text-sm text-[#191919] dark:text-[#E2E8F0] leading-relaxed font-serif">
                      "{comment.content}"
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* About Manifesto Tab */}
          {activeTab === 'about' && (
            <div className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-8 space-y-6">
              <h3 className="font-serif-display text-2xl text-[#191919] dark:text-[#F3F4F6]">
                About {author.name}
              </h3>
              <div className="prose prose-stone dark:prose-invert text-sm leading-relaxed text-[#191919] dark:text-[#E2E8F0] font-prose-serif space-y-4">
                <p>
                  {author.bio}
                </p>
                <p>
                  Writing has always been an instrument of navigation rather than a commercial pursuit. The goal of this personal publication is to document inquiries that resist easy summary.
                </p>
                <blockquote className="border-t border-b border-[#E9E6E0] dark:border-[#272E3B] py-3 my-4 italic text-[#2563EB] dark:text-[#60A5FA]">
                  "We write to find out what we would know if we were capable of sitting still long enough to listen."
                </blockquote>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};
