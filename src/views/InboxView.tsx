import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ConversationList } from '../components/inbox/ConversationList';
import { MessageThread } from '../components/inbox/MessageThread';
import { UserProfilePanel } from '../components/inbox/UserProfilePanel';

export const InboxView: React.FC = () => {
  const { conversations, activeConversationId, setActiveConversationId, replyToConversation } =
    useApp();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'message' | 'comment' | 'mention'>('all');

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0] || null;

  return (
    <div className="h-[calc(100vh-5.5rem)] border border-slate-200/90 dark:border-slate-800/90 rounded-xl overflow-hidden shadow-2xs bg-white dark:bg-slate-900 grid grid-cols-1 lg:grid-cols-12 animate-fade-in">
      {/* Left Column: Conversations List (4 cols) */}
      <div className="lg:col-span-4 h-full overflow-hidden">
        <ConversationList
          conversations={conversations}
          activeId={activeConv?.id || null}
          onSelect={(id) => setActiveConversationId(id)}
          search={search}
          onSearchChange={setSearch}
          filterType={filterType}
          onFilterChange={setFilterType}
        />
      </div>

      {/* Center Column: Active Chat Thread (5 cols) */}
      <div className="lg:col-span-5 h-full overflow-hidden border-r border-slate-200/90 dark:border-slate-800/90">
        <MessageThread conversation={activeConv} onSendReply={replyToConversation} />
      </div>

      {/* Right Column: Customer CRM Info Side Panel (3 cols) */}
      <div className="hidden lg:block lg:col-span-3 h-full overflow-hidden">
        <UserProfilePanel conversation={activeConv} />
      </div>
    </div>
  );
};
