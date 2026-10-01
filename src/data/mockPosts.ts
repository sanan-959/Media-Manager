import type { Post } from '../types';

export const initialMockPosts: Post[] = [
  {
    id: 'post-1',
    content: '🚀 Supercharged Product Update 3.0 is live! Check out our new AI-assisted analytics tools designed to scale your social reach by up to 300%. What feature are you most excited to try? #SaaS #ProductLaunch #TechGrowth #AI',
    media: [
      {
        id: 'm-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        altText: 'Dashboard Analytics Preview',
      }
    ],
    platforms: ['twitter', 'linkedin', 'facebook'],
    hashtags: ['#SaaS', '#ProductLaunch', '#TechGrowth', '#AI'],
    mentions: ['@TechVibe_App', '@OpenAI'],
    status: 'published',
    author: {
      id: 'u-1',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    publishedAt: '2026-09-28T14:30:00Z',
    createdAt: '2026-09-27T09:15:00Z',
    updatedAt: '2026-09-28T14:30:00Z',
    metrics: {
      likes: 1240,
      comments: 182,
      shares: 95,
      clicks: 450,
      reach: 34500,
      impressions: 48900,
    }
  },
  {
    id: 'post-2',
    content: '✨ Behind the scenes with our engineering team working on seamless API integrations! Building ultra-responsive workflows for modern creators. 💻📱 #DeveloperLife #DesignSystem #WebDev',
    media: [
      {
        id: 'm-2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        altText: 'Engineering team working',
      }
    ],
    platforms: ['instagram', 'facebook', 'tiktok'],
    hashtags: ['#DeveloperLife', '#DesignSystem', '#WebDev'],
    mentions: ['@ReactJS'],
    status: 'scheduled',
    author: {
      id: 'u-2',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    scheduledFor: '2026-09-30T16:00:00Z',
    createdAt: '2026-09-29T11:00:00Z',
    updatedAt: '2026-09-29T11:00:00Z',
    approver: {
      id: 'u-1',
      name: 'Sarah Jenkins',
    },
  },
  {
    id: 'post-3',
    content: '📈 5 Essential Strategies to Boost Social Media Engagement in 2026! Swipe through to see actionable tips on video length, posting windows, and community building.',
    media: [
      {
        id: 'm-3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        altText: 'Strategy infographic',
      }
    ],
    platforms: ['linkedin', 'twitter'],
    hashtags: ['#SocialMediaTips', '#MarketingGrowth', '#DigitalStrategy'],
    mentions: [],
    status: 'in_review',
    author: {
      id: 'u-3',
      name: 'Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    scheduledFor: '2026-10-01T10:00:00Z',
    createdAt: '2026-09-29T14:20:00Z',
    updatedAt: '2026-09-29T14:20:00Z',
  },
  {
    id: 'post-4',
    content: '🔥 Quick 30-second tutorial: How to set up custom automated queues for multi-channel video distribution! Drop a comment if you want the template link below. 👇',
    media: [
      {
        id: 'm-4',
        type: 'video',
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        altText: 'Video tutorial cover',
      }
    ],
    platforms: ['tiktok', 'youtube', 'instagram'],
    hashtags: ['#Tutorial', '#Automation', '#ContentCreator'],
    mentions: [],
    status: 'approved',
    author: {
      id: 'u-2',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    scheduledFor: '2026-10-02T18:30:00Z',
    createdAt: '2026-09-29T08:00:00Z',
    updatedAt: '2026-09-29T09:30:00Z',
    approver: {
      id: 'u-1',
      name: 'Sarah Jenkins',
    },
  },
  {
    id: 'post-5',
    content: '💡 Draft concept: Mindset shift for Q4 marketing campaigns. Focus on customer stories rather than feature dumping. Need feedback on tone before finalizing images.',
    media: [],
    platforms: ['linkedin'],
    hashtags: ['#ContentMarketing', '#Q4Strategy'],
    mentions: [],
    status: 'draft',
    author: {
      id: 'u-4',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    },
    createdAt: '2026-09-29T15:00:00Z',
    updatedAt: '2026-09-29T15:00:00Z',
  },
  {
    id: 'post-6',
    content: '🚨 Flash announcement: Join our live AMA tomorrow at 3 PM EST discussing social media algorithm updates! Link in bio to reserve your spot.',
    media: [
      {
        id: 'm-5',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        altText: 'Live Webinar Poster',
      }
    ],
    platforms: ['facebook', 'twitter', 'instagram'],
    hashtags: ['#Webinar', '#AMA', '#MarketingLive'],
    mentions: [],
    status: 'failed',
    author: {
      id: 'u-3',
      name: 'Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    createdAt: '2026-09-26T12:00:00Z',
    updatedAt: '2026-09-27T08:12:00Z',
  },
];
