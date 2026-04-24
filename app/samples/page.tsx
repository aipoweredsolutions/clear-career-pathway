'use client'

import React, { useState, useMemo } from 'react'
import { CAREER_SAMPLES } from '@/lib/constants/career-samples'
import { SEO_TEMPLATES } from '@/lib/constants/templates-seo'
import { SampleCard } from '@/components/samples/SampleCard'
import { 
    Sparkles, 
    ArrowRight, 
    Search, 
    Filter, 
    LayoutGrid, 
    ShieldCheck, 
    Zap,
    X,
    ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const CATEGORIES = [
    'All',
    'Technology',
    'Marketing',
    'Sales',
    'Creative',
    'Healthcare',
    'Education',
    'Entry Level'
]

export default function SamplesPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')

    const samples = useMemo(() => [
        {
            id: 'swe',
            data: CAREER_SAMPLES.software_engineer,
            category: 'Technology',
            description: 'Engineering-focused resume emphasizing cloud architecture, distributed systems, and team leadership.'
        },
        {
            id: 'mkt',
            data: CAREER_SAMPLES.marketing_manager,
            category: 'Marketing',
            description: 'Modern performance marketing layout highlighting multi-channel growth and brand optimization.'
        },
        {
            id: 'sle',
            data: CAREER_SAMPLES.sales_executive,
            category: 'Sales',
            description: 'Quota-crushing executive layout designed to showcase revenue growth and relationship management.'
        },
        {
            id: 'des',
            data: CAREER_SAMPLES.graphic_designer,
            category: 'Creative',
            description: 'Visually stunning offset design for visual artists, designers, and creative directors.'
        },
        {
            id: 'edu',
            data: CAREER_SAMPLES.education_expert,
            category: 'Education',
            description: 'Detailed academic format focusing on research, curriculum development, and student success.'
        },
        {
            id: 'hea',
            data: CAREER_SAMPLES.healthcare_professional,
            category: 'Healthcare',
            description: 'Certified clinical layout for healthcare leaders, emphasizing patient care and safety protocols.'
        },
        {
            id: 'grd',
            data: CAREER_SAMPLES.graduate,
            category: 'Entry Level',
            description: 'Structured academic-to-professional transition layout for final year students and new grads.'
        }
    ], [])

    const filteredSamples = useMemo(() => {
        return samples.filter(sample => {
            const matchesCategory = activeCategory === 'All' || sample.category === activeCategory
            const matchesSearch = 
                sample.data.personalInfo?.professionalTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sample.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sample.description.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        })
    }, [activeCategory, searchQuery, samples])

    return (
        <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-20">
            {/* Immersive Library Header */}
            <header className="relative py-24 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[120px] -mr-48 -mt-24" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] -ml-24 -mb-24" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border border-neutral-100 shadow-sm text-neutral-500 text-xs font-black uppercase tracking-[0.25em] mb-10"
                    >
                        <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                        Professional Sample Library
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black text-neutral-950 mb-8 tracking-tighter italic leading-none"
                    >
                        Build with <span className="text-primary-600 underline decoration-8 underline-offset-8">Authority.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto text-xl text-neutral-500 leading-relaxed font-bold mb-14"
                    >
                        Browse our curated collection of interview-winning resume samples. 
                        Each one is triple-verified for ATS compliance and recruiter impact.
                    </motion.p>

                    {/* Meta Stats */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400"
                    >
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-primary-600" />
                            <span>100% ATS Verified</span>
                        </div>
                        <div className="h-1 w-1 bg-neutral-200 rounded-full hidden sm:block" />
                        <div className="flex items-center gap-3">
                            <LayoutGrid className="w-5 h-5 text-indigo-500" />
                            <span>35+ Premium Templates</span>
                        </div>
                        <div className="h-1 w-1 bg-neutral-200 rounded-full hidden sm:block" />
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            <span>AI-Powered Insights</span>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Sticky Filter Bar */}
            <div className="sticky top-[86px] z-40 bg-white/80 backdrop-blur-xl border-y border-neutral-100 py-6 mb-20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Category Filter */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                    activeCategory === cat 
                                        ? "bg-neutral-950 text-white shadow-xl shadow-neutral-900/10 scale-105" 
                                        : "bg-neutral-50 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full lg:w-[400px] group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search by job title or keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-neutral-50 border border-neutral-100 rounded-[2rem] pl-12 pr-6 py-4 text-sm font-bold text-neutral-900 placeholder:text-neutral-400 outline-none focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-5 top-1/2 -translate-y-1/2 bg-neutral-200 hover:bg-neutral-300 p-1 rounded-full transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <section className="max-w-7xl mx-auto px-6">
                <AnimatePresence mode='popLayout'>
                    {filteredSamples.length > 0 ? (
                        <motion.div 
                            layout
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
                        >
                            {filteredSamples.map((sample) => (
                                <motion.div 
                                    key={sample.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <SampleCard
                                        sample={sample.data}
                                        category={sample.category}
                                        description={sample.description}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-32 text-center"
                        >
                            <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-neutral-100">
                                <Search className="w-8 h-8 text-neutral-200" />
                            </div>
                            <h3 className="text-2xl font-black text-neutral-900 mb-2">No matching samples found</h3>
                            <p className="text-neutral-500 font-bold max-w-sm mx-auto">
                                Try adjusting your search or filters to find what you&apos;re looking for.
                            </p>
                            <Button 
                                variant="ghost" 
                                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                                className="mt-8 text-primary-600 font-black tracking-widest uppercase text-xs"
                            >
                                Clear All Filters
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
            {/* SEO Internal Linking Section */}
            <section className="max-w-7xl mx-auto px-6 mt-32">
                <div className="border-t border-neutral-200 pt-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4 tracking-tight">Explore Professional Templates</h2>
                        <p className="text-lg text-neutral-500 font-medium">Discover specialized ATS-compliant layouts tailored to your exact industry.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {SEO_TEMPLATES.map(template => (
                            <Link 
                                key={template.slug} 
                                href={`/templates/${template.slug}`}
                                className="group p-8 rounded-3xl bg-white border border-neutral-100 shadow-sm hover:shadow-2xl hover:shadow-primary-600/5 hover:border-primary-200 transition-all flex flex-col h-full hover:-translate-y-1"
                            >
                                <div className="text-[10px] font-black uppercase tracking-widest text-primary-600 mb-4">{template.industry}</div>
                                <h3 className="text-xl font-bold text-neutral-900 leading-tight mb-3 group-hover:text-primary-700 transition-colors">{template.name}</h3>
                                <p className="text-sm text-neutral-500 line-clamp-3 mt-auto font-medium">{template.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Large Conversion Section */}
            <section className="max-w-[1400px] mx-auto px-6 mt-32">
                <div className="bg-neutral-950 rounded-[4rem] p-12 lg:p-32 text-center relative overflow-hidden group shadow-3xl">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[160px] -mr-[400px] -mt-[400px] transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[140px] -ml-[300px] -mb-[300px] transition-transform duration-1000 group-hover:scale-110" />

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <motion.div 
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary-400 text-xs font-black uppercase tracking-[0.4em] mb-12 shadow-2xl"
                        >
                            Built for Impact
                        </motion.div>

                        <motion.h2 
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-7xl font-black text-white mb-10 leading-[1.1] italic tracking-tighter"
                        >
                            Your career isn&apos;t <br/> generic. <span className="text-primary-500 underline decoration-[12px] underline-offset-[16px]">Your resume shouldn&apos;t be either.</span>
                        </motion.h2>

                        <motion.p 
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-lg md:text-2xl text-neutral-400 font-bold mb-16 max-w-2xl mx-auto leading-relaxed"
                        >
                            Join over 250,000 top-tier professionals who used Clear Career Path to secure interviews at Fortune 500 companies.
                        </motion.p>

                        <motion.div 
                            whileInView={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <Link href="/editor/setup">
                                <Button size="xl" className="px-14 h-20 text-xl font-black bg-white text-black hover:bg-neutral-200 shadow-2xl shadow-white/5 rounded-3xl transition-all">
                                    Build My Resume <ArrowRight className="ml-3 w-6 h-6" />
                                </Button>
                            </Link>
                            <Link href="/blog">
                                <Button variant="ghost" size="xl" className="h-20 text-white font-black hover:bg-white/5 px-10 rounded-3xl">
                                    Explore Strategy Blog
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
