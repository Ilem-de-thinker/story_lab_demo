import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { TipTapEditor } from '../../components/editor/TipTapEditor';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  Send,
  Image as ImageIcon,
  Clock,
  Sparkles,
  X,
  FileText,
  Save,
} from 'lucide-react';
import { AuthorAvatar } from '../../components/common/AuthorAvatar';

const EDITORIAL_IMAGE_OPTIONS = [
  { label: 'Author Desk & Manuscript', url: '/src/assets/images/hero_editorial_desk_1791912314353.jpg' },
  { label: 'African Tech Campus', url: '/src/assets/images/story_african_tech_1791912314761.jpg' },
  { label: 'Quiet Loft Studio', url: '/src/assets/images/story_quiet_discipline_1791912314955.jpg' },
  { label: 'Letterpress Movable Type', url: '/src/assets/images/story_ideas_time_1791912316437.jpg' },
  { label: 'Developer Study & Tea', url: '/src/assets/images/story_developer_writer_1791912316690.jpg' },
];

export const WritingStudioPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get('draftId');

  const { drafts, saveDraft, publishStory, showToast, currentUser } = useApp();

  // Story state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('<p></p>');
  const [coverImage, setCoverImage] = useState<string | undefined>(
    EDITORIAL_IMAGE_OPTIONS[0].url
  );
  const [topic, setTopic] = useState('The Craft of Writing');
  const [tagsInput, setTagsInput] = useState('Writing, Reflections');
  const [visibility, setVisibility] = useState<'public' | 'unlisted'>('public');

  // UI state
  const [isPreview, setIsPreview] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('Autosaved');

  // Load draft if requested
  useEffect(() => {
    if (draftId) {
      const existing = drafts.find((d) => d.id === draftId);
      if (existing) {
        setTitle(existing.title);
        setSubtitle(existing.subtitle || '');
        setContent(existing.content);
        setCoverImage(existing.coverImage);
        setTopic(existing.topic);
        setTagsInput(existing.tags.join(', '));
      }
    }
  }, [draftId, drafts]);

  // Autosave simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title.trim()) {
        setLastSaved('Autosaved just now');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [title, subtitle, content]);

  // Word count & reading time calculation
  const textOnly = content.replace(/<[^>]*>/g, '').trim();
  const wordCount = textOnly ? textOnly.split(/\s+/).filter(Boolean).length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const handleSaveDraft = () => {
    if (!title.trim()) {
      showToast('Please provide a title for your draft', 'error');
      return;
    }
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    saveDraft({
      id: draftId || undefined,
      title: title.trim(),
      subtitle: subtitle.trim(),
      content,
      coverImage,
      topic,
      tags,
      wordCount,
    });
    setLastSaved('Draft saved manually');
  };

  const handlePublish = () => {
    if (!title.trim()) {
      showToast('A title is required to publish', 'error');
      return;
    }
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const excerpt =
      subtitle.trim() ||
      textOnly.slice(0, 140) + '...' ||
      'An essay published on Quillora.';

    const newStory = publishStory({
      title: title.trim(),
      subtitle: subtitle.trim(),
      excerpt,
      content,
      coverImage,
      topic,
      tags,
      readingTimeMinutes,
    });

    setShowPublishDialog(false);
    navigate(`/story/${newStory.slug}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#191919] flex flex-col antialiased">
      {/* Studio Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-xs border-b border-[#E9E6E0] px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/feed')}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#77736E] hover:text-[#191919] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Feed</span>
          </button>
          <div className="h-4 w-[1px] bg-[#E9E6E0]" />
          <span className="font-editorial text-2xl text-[#191919]">Quillora Studio</span>
          <span className="hidden sm:inline-block text-xs text-[#77736E]">
            · {lastSaved}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors inline-flex items-center gap-1.5 ${
              isPreview
                ? 'bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB] dark:text-[#60A5FA] border-[#2563EB]'
                : 'text-[#77736E] dark:text-[#9CA3AF] border-[#E9E6E0] dark:border-[#272E3B] hover:text-[#191919] dark:hover:text-white hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430]'
            }`}
          >
            <Eye size={14} />
            <span>{isPreview ? 'Back to Editor' : 'Preview'}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveDraft}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#77736E] border border-[#E9E6E0] hover:text-[#191919] hover:bg-[#F1EFEA] rounded transition-colors"
          >
            <Save size={14} />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPublishDialog(true)}
            className="px-4 py-1.5 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-colors inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Send size={13} />
            <span>Publish</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
        {isPreview ? (
          /* Preview Mode */
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="p-3 bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB] dark:text-[#93C5FD] border border-[#2563EB]/20 rounded text-xs flex items-center justify-between">
              <span>Preview Mode — This is how readers will see your dispatch.</span>
              <button
                onClick={() => setIsPreview(false)}
                className="font-medium underline hover:text-[#191919]"
              >
                Return to Editor
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-[#77736E] flex items-center gap-2">
                <span className="font-semibold text-[#2563EB]">{topic}</span>
                <span>·</span>
                <span>{readingTimeMinutes} min read</span>
              </div>
              <h1 className="font-serif-display text-4xl sm:text-5xl text-[#191919]">
                {title || 'Untitled Dispatch'}
              </h1>
              {subtitle && (
                <p className="text-lg text-[#77736E] leading-relaxed">{subtitle}</p>
              )}
            </div>

            {/* Author Byline */}
            <div className="py-3 border-t border-b border-[#E9E6E0] flex items-center gap-3">
              <AuthorAvatar
                name={currentUser.name}
                avatar={currentUser.avatar}
                size="sm"
                clickable={false}
              />
              <div>
                <span className="text-xs font-semibold text-[#191919]">{currentUser.name}</span>
                <span className="text-xs text-[#77736E] ml-2">Today</span>
              </div>
            </div>

            {/* Rectangular Cover Image Preview */}
            {coverImage && (
              <div className="aspect-[16/9] overflow-hidden rounded bg-[#F1EFEA] border border-[#E9E6E0]">
                <img
                  src={coverImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Body */}
            <div
              className="font-prose-serif text-lg leading-[1.8] text-[#191919] space-y-6 pt-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ) : (
          /* Editing Workspace */
          <div className="space-y-6">
            {/* Rectangular Cover Image Slot */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#77736E]">
                <span className="font-medium text-[#191919]">Story Cover Artwork (16:9 Rectangular)</span>
                <button
                  type="button"
                  onClick={() => setShowImagePicker(!showImagePicker)}
                  className="text-[#2563EB] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <ImageIcon size={13} />
                  <span>{coverImage ? 'Change Image' : 'Select Artwork'}</span>
                </button>
              </div>

              {coverImage ? (
                <div className="relative aspect-[16/9] max-h-72 rounded bg-[#F1EFEA] border border-[#E9E6E0] overflow-hidden group">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setCoverImage(undefined)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                    title="Remove artwork"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setShowImagePicker(true)}
                  className="aspect-[16/9] max-h-48 rounded border border-dashed border-[#E9E6E0] bg-[#FFFFFF] flex flex-col items-center justify-center text-xs text-[#77736E] cursor-pointer hover:bg-[#F1EFEA] transition-colors"
                >
                  <ImageIcon size={22} className="mb-2 text-[#2563EB]" />
                  <span>Add a wide rectangular cover image (16:9)</span>
                </div>
              )}

              {/* Image Picker Dropdown */}
              {showImagePicker && (
                <div className="p-4 bg-[#FFFFFF] border border-[#E9E6E0] rounded-md shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#191919]">Select Editorial Asset:</span>
                    <button
                      onClick={() => setShowImagePicker(false)}
                      className="text-xs text-[#77736E] hover:text-[#191919]"
                    >
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {EDITORIAL_IMAGE_OPTIONS.map((opt) => (
                      <button
                        key={opt.url}
                        type="button"
                        onClick={() => {
                          setCoverImage(opt.url);
                          setShowImagePicker(false);
                        }}
                        className={`text-left rounded overflow-hidden border transition-all ${
                          coverImage === opt.url
                            ? 'border-[#2563EB] ring-2 ring-[#2563EB]/30'
                            : 'border-[#E9E6E0] hover:border-[#191919]'
                        }`}
                      >
                        <div className="aspect-[16/9] bg-[#F1EFEA] overflow-hidden">
                          <img
                            src={opt.url}
                            alt={opt.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="p-1.5 text-[11px] text-[#77736E] truncate">{opt.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Story Title & Subtitle */}
            <div className="space-y-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of your dispatch..."
                className="w-full font-serif-display text-3xl sm:text-4xl text-[#191919] placeholder:text-[#E9E6E0] bg-transparent border-none outline-none focus:ring-0 leading-tight"
              />
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Add a reflective subtitle or deck..."
                className="w-full font-sans text-base sm:text-lg text-[#77736E] placeholder:text-[#E9E6E0] bg-transparent border-none outline-none focus:ring-0 leading-relaxed"
              />
            </div>

            {/* TipTap Rich Text Editor */}
            <div>
              <TipTapEditor
                content={content}
                onChange={(newHtml) => setContent(newHtml)}
              />
            </div>

            {/* Word count & Reading stats footer */}
            <div className="flex items-center justify-between text-xs text-[#77736E] pt-4 border-t border-[#E9E6E0]">
              <div className="flex items-center gap-4">
                <span>
                  <strong className="text-[#191919] tabular-nums">{wordCount}</strong> words
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>~{readingTimeMinutes} min read</span>
                </span>
              </div>
              <span className="text-[11px]">Markdown & shortcuts enabled</span>
            </div>
          </div>
        )}
      </main>

      {/* Publishing Modal Dialog */}
      {showPublishDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] border border-[#E9E6E0] rounded-lg max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-[#E9E6E0] pb-3">
              <h3 className="font-serif-display text-2xl text-[#191919]">
                Ready to Publish
              </h3>
              <button
                type="button"
                onClick={() => setShowPublishDialog(false)}
                className="text-[#77736E] hover:text-[#191919]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Rectangular preview in modal */}
            {coverImage && (
              <div className="aspect-[16/9] max-h-40 rounded bg-[#F1EFEA] border border-[#E9E6E0] overflow-hidden">
                <img
                  src={coverImage}
                  alt="Publish preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                  Primary Topic Archive
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E9E6E0] rounded focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="The Craft of Writing">The Craft of Writing</option>
                  <option value="African Technology">African Technology</option>
                  <option value="Creative Nonfiction">Creative Nonfiction</option>
                  <option value="Philosophy of Mind">Philosophy of Mind</option>
                  <option value="Digital Craftsmanship">Digital Craftsmanship</option>
                  <option value="Poetry & Translation">Poetry & Translation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                  Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Prose, Style, Architecture"
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E9E6E0] rounded focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] mb-1">
                  Publication Visibility
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVisibility('public')}
                    className={`p-2.5 rounded border text-left text-xs transition-colors ${
                      visibility === 'public'
                        ? 'border-[#2563EB] bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB] dark:text-[#60A5FA] font-semibold'
                        : 'border-[#E9E6E0] dark:border-[#272E3B] text-[#77736E] dark:text-[#9CA3AF]'
                    }`}
                  >
                    Public Feed (All Readers)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibility('unlisted')}
                    className={`p-2.5 rounded border text-left text-xs transition-colors ${
                      visibility === 'unlisted'
                        ? 'border-[#2563EB] bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB] dark:text-[#60A5FA] font-semibold'
                        : 'border-[#E9E6E0] dark:border-[#272E3B] text-[#77736E] dark:text-[#9CA3AF]'
                    }`}
                  >
                    Unlisted (Link Only)
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E9E6E0] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPublishDialog(false)}
                className="px-4 py-2 text-xs uppercase tracking-wider text-[#77736E] hover:text-[#191919]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePublish}
                className="px-6 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-colors"
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
