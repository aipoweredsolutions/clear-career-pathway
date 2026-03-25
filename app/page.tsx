import React, { Suspense } from 'react'
import Link from 'next/link'
import { Sparkles, FileText, Download, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PRICING_TIERS } from '@/lib/config/pricing'
import { HeroSection } from '@/components/home/HeroSection'
import { TemplateGallery, FAQSection, PricingSection } from '@/components/home/ClientInteractions'
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
                        <h2 className="text-4xl font-bold text-neutral-900 mb-6 font-serif">The Path to Your Next Role</h2>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            Three simple steps to transform your career documentation with AI precision.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
                        {[
                            { step: '01', title: 'Upload or Enter Info', desc: 'Import your old resume or start fresh. Our parser extracts every detail instantly.', icon: 'file', color: 'bg-primary-50 border-primary-100', iconColor: 'text-primary-600' },
                            { step: '02', title: 'Optimize with AI', desc: 'Our AI analyzes your experience and suggests impact-driven bullets that recruiters love.', icon: 'sparkles', color: 'bg-indigo-50 border-indigo-100', iconColor: 'text-indigo-600' },
                            { step: '03', title: 'Export & Apply', desc: 'Choose a premium template and download as an ATS-compliant PDF or DOCX.', icon: 'download', color: 'bg-emerald-50 border-emerald-100', iconColor: 'text-emerald-600' }
                        ].map((item, idx) => (
                            <div key={idx} className="relative p-10 rounded-3xl bg-white border border-neutral-100 shadow-xl shadow-neutral-100/50 hover:shadow-2xl hover:shadow-neutral-200/50 hover:-translate-y-2 transition-all duration-300 group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-6xl text-neutral-900 select-none">{item.step}</div>
                                <div className={cn("inline-flex p-4 rounded-2xl mb-8", item.color)}>
                                    {item.icon === 'file' && <FileText className={cn("w-10 h-10", item.iconColor)} />}
                                    {item.icon === 'sparkles' && <Sparkles className={cn("w-10 h-10", item.iconColor)} />}
                                    {item.icon === 'download' && <Download className={cn("w-10 h-10", item.iconColor)} />}
                                </div>
                                <h4 className="text-2xl font-bold text-neutral-900 mb-4">{item.title}</h4>
                                <p className="text-neutral-600 leading-relaxed text-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <AIDemoSection />

            {/* Founder's Vision Section - Server Rendered */}
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
                        <div className="absolute top-0 right-0 p-24 opacity-10 rotate-12 scale-150"><Sparkles className="w-64 h-64 text-primary-500" /></div>
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
