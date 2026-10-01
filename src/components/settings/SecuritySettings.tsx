import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck } from 'lucide-react';

export const SecuritySettings: React.FC = () => {
  const { showToast } = useToast();
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800/90 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-lg">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Two-Factor Authentication (2FA)
            </h4>
            <p className="text-[10px] text-slate-400">
              Protect your workspace with Authenticator App or SMS verification
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setTwoFactor(!twoFactor);
            showToast('Security Setting Updated', `2FA is now ${!twoFactor ? 'enabled' : 'disabled'}`);
          }}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            twoFactor
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          {twoFactor ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          API & OAuth Key Security
        </h4>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-500 text-[11px]">Workspace Secret Token</span>
            <span className="font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-800 dark:text-slate-200">
              sk_live_998a762b...489c
            </span>
          </div>

          <button
            onClick={() => showToast('API Token Regenerated', 'Old token revoked.')}
            className="px-3 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer transition-colors"
          >
            Regenerate Secret Key
          </button>
        </div>
      </div>
    </div>
  );
};
