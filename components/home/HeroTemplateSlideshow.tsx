'use client'

import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { templateRegistry } from '@/lib/templates/registry'
import { TemplateThumbnail } from './TemplateThumbnail'

const TemplatePreviewDialog = dynamic(
    () => import('@/components/home/TemplatePreviewDialog').then(m => ({ default: m.TemplatePreviewDialog })),
    { ssr: false }
)

const FEATURED_TEMPLATES = [
    { id: 'ats-cornerstone',    name: 'Cornerstone',     tag: 'Executive',   colorId: 'black' },
    { id: 'ats-meridian',       name: 'Meridian',        tag: 'Modern',      colorId: 'black'  },
    { id: 'prestige',           name: 'Prestige',        tag: 'Executive',   colorId: 'gold'  },
    { id: 'elegant-split',      name: 'Elegant Split',   tag: 'Creative',    colorId: 'slate' },
    { id: 'ats-classic-left',   name: 'Executive Left',  tag: 'Corporate',   colorId: 'navy'  },
    { id: 'ats-modern',         name: 'Modern',          tag: 'Minimal',     colorId: 'slate' },
    { id: 'elite-alpine',       name: 'Elite Alpine',    tag: 'Premium',     colorId: 'midnight' },
]

const SLIDE_DURATION = 3500

export function HeroTemplateSlideshow() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [prev, setPrev] = useState<number | null>(null)
    const [previewId, setPreviewId] = useState<string | null>(null)
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

    const advance = useCallback(() => {
        setActiveIndex(cur => {
            setPrev(cur)
            return (cur + 1) % FEATURED_TEMPLATES.length
        })
    }, [])

    const startTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(advance, SLIDE_DURATION)
    }, [advance])

    useEffect(() => {
        startTimer()
        return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }, [startTimer])

    const goTo = useCallback((i: number) => {
        if (i === activeIndex) return
        setPrev(activeIndex)
        setActiveIndex(i)
        startTimer()
    }, [activeIndex, startTimer])

    const current = FEATURED_TEMPLATES[activeIndex]
    const nextIdx = (activeIndex + 1) % FEATURED_TEMPLATES.length
    const prevIdx = (activeIndex + FEATURED_TEMPLATES.length - 1) % FEATURED_TEMPLATES.length

    return (
        <>
            <div className="relative w-full max-w-[380px]" style={{ aspectRatio: '21/29.7' }}>

                {/* Ambient glow */}
                <div className="absolute inset-[-20%] bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />

                {/* Back card — previous */}
                <div className="absolute inset-0 -left-10 top-4 rounded-xl overflow-hidden shadow-2xl z-0 pointer-events-none"
                    style={{ transform: 'rotate(-4deg) scale(0.92)', opacity: 0.4 }}>
                    <TemplateThumbnail
                        template={templateRegistry.find(t => t.id === FEATURED_TEMPLATES[prevIdx].id)!}
                        activeColorId={FEATURED_TEMPLATES[prevIdx].colorId}
                        priority={false}
                    />
                </div>

                {/* Back card — next */}
                <div className="absolute inset-0 -right-10 top-4 rounded-xl overflow-hidden shadow-2xl z-0 pointer-events-none"
                    style={{ transform: 'rotate(4deg) scale(0.92)', opacity: 0.4 }}>
                    <TemplateThumbnail
                        template={templateRegistry.find(t => t.id === FEATURED_TEMPLATES[nextIdx].id)!}
                        activeColorId={FEATURED_TEMPLATES[nextIdx].colorId}
                        priority={false}
                    />
                </div>

                {/* Main card */}
                <div
                    className="relative z-10 w-full h-full rounded-2xl overflow-hidden cursor-pointer group transition-transform duration-500 hover:scale-[1.05]"
                    style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)' }}
                    onClick={() => setPreviewId(current.id)}
                >
                    {/* Template slides — stack with CSS animation */}
                    {FEATURED_TEMPLATES.map((tpl, i) => {
                        const isActive = i === activeIndex
                        const isPrev  = i === prev
                        return (
                            <div
                                key={tpl.id}
                                className="absolute inset-0"
                                style={{
                                    opacity:   isActive ? 1 : 0,
                                    transform: isActive ? 'scale(1)' : isPrev ? 'scale(1.04)' : 'scale(0.96)',
                                    transition: 'opacity 600ms ease, transform 600ms ease',
                                    zIndex: isActive ? 2 : 1,
                                }}
                            >
                                <TemplateThumbnail
                                    template={templateRegistry.find(t => t.id === tpl.id)!}
                                    activeColorId={tpl.colorId}
                                    priority={i === 0}
                                />
                            </div>
                        )
                    })}

                    {/* Hover shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

                    {/* Bottom info bar */}
                    <div className="absolute inset-x-0 bottom-0 z-20 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-400 block mb-1">
                                    {current.tag}
                                </span>
                                <h4 className="text-lg font-black text-white leading-none transition-all duration-400">
                                    {current.name}
                                </h4>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                                Preview →
                            </div>
                        </div>

                        {/* Progress dots */}
                        <div className="flex items-center gap-1.5 mt-4">
                            {FEATURED_TEMPLATES.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={e => { e.stopPropagation(); goTo(idx) }}
                                    className={cn(
                                        'h-1 rounded-full transition-all duration-500',
                                        idx === activeIndex
                                            ? 'w-6 bg-white'
                                            : 'w-1.5 bg-white/30 hover:bg-white/50'
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

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
