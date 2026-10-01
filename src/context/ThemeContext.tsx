import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ThemeMode, AccentColor } from '../types';
import { colorSchemeTokensMap, accentColorOptions } from '../data/themePresets';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'dark' | 'light';
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
}

const THEME_STORAGE_KEY = 'socialpulse_theme_mode';
const ACCENT_STORAGE_KEY = 'socialpulse_accent_color';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage or defaults
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (saved && (saved === 'dark' || saved === 'light' || saved === 'system')) {
        return saved;
      }
    } catch {
      // Ignore localStorage errors
    }
    return 'dark';
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    try {
      const saved = localStorage.getItem(ACCENT_STORAGE_KEY) as AccentColor | null;
      if (saved && accentColorOptions.some((o) => o.id === saved)) {
        return saved;
      }
    } catch {
      // Ignore localStorage errors
    }
    return 'indigo';
  });

  // Calculate resolved theme
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>(() => {
    if (theme === 'system') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return theme;
  });

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateResolvedTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();

    const listener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  // Apply classes and CSS Variables dynamically to DOM
  useEffect(() => {
    const root = document.documentElement;

    // 1. Apply dark/light class
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // 2. Set dataset attributes
    root.dataset.theme = resolvedTheme;
    root.dataset.accent = accentColor;

    // 3. Inject CSS Variables for the active theme and accent color
    const tokens = colorSchemeTokensMap[accentColor][resolvedTheme];
    root.style.setProperty('--color-primary', tokens.primary);
    root.style.setProperty('--color-primary-hover', tokens.primaryHover);
    root.style.setProperty('--color-primary-active', tokens.primaryActive);
    root.style.setProperty('--color-primary-light', tokens.primaryLight);
    root.style.setProperty('--color-primary-light-border', tokens.primaryLightBorder);
    root.style.setProperty('--color-primary-light-text', tokens.primaryLightText);
    root.style.setProperty('--color-primary-rgb', tokens.primaryRgb);
    root.style.setProperty('--color-primary-glow', tokens.primaryGlow);

    // Save to localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      localStorage.setItem(ACCENT_STORAGE_KEY, accentColor);
    } catch {
      // Storage unavailable
    }
  }, [resolvedTheme, accentColor, theme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        accentColor,
        setAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
