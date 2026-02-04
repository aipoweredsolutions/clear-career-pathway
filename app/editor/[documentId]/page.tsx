'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ResumeDocument } from '@/lib/types/resume'
import { ResumeForm } from '@/components/editor/ResumeForm'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { TemplateSelector } from '@/components/editor/TemplateSelector'
import { Button } from '@/components/ui/Button'
import { DownloadButtons } from '@/components/editor/DownloadButtons'
import { Save, ArrowLeft, LayoutTemplate, X, Loader2, Check, Maximize2, Minimize2, Eye } from 'lucide-react'
import Link from 'next/link'
import { ATSScore } from '@/components/editor/ATSScore'
import { ResumeControlBar } from '@/components/editor/ResumeControlBar'
import dynamic from 'next/dynamic'
import { fetchResume, saveResume, fetchSubscription } from '@/app/editor/actions'
import { UserSubscription } from '@/lib/types/resume'
import { useDebounce } from '@/lib/hooks/use-debounce'
import { toast } from 'sonner'
import { getMockDataForTemplate } from '@/lib/utils/template-helpers'

const PDFPreview = dynamic(() => import('@/components/pdf/PDFPreview').then(mod => mod.PDFPreview), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center h-full w-full bg-neutral-800 rounded-lg gap-4">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Waking up PDF Engine...</p>
        </div>
    )
})

function EditorContent() {
    const params = useParams()
    const searchParams = useSearchParams()
    const documentId = params.documentId as string

    const [data, setData] = useState<ResumeDocument | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [showTemplates, setShowTemplates] = useState(false)
    const [isMaximized, setIsMaximized] = useState(false)
    const [previewMode, setPreviewMode] = useState<'html' | 'pdf'>('html')
    const [scale, setScale] = useState(0.85)
    const [subscription, setSubscription] = useState<UserSubscription | null>(null)

    // Initial Fetch
    useEffect(() => {
        if (!documentId) return

        const loadData = async () => {
            try {
                // Handle "new" document creation
                if (documentId === 'new') {
                    const templateId = searchParams.get('template') || 'classic'
                    const sampleId = searchParams.get('sample')
                    const isGuest = searchParams.get('guest') === 'true'

                    // Use the specialized mock data for this template as the starting point
                    const mockTemplateData = getMockDataForTemplate(templateId)

                    let baseData: ResumeDocument = {
                        ...mockTemplateData,
                        id: 'new',
                        title: 'New Resume',
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

                const [fetchedData, fetchedSub] = await Promise.all([
                    fetchResume(documentId),
                    fetchSubscription()
                ])

                if (fetchedData) {
                    setData(fetchedData)
                }

                setSubscription(fetchedSub)
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
    }, [debouncedData])

    // Reset scale when maximizing/minimizing
    useEffect(() => {
        if (isMaximized) {
            setScale(1)
        } else {
            setScale(0.85)
        }
    }, [isMaximized])

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

    const handleTemplateSelect = (templateId: string) => {
        if (data) {
            setData({ ...data, templateId })
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
            <header className="bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between shrink-0 h-16 relative z-30">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-neutral-500 hover:text-neutral-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-semibold text-neutral-900 leading-tight">
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

                <div className="flex items-center gap-3">
                    <ATSScore data={data} />
                    <div className="h-6 w-px bg-neutral-300 mx-1" />

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTemplates(!showTemplates)}
                        className={showTemplates ? 'bg-neutral-100' : ''}
                    >
                        <LayoutTemplate className="w-4 h-4 mr-2" />
                        Templates
                    </Button>

                    <div className="flex bg-neutral-100 rounded-lg p-1 mr-2">
                        <button
                            onClick={() => setPreviewMode('html')}
                            className={cn(
                                "px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5",
                                previewMode === 'html'
                                    ? "bg-white text-primary-600 shadow-sm ring-1 ring-neutral-200"
                                    : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            <LayoutTemplate className="w-3.5 h-3.5" />
                            Live
                        </button>
                        <button
                            onClick={() => setPreviewMode('pdf')}
                            className={cn(
                                "px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5",
                                previewMode === 'pdf'
                                    ? "bg-white text-primary-600 shadow-sm ring-1 ring-neutral-200"
                                    : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            <Eye className="w-3.5 h-3.5" />
                            PDF
                        </button>
                    </div>

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

                    <DownloadButtons data={data} subscription={subscription} />
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Left Panel: Form Editor */}
                <div className={cn(
                    "w-1/2 min-w-[400px] h-full overflow-y-auto border-r border-neutral-200 bg-white transition-all duration-300",
                    isMaximized ? "w-0 min-w-0 opacity-0 overflow-hidden pointer-events-none" : "opacity-100"
                )}>
                    <ResumeForm data={data} onChange={setData} />
                </div>

                {/* Right Panel: Live Preview */}
                <div className={cn(
                    "flex-1 h-full bg-neutral-400 overflow-hidden flex flex-col relative transition-all duration-300",
                    isMaximized ? "absolute inset-0 z-50 bg-neutral-800" : ""
                )}>
                    {/* Control Bar */}
                    <ResumeControlBar
                        data={data}
                        subscription={subscription}
                        onUpdate={setData}
                        isMaximized={isMaximized}
                        onToggleMaximize={() => setIsMaximized(!isMaximized)}
                        onClose={() => setIsMaximized(false)}
                        onMinimize={handleMinimize}
                        onMaximize={handleMaximize}
                    />

                    {/* Preview Area container with background pattern for premium feel */}
                    <div className="flex-1 overflow-auto bg-[radial-gradient(#555_1px,transparent_1px)] [background-size:20px_20px] flex justify-center p-12">
                        {/* 
                            Off-screen container for HTML-to-PDF capture. 
                            This ensures that the #resume-preview element is always in the DOM
                            even when the user is looking at the PDF preview.
                        */}
                        <div
                            className={cn(
                                "fixed left-[-9999px] top-[-9999px]",
                                previewMode === 'html' ? "relative left-auto top-auto" : ""
                            )}
                            style={{
                                transform: previewMode === 'html' ? `scale(${scale})` : 'scale(1)',
                                transformOrigin: 'top center'
                            }}
                        >
                            <div
                                className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out bg-white"
                            >
                                <TemplateRenderer
                                    templateId={data.templateId}
                                    data={data}
                                    className={cn(
                                        "transition-all duration-300",
                                        data.formatting?.paperSize === 'a4' ? 'w-[210mm] min-h-[297mm]' : 'w-[8.5in] min-h-[11in]'
                                    )}
                                />
                            </div>
                        </div>

                        {previewMode === 'pdf' && (
                            <div className="w-full h-full max-w-5xl mx-auto flex flex-col">
                                <PDFPreview
                                    data={data}
                                    subscription={subscription}
                                    className="flex-1 w-full bg-neutral-900 rounded-lg shadow-2xl overflow-hidden"
                                />

                                <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white text-center text-sm">
                                    <p className="font-medium">PDF Preview accurately reflects how your resume will look when downloaded.</p>
                                    <p className="text-white/60 text-xs mt-1">Multi-page support is automatically handled by the PDF engine.</p>
                                </div>
                            </div>
                        )}
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
                            subscription={subscription}
                        />
                    </div>
                )}
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

