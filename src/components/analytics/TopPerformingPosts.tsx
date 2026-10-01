import React from 'react';
import type { Post } from '../../types';
import { PlatformBadge } from '../common/PlatformBadge';
import { formatNumber } from '../../utils/helpers';
import { Heart, MessageCircle, Share2, Award } from 'lucide-react';

interface TopPerformingPostsProps {
  posts: Post[];
}

export const TopPerformingPosts: React.FC<TopPerformingPostsProps> = ({ posts }) => {
  const publishedPosts = posts
    .filter((p) => p.status === 'published' && p.metrics)
    .sort((a, b) => (b.metrics?.reach || 0) - (a.metrics?.reach || 0))
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl p-4 shadow-2xs space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          Top Performing Content
        </h4>
        <span className="text-[10px] text-slate-400 font-semibold">Ranked by Reach</span>
      </div>

      <div className="space-y-2.5">
        {publishedPosts.map((post, index) => (
          <div
            key={post.id}
            className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-2.5"
          >
            <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
              #{index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                {post.platforms.map((p) => (
                  <PlatformBadge key={p} platform={p} size="sm" showName={false} />
                ))}
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-medium line-clamp-2">
                {post.content}
              </p>

              {post.metrics && (
                <div className="mt-1.5 flex items-center gap-3 text-[10px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                    <Heart className="w-2.5 h-2.5" /> {formatNumber(post.metrics.likes)}
                  </span>
                  <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                    <MessageCircle className="w-2.5 h-2.5" /> {formatNumber(post.metrics.comments)}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Share2 className="w-2.5 h-2.5" /> {formatNumber(post.metrics.shares)}
                  </span>
                  <span className="ml-auto text-indigo-600 dark:text-indigo-400 font-extrabold">
                    {formatNumber(post.metrics.reach)} reach
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
