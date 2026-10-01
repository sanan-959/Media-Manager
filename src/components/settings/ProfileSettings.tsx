import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Camera, Save } from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('Sarah Jenkins');
  const [email, setEmail] = useState('sarah.j@techvibe.io');
  const [title, setTitle] = useState('Head of Content & Growth');
  const [bio, setBio] = useState('Scaling multi-channel social presence for SaaS products.');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile Saved', 'Your user profile details have been updated.');
  };

  return (
    <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
      {/* Avatar Row */}
      <div className="flex items-center gap-3.5">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
            alt="Avatar"
            className="w-14 h-14 rounded-xl object-cover ring-2 ring-primary-brand/30"
          />
          <button
            type="button"
            className="absolute -bottom-1 -right-1 p-1 bg-primary-brand text-white rounded-md shadow-sm hover:opacity-90 cursor-pointer"
          >
            <Camera className="w-3 h-3" />
          </button>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{name}</h4>
          <p className="text-[11px] text-slate-400">JPG or PNG under 5MB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Display Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800/90 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-primary-brand/30"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800/90 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-primary-brand/30"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
          Job Title / Role
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800/90 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-primary-brand/30"
        />
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
          Bio / Description
        </label>
        <textarea
          rows={2}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800/90 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-primary-brand/30"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg btn-brand-primary cursor-pointer"
      >
        <Save className="w-3.5 h-3.5" /> Save Profile
      </button>
    </form>
  );
};
