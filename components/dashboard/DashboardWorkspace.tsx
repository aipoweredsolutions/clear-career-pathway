'use client'

import React, { useState, useMemo } from 'react'
import { ResumeDocument } from '@/lib/types/resume'
import { ResumeGrid } from './ResumeGrid'
import { 
    Search, 
    Filter, 
    FileText, 
    Edit, 
    LayoutGrid, 
    List, 
    ArrowUpDown,
    X,
    FolderOpen,
    ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DashboardWorkspaceProps {
    resumes: ResumeDocument[]
}

export function DashboardWorkspace({ resumes }: DashboardWorkspaceProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState<'all' | 'resume' | 'cover_letter'>('all')
    const [sortBy, setSortBy] = useState<'updatedAt' | 'title' | 'template'>('updatedAt')

    const filteredResumes = useMemo(() => {
        let result = resumes.filter(resume => {
            const matchesSearch = 
                (resume.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (resume.personalInfo?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (resume.coverLetter?.jobTitle || '').toLowerCase().includes(searchQuery.toLowerCase())
            
            const matchesFilter = activeFilter === 'all' || resume.documentType === activeFilter
            
            return matchesSearch && matchesFilter
        })

        // Sorting
        result.sort((a, b) => {
            if (sortBy === 'updatedAt') {
                const dateA = new Date(a.updatedAt || 0).getTime()
                const dateB = new Date(b.updatedAt || 0).getTime()
                return dateB - dateA // Newest first
            }
            if (sortBy === 'title') {
                return (a.title || '').localeCompare(b.title || '')
            }
            if (sortBy === 'template') {
                return (a.templateId || '').localeCompare(b.templateId || '')
            }
            return 0
        })

        return result
    }, [resumes, searchQuery, activeFilter, sortBy])

    return (
        <div className="space-y-8">
            {/* Filter Hub */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-2">
                {/* Search */}
                <div className="relative w-full lg:max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search by title, name, or role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-neutral-200 rounded-2xl pl-11 pr-11 py-3 text-sm font-bold text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all shadow-sm"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-100 hover:bg-neutral-200 p-1 rounded-full transition-colors"
                        >
                            <X className="w-3 h-3 text-neutral-500" />
                        </button>
                    )}
                </div>

                {/* Filters & Sorting */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    {/* Tabs */}
                    <div className="flex bg-white p-1 rounded-xl border border-neutral-200 shadow-sm">
                        <button 
                            onClick={() => setActiveFilter('all')}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                                activeFilter === 'all' ? "bg-neutral-900 text-white shadow-lg" : "text-neutral-500 hover:text-neutral-900"
                            )}
                        >
                            All
                        </button>
                        <button 
                            onClick={() => setActiveFilter('resume')}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                                activeFilter === 'resume' ? "bg-neutral-900 text-white shadow-lg" : "text-neutral-500 hover:text-neutral-900"
                            )}
                        >
                            Resumes
                        </button>
                        <button 
                            onClick={() => setActiveFilter('cover_letter')}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                                activeFilter === 'cover_letter' ? "bg-neutral-900 text-white shadow-lg" : "text-neutral-500 hover:text-neutral-900"
                            )}
                        >
                            Covers
                        </button>
                    </div>

                    {/* Sort Dropdown (Simple) */}
                    <div className="relative group">
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="appearance-none bg-white border border-neutral-200 rounded-xl pl-4 pr-10 py-2.5 text-xs font-black uppercase tracking-widest text-neutral-600 outline-none hover:border-primary-500 transition-all cursor-pointer shadow-sm"
                        >
                            <option value="updatedAt">Latest First</option>
                            <option value="title">By Title</option>
                            <option value="template">By Template</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 px-1">
                <div className="flex items-center gap-2">
                    <FolderOpen className="w-3.5 h-3.5" />
                    Showing {filteredResumes.length} {filteredResumes.length === 1 ? 'Document' : 'Documents'}
                </div>
            </div>

            {/* Main Grid */}
            <ResumeGrid resumes={filteredResumes} />

            {/* Empty State for results */}
            {filteredResumes.length === 0 && resumes.length > 0 && (
                <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-neutral-200">
                    <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-8 h-8 text-neutral-200" />
                    </div>
                    <h3 className="text-xl font-black text-neutral-900 mb-2">No documents found matching &quot;{searchQuery}&quot;</h3>
                    <p className="text-neutral-500 font-bold max-w-sm mx-auto">
                        Try adjusting your search or switching to a different filter.
                    </p>
                    <button 
                        onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                        className="mt-6 text-primary-600 font-black text-xs uppercase tracking-widest hover:underline"
                    >
                        Clear Active Filters
                    </button>
                </div>
            )}
        </div>
    )
}
