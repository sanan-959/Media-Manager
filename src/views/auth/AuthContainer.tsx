import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { AppLogo } from '../../components/common/AppLogo';
import { LoginView } from './LoginView';
import { SignupView } from './SignupView';
import { VerifyEmailView } from './VerifyEmailView';
import { ForgotPasswordView } from './ForgotPasswordView';
import { ResetPasswordView } from './ResetPasswordView';
import {
  Sun,
  Moon,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Globe,
  BarChart3,
} from 'lucide-react';

export const AuthContainer: React.FC = () => {
  const { authView } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderCurrentView = () => {
    switch (authView) {
      case 'login':
        return <LoginView />;
      case 'signup':
        return <SignupView />;
      case 'verify_email':
        return <VerifyEmailView />;
      case 'forgot_password':
        return <ForgotPasswordView />;
      case 'reset_password':
        return <ResetPasswordView />;
      default:
        return <LoginView />;
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-[#060918] text-slate-900 dark:text-slate-100 transition-colors relative overflow-hidden">
      {/* === Deep Background Layer: Animated Grid === */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {/* Perspective Grid Floor */}
        <div
          className="absolute inset-0 animate-grid-pulse"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Large Morphing Blob — Top Right */}
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] animate-morph-blob opacity-30 dark:opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.4) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 70%)',
          }}
        />

        {/* Large Morphing Blob — Bottom Left */}
        <div
          className="absolute -bottom-32 -left-32 w-[450px] h-[450px] animate-morph-blob opacity-25 dark:opacity-15"
          style={{
            background: 'radial-gradient(ellipse, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)',
            animationDelay: '-6s',
          }}
        />

        {/* Center Glow Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-blue-500/5 to-transparent dark:from-blue-500/8 blur-3xl" />
      </div>

      {/* === Main Authentication Layout === */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-screen relative z-10">
        {/* ===== LEFT SIDE: Auth Form ===== */}
        <div className="flex-1 flex flex-col justify-between p-5 sm:p-8 lg:p-12 max-w-xl mx-auto w-full">
          {/* Top Row: Logo + Theme Toggle */}
          <div className="flex items-center justify-between gap-4">
            <AppLogo size="md" showText={true} />

            <button
              onClick={toggleTheme}
              title="Toggle Dark / Light Theme"
              className="p-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/40 transition-all duration-300 shadow-sm backdrop-blur-sm cursor-pointer hover:scale-105"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Auth Card — Glassmorphism with 3D Entrance */}
          <div
            className={`my-auto py-6 transition-all duration-700 ${
              mounted ? 'animate-card-entrance' : 'opacity-0'
            }`}
            style={{ perspective: '1200px' }}
          >
            <div className="relative">
              {/* Card Glow Ring — behind the card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-3xl blur-xl opacity-60" />

              {/* Main Card Surface */}
              <div className="relative bg-white/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-slate-900/5 dark:shadow-black/30 backdrop-blur-2xl">
                {/* Top edge shimmer line */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent rounded-t-2xl" />

                {renderCurrentView()}
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 dark:text-slate-600">
            <span>© 2026 SocialPulse Inc.</span>
            <div className="flex items-center gap-3">
              <a href="#privacy" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Privacy</a>
              <span className="opacity-40">•</span>
              <a href="#terms" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Terms</a>
              <span className="opacity-40">•</span>
              <a href="#support" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Support</a>
            </div>
          </div>
        </div>

        {/* ===== RIGHT SIDE: 3D Animated Hero (Desktop only) ===== */}
        <div className="hidden lg:flex flex-1 relative overflow-hidden">
          {/* Deep Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f2e] via-[#0d1341] to-[#060918]" />

          {/* Animated Grid Overlay */}
          <div
            className="absolute inset-0 animate-grid-pulse"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* 3D Orbiting Scene Container */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '800px' }}>
            {/* Central Orb */}
            <div className="relative w-64 h-64">
              {/* Core Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 via-indigo-600/20 to-purple-600/30 blur-2xl animate-pulse-glow" />

              {/* Inner Glass Sphere */}
              <div
                className="absolute inset-8 rounded-full animate-float-3d"
                style={{
                  background: 'radial-gradient(circle at 30% 25%, rgba(99,102,241,0.6) 0%, rgba(59,130,246,0.3) 40%, rgba(15,23,42,0.8) 100%)',
                  boxShadow: 'inset 0 -8px 24px rgba(0,0,0,0.4), inset 0 4px 12px rgba(255,255,255,0.15), 0 0 60px rgba(99,102,241,0.3)',
                }}
              >
                {/* Sphere Highlight */}
                <div
                  className="absolute top-3 left-5 w-12 h-8 rounded-full opacity-60"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)',
                  }}
                />
              </div>

              {/* Orbiting Element 1: Analytics Card */}
              <div className="absolute inset-0 flex items-center justify-center animate-orbit">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600/90 to-indigo-700/90 border border-blue-400/30 shadow-lg shadow-blue-500/20 flex items-center justify-center backdrop-blur-md">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Orbiting Element 2: Users Globe */}
              <div className="absolute inset-0 flex items-center justify-center animate-orbit-reverse">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/90 to-pink-600/90 border border-purple-400/30 shadow-lg shadow-purple-500/20 flex items-center justify-center backdrop-blur-md">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Orbiting Element 3: Mini Spark */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  animation: 'orbit 15s linear infinite',
                  animationDelay: '-5s',
                }}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(96, 165, 250, 0.9) 0%, transparent 70%)',
                    boxShadow: '0 0 20px rgba(96, 165, 250, 0.6)',
                  }}
                />
              </div>

              {/* Orbiting Element 4: Mini Spark 2 */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  animation: 'orbit-reverse 18s linear infinite',
                  animationDelay: '-3s',
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.9) 0%, transparent 70%)',
                    boxShadow: '0 0 16px rgba(168, 85, 247, 0.5)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col justify-between p-10 text-white w-full">
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-blue-300 text-xs font-bold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" /> AI-Powered Platform
              </span>
              <span className="text-xs text-slate-400 font-medium">Trusted by 14,000+ brands</span>
            </div>

            {/* Center Content */}
            <div className="max-w-md space-y-7">
              <div className="space-y-4">
                <h1 className="text-3xl xl:text-4xl font-black tracking-tight leading-[1.15]">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                    Command your social presence
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    with AI velocity.
                  </span>
                </h1>
                <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                  Multi-platform scheduling, deep analytics, automated workflows, and unified inbox — all in one sleek dashboard.
                </p>
              </div>

              {/* Floating Glass Stat Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl space-y-1.5 hover:bg-white/[0.07] transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Reach</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-black text-white">4.8M+</p>
                  <p className="text-[10px] text-emerald-400 font-bold">+28.4% this month</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl space-y-1.5 hover:bg-white/[0.07] transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Engagement</span>
                    <Zap className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <p className="text-2xl font-black text-white">99.8%</p>
                  <p className="text-[10px] text-blue-400 font-bold">Uptime & instant publish</p>
                </div>
              </div>

              {/* Feature List */}
              <div className="space-y-2.5 text-xs text-slate-300/80">
                {[
                  'Omnichannel publishing — Instagram, LinkedIn, X, TikTok, YouTube',
                  'Role-based team workflows & client approval gates',
                  'Unified real-time inbox & AI sentiment tracking',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] flex-shrink-0">
                      ✓
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Security Bar */}
            <div className="flex items-center gap-2.5 text-xs text-slate-500 pt-4 border-t border-white/[0.06]">
              <ShieldCheck className="w-4 h-4 text-emerald-400/60" />
              <span>SOC2 Type II & GDPR compliant enterprise security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
