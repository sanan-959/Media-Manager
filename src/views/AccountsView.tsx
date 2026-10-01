import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SocialAccountCard } from '../components/accounts/SocialAccountCard';
import { ConnectAccountModal } from '../components/accounts/ConnectAccountModal';
import type { SocialPlatform, SocialAccount } from '../types';
import { SearchInput } from '../components/common/SearchInput';
import { Modal } from '../components/common/Modal';
import { PlatformBadge } from '../components/common/PlatformBadge';
import { Plus, Share2, RefreshCw, Users } from 'lucide-react';
import { formatNumber } from '../utils/helpers';

export const AccountsView: React.FC = () => {
  const { accounts, toggleAccountStatus } = useApp();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform | 'all'>('all');
  const [selectedAccountForModal, setSelectedAccountForModal] = useState<SocialAccount | null>(null);

  const filteredAccounts = accounts.filter((acc) => {
    if (platformFilter !== 'all' && acc.platform !== platformFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return acc.accountName.toLowerCase().includes(q) || acc.handle.toLowerCase().includes(q);
    }
    return true;
  });

  const totalFollowers = accounts.reduce((sum, acc) => sum + acc.followers, 0);

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            Connected Accounts
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage channel OAuth tokens, sync status, and audience permissions
          </p>
        </div>

        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold btn-brand-primary rounded-lg cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Connect Account</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Total Connected</span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
              {accounts.filter((a) => a.status === 'connected').length} / {accounts.length}
            </p>
          </div>
          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Share2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Combined Audience</span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
              {formatNumber(totalFollowers)}
            </p>
          </div>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Sync Health</span>
            <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
              98.2% Active
            </p>
          </div>
          <div className="p-2 bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 rounded-lg">
            <RefreshCw className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl shadow-2xs">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search channel or @handle..."
          className="w-full sm:w-60"
        />

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['all', 'facebook', 'instagram', 'linkedin', 'twitter', 'tiktok', 'youtube'] as const).map((pf) => (
            <button
              key={pf}
              onClick={() => setPlatformFilter(pf)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                platformFilter === pf
                  ? 'bg-primary-light text-primary-brand border border-primary-light font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {pf}
            </button>
          ))}
        </div>
      </div>

      {/* Account Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredAccounts.map((account) => (
          <SocialAccountCard
            key={account.id}
            account={account}
            onToggleStatus={toggleAccountStatus}
            onViewDetails={(acc) => setSelectedAccountForModal(acc)}
          />
        ))}
      </div>

      {/* Connect Modal */}
      {isConnectModalOpen && (
        <ConnectAccountModal
          isOpen={isConnectModalOpen}
          onClose={() => setIsConnectModalOpen(false)}
        />
      )}

      {/* Detail Modal */}
      {selectedAccountForModal && (
        <Modal
          isOpen={!!selectedAccountForModal}
          onClose={() => setSelectedAccountForModal(null)}
          title="Account Information"
          maxWidth="md"
        >
          <div className="space-y-4 p-1">
            <div className="flex items-center gap-3">
              <img
                src={selectedAccountForModal.avatar}
                alt={selectedAccountForModal.accountName}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-200 dark:ring-slate-700"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {selectedAccountForModal.accountName}
                </h4>
                <p className="text-xs text-slate-400">{selectedAccountForModal.handle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Platform</span>
                <PlatformBadge platform={selectedAccountForModal.platform} size="sm" />
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-950/60 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Followers</span>
                <span className="font-extrabold text-slate-900 dark:text-slate-100">
                  {formatNumber(selectedAccountForModal.followers)}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
