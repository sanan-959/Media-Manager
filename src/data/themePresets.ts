import type { AccentColor, AccentColorOption } from '../types';

export const accentColorOptions: AccentColorOption[] = [
  {
    id: 'indigo',
    name: 'Electric Indigo',
    hex: '#6366f1',
    secondaryHex: '#818cf8',
    previewClass: 'from-indigo-600 to-violet-500',
    description: 'Modern high-tech SaaS vibe with vibrant indigo and purple tones.',
  },
  {
    id: 'blue',
    name: 'Ocean Blue',
    hex: '#2563eb',
    secondaryHex: '#60a5fa',
    previewClass: 'from-blue-600 to-sky-500',
    description: 'Clean, trustworthy corporate aesthetic with rich azure accents.',
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    hex: '#8b5cf6',
    secondaryHex: '#c084fc',
    previewClass: 'from-purple-600 to-pink-500',
    description: 'Creative and luxurious visual design with bold amethyst hues.',
  },
  {
    id: 'emerald',
    name: 'Emerald Green',
    hex: '#059669',
    secondaryHex: '#34d399',
    previewClass: 'from-emerald-600 to-teal-500',
    description: 'Fresh, organic growth and finance theme with vivid emerald greens.',
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    hex: '#ea580c',
    secondaryHex: '#fb923c',
    previewClass: 'from-orange-600 to-amber-500',
    description: 'Energetic and warm palette with fiery amber and coral glows.',
  },
  {
    id: 'rose',
    name: 'Neon Rose',
    hex: '#e11d48',
    secondaryHex: '#fb7185',
    previewClass: 'from-rose-600 to-pink-500',
    description: 'Bold, passionate editorial styling with saturated crimson notes.',
  },
  {
    id: 'teal',
    name: 'Cyber Teal',
    hex: '#0d9488',
    secondaryHex: '#2dd4bf',
    previewClass: 'from-teal-600 to-cyan-500',
    description: 'Futuristic and sharp aesthetic with luminous turquoise elements.',
  },
];

export interface ColorSchemeTokens {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryLight: string;
  primaryLightBorder: string;
  primaryLightText: string;
  primaryRgb: string;
  primaryGlow: string;
}

