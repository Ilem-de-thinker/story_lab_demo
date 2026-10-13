import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Code,
  Minus,
  Undo,
  Redo,
} from 'lucide-react';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content,
  onChange,
  placeholder = 'Begin your prose here. Let ideas unfold without rushing...',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[380px] p-6 bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md animate-pulse">
        <div className="h-4 bg-[#E9E6E0] dark:bg-[#272E3B] w-1/3 mb-4 rounded" />
        <div className="h-4 bg-[#E9E6E0] dark:bg-[#272E3B] w-2/3 rounded" />
      </div>
    );
  }

  const activeBtnClass = 'bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB] dark:text-[#60A5FA]';
  const inactiveBtnClass = 'text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430]';

  return (
    <div className="relative border border-[#E9E6E0] dark:border-[#272E3B] rounded-md bg-[#FFFFFF] dark:bg-[#151A24] shadow-2xs overflow-hidden">
      {/* Editorial Formatting Toolbar */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-1 p-2 bg-[#FAF9F6] dark:bg-[#111620] border-b border-[#E9E6E0] dark:border-[#272E3B]">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('bold') ? activeBtnClass : inactiveBtnClass
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold size={15} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('italic') ? activeBtnClass : inactiveBtnClass
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic size={15} />
        </button>

        <div className="w-[1px] h-4 bg-[#E9E6E0] dark:bg-[#272E3B] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('heading', { level: 1 }) ? activeBtnClass : inactiveBtnClass
          }`}
          title="Heading 1"
        >
          <Heading1 size={15} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('heading', { level: 2 }) ? activeBtnClass : inactiveBtnClass
          }`}
          title="Heading 2"
        >
          <Heading2 size={15} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('heading', { level: 3 }) ? activeBtnClass : inactiveBtnClass
          }`}
          title="Subheading"
        >
          <Heading3 size={15} />
        </button>

        <div className="w-[1px] h-4 bg-[#E9E6E0] dark:bg-[#272E3B] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('blockquote') ? activeBtnClass : inactiveBtnClass
          }`}
          title="Pull Quote / Blockquote"
        >
          <Quote size={15} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('bulletList') ? activeBtnClass : inactiveBtnClass
          }`}
          title="Bullet List"
        >
          <List size={15} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('orderedList') ? activeBtnClass : inactiveBtnClass
          }`}
          title="Numbered List"
        >
          <ListOrdered size={15} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('codeBlock') ? activeBtnClass : inactiveBtnClass
          }`}
          title="Code Block"
        >
          <Code size={15} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={`p-1.5 rounded ${inactiveBtnClass} transition-colors`}
          title="Horizontal Rule"
        >
          <Minus size={15} />
        </button>

        <div className="w-[1px] h-4 bg-[#E9E6E0] dark:bg-[#272E3B] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-1.5 rounded text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white disabled:opacity-30 hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430] transition-colors`}
          title="Undo"
        >
          <Undo size={14} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-1.5 rounded text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white disabled:opacity-30 hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430] transition-colors`}
          title="Redo"
        >
          <Redo size={14} />
        </button>
      </div>

      {/* Editor Content Surface */}
      <div className="p-6 sm:p-10 font-prose-serif text-[#191919] dark:text-[#F3F4F6] min-h-[420px] focus-within:ring-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
