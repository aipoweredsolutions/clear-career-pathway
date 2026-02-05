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
import { BrandMarquee, AIDemoSection, ComparisonSection } from '@/components/home/HomeEnhancements'
import Image from 'next/image'

export default function Home() {
    const { user } = useAuth()
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [selectedLevel, setSelectedLevel] = useState<string>('All')
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
    const [templateColors, setTemplateColors] = useState<Record<string, string>>({})
    const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null)

    // State Trackers
    const categories = ['All', 'ATS', 'Creative', 'Corporate', 'Service & Hospitality', 'Technical', 'Academic']
    const levels = ['All', 'Entry', 'Mid', 'Senior', 'Executive', 'Student']

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

    const handleColorSelect = (templateId: string, colorId: string) => {
        setTemplateColors(prev => ({
            ...prev,
            [templateId]: colorId
        }))
    }

    const getActiveColor = (tId: string, colors: any[]) => {
        return templateColors[tId] || (colors && colors[0]?.id) || 'standard'
    }

    const handlePreview = (id: string) => {
        console.log("Opening preview for template:", id);
        // Set state first to ensure modal opens even if analytics fails
        setPreviewTemplateId(id)
        try {
            trackEvent('template_preview', { templateId: id })
        } catch (error) {
            console.error("Analytics error in handlePreview:", error)
        }
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
            {/* Cinematic Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white pb-20">
                {/* Dynamic Background Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.05),transparent_50%)] pointer-events-none" />
                <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[800px] h-[800px] bg-primary-50 rounded-full blur-[120px] pointer-events-none opacity-40 animate-pulse" />
                <div className="absolute -bottom-48 -left-24 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[100px] pointer-events-none opacity-40 animate-pulse delay-1000" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-20">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="lg:col-span-7 text-left animate-in fade-in slide-in-from-left-12 duration-1000 ease-out">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-primary-100/50 text-primary-700 text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-sm">
                                <Sparkles className="w-4 h-4 text-primary-500" />
                                <span>The Future of Career Storytelling</span>
                            </div>

                            <h1 className="text-7xl md:text-[9rem] font-black tracking-[-0.04em] text-neutral-950 mb-10 leading-[0.85] text-balance">
                                Build your <br />
                                <span className="text-gradient-primary">Career Legacy.</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-neutral-500 mb-14 leading-relaxed max-w-2xl font-medium">
                                Craft a high-impact, ATS-optimized resume in minutes.
                                Designed for professionals who demand <span className="text-neutral-900 font-bold underline decoration-primary-500/30 underline-offset-4">excellence</span> in every detail.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link
                                    href="/editor/setup?template=classic"
                                    className="btn-premium btn-premium-primary text-lg !px-12 !py-6 group"
                                >
                                    Start Building Free
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="#templates"
                                    className="px-10 py-6 text-lg font-bold rounded-2xl text-neutral-900 bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300 flex items-center justify-center"
                                >
                                    Browse Designs
                                </Link>
                            </div>

                            <div className="mt-20 flex flex-col md:flex-row items-start md:items-center gap-10">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-14 h-14 rounded-2xl border-4 border-white glass overflow-hidden shadow-2xl relative rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer">
                                            <Image
                                                src={`https://i.pravatar.cc/150?u=${i + 20}`}
                                                alt="Success User"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                    <div className="w-14 h-14 rounded-2xl border-4 border-white bg-primary-600 flex items-center justify-center text-white text-xs font-black rotate-3 hover:rotate-0 transition-all shadow-2xl">
                                        10K+
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 shadow-sm" />)}
                                    </div>
                                    <p className="text-xs font-black text-neutral-400 uppercase tracking-widest leading-tight">
                                        Trusted by 10,000+ <br />Elite Professionals
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative hidden lg:block animate-in fade-in slide-in-from-right-16 duration-1000 delay-300 ease-out">
                            <div className="relative group">
                                {/* Floating Background Cards for depth */}
                                <div className="absolute -top-12 -right-12 w-full h-full bg-indigo-50 rounded-[3rem] -z-10 rotate-6 group-hover:rotate-12 transition-transform duration-700" />
                                <div className="absolute -bottom-12 -left-12 w-full h-full bg-primary-50 rounded-[3rem] -z-10 -rotate-3 group-hover:-rotate-8 transition-transform duration-700" />

                                <div
                                    className="relative z-10 w-full aspect-[21/28] bg-white rounded-[2.5rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.15)] border-[12px] border-white overflow-hidden cursor-pointer group-hover:shadow-primary-100/50 transition-all duration-500 perspective-1000 animate-float"
                                    onClick={() => handlePreview('cruise-excellence')}
                                >
                                    <Image
                                        src="/templates/cruise-excellence-preview.png"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                                        alt="Premium Resume Preview"
                                        fill
                                        priority
                                    />

                                    {/* Glass Overlay Card */}
                                    <div className="absolute inset-x-6 bottom-6 p-8 glass backdrop-blur-2xl rounded-3xl border border-white/50 group-hover:translate-y-[-8px] transition-transform duration-500">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500">
                                                <FileText className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-1">Featured Design</p>
                                                <h4 className="text-xl font-black text-neutral-950">Cruise Excellence</h4>
                                                <div className="flex items-center gap-2 mt-2 opacity-100 text-[10px] font-bold text-neutral-500">
                                                    <span>View Concept Details</span>
                                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <BrandMarquee />

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
                            { step: '01', title: 'Upload or Enter Info', desc: 'Import your old resume or start fresh. Our parser extracts every detail instantly.', icon: <FileText className="w-10 h-10 text-primary-600" />, color: 'bg-primary-50 border-primary-100' },
                            { step: '02', title: 'Optimize with AI', desc: 'Our AI analyzes your experience and suggests impact-driven bullets that recruiters love.', icon: <Sparkles className="w-10 h-10 text-indigo-600" />, color: 'bg-indigo-50 border-indigo-100' },
                            { step: '03', title: 'Export & Apply', desc: 'Choose a premium template and download as an ATS-compliant PDF or DOCX.', icon: <Download className="w-10 h-10 text-emerald-600" />, color: 'bg-emerald-50 border-emerald-100' }
                        ].map((item, idx) => (
                            <div key={idx} className="relative p-10 rounded-3xl bg-white border border-neutral-100 shadow-xl shadow-neutral-100/50 hover:shadow-2xl hover:shadow-neutral-200/50 hover:-translate-y-2 transition-all duration-300 group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-6xl text-neutral-900 select-none">{item.step}</div>
                                <div className={cn("inline-flex p-4 rounded-2xl mb-8", item.color)}>{item.icon}</div>
                                <h4 className="text-2xl font-bold text-neutral-900 mb-4">{item.title}</h4>
                                <p className="text-neutral-600 leading-relaxed text-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <AIDemoSection />

            {/* Founder's Vision Section - Editorial Style */}
            <section className="py-40 bg-neutral-950 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600 rounded-full blur-[150px] animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[150px] animate-pulse delay-1000" />
                </div>

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center font-black text-4xl mb-12 shadow-[0_20px_50px_rgba(59,130,246,0.3)] rotate-3">
                            CP
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black mb-16 leading-[0.9] tracking-tighter uppercase italic text-gradient bg-gradient-to-r from-white via-white to-white/40">
                            A Note from <br /> the Founder
                        </h2>
                        <div className="space-y-10 text-xl md:text-3xl text-neutral-300 leading-[1.4] font-medium mb-16 max-w-4xl font-serif italic selection:bg-primary-500">
                            <p>
                                &quot;Clear Career Path isn&apos;t a corporate behemoth. It&apos;s a passion project built to solve a single, frustrating problem: the modern resume struggle.&quot;
                            </p>
                            <p>
                                &quot;I personally designed these layouts to pass through the toughest ATS filters while maintaining a visual elegance that resonates with human recruiters. Whether you&apos;re a software engineer or a healthcare hero, these tools are built for your success.&quot;
                            </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl font-black text-white italic tracking-tighter">The Creator of Clear Career Path</div>
                            <div className="text-[10px] font-black text-primary-500 uppercase tracking-[0.5em] mt-4 bg-primary-500/10 px-6 py-2 rounded-full border border-primary-500/20">
                                Independent Designer & Founder
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Section */}
            <section id="templates" className="py-24 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4 font-serif">Curated Template Gallery</h2>
                        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                            Choose from our collection of unique, professionally designed layouts. Customize colors to match your personal brand.
                        </p>
                    </div>

                    <div className="mb-16 flex flex-col md:flex-row justify-center items-center gap-6 glass p-6 rounded-[2rem] border-white/50 max-w-5xl mx-auto sticky top-28 z-40 shadow-2xl shadow-neutral-200/50">
                        <div className="flex items-center gap-3 text-neutral-400 font-black uppercase tracking-widest text-[10px]">
                            <Filter className="w-5 h-5 text-primary-500" />
                            <span>Refine Gallery:</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map(cat => (
                                <button key={cat} onClick={() => setSelectedCategory(cat)} className={cn("px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border", selectedCategory === cat ? "bg-neutral-900 text-white border-neutral-900 shadow-xl scale-105" : "bg-white text-neutral-500 border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50")}>{cat}</button>
                            ))}
                        </div>
                        <div className="h-8 w-px bg-neutral-100 hidden md:block" />
                        <div className="flex flex-wrap justify-center gap-2">
                            {levels.map(lvl => (
                                <button key={lvl} onClick={() => setSelectedLevel(lvl)} className={cn("px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border", selectedLevel === lvl ? "bg-primary-600 text-white border-primary-600 shadow-xl scale-105" : "bg-white text-neutral-500 border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50")}>{lvl}</button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemplates.map((template) => (
                            <div key={template.id} className="group glass rounded-[2rem] overflow-hidden hover:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-neutral-100 flex flex-col">
                                <div className="relative bg-neutral-50 overflow-hidden cursor-pointer group/preview-box m-4 rounded-[1.5rem]" style={{ aspectRatio: '210/297' }} onClick={() => handlePreview(template.id)}>
                                    <TemplateThumbnail template={template} activeColorId={getActiveColor(template.id, template.colors || [])} className="pointer-events-none group-hover/preview-box:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-neutral-950/0 group-hover/preview-box:bg-neutral-950/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover/preview-box:opacity-100 z-10 pointer-events-none group-hover/preview-box:pointer-events-auto">
                                        <button onClick={(e) => { e.stopPropagation(); handlePreview(template.id) }} className="bg-white text-neutral-950 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transform translate-y-8 group-hover/preview-box:translate-y-0 transition-all duration-500 hover:scale-110 active:scale-95">Quick Preview</button>
                                    </div>
                                    {template.isPremium && <div className="absolute top-6 right-6 bg-gradient-to-br from-amber-400 to-orange-500 text-white p-2.5 rounded-2xl shadow-xl z-10 animate-float" title="Premium Template"><Star className="w-5 h-5 fill-white" /></div>}
                                </div>
                                <div className="p-8 pt-4 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-black text-neutral-950 tracking-tight">{template.name}</h3>
                                        <div className="flex gap-1.5 mt-1.5">
                                            {template.colors && template.colors.slice(0, 4).map(color => (
                                                <button key={color.id} onClick={(e) => { e.stopPropagation(); handleColorSelect(template.id, color.id) }} className={cn("w-5 h-5 rounded-lg border border-neutral-100 transition-all hover:scale-125", getActiveColor(template.id, template.colors!) === color.id ? "ring-2 ring-offset-2 ring-primary-500 scale-110" : "")} style={{ backgroundColor: color.hex }} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 font-medium mb-6">{template.description}</p>

                                    <div className="mt-auto flex flex-col gap-4">
                                        <div className="flex flex-wrap gap-2">
                                            {template.suitableFor.careerLevels.slice(0, 1).map(level => <span key={level} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-neutral-100 text-neutral-500 rounded-lg">{level}</span>)}
                                            {template.suitableFor.jobTypes.slice(0, 1).map(type => <span key={type} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg border border-primary-100">{type}</span>)}
                                        </div>
                                        <Link href={`/editor/setup?template=${template.id}&color=${getActiveColor(template.id, template.colors || [])}`} onClick={() => handleUseTemplate(template.id)} className="block w-full text-center bg-neutral-950 text-white py-5 rounded-2xl hover:bg-neutral-800 transition-all duration-300 font-black text-sm uppercase tracking-widest shadow-xl shadow-neutral-900/10">Build With This</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ComparisonSection />

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-neutral-50 border-t border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold text-neutral-900 mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-neutral-600">Choose the perfect plan for your career documentation needs. No hidden fees.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {PRICING_TIERS.map((tier) => <PricingCard key={tier.name} tier={tier as any} isLoggedIn={!!user} />)}
                    </div>
                </div>
            </section>

            {/* Premium FAQ Section */}
            <section className="py-40 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-black text-neutral-950 mb-8 tracking-tighter uppercase italic">Questions? <br /><span className="text-primary-600">We Have Clarity.</span></h2>
                        <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-medium">
                            Everything you need to know about the platform that&apos;s changing the career game.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {[
                            { q: "Are the resumes actually ATS-friendly?", a: "Yes. Every byte of our ATS-series templates is optimized for machine readability while preserving aesthetic excellence for human eyes." },
                            { q: "Can I download my resume in multiple formats?", a: "Absolutely. Export your legacy in high-fidelity PDF or fully editable DOCX formats instantly." },
                            { q: "Is my personal data secure?", a: "Security is non-negotiable. We use enterprise-grade encryption and never, ever sell your professional data." },
                            { q: "Can I switch templates after entering my data?", a: "Yes. Our engine dynamically re-maps your data across all 20+ templates in real-time. No re-typing required." },
                            { q: "Do you offer AI-powered bullet suggestions?", a: "Our AI is integrated directly into the core editor, turning passive duties into high-impact achievements as you type." }
                        ].map((faq, i) => (
                            <div key={i} className={cn("group p-10 rounded-[2.5rem] border transition-all duration-500 cursor-pointer overflow-hidden relative", expandedFaq === i ? "border-primary-100 bg-primary-50/20 shadow-2xl shadow-primary-100/20" : "border-neutral-100 bg-white hover:border-neutral-200")} onClick={() => toggleFaq(i)}>
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                    <Sparkles className="w-24 h-24" />
                                </div>
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

                    {/* Final Cinematic CTA */}
                    <div className="mt-40 p-16 md:p-24 rounded-[4rem] bg-neutral-950 text-white text-center relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)]">
                        <div className="absolute top-0 right-0 p-24 opacity-10 rotate-12 scale-150"><Sparkles className="w-64 h-64 text-primary-500" /></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px]" />

                        <div className="relative z-10">
                            <h3 className="text-4xl md:text-7xl font-black mb-10 leading-[0.95] tracking-tighter uppercase italic">Ready to Clear <br />Your Path?</h3>
                            <p className="text-neutral-400 mb-14 text-xl md:text-2xl max-w-2xl mx-auto font-medium">
                                Join 10,000+ top-tier professionals who have already claimed their seat at the table.
                            </p>
                            <Link href="/editor/setup" className="btn-premium btn-premium-primary !px-16 !py-8 text-xl group">
                                Get Started for Free
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {previewTemplateId && (
                <TemplatePreviewDialog
                    key={previewTemplateId}
                    isOpen={!!previewTemplateId}
                    onClose={() => setPreviewTemplateId(null)}
                    template={templateRegistry.find(t => t.id === previewTemplateId) || null}
                    initialColor={getActiveColor(previewTemplateId, templateRegistry.find(t => t.id === previewTemplateId)?.colors || [])}
                />
            )}
        </div>
    )
}
