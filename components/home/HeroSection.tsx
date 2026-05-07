import React from 'react'
import Link from 'next/link'
import { Check, Star, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react'
import { HeroTemplateSlideshow } from './HeroTemplateSlideshow'

export function HeroSection() {
    return (
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-b from-white via-primary-50/30 to-white pt-24 pb-20">
            {/* Elegant Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Soft blue radial glow top-right */}
                <div className="absolute top-[-15%] right-[-5%] w-[45%] h-[55%] rounded-full bg-primary-200/40 blur-[100px] opacity-60" />
                {/* Warm accent glow bottom-left */}
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-sky-100/50 blur-[100px] opacity-50" />
                {/* Subtle center highlight */}
                <div className="absolute top-[30%] left-[40%] w-[25%] h-[25%] rounded-full bg-primary-100/30 blur-[80px] opacity-40" />
                {/* Fine dot pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_30%,transparent_100%)]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10 w-full">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                    {/* Text Content */}
                    <div className="lg:col-span-7 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-black uppercase tracking-[0.15em] mb-8 w-max shadow-sm">
                            <Star className="w-3.5 h-3.5 text-primary-500 fill-primary-500" />
                            <span>The New Standard of Excellence</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-[-0.03em] text-neutral-950 mb-6 leading-[0.95] text-balance">
                            Elevate Your <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-sky-500">Career Legacy.</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-neutral-500 mb-10 leading-relaxed max-w-xl font-medium text-balance">
                            Design a stunning, ATS-optimized resume in minutes.
                            Engineered for elite professionals who demand <span className="text-neutral-800 font-bold">perfection</span> in every detail.
                        </p>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-6 mb-10">
                            <div className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
                                <Shield className="w-4 h-4 text-emerald-500" />
                                <span>100% ATS Compliant</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
                                <Sparkles className="w-4 h-4 text-primary-500" />
                                <span>AI-Powered</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
                                <Check className="w-4 h-4 text-emerald-500" />
                                <span>25+ Templates</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/editor/setup?template=ats-classic"
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 font-bold text-white bg-neutral-950 rounded-2xl overflow-hidden shadow-xl shadow-neutral-950/20 hover:shadow-2xl hover:shadow-neutral-950/30 transition-all duration-300 hover:-translate-y-0.5"
                                prefetch={true}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                <span className="text-lg relative z-10">Build Your Resume</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/onboarding"
                                className="group inline-flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold rounded-2xl text-neutral-700 bg-white border-2 border-neutral-200 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                <Zap className="w-5 h-5 text-primary-600 group-hover:scale-110 transition-transform" />
                                Personalize My Path
                            </Link>
                        </div>
                    </div>

                    {/* Visual Right Side - Template Slideshow */}
                    <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center perspective-1000">
                        <HeroTemplateSlideshow />

                        {/* Floating ATS Score Badge */}
                        <div className="absolute -left-10 top-1/4 z-30 bg-white/90 backdrop-blur-xl border border-neutral-200 p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-200">
                                    <Check className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-emerald-600 mb-0.5">ATS Score</p>
                                    <p className="text-xl font-black text-neutral-900">99/100</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating AI Badge */}
                        <div className="absolute -right-6 bottom-1/4 z-30 bg-white/90 backdrop-blur-xl border border-neutral-200 p-3 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '3s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center border border-primary-200">
                                    <Sparkles className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-primary-600 mb-0.5">AI Enhanced</p>
                                    <p className="text-sm font-bold text-neutral-700">Smart Bullets</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient to white */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
        </section>
    )
}
