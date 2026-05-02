'use client'

import React, { useState } from 'react'
import NextImage from 'next/image'
import { Check, X, Maximize2, Minimize2, File, ArrowLeft, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { templateRegistry } from '@/lib/templates/registry'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { Button } from '@/components/ui/Button'
import { DownloadButtons } from '@/components/editor/DownloadButtons'
import { TemplateMetadata, ResumeDocument, UserSubscription } from '@/lib/types/resume'
import { hasPremiumAccess } from '@/lib/supabase/subscriptions'
import { Lock, Sparkles } from 'lucide-react'
import { calculateTemplateMatchScore } from '@/lib/templates/matching'

interface TemplateSelectorProps {
    currentTemplateId: string
    onSelect: (templateId: string) => void
    realData?: ResumeDocument | null
    subscription: UserSubscription | null
}

import { getMockDataForTemplate } from '@/lib/utils/template-helpers'

const getPreviewData = (templateId: string, realData?: ResumeDocument | null) => {
    if (realData) {
        return { ...realData, templateId }
    }
    return getMockDataForTemplate(templateId)
}

export function TemplateSelector({ currentTemplateId, onSelect, realData, subscription }: TemplateSelectorProps) {
    const [previewTemplate, setPreviewTemplate] = useState<TemplateMetadata | null>(null)
    const [paperSize, setPaperSize] = useState<'letter' | 'a4'>('a4')
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [isMaximized, setIsMaximized] = useState(false)
    const contentRef = React.useRef<HTMLDivElement>(null)

    const handleSelect = () => {
        if (previewTemplate) {
            if (previewTemplate.isPremium && !hasPremiumAccess(subscription)) {
                toast.error('This is a premium template. Please upgrade to use it.')
                return
            }
            onSelect(previewTemplate.id)
            setPreviewTemplate(null)
            setIsMaximized(false)
        }
    }

    // Effect to calculate total pages when template or data changes
    React.useEffect(() => {
        if (!previewTemplate) return

        const timer = setTimeout(() => {
            if (contentRef.current) {
                const element = contentRef.current.querySelector('#resume-preview')
                if (element) {
                    const totalHeight = element.scrollHeight
                    const pageHeight = element.clientHeight // This is the height of one page based on its CSS (297mm or 11in)
                    const pages = Math.ceil(totalHeight / pageHeight)
                    setTotalPages(pages || 1)
                }
            }
        }, 500) // Small delay to ensure rendering is complete
        
        setCurrentPage(0) // Reset to first page
        return () => clearTimeout(timer)
    }, [previewTemplate, paperSize, realData])

    if (previewTemplate) {
        return (
            <div className={cn(
                "flex flex-col bg-neutral-100 animate-in fade-in slide-in-from-right duration-300",
                isMaximized ? "fixed inset-0 z-[100]" : "absolute inset-0 z-50 h-full"
            )}>
                {/* Preview Header */}
                <div className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shadow-sm sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setPreviewTemplate(null)
                                setIsMaximized(false)
                            }}
                            className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-neutral-500" />
                        </button>
                        <div>
                            <h3 className="font-bold text-neutral-900 leading-tight text-sm">{previewTemplate.name}</h3>
                            <p className="text-[10px] uppercase tracking-wider font-bold text-primary-600">Preview Mode</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Page Navigation */}
                        {totalPages > 1 && (
                            <div className="flex items-center bg-neutral-100 rounded-lg p-1 gap-1 border border-neutral-200">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                    disabled={currentPage === 0}
                                    className="p-1 hover:bg-white rounded transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                >
                                    <ChevronLeft className="w-4 h-4 text-neutral-600" />
                                </button>
                                <div className="px-2 text-[10px] font-black text-neutral-500 uppercase tracking-widest min-w-[70px] text-center">
                                    Page {currentPage + 1} / {totalPages}
                                </div>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                    disabled={currentPage === totalPages - 1}
                                    className="p-1 hover:bg-white rounded transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                >
                                    <ChevronRight className="w-4 h-4 text-neutral-600" />
                                </button>
                            </div>
                        )}

                        {/* Paper Size Toggle */}
                        <div className="flex bg-neutral-100 rounded-md p-0.5 mr-1">
                            <button
                                onClick={() => setPaperSize('letter')}
                                className={cn(
                                    "px-2 py-1 text-[10px] font-bold rounded transition-all",
                                    paperSize === 'letter' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"
                                )}
                            >
                                LTR
                            </button>
                            <button
                                onClick={() => setPaperSize('a4')}
                                className={cn(
                                    "px-2 py-1 text-[10px] font-bold rounded transition-all",
                                    paperSize === 'a4' ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500"
                                )}
                            >
                                A4
                            </button>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMaximized(!isMaximized)}
                            className="h-8 w-8 text-neutral-500 hover:text-neutral-900"
                        >
                            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </Button>

                        <div className="h-6 w-px bg-neutral-200 mx-1" />

                        <DownloadButtons 
                            data={getPreviewData(previewTemplate.id, realData)} 
                            subscription={subscription} 
                            variant="toolbar" 
                            className="w-auto"
                        />

                        <div className="h-6 w-px bg-neutral-200 mx-1" />

                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSelect}
                            className="shadow-sm text-xs py-1.5"
                        >
                            {previewTemplate.isPremium && !hasPremiumAccess(subscription) ? (
                                <span className="flex items-center gap-1.5">
                                    <Lock className="w-3 h-3" />
                                    Upgrade to Use
                                </span>
                            ) : (
                                "Use Template"
                            )}
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto bg-neutral-200/50 p-6 flex flex-col items-center min-h-0 bg-[radial-gradient(#c5c5c5_1px,transparent_1px)] [background-size:16px_16px]">
                    <div 
                        className={cn(
                            "origin-top shadow-2xl transition-all duration-500 ease-out bg-white overflow-hidden relative",
                            isMaximized ? "scale-100" : "scale-[0.55] sm:scale-[0.75]"
                        )}
                        style={{
                            height: paperSize === 'a4' ? '297mm' : '11in',
                            width: paperSize === 'a4' ? '210mm' : '8.5in'
                        }}
                    >
                        <div 
                            ref={contentRef}
                            className="transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateY(-${currentPage * 100}%)`,
                            }}
                        >
                            <TemplateRenderer
                                templateId={previewTemplate.id}
                                data={getPreviewData(previewTemplate.id, realData)}
                                className={cn(
                                    "transition-all duration-300",
                                    paperSize === 'a4' ? 'w-[210mm] min-h-[297mm]' : 'w-[8.5in] min-h-[11in]'
                                )}
                            />
                        </div>

                        {/* Slide Indicator Overlay (Subtle) */}
                        {totalPages > 1 && (
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <div 
                                        key={i}
                                        className={cn(
                                            "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                            currentPage === i ? "bg-primary-500 w-4" : "bg-neutral-300"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-8 flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                                className="rounded-full gap-2 border-neutral-300 bg-white"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous Page
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                disabled={currentPage === totalPages - 1}
                                className="rounded-full gap-2 border-neutral-300 bg-white"
                            >
                                Next Page
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const recommendations = React.useMemo(() => {
        if (!realData) return []
        return templateRegistry
            .map(t => ({ 
                id: t.id, 
                score: calculateTemplateMatchScore(t, realData),
                template: t
            }))
            .sort((a, b) => b.score - a.score)
    }, [realData])

    const topMatches = recommendations.filter(r => r.score >= 6).slice(0, 2).map(r => r.id)
    const magicMatch = recommendations.find(r => r.score >= 9 && r.id !== currentTemplateId)

    return (
        <div className="flex flex-col p-4 gap-6">
            {/* Magic Recommendation Banner */}
            {magicMatch && (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-primary-600 to-violet-600 p-[1px] shadow-xl animate-in slide-in-from-top-4 duration-500">
                    <div className="bg-white/95 backdrop-blur-md rounded-[15px] p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                            <Sparkles className="w-6 h-6 text-primary-600 animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest mb-1">Architectural Fit</h4>
                            <p className="text-[11px] text-neutral-500 leading-tight">
                                <span className="font-bold text-primary-600">{magicMatch.template.name}</span> is a perfect match for your career level and industry.
                            </p>
                        </div>
                        <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={() => onSelect(magicMatch.id)}
                            className="h-8 text-[10px] font-black uppercase tracking-widest px-4"
                        >
                            Switch
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                {templateRegistry.map((template) => {
                    const recommendation = recommendations.find(r => r.id === template.id)
                    const score = recommendation?.score || 0
                    const isRecommended = topMatches.includes(template.id)
                    const matchPercentage = Math.min(100, Math.round((score / 10) * 100))
                    
                    return (
                    <button
                        key={template.id}
                        onClick={() => setPreviewTemplate(template)}
                        className={cn(
                            "relative group flex flex-col items-center p-3 rounded-xl border-2 transition-all hover:border-primary-400 hover:bg-white text-left overflow-hidden",
                            currentTemplateId === template.id
                                ? "border-primary-600 bg-primary-50/50 ring-2 ring-primary-100 shadow-sm"
                                : "border-neutral-200 bg-neutral-50/50 shadow-sm"
                        )}
                    >
                        {/* Best Match Badge */}
                        {isRecommended && (
                            <div className="absolute top-0 left-0 z-20 bg-gradient-to-r from-primary-600 to-indigo-600 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-br-xl shadow-lg flex items-center gap-1.5 animate-in slide-in-from-left-4 duration-500">
                                <Sparkles className="w-3 h-3" />
                                Best Match
                            </div>
                        )}

                        {/* Real Mini Preview */}
                    <div className="w-full aspect-[210/297] bg-white rounded-lg border border-neutral-200 mb-4 overflow-hidden shadow-sm group-hover:shadow-md transition-all relative">
                        {template.previewImage ? (
                            <div className="relative w-full h-[120%] -top-[10%]">
                                <NextImage
                                    src={template.previewImage}
                                    alt={template.name}
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 400px) 50vw, 20vw"
                                />
                            </div>
                        ) : (
                            <LazyTemplateSelectorPreview
                                template={template}
                                data={getPreviewData(template.id, realData)}
                            />
                        )}

                        {/* Active Indicator Over Preview */}
                        {currentTemplateId === template.id && (
                            <div className="absolute top-2 right-2 bg-primary-600 text-white rounded-full p-1.5 shadow-lg z-10 animate-in zoom-in-50 duration-200">
                                <Check className="w-4 h-4" />
                            </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 backdrop-blur-sm text-primary-600 font-bold text-[10px] px-3 py-1.5 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                Click to Preview
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="text-sm font-bold text-neutral-900 truncate">
                                {template.name}
                            </h3>
                            <div className="flex gap-1 flex-shrink-0">
                                {(template.id.startsWith('ats-') || template.id === 'classic-clean') && (
                                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider" title="ATS Compliant">
                                        ATS
                                    </span>
                                )}
                                {template.isPremium && (
                                    <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                                        Pro
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-1">
                            <p className="text-[10px] text-neutral-400 font-medium truncate">
                                {template.suitableFor.industries?.slice(0, 2).join(', ')}
                            </p>
                            {realData && (
                                <span className={cn(
                                    "text-[9px] font-black uppercase tracking-wider",
                                    matchPercentage >= 80 ? "text-primary-600" : "text-neutral-300"
                                )}>
                                    {matchPercentage}% Match
                                </span>
                            )}
                        </div>
                    </div>
                </button>
            )})}
            </div>
        </div>
    )
}

function LazyTemplateSelectorPreview({ template, data }: { template: TemplateMetadata, data: any }) {
    const [isVisible, setIsVisible] = React.useState(false)
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                // Stagger loading slightly to prevent locking the thread when scrolling fast
                setTimeout(() => setIsVisible(true), 150)
                observer.disconnect()
            }
        }, { rootMargin: '300px' })

        if (ref.current) {
            observer.observe(ref.current)
        }
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className="absolute inset-0 origin-top left-0 right-0 scale-[0.25] pointer-events-none"
        >
            {isVisible ? (
                <TemplateRenderer
                    templateId={template.id}
                    data={data}
                    className="w-[210mm] min-h-[297mm] overflow-hidden bg-white"
                />
            ) : (
                <div className="w-[210mm] min-h-[297mm] bg-neutral-100 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-6 text-neutral-400">
                        <div className="w-20 h-20 border-[6px] border-neutral-200 border-t-neutral-400 rounded-full animate-spin" />
                    </div>
                </div>
            )}
        </div>
    )
}
