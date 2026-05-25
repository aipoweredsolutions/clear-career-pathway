'use client'

import React, { useState, useEffect } from 'react'
import { 
    Zap, 
    Target, 
    Plus, 
    BarChart2, 
    ArrowRight,
    Search,
    Filter,
    LayoutGrid,
    CheckCircle2,
    Clock,
    MessageSquare,
    AlertCircle,
    Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { JobTrackerBoard } from '@/components/tracker/JobTrackerBoard'
import { AddApplicationModal } from '@/components/tracker/AddApplicationModal'
import { fetchApplications, JobApplication } from '@/lib/supabase/tracker'
import { useAuth } from '@/components/auth/AuthProvider'
import { toast } from 'sonner'

export default function JobTrackerPage() {
    const { user } = useAuth()
    const [applications, setApplications] = useState<JobApplication[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (user) {
            loadApplications()
        }
    }, [user])

    async function loadApplications() {
        setIsLoading(true)
        try {
            const data = await fetchApplications()
            setApplications(data)
        } catch (error: any) {
            toast.error('Failed to load applications.')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredApplications = applications.filter(app => 
        app.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.role_title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Stats
    const totalApplied = applications.filter(a => a.status !== 'saved').length
    const totalInterviewing = applications.filter(a => a.status === 'interviewing').length
    const responseRate = totalApplied > 0 
        ? Math.round((applications.filter(a => ['interviewing', 'offer'].includes(a.status)).length / totalApplied) * 100)
        : 0

    if (!user) return null

    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-20">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 border-b border-neutral-100 pb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-[0.25em] w-fit">
                            <Target className="w-3.5 h-3.5 fill-primary-600/20" />
                            Application Pipeline
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-neutral-950 tracking-tighter italic leading-none">
                            Job <span className="text-primary-600">Tracker.</span>
                        </h1>
                        <p className="max-w-xl text-lg text-neutral-500 font-bold leading-relaxed">
                            Manage your high-stakes opportunities from initial save to final offer. Track documents, notes, and milestones.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search applications..."
                                className="h-14 pl-12 pr-6 bg-white border border-neutral-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary-500 outline-none transition w-full md:w-64"
                            />
                        </div>
                        <Button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="h-14 px-8 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 font-black text-xs uppercase tracking-widest gap-2 shadow-2xl shadow-primary-600/20"
                        >
                            <Plus className="w-5 h-5" />
                            Add Application
                        </Button>
                    </div>
                </div>

                {/* Summary Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-xl shadow-neutral-200/50 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Total Applied</p>
                            <p className="text-4xl font-black text-neutral-950 tracking-tighter">{totalApplied}</p>
                        </div>
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                            <CheckCircle2 className="w-7 h-7" />
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-xl shadow-neutral-200/50 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Interviewing</p>
                            <p className="text-4xl font-black text-neutral-950 tracking-tighter">{totalInterviewing}</p>
                        </div>
                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                            <MessageSquare className="w-7 h-7" />
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-xl shadow-neutral-200/50 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Response Rate</p>
                            <p className="text-4xl font-black text-neutral-950 tracking-tighter">{responseRate}%</p>
                        </div>
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                            <BarChart2 className="w-7 h-7" />
                        </div>
                    </div>
                </div>

                {/* Kanban Board */}
                {isLoading ? (
                    <div className="h-96 flex flex-col items-center justify-center gap-4 text-neutral-400">
                        <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
                        <p className="font-bold uppercase tracking-widest text-xs">Loading Pipeline...</p>
                    </div>
                ) : (
                    <JobTrackerBoard 
                        applications={filteredApplications} 
                        onUpdate={loadApplications}
                    />
                )}
            </div>

            <AddApplicationModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={loadApplications}
            />
        </div>
    )
}
