import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ResetPasswordView: React.FC = () => {
  const { pendingEmail, resetPassword, setAuthView } = useAuth();
  const { showToast } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();
  const strengthLabels = ['Too weak', 'Fair', 'Good', 'Strong', 'Ultra secure'];
  const strengthColors = ['bg-rose-500', 'bg-amber-500', 'bg-sky-500', 'bg-emerald-500', 'bg-emerald-500'];

  const inputCls = "w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500/50 dark:focus:border-blue-400/40 transition-all";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      showToast('Password Required', 'Please enter a new password.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Password Mismatch', 'New password and confirmation do not match.', 'error');
      return;
    }

    if (password.length < 8) {
      showToast('Weak Password', 'Password must be at least 8 characters long.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(password);
      showToast('Password Changed!', 'Your password has been successfully updated. Please sign in.', 'success');
    } catch {
      showToast('Reset Failed', 'Unable to reset password. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10 border border-emerald-500/20 dark:border-emerald-400/15 flex items-center justify-center shadow-lg shadow-emerald-500/10">
          <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400 stroke-[2]" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Set new password
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Create a strong password for{' '}
          <span className="font-bold text-slate-800 dark:text-slate-200">{pendingEmail}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            New Password
          </label>
          <div className="relative flex items-center group">
            <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              required
              className={inputCls}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-md cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Strength Meter */}
          {password.length > 0 && (
            <div className="mt-2 space-y-1">
              <div className="flex gap-1 h-1.5 rounded-full overflow-hidden">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 rounded-full transition-all duration-500 ${
                      step < strength ? strengthColors[strength] : 'bg-slate-200 dark:bg-white/[0.06]'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>Strength: <strong className="text-slate-700 dark:text-slate-200">{strengthLabels[strength]}</strong></span>
                <span>8+ chars with mix of upper, numbers & symbols</span>
              </p>
            </div>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Confirm New Password
          </label>
          <div className="relative flex items-center group">
            <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
              className={`${inputCls} ${
                confirmPassword && confirmPassword !== password
                  ? '!border-rose-400 focus:!ring-rose-400/30'
                  : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-md cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
          {confirmPassword && confirmPassword === password && (
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Passwords match
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 dark:shadow-blue-500/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Update Password & Sign In</span>
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
