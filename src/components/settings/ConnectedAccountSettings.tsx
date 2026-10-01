import React from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformBadge } from '../common/PlatformBadge';

export const ConnectedAccountSettings: React.FC = () => {
  const { accounts, toggleAccountStatus } = useApp();

  return (
    <div className="space-y-3.5 max-w-2xl">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        Connected Social OAuth Tokens
      </h4>

      <div className="space-y-2">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800/90 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <PlatformBadge platform={acc.platform} size="sm" showName={false} />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{acc.accountName}</p>
                <p className="text-[10px] text-slate-400">{acc.handle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                Last Sync: {acc.lastSynced}
              </span>
              <button
                onClick={() => toggleAccountStatus(acc.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md cursor-pointer transition-colors ${
                  acc.status === 'connected'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                {acc.status === 'connected' ? 'Active Token' : 'Re-authenticate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
