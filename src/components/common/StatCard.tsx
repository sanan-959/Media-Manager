import React, { type ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon,
  iconBgColor = 'bg-indigo-50 dark:bg-indigo-950/60',
  iconColor = 'text-indigo-600 dark:text-indigo-400',
  description,
}) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 group flex flex-col justify-between relative overflow-hidden">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
            {title}
          </span>
          <div className={`p-1.5 rounded-lg shrink-0 ${iconBgColor} ${iconColor} transition-transform duration-200 group-hover:scale-105 shadow-2xs`}>
            {icon}
          </div>
        </div>

        <div className="mt-2.5 flex items-baseline justify-between gap-2 flex-wrap">
          <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
            {value}
          </span>

          {change !== undefined && (
            <div
              className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                isPositive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-2.5 h-2.5 mr-0.5 stroke-[2.5]" />
              ) : (
                <TrendingDown className="w-2.5 h-2.5 mr-0.5 stroke-[2.5]" />
              )}
              {isPositive ? `+${change}%` : `${change}%`}
            </div>
          )}
        </div>
      </div>

      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 truncate font-medium">
        {description || changeLabel}
      </p>
    </div>
  );
};
