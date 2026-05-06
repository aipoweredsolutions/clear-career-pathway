import React from 'react'
import { Metadata } from 'next'
import { Check, X, ShieldCheck, Zap, Target, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'The Best Zety Alternative 2026 | Free ATS Resume Builder',
    description: 'Looking for a Zety alternative? Clear Career Path offers 100% ATS-compliant templates, real-time AI keyword scanning, and premium designs without the hidden fees.',
}

export default function ZetyAlternativePage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50 -skew-x-12 translate-x-20 z-0" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-black uppercase tracking-widest mb-6">
                            <ShieldCheck className="w-4 h-4" />
                            100% ATS COMPLIANT ALTERNATIVE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-neutral-900 leading-[1.1] mb-8 uppercase tracking-tighter">
                            The Smart <span className="text-primary-600">Zety Alternative</span> for 2026
                        </h1>
                        <p className="text-xl text-neutral-600 font-medium leading-relaxed mb-10 max-w-2xl">
                            Don&apos;t risk your career on &quot;pretty&quot; designs that fail ATS filters. Clear Career Path combines elite visual design with proprietary ATS-Series technology to guarantee you get past the bots.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="px-10 h-14 rounded-full font-black uppercase tracking-widest text-xs">
                                <Link href="/editor/new">Create My ATS Resume Now</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="px-10 h-14 rounded-full font-black uppercase tracking-widest text-xs border-2">
                                <Link href="/templates">View Pro Templates</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24 bg-neutral-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tight mb-4">How we compare to Zety</h2>
                        <p className="text-neutral-500 font-medium">Visuals are important, but compliance gets you hired.</p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-neutral-100">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-neutral-100">
                                    <th className="p-8 text-xs font-black uppercase tracking-widest text-neutral-400">Features</th>
                                    <th className="p-8 text-center bg-primary-50">
                                        <span className="text-primary-600 text-xs font-black uppercase tracking-widest block mb-1">Clear Career Path</span>
                                        <span className="text-[10px] text-primary-400 font-bold uppercase">(The Winner)</span>
                                    </th>
                                    <th className="p-8 text-center">
                                        <span className="text-neutral-900 text-xs font-black uppercase tracking-widest block mb-1">Zety</span>
                                        <span className="text-[10px] text-neutral-300 font-bold uppercase">(Competitor)</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium">
                                <tr className="border-b border-neutral-50">
                                    <td className="p-8 text-neutral-900 font-bold">100% ATS Parsing Guarantee</td>
                                    <td className="p-8 text-center bg-primary-50/50"><Check className="w-6 h-6 text-emerald-500 mx-auto" /></td>
                                    <td className="p-8 text-center"><X className="w-6 h-6 text-rose-500 mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-neutral-50">
                                    <td className="p-8 text-neutral-900 font-bold">Real-time Keyword Scanner</td>
                                    <td className="p-8 text-center bg-primary-50/50"><Check className="w-6 h-6 text-emerald-500 mx-auto" /></td>
                                    <td className="p-8 text-center"><X className="w-6 h-6 text-rose-500 mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-neutral-50">
                                    <td className="p-8 text-neutral-900 font-bold">AI Content Optimization</td>
                                    <td className="p-8 text-center bg-primary-50/50"><Check className="w-6 h-6 text-emerald-500 mx-auto" /></td>
                                    <td className="p-8 text-center"><Check className="w-6 h-6 text-emerald-500 mx-auto" /></td>
                                </tr>
                                <tr className="border-b border-neutral-50">
                                    <td className="p-8 text-neutral-900 font-bold">One-Click Multi-Format Export</td>
                                    <td className="p-8 text-center bg-primary-50/50"><Check className="w-6 h-6 text-emerald-500 mx-auto" /></td>
                                    <td className="p-8 text-center"><X className="w-6 h-6 text-rose-500 mx-auto" /></td>
                                </tr>
                                <tr>
                                    <td className="p-8 text-neutral-900 font-bold">Transparent Pricing</td>
                                    <td className="p-8 text-center bg-primary-50/50"><Check className="w-6 h-6 text-emerald-500 mx-auto" /></td>
                                    <td className="p-8 text-center"><X className="w-6 h-6 text-rose-500 mx-auto" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                                <Target className="w-7 h-7 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-black text-neutral-900 uppercase italic tracking-tight">Built for the Bots</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Most Zety templates use complex grids and images that break ATS systems. Our ATS-Series templates use semantic HTML that guarantees perfect parsing.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center">
                                <Zap className="w-7 h-7 text-violet-600" />
                            </div>
                            <h3 className="text-xl font-black text-neutral-900 uppercase italic tracking-tight">AI Keyword Intelligence</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Don&apos;t just build a resume—optimize it. Our Keyword Scanner analyzes your target job description and tells you exactly what&apos;s missing.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
                                <Star className="w-7 h-7 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-black text-neutral-900 uppercase italic tracking-tight">Premium Aesthetic</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Our templates aren&apos;t just functional—they&apos;re stunning. Designed by world-class typography experts to make you stand out from the crowd.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-neutral-900 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">
                        Ready to Upgrade Your <br />Career Narrative?
                    </h2>
                    <p className="text-white/60 text-lg font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join 50,000+ professionals who have switched from generic builders to Clear Career Path and secured interviews at Google, Apple, and McKinsey.
                    </p>
                    <Button size="lg" className="px-12 h-16 rounded-full font-black uppercase tracking-widest text-sm bg-white text-neutral-900 hover:bg-neutral-100">
                        <Link href="/editor/new">Start Building for Free</Link>
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </section>
        </div>
    )
}
