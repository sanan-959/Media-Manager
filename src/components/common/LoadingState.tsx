import React from 'react';

interface LoadingStateProps {
  label?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = 'Loading data...',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-950 opacity-25"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
      {label && <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-3">{label}</p>}
    </div>
  );
};
