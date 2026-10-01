import React, { useState } from 'react';
import { Tabs, type TabItem } from '../components/common/Tabs';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { ConnectedAccountSettings } from '../components/settings/ConnectedAccountSettings';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { User, Bell, Share2, Palette, Shield } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs: TabItem[] = [
    { id: 'profile', label: 'Profile Settings', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'notifications', label: 'Notification Alerts', icon: <Bell className="w-3.5 h-3.5" /> },
    { id: 'connected', label: 'Connected Accounts', icon: <Share2 className="w-3.5 h-3.5" /> },
    { id: 'appearance', label: 'Appearance & Theme', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'security', label: 'Security & 2FA', icon: <Shield className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
          Account & Workspace Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure profile details, notification alerts, branding, and security preferences
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="underline" />

      {/* Tab Contents */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-xl p-4 sm:p-5 shadow-2xs">
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'connected' && <ConnectedAccountSettings />}
        {activeTab === 'appearance' && <AppearanceSettings />}
        {activeTab === 'security' && <SecuritySettings />}
      </div>
    </div>
  );
};
