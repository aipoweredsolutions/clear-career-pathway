import React from 'react'
import { 
    Plus, 
    FileText, 
    Eye, 
    Edit3, 
    Trash2, 
    Clock, 
    Globe,
    Search,
    Filter,
    ArrowUpRight
} from 'lucide-react'
import { getAllPosts } from '@/lib/utils/mdx'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function AdminBlogPage() {
    const posts = getAllPosts()

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-neutral-900 tracking-tighter italic">Content <span className="text-primary-600">Engine.</span></h1>
                    <p className="text-neutral-500 font-medium mt-2">Draft, optimize, and publish high-impact career insights and guides.</p>
                </div>
                <Link href="/admin/blog/new" className="btn-premium btn-premium-primary inline-flex items-center gap-2 group">
                    <Plus className="w-4 h-4" />
                    Compose Article
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Published Articles', value: posts.length.toString(), icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Total Read Time', value: '42 mins', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Avg. Engagement', value: '8.4%', icon: ArrowUpRight, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-neutral-200 flex items-center gap-5">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-xl font-black text-neutral-900 tracking-tight">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Articles List */}
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                    <h3 className="text-sm font-black text-neutral-900 uppercase tracking-widest">Active Repository</h3>
                    <div className="flex items-center gap-2">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                            <input 
                                type="text" 
                                placeholder="Search repository..."
                                className="pl-9 pr-4 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500/20 outline-none w-64 transition-all"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="divide-y divide-neutral-100">
                    {posts.map((post) => (
                        <div key={post.slug} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-neutral-50/50 transition-all group">
                            <div className="flex items-start gap-6 max-w-2xl">
                                <div className="w-16 h-16 rounded-2xl bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200">
                                    <img 
                                        src={post.image || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=120'} 
                                        alt="" 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest px-2 py-0.5 bg-primary-50 rounded-md border border-primary-100">
                                            {post.category}
                                        </span>
                                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-black text-neutral-900 tracking-tight mb-2 group-hover:text-primary-600 transition-colors">
                                        {post.title}
                                    </h4>
                                    <p className="text-sm text-neutral-500 font-medium line-clamp-1 italic">
                                        &quot;{post.excerpt}&quot;
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link 
                                    href={`/blog/${post.slug}`} 
                                    target="_blank"
                                    className="p-2.5 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                                    title="View Live"
                                >
                                    <Eye className="w-5 h-5" />
                                </Link>
                                <Link 
                                    href={`/admin/blog/edit/${post.slug}`}
                                    className="p-2.5 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                    title="Edit Draft"
                                >
                                    <Edit3 className="w-5 h-5" />
                                </Link>
                                <button 
                                    className="p-2.5 text-neutral-400 hover:text-danger-600 hover:bg-danger-50 rounded-xl transition-all"
                                    title="Archive"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="p-20 text-center">
                        <FileText className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
                        <p className="text-neutral-400 font-bold italic tracking-tight uppercase">No content detected in repository.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
