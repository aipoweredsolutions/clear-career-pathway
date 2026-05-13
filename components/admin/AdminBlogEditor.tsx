'use client'

import React, { useState, useEffect } from 'react'
import { 
    Save, 
    Eye, 
    Edit3, 
    ArrowLeft, 
    Type, 
    Image as ImageIcon, 
    Calendar, 
    User, 
    Tag,
    ChevronRight,
    Loader2
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { MDXRemote } from 'next-mdx-remote'
import { cn } from '@/lib/utils'

interface BlogEditorProps {
    initialData?: {
        slug: string
        title: string
        excerpt: string
        date: string
        category: string
        author: string
        image: string
        content: string
    }
}

export function AdminBlogEditor({ initialData }: BlogEditorProps) {
    const [formData, setFormData] = useState({
        slug: initialData?.slug || '',
        title: initialData?.title || '',
        excerpt: initialData?.excerpt || '',
        date: initialData?.date || new Date().toISOString().split('T')[0],
        category: initialData?.category || 'Career Growth',
        author: initialData?.author || 'Clarity Team',
        image: initialData?.image || '',
        content: initialData?.content || ''
    })
    
    const [previewMode, setPreviewMode] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()

    const handleSave = async () => {
        if (!formData.slug || !formData.title) {
            toast.error('Slug and Title are required')
            return
        }

        setIsSaving(true)
        try {
            const res = await fetch('/api/admin/blog/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            if (data.success) {
                toast.success('Article saved to repository')
                router.push('/admin/blog')
                router.refresh()
            } else {
                toast.error(data.error || 'Failed to save article')
            }
        } catch (error) {
            toast.error('An error occurred while saving')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-120px)] animate-in fade-in duration-500">
            {/* Action Bar */}
            <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog" className="p-2 hover:bg-neutral-100 rounded-xl transition-colors">
                        <ArrowLeft className="w-5 h-5 text-neutral-500" />
                    </Link>
                    <div className="h-6 w-px bg-neutral-200" />
                    <div>
                        <h2 className="text-sm font-black text-neutral-900 uppercase tracking-widest flex items-center gap-2">
                            {initialData ? 'Edit Article' : 'New Composition'}
                            <ChevronRight className="w-4 h-4 text-neutral-300" />
                            <span className="text-primary-600 lowercase font-bold tracking-tight">
                                {formData.slug || 'untitled-draft'}
                            </span>
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex bg-neutral-100 p-1 rounded-xl mr-2">
                        <button 
                            onClick={() => setPreviewMode(false)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                                !previewMode ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            <Edit3 className="w-3.5 h-3.5" />
                            Draft
                        </button>
                        <button 
                            onClick={() => setPreviewMode(true)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                                previewMode ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            <Eye className="w-3.5 h-3.5" />
                            Review
                        </button>
                    </div>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn-premium btn-premium-primary !py-2.5 !px-6 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Saving...' : 'Deploy Content'}
                    </button>
                </div>
            </div>

            {/* Editor Workspace */}
            <div className="flex-1 overflow-hidden">
                {!previewMode ? (
                    <div className="grid grid-cols-3 h-full gap-8">
                        {/* Left: Metadata */}
                        <div className="space-y-6 overflow-y-auto pr-2 pb-10">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-200 shadow-sm space-y-6">
                                <h3 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Frontmatter Intelligence</h3>
                                
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Universal Slug</label>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <input 
                                            type="text" 
                                            value={formData.slug}
                                            onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                            placeholder="article-slug-format"
                                            className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary-500/20 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Article Title</label>
                                    <div className="relative">
                                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <input 
                                            type="text" 
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            placeholder="High-Impact Headlines..."
                                            className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary-500/20 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Excerpt / Meta Description</label>
                                    <textarea 
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                        placeholder="Briefly describe the article for SEO and cards..."
                                        className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary-500/20 outline-none min-h-[100px] resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Publish Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                            <input 
                                                type="date" 
                                                value={formData.date}
                                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                                className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary-500/20 outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Category</label>
                                        <select 
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary-500/20 outline-none appearance-none"
                                        >
                                            <option>Career Growth</option>
                                            <option>ATS Optimization</option>
                                            <option>Resume Writing</option>
                                            <option>Job Search</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Author Identity</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <input 
                                            type="text" 
                                            value={formData.author}
                                            onChange={(e) => setFormData({...formData, author: e.target.value})}
                                            className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary-500/20 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Cover Image URL</label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <input 
                                            type="text" 
                                            value={formData.image}
                                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                                            placeholder="https://images.unsplash.com/..."
                                            className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary-500/20 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Content Editor */}
                        <div className="col-span-2 flex flex-col h-full">
                            <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-sm flex flex-col h-full overflow-hidden">
                                <div className="px-8 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">MDX Narrative Engine</span>
                                    <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest">{formData.content.split(' ').length} words</span>
                                </div>
                                <textarea 
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    placeholder="Start writing your masterpiece in MDX..."
                                    className="flex-1 p-10 text-[16px] font-medium leading-relaxed text-neutral-800 outline-none resize-none bg-white font-mono"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-xl overflow-y-auto h-full p-10 md:p-20">
                        {/* Simulation of the actual blog post view */}
                        <article className="max-w-3xl mx-auto prose prose-neutral">
                            <div className="mb-12">
                                <span className="bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-primary-100 mb-6 inline-block">
                                    {formData.category}
                                </span>
                                <h1 className="text-5xl font-black text-neutral-900 tracking-tighter italic leading-tight mb-6">
                                    {formData.title}
                                </h1>
                                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                                    <span>By {formData.author}</span>
                                    <span>•</span>
                                    <span>{new Date(formData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </div>
                            
                            {formData.image && (
                                <img src={formData.image} alt="" className="w-full h-96 object-cover rounded-[2rem] mb-16 shadow-2xl" />
                            )}

                            <div className="text-lg leading-relaxed text-neutral-600 space-y-6">
                                {/* This is a simplified preview. MDXRemote is used for real rendering */}
                                {formData.content.split('\n').map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        </article>
                    </div>
                )}
            </div>
        </div>
    )
}
