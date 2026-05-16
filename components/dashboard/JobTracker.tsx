'use client'

import React, { useState, useEffect } from 'react'
import { 
    Briefcase, 
    ExternalLink, 
    Clock, 
    CheckCircle2, 
    XCircle, 
    MoreVertical,
    FileText,
    Target
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface JobApplication {
    id: string
    company_name: string
    role_title: string
    job_url: string
    status: string
    applied_at: string
    document_id: string
}

export function JobTracker() {
    const [applications, setApplications] = useState<JobApplication[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchApps = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data } = await supabase
                .from('job_applications')
                .select('*')
                .eq('user_id', user.id)
                .order('applied_at', { ascending: false })
            
            if (data) setApplications(data)
            setLoading(false)
        }
        fetchApps()
    }, [])

    if (loading) return (
        <div className="grid gap-4">
            {[1, 2].map(i => (
                <div key={i} className="h-24 bg-neutral-50 rounded-3xl animate-pulse border border-neutral-100" />
            ))}
        </div>
    )

    if (applications.length === 0) return (
        <div className="bg-neutral-50 rounded-[2.5rem] border border-dashed border-neutral-200 p-12 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 border border-neutral-100">
                <Briefcase className="w-8 h-8 text-neutral-300" />
            </div>
            <h4 className="text-xl font-black text-neutral-900 mb-2">No applications tracked yet</h4>
            <p className="text-sm text-neutral-500 font-bold max-w-xs mx-auto">
                Use the "Tailored Apply" feature to personalize your resume and track your application status here.
            </p>
        </div>
    )

    return (
        <div className="grid gap-4">
            {applications.map((app) => (
                <div 
                    key={app.id}
                    className="bg-white rounded-3xl border border-neutral-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-neutral-100 transition-all group"
                >
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors">
                            <Briefcase className="w-6 h-6 text-neutral-400 group-hover:text-primary-600" />
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-neutral-900 leading-tight">{app.role_title}</h4>
                            <p className="text-sm text-neutral-500 font-bold">{app.company_name}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-100 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            <Clock className="w-3 h-3" />
                            {new Date(app.applied_at).toLocaleDateString()}
                        </div>

                        <div className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                            app.status === 'applied' ? "bg-blue-50 text-blue-600 border border-blue-100" :
                            app.status === 'interviewing' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                            app.status === 'rejected' ? "bg-rose-50 text-rose-600 border border-rose-100" :
                            "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        )}>
                            {app.status === 'applied' && <Target className="w-3 h-3" />}
                            {app.status === 'interviewing' && <CheckCircle2 className="w-3 h-3" />}
                            {app.status}
                        </div>

                        <div className="flex items-center gap-2">
                            {app.job_url && (
                                <a 
                                    href={app.job_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-neutral-50 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-all border border-neutral-100"
                                    title="View Job Posting"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            {app.document_id && (
                                <button 
                                    onClick={() => window.location.href = `/editor/${app.document_id}`}
                                    className="p-3 rounded-xl bg-neutral-50 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-all border border-neutral-100"
                                    title="View Tailored Resume"
                                >
                                    <FileText className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
