'use client'

import React, { useState, useEffect } from 'react'
import { X, Check, FileText, Globe, Download, Lock } from 'lucide-react'
import { TemplateMetadata } from '@/lib/types/resume'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import {
    MOCK_PREVIEW_DATA,
    MOCK_EXECUTIVE_DATA,
    MOCK_GRADUATE_DATA,
    MOCK_NURSE_EXPERIENCED_DATA,
    MOCK_TECHNICAL_DATA,
    MOCK_HOSPITALITY_DATA,
    MOCK_CRUISE_DATA,
    MOCK_ACADEMIC_DATA,
    MOCK_CORPORATE_DATA,
    MOCK_LEGAL_DATA,
    MOCK_FASHION_DATA,
    MOCK_ATS_PROFESSIONAL_DATA,
    MOCK_ATS_MINIMAL_DATA,
    MOCK_ATS_EXECUTIVE_DATA,
    MOCK_ATS_MODERN_DATA,
    MOCK_ATS_GRADUATE_DATA,
    MOCK_ATS_TIMELINE_DATA,
    MOCK_SERVICE_PRO_DATA,
    MOCK_TECHNICAL_TEMPLATE_DATA,
    MOCK_EXECUTIVE_TEMPLATE_DATA,
    MOCK_CREATIVE_TEMPLATE_DATA,
    MOCK_PROFESSIONAL_TEMPLATE_DATA,
    MOCK_LUXE_TEMPLATE_DATA,
    MOCK_STARTUP_TEMPLATE_DATA,
    MOCK_ARTISAN_TEMPLATE_DATA,
    MOCK_SPLIT_CONTRAST_DATA,
    MOCK_COMPACT_TEMPLATE_DATA,
    MOCK_GRADUATE_TEMPLATE_DATA,
    MOCK_CUTE_TEMPLATE_DATA
} from '@/lib/constants/mock-data'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

// Dynamically import PDF components with SSR disabled
const PDFPreview = dynamic(() => import('./PDFPreview'), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center h-full w-full bg-white rounded-lg border border-neutral-200 gap-4">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Preparing PDF Engine...</p>
        </div>
    )
})

const SafePDFDownloadButton = dynamic(() => import('../pdf/PDFDownloadButton').then(mod => mod.PDFDownloadButton), {
    ssr: false,
    loading: () => <Button disabled className="w-full py-5 opacity-50">Loading...</Button>
})

interface TemplatePreviewDialogProps {
    isOpen: boolean
    onClose: () => void
    template: TemplateMetadata | null
    initialColor?: string
}

