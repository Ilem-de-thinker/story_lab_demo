import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Send, Image as ImageIcon } from 'lucide-react';
import { AuthorAvatar } from '../common/AuthorAvatar';

interface CreateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GRADIENT_PRESETS = [
  { label: 'Deep Ocean', class: 'from-blue-900 to-indigo-950' },
  { label: 'Golden Amber', class: 'from-amber-900 via-stone-900 to-black' },
  { label: 'Midnight Slate', class: 'from-blue-950 to-slate-900' },
  { label: 'Alabaster Ink', class: 'from-stone-900 to-neutral-950' },
  { label: 'Royal Twilight', class: 'from-indigo-950 via-slate-900 to-amber-950' },
];

const IMAGE_PRESETS = [
  { label: 'Manuscript Desk', url: '/assets/images/hero_editorial_desk_1791912314353.jpg' },
  { label: 'African Tech', url: '/assets/images/story_african_tech_1791912314761.jpg' },
  { label: 'Quiet Studio', url: '/assets/images/story_quiet_discipline_1791912314955.jpg' },
  { label: 'Letterpress', url: '/assets/images/story_ideas_time_1791912316437.jpg' },
];

export const CreateStatusModal: React.FC<CreateStatusModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, createStatus } = useApp();
  const [text, setText] = useState('');
  const [selectedGradient, setSelectedGradient] = useState(GRADIENT_PRESETS[0].class);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    createStatus(text.trim(), selectedGradient, selectedImage);
    setText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] dark:bg-[#161B24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-lg max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#E9E6E0] dark:border-[#272E3B] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#2563EB]" />
            <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6]">
              Share Writer Dispatch
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#77736E] hover:text-[#191919] dark:hover:text-[#F3F4F6]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Rectangular Preview */}
        <div
          className={`aspect-[16/10] sm:aspect-[16/9] rounded-md relative overflow-hidden p-5 flex flex-col justify-between mb-4 text-white shadow-inner bg-gradient-to-br ${selectedGradient}`}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Status backdrop"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          )}
          <div className="relative z-10 flex items-center gap-2.5">
            <AuthorAvatar
              name={currentUser.name}
              avatar={currentUser.avatar}
              size="xs"
              clickable={false}
            />
            <div>
              <span className="text-xs font-semibold block leading-tight">{currentUser.name}</span>
              <span className="text-[10px] text-white/70">Right now</span>
            </div>
          </div>

          <p className="relative z-10 font-serif text-sm sm:text-base leading-relaxed line-clamp-3">
            {text || 'Write your daily reflection, manuscript note, or quote...'}
          </p>

          <span className="relative z-10 text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
            Quillora Ephemeral Status
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6] mb-1">
              Your Thought / Dispatch
            </label>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What passage or thought is occupying your mind today?"
              className="w-full px-3 py-2 text-sm bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Palette Selector */}
          <div>
            <span className="block text-xs uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6] mb-1.5">
              Atmosphere / Background
            </span>
            <div className="flex items-center gap-2">
              {GRADIENT_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setSelectedGradient(p.class);
                    setSelectedImage(undefined);
                  }}
                  className={`w-7 h-7 rounded-full bg-gradient-to-br ${p.class} border-2 transition-transform ${
                    selectedGradient === p.class && !selectedImage
                      ? 'scale-115 border-white ring-2 ring-[#2563EB]'
                      : 'border-transparent'
                  }`}
                  title={p.label}
                />
              ))}

              <div className="h-4 w-[1px] bg-[#E9E6E0] dark:bg-[#272E3B] mx-1" />

              {/* Photo backdrop presets */}
              {IMAGE_PRESETS.map((img) => (
                <button
                  key={img.label}
                  type="button"
                  onClick={() => setSelectedImage(img.url)}
                  className={`w-7 h-7 rounded overflow-hidden border-2 transition-transform ${
                    selectedImage === img.url
                      ? 'scale-115 border-[#2563EB] ring-2 ring-[#2563EB]'
                      : 'border-[#E9E6E0] dark:border-[#272E3B]'
                  }`}
                  title={img.label}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E9E6E0] dark:border-[#272E3B] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs uppercase tracking-wider text-[#77736E] hover:text-[#191919] dark:hover:text-[#F3F4F6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="px-5 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded disabled:opacity-40 transition-colors inline-flex items-center gap-1.5"
            >
              <Send size={13} />
              <span>Publish Dispatch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
