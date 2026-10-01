import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalendarView } from '../components/calendar/CalendarView';
import { PostDetailModal } from '../components/posts/PostDetailModal';
import type { Post } from '../types';
import { Plus } from 'lucide-react';

export const CalendarViewPage: React.FC = () => {
  const { posts, openComposer, duplicatePost, deletePost } = useApp();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSelectDate = (date: Date) => {
    // Open composer with target scheduled date prefilled
    const ISO = date.toISOString();
    openComposer({
      id: '',
      content: '',
      media: [],
      platforms: ['twitter'],
      hashtags: [],
      mentions: [],
      status: 'scheduled',
      author: { id: '', name: '', avatar: '' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      scheduledFor: ISO,
    });
  };

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            Content Calendar
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Visualize scheduled, published, and draft content schedules
          </p>
        </div>

        <button
          onClick={() => openComposer()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold btn-brand-primary rounded-lg cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Schedule Post</span>
        </button>
      </div>

      {/* Main Calendar Component */}
      <CalendarView
        posts={posts}
        onSelectPost={(post) => setSelectedPost(post)}
        onSelectDate={handleSelectDate}
      />

      {/* Post Details Modal when clicking calendar item */}
      <PostDetailModal
        post={selectedPost}
        isOpen={Boolean(selectedPost)}
        onClose={() => setSelectedPost(null)}
        onEdit={(p) => openComposer(p)}
        onDuplicate={duplicatePost}
        onDelete={deletePost}
      />
    </div>
  );
};
