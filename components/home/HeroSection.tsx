import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Shield, FileText, Zap } from 'lucide-react'
import { HeroTemplateSlideshow } from './HeroTemplateSlideshow'

export function HeroSection() {
    return (
        <section className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden bg-neutral-950 pt-20 pb-0">

            {/* ── LAYERED BACKGROUND ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Deep solid color wash — no gradients, just layered solids */}
                <div className="absolute top-0 left-0 w-full h-[60%] bg-neutral-950" />
                <div className="absolute bottom-0 left-0 w-full h-[50%] bg-[#0a0f1a]" />
                {/* Subtle grid overlay for texture */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
                {/* Solid accent glow */}
                <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-primary-500/[0.07] blur-[120px]" />
                <div className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-indigo-500/[0.05] blur-[100px]" />
                {/* Top edge line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.04]" />
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* ── LEFT COLUMN ── */}
                    <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center py-16 lg:py-20">

                        {/* Status badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-bold text-primary-400 mb-8 w-max">
                            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                            <span>Built for ambitious professionals</span>
                        </div>

                        {/* ── HEADLINE — Solid, no gradients ── */}
                        <h1 className="text-[3.25rem] sm:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-black leading-[0.92] tracking-[-0.03em] mb-7">
                            <span className="text-white block">Built to Get</span>
                            <span className="text-white block">You <span className="text-primary-400">Hired.</span></span>
                        </h1>

                        {/* Subheadline — sharp and direct */}
                        <p className="text-lg sm:text-xl text-neutral-400 mb-10 leading-relaxed max-w-lg font-medium">
                            Stop getting filtered out. Our ATS-optimised resumes, AI bullet writer, and dedicated
                            ATS scanner are built for one thing — <span className="text-white font-semibold">landing you the interview.</span>
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-14">
                            <Link
                                href="/editor/setup?template=ats-classic"
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4.5 font-bold text-white bg-primary-600 rounded-xl overflow-hidden shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
                                prefetch={true}
                            >
                                <span className="text-[15px] font-extrabold relative z-10">Start Building — It&apos;s Free</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                            <Link
                                href="/templates"
                                className="group inline-flex items-center justify-center gap-3 px-7 py-4 text-[15px] font-bold rounded-xl text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                            >
                                Browse Templates
                            </Link>
                        </div>

                        {/* Stat row — solid numbers, no fluff */}
                        <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
                            {[
                                { value: 'Ready', label: 'ATS Compliant', icon: Shield, color: 'text-emerald-400' },
                                { value: 'Rapid', label: 'Resume Builder', icon: Zap, color: 'text-primary-400' },
                                { value: 'Premium', label: 'Elite Templates', icon: FileText, color: 'text-amber-400' },
                            ].map(({ value, label, icon: Icon, color }) => (
                                <div key={label} className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Icon className={`w-4 h-4 ${color} shrink-0`} />
                                    </div>
                                    <div>
                                        <span className={`text-lg font-black ${color} block leading-tight`}>{value}</span>
                                        <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider">{label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN — Template Slideshow ── */}
                    <div className="lg:col-span-6 xl:col-span-5 relative hidden lg:flex items-center justify-center">
                        {/* Solid glow behind slideshow */}
                        <div className="absolute inset-0 bg-primary-500/[0.08] blur-[80px] rounded-full pointer-events-none" />
                        <HeroTemplateSlideshow />

                        {/* Floating card — ATS Score */}
                        <div className="absolute -right-6 top-[42%] z-40 px-4 py-3 bg-neutral-900/95 border border-emerald-500/20 rounded-2xl shadow-2xl backdrop-blur-xl animate-float" style={{ animationDelay: '2s' }}>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1.5">ATS Score</p>
                            <div className="flex items-end gap-2">
                                <span className="text-[28px] font-black text-white leading-none">99</span>
                                <span className="text-sm font-bold text-white/30 mb-0.5">/100</span>
                            </div>
                            <div className="mt-2 h-1.5 w-28 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-[99%] rounded-full bg-emerald-400" />
                            </div>
                        </div>

                        {/* Floating card — AI generating */}
                        <div className="absolute -left-6 bottom-[18%] z-40 flex items-center gap-3 px-4 py-3 bg-neutral-900/95 border border-primary-500/20 rounded-2xl shadow-2xl backdrop-blur-xl animate-float" style={{ animationDelay: '4s' }}>
                            <div className="w-9 h-9 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center shrink-0">
                                <Sparkles className="w-4 h-4 text-primary-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary-400">AI Writing</p>
                                <p className="text-[13px] font-bold text-white">Optimising bullets…</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM EDGE — solid divider ── */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.06]" />
        </section>
    )
}
