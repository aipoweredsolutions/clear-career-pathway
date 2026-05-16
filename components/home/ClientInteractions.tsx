'use client'

import React, { useState, useCallback, useMemo, Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { templateRegistry } from '@/lib/templates/registry'
import { TemplateThumbnail } from '@/components/home/TemplateThumbnail'
import { useAuth } from '@/components/auth/AuthProvider'
import { trackEvent } from '@/lib/utils/analytics'

// Lazy-load heavy components
const TemplatePreviewDialog = dynamic(
    () => import('@/components/home/TemplatePreviewDialog').then(m => ({ default: m.TemplatePreviewDialog })),
    { ssr: false }
)

const PricingCard = dynamic(
    () => import('@/components/pricing/PricingCard').then(m => ({ default: m.PricingCard })),
    { ssr: false, loading: () => <div className="h-96 bg-neutral-50 rounded-2xl animate-pulse" /> }
)

/** Small client wrapper for hero resume click */
export function HeroPreviewClick({ templateId, children }: { templateId: string; children: React.ReactNode }) {
    const [previewId, setPreviewId] = useState<string | null>(null)

    return (
        <>
            <div
                className="relative z-10 w-full h-full bg-white rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden cursor-pointer group transition-transform duration-700 hover:rotate-2 hover:scale-105"
                onClick={() => setPreviewId(templateId)}
            >
                {children}
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

/** Interactive template gallery with filters */
export function TemplateGallery() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [selectedLevel, setSelectedLevel] = useState<string>('All')
    const [templateColors, setTemplateColors] = useState<Record<string, string>>({})
    const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null)

    const categories = ['All', 'Executive Elite', 'Free', 'Essential', 'Modern Clean', 'Healthcare', 'Academic']
    const levels = ['All', 'Entry', 'Mid', 'Senior', 'Executive', 'Student']

    const filteredTemplates = useMemo(() => {
        const filtered = templateRegistry.filter(template => {
            if (template.id === 'ats-professional') return false; // Remove Professional Elite

            const categoryMatch = selectedCategory === 'All' ||
                (selectedCategory === 'Executive Elite' && (template.id.startsWith('elite-'))) ||
                (selectedCategory === 'Free' && !template.isPremium) ||
                (selectedCategory === 'Essential' && ['ats-professional', 'ats-minimal', 'ats-classic', 'ats-executive', 'ats-classic-left'].includes(template.id)) ||
                (selectedCategory === 'Modern Clean' && ['ats-modern', 'ats-timeline', 'classic-clean'].includes(template.id)) ||
                (selectedCategory === 'Healthcare' && ['ats-nursing', 'ats-standard-nursing'].includes(template.id)) ||
                (selectedCategory === 'Academic' && template.id === 'ats-academia');

            const levelMatch = selectedLevel === 'All' ||
                template.suitableFor.careerLevels.some(l => l.toLowerCase() === selectedLevel.toLowerCase());

            return categoryMatch && levelMatch
        })

        // Sorting logic: Elite ATS-Compliant first, then Premium, then Free
        const eliteIds = [
            'ats-cornerstone',
            'ats-meridian',
            'elite-sterling', 
            'elite-london', 
            'elite-haskins', 
            'elite-parker', 
            'ats-timeline',
            'ats-executive',
            'ats-classic'
        ]

        return filtered.sort((a, b) => {
            const aEliteIndex = eliteIds.indexOf(a.id)
            const bEliteIndex = eliteIds.indexOf(b.id)

            // If both are elite, sort by their position in the eliteIds array
            if (aEliteIndex !== -1 && bEliteIndex !== -1) return aEliteIndex - bEliteIndex
            // If only A is elite, it comes first
            if (aEliteIndex !== -1) return -1
            // If only B is elite, it comes first
            if (bEliteIndex !== -1) return 1

            // Then sort by Premium status
            if (a.isPremium && !b.isPremium) return -1
            if (!a.isPremium && b.isPremium) return 1

            return 0
        })
    }, [selectedCategory, selectedLevel])

    const sliderRef = React.useRef<HTMLDivElement>(null)
    const isPausedRef = React.useRef(false)

    // Auto-scroll effect for the slideshow
    React.useEffect(() => {
        const interval = setInterval(() => {
            const container = sliderRef.current
            if (container && !isPausedRef.current) {
                const maxScroll = container.scrollWidth - container.clientWidth
                if (container.scrollLeft >= maxScroll - 50) {
                    container.scrollTo({ left: 0, behavior: 'smooth' })
                } else {
                    container.scrollBy({ left: 400, behavior: 'smooth' })
                }
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const handleColorSelect = useCallback((templateId: string, colorId: string) => {
        setTemplateColors(prev => ({ ...prev, [templateId]: colorId }))
    }, [])

    const getActiveColor = useCallback((tId: string, colors: any[]) => {
        return templateColors[tId] || (colors && colors[0]?.id) || 'standard'
    }, [templateColors])

    const handlePreview = useCallback((id: string) => {
        setPreviewTemplateId(id)
        try { trackEvent('template_preview', { templateId: id }) }
        catch (error) { console.error("Analytics error:", error) }
    }, [])

    const handleUseTemplate = useCallback((id: string) => {
        trackEvent('template_use', { templateId: id })
    }, [])

    return (
        <section id="templates" className="py-20 bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-4 font-serif">Curated Template Gallery</h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Choose from our collection of unique, professionally designed layouts. Customize colors to match your personal brand.
                    </p>
                </div>

                <div className="mb-16 flex flex-col xl:flex-row justify-center items-center gap-4 glass p-4 rounded-[2rem] border-white/50 max-w-7xl w-full mx-auto sticky top-28 z-40 shadow-2xl shadow-neutral-200/50">
                    <div className="flex items-center gap-3 text-neutral-400 font-black uppercase tracking-widest text-[10px] shrink-0">
                        <Filter className="w-5 h-5 text-primary-500" />
                        <span>Refine:</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)} className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border", selectedCategory === cat ? "bg-neutral-900 text-white border-neutral-900 shadow-xl scale-105" : "bg-white text-neutral-500 border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50")}>{cat}</button>
                        ))}
                    </div>
                    <div className="h-8 w-px bg-neutral-200 hidden xl:block" />
                    <div className="flex flex-wrap justify-center gap-1.5">
                        {levels.map(lvl => (
                            <button key={lvl} onClick={() => setSelectedLevel(lvl)} className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border", selectedLevel === lvl ? "bg-primary-600 text-white border-primary-600 shadow-xl scale-105" : "bg-white text-neutral-500 border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50")}>{lvl}</button>
                        ))}
                    </div>
                </div>

                <div 
                    className="relative group/gallery min-h-[600px]"
                    onMouseEnter={() => isPausedRef.current = true}
                    onMouseLeave={() => isPausedRef.current = false}
                >
                    <div className="overflow-hidden py-12 px-4 -mx-4">
                        <div 
                            ref={sliderRef}
                            className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
                        >
                            {filteredTemplates.map((template) => (
                                <div 
                                    key={template.id} 
                                    className="snap-center shrink-0 w-[300px] md:w-[380px] group glass rounded-[2.5rem] overflow-hidden hover:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-neutral-100 flex flex-col bg-white"
                                >
                                    <div 
                                        className="relative bg-neutral-100 overflow-hidden cursor-pointer group/preview-box m-4 rounded-[1.75rem] shadow-inner" 
                                        style={{ aspectRatio: '210/297' }} 
                                        onClick={() => handlePreview(template.id)}
                                    >
                                        <TemplateThumbnail 
                                            template={template} 
                                            activeColorId={getActiveColor(template.id, template.colors || [])} 
                                            className="group-hover/preview-box:scale-110 transition-transform duration-700" 
                                        />
                                        <div className="absolute inset-0 bg-neutral-950/0 group-hover/preview-box:bg-neutral-950/5 transition-all duration-500 flex items-center justify-center opacity-0 group-hover/preview-box:opacity-100 z-10 pointer-events-none group-hover/preview-box:pointer-events-auto">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handlePreview(template.id) }} 
                                                className="bg-white text-neutral-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-neutral-100 transform translate-y-8 group-hover/preview-box:translate-y-0 transition-all duration-500 hover:scale-110 active:scale-95"
                                            >
                                                Quick Preview
                                            </button>
                                        </div>
                                        {template.isPremium ? (
                                            <div className="absolute top-6 right-6 bg-gradient-to-br from-amber-400 to-orange-500 text-white p-2.5 rounded-2xl shadow-xl z-10 animate-float" title="Premium Template">
                                                <Star className="w-5 h-5 fill-white" />
                                            </div>
                                        ) : (
                                            <div className="absolute top-6 left-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-xl z-10 animate-float" title="Free Template">
                                                Free
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8 pt-4 flex flex-col flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-black text-neutral-950 tracking-tight">{template.name}</h3>
                                            <div className="flex gap-1.5 mt-1.5">
                                                {template.colors && template.colors.slice(0, 3).map(color => (
                                                    <button 
                                                        key={color.id} 
                                                        onClick={(e) => { e.stopPropagation(); handleColorSelect(template.id, color.id) }} 
                                                        className={cn("w-5 h-5 rounded-lg border border-neutral-100 transition-all hover:scale-125", getActiveColor(template.id, template.colors!) === color.id ? "ring-2 ring-offset-2 ring-primary-500 scale-110" : "")} 
                                                        style={{ backgroundColor: color.hex }} 
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 font-medium mb-6">{template.description}</p>

                                        <div className="mt-auto flex flex-col gap-4">
                                            <div className="flex flex-wrap gap-2">
                                                {template.suitableFor.careerLevels.slice(0, 1).map(level => <span key={level} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-neutral-100 text-neutral-500 rounded-lg">{level}</span>)}
                                                {template.suitableFor.jobTypes.slice(0, 1).map(type => <span key={type} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg border border-primary-100">{type}</span>)}
                                            </div>
                                            <Link 
                                                href={`/editor/setup?template=${template.id}&color=${getActiveColor(template.id, template.colors || [])}`} 
                                                onClick={() => handleUseTemplate(template.id)} 
                                                className="block w-full text-center bg-neutral-950 text-white py-5 rounded-2xl hover:bg-neutral-800 transition-all duration-300 font-black text-sm uppercase tracking-widest shadow-xl shadow-neutral-900/10" 
                                                prefetch={false}
                                            >
                                                Build With This
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredTemplates.length === 0 && (
                                <div className="w-full py-20 text-center">
                                    <p className="text-xl text-neutral-500 font-medium">No templates found for this combination of filters.</p>
                                    <button onClick={() => { setSelectedCategory('All'); setSelectedLevel('All'); }} className="mt-4 text-primary-600 font-bold hover:underline">Reset Filters</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="absolute top-1/2 -left-4 -translate-y-1/2 opacity-0 group-hover/gallery:opacity-100 transition-opacity hidden lg:block z-50">
                        <button 
                            className="w-16 h-16 rounded-full bg-white shadow-2xl border border-neutral-100 flex items-center justify-center text-neutral-900 hover:bg-neutral-50 transition-colors" 
                            onClick={(e) => {
                                e.preventDefault();
                                sliderRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
                            }}
                        >
                            <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-0 group-hover/gallery:opacity-100 transition-opacity hidden lg:block z-50">
                        <button 
                            className="w-16 h-16 rounded-full bg-white shadow-2xl border border-neutral-100 flex items-center justify-center text-neutral-900 hover:bg-neutral-50 transition-colors" 
                            onClick={(e) => {
                                e.preventDefault();
                                sliderRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
                            }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {previewTemplateId && (
                <Suspense fallback={null}>
                    <TemplatePreviewDialog
                        key={previewTemplateId}
                        isOpen={!!previewTemplateId}
                        onClose={() => setPreviewTemplateId(null)}
                        template={templateRegistry.find(t => t.id === previewTemplateId) || null}
                        initialColor={getActiveColor(previewTemplateId, templateRegistry.find(t => t.id === previewTemplateId)?.colors || [])}
                    />
                </Suspense>
            )}
        </section>
    )
}

/** FAQ section with expandable items */
export function FAQSection() {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

    const toggleFaq = useCallback((index: number) => {
        if (expandedFaq !== index) {
            trackEvent('faq_expand', { faqIndex: index })
        }
        setExpandedFaq(prev => prev === index ? null : index)
    }, [expandedFaq])

    const faqs = [
        { q: "Are the resumes actually ATS-friendly?", a: "Yes. Every byte of our ATS-series templates is optimized for machine readability while preserving aesthetic excellence for human eyes." },
        { q: "Can I download my resume in multiple formats?", a: "Absolutely. Export your legacy in high-fidelity PDF or fully editable DOCX formats instantly." },
        { q: "Is my personal data secure?", a: "Security is non-negotiable. We use enterprise-grade encryption and never, ever sell your professional data." },
        { q: "Can I switch templates after entering my data?", a: "Yes. Our engine dynamically re-maps your data across all 20+ templates in real-time. No re-typing required." },
        { q: "Do you offer AI-powered bullet suggestions?", a: "Our AI is integrated directly into the core editor, turning passive duties into high-impact achievements as you type." }
    ]

    return (
        <div className="grid gap-6">
            {faqs.map((faq, i) => (
                <div key={i} className={cn("group p-8 rounded-[2.5rem] border transition-all duration-500 cursor-pointer overflow-hidden relative", expandedFaq === i ? "border-primary-100 bg-primary-50/20 shadow-2xl shadow-primary-100/20" : "border-neutral-100 bg-white hover:border-neutral-200")} onClick={() => toggleFaq(i)}>
                    <h4 className="text-2xl font-black text-neutral-950 flex justify-between items-center tracking-tight">
                        {faq.q}
                        <span className={cn("w-10 h-10 rounded-full flex items-center justify-center border border-neutral-200 transition-all text-neutral-400", expandedFaq === i ? "rotate-45 bg-primary-600 text-white border-primary-600" : "group-hover:bg-neutral-50")}>+</span>
                    </h4>
                    <div className={cn("grid transition-all duration-500", expandedFaq === i ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0")}>
                        <div className="overflow-hidden">
                            <p className="text-lg text-neutral-500 leading-relaxed font-medium">
                                {faq.a}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

/** Pricing section client wrapper */
export function PricingSection({ tiers }: { tiers: any[] }) {
    const { user } = useAuth()

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
                <Suspense key={tier.name} fallback={<div className="h-96 bg-neutral-50 rounded-2xl animate-pulse" />}>
                    <PricingCard tier={tier as any} isLoggedIn={!!user} />
                </Suspense>
            ))}
        </div>
    )
}
