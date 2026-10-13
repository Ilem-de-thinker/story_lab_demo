/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { MainFeedPage } from './pages/feed/MainFeedPage';
import { ExplorePage } from './pages/explore/ExplorePage';
import { WriterProfilePage } from './pages/profile/WriterProfilePage';
import { StoryReadingPage } from './pages/reading/StoryReadingPage';
import { WritingStudioPage } from './pages/writer/WritingStudioPage';
import { DraftsPage } from './pages/writer/DraftsPage';
import { NotificationsPage } from './pages/activity/NotificationsPage';
import { BookmarksPage } from './pages/reading/BookmarksPage';
import { MessagesPage } from './pages/messages/MessagesPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Auth */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Core Platform Feed & Discovery */}
          <Route path="/feed" element={<MainFeedPage />} />
          <Route path="/explore" element={<ExplorePage />} />

          {/* Reading & Author Profiles */}
          <Route path="/story/:slug" element={<StoryReadingPage />} />
          <Route path="/u/:username" element={<WriterProfilePage />} />

          {/* Creation & Studio */}
          <Route path="/write" element={<WritingStudioPage />} />
          <Route path="/drafts" element={<DraftsPage />} />

          {/* User Features */}
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
