import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { StatCard } from '../components/common/StatCard';
import { DateRangePicker, type DateRangeOption } from '../components/common/DateRangePicker';
import { MetricChart } from '../components/analytics/MetricChart';
import { PlatformComparisonChart } from '../components/analytics/PlatformComparisonChart';
import { TopPerformingPosts } from '../components/analytics/TopPerformingPosts';
import { formatNumber } from '../utils/helpers';
import {
  Eye,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  MousePointer,
  Users,
  Download,
  BarChart2,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { analyticsSummary, posts } = useApp();
  const { showToast } = useToast();
  const [dateRange, setDateRange] = useState<DateRangeOption>('30d');

  const handleExport = () => {
    showToast('Report Exported! 📊', 'PDF Executive Analytics report downloaded.');
  };

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Page Header & Date Range Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            Analytics & Insights
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cross-platform audience engagement, impression metrics, and growth trends
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <DateRangePicker selectedRange={dateRange} onChange={setDateRange} />
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 rounded-lg shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-indigo-500" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 8 Metric KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2.5 sm:gap-3">
        <StatCard
          title="Total Reach"
          value={formatNumber(analyticsSummary.totalReach)}
          change={analyticsSummary.reachGrowth}
          icon={<Eye className="w-3.5 h-3.5" />}
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Impressions"
          value={formatNumber(analyticsSummary.impressions)}
          change={analyticsSummary.impressionsGrowth}
          icon={<BarChart2 className="w-3.5 h-3.5" />}
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/60"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatCard
          title="Engagement"
          value={formatNumber(analyticsSummary.engagement)}
          change={analyticsSummary.engagementGrowth}
          icon={<TrendingUp className="w-3.5 h-3.5" />}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="Followers Growth"
          value={formatNumber(analyticsSummary.followers)}
          change={analyticsSummary.followersGrowth}
          icon={<Users className="w-3.5 h-3.5" />}
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          iconColor="text-purple-600 dark:text-purple-400"
        />
        <StatCard
          title="Total Likes"
          value={formatNumber(analyticsSummary.likes)}
          change={14.8}
          icon={<Heart className="w-3.5 h-3.5" />}
          iconBgColor="bg-rose-50 dark:bg-rose-950/60"
          iconColor="text-rose-600 dark:text-rose-400"
        />
        <StatCard
          title="Comments"
          value={formatNumber(analyticsSummary.comments)}
          change={9.2}
          icon={<MessageCircle className="w-3.5 h-3.5" />}
          iconBgColor="bg-sky-50 dark:bg-sky-950/60"
          iconColor="text-sky-600 dark:text-sky-400"
        />
        <StatCard
          title="Shares"
          value={formatNumber(analyticsSummary.shares)}
          change={18.1}
          icon={<Share2 className="w-3.5 h-3.5" />}
          iconBgColor="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          title="Link Clicks"
          value={formatNumber(analyticsSummary.clicks)}
          change={21.4}
          icon={<MousePointer className="w-3.5 h-3.5" />}
          iconBgColor="bg-pink-50 dark:bg-pink-950/60"
          iconColor="text-pink-600 dark:text-pink-400"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4">
        <MetricChart
          timeRange={dateRange === 'custom' ? '30d' : dateRange}
          metricKey="engagement"
          title="Engagement Rate Over Time"
          color="#10b981"
        />
        <MetricChart
          timeRange={dateRange === 'custom' ? '30d' : dateRange}
          metricKey="followers"
          title="Cumulative Audience Growth"
          color="#8b5cf6"
        />
      </div>

      {/* Breakdown & Leaderboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        <div className="lg:col-span-6">
          <PlatformComparisonChart />
        </div>
        <div className="lg:col-span-6">
          <TopPerformingPosts posts={posts} />
        </div>
      </div>
    </div>
  );
};
