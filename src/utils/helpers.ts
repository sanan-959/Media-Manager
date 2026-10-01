import type { SocialPlatform, PostStatus, TeamRole } from '../types';

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateTime = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getPlatformInfo = (platform: SocialPlatform) => {
  switch (platform) {
    case 'facebook':
      return {
        name: 'Facebook',
        color: '#1877F2',
        bgColor: 'bg-blue-50 dark:bg-blue-950/40',
        textColor: 'text-blue-600 dark:text-blue-400',
        borderColor: 'border-blue-200 dark:border-blue-800',
        badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
      };
    case 'instagram':
      return {
        name: 'Instagram',
        color: '#E4405F',
        bgColor: 'bg-pink-50 dark:bg-pink-950/40',
        textColor: 'text-pink-600 dark:text-pink-400',
        borderColor: 'border-pink-200 dark:border-pink-800',
        badgeBg: 'bg-pink-100 text-pink-800 dark:bg-pink-900/60 dark:text-pink-300',
      };
    case 'linkedin':
      return {
        name: 'LinkedIn',
        color: '#0A66C2',
        bgColor: 'bg-sky-50 dark:bg-sky-950/40',
        textColor: 'text-sky-600 dark:text-sky-400',
        borderColor: 'border-sky-200 dark:border-sky-800',
        badgeBg: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300',
      };
    case 'twitter':
      return {
        name: 'X (Twitter)',
        color: '#1DA1F2',
        bgColor: 'bg-slate-100 dark:bg-slate-800',
        textColor: 'text-slate-900 dark:text-slate-100',
        borderColor: 'border-slate-300 dark:border-slate-700',
        badgeBg: 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900',
      };
    case 'tiktok':
      return {
        name: 'TikTok',
        color: '#000000',
        bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        borderColor: 'border-emerald-200 dark:border-emerald-800',
        badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
      };
    case 'youtube':
      return {
        name: 'YouTube',
        color: '#FF0000',
        bgColor: 'bg-red-50 dark:bg-red-950/40',
        textColor: 'text-red-600 dark:text-red-400',
        borderColor: 'border-red-200 dark:border-red-800',
        badgeBg: 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300',
      };
  }
};

export const getStatusInfo = (status: PostStatus) => {
  switch (status) {
    case 'draft':
      return {
        label: 'Draft',
        className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
        dotColor: 'bg-slate-400',
      };
    case 'in_review':
      return {
        label: 'In Review',
        className: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
        dotColor: 'bg-amber-500',
      };
    case 'approved':
      return {
        label: 'Approved',
        className: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
        dotColor: 'bg-blue-500',
      };
    case 'scheduled':
      return {
        label: 'Scheduled',
        className: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800/60',
        dotColor: 'bg-purple-500',
      };
    case 'published':
      return {
        label: 'Published',
        className: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
        dotColor: 'bg-emerald-500',
      };
    case 'failed':
      return {
        label: 'Failed',
        className: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 border-red-200 dark:border-red-800/60',
        dotColor: 'bg-red-500',
      };
  }
};

export const getRoleInfo = (role: TeamRole) => {
  switch (role) {
    case 'admin':
      return {
        label: 'Admin',
        badgeClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
        description: 'Full access to workspace settings, billing, team, & posts',
      };
    case 'manager':
      return {
        label: 'Social Media Manager',
        badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
        description: 'Can manage accounts, approve posts, and view full analytics',
      };
    case 'creator':
      return {
        label: 'Content Creator',
        badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        description: 'Can draft and submit posts for review, view calendar & inbox',
      };
    case 'reviewer':
      return {
        label: 'Reviewer',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        description: 'Can review, approve, or request revisions on pending posts',
      };
  }
};
