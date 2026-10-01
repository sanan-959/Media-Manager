import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SignupView: React.FC = () => {
  const { signup, setAuthView } = useAuth();
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      showToast('Missing Fields', 'Please fill in all required fields.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Password Mismatch', 'Password and confirm password do not match.', 'error');
      return;
    }

    if (password.length < 8) {
      showToast('Weak Password', 'Password must be at least 8 characters long.', 'error');
      return;
    }

    if (!acceptTerms) {
      showToast('Terms Required', 'Please accept the Terms of Service to continue.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await signup(firstName, lastName, email, password);
      showToast('Account Created!', `We have sent a verification code to ${email}`, 'success');
    } catch {
      showToast('Registration Error', 'Unable to create account. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const inputCls = "w-full pl-10 pr-3 py-2.5 text-sm bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500/50 dark:focus:border-blue-400/40 transition-all";
  const inputWithBtnCls = "w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500/50 dark:focus:border-blue-400/40 transition-all";

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Create an account
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Start your 14-day free trial. No credit card required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* First & Last Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              First Name
            </label>
            <div className="relative flex items-center group">
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Last Name
            </label>
            <div className="relative flex items-center group">
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Work Email Address
          </label>
          <div className="relative flex items-center group">
            <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              className={inputCls}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Password
          </label>
          <div className="relative flex items-center group">
            <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              className={inputWithBtnCls}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-md cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Password Strength Meter */}
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

        {/* Confirm Password Field */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Confirm Password
          </label>
          <div className="relative flex items-center group">
            <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className={`${inputWithBtnCls} ${
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

        {/* Terms */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500/30"
            />
            <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
              I agree to the <a href="#terms" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Terms of Service</a> and <a href="#privacy" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Privacy Policy</a>.
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 dark:shadow-blue-500/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-500/30 mt-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Create Account & Verify</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Sign In */}
      <div className="text-center pt-3 border-t border-slate-200/60 dark:border-white/[0.05] text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => setAuthView('login')}
          className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
