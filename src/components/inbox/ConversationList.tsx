import React from 'react';
import type { Conversation } from '../../types';
import { PlatformBadge } from '../common/PlatformBadge';
import { SearchInput } from '../common/SearchInput';

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
  filterType: 'all' | 'message' | 'comment' | 'mention';
  onFilterChange: (type: 'all' | 'message' | 'comment' | 'mention') => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeId,
  onSelect,
  search,
  onSearchChange,
  filterType,
  onFilterChange,
}) => {
  const filtered = conversations.filter((c) => {
    if (filterType !== 'all' && c.type !== filterType) return false;
    if (search.trim()) {
      const query = search.toLowerCase();
      return (
        c.customerName.toLowerCase().includes(query) ||
        c.customerHandle.toLowerCase().includes(query) ||
        c.lastMessage.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800/90">
      {/* Header & Search */}
      <div className="p-3 border-b border-slate-200/90 dark:border-slate-800/90 space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
          Social Inbox
        </h3>
        <SearchInput value={search} onChange={onSearchChange} placeholder="Search messages..." />

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-xs font-semibold">
          {(['all', 'message', 'comment', 'mention'] as const).map((t) => (
            <button
              key={t}
              onClick={() => onFilterChange(t)}
              className={`flex-1 py-1 rounded-md capitalize text-[10px] font-bold transition-all cursor-pointer ${
                filterType === t
                  ? 'bg-white dark:bg-slate-900 text-primary-brand shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">No conversations found</div>
        ) : (
          filtered.map((conv) => {
            const isActive = activeId === conv.id;
            return (
              <div
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`p-3 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-primary-light border-l-3 border-primary-brand'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={conv.customerAvatar}
                      alt={conv.customerName}
                      className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {conv.customerName}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{conv.customerHandle}</p>
                    </div>
                  </div>
                  <PlatformBadge platform={conv.platform} size="sm" showName={false} />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 mb-1">
                  {conv.lastMessage}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>{conv.lastMessageTime}</span>
                  {conv.unread && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-brand animate-pulse" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
