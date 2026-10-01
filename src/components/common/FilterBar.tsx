import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  selectedValue: string;
  onChange: (val: string) => void;
}

interface FilterBarProps {
  groups: FilterGroup[];
  onReset?: () => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  groups,
  onReset,
  className = '',
}) => {
  const hasActiveFilter = groups.some((g) => g.selectedValue !== 'all' && g.selectedValue !== '');

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
        <Filter className="w-3.5 h-3.5" />
        <span>Filters:</span>
      </div>

      {groups.map((group) => (
        <select
          key={group.id}
          value={group.selectedValue}
          onChange={(e) => group.onChange(e.target.value)}
          className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
        >
          {group.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {group.label}: {opt.label}
            </option>
          ))}
        </select>
      ))}

      {hasActiveFilter && onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      )}
    </div>
  );
};
