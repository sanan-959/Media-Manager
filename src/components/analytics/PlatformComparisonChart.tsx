import React from 'react';
import { platformMetrics } from '../../data/mockAnalytics';
import { PlatformBadge } from '../common/PlatformBadge';
import { formatNumber } from '../../utils/helpers';

export const PlatformComparisonChart: React.FC = () => {
  const maxReach = Math.max(...platformMetrics.map((p) => p.reach));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl p-4 shadow-2xs space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Platform Performance
        </h4>
        <span className="text-[10px] text-slate-400 font-semibold">Total Audience Reach</span>
      </div>

      <div className="space-y-2.5">
        {platformMetrics.map((item) => {
          const percent = Math.round((item.reach / maxReach) * 100);
          return (
            <div key={item.platform} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <PlatformBadge platform={item.platform} size="sm" />
                <div className="flex items-center gap-2.5 font-semibold text-slate-700 dark:text-slate-300">
                  <span className="text-[10px] text-slate-400">
                    {item.engagementRate}% Eng. Rate
                  </span>
                  <span className="text-xs">{formatNumber(item.reach)} reach</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
