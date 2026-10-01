import React from 'react';
import type { SocialAccount } from '../../types';
import { PlatformBadge } from '../common/PlatformBadge';
import { formatNumber } from '../../utils/helpers';
import {
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Users,
} from 'lucide-react';

interface SocialAccountCardProps {
  account: SocialAccount;
  onToggleStatus: (id: string) => void;
  onViewDetails: (account: SocialAccount) => void;
}

export const SocialAccountCard: React.FC<SocialAccountCardProps> = ({
  account,
  onToggleStatus,
  onViewDetails,
}) => {
  const isConnected = account.status === 'connected';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl p-3.5 sm:p-4 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header Platform Badge & External link */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <PlatformBadge platform={account.platform} size="sm" />
          <div className="flex items-center gap-1">
            {account.profileUrl && (
              <a
                href={account.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="View Profile"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Account Details Avatar & Name */}
        <div className="flex items-center gap-2.5 mb-3">
          <img
            src={account.avatar}
            alt={account.accountName}
            className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 group-hover:scale-105 transition-transform"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
              {account.accountName}
            </h4>
            <p className="text-[11px] text-slate-400 truncate">{account.handle}</p>
          </div>
        </div>

        {/* Followers & Status Row */}
        <div className="p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-100 dark:border-slate-800/80 mb-3 flex items-center justify-between text-xs">
          <div>
            <span className="text-[9px] text-slate-400 font-semibold uppercase block">Followers</span>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1 text-xs">
              <Users className="w-3 h-3 text-indigo-500" />
              {formatNumber(account.followers)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[9px] text-slate-400 font-semibold uppercase block">Status</span>
            {account.status === 'connected' && (
              <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 text-[10px]">
                <CheckCircle2 className="w-2.5 h-2.5" /> Connected
              </span>
            )}
            {account.status === 'action_required' && (
              <span className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 text-[10px]">
                <AlertTriangle className="w-2.5 h-2.5" /> Expired
              </span>
            )}
            {(account.status === 'disconnected' || account.status === 'expired') && (
              <span className="inline-flex items-center gap-1 font-bold text-slate-400 text-[10px]">
                <XCircle className="w-2.5 h-2.5" /> Inactive
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Sync Info & Toggle Action */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
        <span className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
          <RefreshCw className="w-2.5 h-2.5 text-slate-400 shrink-0" />
          {account.lastSynced}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onViewDetails(account)}
            className="px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => onToggleStatus(account.id)}
            className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md transition-all ${
              isConnected
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 hover:bg-rose-100'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xs'
            }`}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  );
};