export function TemplatePreviewDialog({ isOpen, onClose, template, initialColor }: TemplatePreviewDialogProps) {
    const { user } = useAuth()
    const [viewMode, setViewMode] = useState<'web' | 'pdf'>('web')
    const [isMounted, setIsMounted] = useState(false)
    const [selectedColor, setSelectedColor] = useState<string>(initialColor || 'standard')

    // Sync local color with prop when template changes or initialColor changes
    useEffect(() => {
        if (initialColor) {
            setSelectedColor(initialColor)
        }
    }, [initialColor, template?.id])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Memoize data with the selected template ID to prevent infinite re-renders
    const previewData = React.useMemo(() => {
        if (!template) return MOCK_EXECUTIVE_DATA

        // Correctly compose the ID for the renderer: baseId-colorVariantId
        const colorId = selectedColor
        const effectiveTemplateId = colorId && colorId !== 'standard' && colorId !== 'std' && colorId !== 'clean'
            ? `${template.id}-${colorId}`
            : template.id

        // Diversify content based on template personality
        let baseData = MOCK_PREVIEW_DATA

        // ATS templates - use dedicated ATS mock data
        if (template.id.startsWith('ats-')) {
            if (template.id.includes('nursing')) baseData = MOCK_NURSE_EXPERIENCED_DATA
            else if (template.id.includes('professional')) baseData = MOCK_ATS_PROFESSIONAL_DATA
            else if (template.id.includes('technical')) baseData = MOCK_TECHNICAL_DATA
            else if (template.id.includes('standard')) baseData = MOCK_CORPORATE_DATA
            else if (template.id.includes('classic')) baseData = MOCK_LEGAL_DATA
            else if (template.id.includes('executive')) baseData = MOCK_ATS_EXECUTIVE_DATA
            else if (template.id.includes('graduate')) baseData = MOCK_ATS_GRADUATE_DATA
            else if (template.id.includes('modern')) baseData = MOCK_ATS_MODERN_DATA
            else if (template.id.includes('mini')) baseData = MOCK_ATS_MINIMAL_DATA
            else if (template.id.includes('timeline')) baseData = MOCK_ATS_TIMELINE_DATA
            else baseData = MOCK_CORPORATE_DATA
        } else {
            // Visual templates - use dedicated template mock data
            if (template.id.includes('nursing')) baseData = MOCK_NURSE_EXPERIENCED_DATA
            else if (template.id === 'technical') baseData = MOCK_TECHNICAL_TEMPLATE_DATA
            else if (template.id === 'executive') baseData = MOCK_EXECUTIVE_TEMPLATE_DATA
            else if (template.id === 'creative') baseData = MOCK_CREATIVE_TEMPLATE_DATA
            else if (template.id === 'professional') baseData = MOCK_PROFESSIONAL_TEMPLATE_DATA
            else if (template.id === 'luxe') baseData = MOCK_LUXE_TEMPLATE_DATA
            else if (template.id === 'startup' || template.id === 'startups') baseData = MOCK_STARTUP_TEMPLATE_DATA
            else if (template.id === 'artisan') baseData = MOCK_ARTISAN_TEMPLATE_DATA
            else if (template.id === 'split-contrast') baseData = MOCK_SPLIT_CONTRAST_DATA
            else if (template.id === 'compact') baseData = MOCK_COMPACT_TEMPLATE_DATA
            else if (template.id === 'graduate') baseData = MOCK_GRADUATE_TEMPLATE_DATA
            else if (template.id === 'minimal') baseData = MOCK_ATS_MINIMAL_DATA
            else if (template.id === 'cute') baseData = MOCK_CUTE_TEMPLATE_DATA
            else if (template.id === 'modern') baseData = MOCK_CORPORATE_DATA
            else if (template.id === 'classic') baseData = MOCK_LEGAL_DATA
            else if (template.id === 'chic') baseData = MOCK_FASHION_DATA
            else if (template.id === 'academic') baseData = MOCK_ACADEMIC_DATA
            // Industry-specific templates
            else if (template.id === 'hospitality-elite') baseData = MOCK_HOSPITALITY_DATA
            else if (template.id === 'cruise-excellence') baseData = MOCK_CRUISE_DATA
            else if (template.id === 'service-pro') baseData = MOCK_SERVICE_PRO_DATA
        }

        return {
            ...baseData,
            templateId: effectiveTemplateId
        }
    }, [template, selectedColor])

    if (!template) return null

    return (
        <div className={cn(
            "fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 transition-all duration-500",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Dialog Panel */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-neutral-100 bg-white z-20">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-neutral-900 leading-tight">{template.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{template.suitableFor.careerLevels[0]} Level</span>
                                <span className="text-neutral-300">•</span>
                                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">Live Preview</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View Switcher */}
                        <div className="flex bg-neutral-100 p-1 rounded-xl mr-2">
                            <button
                                onClick={() => setViewMode('web')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'web' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                            >
                                <Globe className="w-3.5 h-3.5" />
                                Browser View
                            </button>
                            <button
                                onClick={() => setViewMode('pdf')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'pdf' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                            >
                                <FileText className="w-3.5 h-3.5" />
                                PDF View
                            </button>
                        </div>

                        {user ? (
                            <Link href={`/editor/setup?template=${template.id}&color=${initialColor || 'standard'}`}>
                                <Button size="lg" className="shadow-lg shadow-primary-200">
                                    Customize Template
                                </Button>
                            </Link>
                        ) : (
                            <Link href={`/editor/setup?template=${template.id}&color=${initialColor || 'standard'}`}>
                                <Button size="lg" className="shadow-lg shadow-primary-200">
                                    Customize Template
                                </Button>
                            </Link>
                        )}

                        <button
                            onClick={onClose}
                            className="p-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-200"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden flex bg-neutral-50">
                    {/* Sidebar Info */}
                    <div className="w-72 bg-white border-r border-neutral-100 p-8 overflow-y-auto hidden xl:block shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
                        <section className="mb-10">
                            <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Export Settings</h4>
                            <div className="space-y-3">
                                <div className="p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-neutral-700">Format</span>
                                        <span className="text-[10px] font-black text-primary-600 uppercase bg-primary-50 px-1.5 py-0.5 rounded">PDF v1.7</span>
                                    </div>
                                    <p className="text-[10px] text-neutral-500 leading-relaxed font-medium">Standard ATS-compliant document structure.</p>
                                    <SafePDFDownloadButton
                                        key={template.id}
                                        data={previewData}
                                        fileName={`${template.name.replace(/\s+/g, '_')}_Preview.pdf`}
                                    />
                                </div>

                                <div className="p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
                                    <p className="text-[10px] text-neutral-500 leading-relaxed italic">
                                        PDF generation uses standard formatting for this preview.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-10">
                            <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Suitability</h4>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-bold text-neutral-500 mb-3 ml-1">TOP INDUSTRIES</p>
                                    <div className="flex flex-wrap gap-2">
                                        {template.suitableFor.industries?.map(ind => (
                                            <span key={ind} className="px-2.5 py-1 rounded-md bg-neutral-100 text-[10px] font-bold text-neutral-600">{ind}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {template.colors && template.colors.length > 0 && (
                            <section>
                                <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">Color Palette</h4>
                                <div className="flex flex-wrap gap-2.5">
                                    {template.colors.map((color: any) => (
                                        <button
                                            key={color.id}
                                            onClick={() => setSelectedColor(color.id)}
                                            className={cn(
                                                "w-8 h-8 rounded-full border-2 transition-all p-0.5",
                                                (selectedColor === color.id)
                                                    ? "border-primary-600 scale-110 shadow-lg"
                                                    : "border-transparent opacity-60 hover:opacity-100"
                                            )}
                                            title={color.name}
                                        >
                                            <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Preview Canvas */}
                    <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-neutral-200/30 bg-[radial-gradient(#d1d1d1_1px,transparent_1px)] [background-size:24px_24px]">
                        {viewMode === 'web' ? (
                            <div className="origin-top scale-[0.6] sm:scale-[0.8] lg:scale-[0.9] xl:scale-[1.0] transition-all duration-500">
                                <TemplateRenderer
                                    templateId={previewData.templateId}

                                    data={previewData}
                                    className="shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] ring-1 ring-neutral-200/50"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full max-w-4xl">
                                {isMounted && (
                                    <PDFPreview
                                        data={previewData}
                                        isAuthenticated={!!user}
                                        templateName={template.name}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
