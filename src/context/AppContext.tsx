import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  NavigationTab,
  SocialAccount,
  Post,
  TeamMember,
  Conversation,
  NotificationItem,
  ActivityItem,
  AnalyticsSummary,
  SocialPlatform,
  TeamRole,
  ThemeMode,
  AccentColor,
} from '../types';
import { useTheme } from './ThemeContext';
import { initialMockAccounts } from '../data/mockAccounts';
import { initialMockPosts } from '../data/mockPosts';
import { initialAnalyticsSummary } from '../data/mockAnalytics';
import { initialMockConversations } from '../data/mockMessages';
import { initialMockTeamMembers } from '../data/mockTeam';
import { initialMockNotifications, initialMockActivities } from '../data/mockNotifications';

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapse: () => void;
  
  // Theme & Accent Color
  theme: ThemeMode;
  resolvedTheme: 'dark' | 'light';
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;

  // Composer
  isComposerOpen: boolean;
  composerInitialPost: Post | null;
  openComposer: (post?: Post) => void;
  closeComposer: () => void;

  // Accounts
  accounts: SocialAccount[];
  toggleAccountStatus: (id: string) => void;
  connectNewAccount: (platform: SocialPlatform, accountName: string, handle: string) => void;

  // Posts
  posts: Post[];
  addPost: (postData: Partial<Post>) => Post;
  updatePost: (id: string, updated: Partial<Post>) => void;
  deletePost: (id: string) => void;
  duplicatePost: (id: string) => void;

  // Team
  teamMembers: TeamMember[];
  addTeamMember: (name: string, email: string, role: TeamRole) => void;
  updateTeamMemberRole: (id: string, role: TeamRole) => void;
  removeTeamMember: (id: string) => void;

  // Inbox
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  replyToConversation: (id: string, text: string) => void;

  // Notifications & Activity
  notifications: NotificationItem[];
  activities: ActivityItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Analytics
  analyticsSummary: AnalyticsSummary;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, resolvedTheme, setTheme, toggleTheme, accentColor, setAccentColor } = useTheme();
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sidebar_collapsed');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sidebar_collapsed', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Composer state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerInitialPost, setComposerInitialPost] = useState<Post | null>(null);

  const openComposer = (post?: Post) => {
    setComposerInitialPost(post || null);
    setIsComposerOpen(true);
  };

  const closeComposer = () => {
    setIsComposerOpen(false);
    setComposerInitialPost(null);
  };

  // Data state initialized with mocks
  const [accounts, setAccounts] = useState<SocialAccount[]>(initialMockAccounts);
  const [posts, setPosts] = useState<Post[]>(initialMockPosts);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialMockTeamMembers);
  const [conversations, setConversations] = useState<Conversation[]>(initialMockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(initialMockConversations[0]?.id || null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialMockNotifications);
  const [activities, setActivities] = useState<ActivityItem[]>(initialMockActivities);
  const [analyticsSummary] = useState<AnalyticsSummary>(initialAnalyticsSummary);

  // Handlers - Accounts
  const toggleAccountStatus = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          const nextStatus = acc.status === 'connected' ? 'disconnected' : 'connected';
          return {
            ...acc,
            status: nextStatus,
            lastSynced: nextStatus === 'connected' ? 'Just now' : acc.lastSynced,
          };
        }
        return acc;
      })
    );
  };

  const connectNewAccount = (platform: SocialPlatform, accountName: string, handle: string) => {
    const newAcc: SocialAccount = {
      id: `acc-${Date.now()}`,
      platform,
      accountName,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      followers: 1250,
      status: 'connected',
      lastSynced: 'Just now',
    };
    setAccounts((prev) => [newAcc, ...prev]);

    // Add activity
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        user: { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
        action: 'connected new account',
        target: `${accountName} (${handle})`,
        timestamp: 'Just now',
        platform,
      },
      ...prev,
    ]);
  };

  // Handlers - Posts
  const addPost = (postData: Partial<Post>): Post => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      content: postData.content || '',
      media: postData.media || [],
      platforms: postData.platforms || ['twitter'],
      hashtags: postData.hashtags || [],
      mentions: postData.mentions || [],
      status: postData.status || 'draft',
      author: {
        id: 'u-1',
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      },
      scheduledFor: postData.scheduledFor,
      publishedAt: postData.status === 'published' ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPosts((prev) => [newPost, ...prev]);

    // Record activity
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        user: { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
        action: `${newPost.status} post`,
        target: newPost.content.substring(0, 30) + '...',
        timestamp: 'Just now',
        platform: newPost.platforms[0],
      },
      ...prev,
    ]);

    return newPost;
  };

  const updatePost = (id: string, updated: Partial<Post>) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated, updatedAt: new Date().toISOString() } : p))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const duplicatePost = (id: string) => {
    const target = posts.find((p) => p.id === id);
    if (!target) return;
    const copy: Post = {
      ...target,
      id: `post-${Date.now()}`,
      content: `${target.content} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: undefined,
    };
    setPosts((prev) => [copy, ...prev]);
  };

  // Handlers - Team
  const addTeamMember = (name: string, email: string, role: TeamRole) => {
    const newMember: TeamMember = {
      id: `u-${Date.now()}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role,
      status: 'pending',
      postsCreated: 0,
      lastActive: 'Invitation Sent',
    };
    setTeamMembers((prev) => [...prev, newMember]);
  };

  const updateTeamMemberRole = (id: string, role: TeamRole) => {
    setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Handlers - Inbox
  const replyToConversation = (id: string, text: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === id) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            sender: 'user' as const,
            senderName: 'Sarah Jenkins (You)',
            senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
            text,
            timestamp: 'Just now',
          };
          return {
            ...conv,
            lastMessage: text,
            lastMessageTime: 'Just now',
            unread: false,
            messages: [...conv.messages, newMsg],
          };
        }
        return conv;
      })
    );
  };

  // Handlers - Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebarCollapse,
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        accentColor,
        setAccentColor,
        isComposerOpen,
        composerInitialPost,
        openComposer,
        closeComposer,
        accounts,
        toggleAccountStatus,
        connectNewAccount,
        posts,
        addPost,
        updatePost,
        deletePost,
        duplicatePost,
        teamMembers,
        addTeamMember,
        updateTeamMemberRole,
        removeTeamMember,
        conversations,
        activeConversationId,
        setActiveConversationId,
        replyToConversation,
        notifications,
        activities,
        markNotificationRead,
        markAllNotificationsRead,
        analyticsSummary,
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
