import React from 'react';
import type { Post } from '../../types';
import { PlatformBadge } from '../common/PlatformBadge';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate, formatNumber } from '../../utils/helpers';
import {
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Layers,
} from 'lucide-react';
import { Dropdown } from '../common/Dropdown';

interface PostCardProps {
  post: Post;
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  const dropdownItems = [
    { id: 'view', label: 'View Details', icon: <Eye className="w-3.5 h-3.5" />, onClick: () => onView(post) },
    { id: 'edit', label: 'Edit Post', icon: <Edit2 className="w-3.5 h-3.5" />, onClick: () => onEdit(post) },
    { id: 'dup', label: 'Duplicate Post', icon: <Copy className="w-3.5 h-3.5" />, onClick: () => onDuplicate(post.id) },
    { id: 'del', label: 'Delete Post', icon: <Trash2 className="w-3.5 h-3.5" />, onClick: () => onDelete(post.id), isDanger: true },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {post.platforms.map((p) => (
              <PlatformBadge key={p} platform={p} size="sm" showName={false} />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <StatusBadge status={post.status} size="sm" />
            <Dropdown
              trigger={
                <button
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Post actions"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              }
              items={dropdownItems}
            />
          </div>
        </div>

        {/* Media Thumbnail */}
        {post.media && post.media.length > 0 && (
          <div
            onClick={() => onView(post)}
            className="mb-2.5 rounded-lg overflow-hidden aspect-video bg-slate-950 relative cursor-pointer group/img"
          >
            <img
              src={post.media[0].url}
              alt="Media"
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
            />
            {post.media.length > 1 && (
              <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/75 backdrop-blur-sm rounded text-white text-[10px] font-bold flex items-center gap-1">
                <Layers className="w-2.5 h-2.5" />
                <span>+{post.media.length - 1}</span>
              </div>
            )}
          </div>
        )}

        {/* Content Body */}
        <p
          onClick={() => onView(post)}
          className="text-xs text-slate-800 dark:text-slate-200 font-normal line-clamp-3 leading-relaxed mb-2.5 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          {post.content}
        </p>

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2.5">
            {post.hashtags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 min-w-0">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-4 h-4 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-800"
          />
          <span className="font-semibold text-slate-700 dark:text-slate-300 text-[10px] truncate">
            {post.author.name}
          </span>
        </div>

        {post.status === 'published' && post.metrics ? (
          <div className="flex items-center gap-2 font-bold text-[10px] text-slate-600 dark:text-slate-400 shrink-0">
            <span className="flex items-center gap-1" title="Likes">
              <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500/20" />
              {formatNumber(post.metrics.likes)}
            </span>
            <span className="flex items-center gap-1" title="Comments">
              <MessageCircle className="w-2.5 h-2.5 text-sky-500 fill-sky-500/20" />
              {formatNumber(post.metrics.comments)}
            </span>
            <span className="flex items-center gap-1" title="Shares">
              <Share2 className="w-2.5 h-2.5 text-emerald-500" />
              {formatNumber(post.metrics.shares)}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium shrink-0">
            <Clock className="w-2.5 h-2.5 text-indigo-500" />
            <span>{post.scheduledFor ? formatDate(post.scheduledFor) : formatDate(post.createdAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
