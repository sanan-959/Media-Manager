import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Save } from 'lucide-react';

export const NotificationSettings: React.FC = () => {
  const { showToast } = useToast();
  const [emailApprovals, setEmailApprovals] = useState(true);
  const [emailComments, setEmailComments] = useState(true);
  const [pushMentions, setPushMentions] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const handleSave = () => {
    showToast('Preferences Saved', 'Your notification settings have been updated.');
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Email Notifications
        </h4>

        <div className="space-y-2">
          <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200/90 dark:border-slate-800/90 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Post Approval Requests</p>
              <p className="text-[11px] text-slate-400">Receive email when a post is submitted for review</p>
            </div>
            <input
              type="checkbox"
              checked={emailApprovals}
              onChange={(e) => setEmailApprovals(e.target.checked)}
              className="w-4 h-4 text-primary-brand rounded focus:ring-primary-brand cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200/90 dark:border-slate-800/90 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Inbox & Comments</p>
              <p className="text-[11px] text-slate-400">Notify when new VIP customer messages arrive</p>
            </div>
            <input
              type="checkbox"
              checked={emailComments}
              onChange={(e) => setEmailComments(e.target.checked)}
              className="w-4 h-4 text-primary-brand rounded focus:ring-primary-brand cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Push & Digest
        </h4>

        <div className="space-y-2">
          <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200/90 dark:border-slate-800/90 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Desktop & Mobile Push Mentions</p>
              <p className="text-[11px] text-slate-400">Instant push alerts on brand mentions</p>
            </div>
            <input
              type="checkbox"
              checked={pushMentions}
              onChange={(e) => setPushMentions(e.target.checked)}
              className="w-4 h-4 text-primary-brand rounded focus:ring-primary-brand cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-200/90 dark:border-slate-800/90 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Weekly Summary Digest</p>
              <p className="text-[11px] text-slate-400">Receive a weekly PDF report of top reach metrics</p>
            </div>
            <input
              type="checkbox"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
              className="w-4 h-4 text-primary-brand rounded focus:ring-primary-brand cursor-pointer"
            />
          </label>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg btn-brand-primary cursor-pointer"
      >
        <Save className="w-3.5 h-3.5" /> Save Preferences
      </button>
    </div>
  );
};
