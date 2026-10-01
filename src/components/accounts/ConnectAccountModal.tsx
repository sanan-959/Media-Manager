import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { platformsList, type SocialPlatform } from '../../types';
import { PlatformBadge } from '../common/PlatformBadge';
import { getPlatformInfo } from '../../utils/helpers';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectAccountModal: React.FC<ConnectAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { connectNewAccount } = useApp();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('instagram');
  const [accountName, setAccountName] = useState('');
  const [handle, setHandle] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!accountName.trim() || !handle.trim()) {
        showToast('Missing Fields', 'Please fill in account name and handle.', 'error');
        return;
      }
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setStep(3);
        connectNewAccount(selectedPlatform, accountName, handle);
        showToast(
          'Account Connected! 🎉',
          `${accountName} (${handle}) is now active on your dashboard.`
        );
      }, 1200);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setAccountName('');
    setHandle('');
    onClose();
  };

  const platformInfo = getPlatformInfo(selectedPlatform);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title="Connect Social Media Channel"
      subtitle="Authorize OAuth integration for publishing and analytics"
      maxWidth="md"
    >
      {step === 1 && (
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
            Step 1: Choose Platform
          </label>

          <div className="grid grid-cols-2 gap-3">
            {platformsList.map((p) => {
              const isSelected = selectedPlatform === p;
              return (
                <div
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                >
                  <PlatformBadge platform={p} size="md" />
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNextStep}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all"
            >
              Continue <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Selected Channel:</span>
            <PlatformBadge platform={selectedPlatform} size="md" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Account Display Name
            </label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="e.g. TechVibe Official"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Username / Handle
            </label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="e.g. @techvibe_hq"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="p-3.5 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-xl text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
            <Lock className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              We request read & publish permissions via official {platformInfo.name} API OAuth 2.0 specs.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:underline"
            >
              Back
            </button>
            <button
              onClick={handleNextStep}
              disabled={isConnecting}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all disabled:opacity-50"
            >
              {isConnecting ? (
                <>Authenticating OAuth...</>
              ) : (
                <>
                  Authorize Connection <ShieldCheck className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Account Connected Successfully!
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {accountName} ({handle}) is now linked to your workspace. Automated sync is active.
          </p>

          <button
            onClick={handleResetAndClose}
            className="mt-4 px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all"
          >
            Done
          </button>
        </div>
      )}
    </Modal>
  );
};
