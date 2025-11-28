import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
    Bold, Italic, List, ListOrdered, Undo, Redo,
    Heading1, Heading2, Heading3, ImageIcon, Link2, Code
} from 'lucide-react';

const UniversalRichTextEditor = ({ value, onChange, placeholder, label, loading = false }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Write something...',
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline',
                },
            }),
        ],
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Update editor content when value prop changes externally
    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '');
        }
    }, [value, editor]);

    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL:');
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('Enter URL:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (loading) {
        return (
            <div className="w-full">
                {label && (
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                )}
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
        );
    }

    if (!editor) {
        return null;
    }

    const ToolbarButton = ({ onClick, active, children, title }) => (
        <button
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`p-2 rounded transition-colors ${active
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            title={title}
            type="button"
        >
            {children}
        </button>
    );

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex-wrap">
                    {/* Headings */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        active={editor.isActive('heading', { level: 1 })}
                        title="Heading 1"
                    >
                        <Heading1 size={16} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        active={editor.isActive('heading', { level: 2 })}
                        title="Heading 2"
                    >
                        <Heading2 size={16} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        active={editor.isActive('heading', { level: 3 })}
                        title="Heading 3"
                    >
                        <Heading3 size={16} />
                    </ToolbarButton>

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                    {/* Text Formatting */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        active={editor.isActive('bold')}
                        title="Bold"
                    >
                        <Bold size={16} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        active={editor.isActive('italic')}
                        title="Italic"
                    >
                        <Italic size={16} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        active={editor.isActive('code')}
                        title="Inline Code"
                    >
                        <Code size={16} />
                    </ToolbarButton>

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                    {/* Lists */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        active={editor.isActive('bulletList')}
                        title="Bullet List"
                    >
                        <List size={16} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        active={editor.isActive('orderedList')}
                        title="Numbered List"
                    >
                        <ListOrdered size={16} />
                    </ToolbarButton>

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                    {/* Media & Links */}
                    <ToolbarButton
                        onClick={setLink}
                        active={editor.isActive('link')}
                        title="Add Link"
                    >
                        <Link2 size={16} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={addImage}
                        active={false}
                        title="Add Image"
                    >
                        <ImageIcon size={16} />
                    </ToolbarButton>

                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

                    {/* History */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        active={false}
                        title="Undo"
                    >
                        <Undo size={16} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        active={false}
                        title="Redo"
                    >
                        <Redo size={16} />
                    </ToolbarButton>
                </div>

                {/* Editor Content */}
                <EditorContent
                    editor={editor}
                    className="prose prose-sm dark:prose-invert max-w-none p-3 min-h-[120px] focus:outline-none"
                />
            </div>

            <style>{`
                .ProseMirror {
                    min-height: 120px;
                    outline: none;
                }
                .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #9ca3af;
                    pointer-events: none;
                    height: 0;
                }
                .dark .ProseMirror {
                    color: #e5e7eb;
                }
                .dark .ProseMirror p.is-editor-empty:first-child::before {
                    color: #6b7280;
                }
                .ProseMirror h1 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0.75rem 0;
                }
                .ProseMirror h2 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 0.5rem 0;
                }
                .ProseMirror h3 {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin: 0.5rem 0;
                }
                .ProseMirror ul,
                .ProseMirror ol {
                    padding-left: 1.5rem;
                    margin: 0.5rem 0;
                }
                .ProseMirror ul {
                    list-style-type: disc;
                }
                .ProseMirror ol {
                    list-style-type: decimal;
                }
                .ProseMirror p {
                    margin: 0.5rem 0;
                }
                .ProseMirror strong {
                    font-weight: 600;
                }
                .ProseMirror em {
                    font-style: italic;
                }
                .ProseMirror code {
                    background-color: #f3f4f6;
                    padding: 0.125rem 0.25rem;
                    border-radius: 0.25rem;
                    font-family: monospace;
                    font-size: 0.875em;
                }
                .dark .ProseMirror code {
                    background-color: #374151;
                }
                .ProseMirror a {
                    color: #2563eb;
                    text-decoration: underline;
                    cursor: pointer;
                }
                .dark .ProseMirror a {
                    color: #60a5fa;
                }
                .ProseMirror img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 0.5rem 0;
                }
            `}</style>
        </div>
    );
};

export default UniversalRichTextEditor;
