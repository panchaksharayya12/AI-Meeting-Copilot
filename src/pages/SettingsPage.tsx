import React, { useState, useEffect } from 'react';
import {
  User,
  Sliders,
  Sparkles,
  Bell,
  Database,
  Check,
  Download,
  RotateCcw,
  Shield,
} from 'lucide-react';
import { resetWorkspaceDemo, fetchMeetings, checkServerHealth } from '../lib/api';

export const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'workspace' | 'ai' | 'notifications' | 'data'>('profile');

  // Profile form state
  const [fullName, setFullName] = useState(() => localStorage.getItem('user_fullname') || 'Jordan Davis');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('user_email') || 'jordan.davis@mainframe.co');
  const [profileSaved, setProfileSaved] = useState(false);

  // Workspace settings
  const [workspaceName, setWorkspaceName] = useState(() => localStorage.getItem('ws_name') || 'Mainframe Engineering & Product');
  const [autoExtractActions, setAutoExtractActions] = useState(true);
  const [wsSaved, setWsSaved] = useState(false);

  // AI Preferences
  const [preferredModel, setPreferredModel] = useState('gpt-4o-mini');
  const [aiConfigured, setAiConfigured] = useState(false);

  // Notifications
  const [emailRecaps, setEmailRecaps] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);

  // Reset demo state
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  useEffect(() => {
    checkServerHealth().then((h) => setAiConfigured(h.aiConfigured));
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user_fullname', fullName);
    localStorage.setItem('user_email', userEmail);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleSaveWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('ws_name', workspaceName);
    setWsSaved(true);
    setTimeout(() => setWsSaved(false), 2000);
  };

  const handleExportDataJSON = async () => {
    const meetings = await fetchMeetings();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(meetings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `meeting_copilot_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetWorkspace = async () => {
    if (confirm('Reset workspace data back to original coherent demo state?')) {
      await resetWorkspaceDemo();
      setResetMessage('Demo workspace successfully reloaded.');
      setTimeout(() => setResetMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1
          className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 font-light">
          Manage workspace parameters, AI model preferences, and intelligence data export.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Settings Navigation Menu */}
        <div className="md:col-span-4 space-y-1">
          {[
            { id: 'profile', name: 'Profile', icon: User },
            { id: 'workspace', name: 'Workspace', icon: Sliders },
            { id: 'ai', name: 'AI Preferences', icon: Sparkles },
            { id: 'notifications', name: 'Notifications', icon: Bell },
            { id: 'data', name: 'Data Management', icon: Database },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-white text-black shadow'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Form Body */}
        <div className="md:col-span-8 copilot-card rounded-2xl p-6 sm:p-7 border border-white/10 bg-[#111215]/80">
          {/* PROFILE SECTION */}
          {activeSection === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-5 animate-fade-in">
              <h3 className="text-base font-medium text-white pb-3 border-b border-white/10">
                User Profile
              </h3>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-white text-black font-medium text-xs hover:bg-gray-200 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {profileSaved && <Check className="w-3.5 h-3.5" />}
                  {profileSaved ? 'Profile Saved' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {/* WORKSPACE SECTION */}
          {activeSection === 'workspace' && (
            <form onSubmit={handleSaveWorkspace} className="space-y-5 animate-fade-in">
              <h3 className="text-base font-medium text-white pb-3 border-b border-white/10">
                Workspace Preferences
              </h3>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Workspace Organization
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <div className="text-xs font-medium text-white">Automated Action Extraction</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    Automatically parse participant assignments and deadlines upon transcript completion.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoExtractActions}
                  onChange={(e) => setAutoExtractActions(e.target.checked)}
                  className="w-4 h-4 rounded text-white focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-white text-black font-medium text-xs hover:bg-gray-200 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {wsSaved && <Check className="w-3.5 h-3.5" />}
                  {wsSaved ? 'Saved' : 'Save Workspace'}
                </button>
              </div>
            </form>
          )}

          {/* AI PREFERENCES */}
          {activeSection === 'ai' && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-base font-medium text-white pb-3 border-b border-white/10">
                AI Engine & Provider Preferences
              </h3>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Current Backend Engine</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      aiConfigured
                        ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                        : 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                    }`}
                  >
                    {aiConfigured ? 'OpenAI GPT-4o-mini & Whisper' : 'Deterministic Local Fallback Engine'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {aiConfigured
                    ? 'Your OPENAI_API_KEY is configured in the environment. Full neural transcription and JSON synthesis are active.'
                    : 'No API key detected in server/.env. The application is running seamlessly on high-speed deterministic pattern matching with realistic meeting intelligence.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Default LLM Model for Summary
                </label>
                <select
                  value={preferredModel}
                  onChange={(e) => setPreferredModel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f2025] border border-white/10 text-xs text-white focus:outline-none"
                >
                  <option value="gpt-4o-mini">OpenAI GPT-4o-mini (Fast & Recommended)</option>
                  <option value="gpt-4o">OpenAI GPT-4o (Deep Reasoning)</option>
                  <option value="local">Deterministic Local Parser (Offline)</option>
                </select>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === 'notifications' && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-base font-medium text-white pb-3 border-b border-white/10">
                Notification Rules
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div>
                    <div className="text-xs font-medium text-white">Post-Meeting Executive Digest</div>
                    <div className="text-[11px] text-gray-400">
                      Send summarized email with key decisions immediately after meeting processing.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailRecaps}
                    onChange={(e) => setEmailRecaps(e.target.checked)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div>
                    <div className="text-xs font-medium text-white">Overdue Action Item Alerts</div>
                    <div className="text-[11px] text-gray-400">
                      Notify task owners 24 hours prior to Friday target deadlines.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={dailyReminders}
                    onChange={(e) => setDailyReminders(e.target.checked)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* DATA MANAGEMENT */}
          {activeSection === 'data' && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-base font-medium text-white pb-3 border-b border-white/10">
                Workspace Data & Export
              </h3>

              {resetMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                  {resetMessage}
                </div>
              )}

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-medium text-white">Export Meeting Archive (JSON)</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    Download full dataset including transcripts, decisions, and action items.
                  </div>
                </div>
                <button
                  onClick={handleExportDataJSON}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export JSON
                </button>
              </div>

              <div className="p-4 rounded-xl bg-red-500/[0.04] border border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-medium text-red-200">Reset Demo Workspace</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    Restore the 3 original seed meetings (Product Strategy, Client Discovery, Sprint Review).
                  </div>
                </div>
                <button
                  onClick={handleResetWorkspace}
                  className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to Seed Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
