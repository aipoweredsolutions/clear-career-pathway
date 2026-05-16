'use client'

import React, { useState, useEffect, useRef, useDeferredValue, Suspense, useCallback } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ResumeDocument } from '@/lib/types/resume'
import { ResumeForm } from '@/components/editor/ResumeForm'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { Button } from '@/components/ui/Button'
import { Save, ArrowLeft, LayoutTemplate, X, Loader2, Check, Maximize2, Minimize2, Eye, Sparkles, Target, Columns, Lock, PenLine, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { CoverLetterForm } from '@/components/editor/forms/CoverLetterForm'
import dynamic from 'next/dynamic'


const KeywordOptimizer = dynamic(() => import('@/components/editor/KeywordOptimizer').then(mod => mod.KeywordOptimizer), {
    ssr: false,
})
const AIAssistantOverlay = dynamic(() => import('@/components/editor/AIAssistantOverlay').then(mod => mod.AIAssistantOverlay), {
    ssr: false,
})
const ATSScore = dynamic(() => import('@/components/editor/ATSScore').then(mod => mod.ATSScore), {
    ssr: false,
    loading: () => <div className="w-24 h-9 bg-neutral-100 rounded-2xl animate-pulse" />,
})
const DownloadButtons = dynamic(() => import('@/components/editor/DownloadButtons').then(mod => mod.DownloadButtons), {
    ssr: false,
    loading: () => <div className="w-20 h-9 bg-neutral-100 rounded-lg animate-pulse" />,
})
const ResumeControlBar = dynamic(() => import('@/components/editor/ResumeControlBar').then(mod => mod.ResumeControlBar), {
    ssr: false,
})
const TemplateSelector = dynamic(() => import('@/components/editor/TemplateSelector').then(mod => mod.TemplateSelector), {
    ssr: false,
})
const OnboardingWizard = dynamic(() => import('@/components/editor/OnboardingWizard').then(mod => mod.OnboardingWizard), {
    ssr: false,
})
const ResumeUploadModal = dynamic(() => import('@/components/dashboard/ResumeUploadModal').then(mod => mod.ResumeUploadModal), {
    ssr: false,
})
const CreditCount = dynamic(() => import('@/components/editor/CreditCount').then(mod => mod.CreditCount), {
    ssr: false,
})
import { fetchResume, saveResume } from '@/app/editor/actions'
import { UserSubscription } from '@/lib/types/resume'
import { useDebounce } from '@/lib/hooks/use-debounce'
import { toast } from 'sonner'
import { getMockDataForTemplate } from '@/lib/utils/template-helpers'
import { useAuth } from '@/components/auth/AuthProvider'



function EditorContent() {
    const params = useParams()
    const searchParams = useSearchParams()
    const documentId = params.documentId as string

    const { profile } = useAuth()
    const [data, setData] = useState<ResumeDocument | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [showTemplates, setShowTemplates] = useState(false)
    const [isMaximized, setIsMaximized] = useState(false)
    const [previewMode, setPreviewMode] = useState<'html' | 'pdf' | 'split'>('pdf')
    const [scale, setScale] = useState(0.85)
    const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit')
    const [mobileScale, setMobileScale] = useState(0.5)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Deferred preview data: keeps form input snappy while preview renders in background
    const deferredData = useDeferredValue(data)
    const isPreviewStale = deferredData !== data
    const [showKeywords, setShowKeywords] = useState(false)
    const [showAIAssistant, setShowAIAssistant] = useState(false)
    const [leftPanelWidth, setLeftPanelWidth] = useState(50) // Percentage
    const [isResizing, setIsResizing] = useState(false)
    const [showOnboarding, setShowOnboarding] = useState(false)
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [numPages, setNumPages] = useState(1)
    const measureRef = useRef<HTMLDivElement>(null)

    // Measure height dynamically for visual pagination using ResizeObserver
    useEffect(() => {
        if (!measureRef.current) return

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const heightPx = entry.target.scrollHeight
                const isA4 = (deferredData || data)?.formatting?.paperSize === 'a4'
                const visiblePageHeightPx = (isA4 ? 287 : (10.6 * 25.4)) * 3.7795275591 // 287mm or 10.6in (5mm margins)
                setNumPages(Math.max(1, Math.ceil(heightPx / visiblePageHeightPx)))
            }
        })

        observer.observe(measureRef.current)

        return () => observer.disconnect()
    }, [deferredData, data])

    // Trigger onboarding for new users
    useEffect(() => {
        if (profile && profile.has_completed_onboarding === false) {
            setShowOnboarding(true)
        }
    }, [profile])

    // Initial Fetch
    useEffect(() => {
        if (!documentId) return

        const loadData = async () => {
            try {
                // Handle "new" document creation
                if (documentId === 'new') {
                    const docType = searchParams.get('type') as any || 'resume'
                    const templateId = searchParams.get('template') || 'ats-professional'
                    const sampleId = searchParams.get('sample')
                    const isGuest = searchParams.get('guest') === 'true'

                    // Recover guest progress if available
                    if (isGuest) {
                        try {
                            const savedData = localStorage.getItem('guest_resume_data')
                            if (savedData) {
                                const parsed = JSON.parse(savedData)
                                parsed.templateId = templateId // Update to requested template
                                if (docType) parsed.documentType = docType
                                setData(parsed)
                                setLoading(false)
                                return
                            }
                        } catch (e) {
                            console.error('Failed to parse guest local storage', e)
                        }
                    }

                    // Use the specialized mock data for this template as the starting point
                    const mockTemplateData = getMockDataForTemplate(templateId)

                    let baseData: ResumeDocument = {
                        ...mockTemplateData,
                        id: 'new',
                        title: docType === 'cover_letter' ? 'New Cover Letter' : docType === 'references' ? 'New Reference Page' : 'New Resume',
                        documentType: docType,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }

                    // If a sample is requested, load it
                    if (sampleId) {
                        const { CAREER_SAMPLES } = await import('@/lib/constants/career-samples')
                        const sample = (CAREER_SAMPLES as any)[sampleId]
                        if (sample) {
                            baseData = {
                                ...sample,
                                id: 'new',
                                templateId: templateId // Keep the chosen template
                            }
                        }
                    }

                    setData(baseData)
                    setLoading(false)
                    return
                }

                const fetchedData = await fetchResume(documentId)

                if (fetchedData) {
                    setData(fetchedData)
                }
            } catch (error) {
                console.error("Failed to load editor data", error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [documentId, searchParams])

    // Auto-Save Logic
    const debouncedData = useDebounce(data, 2000)
    const isFirstLoad = useRef(true)

    useEffect(() => {
        if (!debouncedData) return

        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        const isGuest = searchParams.get('guest') === 'true'
        if (debouncedData.id === 'new' && isGuest) {
            // Save to Local Storage for guests instead of database
            try {
                localStorage.setItem('guest_resume_data', JSON.stringify(debouncedData))
                setLastSaved(new Date())
            } catch (e) {
                console.error('Local storage save failed', e)
            }
            return
        }

        const autoSave = async () => {
            setSaving(true)
            try {
                const result = await saveResume(debouncedData)
                if (result.success) {
                    setLastSaved(new Date())
                }
            } catch (error) {
                console.error('Auto-save failed', error)
            } finally {
                setSaving(false)
            }
        }

        autoSave()
    }, [debouncedData, searchParams])

    // Reset scale when maximizing/minimizing
    useEffect(() => {
        if (isMaximized) {
            setScale(1)
        } else {
            setScale(0.85)
        }
    }, [isMaximized])

    // Calculate mobile preview scale based on screen width
    useEffect(() => {
        const updateMobileScale = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            if (mobile) {
                const padding = 32 // 16px each side
                setMobileScale((window.innerWidth - padding) / 816)
            }
        }
        updateMobileScale()
        window.addEventListener('resize', updateMobileScale)
        return () => window.removeEventListener('resize', updateMobileScale)
    }, [])

    const handleMinimize = () => {
        setScale(prev => Math.max(0.4, prev - 0.1))
    }

    const handleMaximize = () => {
        if (!isMaximized) {
            setIsMaximized(true)
        } else {
            setScale(prev => Math.min(2.0, prev + 0.1))
        }
    }

    const handleSave = async () => {
        if (!data) return
        const isGuest = searchParams.get('guest') === 'true'
        if (data.id === 'new' && isGuest) {
            toast.error('Sign in to save your resume progress.')
            return
        }

        setSaving(true)
        try {
            const result = await saveResume(data)
            if (result.success) {
                setLastSaved(new Date())
                toast.success('Your resume has been saved.')
            } else {
                toast.error('Failed to save changes.')
            }
        } catch (error) {
            console.error('Save failed', error)
            toast.error('An unexpected error occurred.')
        } finally {
            setSaving(false)
        }
    }

    // Resize Handlers
    const startResizing = (e: React.MouseEvent) => {
        setIsResizing(true)
        e.preventDefault()
    }


    const onResize = React.useCallback((e: MouseEvent) => {
        if (!isResizing) return

        const newWidth = (e.clientX / window.innerWidth) * 100
        if (newWidth > 20 && newWidth < 80) { // Limit resize range
            setLeftPanelWidth(newWidth)
        }
    }, [isResizing])

    const stopResizing = React.useCallback(() => {
        setIsResizing(false)
    }, [])

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', onResize)
            window.addEventListener('mouseup', stopResizing)
        } else {
            window.removeEventListener('mousemove', onResize)
            window.removeEventListener('mouseup', stopResizing)
        }
        return () => {
            window.removeEventListener('mousemove', onResize)
            window.removeEventListener('mouseup', stopResizing)
        }
    }, [isResizing, onResize, stopResizing])

    const handleTemplateSelect = (templateId: string) => {
        if (data) {
            setData({ 
                ...data, 
                templateId,
                formatting: data.formatting ? { ...data.formatting, themeColor: undefined } : undefined
            })
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-neutral-100">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                    <p className="text-neutral-500 font-medium">Loading your resume...</p>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center h-screen bg-neutral-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">Resume Not Found</h1>
                    <Link href="/dashboard" className="text-primary-600 hover:underline">Return to Dashboard</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-neutral-100 overflow-hidden relative">
            {/* Editor Header */}
            <header className="bg-white border-b border-neutral-200 px-3 md:px-6 py-3 flex items-center justify-between shrink-0 h-14 md:h-16 relative z-30">
                <div className="flex items-center gap-2 md:gap-4 min-w-0">
                    <Link href="/dashboard" className="text-neutral-500 hover:text-neutral-900 transition-colors shrink-0">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex flex-col min-w-0">
                        <h1 className="text-sm md:text-lg font-semibold text-neutral-900 leading-tight truncate">
                            {data.title || 'Untitled Document'}
                        </h1>
                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                            {saving ? (
                                <>
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    Saving...
                                </>
                            ) : lastSaved ? (
                                <>
                                    <Check className="w-3 h-3 text-green-500" />
                                    Saved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </>
                            ) : (
                                'Unsaved changes'
                            )}
                        </span>
                    </div>
                </div>

                {/* Desktop toolbar */}
                <div className="hidden md:flex items-center gap-3">
                    <ATSScore data={deferredData || data} />
                    <CreditCount className="ml-2" />

                    <Button
                        variant={showKeywords ? "primary" : "outline"}
                        size="sm"
                        onClick={() => { setShowKeywords(!showKeywords); }}
                        className={cn("transition-all duration-300 gap-2", showKeywords && "ring-2 ring-violet-500 shadow-lg shadow-violet-500/20 bg-violet-600 hover:bg-violet-700 border-violet-600")}
                    >
                        <Target className={cn("w-4 h-4", showKeywords ? "text-white" : "text-violet-600")} />
                        Keywords
                    </Button>

                    <Link 
                        href={`/tailor?id=${documentId}`}
                        className="hidden lg:flex items-center gap-2 h-9 px-4 rounded-xl bg-primary-50 text-primary-700 hover:bg-primary-100 transition-all font-black text-[10px] uppercase tracking-widest border border-primary-200"
                    >
                        <Target className="w-4 h-4" />
                        Tailor for a job
                    </Link>

                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                            const isPro = profile?.subscription_tier === 'pro' || profile?.subscription_tier === 'enterprise'
                            if (!isPro) {
                                toast.error('Magic Optimize is a Pro feature.', {
                                    description: 'Upgrade to unlock AI-powered resume optimization.',
                                    action: {
                                        label: 'Upgrade',
                                        onClick: () => window.location.href = '/pricing'
                                    }
                                })
                                return
                            }
                            setShowAIAssistant(true)
                        }}
                        className="bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-black uppercase tracking-widest text-[10px] h-9 px-4 shadow-lg shadow-primary-500/20 border-none group"
                    >
                        <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                        Magic Optimize
                        {!(profile?.subscription_tier === 'pro' || profile?.subscription_tier === 'enterprise') && (
                            <div className="ml-1.5 p-0.5 bg-white/20 rounded-md">
                                <Lock className="w-2.5 h-2.5" />
                            </div>
                        )}
                    </Button>

                    <div className="h-6 w-px bg-neutral-300 mx-1" />

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTemplates(!showTemplates)}
                        className={cn(
                            "transition-all duration-300 gap-2 border-neutral-300 font-bold",
                            showTemplates ? "bg-neutral-900 text-white border-neutral-900 shadow-lg" : "hover:bg-neutral-100"
                        )}
                    >
                        <LayoutTemplate className={cn("w-4 h-4", showTemplates ? "text-primary-400" : "text-neutral-500")} />
                        Switch Template
                    </Button>

                    <Button
                        variant={isMaximized ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setIsMaximized(!isMaximized)}
                        className={cn("transition-all duration-300", isMaximized && "ring-2 ring-primary-500")}
                    >
                        {isMaximized ? (
                            <div className="flex items-center">
                                <Minimize2 className="w-4 h-4 mr-2" />
                                Edit Mode
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <Maximize2 className="w-4 h-4 mr-2" />
                                Full Screen
                            </div>
                        )}
                    </Button>

                    <div className="h-6 w-px bg-neutral-300 mx-1" />

                    <Button variant="outline" size="sm" onClick={handleSave} disabled={saving}>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                    </Button>

                    <DownloadButtons data={data} />
                </div>

                {/* Mobile toolbar — only Download + More menu */}
                <div className="flex md:hidden items-center gap-2">
                    <DownloadButtons data={data} />
                    <div className="relative">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                        >
                            <MoreHorizontal className="w-5 h-5 text-neutral-600" />
                        </button>
                        {showMobileMenu && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowMobileMenu(false)} />
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-neutral-200 z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <button
                                        onClick={() => { setShowTemplates(true); setShowMobileMenu(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                                    >
                                        <LayoutTemplate className="w-4 h-4 text-neutral-500" />
                                        Switch Template
                                    </button>
                                    <Link
                                        href={`/tailor?id=${documentId}`}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                                    >
                                        <Target className="w-4 h-4 text-primary-600" />
                                        Tailor for a job
                                    </Link>
                                    <button
                                        onClick={() => { setShowKeywords(!showKeywords); setShowMobileMenu(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                                    >
                                        <Target className="w-4 h-4 text-violet-500" />
                                        Keywords
                                    </button>
                                    <button
                                        onClick={() => {
                                            const isPro = profile?.subscription_tier === 'pro' || profile?.subscription_tier === 'enterprise'
                                            if (!isPro) {
                                                toast.error('Magic Optimize is a Pro feature.', {
                                                    description: 'Upgrade to unlock AI-powered resume optimization.',
                                                    action: { label: 'Upgrade', onClick: () => window.location.href = '/pricing' }
                                                })
                                            } else {
                                                setShowAIAssistant(true)
                                            }
                                            setShowMobileMenu(false)
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                                    >
                                        <Sparkles className="w-4 h-4 text-indigo-500" />
                                        Magic Optimize
                                    </button>
                                    <div className="h-px bg-neutral-100 my-1" />
                                    <button
                                        onClick={() => { handleSave(); setShowMobileMenu(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                                    >
                                        <Save className="w-4 h-4 text-neutral-500" />
                                        Save Now
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div
                className={cn(
                    "flex flex-col md:flex-row flex-1 overflow-hidden relative pb-14 md:pb-0",
                    isResizing && "cursor-col-resize select-none"
                )}
            >
                {/* Left Panel: Form Editor */}
                <div
                    className={cn(
                        "h-full overflow-y-auto border-r border-neutral-200 bg-white transition-opacity duration-300",
                        isMaximized ? "hidden md:block md:w-0 md:min-w-0 md:opacity-0 md:overflow-hidden md:pointer-events-none" : "md:opacity-100",
                        mobileTab === 'edit' ? "flex-1 md:flex-none" : "hidden md:block"
                    )}
                    style={{
                        width: isMaximized ? '0%' : `${leftPanelWidth}%`,
                        flexShrink: 0
                    }}
                >
                    {data.documentType === 'cover_letter' ? (
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-neutral-900 mb-8">Cover Letter Designer</h2>
                            <CoverLetterForm
                                data={data.coverLetter || {}}
                                fullResumeData={data}
                                onChange={(cl) => setData({ ...data, coverLetter: cl })}
                            />
                        </div>
                    ) : (
                        <ResumeForm data={data} onChange={setData} />
                    )}
                </div>

                {/* Resize Handle — desktop only */}
                {!isMaximized && (
                    <div
                        onMouseDown={startResizing}
                        className={cn(
                            "hidden md:flex group absolute top-0 bottom-0 z-40 w-1 hover:w-1.5 transition-all cursor-col-resize items-center justify-center bg-transparent hover:bg-primary-500/30",
                            isResizing && "w-1.5 bg-primary-500/50"
                        )}
                        style={{ left: `${leftPanelWidth}%`, transform: 'translateX(-50%)' }}
                    >
                        <div className={cn(
                            "w-0.5 h-12 bg-neutral-300 rounded-full group-hover:bg-primary-500 transition-colors",
                            isResizing && "bg-primary-500"
                        )} />
                    </div>
                )}

                {/* Right Panel: Live Preview */}
                <div className={cn(
                    "h-full bg-neutral-400 overflow-hidden flex-col relative transition-all duration-300",
                    isMaximized ? "fixed inset-0 z-50 bg-neutral-800" : "md:flex-1",
                    mobileTab === 'preview' ? "flex flex-1" : "hidden md:flex"
                )}>
                    {/* Control Bar */}
                    <ResumeControlBar
                        data={data}
                        subscription={null}
                        onUpdate={setData}
                        isMaximized={isMaximized}
                        onToggleMaximize={() => setIsMaximized(!isMaximized)}
                        onClose={() => setIsMaximized(false)}
                        onMinimize={handleMinimize}
                        onMaximize={handleMaximize}
                    />

                    {/* Preview Area container with background pattern for premium feel */}
                    <div className={cn(
                        "flex-1 overflow-auto bg-[radial-gradient(#555_1px,transparent_1px)] [background-size:20px_20px] transition-all duration-300 p-4 md:p-12",
                        previewMode === 'split' ? "flex flex-row items-start justify-center gap-4 lg:gap-12" : "flex justify-center",
                        isPreviewStale && "opacity-80"
                    )}>
                        {/* 
                            Off-screen container for HTML-to-PDF capture. 
                            This ensures that the #resume-preview element is always in the DOM
                            and is a single continuous element for html2canvas to properly paginate using CSS break rules.
                        */}
                        <div className="absolute -left-[9999px] -top-[9999px] opacity-0" aria-hidden="true">
                            <div
                                id="resume-preview"
                                className="bg-white"
                                ref={measureRef}
                            >
                                <TemplateRenderer
                                    templateId={(deferredData || data).templateId}
                                    data={deferredData || data}
                                    className={(deferredData || data).formatting?.paperSize === 'a4' ? 'w-[210mm] min-h-[297mm]' : 'w-[8.5in] min-h-[11in]'}
                                />
                            </div>
                        </div>

                        {/* Visible Paginated Preview */}
                        <div
                            className="transition-all duration-500 flex flex-col gap-4 items-center"
                            style={{
                                transform: `scale(${isMobile ? mobileScale : scale})`,
                                transformOrigin: 'top center'
                            }}
                        >
                            {Array.from({ length: numPages }).map((_, i) => {
                                const isA4 = (deferredData || data).formatting?.paperSize === 'a4'
                                return (
                                    <div 
                                        key={i} 
                                        className={cn(
                                            "bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] relative ring-1 ring-neutral-900/5 flex flex-col items-center justify-center",
                                            isA4 ? 'w-[210mm] h-[297mm]' : 'w-[8.5in] h-[11in]'
                                        )}
                                    >
                                        <div 
                                            className="relative w-full overflow-hidden"
                                            style={{ height: isA4 ? '287mm' : '10.6in' }}
                                        >
                                            <div className="absolute top-0 left-0 w-full" style={{ 
                                                transform: `translateY(-${i * (isA4 ? 287 : 10.6)}${isA4 ? 'mm' : 'in'})` 
                                            }}>
                                                <TemplateRenderer
                                                    templateId={(deferredData || data).templateId}
                                                    data={deferredData || data}
                                                    className={isA4 ? 'w-[210mm]' : 'w-[8.5in]'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Templates Sidebar Overlay */}
                {showTemplates && (
                    <div className="absolute top-0 right-0 bottom-0 w-80 bg-white border-l border-neutral-200 shadow-xl z-20 transform transition-transform duration-300 ease-in-out overflow-y-auto">
                        <div className="p-4 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h2 className="font-semibold text-neutral-900">Select Template</h2>
                            <button
                                onClick={() => setShowTemplates(false)}
                                className="text-neutral-500 hover:text-neutral-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <TemplateSelector
                            currentTemplateId={data.templateId}
                            onSelect={handleTemplateSelect}
                            realData={data}
                        />
                    </div>
                )}



                {/* Keyword Optimizer Sidebar */}
                <KeywordOptimizer
                    data={data}
                    onUpdate={setData}
                    isOpen={showKeywords}
                    onClose={() => setShowKeywords(false)}
                />

                {/* Advanced AI Assistant Overlay */}
                <AIAssistantOverlay
                    data={data}
                    onUpdate={setData}
                    isOpen={showAIAssistant}
                    onClose={() => setShowAIAssistant(false)}
                />

                {/* Onboarding Wizard */}
                <OnboardingWizard 
                    isOpen={showOnboarding}
                    onClose={(onboardingData, source) => {
                        setShowOnboarding(false)
                        if (onboardingData?.personalInfo?.professionalTitle) {
                            setData(prev => prev ? {
                                ...prev,
                                personalInfo: {
                                    ...prev.personalInfo,
                                    professionalTitle: onboardingData.personalInfo?.professionalTitle || prev.personalInfo?.professionalTitle
                                } as any
                            } : null)
                        }
                        if (source === 'upload') {
                            setShowUploadModal(true)
                        }
                    }}
                />

                {/* Resume Upload Modal */}
                <ResumeUploadModal 
                    isOpen={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                    onImport={(importedData) => {
                        if (data) {
                            setData({
                                ...data,
                                ...importedData,
                                id: data.id,
                                documentType: data.documentType,
                                templateId: data.templateId,
                                formatting: data.formatting,
                                sectionOrder: data.sectionOrder
                            })
                            toast.success('Resume imported and AI-structured!')
                        }
                    }}
                />
            </div>

            {/* Mobile Bottom Tab Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-neutral-200 flex h-14">
                <button
                    onClick={() => setMobileTab('edit')}
                    className={cn(
                        "flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors",
                        mobileTab === 'edit' ? "text-primary-600 bg-primary-50/50" : "text-neutral-400"
                    )}
                >
                    <PenLine className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Edit</span>
                </button>
                <div className="w-px bg-neutral-200" />
                <button
                    onClick={() => setMobileTab('preview')}
                    className={cn(
                        "flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors",
                        mobileTab === 'preview' ? "text-primary-600 bg-primary-50/50" : "text-neutral-400"
                    )}
                >
                    <Eye className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Preview</span>
                </button>
            </div>
        </div>
    )
}

export default function EditorPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-primary-500/20 rounded-full animate-ping" />
                    <Loader2 className="w-10 h-10 text-primary-500 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-black text-white uppercase tracking-[0.3em] mb-2">Deploying Editor</h2>
                    <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest">Building your workstation...</p>
                </div>
            </div>
        }>
            <EditorContent />
        </Suspense>
    )
}

