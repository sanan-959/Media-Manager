import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/posts/PostCard';
import { PostTable } from '../components/posts/PostTable';
import { PostDetailModal } from '../components/posts/PostDetailModal';
import type { SocialPlatform, PostStatus, Post } from '../types';
import { SearchInput } from '../components/common/SearchInput';
import { FilterBar } from '../components/common/FilterBar';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmationDialog } from '../components/common/ConfirmationDialog';
import { LayoutGrid, List, Plus, FileText } from 'lucide-react';

export const ContentView: React.FC = () => {
  const { posts, openComposer, duplicatePost, deletePost } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<PostStatus | 'all'>('all');

  // Selected post for Detail Modal
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Selected post for Delete Confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredPosts = posts.filter((p) => {
    if (platformFilter !== 'all' && !p.platforms.includes(platformFilter)) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.content.toLowerCase().includes(q) ||
        p.hashtags.some((h) => h.toLowerCase().includes(q)) ||
        p.author.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filterGroups = [
    {
      id: 'platform',
      label: 'Platform',
      selectedValue: platformFilter,
      onChange: (val: string) => setPlatformFilter(val as SocialPlatform | 'all'),
      options: [
        { label: 'All Platforms', value: 'all' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'Twitter / X', value: 'twitter' },
        { label: 'TikTok', value: 'tiktok' },
        { label: 'YouTube', value: 'youtube' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      selectedValue: statusFilter,
      onChange: (val: string) => setStatusFilter(val as PostStatus | 'all'),
      options: [
        { label: 'All Statuses', value: 'all' },
        { label: 'Draft', value: 'draft' },
        { label: 'In Review', value: 'in_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Published', value: 'published' },
        { label: 'Failed', value: 'failed' },
      ],
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Top Title & Quick Create */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            Content Library
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            View, schedule, filter, and manage social media posts across channels
          </p>
        </div>

        <button
          onClick={() => openComposer()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold btn-brand-primary rounded-lg cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Post</span>
        </button>
      </div>

      {/* Search & Filter Bar with Grid/Table Switcher */}
      <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search content, tags, or author..."
            className="w-full sm:w-60"
          />
          <FilterBar
            groups={filterGroups}
            onReset={() => {
              setPlatformFilter('all');
              setStatusFilter('all');
              setSearch('');
            }}
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-slate-500">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title="Table View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {filteredPosts.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-8 h-8 text-slate-400" />}
          title="No Posts Found"
          description="No content matches your current filters or search term."
          actionText="Create New Post"
          onAction={() => openComposer()}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onView={(p) => setSelectedPost(p)}
              onEdit={(p) => openComposer(p)}
              onDuplicate={duplicatePost}
              onDelete={(id) => setDeletingId(id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl overflow-hidden shadow-2xs">
          <PostTable
            posts={filteredPosts}
            onView={(p) => setSelectedPost(p)}
            onEdit={(p) => openComposer(p)}
            onDuplicate={duplicatePost}
            onDelete={(id) => setDeletingId(id)}
          />
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onEdit={(p) => {
            setSelectedPost(null);
            openComposer(p);
          }}
          onDuplicate={(id) => duplicatePost(id)}
          onDelete={(id) => {
            deletePost(id);
            setSelectedPost(null);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => {
          if (deletingId) {
            deletePost(deletingId);
            setDeletingId(null);
          }
        }}
        title="Delete Post"
        message="Are you sure you want to permanently delete this post? This action cannot be undone."
        confirmText="Delete"
        isDangerous
      />
    </div>
  );
};
