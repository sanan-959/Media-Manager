import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { PostComposer } from '../composer/PostComposer';
import { DashboardView } from '../../views/DashboardView';
import { AccountsView } from '../../views/AccountsView';
import { ContentView } from '../../views/ContentView';
import { CalendarViewPage } from '../../views/CalendarViewPage';
import { AnalyticsView } from '../../views/AnalyticsView';
import { InboxView } from '../../views/InboxView';
import { TeamView } from '../../views/TeamView';
import { SettingsView } from '../../views/SettingsView';

export const Layout: React.FC = () => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'accounts':
        return <AccountsView />;
      case 'content':
        return <ContentView />;
      case 'calendar':
        return <CalendarViewPage />;
      case 'analytics':
        return <AnalyticsView />;
      case 'inbox':
        return <InboxView />;
      case 'team':
        return <TeamView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white relative font-sans">
      {/* Subtle Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative z-10">
        <Header />
        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 w-full max-w-[1440px] mx-auto animate-fade-in">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Post Composer Modal */}
      <PostComposer />
    </div>
  );
};
