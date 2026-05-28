'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Zap, ArrowRight, Star, ChevronLeft, ChevronRight, Shield, Eye } from 'lucide-react'
import { templateRegistry } from '@/lib/templates/registry'
import { cn } from '@/lib/utils'
import { TemplateThumbnail } from '@/components/home/TemplateThumbnail'

export default function TemplatesGalleryPage() {
    const [activeIndustry, setActiveIndustry] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [selectedColorMap, setSelectedColorMap] = useState<Record<string, string>>({})

    const uniqueTemplates = templateRegistry

    const filteredTemplates = useMemo(() => {
        return uniqueTemplates.filter(template => {
            const isFree = !template.isPremium
            
            const matchesIndustry = activeIndustry === 'All' || 
                                   (activeIndustry === 'Free' ? isFree : (template.suitableFor.industries?.some(ind => ind.toLowerCase() === activeIndustry.toLowerCase()) || false))
            
            const matchesSearch = 
                template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.description.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesIndustry && matchesSearch
        })
    }, [activeIndustry, searchQuery, uniqueTemplates])
    
    const filterCategories = ['All', 'Executive Leadership', 'Tech', 'Healthcare', 'Finance', 'Design', 'Free']

    return (
        <div className="min-h-screen bg-neutral-950 font-sans overflow-hidden">
            {/* --- Dark Premium Background --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.12),transparent_70%)] blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_70%)] blur-[100px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>

            <div className="relative z-10 max-w-[90rem] mx-auto px-6 pt-28 pb-40">
                {/* --- Hero Section --- */}
                <header className="mb-20 text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.25em] mb-8 backdrop-blur-sm"
                    >
                        <Zap className="w-3 h-3 fill-primary-400 text-primary-400" />
                        Engineered for High-Conversion
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-8"
                    >
                        Resume Templates{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">Gallery</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-neutral-400 font-medium max-w-2xl mx-auto leading-relaxed"
                    >
                        Every template is meticulously crafted by career architects. ATS-compliant, recruiter-tested, and designed to command authority.
                    </motion.p>
                </header>

                {/* --- Filter Bar --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-16 flex flex-col lg:flex-row items-center justify-between gap-6"
                >
                    <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                        {filterCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveIndustry(category)}
                                className={cn(
                                    "px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 relative",
                                    activeIndustry === category 
                                        ? "text-white" 
                                        : "text-neutral-500 hover:text-neutral-300"
                                )}
                            >
                                {activeIndustry === category && (
                                    <motion.div 
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{category}</span>
                            </button>
                        ))}
                    </div>

                    <div className="relative group w-full lg:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-primary-400 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-all backdrop-blur-sm"
                        />
                    </div>
                </motion.div>

                {/* --- Results Count --- */}
                <div className="mb-8 flex items-center justify-between">
                    <p className="text-neutral-500 text-sm font-medium">
                        <span className="text-white font-bold">{filteredTemplates.length}</span> templates found
                    </p>
                </div>

                {/* --- Templates Grid — Full Resume Preview --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredTemplates.map((template, idx) => {
                            const isPremium = template.isPremium
                            const colors = template.colors || []
                            const activeColor = selectedColorMap[template.id] || colors[0]?.id || 'standard'
                            const isHovered = hoveredId === template.id
                            
                            return (
                                <motion.div
                                    layout
                                    key={template.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.4) }}
                                    className="group relative"
                                    onMouseEnter={() => setHoveredId(template.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <div className="relative flex flex-col h-full">
                                        {/* Resume Preview — Clean, No Device Frame */}
                                        <div className={cn(
                                            "relative aspect-[210/297] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white transition-all duration-500",
                                            isHovered && "ring-2 ring-primary-500/60 shadow-[0_0_60px_-10px_rgba(99,102,241,0.3)]"
                                        )}>
                                            <TemplateThumbnail 
                                                template={template}
                                                activeColorId={activeColor}
                                                className="w-full h-full"
                                            />
                                            
                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 z-20 flex gap-1.5">
                                                {isPremium ? (
                                                    <div className="px-2.5 py-1 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                                                        <Star className="w-2.5 h-2.5 fill-white" />
                                                        Pro
                                                    </div>
                                                ) : (
                                                    <div className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider shadow-lg">
                                                        Free
                                                    </div>
                                                )}
                                                {template.atsCompliant && (
                                                    <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                        <Shield className="w-2.5 h-2.5" />
                                                        ATS
                                                    </div>
                                                )}
                                            </div>

                                            {/* Hover Overlay with Actions */}
                                            <div className={cn(
                                                "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end pb-8 gap-3 transition-all duration-400",
                                                isHovered ? "opacity-100" : "opacity-0"
                                            )}>
                                                <Link 
                                                    href={`/editor/setup?template=${template.id}&color=${activeColor}`}
                                                    className="px-8 py-3 bg-white text-neutral-950 rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                                >
                                                    Use Template
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                                <Link
                                                    href={`/templates/${template.id}`}
                                                    className="px-6 py-2 bg-white/15 backdrop-blur-sm text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-white/25 transition-all flex items-center gap-1.5"
                                                >
                                                    <Eye className="w-3 h-3" />
                                                    Preview
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Info Below the Preview */}
                                        <div className="pt-4 pb-2 px-1">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3 className="text-sm font-bold text-white group-hover:text-primary-400 transition-colors leading-tight">
                                                    {template.name}
                                                </h3>
                                            </div>
                                            
                                            <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 mb-3">
                                                {template.description}
                                            </p>

                                            {/* Color Swatches */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1">
                                                    {colors.map((c) => (
                                                        <button 
                                                            key={c.id}
                                                            onClick={() => setSelectedColorMap(prev => ({ ...prev, [template.id]: c.id }))}
                                                            className={cn(
                                                                "w-4 h-4 rounded-full border transition-all duration-200 hover:scale-125",
                                                                activeColor === c.id
                                                                    ? "border-primary-400 ring-2 ring-primary-400/30 scale-110"
                                                                    : "border-white/20 hover:border-white/40"
                                                            )}
                                                            style={{ backgroundColor: c.hex }}
                                                            title={c.name}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex gap-1.5">
                                                    {template.suitableFor.careerLevels.slice(0, 2).map(l => (
                                                        <span key={l} className="text-[9px] font-bold uppercase tracking-widest text-neutral-600 bg-white/5 px-2 py-0.5 rounded">{l}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

                {/* --- Call to Action --- */}
                <motion.section 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 text-center relative"
                >
                    <div className="relative z-10 p-16 md:p-24 rounded-[3rem] bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 overflow-hidden backdrop-blur-sm">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/15 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-600/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
                        
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-[0.95] text-white">
                            Your Elite Career <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">Begins Here.</span>
                        </h2>
                        
                        <p className="text-lg md:text-xl text-neutral-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                            Stop settling for generic templates. Command recruiter attention with the platform designed for high-performance careers.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/onboarding" className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 active:scale-95 transition-all">
                                Get Started Free
                            </Link>
                            <Link href="/ats-resume-scanner" className="w-full sm:w-auto px-10 py-4 bg-white/5 text-white backdrop-blur-sm border border-white/10 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 hover:scale-105 active:scale-95 transition-all">
                                Scan Your Resume
                            </Link>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    )
}
