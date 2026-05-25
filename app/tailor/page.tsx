'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
    Target, 
    Link as LinkIcon, 
    FileText, 
    ArrowRight, 
    Sparkles, 
    Loader2, 
    CheckCircle2, 
    AlertCircle,
    ChevronLeft,
    Plus,
    Briefcase,
    Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { Suspense } from 'react'

// --- Components ---

function StepIndicator({ currentStep }: { currentStep: number }) {
    const steps = ['Select Base', 'Job Details', 'AI Tailoring', 'Review']
    return (
        <div className="flex items-center justify-center gap-4 mb-12">
            {steps.map((step, i) => (
                <React.Fragment key={step}>
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all",
                            currentStep > i ? "bg-primary-600 border-primary-600 text-white" :
                            currentStep === i ? "border-primary-600 text-primary-600 shadow-lg shadow-primary-100" :
                            "border-neutral-200 text-neutral-400"
                        )}>
                            {currentStep > i ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                        </div>
                        <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            currentStep === i ? "text-neutral-900" : "text-neutral-400"
                        )}>
                            {step}
                        </span>
                    </div>
                    {i < steps.length - 1 && (
                        <div className={cn(
                            "w-8 h-0.5 rounded-full",
                            currentStep > i ? "bg-primary-600" : "bg-neutral-100"
                        )} />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

function TailorContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()
    
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [resumes, setResumes] = useState<any[]>([])
    const [selectedResumeId, setSelectedResumeId] = useState<string | null>(searchParams.get('id'))
    const [jobUrl, setJobUrl] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [tailoredData, setTailoredData] = useState<any>(null)
    const [saving, setSaving] = useState(false)

    // --- State for Job Info ---
    const [companyName, setCompanyName] = useState('')
    const [roleTitle, setRoleTitle] = useState('')

    useEffect(() => {
        const fetchResumes = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            
            const { data } = await supabase
                .from('documents')
                .select('id, title, updated_at')
                .eq('user_id', user.id)
                .eq('document_type', 'resume')
                .order('updated_at', { ascending: false })
            
            if (data) setResumes(data)
        }
        fetchResumes()
    }, [supabase])

    const handleStartTailoring = async () => {
        if (!selectedResumeId || (!jobUrl && !jobDescription)) {
            toast.error("Please provide both a base resume and job details.")
            return
        }

        setStep(2)
        setLoading(true)

        try {
            const response = await fetch('/api/tailor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    documentId: selectedResumeId,
                    jobUrl,
                    jobDescriptionText: jobDescription
                })
            })

            if (!response.ok) throw new Error('AI failed to tailor your resume.')

            const data = await response.json()
            setTailoredData(data)
            
            // Try to extract company name from URL if possible
            if (jobUrl) {
                try {
                    const url = new URL(jobUrl)
                    const parts = url.hostname.split('.')
                    const name = parts[parts.length - 2]
                    if (name && name !== 'com') {
                        setCompanyName(name.charAt(0).toUpperCase() + name.slice(1))
                    }
                } catch (e) {}
            }
            
            setStep(3)
        } catch (error: any) {
            toast.error(error.message)
            setStep(1)
        } finally {
            setLoading(false)
        }
    }

    const handleSaveAndTrack = async (track: boolean) => {
        setSaving(true)
        try {
            // 1. Create new document
            const { data: baseDoc } = await supabase
                .from('documents')
                .select('*')
                .eq('id', selectedResumeId)
                .single()

            const { data: newDoc, error: createError } = await supabase
                .from('documents')
                .insert({
                    user_id: (await supabase.auth.getUser()).data.user?.id,
                    title: `${companyName || 'Tailored'} — ${roleTitle || 'New Role'}`,
                    content: tailoredData.tailored,
                    document_type: 'resume',
                    template_id: baseDoc?.template_id || 'classic',
                    formatting: baseDoc?.formatting
                })
                .select()
                .single()

            if (createError) throw createError

            // 2. Track application if requested
            if (track) {
                await supabase.from('job_applications').insert({
                    user_id: (await supabase.auth.getUser()).data.user?.id,
                    document_id: newDoc.id,
                    company_name: companyName || 'Unknown Company',
                    role_title: roleTitle || 'Unknown Role',
                    job_url: jobUrl,
                    status: 'applied'
                })
                toast.success("Application tracked!")
            }

            toast.success("Resume tailored and saved!")
            router.push(`/editor/${newDoc.id}`)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl shadow-primary-200">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Tailored Apply</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-neutral-950 tracking-tighter italic leading-none mb-6">
                        Personalize <br/><span className="text-primary-600">to Win.</span>
                    </h1>
                    <p className="text-lg text-neutral-500 font-bold max-w-xl mx-auto">
                        Don&apos;t send a generic resume. Use AI to align your experience with exactly what the recruiter is looking for.
                    </p>
                </div>

                <StepIndicator currentStep={step} />

                {/* --- Step 0: Select Base Resume --- */}
                {step === 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {resumes.map(resume => (
                                <button
                                    key={resume.id}
                                    onClick={() => setSelectedResumeId(resume.id)}
                                    className={cn(
                                        "p-6 rounded-3xl border-2 text-left transition-all duration-300",
                                        selectedResumeId === resume.id 
                                            ? "border-primary-600 bg-primary-50/50 shadow-xl shadow-primary-100" 
                                            : "border-neutral-100 hover:border-neutral-200 bg-white"
                                    )}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center mb-4">
                                        <FileText className={cn("w-6 h-6", selectedResumeId === resume.id ? "text-primary-600" : "text-neutral-400")} />
                                    </div>
                                    <h3 className="text-lg font-black text-neutral-900 mb-1">{resume.title}</h3>
                                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">
                                        Last edited {new Date(resume.updated_at).toLocaleDateString()}
                                    </p>
                                </button>
                            ))}
                            
                            <button className="p-6 rounded-3xl border-2 border-dashed border-neutral-200 hover:border-primary-300 hover:bg-primary-50/20 transition-all flex flex-col items-center justify-center gap-3 text-neutral-400 hover:text-primary-600 group">
                                <Plus className="w-8 h-8 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-black uppercase tracking-widest">New Base Resume</span>
                            </button>
                        </div>
                        
                        <div className="mt-12 flex justify-center">
                            <button 
                                onClick={() => setStep(1)}
                                disabled={!selectedResumeId}
                                className="inline-flex items-center gap-3 bg-neutral-900 text-white font-black px-12 py-5 rounded-[2rem] hover:bg-neutral-800 transition shadow-2xl disabled:opacity-30"
                            >
                                Continue <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* --- Step 1: Job Details --- */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
                        <div className="bg-white rounded-[3rem] border border-neutral-100 p-10 shadow-2xl shadow-neutral-200/50 space-y-8">
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-sm font-black text-neutral-900 uppercase tracking-widest">
                                    <LinkIcon className="w-4 h-4 text-primary-600" /> Job URL
                                </label>
                                <input 
                                    type="text"
                                    placeholder="https://linkedin.com/jobs/view/..."
                                    value={jobUrl}
                                    onChange={e => setJobUrl(e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-neutral-100" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase font-black text-neutral-300">
                                    <span className="bg-white px-4 tracking-widest">OR PASTE DESCRIPTION</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <textarea 
                                    placeholder="Paste the full job description here..."
                                    rows={8}
                                    value={jobDescription}
                                    onChange={e => setJobDescription(e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition resize-none text-sm leading-relaxed"
                                />
                            </div>

                            <button 
                                onClick={handleStartTailoring}
                                className="w-full flex items-center justify-center gap-3 bg-primary-600 text-white font-black px-12 py-5 rounded-2xl hover:bg-primary-700 transition shadow-2xl shadow-primary-200"
                            >
                                <Sparkles className="w-5 h-5 fill-white/20" />
                                Tailor Now
                            </button>
                        </div>
                        
                        <button 
                            onClick={() => setStep(0)}
                            className="mt-8 flex items-center gap-2 text-neutral-400 font-black text-xs uppercase tracking-widest hover:text-neutral-600 transition"
                        >
                            <ChevronLeft className="w-4 h-4" /> Change Base Resume
                        </button>
                    </div>
                )}

                {/* --- Step 2: AI Loading --- */}
                {step === 2 && (
                    <div className="text-center py-20 animate-in zoom-in-95 duration-500">
                        <div className="relative inline-block mb-8">
                            <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-2xl animate-pulse" />
                            <div className="relative w-32 h-32 bg-white rounded-[2.5rem] border border-primary-100 shadow-2xl flex items-center justify-center">
                                <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight">AI is Tailoring Your Resume</h2>
                        <p className="text-neutral-500 font-bold animate-pulse">
                            {jobUrl ? "Scraping job details and optimizing keywords..." : "Analyzing requirements and aligning your achievements..."}
                        </p>
                    </div>
                )}

                {/* --- Step 3: Review Diff --- */}
                {step === 3 && tailoredData && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 shadow-xl shadow-neutral-100">
                                <div className="space-y-4 mb-8">
                                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Application Details</label>
                                    <div className="space-y-4">
                                        <input 
                                            type="text"
                                            placeholder="Company Name"
                                            value={companyName}
                                            onChange={e => setCompanyName(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 focus:bg-white transition font-bold"
                                        />
                                        <input 
                                            type="text"
                                            placeholder="Target Role Title"
                                            value={roleTitle}
                                            onChange={e => setRoleTitle(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 focus:bg-white transition font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-emerald-900 uppercase tracking-widest">Optimized Summary</p>
                                            <p className="text-[10px] text-emerald-700 font-bold">Rewritten to match job keywords</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                                            <Target className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-amber-900 uppercase tracking-widest">Strategic Achievements</p>
                                            <p className="text-[10px] text-amber-700 font-bold">Prioritized results relevant to this role</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button 
                                    onClick={() => handleSaveAndTrack(true)}
                                    disabled={saving}
                                    className="w-full group bg-primary-600 text-white font-black px-10 py-6 rounded-[2rem] hover:bg-primary-700 transition shadow-2xl shadow-primary-200 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-lg leading-none mb-1">Tailor & Track</div>
                                            <div className="text-[10px] text-white/60 uppercase tracking-widest">Recommended</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </button>

                                <button 
                                    onClick={() => handleSaveAndTrack(false)}
                                    disabled={saving}
                                    className="w-full flex items-center gap-4 border border-neutral-200 text-neutral-900 font-black px-10 py-6 rounded-[2rem] hover:bg-neutral-50 transition"
                                >
                                    <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <span>Save as New Version Only</span>
                                </button>
                            </div>
                        </div>

                        {/* --- Diff Preview --- */}
                        <div className="bg-neutral-900 rounded-[3rem] p-12 text-white shadow-2xl">
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-2xl font-black italic tracking-tight">Tailoring <span className="text-primary-500">Preview.</span></h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">AI Improved</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-neutral-700" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Unchanged</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-12 max-w-3xl mx-auto">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-500">Professional Summary</h4>
                                    <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-neutral-100 leading-relaxed text-sm font-medium">
                                        {tailoredData.tailored.professionalSummary?.summaryText}
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-500">Work Experience</h4>
                                    {tailoredData.tailored.workExperience?.map((exp: any, i: number) => (
                                        <div key={i} className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="font-black text-lg">{exp.companyName}</div>
                                                <div className="text-neutral-500 text-xs font-bold">{exp.jobTitle}</div>
                                            </div>
                                            <div className="space-y-2">
                                                {exp.achievements?.map((ach: any, j: number) => {
                                                    const originalAch = tailoredData.original.workExperience?.[i]?.achievements?.[j]?.achievementText
                                                    const isChanged = ach.achievementText !== originalAch
                                                    return (
                                                        <div 
                                                            key={j} 
                                                            className={cn(
                                                                "p-3 rounded-xl border text-sm transition-all",
                                                                isChanged 
                                                                    ? "bg-amber-500/10 border-amber-500/30 text-neutral-100" 
                                                                    : "bg-neutral-800/50 border-neutral-700/50 text-neutral-500"
                                                            )}
                                                        >
                                                            {ach.achievementText}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

function TailorPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        }>
            <TailorContent />
        </Suspense>
    )
}

export default TailorPage
