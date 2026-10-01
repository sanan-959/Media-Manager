import React from 'react';
import type { Post } from '../../types';
import { PlatformBadge } from '../common/PlatformBadge';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate, formatDateTime, formatNumber } from '../../utils/helpers';
import { Dropdown } from '../common/Dropdown';
import { MoreHorizontal, Eye, Edit2, Copy, Trash2, Heart, Share2, Image as ImageIcon } from 'lucide-react';

interface PostTableProps {
  posts: Post[];
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const PostTable: React.FC<PostTableProps> = ({
  posts,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-xs">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-slate-200/90 dark:border-slate-800/90 bg-slate-50/80 dark:bg-slate-800/50 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            <th className="py-3 px-3.5 sm:px-4">Content</th>
            <th className="py-3 px-3.5 sm:px-4">Platforms</th>
            <th className="py-3 px-3.5 sm:px-4">Status</th>
            <th className="py-3 px-3.5 sm:px-4">Author</th>
            <th className="py-3 px-3.5 sm:px-4">Scheduled / Date</th>
            <th className="py-3 px-3.5 sm:px-4">Performance</th>
            <th className="py-3 px-3.5 sm:px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs text-slate-700 dark:text-slate-300 font-medium">
          {posts.map((post) => (
            <tr
              key={post.id}
              className="hover:bg-slate-50/90 dark:hover:bg-slate-800/60 transition-colors group"
            >
              {/* Content Snippet & Media Indicator */}
              <td className="py-3 px-3.5 sm:px-4 max-w-xs">
                <div className="flex items-center gap-2.5">
                  {post.media && post.media.length > 0 ? (
                    <img
                      src={post.media[0].url}
                      alt="Media"
                      className="w-9 h-9 rounded-lg object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {post.content}
                    </p>
                    {post.hashtags.length > 0 && (
                      <p className="text-[10px] text-primary-brand font-medium truncate mt-0.5">
                        {post.hashtags.join(' ')}
                      </p>
                    )}
                  </div>
                </div>
              </td>

              {/* Platforms */}
              <td className="py-3.5 px-4">
                <div className="flex flex-wrap gap-1">
                  {post.platforms.map((p) => (
                    <PlatformBadge key={p} platform={p} size="sm" showName={false} />
                  ))}
                </div>
              </td>

              {/* Status */}
              <td className="py-3.5 px-4">
                <StatusBadge status={post.status} size="sm" />
              </td>

              {/* Author */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="truncate text-slate-800 dark:text-slate-200">{post.author.name}</span>
                </div>
              </td>

              {/* Date */}
              <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                {post.scheduledFor
                  ? formatDateTime(post.scheduledFor)
                  : post.publishedAt
                  ? formatDate(post.publishedAt)
                  : formatDate(post.createdAt)}
              </td>

              {/* Performance */}
              <td className="py-3.5 px-4 whitespace-nowrap">
                {post.status === 'published' && post.metrics ? (
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
                      <Heart className="w-3 h-3" /> {formatNumber(post.metrics.likes)}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Share2 className="w-3 h-3" /> {formatNumber(post.metrics.reach)}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400 font-mono">—</span>
                )}
              </td>

              {/* Actions */}
              <td className="py-3.5 px-4 text-right">
                <Dropdown
                  trigger={
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  }
                  items={[
                    { id: 'v', label: 'View Details', icon: <Eye className="w-3.5 h-3.5" />, onClick: () => onView(post) },
                    { id: 'e', label: 'Edit Post', icon: <Edit2 className="w-3.5 h-3.5" />, onClick: () => onEdit(post) },
                    { id: 'd', label: 'Duplicate Post', icon: <Copy className="w-3.5 h-3.5" />, onClick: () => onDuplicate(post.id) },
                    { id: 'del', label: 'Delete', icon: <Trash2 className="w-3.5 h-3.5" />, onClick: () => onDelete(post.id), isDanger: true },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
