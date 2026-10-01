import React from 'react';
import type { Post } from '../../types';
import { Modal } from '../common/Modal';
import { PlatformBadge } from '../common/PlatformBadge';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate, formatDateTime, formatNumber } from '../../utils/helpers';
import {
  Heart,
  MessageCircle,
  Share2,
  MousePointer,
  Eye,
  TrendingUp,
  Clock,
  Edit2,
  Copy,
  Trash2,
  UserCheck,
} from 'lucide-react';

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (post: Post) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  isOpen,
  onClose,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  if (!post) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Post Details & Analytics" maxWidth="2xl">
      <div className="space-y-4">
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/90 dark:border-slate-800/90">
          <div className="flex items-center gap-2">
            <StatusBadge status={post.status} />
            <div className="flex items-center gap-1">
              {post.platforms.map((p) => (
                <PlatformBadge key={p} platform={p} size="sm" />
              ))}
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary-brand" />
            <span>
              {post.scheduledFor
                ? `Scheduled: ${formatDateTime(post.scheduledFor)}`
                : post.publishedAt
                ? `Published: ${formatDate(post.publishedAt)}`
                : `Created: ${formatDate(post.createdAt)}`}
            </span>
          </div>
        </div>

        {/* Author & Approver Row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-primary-brand/30"
            />
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">{post.author.name}</p>
              <p className="text-slate-500 dark:text-slate-400 text-[10px]">Content Author</p>
            </div>
          </div>

          {post.approver && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Approved by {post.approver.name}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/90 dark:border-slate-800/90 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>

        {/* Hashtags & Mentions */}
        {(post.hashtags.length > 0 || post.mentions.length > 0) && (
          <div className="flex flex-wrap gap-1.5">
            {post.hashtags.map((h) => (
              <span key={h} className="px-2 py-0.5 text-xs bg-primary-light text-primary-brand font-semibold rounded-md border border-primary-brand/20">
                {h}
              </span>
            ))}
            {post.mentions.map((m) => (
              <span key={m} className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-md border border-slate-200 dark:border-slate-700">
                {m}
              </span>
            ))}
          </div>
        )}

        {/* Media Attachments Gallery */}
        {post.media && post.media.length > 0 && (
          <div>
            <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Attached Media
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {post.media.map((item) => (
                <div key={item.id} className="rounded-xl overflow-hidden aspect-video bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <img src={item.url} alt="Media" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Metrics Section (if published) */}
        {post.metrics && (
          <div className="p-3.5 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-xs">
            <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-primary-brand" />
              Live Performance Analytics
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
              <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700/60">
                <Heart className="w-3.5 h-3.5 mx-auto text-rose-400 mb-1" />
                <p className="text-xs font-bold">{formatNumber(post.metrics.likes)}</p>
                <p className="text-[10px] text-slate-400">Likes</p>
              </div>
              <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700/60">
                <MessageCircle className="w-3.5 h-3.5 mx-auto text-sky-400 mb-1" />
                <p className="text-xs font-bold">{formatNumber(post.metrics.comments)}</p>
                <p className="text-[10px] text-slate-400">Comments</p>
              </div>
              <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700/60">
                <Share2 className="w-3.5 h-3.5 mx-auto text-emerald-400 mb-1" />
                <p className="text-xs font-bold">{formatNumber(post.metrics.shares)}</p>
                <p className="text-[10px] text-slate-400">Shares</p>
              </div>
              <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700/60">
                <MousePointer className="w-3.5 h-3.5 mx-auto text-amber-400 mb-1" />
                <p className="text-xs font-bold">{formatNumber(post.metrics.clicks)}</p>
                <p className="text-[10px] text-slate-400">Clicks</p>
              </div>
              <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700/60">
                <Eye className="w-3.5 h-3.5 mx-auto text-indigo-400 mb-1" />
                <p className="text-xs font-bold">{formatNumber(post.metrics.reach)}</p>
                <p className="text-[10px] text-slate-400">Reach</p>
              </div>
              <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700/60">
                <TrendingUp className="w-3.5 h-3.5 mx-auto text-purple-400 mb-1" />
                <p className="text-xs font-bold">{formatNumber(post.metrics.impressions)}</p>
                <p className="text-[10px] text-slate-400">Impressions</p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Action Controls */}
        <div className="pt-3 border-t border-slate-200/90 dark:border-slate-800/90 flex items-center justify-between">
          <button
            onClick={() => {
              onDelete(post.id);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onDuplicate(post.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Copy className="w-3.5 h-3.5" /> Duplicate
            </button>
            <button
              onClick={() => {
                onEdit(post);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white btn-brand-primary rounded-lg shadow-xs transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit Post
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
