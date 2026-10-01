import React from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { MetricChart } from '../components/analytics/MetricChart';
import { PlatformComparisonChart } from '../components/analytics/PlatformComparisonChart';
import { PostCard } from '../components/posts/PostCard';
import { PlatformBadge } from '../components/common/PlatformBadge';
import { formatNumber, formatDate } from '../utils/helpers';
import {
  FileText,
  Calendar,
  Eye,
  TrendingUp,
  Users,
  UserPlus,
  Activity,
  ArrowRight,
  Clock,
  Zap,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    posts,
    activities,
    analyticsSummary,
    openComposer,
    setActiveTab,
    duplicatePost,
    deletePost,
  } = useApp();

  const scheduledPosts = posts.filter((p) => p.status === 'scheduled');
  const recentPosts = posts.slice(0, 4);

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* 6 Key KPI Stat Cards Grid - 3 cards per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        <StatCard
          title="Total Posts"
          value={posts.length}
          change={14.2}
          icon={<FileText className="w-3.5 h-3.5" />}
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/70"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
        <StatCard
          title="Scheduled"
          value={scheduledPosts.length}
          change={8.5}
          icon={<Calendar className="w-3.5 h-3.5" />}
          iconBgColor="bg-purple-50 dark:bg-purple-950/70"
          iconColor="text-purple-600 dark:text-purple-400"
        />
        <StatCard
          title="Total Reach"
          value={formatNumber(analyticsSummary.totalReach)}
          change={analyticsSummary.reachGrowth}
          icon={<Eye className="w-3.5 h-3.5" />}
          iconBgColor="bg-blue-50 dark:bg-blue-950/70"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Engagement"
          value={`${analyticsSummary.engagementGrowth}%`}
          change={analyticsSummary.engagementGrowth}
          icon={<TrendingUp className="w-3.5 h-3.5" />}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/70"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="Followers"
          value={formatNumber(analyticsSummary.followers)}
          change={analyticsSummary.followersGrowth}
          icon={<Users className="w-3.5 h-3.5" />}
          iconBgColor="bg-pink-50 dark:bg-pink-950/70"
          iconColor="text-pink-600 dark:text-pink-400"
        />
        <StatCard
          title="Growth Rate"
          value="+42.8K"
          change={12.4}
          icon={<UserPlus className="w-3.5 h-3.5" />}
          iconBgColor="bg-sky-50 dark:bg-sky-950/70"
          iconColor="text-sky-600 dark:text-sky-400"
        />
      </div>

      {/* Analytics Charts & Platform Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        <div className="lg:col-span-7">
          <MetricChart
            timeRange="7d"
            metricKey="reach"
            title="Weekly Reach Trend"
          />
        </div>
        <div className="lg:col-span-5">
          <PlatformComparisonChart />
        </div>
      </div>

      {/* Recent Posts & Upcoming Scheduled Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4">
        {/* Left 7 cols: Recent Content */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Active Content Feed
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('content')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              View All Content <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recentPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onView={(p) => openComposer(p)}
                onEdit={(p) => openComposer(p)}
                onDuplicate={duplicatePost}
                onDelete={deletePost}
              />
            ))}
          </div>
        </div>

        {/* Right 5 cols: Upcoming Scheduled Queue & Activity Stream */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Upcoming Queue Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-500" />
                Upcoming Queue
              </h4>
              <button
                onClick={() => setActiveTab('calendar')}
                className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
              >
                Calendar View
              </button>
            </div>

            <div className="space-y-2">
              {scheduledPosts.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-3 text-center">No scheduled posts queued.</p>
              ) : (
                scheduledPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    onClick={() => openComposer(post)}
                    className="p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200/80 dark:border-slate-800/80 cursor-pointer hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        {post.platforms.map((pl) => (
                          <PlatformBadge key={pl} platform={pl} size="sm" showName={false} />
                        ))}
                      </div>
                      <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
                        {post.scheduledFor ? formatDate(post.scheduledFor) : 'Queued'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 dark:text-slate-200 line-clamp-1 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {post.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity Stream Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl p-4 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-500" />
              Live Workspace Stream
            </h4>

            <div className="space-y-2.5">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <img
                    src={act.user.avatar}
                    alt={act.user.name}
                    className="w-6 h-6 rounded-lg object-cover shrink-0 mt-0.5 ring-1 ring-slate-200 dark:ring-slate-800"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-800 dark:text-slate-200 leading-snug text-[11px]">
                      <span className="font-bold text-slate-900 dark:text-white">{act.user.name}</span>{' '}
                      <span className="text-slate-500 dark:text-slate-400">{act.action}</span>{' '}
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                        "{act.target}"
                      </span>
                    </p>
                    <span className="text-[10px] text-slate-400 block">{act.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
