import React from 'react';
import type { Conversation } from '../../types';
import { PlatformBadge } from '../common/PlatformBadge';
import { FileText } from 'lucide-react';

interface UserProfilePanelProps {
  conversation: Conversation | null;
}

export const UserProfilePanel: React.FC<UserProfilePanelProps> = ({ conversation }) => {
  if (!conversation) return null;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-l border-slate-200/90 dark:border-slate-800/90 p-4 space-y-4 overflow-y-auto">
      {/* Customer Avatar & Bio */}
      <div className="text-center pb-3.5 border-b border-slate-200/80 dark:border-slate-800/80">
        <img
          src={conversation.customerAvatar}
          alt={conversation.customerName}
          className="w-14 h-14 rounded-full object-cover mx-auto ring-4 ring-primary-brand/20 mb-2.5"
        />
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
          {conversation.customerName}
        </h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{conversation.customerHandle}</p>
        <div className="mt-2.5 flex justify-center">
          <PlatformBadge platform={conversation.platform} size="sm" />
        </div>
      </div>

      {/* Customer Metadata */}
      <div className="space-y-2.5">
        <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Profile Details
        </h4>
        <div className="p-3 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200/80 dark:border-slate-800/80 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span>Platform:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
              {conversation.platform}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span>Interaction:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 capitalize">
              {conversation.type}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span>Status:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 capitalize">
              {conversation.status}
            </span>
          </div>
        </div>
      </div>

      {/* CRM Notes */}
      <div className="space-y-2.5">
        <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>CRM Notes</span>
          <FileText className="w-3.5 h-3.5 text-primary-brand" />
        </h4>
        <div className="space-y-2">
          {conversation.notes && conversation.notes.length > 0 ? (
            conversation.notes.map((note, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-primary-light/50 border border-primary-brand/20 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-medium"
              >
                • {note}
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">No notes added for this contact.</p>
          )}
        </div>
      </div>
    </div>
  );
};
