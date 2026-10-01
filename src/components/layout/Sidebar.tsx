import React from 'react';
import { useApp } from '../../context/AppContext';
import type { NavigationTab } from '../../types';
import { AppLogo } from '../common/AppLogo';
import {
  LayoutDashboard,
  Share2,
  FileText,
  Calendar,
  BarChart3,
  Inbox,
  Users,
  Settings,
  Plus,
  X,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface NavSection {
  title: string;
  items: {
    id: NavigationTab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    hasSubmenu?: boolean;
  }[];
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isSidebarCollapsed,
    openComposer,
    conversations,
    notifications,
  } = useApp();

  const unreadInboxCount = conversations.filter((c) => c.unread).length;
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const sections: NavSection[] = [
    {
      title: 'DASHBOARD',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-[18px] h-[18px] stroke-[1.8]" /> },
        { id: 'accounts', label: 'Social Accounts', icon: <Share2 className="w-[18px] h-[18px] stroke-[1.8]" /> },
        { id: 'content', label: 'Posts & Marketing', icon: <FileText className="w-[18px] h-[18px] stroke-[1.8]" /> },
        { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-[18px] h-[18px] stroke-[1.8]" /> },
      ],
    },
    {
      title: 'CONCEPTS',
      items: [
        {
          id: 'calendar',
          label: 'Schedule Calendar',
          icon: <Calendar className="w-[18px] h-[18px] stroke-[1.8]" />,
          hasSubmenu: true,
        },
        {
          id: 'inbox',
          label: 'Unified Inbox',
          icon: <Inbox className="w-[18px] h-[18px] stroke-[1.8]" />,
          badge: unreadInboxCount > 0 ? unreadInboxCount : undefined,
          hasSubmenu: true,
        },
        {
          id: 'team',
          label: 'Team & Approvals',
          icon: <Users className="w-[18px] h-[18px] stroke-[1.8]" />,
          hasSubmenu: true,
        },
        {
          id: 'settings',
          label: 'Settings & Config',
          icon: <Settings className="w-[18px] h-[18px] stroke-[1.8]" />,
          badge: unreadNotifCount > 0 ? unreadNotifCount : undefined,
          hasSubmenu: true,
        },
      ],
    },
  ];

  const allItems = sections.flatMap((s) => s.items);

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  // Compact Rail Navigation Content (Matches Ecme Dashboard Screenshot 1)
  const compactRailContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/80 select-none py-3.5 px-2 items-center justify-between transition-colors">
      {/* Top Logo Icon */}
      <div className="flex flex-col items-center gap-4 w-full">
        <button
          onClick={() => handleNavClick('dashboard')}
          className="group relative focus:outline-hidden cursor-pointer"
          title="SocialPulse Dashboard"
        >
          <AppLogo size="md" showText={false} />
        </button>

        {/* Quick Post Button */}
        <div className="w-full flex justify-center">
          <button
            onClick={() => openComposer()}
            className="w-10 h-10 rounded-xl btn-brand-primary flex items-center justify-center cursor-pointer relative group transition-transform hover:scale-105"
            title="Create New Post"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-2.5 py-1.5 text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              New Post
            </div>
          </button>
        </div>

        {/* Vertical Icon Menu */}
        <nav className="flex flex-col items-center gap-2 w-full mt-1">
          {allItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="relative group w-full flex justify-center">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center relative transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-primary-brand bg-primary-light font-semibold shadow-2xs ring-1 ring-primary-light'
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                  }`}
                  aria-label={item.label}
                >
                  <span className={`transition-transform duration-150 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>

                  {/* Badge count dot/pill */}
                  {item.badge !== undefined && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse" />
                  )}
                </button>

                {/* Floating Tooltip with Arrow */}
                <div className="absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none z-50 flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {/* Arrow Indicator */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-1 border-4 border-transparent border-r-slate-900 dark:border-r-slate-800" />
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Subtle Status */}
      <div className="w-full flex justify-center pt-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500" title="Connected" />
      </div>
    </div>
  );

  // Full Expanded Navigation Content (Matches Ecme Dashboard Screenshot 2)
  const expandedNavContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-r border-slate-200/80 dark:border-slate-800/80 select-none transition-colors">
      {/* Brand Header */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => handleNavClick('dashboard')}
          className="text-left focus:outline-hidden cursor-pointer"
        >
          <AppLogo size="md" showText={true} />
        </button>

        {/* Close button on mobile */}
        {isMobileSidebarOpen && (
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              {section.title}
            </div>

            {section.items.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer group ${
                    isActive
                      ? 'bg-primary-light text-primary-brand font-bold shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`transition-colors ${
                        isActive ? 'text-primary-brand' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className={isActive ? 'text-primary-brand font-bold' : ''}>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full transition-colors ${
                          isActive
                            ? 'bg-primary-brand text-white shadow-2xs'
                            : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.hasSubmenu && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Pro Plan Bottom Card */}
      <div className="p-3.5 m-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl relative overflow-hidden shadow-2xs">
        <div className="flex items-center gap-2 text-primary-brand mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">Pro Plan</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
          Enterprise workspace active.
        </p>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-1.5 rounded-full w-4/5 transition-all duration-500"
            style={{ backgroundColor: 'var(--color-primary)' }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar - Switches seamlessly between Compact Rail (Ecme style) and Expanded */}
      <aside
        className={`hidden lg:block shrink-0 h-screen sticky top-0 z-30 transition-all duration-200 ease-in-out ${
          isSidebarCollapsed ? 'w-[70px]' : 'w-64'
        }`}
      >
        {isSidebarCollapsed ? compactRailContent : expandedNavContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slide-right">
            {expandedNavContent}
          </div>
        </div>
      )}
    </>
  );
};
