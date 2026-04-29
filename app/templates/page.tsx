'use client'

import React, { useState, useMemo } from 'react'
import { SEO_TEMPLATES } from '@/lib/constants/templates-seo'
import { TemplatePreview } from '@/components/templates/TemplatePreview'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, LayoutGrid, Zap, ShieldCheck, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

// Extract unique industries for filters
const INDUSTRIES = ['All', ...Array.from(new Set(SEO_TEMPLATES.map(t => t.industry))).sort()]

export default function TemplatesGalleryPage() {
    const [activeIndustry, setActiveIndustry] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')

    // Deduplicate templates by templateId to avoid showing exact duplicates in the gallery
    // (Since SEO_TEMPLATES has many slugs mapping to the same templateId for SEO)
    const uniqueTemplates = useMemo(() => {
        const seen = new Set<string>()
        return SEO_TEMPLATES.filter(template => {
            // Give preference to non-location specific ones for the main gallery view if desired,
            // but simple deduplication by templateId works best for a visual gallery.
            // Wait, we WANT to show visual variety. Let's deduplicate by templateId 
            // so we don't have 10 identical thumbnails.
            if (seen.has(template.templateId)) return false
            seen.add(template.templateId)
            return true
        })
    }, [])

    const filteredTemplates = useMemo(() => {
        return uniqueTemplates.filter(template => {
            const matchesIndustry = activeIndustry === 'All' || template.industry === activeIndustry
            const matchesSearch = 
                template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.description.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesIndustry && matchesSearch
        })
    }, [activeIndustry, searchQuery, uniqueTemplates])

    return (
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-primary-500/30">
            {/* Premium Hero Section */}
            <header className="relative pt-32 pb-20 overflow-hidden">
                {/* Immersive Glassmorphism Backgrounds */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px]" />
                    <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-[150px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] text-neutral-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md"
                    >
                        <Zap className="w-3.5 h-3.5 text-primary-400 fill-primary-400" />
                        Live Interactive Gallery
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
                    >
                        ATS-Verified Layouts <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400 italic">Built for Humans.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 font-medium mb-12 leading-relaxed"
                    >
                        Browse our premium collection of ATS-compliant resume templates. 
                        Every design is engineered to bypass software filters while impressing human recruiters.
                    </motion.p>
                </div>
            </header>

            {/* Filter Navigation */}
            <div className="sticky top-[80px] z-40 bg-neutral-950/80 backdrop-blur-xl border-y border-white/5 py-5 mb-16">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Industry Filters */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar mask-edges">
                        {INDUSTRIES.map((industry) => (
                            <button
                                key={industry}
                                onClick={() => setActiveIndustry(industry)}
                                className={cn(
                                    "px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                                    activeIndustry === industry 
                                        ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                                        : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                {industry}
                            </button>
                        ))}
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full lg:w-[320px] group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-primary-400 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-10 py-3 text-sm text-white placeholder:text-neutral-600 outline-none focus:bg-white/10 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Template Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-32">
                <AnimatePresence mode='popLayout'>
                    {filteredTemplates.length > 0 ? (
                        <motion.div 
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12"
                        >
                            {filteredTemplates.map((template) => (
                                <motion.div 
                                    key={template.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative flex flex-col"
                                >
                                    {/* Template Preview Card */}
                                    <div className="relative rounded-[2rem] bg-white/5 border border-white/10 p-6 flex-1 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary-500/30 group-hover:bg-white/10 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                                        
                                        {/* Dynamic Glow Effect */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary-500/0 rounded-full blur-[80px] transition-colors duration-500 group-hover:bg-primary-500/10 pointer-events-none" />

                                        {/* Live Preview Wrapper */}
                                        <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105">
                                            {/* We use scale 0.33 for standard thumbnail size (approx 264x373) */}
                                            <TemplatePreview 
                                                templateId={template.templateId}
                                                sampleDataKey={template.sampleDataKey}
                                                scale={0.33}
                                                className="shadow-2xl shadow-black/50"
                                            />
                                        </div>

                                        {/* Hover Action Overlay */}
                                        <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 z-20 flex flex-col items-center justify-center gap-4 p-8">
                                            <Link href={`/templates/${template.slug}`} className="w-full">
                                                <Button className="w-full rounded-full bg-white text-black hover:bg-neutral-200 font-bold h-12 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                                    View Details
                                                </Button>
                                            </Link>
                                            <Link href="/editor/setup" className="w-full">
                                                <Button variant="outline" className="w-full rounded-full border-white/20 text-white hover:bg-white/10 font-bold h-12">
                                                    Use Template
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="mt-6 px-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-primary-400">
                                                {template.industry}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                                                <ShieldCheck className="w-3.5 h-3.5" />
                                                {template.atsScore}% ATS
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                                        <p className="text-sm text-neutral-400 line-clamp-2">{template.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-32 text-center"
                        >
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                                <Search className="w-8 h-8 text-neutral-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No templates found</h3>
                            <p className="text-neutral-400 max-w-sm mx-auto mb-8">
                                We couldn't find any layouts matching your criteria. Try a different search term or clear filters.
                            </p>
                            <Button 
                                variant="outline" 
                                onClick={() => { setSearchQuery(''); setActiveIndustry('All'); }}
                                className="rounded-full border-white/10 text-white hover:bg-white/10"
                            >
                                Clear All Filters
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Bottom CTA */}
            <section className="border-t border-white/5 bg-gradient-to-b from-neutral-950 to-neutral-900 pb-32 pt-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to stand out?</h2>
                    <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
                        Stop getting rejected by automated systems. Use our builder to craft a perfect, ATS-verified resume in minutes.
                    </p>
                    <Link href="/editor/setup">
                        <Button size="xl" className="h-16 px-12 rounded-full text-lg font-black bg-primary-600 hover:bg-primary-500 text-white shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:shadow-[0_0_60px_rgba(79,70,229,0.5)] transition-all hover:scale-105">
                            Build Your Resume Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
