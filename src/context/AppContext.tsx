import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Author, Story, Draft, Notification, Comment, Conversation, WriterStatus, ReactionType } from '../types';
import {
  CURRENT_USER,
  MOCK_AUTHORS,
  MOCK_STORIES,
  MOCK_DRAFTS,
  MOCK_NOTIFICATIONS,
  MOCK_COMMENTS,
  MOCK_CONVERSATIONS,
  MOCK_STATUSES,
} from '../data/mockData';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  currentUser: Author;
  authors: Author[];
  stories: Story[];
  statuses: WriterStatus[];
  drafts: Draft[];
  notifications: Notification[];
  comments: Comment[];
  conversations: Conversation[];
  followedAuthorIds: string[];
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  toggleClap: (storyId: string) => void;
  setStoryReaction: (storyId: string, reaction: ReactionType) => void;
  toggleBookmark: (storyId: string) => void;
  toggleFollow: (authorId: string) => void;
  isFollowing: (authorId: string) => boolean;
  publishStory: (newStory: Omit<Story, 'id' | 'slug' | 'clapsCount' | 'commentsCount' | 'publishedAt' | 'author' | 'authorId'>) => Story;
  createStatus: (text: string, bgGradient?: string, imageUrl?: string) => WriterStatus;
  saveDraft: (draft: Partial<Draft> & { title: string }) => Draft;
  deleteDraft: (draftId: string) => void;
  addComment: (storyId: string, content: string, parentCommentId?: string) => void;
  deleteComment: (commentId: string) => void;
  toggleCommentClap: (commentId: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  sendMessage: (conversationId: string, text: string) => void;
  updateCurrentUser: (updates: Partial<Author>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  THEME: 'quillora_theme',
  USER: 'quillora_current_user',
  STORIES: 'quillora_stories',
  STATUSES: 'quillora_statuses',
  DRAFTS: 'quillora_drafts',
  NOTIFICATIONS: 'quillora_notifications',
  COMMENTS: 'quillora_comments',
  CONVERSATIONS: 'quillora_conversations',
  FOLLOWED: 'quillora_followed_authors',
};

const normalizeAssetUrl = (url?: string): string | undefined => {
  if (!url) return url;
  if (url.startsWith('../src/assets/images/')) {
    return url.replace('../src/assets/images/', '/assets/images/');
  }
  if (url.startsWith('/src/assets/images/')) {
    return url.replace('/src/assets/images/', '/assets/images/');
  }
  return url;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [currentUser, setCurrentUser] = useState<Author>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [authors] = useState<Author[]>(MOCK_AUTHORS);

  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STORIES);
    if (!saved) return MOCK_STORIES;
    try {
      const parsed: Story[] = JSON.parse(saved);
      return parsed.map((story) => ({
        ...story,
        coverImage: normalizeAssetUrl(story.coverImage),
      }));
    } catch {
      return MOCK_STORIES;
    }
  });

  const [statuses, setStatuses] = useState<WriterStatus[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATUSES);
    if (!saved) return MOCK_STATUSES;
    try {
      const parsed: WriterStatus[] = JSON.parse(saved);
      return parsed.map((status) => ({
        ...status,
        imageUrl: normalizeAssetUrl(status.imageUrl),
      }));
    } catch {
      return MOCK_STATUSES;
    }
  });

  const [drafts, setDrafts] = useState<Draft[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    if (!saved) return MOCK_DRAFTS;
    try {
      const parsed: Draft[] = JSON.parse(saved);
      return parsed.map((draft) => ({
        ...draft,
        coverImage: normalizeAssetUrl(draft.coverImage),
      }));
    } catch {
      return MOCK_DRAFTS;
    }
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    return saved ? JSON.parse(saved) : MOCK_COMMENTS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    return saved ? JSON.parse(saved) : MOCK_CONVERSATIONS;
  });

  const [followedAuthorIds, setFollowedAuthorIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FOLLOWED);
    return saved ? JSON.parse(saved) : ['author-kwame', 'author-clara', 'author-marcus'];
  });

  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Toggle Theme
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATUSES, JSON.stringify(statuses));
  }, [statuses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOLLOWED, JSON.stringify(followedAuthorIds));
  }, [followedAuthorIds]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle default clap
  const toggleClap = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          const isLiked = !s.isLiked;
          const userReaction: ReactionType | undefined = isLiked ? 'like' : undefined;
          const delta = isLiked ? 1 : -1;
          const newCount = Math.max(0, s.clapsCount + delta);
          return { ...s, isLiked, userReaction, clapsCount: newCount };
        }
        return s;
      })
    );
  };

  // Set specific emoji-based reaction
  const setStoryReaction = (storyId: string, reaction: ReactionType) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          const alreadySame = s.userReaction === reaction;
          if (alreadySame) {
            // Remove reaction
            return {
              ...s,
              isLiked: false,
              userReaction: undefined,
              clapsCount: Math.max(0, s.clapsCount - 1),
            };
          } else {
            const wasLiked = !!s.userReaction || s.isLiked;
            const newCount = wasLiked ? s.clapsCount : s.clapsCount + 1;
            return {
              ...s,
              isLiked: true,
              userReaction: reaction,
              clapsCount: newCount,
            };
          }
        }
        return s;
      })
    );
  };

  const toggleBookmark = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === storyId) {
          const isBookmarked = !s.isBookmarked;
          showToast(isBookmarked ? 'Story saved to bookmarks' : 'Story removed from bookmarks', 'info');
          return { ...s, isBookmarked };
        }
        return s;
      })
    );
  };

  const toggleFollow = (authorId: string) => {
    setFollowedAuthorIds((prev) => {
      const exists = prev.includes(authorId);
      const targetAuthor = authors.find((a) => a.id === authorId);
      const authorName = targetAuthor ? targetAuthor.name : 'Author';
      if (exists) {
        showToast(`Unfollowed ${authorName}`, 'info');
        return prev.filter((id) => id !== authorId);
      } else {
        showToast(`Now following ${authorName}`, 'success');
        return [...prev, authorId];
      }
    });
  };

  const isFollowing = (authorId: string) => followedAuthorIds.includes(authorId);

  const publishStory = (
    newStoryData: Omit<Story, 'id' | 'slug' | 'clapsCount' | 'commentsCount' | 'publishedAt' | 'author' | 'authorId'>
  ): Story => {
    const slug = newStoryData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `story-${Date.now()}`;

    const newStory: Story = {
      ...newStoryData,
      id: `story-${Date.now()}`,
      slug,
      authorId: currentUser.id,
      author: currentUser,
      publishedAt: 'Just now',
      clapsCount: 1,
      commentsCount: 0,
      isBookmarked: false,
      isLiked: true,
      userReaction: 'like',
      format: newStoryData.format || (newStoryData.coverImage ? 'horizontal' : 'text-only'),
    };

    setStories((prev) => [newStory, ...prev]);
    showToast('Your story has been published to Quillora!', 'success');
    return newStory;
  };

  const createStatus = (text: string, bgGradient = 'from-blue-900 to-indigo-950', imageUrl?: string): WriterStatus => {
    const newStatus: WriterStatus = {
      id: `status-${Date.now()}`,
      authorId: currentUser.id,
      author: currentUser,
      text,
      bgGradient,
      imageUrl,
      createdAt: 'Just now',
      viewsCount: 1,
      reactionsCount: 0,
    };

    setStatuses((prev) => [newStatus, ...prev]);
    showToast('Status published to writers tray', 'success');
    return newStatus;
  };

  const saveDraft = (draftData: Partial<Draft> & { title: string }): Draft => {
    const existingIndex = drafts.findIndex((d) => d.id === draftData.id);
    const updatedDraft: Draft = {
      id: draftData.id || `draft-${Date.now()}`,
      title: draftData.title || 'Untitled Draft',
      subtitle: draftData.subtitle || '',
      content: draftData.content || '',
      coverImage: draftData.coverImage,
      topic: draftData.topic || 'The Craft of Writing',
      tags: draftData.tags || ['Writing'],
      wordCount: draftData.wordCount || (draftData.content ? draftData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length : 0),
      updatedAt: 'Just now',
    };

    if (existingIndex >= 0) {
      setDrafts((prev) => {
        const copy = [...prev];
        copy[existingIndex] = updatedDraft;
        return copy;
      });
      showToast('Draft updated', 'info');
    } else {
      setDrafts((prev) => [updatedDraft, ...prev]);
      showToast('Saved to your drafts', 'success');
    }

    return updatedDraft;
  };

  const deleteDraft = (draftId: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== draftId));
    showToast('Draft removed', 'info');
  };

  const addComment = (storyId: string, content: string, parentCommentId?: string) => {
    const newCommentItem: Comment = {
      id: `comment-${Date.now()}`,
      storyId,
      author: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
      content,
      createdAt: 'Just now',
      clapsCount: 0,
      replies: [],
    };

    if (parentCommentId) {
      setComments((prev) =>
        prev.map((c) => {
          if (c.id === parentCommentId) {
            return {
              ...c,
              replies: [...(c.replies || []), newCommentItem],
            };
          }
          return c;
        })
      );
    } else {
      setComments((prev) => [newCommentItem, ...prev]);
    }

    // Increment commentsCount on the story
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, commentsCount: s.commentsCount + 1 } : s))
    );

    showToast('Your reflection was posted', 'success');
  };

  const deleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    showToast('Comment removed', 'info');
  };

  const toggleCommentClap = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const isLiked = !c.isLiked;
          const delta = isLiked ? 1 : -1;
          return { ...c, isLiked, clapsCount: Math.max(0, c.clapsCount + delta) };
        }
        if (c.replies && c.replies.length > 0) {
          return {
            ...c,
            replies: c.replies.map((r) => {
              if (r.id === commentId) {
                const isLiked = !r.isLiked;
                const delta = isLiked ? 1 : -1;
                return { ...r, isLiked, clapsCount: Math.max(0, r.clapsCount + delta) };
              }
              return r;
            }),
          };
        }
        return c;
      })
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const sendMessage = (conversationId: string, text: string) => {
    const newMessage: { id: string; senderId: string; text: string; timestamp: string } = {
      id: `m-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: 'Just now',
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );
  };

  const updateCurrentUser = (updates: Partial<Author>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated successfully', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        currentUser,
        authors,
        stories,
        statuses,
        drafts,
        notifications,
        comments,
        conversations,
        followedAuthorIds,
        toasts,
        showToast,
        removeToast,
        toggleClap,
        setStoryReaction,
        toggleBookmark,
        toggleFollow,
        isFollowing,
        publishStory,
        createStatus,
        saveDraft,
        deleteDraft,
        addComment,
        deleteComment,
        toggleCommentClap,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        sendMessage,
        updateCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
