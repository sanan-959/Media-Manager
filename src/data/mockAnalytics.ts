import type { AnalyticsSummary, PlatformMetric } from '../types';

export const initialAnalyticsSummary: AnalyticsSummary = {
  totalReach: 384500,
  reachGrowth: 18.4,
  impressions: 620400,
  impressionsGrowth: 24.1,
  engagement: 48900,
  engagementGrowth: 12.8,
  likes: 31200,
  comments: 8450,
  shares: 4210,
  clicks: 5040,
  followers: 566700,
  followersGrowth: 8.9,
};

export const platformMetrics: PlatformMetric[] = [
  { platform: 'facebook', followers: 124500, reach: 110200, engagementRate: 4.2, postsCount: 34, growth: 5.6 },
  { platform: 'instagram', followers: 48200, reach: 98400, engagementRate: 6.8, postsCount: 42, growth: 14.2 },
  { platform: 'twitter', followers: 86300, reach: 64100, engagementRate: 3.9, postsCount: 88, growth: 7.1 },
  { platform: 'linkedin', followers: 29400, reach: 45000, engagementRate: 7.5, postsCount: 22, growth: 12.8 },
  { platform: 'tiktok', followers: 210400, reach: 189000, engagementRate: 9.4, postsCount: 19, growth: 22.4 },
  { platform: 'youtube', followers: 67800, reach: 38200, engagementRate: 5.1, postsCount: 8, growth: 3.5 },
];

export const chartTimeSeriesData = {
  '7d': [
    { date: 'Mon', reach: 42000, engagement: 5400, followers: 558000, impressions: 71000 },
    { date: 'Tue', reach: 48000, engagement: 6100, followers: 559500, impressions: 78000 },
    { date: 'Wed', reach: 56000, engagement: 7200, followers: 561000, impressions: 89000 },
    { date: 'Thu', reach: 52000, engagement: 6800, followers: 562400, impressions: 84000 },
    { date: 'Fri', reach: 64000, engagement: 8300, followers: 564100, impressions: 102000 },
    { date: 'Sat', reach: 59000, engagement: 7600, followers: 565300, impressions: 96000 },
    { date: 'Sun', reach: 63500, engagement: 7500, followers: 566700, impressions: 100400 },
  ],
  '30d': [
    { date: 'Week 1', reach: 78000, engagement: 9800, followers: 520000, impressions: 120000 },
    { date: 'Week 2', reach: 92000, engagement: 11400, followers: 535000, impressions: 145000 },
    { date: 'Week 3', reach: 104000, engagement: 13200, followers: 549000, impressions: 168000 },
    { date: 'Week 4', reach: 110500, engagement: 14500, followers: 566700, impressions: 187400 },
  ],
  '3m': [
    { date: 'Jul', reach: 240000, engagement: 29000, followers: 480000, impressions: 390000 },
    { date: 'Aug', reach: 310000, engagement: 38000, followers: 520000, impressions: 490000 },
    { date: 'Sep', reach: 384500, engagement: 48900, followers: 566700, impressions: 620400 },
  ],
};
