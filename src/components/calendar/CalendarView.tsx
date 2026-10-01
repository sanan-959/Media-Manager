import React, { useState } from 'react';
import type { Post, SocialPlatform, PostStatus } from '../../types';
import { PlatformBadge } from '../common/PlatformBadge';
import { StatusBadge } from '../common/StatusBadge';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';

interface CalendarViewProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
  onSelectDate: (date: Date) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  posts,
  onSelectPost,
  onSelectDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<PostStatus | 'all'>('all');

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    if (platformFilter !== 'all' && !p.platforms.includes(platformFilter)) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  // Month navigation helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrev = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (viewMode === 'week') {
      const prev = new Date(currentDate);
      prev.setDate(prev.getDate() - 7);
      setCurrentDate(prev);
    } else {
      const prev = new Date(currentDate);
      prev.setDate(prev.getDate() - 1);
      setCurrentDate(prev);
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (viewMode === 'week') {
      const next = new Date(currentDate);
      next.setDate(next.getDate() + 7);
      setCurrentDate(next);
    } else {
      const next = new Date(currentDate);
      next.setDate(next.getDate() + 1);
      setCurrentDate(next);
    }
  };

  // Helper to check if a post falls on a given date (1..31)
  const getPostsForDay = (dayNum: number) => {
    return filteredPosts.filter((p) => {
      const targetDate = p.scheduledFor ? new Date(p.scheduledFor) : new Date(p.createdAt);
      return (
        targetDate.getFullYear() === year &&
        targetDate.getMonth() === month &&
        targetDate.getDate() === dayNum
      );
    });
  };

  const today = new Date();
  const isToday = (dayNum: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === dayNum;

  return (
    <div className="space-y-3">
      {/* Calendar Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl shadow-2xs">
        {/* Month/Year Title & Controls */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg p-0.5">
            <button
              onClick={handlePrev}
              className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-2 py-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 cursor-pointer"
            >
              Today
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
            {monthNames[month]} {year}
          </h3>
        </div>

        {/* View Mode Switcher & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-xs font-semibold">
            {(['month', 'week', 'day'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-2.5 py-0.5 rounded capitalize transition-all cursor-pointer ${
                  viewMode === mode
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value as SocialPlatform | 'all')}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Platforms</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter / X</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PostStatus | 'all')}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="in_review">In Review</option>
          </select>
        </div>
      </div>

      {/* Month View Grid */}
      {viewMode === 'month' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl overflow-hidden shadow-2xs">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-slate-200/90 dark:border-slate-800/90 bg-slate-50/70 dark:bg-slate-800/40 text-center text-[11px] font-bold text-slate-500 py-2 uppercase">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-200/80 dark:divide-slate-800/80">
            {/* Empty slots for month start */}
            {Array.from({ length: firstDayIndex }).map((_, idx) => (
              <div key={`empty-${idx}`} className="min-h-[90px] bg-slate-50/40 dark:bg-slate-950/40 p-1.5" />
            ))}

            {/* Calendar Days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dayPosts = getPostsForDay(dayNum);
              const isTodayCell = isToday(dayNum);

              return (
                <div
                  key={dayNum}
                  onClick={() => onSelectDate(new Date(year, month, dayNum, 10, 0))}
                  className={`min-h-[90px] p-1.5 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 transition-colors group cursor-pointer flex flex-col justify-between ${
                    isTodayCell ? 'bg-indigo-50/40 dark:bg-indigo-950/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center ${
                        isTodayCell
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'text-slate-700 dark:text-slate-300 group-hover:text-indigo-600'
                      }`}
                    >
                      {dayNum}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDate(new Date(year, month, dayNum, 10, 0));
                      }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-indigo-600 transition-opacity"
                      title="Schedule post on this date"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Day Posts Badges */}
                  <div className="space-y-0.5 overflow-y-auto max-h-[65px] no-scrollbar">
                    {dayPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPost(post);
                        }}
                        className={`p-1 rounded text-[10px] font-semibold border transition-all truncate hover:scale-[1.01] shadow-2xs ${
                          post.status === 'scheduled'
                            ? 'bg-purple-50 dark:bg-purple-950/70 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200'
                            : post.status === 'published'
                            ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                            : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {post.platforms[0] && (
                            <PlatformBadge platform={post.platforms[0]} size="sm" showName={false} />
                          )}
                          <span className="truncate">{post.content}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week / Day View state */}
      {(viewMode === 'week' || viewMode === 'day') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              {viewMode === 'week' ? 'Weekly Timeline' : `Day View - ${currentDate.toLocaleDateString()}`}
            </h4>
            <span className="text-[11px] text-slate-400">Time slots (9 AM - 6 PM)</span>
          </div>

          <div className="space-y-2">
            {[9, 11, 14, 16, 18].map((hour) => (
              <div key={hour} className="flex items-start gap-3 p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200/80 dark:border-slate-800/80">
                <span className="text-[11px] font-mono font-bold text-slate-500 shrink-0 w-14">
                  {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                </span>
                <div className="flex-1 flex flex-wrap gap-2">
                  {filteredPosts.slice(0, 2).map((post) => (
                    <div
                      key={post.id}
                      onClick={() => onSelectPost(post)}
                      className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xs cursor-pointer hover:border-indigo-500 max-w-sm flex-1"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <PlatformBadge platform={post.platforms[0]} size="sm" />
                        <StatusBadge status={post.status} size="sm" />
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 line-clamp-1">
                        {post.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
