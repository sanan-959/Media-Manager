import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import type { SocialPlatform, MediaAttachment, PostStatus } from '../../types';
import { SocialPreview } from './SocialPreview';
import { PlatformBadge } from '../common/PlatformBadge';
import {
  Video,
  Hash,
  AtSign,
  Calendar,
  Clock,
  Send,
  Save,
  CheckCircle,
  X,
  AlertCircle,
} from 'lucide-react';

const availablePlatforms: SocialPlatform[] = [
  'facebook',
  'instagram',
  'linkedin',
  'twitter',
  'tiktok',
  'youtube',
];

const sampleMediaPresets: MediaAttachment[] = [
  {
    id: 'preset-1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    altText: 'Analytics dashboard',
  },
  {
    id: 'preset-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    altText: 'Team collaboration',
  },
  {
    id: 'preset-3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    altText: 'Strategy growth',
  },
  {
    id: 'preset-4',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    altText: 'Video tutorial',
  },
];

const quickHashtags = ['#SaaS', '#TechGrowth', '#Marketing2026', '#AI', '#SocialMediaManager', '#Productivity'];

export const PostComposer: React.FC = () => {
  const { isComposerOpen, closeComposer, composerInitialPost, addPost, updatePost } = useApp();
  const { showToast } = useToast();

  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(['twitter', 'linkedin']);
  const [activePreviewPlatform, setActivePreviewPlatform] = useState<SocialPlatform>('twitter');
  const [mediaList, setMediaList] = useState<MediaAttachment[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState('');
  const [mentions, setMentions] = useState<string[]>([]);
  const [newMention, setNewMention] = useState('');
  const [scheduledFor, setScheduledFor] = useState('');
  const [postAction, setPostAction] = useState<PostStatus>('scheduled');

  // Populate form if editing or duplicating an existing post
  useEffect(() => {
    if (composerInitialPost) {
      setContent(composerInitialPost.content);
      setSelectedPlatforms(composerInitialPost.platforms);
      setActivePreviewPlatform(composerInitialPost.platforms[0] || 'twitter');
      setMediaList(composerInitialPost.media || []);
      setHashtags(composerInitialPost.hashtags || []);
      setMentions(composerInitialPost.mentions || []);
      setScheduledFor(composerInitialPost.scheduledFor ? composerInitialPost.scheduledFor.substring(0, 16) : '');
      setPostAction(composerInitialPost.status);
    } else {
      // Default reset
      setContent('');
      setSelectedPlatforms(['twitter', 'linkedin']);
      setActivePreviewPlatform('twitter');
      setMediaList([]);
      setHashtags(['#SaaS', '#TechGrowth']);
      setMentions([]);
      // Default scheduledFor to tomorrow at 10 AM
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      setScheduledFor(tomorrow.toISOString().substring(0, 16));
      setPostAction('scheduled');
    }
  }, [composerInitialPost, isComposerOpen]);

  // Keep preview platform in sync with selected platforms
  useEffect(() => {
    if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(activePreviewPlatform)) {
      setActivePreviewPlatform(selectedPlatforms[0]);
    }
  }, [selectedPlatforms, activePreviewPlatform]);

  const togglePlatform = (p: SocialPlatform) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length === 1) return; // keep at least 1
      setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleAddHashtag = (tag: string) => {
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    if (formatted.length > 1 && !hashtags.includes(formatted)) {
      setHashtags([...hashtags, formatted]);
    }
    setNewHashtag('');
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter((h) => h !== tag));
  };

  const handleAddMention = (men: string) => {
    const formatted = men.startsWith('@') ? men : `@${men}`;
    if (formatted.length > 1 && !mentions.includes(formatted)) {
      setMentions([...mentions, formatted]);
    }
    setNewMention('');
  };

  const removeMention = (men: string) => {
    setMentions(mentions.filter((m) => m !== men));
  };

  const toggleMediaPreset = (media: MediaAttachment) => {
    if (mediaList.some((m) => m.id === media.id)) {
      setMediaList(mediaList.filter((m) => m.id !== media.id));
    } else {
      setMediaList([...mediaList, media]);
    }
  };

  const handleSave = (targetStatus: PostStatus) => {
    if (!content.trim()) {
      showToast('Caption Required', 'Please enter content caption before submitting.', 'error');
      return;
    }

    const payload = {
      content,
      platforms: selectedPlatforms,
      media: mediaList,
      hashtags,
      mentions,
      status: targetStatus,
      scheduledFor: targetStatus === 'scheduled' ? new Date(scheduledFor).toISOString() : undefined,
    };

    if (composerInitialPost?.id && !composerInitialPost.content.includes('(Copy)')) {
      updatePost(composerInitialPost.id, payload);
      showToast('Post Updated', `Post saved as ${targetStatus.replace('_', ' ')}.`);
    } else {
      addPost(payload);
      if (targetStatus === 'published') {
        showToast('Published Live! 🚀', 'Post published across selected channels.');
      } else if (targetStatus === 'scheduled') {
        showToast('Scheduled Successfully! 📅', `Queued for ${new Date(scheduledFor).toLocaleDateString()}`);
      } else if (targetStatus === 'in_review') {
        showToast('Submitted for Review 📝', 'Manager notification sent for approval.');
      } else {
        showToast('Draft Saved 💾', 'Post saved in your draft queue.');
      }
    }

    closeComposer();
  };

  return (
    <Modal
      isOpen={isComposerOpen}
      onClose={closeComposer}
      title={composerInitialPost ? 'Edit & Preview Post' : 'Create Social Post'}
      subtitle="Publish or schedule high-converting content across multi-channel platforms"
      maxWidth="4xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Target Platforms Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Select Social Platforms
            </label>
            <div className="flex flex-wrap gap-2">
              {availablePlatforms.map((p) => {
                const isSelected = selectedPlatforms.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    className={`transition-all transform active:scale-95 ${
                      isSelected ? 'opacity-100 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900' : 'opacity-50 grayscale hover:grayscale-0'
                    }`}
                  >
                    <PlatformBadge platform={p} size="md" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Caption Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Post Caption
              </label>
              <span className="text-[11px] font-medium text-slate-400">
                {content.length} characters
              </span>
            </div>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What would you like to share today? Type caption or AI ideas..."
              className="w-full p-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800/90 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 leading-relaxed transition-all"
            />
          </div>

          {/* Media Selection / Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Media Attachments
            </label>
            <div className="grid grid-cols-4 gap-2">
              {sampleMediaPresets.map((media) => {
                const isAttached = mediaList.some((m) => m.id === media.id);
                return (
                  <div
                    key={media.id}
                    onClick={() => toggleMediaPreset(media)}
                    className={`relative rounded-lg overflow-hidden aspect-video cursor-pointer border-2 transition-all ${
                      isAttached
                        ? 'border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={media.url} alt={media.altText} className="w-full h-full object-cover" />
                    {media.type === 'video' && (
                      <div className="absolute top-1 left-1 p-1 bg-slate-900/80 rounded-md text-white">
                        <Video className="w-3 h-3" />
                      </div>
                    )}
                    {isAttached && (
                      <div className="absolute top-1 right-1 p-0.5 bg-indigo-600 rounded-full text-white">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hashtags & Mentions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Hashtags */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                <Hash className="w-3.5 h-3.5 text-indigo-500" />
                Hashtags
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <input
                  type="text"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHashtag(newHashtag))}
                  placeholder="Add hashtag..."
                  className="flex-1 px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800/90 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleAddHashtag(newHashtag)}
                  className="px-2.5 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 cursor-pointer"
                >
                  Add
                </button>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-1">
                {hashtags.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-md"
                  >
                    {h}
                    <X className="w-3 h-3 cursor-pointer hover:text-rose-500" onClick={() => removeHashtag(h)} />
                  </span>
                ))}
              </div>

              {/* Quick Suggestion Chips */}
              <div className="mt-1.5 flex flex-wrap gap-1">
                {quickHashtags.slice(0, 4).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleAddHashtag(q)}
                    className="text-[10px] text-slate-400 hover:text-indigo-500 underline cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Mentions */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                <AtSign className="w-3.5 h-3.5 text-indigo-500" />
                Mentions
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <input
                  type="text"
                  value={newMention}
                  onChange={(e) => setNewMention(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMention(newMention))}
                  placeholder="Add @account..."
                  className="flex-1 px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800/90 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleAddMention(newMention)}
                  className="px-2.5 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 cursor-pointer"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1">
                {mentions.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md"
                  >
                    {m}
                    <X className="w-3 h-3 cursor-pointer hover:text-rose-500" onClick={() => removeMention(m)} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Scheduling Controls */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800/90 rounded-xl">
            <div className="flex items-center gap-1.5 mb-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">
                Schedule & Approvals
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                  Target Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={scheduledFor}
                  onChange={(e) => setScheduledFor(e.target.value)}
                  className="w-full px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                  Workflow Action
                </label>
                <select
                  value={postAction}
                  onChange={(e) => setPostAction(e.target.value as PostStatus)}
                  className="w-full px-2.5 py-1 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value="scheduled">Schedule for Later</option>
                  <option value="in_review">Submit for Approval Review</option>
                  <option value="draft">Save as Draft</option>
                  <option value="published">Publish Immediately</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Multi-Platform Social Preview */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Preview Mode
            </span>
            <div className="flex items-center gap-1">
              {selectedPlatforms.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActivePreviewPlatform(p)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase transition-all cursor-pointer ${
                    activePreviewPlatform === p
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {p.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <SocialPreview
            platform={activePreviewPlatform}
            content={content}
            media={mediaList}
            hashtags={hashtags}
            mentions={mentions}
          />
        </div>
      </div>

      {/* Modal Actions Footer */}
      <div className="mt-4 pt-3 border-t border-slate-200/90 dark:border-slate-800/90 flex flex-wrap items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={() => handleSave('draft')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save as Draft</span>
        </button>

        <div className="flex items-center gap-2">
          {postAction === 'in_review' && (
            <button
              type="button"
              onClick={() => handleSave('in_review')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all cursor-pointer"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Submit for Review</span>
            </button>
          )}

          {postAction === 'scheduled' && (
            <button
              type="button"
              onClick={() => handleSave('scheduled')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition-all cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Schedule Post</span>
            </button>
          )}

          {postAction === 'published' && (
            <button
              type="button"
              onClick={() => handleSave('published')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Now</span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
