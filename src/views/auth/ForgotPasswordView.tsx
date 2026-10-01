import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { KeyRound, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export const ForgotPasswordView: React.FC = () => {
  const { requestPasswordReset, setAuthView } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast('Email Required', 'Please enter your registered email address.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      showToast('Reset Link Sent', `Password reset instructions sent to ${email}`, 'success');
    } catch {
      showToast('Request Failed', 'Unable to process reset request. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-500/20 dark:border-amber-400/15 flex items-center justify-center shadow-lg shadow-amber-500/10">
          <KeyRound className="w-7 h-7 text-amber-600 dark:text-amber-400 stroke-[2]" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Forgot your password?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          No worries. Enter your account email address and we'll send you a recovery link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Registered Email Address
          </label>
          <div className="relative flex items-center group">
            <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.rivera@agency.io"
              required
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500/50 dark:focus:border-blue-400/40 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 dark:shadow-blue-500/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Send Recovery Link</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="pt-3 border-t border-slate-200/60 dark:border-white/[0.05] text-center">
        <button
          type="button"
          onClick={() => setAuthView('login')}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </button>
      </div>
    </div>
  );
};
