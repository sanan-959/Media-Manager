export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube';

export type PostStatus = 'draft' | 'in_review' | 'approved' | 'scheduled' | 'published' | 'failed';

export type TeamRole = 'admin' | 'manager' | 'creator' | 'reviewer';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  accountName: string;
  handle: string;
  avatar: string;
  followers: number;
  status: 'connected' | 'expired' | 'action_required' | 'disconnected';
  lastSynced: string;
  profileUrl?: string;
}

export interface MediaAttachment {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  altText?: string;
}

export interface Post {
  id: string;
  content: string;
  media: MediaAttachment[];
  platforms: SocialPlatform[];
  hashtags: string[];
  mentions: string[];
  status: PostStatus;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  scheduledFor?: string; // ISO string
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  approver?: {
    id: string;
    name: string;
  };
  metrics?: {
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
    reach: number;
    impressions: number;
  };
}

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  timestamp: string;
  platform?: SocialPlatform;
}

export interface ConversationMessage {
  id: string;
  sender: 'user' | 'customer';
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  attachments?: MediaAttachment[];
}

export interface Conversation {
  id: string;
  platform: SocialPlatform;
  type: 'comment' | 'message' | 'mention';
  customerName: string;
  customerHandle: string;
  customerAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  status: 'open' | 'resolved' | 'pending';
  postSnippet?: string;
  messages: ConversationMessage[];
  notes?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: TeamRole;
  status: 'active' | 'pending' | 'inactive';
  postsCreated: number;
  lastActive: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'approval' | 'schedule' | 'mention' | 'account' | 'system';
  linkTab?: NavigationTab;
}

export interface AnalyticsSummary {
  totalReach: number;
  reachGrowth: number;
  impressions: number;
  impressionsGrowth: number;
  engagement: number;
  engagementGrowth: number;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  followers: number;
  followersGrowth: number;
}

export interface PlatformMetric {
  platform: SocialPlatform;
  followers: number;
  reach: number;
  engagementRate: number;
  postsCount: number;
  growth: number;
}

export type NavigationTab =
  | 'dashboard'
  | 'accounts'
  | 'content'
  | 'calendar'
  | 'analytics'
  | 'inbox'
  | 'team'
  | 'settings';

export const platformsList: SocialPlatform[] = [
  'facebook',
  'instagram',
  'linkedin',
  'twitter',
  'tiktok',
  'youtube',
];

export type ThemeMode = 'dark' | 'light' | 'system';

export type AccentColor = 'indigo' | 'blue' | 'purple' | 'emerald' | 'orange' | 'rose' | 'teal';

export interface AccentColorOption {
  id: AccentColor;
  name: string;
  hex: string;
  secondaryHex: string;
  previewClass: string;
  description: string;
}

export type AuthView = 'login' | 'signup' | 'verify_email' | 'forgot_password' | 'reset_password';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: string;
  isEmailVerified: boolean;
}


