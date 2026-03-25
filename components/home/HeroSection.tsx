import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Star, FileText, Sparkles, ArrowRight } from 'lucide-react'
import { HeroPreviewClick } from './ClientInteractions'

export function HeroSection() {
    return (
        <section className="relative min-[90vh] flex items-center overflow-hidden bg-neutral-950 pt-32 pb-40">
            {/* Abstract Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-900/40 blur-[120px] mix-blend-screen animate-float opacity-70" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/40 blur-[150px] mix-blend-screen animate-pulse opacity-70" style={{ animationDuration: '8s' }} />
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-violet-900/30 blur-[100px] mix-blend-screen opacity-50" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_20%,transparent_100%)]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10 w-full mt-8">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                    {/* Text Content */}
                    <div className="lg:col-span-7 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-300 text-xs font-black uppercase tracking-[0.2em] mb-8 w-max shadow-[0_0_30px_rgba(79,70,229,0.2)] backdrop-blur-md">
                            <Sparkles className="w-4 h-4 text-primary-400" />
                            <span>The New Standard of Excellence</span>
                        </div>

                        <h1 className="text-6xl sm:text-7xl lg:text-[6.5rem] font-black tracking-[-0.03em] text-white mb-8 leading-[0.9] text-balance">
                            Elevate Your <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-indigo-300 to-violet-400">Career Legacy.</span>
                        </h1>

                        <p className="text-xl text-neutral-400 mb-12 leading-relaxed max-w-xl font-medium text-balance">
                            Design a stunning, ATS-optimized resume in minutes.
                            Engineered for elite professionals who demand <span className="text-white border-b-2 border-primary-500/50 pb-0.5">perfection</span> in every detail.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link
                                href="/editor/setup?template=classic"
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 font-bold text-white bg-primary-600 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] transition-all duration-300 hover:-translate-y-1"
                                prefetch={true}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                <span className="text-lg relative z-10">Build Your Resume</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#templates"
                                className="group inline-flex items-center justify-center px-8 py-5 text-lg font-bold rounded-2xl text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
                            >
                                View Templates
                            </Link>
                        </div>

                        <div className="mt-16 flex items-center gap-6">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-neutral-900 overflow-hidden relative grayscale hover:grayscale-0 hover:scale-110 hover:z-10 transition-all duration-300">
                                        <Image src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="User" fill className="object-cover" sizes="48px" loading="eager" />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-2 border-neutral-900 bg-primary-600 flex items-center justify-center text-white text-[10px] font-black z-10">
                                    10K+
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                                </div>
                                <p className="text-xs font-bold text-neutral-400 tracking-wide">
                                    Trusted by elite professionals
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Visual Right Side - Floating Resumes */}
                    <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center perspective-1000">
                        <div className="relative w-full max-w-[420px] aspect-[21/29.7] animate-float">
                            {/* Back Glow */}
                            <div className="absolute inset-0 bg-primary-500/30 blur-[100px] rounded-full" />

                            {/* Back Card 1 */}
                            <div className="absolute inset-0 -right-8 -top-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 rotate-6 scale-95 opacity-50" />
                            {/* Back Card 2 */}
                            <div className="absolute inset-0 -left-8 -bottom-8 bg-indigo-500/10 backdrop-blur-3xl rounded-2xl border border-indigo-500/20 -rotate-3 scale-95 opacity-70" />

                            {/* Main Card */}
                            <HeroPreviewClick templateId="executive">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none" />
                                <Image
                                    src="/templates/hero-resume-preview.png"
                                    alt="Resume Preview"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 500px"
                                    className="object-cover object-top filter contrast-[1.05]"
                                    priority
                                />

                                {/* Glass Overlay Card inside the main card */}
                                <div className="absolute inset-x-6 bottom-6 p-6 bg-neutral-900/80 backdrop-blur-2xl rounded-2xl border border-white/10 group-hover:translate-y-[-8px] transition-transform duration-500 flex items-center gap-4 z-30">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-xl">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-0.5">Featured Design</p>
                                        <h4 className="text-lg font-black text-white">The Executive</h4>
                                    </div>
                                </div>
                            </HeroPreviewClick>

                            {/* Floating UI Badge */}
                            <div className="absolute -left-12 top-1/4 z-30 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl animate-float" style={{ animationDelay: '1.5s' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                                        <Check className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-emerald-400 mb-0.5">ATS Score</p>
                                        <p className="text-xl font-black text-white">99/100</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom dark transition gradient */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    )
}
