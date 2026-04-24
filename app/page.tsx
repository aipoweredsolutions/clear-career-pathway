import React, { Suspense } from 'react'
import Link from 'next/link'
import { FileText, Download, ArrowRight, Target, Zap, LayoutTemplate } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PRICING_TIERS } from '@/lib/config/pricing'
import { HeroSection } from '@/components/home/HeroSection'
import dynamic from 'next/dynamic'

// Lazy-load heavy below-the-fold sections
const BrandMarquee = dynamic(
    () => import('@/components/home/HomeEnhancements').then(m => ({ default: m.BrandMarquee })),
    { loading: () => <div className="py-12 bg-white border-y border-neutral-100" /> }
)

const AIDemoSection = dynamic(
    () => import('@/components/home/HomeEnhancements').then(m => ({ default: m.AIDemoSection })),
    { loading: () => <div className="py-32 bg-neutral-900" /> }
)

const ComparisonSection = dynamic(
    () => import('@/components/home/HomeEnhancements').then(m => ({ default: m.ComparisonSection })),
    { loading: () => <div className="py-32 bg-white" /> }
)

const ToolboxSection = dynamic(
    () => import('@/components/home/ToolboxSection').then(m => ({ default: m.ToolboxSection })),
    { loading: () => <div className="py-24 bg-white" /> }
)

const IndustryKitsSection = dynamic(
    () => import('@/components/home/IndustryKitsSection').then(m => ({ default: m.IndustryKitsSection })),
    { loading: () => <div className="py-24 bg-neutral-50" /> }
)

const TemplateGallery = dynamic(
    () => import('@/components/home/ClientInteractions').then(m => ({ default: m.TemplateGallery })),
    { loading: () => <div className="py-32 bg-white" /> }
)

const FAQSection = dynamic(
    () => import('@/components/home/ClientInteractions').then(m => ({ default: m.FAQSection })),
    { loading: () => <div className="py-24" /> }
)

const PricingSection = dynamic(
    () => import('@/components/home/ClientInteractions').then(m => ({ default: m.PricingSection }))
)

export default function Home() {
    return (
        <div className="min-h-screen font-sans relative">
            {/* Premium Animated Hero Section - Server Rendered */}
            <HeroSection />

            <BrandMarquee />

            {/* How it Works Section - Server Rendered */}
            <section className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-neutral-900 mb-6 font-serif tracking-tight">The Fast Track to Your Next Role</h2>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Three simple steps to transform your career documentation and win more high-quality interviews.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
                        {[
                            { step: '01', title: 'Build Your Foundation', desc: 'Import your old resume or start fresh. Our parser handles the data so you can focus on the strategy.', icon: 'file', color: 'bg-primary-50 border-primary-100', iconColor: 'text-primary-600' },
                            { step: '02', title: 'Command Professional Narrative', desc: 'Transform passive lists of tasks into high-impact achievements that command recruiter attention.', icon: 'target', color: 'bg-indigo-50 border-indigo-100', iconColor: 'text-indigo-600' },
                            { step: '03', title: 'Claim Your Seat at the Table', desc: 'Choose from 25+ premium, ATS-compliant designs and download in seconds to start winning interviews.', icon: 'download', color: 'bg-emerald-50 border-emerald-100', iconColor: 'text-emerald-600' }
                        ].map((item, idx) => (
                            <div key={idx} className="relative p-10 rounded-3xl bg-white border border-neutral-100 shadow-xl shadow-neutral-100/50 hover:shadow-2xl hover:shadow-neutral-200/50 hover:-translate-y-2 transition-all duration-300 group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-6xl text-neutral-900 select-none tracking-tighter italic">{item.step}</div>
                                <div className={cn("inline-flex p-4 rounded-2xl mb-8", item.color)}>
                                    {item.icon === 'file' && <FileText className={cn("w-10 h-10", item.iconColor)} />}
                                    {item.icon === 'target' && <Target className={cn("w-10 h-10", item.iconColor)} />}
                                    {item.icon === 'download' && <Download className={cn("w-10 h-10", item.iconColor)} />}
                                </div>
                                <h4 className="text-2xl font-bold text-neutral-900 mb-4">{item.title}</h4>
                                <p className="text-neutral-600 leading-relaxed text-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ToolboxSection />

            <AIDemoSection />


            <IndustryKitsSection />

            {/* Templates Section - Client Component (interactive) */}
            <TemplateGallery />

            <ComparisonSection />

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-neutral-50 border-t border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold text-neutral-900 mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-neutral-600">Choose the perfect plan for your career documentation needs. No hidden fees.</p>
                    </div>
                    <Suspense fallback={<div className="grid md:grid-cols-3 gap-8">{[1, 2, 3].map(i => <div key={i} className="h-96 bg-white rounded-2xl animate-pulse" />)}</div>}>
                        <PricingSection tiers={PRICING_TIERS} />
                    </Suspense>
                </div>
            </section>

            {/* Premium FAQ Section - Server-rendered wrapper, client interactive */}
            <section className="py-40 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-black text-neutral-950 mb-8 tracking-tighter uppercase italic">Questions? <br /><span className="text-primary-600">We Have Clarity.</span></h2>
                        <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-medium">
                            Everything you need to know about the platform that&apos;s changing the career game.
                        </p>
                    </div>

                    <FAQSection />

                    {/* Final Cinematic CTA */}
                    <div className="mt-40 p-16 md:p-24 rounded-[4rem] bg-neutral-950 text-white text-center relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)]">
                        <div className="absolute top-0 right-0 p-24 opacity-10 rotate-12 scale-150"><Zap className="w-64 h-64 text-primary-500" /></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px]" />

                        <div className="relative z-10">
                            <h3 className="text-4xl md:text-7xl font-black mb-10 leading-[0.95] tracking-tighter uppercase italic">Ready to Clear <br />Your Path?</h3>
                            <p className="text-neutral-400 mb-14 text-xl md:text-2xl max-w-2xl mx-auto font-medium">
                                Join 10,000+ top-tier professionals who have already claimed their seat at the table.
                            </p>
                            <Link href="/editor/setup" className="btn-premium btn-premium-primary !px-16 !py-8 text-xl group inline-flex">
                                Get Started for Free
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
