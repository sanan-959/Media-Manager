import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  Bell,
  Sun,
  Moon,
  Plus,
  User,
  LogOut,
  Sliders,
  Sparkles,
  Settings as SettingsIcon,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const {
    isSidebarCollapsed,
    toggleSidebarCollapse,
    setIsMobileSidebarOpen,
    resolvedTheme,
    toggleTheme,
    openComposer,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveTab,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHamburgerClick = () => {
    // Universal collapse button: desktop toggles mini icon rail vs expanded sidebar, mobile opens drawer
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(true);
    } else {
      toggleSidebarCollapse();
    }
  };

  return (
    <header className="sticky top-0 z-20 h-14 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Collapse Hamburger Toggle Button */}
      <div className="flex items-center gap-3">
        {/* Hamburger Collapse Button */}
        <button
          onClick={handleHamburgerClick}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer focus:outline-hidden"
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label="Toggle sidebar collapse"
        >
          <Menu className="w-5 h-5 stroke-[2]" />
        </button>
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Quick Post Button */}
        <button
          onClick={() => openComposer()}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold btn-brand-primary rounded-lg cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Post</span>
        </button>

        {/* Dark/Light Theme Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle Dark / Light Theme"
          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 text-primary-brand hover:-rotate-12 transition-transform" />
          )}
        </button>

        {/* Notifications Popover with red badge */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
              <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-800/40">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 rounded-full">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/70">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400">
                    <Sparkles className="w-6 h-6 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.linkTab) setActiveTab(n.linkTab);
                        setIsNotifOpen(false);
                      }}
                      className={`p-3 text-xs cursor-pointer transition-colors ${
                        n.read
                          ? 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                          : 'bg-indigo-50/40 dark:bg-indigo-950/25 text-slate-900 dark:text-slate-100 font-medium'
                      } hover:bg-slate-50 dark:hover:bg-slate-800/60`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{n.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="mt-1 text-slate-500 dark:text-slate-400 text-[11px] line-clamp-2 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Settings Cog Icon */}
        <button
          onClick={() => setActiveTab('settings')}
          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Settings"
          aria-label="Settings"
        >
          <SettingsIcon className="w-4 h-4 hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* User Profile Avatar */}
        <div className="relative ml-0.5" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-primary-brand/30 transition-all cursor-pointer"
          >
            <div className="relative">
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                alt={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "User"}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
              <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {currentUser ? `${currentUser.firstName} ${currentUser.lastName}`.trim() : 'Alex Rivera'}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {currentUser?.email || 'alex.rivera@agency.io'}
                </p>
              </div>

              <div className="p-1 space-y-0.5">
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  Profile Settings
                </button>

                <button
                  onClick={() => {
                    setActiveTab('team');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Sliders className="w-4 h-4 text-slate-400" />
                  Team & Workflow
                </button>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

              <div className="p-1">
                <button
                  onClick={() => {
                    logout();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
