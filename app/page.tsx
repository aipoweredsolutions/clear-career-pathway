import React, { Suspense } from 'react'
import Link from 'next/link'
import { FileText, Download, ArrowRight, Target, Zap, LayoutTemplate, ShieldCheck, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PRICING_TIERS } from '@/lib/config/pricing'
import { HeroSection } from '@/components/home/HeroSection'
import dynamic from 'next/dynamic'
import { generateFAQSchema, generateHowToSchema } from '@/lib/seo/faq-schema'

// Lazy-load heavy below-the-fold sections
const BrandMarquee = dynamic(
    () => import('@/components/home/HomeEnhancements').then(m => ({ default: m.BrandMarquee })),
    { loading: () => <div className="py-12 bg-white border-y border-neutral-100" /> }
)

const AIDemoSection = dynamic(
    () => import('@/components/home/HomeEnhancements').then(m => ({ default: m.AIDemoSection })),
    { loading: () => <div className="py-32 bg-neutral-900" /> }
)




const TemplateGallery = dynamic(
    () => import('@/components/home/ClientInteractions').then(m => ({ default: m.TemplateGallery })),
    { loading: () => <div className="py-32 bg-white" /> }
)

const ProductSuite = dynamic(
    () => import('@/components/home/ProductSuite').then(m => ({ default: m.ProductSuite })),
    { loading: () => <div className="py-32 bg-neutral-950" /> }
)

const FAQSection = dynamic(
    () => import('@/components/home/ClientInteractions').then(m => ({ default: m.FAQSection })),
    { loading: () => <div className="py-24" /> }
)

const PricingSection = dynamic(
    () => import('@/components/home/ClientInteractions').then(m => ({ default: m.PricingSection }))
)

const HOME_FAQS = [
    { question: "Are the resumes actually ATS-friendly?", answer: "Yes. Every byte of our ATS-series templates is optimized for machine readability while preserving aesthetic excellence for human eyes." },
    { question: "Can I download my resume in multiple formats?", answer: "Absolutely. Export your legacy in high-fidelity PDF or fully editable DOCX formats instantly." },
    { question: "Is my personal data secure?", answer: "Security is non-negotiable. We use enterprise-grade encryption and never, ever sell your professional data." },
    { question: "Can I switch templates after entering my data?", answer: "Yes. Our engine dynamically re-maps your data across all 20+ templates in real-time. No re-typing required." },
    { question: "Do you offer AI-powered bullet suggestions?", answer: "Our AI is integrated directly into the core editor, turning passive duties into high-impact achievements as you type." }
]

const HOW_TO_STEPS = [
    { name: "Build Your Foundation", text: "Import your old resume or start fresh. Our parser handles the data so you can focus on the strategy.", url: "https://www.clearcareerpath.com/editor/setup" },
    { name: "Command Professional Narrative", text: "Transform passive lists of tasks into high-impact achievements that command recruiter attention.", url: "https://www.clearcareerpath.com/editor/setup" },
    { name: "Claim Your Seat at the Table", text: "Choose from 25+ premium, ATS-compliant designs and download in seconds to start winning interviews.", url: "https://www.clearcareerpath.com/editor/setup" }
]

export default function Home() {
    const faqSchema = generateFAQSchema(HOME_FAQS)
    const howToSchema = generateHowToSchema(
        "How to Build an ATS-Compliant Resume",
        "A step-by-step guide to creating a high-performance resume that bypasses Applicant Tracking Systems.",
        HOW_TO_STEPS
    )

    return (
        <div className="min-h-screen font-sans relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            {/* Premium Animated Hero Section - Server Rendered */}
            <HeroSection />

            <BrandMarquee />

            {/* Templates Section - Client Component (interactive) */}
            <TemplateGallery />

            {/* How it Works Section - Server Rendered & GEO Optimized */}
            <section className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-[0.25em] mb-6">
                                <Cpu className="w-3.5 h-3.5" />
                                Engineered Process
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-neutral-950 tracking-tighter italic leading-[0.9] mb-8">
                                High-Performance <br /><span className="text-primary-600">Workflow.</span>
                            </h2>
                            <p className="text-xl text-neutral-500 font-bold leading-relaxed">
                                Our platform isn&apos;t just a builder—it&apos;s a career accelerator. We optimize every pixel and keyword for maximum visibility.
                            </p>
                        </div>
                        <Link href="/editor/setup" className="btn-premium btn-premium-primary group">
                            Start Building Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'Data Extraction', desc: 'Our machine-learning parser extracts your career history with 99.9% accuracy. No more manual entry.', icon: <ShieldCheck className="w-10 h-10 text-primary-600" />, color: 'bg-primary-50' },
                            { step: '02', title: 'AI Enhancement', desc: 'Real-time optimization turns basic bullet points into achievement-driven statements.', icon: <Zap className="w-10 h-10 text-indigo-600" />, color: 'bg-indigo-50' },
                            { step: '03', title: 'ATS Distribution', desc: 'Export clean, machine-readable formats (PDF, DOCX) guaranteed to score 95+ on all major ATS.', icon: <Download className="w-10 h-10 text-emerald-600" />, color: 'bg-emerald-50' }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-10 rounded-[2.5rem] bg-neutral-50 border border-neutral-100 hover:bg-white hover:shadow-2xl hover:border-primary-100 transition-all duration-500">
                                <div className="flex items-center justify-between mb-10">
                                    <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", item.color)}>
                                        {item.icon}
                                    </div>
                                    <span className="text-4xl font-black text-neutral-200 group-hover:text-primary-100 transition-colors italic tracking-tighter">{item.step}</span>
                                </div>
                                <h4 className="text-2xl font-black text-neutral-950 mb-4 tracking-tight">{item.title}</h4>
                                <p className="text-neutral-500 font-bold leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ProductSuite />

            <AIDemoSection />





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
                    <div className="mt-40 p-16 md:p-24 rounded-[4rem] bg-neutral-950 text-white text-center relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5">
                        {/* Premium Glow Effects */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                        <div className="absolute top-0 right-0 p-24 opacity-5 rotate-12 scale-150 pointer-events-none"><Zap className="w-64 h-64 text-primary-500" /></div>

                        <div className="relative z-10">
                            <h3 className="text-4xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter uppercase italic">
                                Ready to Clear <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-200 to-white">Your Path?</span>
                            </h3>
                            <p className="text-neutral-200 mb-14 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
                                Join the elite professionals who are already using the platform to claim their seat at the table.
                            </p>
                            <Link href="/onboarding" className="btn-premium btn-premium-primary !px-16 !py-8 text-xl group inline-flex shadow-2xl shadow-primary-900/40">
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
