import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { AuthorAvatar } from '../../components/common/AuthorAvatar';
import { useApp } from '../../context/AppContext';
import {
  User,
  Shield,
  Bell,
  Lock,
  Eye,
  Sliders,
  AlertTriangle,
  Save,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentUser, updateCurrentUser, showToast, theme, toggleTheme, setTheme } = useApp();

  const [activeSection, setActiveSection] = useState<
    'profile' | 'account' | 'security' | 'notifications' | 'privacy' | 'appearance'
  >('profile');

  // Profile form
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location || '');
  const [website, setWebsite] = useState(currentUser.website || '');

  // Account form
  const [email, setEmail] = useState('erostova@quillora.ink');

  // Password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Notification toggles
  const [emailDigest, setEmailDigest] = useState(true);
  const [appreciationAlerts, setAppreciationAlerts] = useState(true);
  const [commentAlerts, setCommentAlerts] = useState(true);

  // Privacy toggles
  const [publicProfile, setPublicProfile] = useState(true);
  const [showReadingHistory, setShowReadingHistory] = useState(false);

  // Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name: name.trim(),
      username: username.trim(),
      bio: bio.trim(),
      location: location.trim(),
      website: website.trim(),
    });
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      showToast('New password must be at least 8 characters', 'error');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    showToast('Password updated successfully', 'success');
  };

  return (
    <AppLayout showRightSidebar={false} maxWidth="full">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="border-b border-[#E9E6E0] pb-4">
          <span className="text-xs uppercase tracking-widest text-[#2563EB] font-semibold block mb-0.5">
            Preferences
          </span>
          <h1 className="font-serif-display text-3xl text-[#191919]">
            Account & Publication Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Settings Nav Sidebar */}
          <div className="space-y-1">
            {[
              { id: 'profile', label: 'Author Profile', icon: User },
              { id: 'account', label: 'Account Details', icon: Sliders },
              { id: 'security', label: 'Security & Password', icon: Shield },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'privacy', label: 'Privacy & Visibility', icon: Lock },
              { id: 'appearance', label: 'Appearance & Theme', icon: Eye },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium rounded transition-colors text-left ${
                    isActive
                      ? 'bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB] dark:text-[#60A5FA] font-semibold'
                      : 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <div className="pt-6 border-t border-[#E9E6E0] mt-6">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="w-full text-left px-3.5 py-2 text-xs font-medium text-[#C44949] hover:bg-red-50 rounded transition-colors"
              >
                Deactivate Account
              </button>
            </div>
          </div>

          {/* Settings Form Pane */}
          <div className="md:col-span-3 bg-[#FFFFFF] border border-[#E9E6E0] rounded-lg p-6 sm:p-8 shadow-2xs">
            {activeSection === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <h2 className="font-serif-display text-2xl text-[#191919]">
                  Author Profile
                </h2>

                <div className="flex items-center gap-4 pb-4 border-b border-[#E9E6E0]">
                  <AuthorAvatar
                    name={currentUser.name}
                    avatar={currentUser.avatar}
                    size="xl"
                    clickable={false}
                  />
                  <div>
                    <h3 className="font-serif-display text-lg text-[#191919]">{currentUser.name}</h3>
                    <p className="text-xs text-[#77736E]">
                      Profile picture displayed across your publications.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E9E6E0] rounded focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                      Username (@handle)
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E9E6E0] rounded focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                    Bio & Editorial Mission
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E9E6E0] rounded focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                      Location / Cities
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E9E6E0] rounded focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                      Website URL
                    </label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E9E6E0] rounded focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E9E6E0] flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Save size={14} />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            )}

            {activeSection === 'account' && (
              <div className="space-y-6">
                <h2 className="font-serif-display text-2xl text-[#191919]">
                  Account Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                      Account Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E9E6E0] rounded focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <span className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                      Account Tier
                    </span>
                    <p className="text-sm text-[#77736E]">
                      Independent Writer Member (Prototype Preview Edition)
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E9E6E0] flex justify-end">
                  <button
                    type="button"
                    onClick={() => showToast('Account details updated', 'success')}
                    className="px-6 py-2.5 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded"
                  >
                    Save Account
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <form onSubmit={handleSaveSecurity} className="space-y-6">
                <h2 className="font-serif-display text-2xl text-[#191919]">
                  Security & Password
                </h2>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E9E6E0] rounded focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E9E6E0] rounded focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E9E6E0] flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h2 className="font-serif-display text-2xl text-[#191919]">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailDigest}
                      onChange={(e) => setEmailDigest(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#E9E6E0] text-[#2563EB]"
                    />
                    <div>
                      <span className="text-sm font-medium text-[#191919] block">
                        Weekly Literary Digest
                      </span>
                      <span className="text-xs text-[#77736E]">
                        Receive a quiet Sunday morning email summarizing top dispatches from writers you follow.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appreciationAlerts}
                      onChange={(e) => setAppreciationAlerts(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#E9E6E0] text-[#2563EB]"
                    />
                    <div>
                      <span className="text-sm font-medium text-[#191919] block">
                        Story Appreciations
                      </span>
                      <span className="text-xs text-[#77736E]">
                        Notify me when a fellow reader claps or highlights a passage in my essays.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={commentAlerts}
                      onChange={(e) => setCommentAlerts(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#E9E6E0] text-[#2563EB]"
                    />
                    <div>
                      <span className="text-sm font-medium text-[#191919] block">
                        Discussion Marginalia
                      </span>
                      <span className="text-xs text-[#77736E]">
                        Notify me when a reader posts an annotation or reply to my stories.
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t border-[#E9E6E0] flex justify-end">
                  <button
                    type="button"
                    onClick={() => showToast('Notification settings saved', 'success')}
                    className="px-6 py-2.5 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <h2 className="font-serif-display text-2xl text-[#191919]">
                  Privacy & Discoverability
                </h2>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={publicProfile}
                      onChange={(e) => setPublicProfile(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#E9E6E0] text-[#2563EB]"
                    />
                    <div>
                      <span className="text-sm font-medium text-[#191919] block">
                        Public Publication Profile
                      </span>
                      <span className="text-xs text-[#77736E]">
                        Allow your author page to be indexed in the Quillora directory and web search.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showReadingHistory}
                      onChange={(e) => setShowReadingHistory(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-[#E9E6E0] text-[#2563EB]"
                    />
                    <div>
                      <span className="text-sm font-medium text-[#191919] block">
                        Public Reading Marginalia
                      </span>
                      <span className="text-xs text-[#77736E]">
                        Show which essays you have annotated on your personal writer profile.
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t border-[#E9E6E0] dark:border-[#272E3B] flex justify-end">
                  <button
                    type="button"
                    onClick={() => showToast('Privacy settings saved', 'success')}
                    className="px-6 py-2.5 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded"
                  >
                    Update Privacy
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <h2 className="font-serif-display text-2xl text-[#191919] dark:text-[#F3F4F6]">
                  Appearance & Theme
                </h2>

                <p className="text-xs text-[#77736E] dark:text-[#9CA3AF]">
                  Select the visual ambiance for your reading and writing sessions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTheme('light');
                      showToast('Switched to Alabaster Light theme', 'info');
                    }}
                    className={`p-5 rounded-lg border text-left transition-all flex flex-col justify-between h-36 ${
                      theme === 'light'
                        ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 bg-[#FAF9F6] text-[#191919]'
                        : 'border-[#E9E6E0] dark:border-[#272E3B] bg-[#FAF9F6] text-[#191919]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">Alabaster Light</span>
                      <span className="text-xs text-[#2563EB] font-medium">
                        {theme === 'light' ? '● Active' : ''}
                      </span>
                    </div>
                    <p className="text-xs text-[#77736E] leading-relaxed">
                      Warm linen paper tones (#FAF9F6) designed for daytime reading clarity.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#FAF9F6] border border-[#E9E6E0]" />
                      <span className="w-4 h-4 rounded-full bg-[#2563EB]" />
                      <span className="w-4 h-4 rounded-full bg-[#EAB308]" />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTheme('dark');
                      showToast('Switched to Midnight Ink theme', 'info');
                    }}
                    className={`p-5 rounded-lg border text-left transition-all flex flex-col justify-between h-36 ${
                      theme === 'dark'
                        ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 bg-[#0E121A] text-white'
                        : 'border-[#E9E6E0] dark:border-[#272E3B] bg-[#0E121A] text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">Midnight Ink</span>
                      <span className="text-xs text-[#60A5FA] font-medium">
                        {theme === 'dark' ? '● Active' : ''}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Deep slate black tones (#0E121A) with subdued contrast for nighttime focus.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#0E121A] border border-stone-700" />
                      <span className="w-4 h-4 rounded-full bg-[#3B82F6]" />
                      <span className="w-4 h-4 rounded-full bg-[#FACC15]" />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Deactivate Author Profile?"
        message="Are you certain you wish to deactivate your Quillora publication? All published dispatches will be archived and hidden from public exploration."
        confirmLabel="Deactivate Account"
        isDestructive={true}
        onConfirm={() => {
          setShowDeleteModal(false);
          showToast('Account deactivated in demo mode', 'info');
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </AppLayout>
  );
};
