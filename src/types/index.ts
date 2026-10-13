export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location?: string;
  website?: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  publishedCount: number;
  featured?: boolean;
}

export type StoryFormat = 'horizontal' | 'featured' | 'text-only' | 'grid';

export type ReactionType = 'like' | 'love' | 'insightful' | 'applause' | 'profound';

export interface ReactionDetail {
  type: ReactionType;
  emoji: string;
  label: string;
  color: string;
}

export interface WriterStatus {
  id: string;
  authorId: string;
  author: Author;
  text: string;
  bgGradient?: string;
  imageUrl?: string;
  createdAt: string;
  viewsCount: number;
  reactionsCount: number;
  userReaction?: ReactionType;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  format?: StoryFormat;
  authorId: string;
  author: Author;
  publishedAt: string;
  readingTimeMinutes: number;
  topic: string;
  tags: string[];
  clapsCount: number;
  commentsCount: number;
  isBookmarked?: boolean;
  isLiked?: boolean;
  userReaction?: ReactionType;
  reactionCounts?: Record<ReactionType, number>;
}

export interface Comment {
  id: string;
  storyId: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  clapsCount: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface Draft {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  coverImage?: string;
  topic: string;
  tags: string[];
  wordCount: number;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: 'follow' | 'clap' | 'comment' | 'mention' | 'publication';
  actor: {
    name: string;
    username: string;
    avatar: string;
  };
  storyTitle?: string;
  storySlug?: string;
  createdAt: string;
  read: boolean;
  message?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participant: Author;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  storyCount: number;
  description: string;
}
