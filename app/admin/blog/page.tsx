'use client'

import React, { useState, useEffect } from 'react'
import { 
    PenTool, 
    Trash2, 
    Plus, 
    ArrowLeft, 
    BookOpen, 
    Sparkles, 
    Loader2, 
    Eye, 
    Edit3,
    Search,
    Calendar,
    User,
    CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface BlogPost {
    slug: string
    title: string
    excerpt: string
    date: string
    category: string
    author: string
    image: string
    content: string
}

export default function BlogAdminPage() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    
    // Editor Form State
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
    
    const [formData, setFormData] = useState({
        slug: '',
        title: '',
        excerpt: '',
        date: new Date().toISOString().substring(0, 10),
        category: 'Resume Writing',
        author: 'James Sterling',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200',
        content: ''
    })

    // Fetch existing posts on load
    async function fetchPosts() {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/blog')
            if (res.ok) {
                const data = await res.json()
                setPosts(data)
            } else {
                toast.error('Failed to load posts.')
            }
        } catch (err) {
            toast.error('Error fetching blog posts.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    // Auto-generate slug from title
    useEffect(() => {
        if (!selectedPost && !isEditing) {
            const slugified = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9\s\-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim()
            setFormData(prev => ({ ...prev, slug: slugified }))
        }
    }, [formData.title, selectedPost, isEditing])

    // Edit button click
    function handleSelectEdit(post: BlogPost) {
        setSelectedPost(post)
        setIsEditing(true)
        setFormData({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            category: post.category,
            author: post.author,
            image: post.image,
            content: post.content
        })
        setActiveTab('write')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Reset Form
    function handleResetForm() {
        setSelectedPost(null)
        setIsEditing(false)
        setFormData({
            slug: '',
            title: '',
            excerpt: '',
            date: new Date().toISOString().substring(0, 10),
            category: 'Resume Writing',
            author: 'James Sterling',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200',
            content: ''
        })
        setActiveTab('write')
    }

    // Save/Submit Form
    async function handleSavePost(e: React.FormEvent) {
        e.preventDefault()
        if (!formData.title || !formData.slug || !formData.content) {
            toast.error('Title, slug, and content are required.')
            return
        }

        setSaving(true)
        try {
            const res = await fetch('/api/admin/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            if (res.ok) {
                toast.success(isEditing ? 'Guide updated successfully!' : 'Fresh guide created!')
                handleResetForm()
                fetchPosts()
            } else {
                toast.error(data.error || 'Failed to save guide.')
            }
        } catch (err) {
            toast.error('Error saving post to server.')
        } finally {
            setSaving(false)
        }
    }

    // Delete post
    async function handleDeletePost(slug: string) {
        if (!confirm('Are you absolutely sure you want to delete this career guide? This action is permanent.')) {
            return
        }

        try {
            const res = await fetch(`/api/admin/blog?slug=${slug}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                toast.success('Guide deleted successfully.')
                if (selectedPost?.slug === slug) {
                    handleResetForm()
                }
                fetchPosts()
            } else {
                const data = await res.json()
                toast.error(data.error || 'Failed to delete guide.')
            }
        } catch (err) {
            toast.error('Error contacting server to delete post.')
        }
    }

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-neutral-50/50 pb-24 pt-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                {/* ── Header ── */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-neutral-200/60 pb-8">
                    <div>
                        <Link 
                            href="/blog"
                            className="inline-flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest hover:text-primary-600 mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog Index
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter italic">
                            Blog <span className="text-primary-600">Console.</span>
                        </h1>
                        <p className="text-sm text-neutral-500 font-bold mt-2">
                            Write, edit, and publish dynamic MDX career advice articles to the platform in real-time.
                        </p>
                    </div>

                    {(isEditing || formData.title) && (
                        <Button 
                            onClick={handleResetForm}
                            variant="outline"
                            className="h-12 px-6 rounded-xl text-xs font-black uppercase tracking-widest border-neutral-200 text-neutral-500 hover:bg-neutral-100"
                        >
                            Create Fresh Guide
                        </Button>
                    )}
                </div>

                {/* ── Editor & List Layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* ──── LEFT PANEL: The Content Editor Form (7 cols) ──── */}
                    <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/80 p-8 shadow-xl shadow-neutral-100">
                        <div className="flex items-center justify-between mb-8 border-b border-neutral-100 pb-4">
                            <h2 className="text-lg font-black text-neutral-950 flex items-center gap-2">
                                <PenTool className="w-5 h-5 text-primary-600" />
                                {isEditing ? 'Modify Career Guide' : 'Write Fresh Career Guide'}
                            </h2>

                            <div className="flex bg-neutral-100 p-1 rounded-xl">
                                <button 
                                    onClick={() => setActiveTab('write')}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                        activeTab === 'write' ? "bg-white text-neutral-950 shadow-sm" : "text-neutral-400 hover:text-neutral-900"
                                    )}
                                >
                                    Write
                                </button>
                                <button 
                                    onClick={() => setActiveTab('preview')}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                        activeTab === 'preview' ? "bg-white text-neutral-950 shadow-sm" : "text-neutral-400 hover:text-neutral-900"
                                    )}
                                >
                                    Live Preview
                                </button>
                            </div>
                        </div>

                        {activeTab === 'write' ? (
                            <form onSubmit={handleSavePost} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Title */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Guide Title</label>
                                        <input 
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            placeholder="e.g. Mastering the STAR Method for Executive Interviews"
                                            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                                            required
                                        />
                                    </div>

                                    {/* Slug (Only editable when modifying) */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                                            Slug URL {isEditing && '(Locked)'}
                                        </label>
                                        <input 
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                            placeholder="e.g. master-star-method"
                                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 text-sm font-bold text-neutral-500 outline-none transition cursor-not-allowed"
                                            disabled={isEditing}
                                            required
                                        />
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Category</label>
                                        <select 
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition appearance-none"
                                        >
                                            <option value="Resume Writing">Resume Writing</option>
                                            <option value="Career Advice">Career Advice</option>
                                            <option value="Interview Prep">Interview Prep</option>
                                            <option value="ATS Compliance">ATS Compliance</option>
                                            <option value="Salary Negotiation">Salary Negotiation</option>
                                        </select>
                                    </div>

                                    {/* Excerpt */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Short Excerpt (SEO Summary)</label>
                                        <textarea 
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                            placeholder="Enter a punchy, 2-sentence description to engage readers in search results..."
                                            className="w-full h-24 bg-neutral-50/50 border border-neutral-200 rounded-xl p-5 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition resize-none"
                                        />
                                    </div>

                                    {/* Author */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Author</label>
                                        <input 
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) => setFormData({...formData, author: e.target.value})}
                                            placeholder="e.g. James Sterling"
                                            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                                        />
                                    </div>

                                    {/* Date */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Publish Date</label>
                                        <input 
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                                            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                                        />
                                    </div>

                                    {/* Image URL */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Banner Image URL</label>
                                        <input 
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                                            className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                                        />
                                    </div>

                                    {/* Content MDX Editor */}
                                    <div className="space-y-2 md:col-span-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Content Body (MDX / Markdown)</label>
                                            <span className="text-[9px] font-bold text-neutral-300">Supports headings (##), bold (**), and list structures.</span>
                                        </div>
                                        <textarea 
                                            value={formData.content}
                                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                                            placeholder="Write your guide content using standard markdown..."
                                            className="w-full h-[400px] bg-neutral-50/50 border border-neutral-200 rounded-xl p-6 text-sm font-mono focus:ring-2 focus:ring-primary-500 outline-none transition resize-y"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Save Actions */}
                                <div className="flex gap-4 border-t border-neutral-100 pt-6">
                                    <Button 
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 h-14 bg-primary-600 hover:bg-primary-500 text-white font-black text-xs uppercase tracking-widest gap-2 rounded-xl shadow-lg shadow-primary-600/20"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Saving Guide...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                {isEditing ? 'Apply Updates' : 'Publish to Blog'}
                                            </>
                                        )}
                                    </Button>

                                    {isEditing && (
                                        <Button 
                                            onClick={handleResetForm}
                                            variant="outline"
                                            className="h-14 px-8 rounded-xl text-xs font-black uppercase tracking-widest border-neutral-200 text-neutral-400 hover:bg-neutral-50"
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </form>
                        ) : (
                            /* Live Preview rendering container */
                            <div className="space-y-8 animate-in fade-in duration-300">
                                <div className="border-b border-neutral-100 pb-6">
                                    <div className="inline-block bg-primary-50 text-primary-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg mb-4">
                                        {formData.category}
                                    </div>
                                    <h1 className="text-3xl font-black text-neutral-900 tracking-tight leading-tight mb-4">
                                        {formData.title || 'Untitled Career Guide'}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formData.date}</span>
                                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> By {formData.author}</span>
                                    </div>
                                </div>

                                <div className="prose prose-neutral max-w-none text-neutral-600 text-sm leading-relaxed space-y-4">
                                    <p className="text-base font-bold text-neutral-950 italic border-l-4 border-primary-500 pl-4 py-1 bg-neutral-50 rounded-r-xl">
                                        {formData.excerpt || 'Excerpt summary will show up here...'}
                                    </p>
                                    
                                    <div className="whitespace-pre-line font-medium">
                                        {formData.content || 'Start typing in the "Write" tab to see your dynamic preview render here.'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ──── RIGHT PANEL: The Active Guides Index (5 cols) ──── */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Search bar */}
                        <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-sm">
                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-2">Search Guides</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                <input 
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Filter by title or tag..."
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-xl pl-11 pr-5 py-3 text-xs font-bold focus:ring-2 focus:ring-primary-500 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Active list */}
                        <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 shadow-xl shadow-neutral-100 space-y-6">
                            <h3 className="text-sm font-black text-neutral-950 uppercase tracking-widest flex items-center justify-between border-b border-neutral-100 pb-4">
                                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary-600" /> Active Guides</span>
                                <span className="text-[10px] font-bold text-neutral-300">{filteredPosts.length} published</span>
                            </h3>

                            {loading ? (
                                <div className="py-20 flex flex-col items-center justify-center gap-3">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                                    <span className="text-xs font-black text-neutral-300 uppercase tracking-widest">Loading Repository...</span>
                                </div>
                            ) : filteredPosts.length === 0 ? (
                                <div className="text-center py-20 text-xs font-bold text-neutral-400 italic">
                                    No published guides match your search.
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                                    {filteredPosts.map((post) => (
                                        <div 
                                            key={post.slug}
                                            className={cn(
                                                "group p-5 rounded-2xl border transition-all flex flex-col gap-4",
                                                selectedPost?.slug === post.slug 
                                                    ? "bg-primary-50/20 border-primary-500 shadow-md" 
                                                    : "bg-white border-neutral-100 hover:border-neutral-200 hover:shadow-sm"
                                            )}
                                        >
                                            <div>
                                                <div className="flex items-center justify-between gap-4 mb-2">
                                                    <span className="bg-neutral-100 text-neutral-500 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md">
                                                        {post.category}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-neutral-300">
                                                        {post.date}
                                                    </span>
                                                </div>
                                                <h4 className="text-sm font-black text-neutral-950 tracking-tight leading-snug group-hover:text-primary-600 transition-colors">
                                                    {post.title}
                                                </h4>
                                                <p className="text-[11px] text-neutral-400 font-bold leading-normal mt-2 line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                            </div>

                                            <div className="flex gap-2 justify-end border-t border-neutral-50 pt-3">
                                                <Button 
                                                    onClick={() => handleSelectEdit(post)}
                                                    variant="outline"
                                                    className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest gap-1 border-neutral-100 text-neutral-500 hover:bg-neutral-50"
                                                >
                                                    <Edit3 className="w-3 h-3" /> Edit
                                                </Button>
                                                <Button 
                                                    onClick={() => handleDeletePost(post.slug)}
                                                    variant="outline"
                                                    className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest gap-1 border-neutral-100 text-red-500 hover:bg-red-50 hover:border-red-100"
                                                >
                                                    <Trash2 className="w-3 h-3" /> Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
