import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  showShortcut?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  showShortcut = false,
}) => {
  return (
    <div className={`relative flex items-center group ${className}`}>
      <Search className="w-4 h-4 absolute left-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-slate-50/80 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs font-normal"
      />
      {value ? (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : showShortcut ? (
        <span className="absolute right-2.5 hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
          ⌘K
        </span>
      ) : null}
    </div>
  );
};
