import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { MailCheck, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

export const VerifyEmailView: React.FC = () => {
  const { pendingEmail, verifyEmail, resendVerificationCode, setAuthView } = useAuth();
  const { showToast } = useToast();

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState<number>(55);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedDigits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      pastedDigits.forEach((digit, i) => {
        newOtp[i] = digit;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto advance focus
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      showToast('Incomplete Code', 'Please enter all 6 verification digits.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(code);
      showToast('Email Verified!', 'Your account is ready. Welcome to SocialPulse!', 'success');
    } catch {
      showToast('Verification Failed', 'Invalid or expired code. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setIsLoading(true);
    try {
      await resendVerificationCode();
      setCountdown(60);
      showToast('Code Resent', `A fresh verification code was sent to ${pendingEmail}`, 'success');
    } catch {
      showToast('Resend Failed', 'Unable to resend code. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-center sm:text-left">
      {/* Icon & Heading */}
      <div className="space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-500/10 border border-blue-500/20 dark:border-blue-400/15 flex items-center justify-center mx-auto sm:mx-0 shadow-lg shadow-blue-500/10">
          <MailCheck className="w-7 h-7 text-blue-600 dark:text-blue-400 stroke-[2]" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Verify your email
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          We sent a 6-digit confirmation code to{' '}
          <span className="font-bold text-slate-800 dark:text-slate-200">{pendingEmail}</span>. Enter the code below to activate your workspace.
        </p>
      </div>

      {/* 6-Digit OTP Box Grid */}
      <form onSubmit={handleVerify} className="space-y-5">
        <div className="flex justify-center sm:justify-start gap-2.5">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-11 h-13 text-center text-lg font-black bg-white dark:bg-white/[0.04] border-2 border-slate-200 dark:border-white/[0.1] rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 shadow-sm transition-all duration-200"
            />
          ))}
        </div>

        {/* Demo Helper Button */}
        <div className="p-3 bg-blue-50/70 dark:bg-blue-500/[0.06] border border-blue-200 dark:border-blue-500/15 rounded-xl text-[11px] text-blue-800 dark:text-blue-300 flex items-center justify-between">
          <span>Demo verification code: <strong>123456</strong></span>
          <button
            type="button"
            onClick={() => {
              setOtp(['1', '2', '3', '4', '5', '6']);
            }}
            className="font-bold underline hover:text-blue-950 dark:hover:text-blue-100 cursor-pointer"
          >
            Auto-fill
          </button>
        </div>

        {/* Verify Action Button */}
        <button
          type="submit"
          disabled={isLoading || otp.join('').length < 6}
          className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 dark:shadow-blue-500/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Resend Timer & Links */}
      <div className="space-y-3 pt-3 border-t border-slate-200/60 dark:border-white/[0.05] text-sm">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
          <span>Didn't receive the email?</span>
          {countdown > 0 ? (
            <span className="text-slate-400 dark:text-slate-500 font-medium text-xs">Resend code in ({countdown}s)</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer text-xs"
            >
              <RotateCcw className="w-3 h-3" /> Resend Code
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
          <button
            type="button"
            onClick={() => setAuthView('signup')}
            className="font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" /> Change email address
          </button>
          <button
            type="button"
            onClick={() => setAuthView('login')}
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
