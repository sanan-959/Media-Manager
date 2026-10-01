import React from 'react';
import type { PostStatus } from '../../types';
import { getStatusInfo } from '../../utils/helpers';

interface StatusBadgeProps {
  status: PostStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const info = getStatusInfo(status);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1.5 rounded-full font-medium',
    md: 'px-2.5 py-1 text-xs gap-2 rounded-full font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center border ${info.className} ${sizeClasses[size]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${info.dotColor} shrink-0 animate-pulse`} />
      {info.label}
    </span>
  );
};
