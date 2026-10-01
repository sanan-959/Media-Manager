import React, { useState } from 'react';
import type { Conversation } from '../../types';
import { PlatformBadge } from '../common/PlatformBadge';
import { Send, Sparkles } from 'lucide-react';

interface MessageThreadProps {
  conversation: Conversation | null;
  onSendReply: (convId: string, text: string) => void;
}

const cannedResponses = [
  'Thanks for reaching out! Our team is looking into this.',
  'Hi there! You can find full step-by-step docs in our Help Center.',
  'Appreciate the mention! Let us know if you need any custom setup.',
];

export const MessageThread: React.FC<MessageThreadProps> = ({
  conversation,
  onSendReply,
}) => {
  const [replyText, setReplyText] = useState('');

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs">
        Select a conversation from the left to view messages
      </div>
    );
  }

  const handleSend = () => {
    if (!replyText.trim()) return;
    onSendReply(conversation.id, replyText);
    setReplyText('');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900">
      {/* Thread Top Header */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200/90 dark:border-slate-800/90 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={conversation.customerAvatar}
            alt={conversation.customerName}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-brand/30"
          />
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {conversation.customerName}
              <PlatformBadge platform={conversation.platform} size="sm" />
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{conversation.customerHandle}</p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          Status: {conversation.status.toUpperCase()}
        </span>
      </div>

      {/* Post Context Banner if available */}
      {conversation.postSnippet && (
        <div className="px-3.5 sm:px-4 py-2 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2">
          <span className="font-bold text-slate-900 dark:text-slate-200">In response to:</span>
          <span className="truncate italic">"{conversation.postSnippet}"</span>
        </div>
      )}

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5">
        {conversation.messages.map((msg) => {
          const isMe = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 max-w-xl ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <img
                src={msg.senderAvatar}
                alt={msg.senderName}
                className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
              />
              <div>
                <div className={`flex items-center gap-2 mb-1 ${isMe ? 'justify-end' : ''}`}>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                    {msg.senderName}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{msg.timestamp}</span>
                </div>
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed shadow-xs ${
                    isMe
                      ? 'btn-brand-primary text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/60 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Canned Suggestions */}
      <div className="px-3.5 sm:px-4 py-2 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <Sparkles className="w-3.5 h-3.5 text-primary-brand shrink-0" />
        {cannedResponses.map((res, i) => (
          <button
            key={i}
            onClick={() => setReplyText(res)}
            className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:border-primary-brand hover:text-primary-brand whitespace-nowrap transition-colors"
          >
            {res}
          </button>
        ))}
      </div>

      {/* Reply Input Controls */}
      <div className="p-3.5 sm:p-4 border-t border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900">
        <div className="relative flex items-center">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Reply to ${conversation.customerName}...`}
            className="w-full pl-3.5 pr-24 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-brand/30 focus:border-primary-brand"
          />
          <div className="absolute right-1.5 flex items-center">
            <button
              onClick={handleSend}
              className="px-3 py-1.5 text-xs font-bold text-white btn-brand-primary rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
