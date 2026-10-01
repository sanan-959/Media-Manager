import type { NotificationItem, ActivityItem } from '../types';

export const initialMockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Post Approval Request',
    message: 'Emily Chen submitted a post for review: "5 Essential Strategies to Boost Social..."',
    timestamp: '15m ago',
    read: false,
    type: 'approval',
    linkTab: 'content',
  },
  {
    id: 'notif-2',
    title: 'TikTok Sync Alert',
    message: 'Access token for account @techvibe_tiktok expired. Re-authentication required.',
    timestamp: '2h ago',
    read: false,
    type: 'account',
    linkTab: 'accounts',
  },
  {
    id: 'notif-3',
    title: 'New VIP Mention',
    message: 'David K. Miller mentioned @TechVibe Inc in a featured LinkedIn article.',
    timestamp: '3h ago',
    read: true,
    type: 'mention',
    linkTab: 'inbox',
  },
  {
    id: 'notif-4',
    title: 'Post Published Successfully',
    message: 'Product Update 3.0 was published to 3 connected channels.',
    timestamp: '1 day ago',
    read: true,
    type: 'schedule',
    linkTab: 'content',
  },
];

export const initialMockActivities: ActivityItem[] = [
  {
    id: 'act-1',
    user: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    action: 'published post to',
    target: 'Product Update 3.0',
    timestamp: 'Yesterday at 2:30 PM',
    platform: 'twitter',
  },
  {
    id: 'act-2',
    user: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    action: 'scheduled post for Sep 30',
    target: 'Behind the scenes video',
    timestamp: 'Today at 11:00 AM',
    platform: 'instagram',
  },
  {
    id: 'act-3',
    user: {
      name: 'Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    action: 'submitted for approval',
    target: '5 Essential Strategies',
    timestamp: 'Today at 2:20 PM',
    platform: 'linkedin',
  },
  {
    id: 'act-4',
    user: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    action: 'connected account',
    target: 'TechVibe News (@TechVibe_App)',
    timestamp: '2 days ago',
    platform: 'twitter',
  },
];
