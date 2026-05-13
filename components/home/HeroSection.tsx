import React from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Users, Star, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react'
import { HeroTemplateSlideshow } from './HeroTemplateSlideshow'

export function HeroSection() {
    return (
        <section className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden bg-neutral-950 pt-20 pb-0">

            {/* ── LAYERED BACKGROUND ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Mesh gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.25),transparent)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_60%,rgba(14,165,233,0.12),transparent)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_45%_at_20%_70%,rgba(16,185,129,0.1),transparent)]" />
                {/* Subtle grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* ── LEFT COLUMN ── */}
                    <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center py-16 lg:py-20">

                        {/* Social proof pill */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/70 mb-8 w-max backdrop-blur-sm">
                            <div className="flex -space-x-1.5">
                                {['bg-blue-400', 'bg-sky-400', 'bg-emerald-400', 'bg-amber-400'].map((c, i) => (
                                    <div key={i} className={`w-5 h-5 rounded-full border-2 border-neutral-950 ${c}`} />
                                ))}
                            </div>
                            <span className="text-white/90">Trusted by professionals globally</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>

                        {/* Headline */}
                        <h1 className="text-[3.25rem] sm:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-black leading-[0.92] tracking-[-0.03em] text-white mb-6">
                            Your Resume.
                            <br />
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 50%, #10b981 100%)' }}
                            >
                                Their First Call.
                            </span>
                            <br />
                            <span className="text-white/40">In Minutes.</span>
                        </h1>

                        <p className="text-lg text-white/50 mb-10 leading-relaxed max-w-lg font-medium">
                            ATS-optimised templates, AI-powered bullet points, and real-time score feedback—
                            everything you need to land interviews at the companies you actually want.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-12">
                            <Link
                                href="/editor/setup?template=ats-classic"
                                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 font-bold text-neutral-950 bg-white rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] transition-all duration-300 hover:-translate-y-0.5"
                                prefetch={true}
                            >
                                <span className="text-[15px] relative z-10">Build My Resume — Free</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-sky-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                            <Link
                                href="/templates"
                                className="group inline-flex items-center justify-center gap-3 px-7 py-4 text-[15px] font-bold rounded-xl text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                            >
                                Browse Templates
                            </Link>
                        </div>

                        {/* Trust signals row */}
                        <div className="flex flex-wrap items-center gap-5">
                            {[
                                { icon: CheckCircle2, color: 'text-emerald-400', label: '100% ATS Compliant' },
                                { icon: Sparkles, color: 'text-blue-400', label: 'AI Bullet Writer' },
                                { icon: TrendingUp, color: 'text-sky-400', label: 'Real-time Scoring' },
                            ].map(({ icon: Icon, color, label }) => (
                                <div key={label} className="flex items-center gap-2">
                                    <Icon className={`w-4 h-4 ${color} shrink-0`} />
                                    <span className="text-sm text-white/50 font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN — Template Slideshow ── */}
                    <div className="lg:col-span-6 xl:col-span-5 relative hidden lg:flex items-center justify-center">
                        {/* Glow behind slideshow */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(59,130,246,0.2),transparent)] blur-2xl" />
                        <HeroTemplateSlideshow />

                        {/* Floating card — ATS Score */}
                        <div className="absolute -right-6 top-[42%] z-40 px-4 py-3 bg-neutral-900/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl animate-float" style={{ animationDelay: '2s' }}>
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1.5">ATS Score</p>
                            <div className="flex items-end gap-2">
                                <span className="text-[28px] font-black text-white leading-none">99</span>
                                <span className="text-sm font-bold text-white/30 mb-0.5">/100</span>
                            </div>
                            <div className="mt-2 h-1.5 w-28 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-blue-500 to-emerald-400" />
                            </div>
                        </div>

                        {/* Floating card — AI generating */}
                        <div className="absolute -left-6 bottom-[18%] z-40 flex items-center gap-3 px-4 py-3 bg-neutral-900/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl animate-float" style={{ animationDelay: '4s' }}>
                            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                                <Sparkles className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">AI Writing</p>
                                <p className="text-[13px] font-bold text-white">Optimising bullets…</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
