import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { useApp } from '../../context/AppContext';
import { Search, PenTool, Trash2, Clock, FileText } from 'lucide-react';

export const DraftsPage: React.FC = () => {
  const navigate = useNavigate();
  const { drafts, deleteDraft } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [draftToDelete, setDraftToDelete] = useState<string | null>(null);

  const filteredDrafts = drafts.filter((d) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return d.title.toLowerCase().includes(q) || (d.subtitle && d.subtitle.toLowerCase().includes(q));
  });

  const handleDelete = () => {
    if (draftToDelete) {
      deleteDraft(draftToDelete);
      setDraftToDelete(null);
    }
  };

  return (
    <AppLayout showRightSidebar={true}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E6E0] dark:border-[#272E3B]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-0.5">
              Manuscript Desk
            </span>
            <h1 className="font-serif-display text-2xl sm:text-3xl text-[#191919] dark:text-[#F3F4F6]">
              Drafts ({drafts.length})
            </h1>
          </div>

          <Link
            to="/write"
            className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <PenTool size={13} />
            <span>New Dispatch</span>
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-3 text-[#77736E] dark:text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your drafts..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] text-[#191919] dark:text-[#F3F4F6] rounded focus:outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Draft List */}
        {filteredDrafts.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-6">
            <FileText size={36} className="text-[#77736E] dark:text-[#9CA3AF] mx-auto mb-2" />
            <h3 className="font-serif-display text-lg text-[#191919] dark:text-[#F3F4F6] mb-1">
              No drafts in progress
            </h3>
            <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] max-w-sm mx-auto mb-4">
              {searchQuery
                ? 'No drafts match your query.'
                : 'Your desk is clean. Ready to begin your next reflection?'}
            </p>
            <Link
              to="/write"
              className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded inline-flex items-center gap-1.5 transition-colors"
            >
              <PenTool size={12} />
              <span>Continue Writing</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDrafts.map((draft) => (
              <div
                key={draft.id}
                className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#2563EB]"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-[#77736E] dark:text-[#9CA3AF] mb-1">
                    <span className="text-[#2563EB] dark:text-[#60A5FA] font-medium">{draft.topic}</span>
                    <span aria-hidden="true">·</span>
                    <span>Updated {draft.updatedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{draft.wordCount} words</span>
                  </div>

                  <Link
                    to={`/write?draftId=${draft.id}`}
                    className="block group"
                  >
                    <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors truncate">
                      {draft.title || 'Untitled Draft'}
                    </h3>
                    {draft.subtitle && (
                      <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] line-clamp-1 mt-0.5">
                        {draft.subtitle}
                      </p>
                    )}
                  </Link>
                </div>

                {/* Rectangular draft thumbnail (never circular) */}
                {draft.coverImage && (
                  <div className="w-16 h-11 shrink-0 rounded overflow-hidden bg-[#F1EFEA] dark:bg-[#161B24] border border-[#E9E6E0] dark:border-[#272E3B] hidden sm:block">
                    <img
                      src={draft.coverImage}
                      alt={draft.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Link
                    to={`/write?draftId=${draft.id}`}
                    className="px-3 py-1.5 text-xs font-medium text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430] rounded transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => setDraftToDelete(draft.id)}
                    className="p-1.5 text-[#77736E] dark:text-[#9CA3AF] hover:text-[#C44949] rounded hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430] transition-colors"
                    title="Delete draft"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={draftToDelete !== null}
        title="Discard Draft?"
        message="Are you sure you want to discard this draft? This manuscript will be permanently removed."
        confirmLabel="Discard Draft"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDraftToDelete(null)}
      />
    </AppLayout>
  );
};
