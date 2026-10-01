import React from 'react';
import { Calendar } from 'lucide-react';

export type DateRangeOption = '7d' | '30d' | '3m' | 'custom';

interface DateRangePickerProps {
  selectedRange: DateRangeOption;
  onChange: (range: DateRangeOption) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedRange,
  onChange,
  className = '',
}) => {
  const options: { id: DateRangeOption; label: string }[] = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '3m', label: 'Last 3 months' },
    { id: 'custom', label: 'Custom Range' },
  ];

  return (
    <div className={`inline-flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl ${className}`}>
      <Calendar className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
            selectedRange === opt.id
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
