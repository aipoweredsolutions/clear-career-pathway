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
import { TemplateMetadata, ResumeDocument } from '@/lib/types/resume'
import { Lock, Sparkles } from 'lucide-react'
import { calculateTemplateMatchScore } from '@/lib/templates/matching'
import { useAuth } from '@/components/auth/AuthProvider'

interface TemplateSelectorProps {
    currentTemplateId: string
    onSelect: (templateId: string) => void
    realData?: ResumeDocument | null
}

import { getMockDataForTemplate } from '@/lib/utils/template-helpers'

const getPreviewData = (templateId: string, realData?: ResumeDocument | null) => {
    if (realData) {
        return { ...realData, templateId }
    }
    return getMockDataForTemplate(templateId)
}

export function TemplateSelector({ currentTemplateId, onSelect, realData }: TemplateSelectorProps) {
    const { profile } = useAuth()
    const [previewTemplate, setPreviewTemplate] = useState<TemplateMetadata | null>(null)
    const [paperSize, setPaperSize] = useState<'letter' | 'a4'>('a4')
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [isMaximized, setIsMaximized] = useState(false)
    const contentRef = React.useRef<HTMLDivElement>(null)

    // Hover-to-maximize preview state
    const [hoverTemplate, setHoverTemplate] = useState<TemplateMetadata | null>(null)
    const hoverTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const hoverCardRef = React.useRef<HTMLButtonElement | null>(null)

    const handleHoverEnter = React.useCallback((template: TemplateMetadata, el: HTMLButtonElement) => {
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
        hoverCardRef.current = el
        hoverTimerRef.current = setTimeout(() => {
            setHoverTemplate(template)
        }, 400) // 400ms delay to avoid accidental triggers
    }, [])

    const handleHoverLeave = React.useCallback(() => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current)
            hoverTimerRef.current = null
        }
    }, [])

    const dismissHoverPreview = React.useCallback(() => {
        setHoverTemplate(null)
        hoverCardRef.current = null
    }, [])

    const isPro = profile?.subscription_tier === 'pro' || profile?.subscription_tier === 'enterprise'

    const handleSelect = () => {
        if (previewTemplate) {
            if (previewTemplate.isPremium && !isPro) {
                toast.error('This is a premium template. Please upgrade to Pro to unlock it.', {
                    description: 'Get access to our full library of ATS-optimized designs.',
                    action: {
                        label: 'Upgrade Now',
                        onClick: () => window.location.href = '/pricing'
                    }
                })
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

    const [activeCategory, setActiveCategory] = useState<'all' | 'ats' | 'creative' | 'academic' | 'executive'>('all')

    const filteredTemplates = React.useMemo(() => {
        return templateRegistry.filter(t => {
            if (activeCategory === 'all') return true
            if (activeCategory === 'ats') return t.atsCompliant !== false
            if (activeCategory === 'creative') return t.id === 'elegant-split' || t.id === 'prestige' || t.id.includes('bauhaus') || t.id.includes('masthead') || t.atsCompliant === false
            if (activeCategory === 'academic') return t.id.includes('academia') || t.id.includes('scholar')
            if (activeCategory === 'executive') return t.id.includes('executive') || t.id.includes('elite') || t.id.includes('stately')
            return true
        })
    }, [activeCategory])

    const { atsTemplates, designTemplates } = React.useMemo(() => {
        return {
            atsTemplates: filteredTemplates.filter(t => t.atsCompliant !== false),
            designTemplates: filteredTemplates.filter(t => t.atsCompliant === false)
        }
    }, [filteredTemplates])

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
                            {previewTemplate.isPremium && !isPro ? (
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

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200">
                {(['all', 'ats', 'executive', 'creative', 'academic'] as const).map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex-1",
                            activeCategory === cat 
                                ? "bg-white text-neutral-900 shadow-sm ring-1 ring-neutral-200" 
                                : "text-neutral-500 hover:text-neutral-900 hover:bg-white/50"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {atsTemplates.map((template) => (
                    <TemplateCard 
                        key={template.id}
                        template={template}
                        currentTemplateId={currentTemplateId}
                        isPro={isPro}
                        realData={realData}
                        onPreview={setPreviewTemplate}
                        onSelect={onSelect}
                        handleHoverEnter={handleHoverEnter}
                        handleHoverLeave={handleHoverLeave}
                        recommendations={recommendations}
                        topMatches={topMatches}
                        matchPercentage={Math.min(100, Math.round(((recommendations.find(r => r.id === template.id)?.score || 0) / 10) * 100))}
                    />
                ))}
            </div>

            {designTemplates.length > 0 && (
                <div className="mt-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px flex-1 bg-neutral-200" />
                        <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] whitespace-nowrap">
                            Design Templates (Non-ATS)
                        </h3>
                        <div className="h-px flex-1 bg-neutral-200" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 opacity-90">
                        {designTemplates.map((template) => (
                            <TemplateCard 
                                key={template.id}
                                template={template}
                                currentTemplateId={currentTemplateId}
                                isPro={isPro}
                                realData={realData}
                                onPreview={setPreviewTemplate}
                                onSelect={onSelect}
                                handleHoverEnter={handleHoverEnter}
                                handleHoverLeave={handleHoverLeave}
                                recommendations={recommendations}
                                topMatches={topMatches}
                                matchPercentage={Math.min(100, Math.round(((recommendations.find(r => r.id === template.id)?.score || 0) / 10) * 100))}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* ═══ Hover-to-Maximize Preview Overlay ═══ */}
            {hoverTemplate && (
                <div 
                    className="fixed inset-0 z-[200] flex items-center justify-center animate-in fade-in duration-200"
                    onClick={dismissHoverPreview}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm" />

                    {/* Preview Card */}
                    <div 
                        className="relative z-10 flex flex-col items-center animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Info Bar */}
                        <div className="bg-white/95 backdrop-blur-xl rounded-t-2xl px-6 py-3 flex items-center justify-between w-[520px] border border-neutral-200 border-b-0 shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                                    <File className="w-4 h-4 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-900 leading-tight">{hoverTemplate.name}</h3>
                                    <p className="text-[10px] text-neutral-400 font-medium">
                                        {hoverTemplate.suitableFor.industries?.slice(0, 3).join(' · ')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {hoverTemplate.isPremium && (
                                    <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-1 rounded-md font-black uppercase tracking-widest border border-amber-200">Pro</span>
                                )}
                                <button 
                                    onClick={dismissHoverPreview}
                                    className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-neutral-400" />
                                </button>
                            </div>
                        </div>

                        {/* Full-Size Template Preview */}
                        <div className="w-[520px] h-[720px] bg-white overflow-hidden shadow-2xl border border-neutral-200 rounded-b-2xl relative">
                            <div className="origin-top-left absolute top-0 left-0 scale-[0.65] w-[210mm] min-h-[297mm]">
                                <TemplateRenderer
                                    templateId={hoverTemplate.id}
                                    data={getPreviewData(hoverTemplate.id, realData)}
                                    className="w-[210mm] min-h-[297mm] bg-white"
                                />
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center gap-3 mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    dismissHoverPreview()
                                    setPreviewTemplate(hoverTemplate)
                                }}
                                className="rounded-xl bg-white/90 backdrop-blur-md border-white/40 text-neutral-700 hover:bg-white shadow-lg text-xs font-bold gap-2"
                            >
                                <Maximize2 className="w-3.5 h-3.5" />
                                Full Preview
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                    if (hoverTemplate.isPremium && !isPro) {
                                        toast.error('This is a premium template. Please upgrade to Pro.', {
                                            action: {
                                                label: 'Upgrade',
                                                onClick: () => window.location.href = '/pricing'
                                            }
                                        })
                                        return
                                    }
                                    onSelect(hoverTemplate.id)
                                    dismissHoverPreview()
                                }}
                                className="rounded-xl shadow-lg text-xs font-bold gap-2"
                            >
                                <Check className="w-3.5 h-3.5" />
                                Use This Template
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function TemplateCard({ 
    template, 
    currentTemplateId, 
    isPro, 
    realData, 
    onPreview, 
    onSelect, 
    handleHoverEnter, 
    handleHoverLeave,
    recommendations,
    topMatches,
    matchPercentage
}: { 
    template: TemplateMetadata, 
    currentTemplateId: string, 
    isPro: boolean, 
    realData: any, 
    onPreview: (t: TemplateMetadata) => void,
    onSelect: (id: string) => void,
    handleHoverEnter: (t: TemplateMetadata, el: HTMLButtonElement) => void,
    handleHoverLeave: () => void,
    recommendations: any[],
    topMatches: string[],
    matchPercentage: number
}) {
    const isRecommended = topMatches.includes(template.id)
    
    return (
        <button
            key={template.id}
            onClick={() => onPreview(template)}
            onMouseEnter={(e) => handleHoverEnter(template, e.currentTarget)}
            onMouseLeave={handleHoverLeave}
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
            <div className="w-full aspect-[210/297] bg-white rounded-lg border border-neutral-200 mb-3 overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-[1.03] transition-all duration-500 relative">
                {template.previewImage ? (
                    <div className="relative w-full h-full">
                        <NextImage
                            src={template.previewImage}
                            alt={template.name}
                            fill
                            className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
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
                    <div className="absolute inset-0 bg-primary-600/5 ring-2 ring-inset ring-primary-600 z-10 animate-in fade-in duration-300" />
                )}

                {/* Lock Overlay for Premium Templates */}
                {template.isPremium && !isPro && (
                    <div className="absolute top-2 right-2 z-30 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center">
                        <Lock className="w-3 h-3 text-neutral-400" />
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <div className="bg-white/95 backdrop-blur-md text-primary-600 font-black text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-all border border-primary-100">
                        {template.isPremium && !isPro ? "View Details" : "Quick Preview"}
                    </div>
                </div>
            </div>

            <div className="w-full px-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-neutral-900 truncate">
                        {template.name}
                    </h3>
                    <div className="flex gap-1 flex-shrink-0">
                        {template.atsCompliant !== false ? (
                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider" title="100% ATS Compliant">
                                ATS
                            </span>
                        ) : (
                            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider cursor-help" title="Best for roles reviewed by humans. May not parse correctly in automated ATS systems.">
                                Design
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
