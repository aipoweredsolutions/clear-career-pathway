'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, LayoutGrid, Zap, ShieldCheck, ArrowRight, X, Star } from 'lucide-react'
import { templateRegistry } from '@/lib/templates/registry'
import { cn } from '@/lib/utils'
import { TemplateThumbnail } from '@/components/home/TemplateThumbnail'

export default function TemplatesGalleryPage() {
    const [activeIndustry, setActiveIndustry] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const uniqueTemplates = templateRegistry

    const filteredTemplates = useMemo(() => {
        return uniqueTemplates.filter(template => {
            const isFree = !template.isPremium
            
            // Map the "industries" string to a category format
            const matchesIndustry = activeIndustry === 'All' || 
                                   (activeIndustry === 'Free' ? isFree : (template.suitableFor.industries?.some(ind => ind.toLowerCase() === activeIndustry.toLowerCase()) || false))
            
            const matchesSearch = 
                template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.description.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesIndustry && matchesSearch
        })
    }, [activeIndustry, searchQuery, uniqueTemplates])
    
    // Categories to display in the filter bar
    const filterCategories = ['All', 'Executive Leadership', 'Technology', 'Healthcare', 'Finance', 'Creative', 'Free']

    return (
        <div className="min-h-screen bg-white font-sans overflow-hidden">
            {/* --- Premium Ambient Background --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Primary Mesh Gradient */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.08),transparent_70%)] blur-[120px]"
                />
                {/* Secondary Accents */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="absolute bottom-[-10%] right-[-5%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)] blur-[100px]"
                />
                {/* Sophisticated Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:32px_32px]" />
                {/* Sharp Vertical Accents */}
                <div className="absolute left-[10%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-100 to-transparent opacity-50" />
                <div className="absolute right-[10%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-100 to-transparent opacity-50" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40">
                {/* --- Hero Section --- */}
                <header className="mb-24 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-[10px] font-black uppercase tracking-[0.25em] mb-10 shadow-2xl shadow-neutral-200"
                    >
                        <Zap className="w-3 h-3 fill-primary-400 text-primary-400" />
                        Engineered for High-Conversion
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-neutral-950 tracking-tight leading-none mb-10 uppercase italic"
                    >
                        Select Your <br />
                        <span className="text-primary-600">Legend.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-neutral-500 font-bold max-w-2xl mx-auto leading-relaxed"
                    >
                        Our ATS-Elite templates are engineered by career architects and hiring psychologists to bypass filters and command authority.
                    </motion.p>
                </header>

                {/* --- Interactive Filter Bar --- */}
                <div className="mb-20 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-50 rounded-[2rem] border border-neutral-100 shadow-sm backdrop-blur-xl">
                        {filterCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveIndustry(category)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 relative",
                                    activeIndustry === category 
                                        ? "text-white" 
                                        : "text-neutral-400 hover:text-neutral-900"
                                )}
                            >
                                {activeIndustry === category && (
                                    <motion.div 
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-neutral-950 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{category}</span>
                            </button>
                        ))}
                    </div>

                    <div className="relative group w-full md:w-80">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white border border-neutral-100 rounded-2xl text-sm font-bold placeholder:text-neutral-300 focus:outline-none focus:ring-4 focus:ring-primary-50 transition-all shadow-sm group-hover:border-neutral-200"
                        />
                    </div>
                </div>

                {/* --- Templates Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <AnimatePresence mode="popLayout">
                        {filteredTemplates.map((template, idx) => {
                            const isPremium = template.isPremium
                            const colors = template.colors || []
                            const activeColor = colors[0]?.id || 'standard'
                            
                            return (
                                <motion.div
                                    layout
                                    key={template.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                                    className="group relative"
                                >
                                    {/* Glass Card Container */}
                                    <div className="relative rounded-[2.5rem] bg-white border border-neutral-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:-translate-y-5 flex flex-col h-full">
                                        
                                        {/* Template Preview with Hover Logic */}
                                        <div className="aspect-[210/297] relative bg-neutral-100 overflow-hidden cursor-pointer" onClick={() => window.location.href = `/editor/setup?template=${template.id}&color=${activeColor}`}>
                                            <TemplateThumbnail 
                                                template={template}
                                                activeColorId={activeColor}
                                                className="w-full h-full object-cover origin-top transition-transform duration-700 group-hover:scale-110"
                                            />
                                            
                                            {/* Top Accents */}
                                            <div className="absolute top-6 left-6 z-20 flex gap-2">
                                                {isPremium ? (
                                                    <div className="px-3 py-1 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-xl">
                                                        <Star className="w-3 h-3 fill-white text-white" />
                                                        Premium
                                                    </div>
                                                ) : (
                                                    <div className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                                                        Free
                                                    </div>
                                                )}
                                            </div>

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                                                <Link 
                                                    href={`/editor/setup?template=${template.id}&color=${activeColor}`}
                                                    className="px-10 py-5 bg-white text-neutral-950 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-neutral-200 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 pointer-events-auto"
                                                >
                                                    Build With This
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-6 pb-8 flex-1 flex flex-col">
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="text-2xl font-black text-neutral-950 tracking-tight leading-tight group-hover:text-primary-600 transition-colors">
                                                    {template.name}
                                                </h3>
                                            </div>
                                            
                                            <p className="text-neutral-500 font-medium text-sm mb-8 leading-relaxed line-clamp-3 flex-1">
                                                {template.description}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex -space-x-2">
                                                    {colors.slice(0, 3).map((c) => (
                                                        <div 
                                                            key={c.id} 
                                                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                                            style={{ backgroundColor: c.hex }}
                                                            title={c.name}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex gap-2">
                                                    {template.suitableFor.careerLevels.slice(0, 1).map(l => (
                                                        <span key={l} className="text-[10px] font-black uppercase tracking-widest text-neutral-400 bg-neutral-100 px-2 py-1 rounded-md">{l}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Decorative Element */}
                                    <div className="absolute -bottom-6 left-12 right-12 h-6 bg-neutral-950/5 blur-2xl -z-10 group-hover:bg-primary-600/10 transition-all" />
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

                {/* --- Global Call to Action --- */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 text-center relative"
                >
                    <div className="absolute inset-0 bg-primary-50/50 blur-[100px] rounded-full pointer-events-none" />
                    <div className="relative z-10 p-16 md:p-24 rounded-[4rem] bg-neutral-950 text-white overflow-hidden shadow-2xl">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-600/20 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2" />
                        
                        <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight leading-[0.9] uppercase italic">
                            Your Elite Career <br />
                            <span className="text-primary-400">Begins Here.</span>
                        </h2>
                        
                        <p className="text-xl md:text-2xl text-neutral-400 font-bold mb-16 max-w-2xl mx-auto leading-relaxed">
                            Stop settling for generic templates. Command recruiter attention with the platform designed for high-performance careers.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/onboarding" className="w-full sm:w-auto px-12 py-6 bg-primary-500 text-white rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-primary-400 hover:scale-105 active:scale-95 transition-all">
                                Get Started for Free
                            </Link>
                            <Link href="/ats-resume-scanner" className="w-full sm:w-auto px-12 py-6 bg-white/10 text-white backdrop-blur-xl border border-white/20 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-white/20 hover:scale-105 active:scale-95 transition-all">
                                Scan Your Resume
                            </Link>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    )
}
