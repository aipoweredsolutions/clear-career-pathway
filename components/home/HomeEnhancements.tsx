'use client'

import React, { useState, useEffect } from 'react'
import { Check, X, Sparkles, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export function BrandMarquee() {
    const brands = [
        "Google", "Amazon", "Meta", "Microsoft", "Goldman Sachs",
        "Deloitte", "Salesforce", "J.P. Morgan", "McKinsey", "Adobe"
    ]

    return (
        <div className="py-12 bg-white border-y border-neutral-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400">
                    Our Graduates Work At
                </p>
            </div>
            <div className="relative flex overflow-x-hidden">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
                    {[...brands, ...brands].map((brand, i) => (
                        <span key={i} className="text-3xl font-black text-neutral-200 hover:text-primary-600 transition-colors cursor-default tracking-tighter">
                            {brand}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function AIDemoSection() {
    const demos = [
        {
            before: "I was responsible for managing a team of developers and making sure projects were finished on time.",
            after: "Orchestrated a cross-functional team of 12 developers, delivering 15+ high-stakes projects 20% ahead of schedule using Agile methodologies.",
            highlight: "Orchestrated • cross-functional • 20% ahead of schedule"
        },
        {
            before: "I helped customers with their problems and answered phone calls.",
            after: "Resolved 50+ complex technical inquiries daily with a 98% customer satisfaction rating, reducing average ticket resolution time by 15 minutes.",
            highlight: "Resolved • 98% satisfaction • reducing resolution time"
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setIsAnimating(true)
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % demos.length)
                setIsAnimating(false)
            }, 500)
        }, 5000)
        return () => clearInterval(timer)
    }, [demos.length])

    return (
        <section className="py-32 bg-neutral-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-widest mb-8">
                            <Zap className="w-4 h-4" />
                            <span>Instant Impact</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1]">
                            Stop writing. <br />
                            <span className="text-primary-500">Start Storytelling.</span>
                        </h2>
                        <p className="text-xl text-neutral-400 mb-10 leading-relaxed max-w-xl">
                            Our AI doesn&apos;t just check spelling. It transforms passive tasks into data-driven achievements that command attention from top-tier recruiters.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: <Target className="w-5 h-5" />, title: "Action-Oriented Verbs", desc: "Swap 'managed' for 'spearheaded' or 'orchestrated'." },
                                { icon: <TrendingUp className="w-5 h-5" />, title: "Metric Injection", desc: "Automatically identify where to add percentages and dollar amounts." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-500 shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                        <p className="text-neutral-500 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-neutral-800 rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6">
                                <Sparkles className="w-8 h-8 text-primary-500 opacity-20" />
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4">Original Bullet</p>
                                    <div className="bg-neutral-900/50 p-6 rounded-2xl text-neutral-400 italic text-sm border border-white/5">
                                        &quot;{demos[currentIndex].before}&quot;
                                    </div>
                                </div>

                                <ArrowRight className="w-6 h-6 text-primary-500 mx-auto animate-bounce-x" />

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="relative"
                                    >
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary-500 mb-4">AI Enhanced 🎉</p>
                                        <div className="bg-primary-500 text-white p-6 rounded-2xl text-lg font-bold shadow-xl shadow-primary-500/20 leading-relaxed">
                                            {demos[currentIndex].after}
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {demos[currentIndex].highlight.split(' • ').map((word, i) => (
                                                <span key={i} className="text-[10px] bg-white/10 text-white/60 px-2 py-1 rounded-md font-bold uppercase tracking-wider italic">
                                                    {word}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Floating Stats */}
                        <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl hidden md:block">
                            <p className="text-3xl font-black text-neutral-900">+114%</p>
                            <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Interview rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function ComparisonSection() {
    const rows = [
        { feature: "Professional Design", self: true, coach: true, other: "Generic" },
        { feature: "AI Content Strategy", self: true, coach: "Extra $", other: false },
        { feature: "ATS Optimization", self: true, coach: true, other: "Basic" },
        { feature: "Unlimited Edits", self: true, coach: "No", other: "Extra $" },
        { feature: "Instant Delivery", self: true, coach: "Weeks", other: true },
        { feature: "Career Roadmap", self: true, coach: "No", other: false },
    ]

    return (
        <section className="py-32 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-black text-neutral-900 mb-6 uppercase tracking-tighter">
                        Why Clear Career Path?
                    </h2>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                        We offer more than a career coach, at 1/20th of the price.
                    </p>
                </div>

                <div className="overflow-hidden border border-neutral-100 rounded-[2rem] shadow-2xl shadow-neutral-200/50">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50">
                                <th className="p-8 text-sm font-black uppercase tracking-widest text-neutral-400">Features</th>
                                <th className="p-8 text-center">
                                    <div className="mb-2 text-primary-600 font-black italic tracking-tighter text-xl">Clear Path</div>
                                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Our Service</div>
                                </th>
                                <th className="p-8 text-center text-sm font-black uppercase text-neutral-500 opacity-50">Career Coach</th>
                                <th className="p-8 text-center text-sm font-black uppercase text-neutral-500 opacity-50">Other Apps</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <tr key={i} className="border-t border-neutral-100 hover:bg-neutral-50/50 transition-colors">
                                    <td className="p-8 font-bold text-neutral-700">{row.feature}</td>
                                    <td className="p-8 text-center">
                                        <div className="flex justify-center">
                                            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-200">
                                                <Check className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="flex justify-center flex-col items-center">
                                            {typeof row.coach === 'boolean' ? (
                                                row.coach ? <Check className="w-5 h-5 text-neutral-300" /> : <X className="w-5 h-5 text-neutral-200" />
                                            ) : (
                                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{row.coach}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-8 text-center">
                                        <div className="flex justify-center flex-col items-center">
                                            {typeof row.other === 'boolean' ? (
                                                row.other ? <Check className="w-5 h-5 text-neutral-300" /> : <X className="w-5 h-5 text-neutral-200" />
                                            ) : (
                                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{row.other}</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-primary-600 text-white">
                                <td className="p-10 font-black text-2xl uppercase tracking-tighter italic">Total Value</td>
                                <td className="p-10 text-center">
                                    <div className="text-3xl font-black">$14.99</div>
                                    <div className="text-[10px] font-bold opacity-70 uppercase tracking-widest">The Winner</div>
                                </td>
                                <td className="p-10 text-center opacity-60">
                                    <div className="text-xl font-bold">$350+</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest">Average Cost</div>
                                </td>
                                <td className="p-10 text-center opacity-60">
                                    <div className="text-xl font-bold">$49.99/mo</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest">Subscription</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
