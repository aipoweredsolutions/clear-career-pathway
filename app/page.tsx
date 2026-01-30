'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { templateRegistry } from '@/lib/templates/registry'
import { TemplatePreviewDialog } from '@/components/home/TemplatePreviewDialog'
import { TemplateThumbnail } from '@/components/home/TemplateThumbnail'
import { Check, Star, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PRICING_TIERS } from '@/lib/config/pricing'
import { PricingCard } from '@/components/pricing/PricingCard'
import { useAuth } from '@/components/auth/AuthProvider'

export default function Home() {
    const { user } = useAuth()
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [selectedLevel, setSelectedLevel] = useState<string>('All')

    // State to track selected colors per template
    const [templateColors, setTemplateColors] = useState<Record<string, string>>({})

    // Extract unique categories and levels
    const categories = ['All', 'ATS', 'Creative', 'Corporate', 'Technical', 'Academic']
    const levels = ['All', 'Entry', 'Mid', 'Senior', 'Executive', 'Student']

    const filteredTemplates = templateRegistry.filter(template => {
        const categoryMatch = selectedCategory === 'All' ||
            (selectedCategory === 'ATS' && (template.id.startsWith('ats-') || template.id === 'ats-professional')) ||
            (selectedCategory === 'Creative' && template.suitableFor.jobTypes.includes('creative')) ||
            (selectedCategory === 'Corporate' && template.suitableFor.jobTypes.includes('corporate')) ||
            (selectedCategory === 'Technical' && template.suitableFor.jobTypes.includes('technical')) ||
            (selectedCategory === 'Academic' && template.suitableFor.jobTypes.includes('academic'));

        const levelMatch = selectedLevel === 'All' || template.suitableFor.careerLevels.includes(selectedLevel.toLowerCase() as any);

        return categoryMatch && levelMatch
    })

    // State Tracking
    const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null)

    const handleColorSelect = (templateId: string, colorId: string) => {
        setTemplateColors(prev => ({
            ...prev,
            [templateId]: colorId
        }))
    }

    // Helper to get active color or default
    const getActiveColor = (tId: string, colors: any[]) => {
        return templateColors[tId] || (colors && colors[0]?.id) || 'standard'
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 mb-6 font-serif">
                            Landing your dream job <br className="hidden md:block" />
                            <span className="text-primary-600">starts with a clear path.</span>
                        </h1>
                        <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
                            Create a professional, ATS-optimized resume in minutes.
                            Our AI-powered platform helps you tell your career story with clarity and impact.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/editor/setup?template=classic"
                                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 md:min-w-[200px] shadow-lg hover:shadow-xl transition-all"
                            >
                                Build Your Resume
                            </Link>
                            <Link
                                href="#templates"
                                className="inline-flex items-center justify-center px-8 py-4 border border-neutral-300 text-lg font-medium rounded-lg text-neutral-700 bg-white hover:bg-neutral-50 md:min-w-[200px] transition-colors"
                            >
                                View Templates
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center justify-center gap-8 text-sm font-medium text-neutral-500">
                            <div className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-green-500" />
                                <span>ATS Friendly</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-green-500" />
                                <span>AI Powered</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-green-500" />
                                <span>20+ Professional Templates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* How it Works Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4 font-serif">The Path to Your Next Role</h2>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                            Three simple steps to transform your career documentation with AI precision.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                step: '01',
                                title: 'Upload or Enter Info',
                                desc: 'Import your old resume or start fresh. Our parser extracts every detail instantly.',
                                icon: '📁'
                            },
                            {
                                step: '02',
                                title: 'Optimize with AI',
                                desc: 'Our AI analyzes your experience and suggests impact-driven bullets that recruiters love.',
                                icon: '✨'
                            },
                            {
                                step: '03',
                                title: 'Export & Apply',
                                desc: 'Choose a premium template and download as an ATS-compliant PDF or DOCX.',
                                icon: '🚀'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="relative p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:shadow-lg transition-shadow group">
                                <div className="text-5xl font-black text-primary-600/10 absolute top-4 right-8 group-hover:text-primary-600/20 transition-colors">
                                    {item.step}
                                </div>
                                <div className="text-4xl mb-6">{item.icon}</div>
                                <h4 className="text-xl font-bold text-neutral-900 mb-4">{item.title}</h4>
                                <p className="text-neutral-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="templates" className="py-24 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4 font-serif">Curated Template Gallery</h2>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                            Choose from our collection of unique, professionally designed layouts. Customize colors to match your personal brand.
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className="mb-12 flex flex-col md:flex-row justify-center items-center gap-6 bg-white p-4 rounded-xl shadow-sm border border-neutral-100 max-w-4xl mx-auto sticky top-4 z-30">
                        <div className="flex items-center gap-2 text-neutral-500 font-medium">
                            <Filter className="w-5 h-5" />
                            <span>Filter by:</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                        selectedCategory === cat
                                            ? "bg-primary-600 text-white shadow-md"
                                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="h-8 w-px bg-neutral-200 hidden md:block"></div>

                        <div className="flex flex-wrap justify-center gap-2">
                            {levels.map(lvl => (
                                <button
                                    key={lvl}
                                    onClick={() => setSelectedLevel(lvl)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors border",
                                        selectedLevel === lvl
                                            ? "bg-neutral-800 text-white border-neutral-800"
                                            : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300"
                                    )}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Template Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemplates.map((template) => (
                            <div key={template.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 flex flex-col">
                                {/* Preview Image Area - A4 Size */}
                                <div
                                    className="relative bg-neutral-100 overflow-hidden cursor-pointer"
                                    style={{ aspectRatio: '210/297' }}
                                    onClick={() => setPreviewTemplateId(template.id)}
                                >
                                    <TemplateThumbnail
                                        template={template}
                                        activeColorId={getActiveColor(template.id, template.colors || [])}
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setPreviewTemplateId(template.id)
                                            }}
                                            className="bg-white/90 backdrop-blur-sm text-neutral-900 px-6 py-3 rounded-full font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all hover:scale-105 active:scale-95 z-20"
                                        >
                                            Quick Preview
                                        </button>
                                    </div>

                                    {template.isPremium && (
                                        <div className="absolute top-4 right-4 bg-amber-400 text-white p-2 rounded-full shadow-lg z-10" title="Premium Template">
                                            <Star className="w-4 h-4 fill-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">{template.name}</h3>
                                            <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{template.description}</p>
                                        </div>
                                    </div>

                                    {/* COLOR PICKER */}
                                    {template.colors && template.colors.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {template.colors.map(color => (
                                                <button
                                                    key={color.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleColorSelect(template.id, color.id)
                                                    }}
                                                    className={cn(
                                                        "w-6 h-6 rounded-full border border-neutral-200 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-400",
                                                        getActiveColor(template.id, template.colors!) === color.id ? "ring-2 ring-offset-1 ring-neutral-900 scale-110" : ""
                                                    )}
                                                    style={{ backgroundColor: color.hex }}
                                                    title={color.name}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-auto pt-6 flex flex-wrap gap-2">
                                        {template.suitableFor.careerLevels.slice(0, 1).map(level => (
                                            <span key={level} className="text-xs font-medium px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded">
                                                {level.charAt(0).toUpperCase() + level.slice(1)}
                                            </span>
                                        ))}
                                        {template.suitableFor.jobTypes.slice(0, 1).map(type => (
                                            <span key={type} className="text-xs font-medium px-2.5 py-1 bg-primary-50 text-primary-700 rounded border border-primary-100">
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/editor/setup?template=${template.id}&color=${getActiveColor(template.id, template.colors || [])}`}
                                        className="mt-4 block w-full text-center bg-neutral-900 text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium select-none"
                                    >
                                        Use This Template
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTemplates.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-lg text-neutral-500">No templates match your filters. Try adjusting your search.</p>
                            <button onClick={() => { setSelectedCategory('All'); setSelectedLevel('All') }} className="mt-4 text-primary-600 font-medium hover:underline">
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>


            <section id="pricing" className="py-24 bg-neutral-50 border-t border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold text-neutral-900 mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-neutral-600">Choose the perfect plan for your career documentation needs. No hidden fees.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {PRICING_TIERS.map((tier) => (
                            <PricingCard
                                key={tier.name}
                                tier={tier as any}
                                isLoggedIn={!!user}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Preview Modal */}
            {previewTemplateId && (
                <TemplatePreviewDialog
                    isOpen={!!previewTemplateId}
                    onClose={() => setPreviewTemplateId(null)}
                    template={templateRegistry.find(t => t.id === previewTemplateId) || null}
                    initialColor={getActiveColor(previewTemplateId, templateRegistry.find(t => t.id === previewTemplateId)?.colors || [])}
                />
            )}
        </div>
    )
}
