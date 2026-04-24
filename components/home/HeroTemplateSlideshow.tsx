'use client'

import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { FileText } from 'lucide-react'
import { mockHeroResume } from '@/lib/config/mock-resume'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { templateRegistry } from '@/lib/templates/registry'

// Directly import only the 4 templates we need for the slideshow
// instead of going through TemplateRenderer which has heavy dynamic imports
import { ATSExecutiveTemplate } from '@/components/templates/ATSExecutiveTemplate'
import { ATSGoldStandardTemplate } from '@/components/templates/ATSGoldStandardTemplate'
import { ATSModernTemplate } from '@/components/templates/ATSModernTemplate'
import { ATSProfessionalTemplate } from '@/components/templates/ATSProfessionalTemplate'

const TemplatePreviewDialog = dynamic(
    () => import('@/components/home/TemplatePreviewDialog').then(m => ({ default: m.TemplatePreviewDialog })),
    { ssr: false }
)

const FEATURED_TEMPLATES = [
    { id: 'ats-executive', name: 'ATS Executive', Component: ATSExecutiveTemplate },
    { id: 'ats-gold-standard', name: 'ATS Gold Standard', Component: ATSGoldStandardTemplate },
    { id: 'ats-modern', name: 'ATS Modern', Component: ATSModernTemplate },
    { id: 'ats-professional', name: 'ATS Professional', Component: ATSProfessionalTemplate },
]

const SLIDE_DURATION = 5000 // 5 seconds per slide

export function HeroTemplateSlideshow() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [previewId, setPreviewId] = useState<string | null>(null)
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

    // Transition to next slide
    const advanceSlide = useCallback(() => {
        setIsTransitioning(true)
        setTimeout(() => {
            setActiveIndex(prev => (prev + 1) % FEATURED_TEMPLATES.length)
            setTimeout(() => setIsTransitioning(false), 100)
        }, 500)
    }, [])

    // Start/restart the auto-advance timer
    const startTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(advanceSlide, SLIDE_DURATION)
    }, [advanceSlide])

    // Auto-advance slides on mount
    useEffect(() => {
        startTimer()
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [startTimer])

    const goToSlide = useCallback((index: number) => {
        if (index === activeIndex || isTransitioning) return
        setIsTransitioning(true)
        setTimeout(() => {
            setActiveIndex(index)
            setTimeout(() => setIsTransitioning(false), 100)
        }, 500)
        // Reset the timer so it doesn't immediately advance after manual click
        startTimer()
    }, [activeIndex, isTransitioning, startTimer])

    const currentTemplate = FEATURED_TEMPLATES[activeIndex]

    return (
        <>
            <div className="relative w-full max-w-[420px] aspect-[21/29.7] animate-float">
                {/* Back Glow */}
                <div className="absolute inset-0 bg-primary-500/30 blur-[100px] rounded-full" />

                {/* Back Card 1 */}
                <div className="absolute inset-0 -right-8 -top-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 rotate-6 scale-95 opacity-50" />
                {/* Back Card 2 */}
                <div className="absolute inset-0 -left-8 -bottom-8 bg-indigo-500/10 backdrop-blur-3xl rounded-2xl border border-indigo-500/20 -rotate-3 scale-95 opacity-70" />

                {/* Main Card */}
                <div
                    className="relative z-10 w-full h-full bg-white rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden cursor-pointer group transition-transform duration-700 hover:rotate-2 hover:scale-105"
                    onClick={() => setPreviewId(currentTemplate.id)}
                >
                    {/* Hover shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30 pointer-events-none" />

                    {/* CSS Transform Scaled Live Template */}
                    <div className={cn(
                        "absolute inset-0 bg-white z-10 transition-all duration-500 ease-in-out",
                        isTransitioning ? "opacity-0 scale-[0.96]" : "opacity-100 scale-100"
                    )}>
                        <div 
                            key={currentTemplate.id}
                            className="bg-white pointer-events-none px-12 py-14"
                            style={{
                                width: '794px',
                                height: '1123px',
                                transform: 'scale(0.529)',
                                transformOrigin: 'top left',
                            }}
                        >
                            {currentTemplate.Component && <currentTemplate.Component data={mockHeroResume} />}
                        </div>
                    </div>

                    {/* Glass Overlay Card */}
                    <div className="absolute inset-x-6 bottom-6 p-6 bg-neutral-900/80 backdrop-blur-2xl rounded-2xl border border-white/10 group-hover:translate-y-[-8px] transition-transform duration-500 flex items-center gap-4 z-30">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-xl">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-0.5">Featured Design</p>
                            <h4 className={cn(
                                "text-lg font-black text-white transition-all duration-400",
                                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                            )}>{currentTemplate.name}</h4>
                        </div>
                    </div>
                </div>

                {/* Slide indicator dots */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40">
                    {FEATURED_TEMPLATES.map((template, idx) => (
                        <button
                            key={template.id}
                            onClick={() => goToSlide(idx)}
                            className={cn(
                                "relative h-2 rounded-full transition-all duration-500 group/dot",
                                idx === activeIndex
                                    ? "w-8 bg-primary-500 shadow-[0_0_12px_rgba(79,70,229,0.6)]"
                                    : "w-2 bg-white/30 hover:bg-white/60"
                            )}
                            aria-label={`View ${template.name}`}
                        >
                            {/* Progress bar on active dot */}
                            {idx === activeIndex && (
                                <div
                                    className="absolute inset-0 rounded-full bg-white/40 origin-left"
                                    style={{
                                        animation: `slideProgress ${SLIDE_DURATION}ms linear`,
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Preview Dialog */}
            {previewId && (
                <Suspense fallback={null}>
                    <TemplatePreviewDialog
                        key={previewId}
                        isOpen={!!previewId}
                        onClose={() => setPreviewId(null)}
                        template={templateRegistry.find(t => t.id === previewId) || null}
                        initialColor={undefined}
                    />
                </Suspense>
            )}
        </>
    )
}
