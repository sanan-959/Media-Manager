import React from 'react';
import type { SocialPlatform, MediaAttachment } from '../../types';
import { getPlatformInfo } from '../../utils/helpers';
import {
  Heart,
  MessageCircle,
  Repeat,
  Send,
  Bookmark,
  ThumbsUp,
  Share2,
  MoreHorizontal,
  Globe,
  Eye,
} from 'lucide-react';

interface SocialPreviewProps {
  platform: SocialPlatform;
  content: string;
  media: MediaAttachment[];
  hashtags: string[];
  mentions: string[];
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
}

export const SocialPreview: React.FC<SocialPreviewProps> = ({
  platform,
  content,
  media,
  hashtags,
  mentions,
  authorName = 'TechVibe Official',
  authorHandle = '@techvibe_hq',
  authorAvatar = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
}) => {
  const platformInfo = getPlatformInfo(platform);

  // Combine content text with tags if needed
  const fullText = `${content} ${hashtags.join(' ')} ${mentions.join(' ')}`.trim();

  return (
    <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-indigo-500" />
          Live {platformInfo.name} Preview
        </span>
        <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">
          Realtime
        </span>
      </div>

      {/* Render platform specific mock card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm max-w-md mx-auto">
        {/* Card Header */}
        <div className="p-3.5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-3">
            <img
              src={authorAvatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                {authorName}
                {platform === 'twitter' || platform === 'instagram' ? (
                  <span className="text-sky-500 text-[10px]">✓</span>
                ) : null}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                {authorHandle} • <Globe className="w-3 h-3 inline" /> Just now
              </div>
            </div>
          </div>
          <MoreHorizontal className="w-4 h-4 text-slate-400" />
        </div>

        {/* Card Body Text */}
        <div className="p-3.5 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
          {fullText || <span className="italic text-slate-400">Start typing caption to preview...</span>}
        </div>

        {/* Card Media Preview */}
        {media.length > 0 && (
          <div className="relative bg-slate-950 overflow-hidden max-h-72">
            {media[0].type === 'image' ? (
              <img
                src={media[0].url}
                alt="Preview"
                className="w-full h-full object-cover max-h-72"
              />
            ) : (
              <div className="relative flex items-center justify-center h-64 bg-slate-900 text-white">
                <img
                  src={media[0].thumbnail || media[0].url}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute p-3 bg-white/20 backdrop-blur-md rounded-full">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            )}
            {media.length > 1 && (
              <span className="absolute bottom-2 right-2 px-2 py-1 bg-slate-900/80 text-white text-[10px] font-bold rounded-md backdrop-blur-sm">
                + {media.length - 1} more
              </span>
            )}
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-slate-500 text-xs">
          {platform === 'facebook' && (
            <>
              <button className="flex items-center gap-1 hover:text-blue-600">
                <ThumbsUp className="w-4 h-4" /> Like
              </button>
              <button className="flex items-center gap-1 hover:text-slate-800">
                <MessageCircle className="w-4 h-4" /> Comment
              </button>
              <button className="flex items-center gap-1 hover:text-slate-800">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </>
          )}

          {platform === 'instagram' && (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <Heart className="w-4 h-4 text-slate-600 dark:text-slate-400 hover:text-rose-500" />
                <MessageCircle className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <Send className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </div>
              <Bookmark className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </div>
          )}

          {platform === 'twitter' && (
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> 0</span>
              <span className="flex items-center gap-1"><Repeat className="w-4 h-4" /> 0</span>
              <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> 0</span>
              <span className="flex items-center gap-1"><Share2 className="w-4 h-4" /></span>
            </div>
          )}

          {platform === 'linkedin' && (
            <>
              <button className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> Like</button>
              <button className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> Comment</button>
              <button className="flex items-center gap-1"><Repeat className="w-4 h-4" /> Repost</button>
              <button className="flex items-center gap-1"><Send className="w-4 h-4" /> Send</button>
            </>
          )}

          {(platform === 'tiktok' || platform === 'youtube') && (
            <div className="flex items-center justify-around w-full">
              <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> Like</span>
              <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> Comment</span>
              <span className="flex items-center gap-1"><Share2 className="w-4 h-4" /> Share</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