export const colorSchemeTokensMap: Record<AccentColor, { light: ColorSchemeTokens; dark: ColorSchemeTokens }> = {
  indigo: {
    light: {
      primary: '#4f46e5',
      primaryHover: '#4338ca',
      primaryActive: '#3730a3',
      primaryLight: '#eef2ff',
      primaryLightBorder: '#c7d2fe',
      primaryLightText: '#4338ca',
      primaryRgb: '79, 70, 229',
      primaryGlow: 'rgba(79, 70, 229, 0.25)',
    },
    dark: {
      primary: '#6366f1',
      primaryHover: '#818cf8',
      primaryActive: '#4f46e5',
      primaryLight: 'rgba(99, 102, 241, 0.12)',
      primaryLightBorder: 'rgba(99, 102, 241, 0.3)',
      primaryLightText: '#a5b4fc',
      primaryRgb: '99, 102, 241',
      primaryGlow: 'rgba(99, 102, 241, 0.35)',
    },
  },
  blue: {
    light: {
      primary: '#2563eb',
      primaryHover: '#1d4ed8',
      primaryActive: '#1e40af',
      primaryLight: '#eff6ff',
      primaryLightBorder: '#bfdbfe',
      primaryLightText: '#1d4ed8',
      primaryRgb: '37, 99, 235',
      primaryGlow: 'rgba(37, 99, 235, 0.25)',
    },
    dark: {
      primary: '#3b82f6',
      primaryHover: '#60a5fa',
      primaryActive: '#2563eb',
      primaryLight: 'rgba(59, 130, 246, 0.12)',
      primaryLightBorder: 'rgba(59, 130, 246, 0.3)',
      primaryLightText: '#93c5fd',
      primaryRgb: '59, 130, 246',
      primaryGlow: 'rgba(59, 130, 246, 0.35)',
    },
  },
  purple: {
    light: {
      primary: '#7c3aed',
      primaryHover: '#6d28d9',
      primaryActive: '#5b21b6',
      primaryLight: '#f5f3ff',
      primaryLightBorder: '#ddd6fe',
      primaryLightText: '#6d28d9',
      primaryRgb: '124, 58, 237',
      primaryGlow: 'rgba(124, 58, 237, 0.25)',
    },
    dark: {
      primary: '#8b5cf6',
      primaryHover: '#a78bfa',
      primaryActive: '#7c3aed',
      primaryLight: 'rgba(139, 92, 246, 0.12)',
      primaryLightBorder: 'rgba(139, 92, 246, 0.3)',
      primaryLightText: '#c4b5fd',
      primaryRgb: '139, 92, 246',
      primaryGlow: 'rgba(139, 92, 246, 0.35)',
    },
  },
  emerald: {
    light: {
      primary: '#059669',
      primaryHover: '#047857',
      primaryActive: '#065f46',
      primaryLight: '#ecfdf5',
      primaryLightBorder: '#a7f3d0',
      primaryLightText: '#047857',
      primaryRgb: '5, 150, 105',
      primaryGlow: 'rgba(5, 150, 105, 0.25)',
    },
    dark: {
      primary: '#10b981',
      primaryHover: '#34d399',
      primaryActive: '#059669',
      primaryLight: 'rgba(16, 185, 129, 0.12)',
      primaryLightBorder: 'rgba(16, 185, 129, 0.3)',
      primaryLightText: '#6ee7b7',
      primaryRgb: '16, 185, 129',
      primaryGlow: 'rgba(16, 185, 129, 0.35)',
    },
  },
  orange: {
    light: {
      primary: '#ea580c',
      primaryHover: '#c2410c',
      primaryActive: '#9a3412',
      primaryLight: '#fff7ed',
      primaryLightBorder: '#fed7aa',
      primaryLightText: '#c2410c',
      primaryRgb: '234, 88, 12',
      primaryGlow: 'rgba(234, 88, 12, 0.25)',
    },
    dark: {
      primary: '#f97316',
      primaryHover: '#fb923c',
      primaryActive: '#ea580c',
      primaryLight: 'rgba(249, 115, 22, 0.12)',
      primaryLightBorder: 'rgba(249, 115, 22, 0.3)',
      primaryLightText: '#fdba74',
      primaryRgb: '249, 115, 22',
      primaryGlow: 'rgba(249, 115, 22, 0.35)',
    },
  },
  rose: {
    light: {
      primary: '#e11d48',
      primaryHover: '#be123c',
      primaryActive: '#9f1239',
      primaryLight: '#fff1f2',
      primaryLightBorder: '#fecdd3',
      primaryLightText: '#be123c',
      primaryRgb: '225, 29, 72',
      primaryGlow: 'rgba(225, 29, 72, 0.25)',
    },
    dark: {
      primary: '#f43f5e',
      primaryHover: '#fb7185',
      primaryActive: '#e11d48',
      primaryLight: 'rgba(244, 63, 94, 0.12)',
      primaryLightBorder: 'rgba(244, 63, 94, 0.3)',
      primaryLightText: '#fda4af',
      primaryRgb: '244, 63, 94',
      primaryGlow: 'rgba(244, 63, 94, 0.35)',
    },
  },
  teal: {
    light: {
      primary: '#0d9488',
      primaryHover: '#0f766e',
      primaryActive: '#115e59',
      primaryLight: '#f0fdfa',
      primaryLightBorder: '#99f6e4',
      primaryLightText: '#0f766e',
      primaryRgb: '13, 148, 136',
      primaryGlow: 'rgba(13, 148, 136, 0.25)',
    },
    dark: {
      primary: '#14b8a6',
      primaryHover: '#2dd4bf',
      primaryActive: '#0d9488',
      primaryLight: 'rgba(20, 184, 166, 0.12)',
      primaryLightBorder: 'rgba(20, 184, 166, 0.3)',
      primaryLightText: '#5eead4',
      primaryRgb: '20, 184, 166',
      primaryGlow: 'rgba(20, 184, 166, 0.35)',
    },
  },
};
