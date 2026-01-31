'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { templateRegistry } from '@/lib/templates/registry'
import { TemplatePreviewDialog } from '@/components/home/TemplatePreviewDialog'
import { TemplateThumbnail } from '@/components/home/TemplateThumbnail'
import { Check, Star, Filter, FileText, Sparkles, Download, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PRICING_TIERS } from '@/lib/config/pricing'
import { PricingCard } from '@/components/pricing/PricingCard'
import { useAuth } from '@/components/auth/AuthProvider'

import { trackEvent } from '@/lib/utils/analytics'

export default function Home() {
    const { user } = useAuth()
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [selectedLevel, setSelectedLevel] = useState<string>('All')
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

    // State Trackers
    const categories = ['All', 'ATS', 'Creative', 'Corporate', 'Service & Hospitality', 'Technical', 'Academic']
    const levels = ['All', 'Entry', 'Mid', 'Senior', 'Executive', 'Student']
    const [templateColors, setTemplateColors] = useState<Record<string, string>>({})

    const filteredTemplates = React.useMemo(() => {
        return templateRegistry.filter(template => {
            // Category Filter
            const categoryMatch = selectedCategory === 'All' ||
                (selectedCategory === 'ATS' && template.id.toLowerCase().startsWith('ats-')) ||
                (selectedCategory === 'Creative' && template.suitableFor.jobTypes.some(t => t.toLowerCase() === 'creative')) ||
                (selectedCategory === 'Corporate' && template.suitableFor.jobTypes.some(t => t.toLowerCase() === 'corporate')) ||
                (selectedCategory === 'Technical' && template.suitableFor.jobTypes.some(t => t.toLowerCase() === 'technical')) ||
                (selectedCategory === 'Academic' && template.suitableFor.jobTypes.some(t => t.toLowerCase() === 'academic')) ||
                (selectedCategory === 'Service & Hospitality' && template.suitableFor.jobTypes.some(t => t.toLowerCase() === 'service'));

            // Career Level Filter
            const levelMatch = selectedLevel === 'All' ||
                template.suitableFor.careerLevels.some(l => l.toLowerCase() === selectedLevel.toLowerCase());

            return categoryMatch && levelMatch
        })
    }, [selectedCategory, selectedLevel])

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

    const handlePreview = (id: string) => {
        trackEvent('template_preview', { templateId: id })
        setPreviewTemplateId(id)
    }

    const handleUseTemplate = (id: string) => {
        trackEvent('template_use', { templateId: id })
    }

    const toggleFaq = (index: number) => {
        if (expandedFaq !== index) {
            trackEvent('faq_expand', { faqIndex: index })
        }
        setExpandedFaq(expandedFaq === index ? null : index)
    }

    return (
        <div className="min-h-screen font-sans relative">
            {/* Preview Modal - Moved to top for better stacking context */}
            {previewTemplateId && (
                <TemplatePreviewDialog
                    isOpen={!!previewTemplateId}
                    onClose={() => setPreviewTemplateId(null)}
                    template={templateRegistry.find(t => t.id === previewTemplateId) || null}
                    initialColor={getActiveColor(previewTemplateId, templateRegistry.find(t => t.id === previewTemplateId)?.colors || [])}
                />
            )}

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white pb-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none" />
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary-100/30 rounded-full blur-3xl pointer-events-none mix-blend-multiply opacity-70" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-40 lg:pb-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left animate-in fade-in slide-in-from-left-8 duration-1000">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-bold mb-8 shadow-sm">
                                <Sparkles className="w-4 h-4" />
                                <span>Advanced AI Resume Builder</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-neutral-900 mb-8 leading-[0.95] font-sans">
                                Build your <br />
                                <span className="text-primary-600">Career Legacy</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-neutral-600 mb-12 leading-relaxed max-w-xl">
                                Craft a high-impact, ATS-optimized resume in minutes.
                                Designed for professionals who demand excellence in every detail.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5">
                                <Link
                                    href="/editor/setup?template=classic"
                                    className="inline-flex items-center justify-center px-10 py-5 text-xl font-black rounded-2xl text-white bg-primary-600 hover:bg-primary-700 shadow-2xl shadow-primary-200 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Start Building Free
                                </Link>
                                <Link
                                    href="#templates"
                                    className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold rounded-2xl text-neutral-900 bg-white border-2 border-neutral-100 hover:border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    Browse Designs
                                </Link>
                            </div>

                            <div className="mt-16 flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-neutral-200 overflow-hidden shadow-sm">
                                            <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                                    </div>
                                    <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Trusted by 50,000+ professionals</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-12 duration-1000 delay-200">
                            {/* Visual Representation of Templates */}
                            <div
                                className="relative z-10 w-full aspect-[4/5] bg-neutral-100 rounded-[3rem] shadow-2xl border-8 border-white overflow-hidden group cursor-pointer hover:shadow-primary-100/50 hover:border-primary-50 transition-all duration-300"
                                onClick={() => handlePreview('hospitality-elite')}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200"
                                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    alt="Professional Resume Design"
                                />
                                <div className="absolute inset-x-8 bottom-8 p-10 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 group-hover:translate-y-[-10px] transition-transform duration-500">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <FileText className="w-10 h-10 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-primary-600 uppercase tracking-widest mb-1 group-hover:text-primary-700">New Template Added</p>
                                            <h4 className="text-2xl font-black text-neutral-900 group-hover:text-primary-900">Hospitality Elite</h4>
                                            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-bold text-primary-600">
                                                <span>Click to Preview</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Background Elements */}
                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" />
                            <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse delay-700" />
                        </div>
                    </div>
                </div>
            </section>


            {/* How it Works Section */}
            <section className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-neutral-900 mb-6 font-serif">The Path to Your Next Role</h2>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Three simple steps to transform your career documentation with AI precision.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
                        {[
                            {
                                step: '01',
                                title: 'Upload or Enter Info',
                                desc: 'Import your old resume or start fresh. Our parser extracts every detail instantly.',
                                icon: <FileText className="w-10 h-10 text-primary-600" />,
                                color: 'bg-primary-50 border-primary-100'
                            },
                            {
                                step: '02',
                                title: 'Optimize with AI',
                                desc: 'Our AI analyzes your experience and suggests impact-driven bullets that recruiters love.',
                                icon: <Sparkles className="w-10 h-10 text-indigo-600" />,
                                color: 'bg-indigo-50 border-indigo-100'
                            },
                            {
                                step: '03',
                                title: 'Export & Apply',
                                desc: 'Choose a premium template and download as an ATS-compliant PDF or DOCX.',
                                icon: <Download className="w-10 h-10 text-emerald-600" />,
                                color: 'bg-emerald-50 border-emerald-100'
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="relative p-10 rounded-3xl bg-white border border-neutral-100 shadow-xl shadow-neutral-100/50 hover:shadow-2xl hover:shadow-neutral-200/50 hover:-translate-y-2 transition-all duration-300 group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-6xl text-neutral-900 select-none">
                                    {item.step}
                                </div>
                                <div className={cn("inline-flex p-4 rounded-2xl mb-8", item.color)}>
                                    {item.icon}
                                </div>
                                <h4 className="text-2xl font-bold text-neutral-900 mb-4">{item.title}</h4>
                                <p className="text-neutral-600 leading-relaxed text-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Professionals Globally</h2>
                        <div className="flex justify-center gap-1 mb-8">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-6 h-6 text-amber-400 fill-amber-400" />
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "The ATS-optimized templates helped me bypass the initial screening at a top-tier tech firm. I got the interview within 48 hours!",
                                author: "Emily S.",
                                role: "Software Engineer",
                                avatar: "E"
                            },
                            {
                                quote: "Clean, professional, and so easy to use. The AI suggestions for my work experience bullets were game-changers for my resume.",
                                author: "Marcus T.",
                                role: "Project Manager",
                                avatar: "M"
                            },
                            {
                                quote: "I was struggling to fit 10 years of experience onto one page. The 'Compact' template made it look effortless and stylish.",
                                author: "Jessica L.",
                                role: "Marketing Director",
                                avatar: "J"
                            }
                        ].map((t, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                                <p className="text-lg italic mb-6 text-neutral-300">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center font-bold text-xl">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{t.author}</div>
                                        <div className="text-sm text-neutral-400">{t.role}</div>
                                    </div>
                                </div>
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
                    {/* Filter Bar - Adjusted sticky top to accommodate Navbar */}
                    <div className="mb-12 flex flex-col md:flex-row justify-center items-center gap-6 bg-white p-4 rounded-xl shadow-lg border border-neutral-100 max-w-4xl mx-auto sticky top-24 z-40">
                        <div className="flex items-center gap-2 text-neutral-500 font-medium">
                            <Filter className="w-5 h-5" />
                            <span>Filter by:</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    type="button"
                                    className={cn(
                                        "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border-2",
                                        selectedCategory === cat
                                            ? "bg-primary-600 text-white border-primary-600 shadow-lg scale-105"
                                            : "bg-white text-neutral-600 border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="h-8 w-px bg-neutral-100 hidden md:block" />

                        <div className="flex flex-wrap justify-center gap-2">
                            {levels.map(lvl => (
                                <button
                                    key={lvl}
                                    onClick={() => setSelectedLevel(lvl)}
                                    type="button"
                                    className={cn(
                                        "px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border-2",
                                        selectedLevel === lvl
                                            ? "bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105"
                                            : "bg-white text-neutral-600 border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50"
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
                                <div
                                    className="relative bg-neutral-100 overflow-hidden cursor-pointer group/preview-box"
                                    style={{ aspectRatio: '210/297' }}
                                    onClick={() => handlePreview(template.id)}
                                >
                                    <TemplateThumbnail
                                        template={template}
                                        activeColorId={getActiveColor(template.id, template.colors || [])}
                                        className="pointer-events-none"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover/preview-box:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover/preview-box:opacity-100 z-10 pointer-events-none group-hover/preview-box:pointer-events-auto">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handlePreview(template.id)
                                            }}
                                            className="bg-white text-neutral-900 px-6 py-3 rounded-full font-bold shadow-2xl transform translate-y-4 group-hover/preview-box:translate-y-0 transition-all hover:scale-110 active:scale-95 z-20"
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
                                        onClick={() => handleUseTemplate(template.id)}
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

            {/* FAQ Section */}
            <section className="py-32 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
                        <p className="text-xl text-neutral-600">Everything you need to know about Clear Career Path.</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                q: "Are the resumes actually ATS-friendly?",
                                a: "Yes! Every template in our ATS series is built with standard headers, clear layouts, and machine-readable text structures to ensure your resume passes through screening software effortlessly."
                            },
                            {
                                q: "Can I download my resume in multiple formats?",
                                a: "Absolutely. You can download your finalized resume as a high-quality, professional PDF or as an editable DOCX file for further customization."
                            },
                            {
                                q: "Is my personal data secure?",
                                a: "Your privacy is our priority. All data is encrypted at rest and in transit. We never sell your personal information or share your resume data with third-party advertisers."
                            },
                            {
                                q: "Can I switch templates after entering my data?",
                                a: "Yes! Our dynamic editor allows you to switch between any of our 20+ templates instantly without losing any of the information you've already entered."
                            },
                            {
                                q: "Do you offer AI-powered bullet point suggestions?",
                                a: "Yes, our integrated AI Assistant analyzes your job titles and current descriptions to suggest impact-driven bullet points that highlight your achievements effectively."
                            }
                        ].map((faq, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "p-8 rounded-2xl border transition-all cursor-pointer",
                                    expandedFaq === i
                                        ? "border-primary-200 bg-primary-50/30"
                                        : "border-neutral-100 bg-neutral-50/50 hover:bg-neutral-50"
                                )}
                                onClick={() => toggleFaq(i)}
                            >
                                <h4 className="text-xl font-bold text-neutral-900 mb-2 flex justify-between items-center">
                                    {faq.q}
                                    <span className={cn("text-2xl transition-transform", expandedFaq === i ? "rotate-45" : "")}>+</span>
                                </h4>
                                <div className={cn(
                                    "grid transition-all duration-300",
                                    expandedFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                )}>
                                    <div className="overflow-hidden">
                                        <p className="text-neutral-600 leading-relaxed mt-4 pt-4 border-t border-neutral-100">{faq.a}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-12 rounded-[2rem] bg-primary-600 text-white text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <Sparkles className="w-32 h-32" />
                        </div>
                        <h3 className="text-3xl font-bold mb-6">Ready to clear your career path?</h3>
                        <p className="text-primary-100 mb-10 text-xl max-w-xl mx-auto">
                            Join 10,000+ professionals who have already accelerated their careers with our tools.
                        </p>
                        <Link
                            href="/editor/setup"
                            className="inline-flex items-center justify-center px-10 py-5 text-xl font-black rounded-2xl bg-white text-primary-600 hover:bg-primary-50 transition-all hover:scale-105 shadow-xl"
                        >
                            Get Started for Free
                        </Link>
                    </div>
                </div>
            </section>


        </div>
    )
}
