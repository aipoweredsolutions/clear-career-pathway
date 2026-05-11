'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Check, FileText, Lock, Sparkles } from 'lucide-react'
import { TemplateMetadata } from '@/lib/types/resume'
import {
    MOCK_EXECUTIVE_DATA
} from '@/lib/constants/mock-data'
import { getSampleDataForTemplate } from '@/lib/utils/template-sample-data'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

import { TemplateRenderer } from '@/components/templates/TemplateRenderer'


interface TemplatePreviewDialogProps {
    isOpen: boolean
    onClose: () => void
    template: TemplateMetadata | null
    initialColor?: string
}

export function TemplatePreviewDialog({ isOpen, onClose, template, initialColor }: TemplatePreviewDialogProps) {
    const { user } = useAuth()
    const [isMounted, setIsMounted] = useState(false)
    const [selectedColor, setSelectedColor] = useState<string>(initialColor || 'standard')
    const [numPages, setNumPages] = useState(1)
    const measureRef = React.useRef<HTMLDivElement>(null)

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
        let baseData = getSampleDataForTemplate(effectiveTemplateId)

        return {
            ...baseData,
            templateId: effectiveTemplateId,
            personalInfo: {
                ...baseData.personalInfo,
                fullName: 'Alexandra Morgan'
            }
        }
    }, [template, selectedColor])

    // Measure the template height dynamically to calculate how many A4 pages it spans
    useEffect(() => {
        if (!measureRef.current) return

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                // Use scrollHeight to capture the full overflowing content height if any
                const heightPx = entry.target.scrollHeight
                const visiblePageHeightPx = 287 * 3.7795275591 // 287mm visible content per page (5mm margins)
                setNumPages(Math.max(1, Math.ceil(heightPx / visiblePageHeightPx)))
            }
        })

        observer.observe(measureRef.current)

        return () => observer.disconnect()
    }, [isMounted, previewData])

    if (!template || !isMounted) return null

    const dialogContent = (
        <div className={cn(
            "fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 transition-all duration-500",
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

                    <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-neutral-200/30 bg-[radial-gradient(#d1d1d1_1px,transparent_1px)] [background-size:24px_24px]">
                        <div className="w-full flex justify-center pb-20">
                            {isMounted && (
                                <div className="flex flex-col gap-12 transform scale-[0.5] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 origin-top">
                                    
                                    {/* Hidden Measurement Container */}
                                    <div className="absolute top-0 left-0 w-[210mm] opacity-0 pointer-events-none z-[-1]" aria-hidden="true">
                                        <div ref={measureRef}>
                                            <TemplateRenderer templateId={previewData.templateId} data={previewData} />
                                        </div>
                                    </div>

                                    {/* Paginated Render */}
                                    {Array.from({ length: numPages }).map((_, i) => (
                                        <div key={i} className="bg-white shadow-2xl shrink-0 w-[210mm] h-[297mm] relative ring-1 ring-neutral-900/5 flex flex-col items-center justify-center">
                                            <div className="relative w-full h-[287mm] overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full" style={{ transform: `translateY(-${i * 287}mm)` }}>
                                                    <TemplateRenderer
                                                        templateId={previewData.templateId}
                                                        data={previewData}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return createPortal(dialogContent, document.body)
}
