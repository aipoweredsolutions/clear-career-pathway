'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Sparkles, 
    Upload, 
    Plus, 
    Target, 
    ChevronRight, 
    ChevronLeft, 
    Briefcase, 
    Star, 
    ShieldCheck, 
    Zap,
    X,
    Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { templateRegistry } from '@/lib/templates/registry'
import { calculateTemplateMatchScore } from '@/lib/templates/matching'
import { ResumeDocument } from '@/lib/types/resume'
import { completeOnboarding } from '@/app/editor/actions'

interface OnboardingWizardProps {
    isOpen: boolean
    onClose: (data?: Partial<ResumeDocument>, source?: 'upload' | 'scratch' | null) => void
}

const steps = [
    { id: 'welcome', title: 'The Start of Your Clear Career Path' },
    { id: 'source', title: 'How would you like to begin?' },
    { id: 'role', title: 'Define Your Career Destination' },
    { id: 'template', title: 'Selecting Your Visual Foundation' }
]

export function OnboardingWizard({ isOpen, onClose }: OnboardingWizardProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [role, setRole] = useState('')
    const [industry, setIndustry] = useState('')
    const [source, setSource] = useState<'upload' | 'scratch' | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const step = steps[currentStep]

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            finish()
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const finish = async () => {
        setIsSubmitting(true)
        try {
            await completeOnboarding()
            onClose({
                personalInfo: { professionalTitle: role } as any,
                // We could pass more data here to pre-populate
            }, source)
        } catch (error) {
            console.error('Failed to complete onboarding', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Background Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-neutral-900/90 backdrop-blur-xl"
                onClick={() => {}} // Prevent accidental close
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[700px] border border-white/20"
            >
                {/* Left Panel: Progress & Visuals */}
                <div className="w-full md:w-80 bg-primary-600 p-8 flex flex-col justify-between text-white relative overflow-hidden shrink-0">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <span className="font-black uppercase tracking-[0.2em] text-xs">Clear Career</span>
                        </div>

                        <div className="space-y-6">
                            {steps.map((s, i) => (
                                <div key={s.id} className="flex items-center gap-4 group">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full transition-all duration-500",
                                        i === currentStep ? "bg-white scale-125 shadow-[0_0_10px_white]" : 
                                        i < currentStep ? "bg-white/40" : "bg-white/20"
                                    )} />
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-widest transition-all duration-500",
                                        i === currentStep ? "text-white translate-x-1" : "text-white/40"
                                    )}>
                                        {s.id}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                            <p className="text-[10px] font-medium leading-relaxed opacity-80">
                                &quot;Our mission is to guarantee your resume passes every ATS filter while stunning every human recruiter.&quot;
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Content */}
                <div className="flex-1 bg-white p-8 md:p-12 flex flex-col relative overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col"
                        >
                            <h2 className="text-3xl font-black text-neutral-900 mb-2 leading-tight uppercase tracking-tight">
                                {step.title}
                            </h2>
                            <p className="text-neutral-500 text-sm mb-10">
                                Step {currentStep + 1} of {steps.length} — Let&apos;s optimize your professional narrative.
                            </p>

                            {/* Welcome Step */}
                            {step.id === 'welcome' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-100">
                                            <ShieldCheck className="w-6 h-6 text-emerald-500 mb-3" />
                                            <h4 className="font-bold text-sm mb-1">100% ATS Approved</h4>
                                            <p className="text-[11px] text-neutral-500">Universal compatibility with Workday, Taleo, and more.</p>
                                        </div>
                                        <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-100">
                                            <Zap className="w-6 h-6 text-amber-500 mb-3" />
                                            <h4 className="font-bold text-sm mb-1">AI-Powered Depth</h4>
                                            <p className="text-[11px] text-neutral-500">Transform boring tasks into high-impact achievements.</p>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-primary-50 border border-primary-100 flex items-center gap-4">
                                        <Star className="w-10 h-10 text-primary-600 shrink-0" />
                                        <p className="text-xs text-primary-900 font-medium leading-relaxed">
                                            You are joining 50,000+ professionals who have secured interviews at top firms using our proprietary ATS-Series designs.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Source Step */}
                            {step.id === 'source' && (
                                <div className="grid grid-cols-1 gap-4">
                                    <button 
                                        onClick={() => setSource('upload')}
                                        className={cn(
                                            "p-6 rounded-3xl border-2 transition-all flex items-center gap-6 text-left group",
                                            source === 'upload' ? "border-primary-600 bg-primary-50" : "border-neutral-100 bg-neutral-50 hover:border-neutral-200"
                                        )}
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Upload className="w-7 h-7 text-primary-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-neutral-900 uppercase tracking-widest text-xs mb-1">Upload Existing</h4>
                                            <p className="text-[11px] text-neutral-500">We&apos;ll parse your PDF/DOCX and upgrade the content instantly.</p>
                                        </div>
                                    </button>
                                    <button 
                                        onClick={() => setSource('scratch')}
                                        className={cn(
                                            "p-6 rounded-3xl border-2 transition-all flex items-center gap-6 text-left group",
                                            source === 'scratch' ? "border-primary-600 bg-primary-50" : "border-neutral-100 bg-neutral-50 hover:border-neutral-200"
                                        )}
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Plus className="w-7 h-7 text-primary-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-neutral-900 uppercase tracking-widest text-xs mb-1">Start from Scratch</h4>
                                            <p className="text-[11px] text-neutral-500">Follow our expert guidance to build a winning profile from zero.</p>
                                        </div>
                                    </button>
                                </div>
                            )}

                            {/* Role Step */}
                            {step.id === 'role' && (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-1">Target Job Title</label>
                                            <div className="relative">
                                                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                                <input 
                                                    type="text" 
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                    placeholder="e.g. Senior Software Engineer"
                                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-bold text-neutral-900 placeholder:text-neutral-300"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-1">Industry</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                                <select 
                                                    value={industry}
                                                    onChange={(e) => setIndustry(e.target.value)}
                                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-bold text-neutral-900 appearance-none"
                                                >
                                                    <option value="">Select Industry...</option>
                                                    <option value="tech">Technology & Software</option>
                                                    <option value="finance">Finance & Banking</option>
                                                    <option value="healthcare">Healthcare & Medicine</option>
                                                    <option value="creative">Creative & Design</option>
                                                    <option value="education">Education & Research</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                        <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
                                            Our AI uses your job title to suggest high-impact keywords that recruiters are searching for right now.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Template Step */}
                            {step.id === 'template' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {templateRegistry.slice(0, 2).map(t => (
                                            <div key={t.id} className="relative group p-1 bg-neutral-100 rounded-2xl border border-neutral-200 hover:border-primary-400 transition-all cursor-pointer">
                                                <div className="aspect-[3/4] rounded-xl bg-white overflow-hidden relative shadow-sm">
                                                    <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-neutral-900/0 transition-colors" />
                                                    {/* We could render a mini preview here */}
                                                    <div className="p-4 space-y-2 opacity-20">
                                                        <div className="w-full h-2 bg-neutral-400 rounded" />
                                                        <div className="w-2/3 h-2 bg-neutral-300 rounded" />
                                                        <div className="space-y-1 pt-4">
                                                            <div className="w-full h-1 bg-neutral-200" />
                                                            <div className="w-full h-1 bg-neutral-200" />
                                                            <div className="w-5/6 h-1 bg-neutral-200" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-3">
                                                    <h4 className="font-bold text-[11px] text-neutral-900">{t.name}</h4>
                                                    <p className="text-[9px] text-neutral-500">Match Score: 98%</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-center text-[10px] text-neutral-400 italic">
                                        Don&apos;t worry, you can switch between 25+ templates at any time in the editor.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Footer */}
                    <div className="mt-12 flex items-center justify-between pt-8 border-t border-neutral-100">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={cn(
                                "flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all",
                                currentStep === 0 ? "opacity-0 pointer-events-none" : "text-neutral-400 hover:text-neutral-900"
                            )}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </button>

                        <div className="flex gap-2">
                            {currentStep === 0 ? (
                                <Button 
                                    variant="primary" 
                                    onClick={handleNext}
                                    className="px-10 rounded-full font-black uppercase tracking-widest text-[10px] h-12 shadow-xl shadow-primary-500/20"
                                >
                                    Start My Path
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button 
                                    variant="primary" 
                                    onClick={handleNext}
                                    disabled={
                                        (step.id === 'source' && !source) ||
                                        (step.id === 'role' && !role) ||
                                        isSubmitting
                                    }
                                    className="px-10 rounded-full font-black uppercase tracking-widest text-[10px] h-12 shadow-xl shadow-primary-500/20"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            {currentStep === steps.length - 1 ? 'Go to Editor' : 'Next Step'}
                                            <ChevronRight className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
