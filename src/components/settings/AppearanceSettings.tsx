import React from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { accentColorOptions } from '../../data/themePresets';
import type { ThemeMode, AccentColor } from '../../types';
import {
  Sun,
  Moon,
  Laptop,
  Check,
  Palette,
  Sparkles,
  RotateCcw,
  Zap,
  TrendingUp,
} from 'lucide-react';

export const AppearanceSettings: React.FC = () => {
  const { theme, resolvedTheme, setTheme, accentColor, setAccentColor } = useApp();
  const { showToast } = useToast();

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    showToast(
      'Theme Updated',
      `Switched to ${newTheme === 'system' ? 'System Theme' : newTheme === 'dark' ? 'Dark Theme' : 'Light Theme'}`
    );
  };

  const handleAccentChange = (newAccent: AccentColor) => {
    setAccentColor(newAccent);
    const selectedOption = accentColorOptions.find((o) => o.id === newAccent);
    showToast(
      'Accent Color Updated',
      `Applied ${selectedOption ? selectedOption.name : newAccent} color scheme across the workspace.`
    );
  };

  const handleResetDefaults = () => {
    setTheme('dark');
    setAccentColor('blue');
    showToast('Appearance Reset', 'Restored default Dark Mode with Electric Blue accent.');
  };

  const currentAccentOption =
    accentColorOptions.find((o) => o.id === accentColor) || accentColorOptions[0];

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      {/* Top Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/90 dark:border-slate-800/90">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary-brand" />
            Appearance & Visual Theme
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Switch between crisp Light Theme, Dark Navy Theme, or System Default. Preferences persist automatically.
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* 1. Theme Mode Selection (Light, Dark, System Sync) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Color Theme Mode
            </h4>
            <p className="text-[11px] text-slate-400">
              Select high-contrast Light, sleek Dark Navy, or sync automatically with your OS.
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full badge-brand-primary capitalize">
            Active: {theme} {theme === 'system' ? `(${resolvedTheme})` : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Dark Mode Card */}
          <div
            onClick={() => handleThemeChange('dark')}
            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 relative group overflow-hidden ${
              theme === 'dark'
                ? 'border-primary-brand bg-slate-900 text-white shadow-md ring-2 ring-primary-brand/30'
                : 'border-slate-200 dark:border-slate-800/90 bg-slate-900/40 text-slate-300 hover:border-slate-400 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="p-2 rounded-lg bg-slate-800 text-primary-brand">
                <Moon className="w-4 h-4" />
              </div>
              {theme === 'dark' && (
                <span className="w-5 h-5 rounded-full bg-primary-brand text-white flex items-center justify-center text-xs shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              )}
            </div>
            <p className="text-xs font-extrabold text-white">Dark Theme</p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Deep dark navy palette with luminous accents.
            </p>

            {/* Visual mockup */}
            <div className="mt-2.5 p-1.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-1.5 pointer-events-none opacity-80">
              <span className="w-2 h-2 rounded-full bg-primary-brand" />
              <div className="h-1 w-10 bg-slate-700 rounded-full" />
              <div className="h-1 w-4 bg-slate-800 rounded-full ml-auto" />
            </div>
          </div>

          {/* Light Mode Card */}
          <div
            onClick={() => handleThemeChange('light')}
            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 relative group overflow-hidden ${
              theme === 'light'
                ? 'border-primary-brand bg-white text-slate-900 shadow-md ring-2 ring-primary-brand/30'
                : 'border-slate-200 dark:border-slate-800/90 bg-white/90 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-500">
                <Sun className="w-4 h-4" />
              </div>
              {theme === 'light' && (
                <span className="w-5 h-5 rounded-full bg-primary-brand text-white flex items-center justify-center text-xs shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              )}
            </div>
            <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">Light Theme</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Crisp pure white surfaces with high-contrast text.
            </p>

            {/* Visual mockup */}
            <div className="mt-2.5 p-1.5 bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1.5 pointer-events-none opacity-80">
              <span className="w-2 h-2 rounded-full bg-primary-brand" />
              <div className="h-1 w-10 bg-slate-300 rounded-full" />
              <div className="h-1 w-4 bg-slate-200 rounded-full ml-auto" />
            </div>
          </div>

          {/* System Default Sync Card */}
          <div
            onClick={() => handleThemeChange('system')}
            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 relative group overflow-hidden ${
              theme === 'system'
                ? 'border-primary-brand bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white shadow-md ring-2 ring-primary-brand/30'
                : 'border-slate-200 dark:border-slate-800/90 bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-slate-800 text-indigo-500 dark:text-indigo-400">
                <Laptop className="w-4 h-4" />
              </div>
              {theme === 'system' && (
                <span className="w-5 h-5 rounded-full bg-primary-brand text-white flex items-center justify-center text-xs shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              )}
            </div>
            <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">System Default</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Automatically synchronizes with your device OS settings.
            </p>

            {/* Visual mockup */}
            <div className="mt-2.5 p-1.5 bg-gradient-to-r from-slate-200 to-slate-950 rounded-lg border border-slate-300 dark:border-slate-800 flex items-center gap-1.5 pointer-events-none opacity-80">
              <span className="w-2 h-2 rounded-full bg-primary-brand" />
              <div className="h-1 w-10 bg-white/70 rounded-full" />
              <div className="h-1 w-4 bg-white/40 rounded-full ml-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Custom Primary & Accent Color Schemes */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Brand Accent Color
            </h4>
            <p className="text-[11px] text-slate-400">
              Personalize action buttons, badges, active tabs, and highlights.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
              style={{ backgroundColor: currentAccentOption.hex }}
            />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {currentAccentOption.name}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {accentColorOptions.map((opt) => {
            const isSelected = accentColor === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleAccentChange(opt.id)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                  isSelected
                    ? 'border-primary-brand bg-primary-light shadow-xs ring-1 ring-primary-brand/30'
                    : 'border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${opt.previewClass} flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <Zap className="w-4 h-4 text-white fill-white/30" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                      <span>{opt.name}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-1.5">
                  {isSelected ? (
                    <div className="w-4 h-4 rounded-full bg-primary-brand text-white flex items-center justify-center text-[9px] shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-700 opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: opt.hex }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Live Interactive UI Theme Playground */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary-brand" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Live Interactive Theme Preview
            </h4>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Real-time dynamic CSS tokens</span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Selected accent color (<strong className="text-primary-brand">{currentAccentOption.name}</strong>) rendering live across interface elements:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-0.5">
          {/* Primary Action Button */}
          <div className="p-2.5 bg-white dark:bg-slate-950/70 rounded-lg border border-slate-200/90 dark:border-slate-800/90 space-y-1.5 text-center">
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Action Button</span>
            <button className="w-full py-1.5 px-2.5 text-xs font-bold rounded-lg btn-brand-primary flex items-center justify-center gap-1 cursor-pointer">
              <Zap className="w-3 h-3" />
              <span>Launch Campaign</span>
            </button>
          </div>

          {/* Dynamic Badge */}
          <div className="p-2.5 bg-white dark:bg-slate-950/70 rounded-lg border border-slate-200/90 dark:border-slate-800/90 space-y-1.5 text-center">
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Pill Badge</span>
            <div className="flex justify-center pt-0.5">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full badge-brand-primary inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-brand animate-pulse" />
                Featured Post
              </span>
            </div>
          </div>

          {/* Metric Trend Card */}
          <div className="p-2.5 bg-white dark:bg-slate-950/70 rounded-lg border border-slate-200/90 dark:border-slate-800/90 space-y-1.5 text-center">
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Metric KPI Highlight</span>
            <div className="flex items-center justify-center gap-1.5 pt-0.5">
              <span className="text-sm font-black text-primary-brand">+38.4%</span>
              <TrendingUp className="w-3.5 h-3.5 text-primary-brand" />
            </div>
          </div>

          {/* Focus State Input */}
          <div className="p-2.5 bg-white dark:bg-slate-950/70 rounded-lg border border-slate-200/90 dark:border-slate-800/90 space-y-1.5 text-center">
            <span className="text-[9px] text-slate-400 font-bold uppercase block">Focus Input Ring</span>
            <input
              type="text"
              readOnly
              value="theme-ready-input"
              className="w-full text-center text-xs py-1 px-1.5 bg-slate-50 dark:bg-slate-900 border border-primary-brand rounded-lg font-mono text-primary-brand focus:outline-hidden ring-2 ring-primary-brand/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
