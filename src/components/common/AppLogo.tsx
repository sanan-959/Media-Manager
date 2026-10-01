import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
}) => {
  const containerSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
  };

  const svgDimensions = {
    sm: 20,
    md: 24,
    lg: 28,
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Professional Brand Mark Squircle */}
      <div className="relative group/logo cursor-pointer flex-shrink-0">
        <div
          className={`${containerSizes[size]} bg-slate-900 dark:bg-slate-950 border border-slate-700/80 dark:border-slate-800 shadow-md shadow-slate-950/20 flex items-center justify-center relative overflow-hidden transition-all duration-200 group-hover/logo:scale-[1.03] group-hover/logo:border-primary-brand/50 group-hover/logo:shadow-lg group-hover/logo:shadow-primary-brand/15`}
        >
          {/* Subtle Top-Edge Bevel Highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

          {/* Precision Geometric Vector Logo */}
          <svg
            width={svgDimensions[size]}
            height={svgDimensions[size]}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform transition-transform duration-200 group-hover/logo:scale-105"
          >
            <defs>
              <linearGradient id="spBrandPrimary" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>

              <linearGradient id="spBrandAccent" x1="28" y1="4" x2="4" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>

              <linearGradient id="spGleam" x1="10" y1="6" x2="22" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Upper Flow Ribbon (Loop A) */}
            <path
              d="M8 12C8 8.68629 10.6863 6 14 6H20C23.3137 6 26 8.68629 26 12C26 15.3137 23.3137 18 20 18H10"
              stroke="url(#spBrandPrimary)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Lower Flow Ribbon (Loop B - Intersecting Dynamic S Curve) */}
            <path
              d="M24 20C24 23.3137 21.3137 26 18 26H12C8.68629 26 6 23.3137 6 20C6 16.6863 8.68629 14 12 14H22"
              stroke="url(#spBrandAccent)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Center High-Tech Signal Spark Core */}
            <circle cx="16" cy="16" r="2.2" fill="url(#spGleam)" />
          </svg>
        </div>

        {/* Live Status Indicator Dot */}
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[15px] text-slate-900 dark:text-white tracking-tight leading-tight">
              SocialPulse
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary-light text-primary-brand border border-primary-brand/20 leading-none">
              PRO
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-normal leading-tight">
            Media Manager
          </span>
        </div>
      )}
    </div>
  );
};
