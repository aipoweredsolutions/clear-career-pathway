'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronRight, FileText, ScanLine, Target, Briefcase, Zap, Compass, User, BriefcaseBusiness, ShieldCheck, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

import { saveOnboardingPreferences } from './actions'

type Goal = 'build' | 'scan' | 'interview' | 'track'
type Experience = 'entry' | 'mid' | 'senior' | 'executive'
type Industry = 'tech' | 'finance' | 'creative' | 'healthcare' | 'other'

export default function OnboardingPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    
    // State
    const [goal, setGoal] = useState<Goal | null>(null)
    const [experience, setExperience] = useState<Experience | null>(null)
    const [industry, setIndustry] = useState<Industry | null>(null)

    const handleNext = () => {
        if (step < 3) setStep(step + 1)
        else completeOnboarding()
    }

    const completeOnboarding = async () => {
        setIsLoading(true)
        
        try {
            // Save to database if possible
            await saveOnboardingPreferences({ goal, experience, industry })

            // Save to localStorage for client-side tools
            localStorage.setItem('ccp_onboarding_completed', 'true')
            localStorage.setItem('ccp_user_preferences', JSON.stringify({ goal, experience, industry }))
            
            // Set a cookie so Server Components (like Dashboard) know onboarding is done
            document.cookie = "ccp_onboarding_completed=true; path=/; max-age=31536000" // 1 year

            // Redirect based on goal
            if (goal === 'build') {
                router.push('/templates')
            } else if (goal === 'scan') {
                router.push('/ats-resume-scanner')
            } else if (goal === 'interview') {
                router.push('/career-hub?tab=interview_prep')
            } else {
                router.push('/dashboard')
            }
        } catch (error) {
            console.error('Failed to complete onboarding:', error)
            // Still redirect to dashboard as fallback
            router.push('/dashboard')
        } finally {
            setIsLoading(false)
        }
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    }

    return (
        <div className="fixed inset-0 z-50 bg-neutral-950 text-white flex flex-col font-sans overflow-y-auto overflow-x-hidden">
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-neutral-900 fixed top-0 left-0 z-[60]">
                <div 
                    className="h-full bg-primary-500 transition-all duration-700 ease-in-out"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                
                {/* Background effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-3xl w-full relative z-10">
                    <AnimatePresence mode="wait" custom={1}>
                        
                        {/* STEP 1: GOAL */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                custom={1}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="space-y-10"
                            >
                                <div className="text-center space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-black uppercase tracking-widest border border-primary-500/20 mb-4">
                                        <Compass className="w-4 h-4" /> Step 1 of 3
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic">What brings you to <span className="text-primary-500">Clear Career?</span></h1>
                                    <p className="text-neutral-400 text-lg md:text-xl font-medium max-w-xl mx-auto">Select your primary objective so we can personalize your workspace.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: 'build', icon: FileText, title: 'Build a Resume', desc: 'Create an ATS-compliant resume from scratch' },
                                        { id: 'scan', icon: ScanLine, title: 'Scan & Score', desc: 'Upload my existing resume for AI gap analysis' },
                                        { id: 'interview', icon: Target, title: 'Ace an Interview', desc: 'Practice with AI-powered mock interviews' },
                                        { id: 'track', icon: Briefcase, title: 'Track Applications', desc: 'Manage my job search pipeline in one place' }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setGoal(item.id as Goal)}
                                            className={cn(
                                                "p-6 rounded-3xl border-2 text-left transition-all duration-300 group relative overflow-hidden",
                                                goal === item.id 
                                                    ? "bg-primary-500/10 border-primary-500" 
                                                    : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                                                goal === item.id ? "bg-primary-500 text-white" : "bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700 group-hover:text-white"
                                            )}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className={cn("text-xl font-black mb-2 tracking-tight", goal === item.id ? "text-white" : "text-neutral-200")}>{item.title}</h3>
                                            <p className="text-neutral-500 text-sm font-medium">{item.desc}</p>
                                            
                                            {goal === item.id && (
                                                <div className="absolute top-6 right-6 text-primary-500">
                                                    <CheckCircle2 className="w-6 h-6" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-end pt-8">
                                    <button 
                                        onClick={handleNext}
                                        disabled={!goal}
                                        className="bg-white text-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-neutral-200 transition-colors"
                                    >
                                        Continue <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: EXPERIENCE */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                custom={1}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="space-y-10"
                            >
                                <div className="text-center space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-black uppercase tracking-widest border border-primary-500/20 mb-4">
                                        <User className="w-4 h-4" /> Step 2 of 3
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic">Where are you in your <span className="text-primary-500">career?</span></h1>
                                    <p className="text-neutral-400 text-lg md:text-xl font-medium max-w-xl mx-auto">This helps our AI tailor its recommendations and resume templates to your specific career stage.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: 'entry', title: 'Entry Level', desc: '0-2 years of experience. Looking for my first major role or early career growth.' },
                                        { id: 'mid', title: 'Mid Level', desc: '3-7 years of experience. Seeking to climb the ladder or transition into management.' },
                                        { id: 'senior', title: 'Senior Level', desc: '8+ years of experience. Experienced professional leading teams or complex projects.' },
                                        { id: 'executive', title: 'Executive / C-Suite', desc: 'VP, Director, or C-level. Focusing on organizational impact and board-level strategy.' }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setExperience(item.id as Experience)}
                                            className={cn(
                                                "p-6 rounded-3xl border-2 text-left transition-all duration-300 group relative overflow-hidden",
                                                experience === item.id 
                                                    ? "bg-primary-500/10 border-primary-500" 
                                                    : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900"
                                            )}
                                        >
                                            <h3 className={cn("text-xl font-black mb-2 tracking-tight", experience === item.id ? "text-white" : "text-neutral-200")}>{item.title}</h3>
                                            <p className="text-neutral-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                                            
                                            {experience === item.id && (
                                                <div className="absolute top-6 right-6 text-primary-500">
                                                    <CheckCircle2 className="w-6 h-6" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-between pt-8">
                                    <button 
                                        onClick={() => setStep(1)}
                                        className="text-neutral-400 hover:text-white px-6 py-4 font-black text-sm uppercase tracking-widest transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        onClick={handleNext}
                                        disabled={!experience}
                                        className="bg-white text-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-neutral-200 transition-colors"
                                    >
                                        Continue <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: INDUSTRY */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                custom={1}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="space-y-10"
                            >
                                <div className="text-center space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-black uppercase tracking-widest border border-primary-500/20 mb-4">
                                        <BriefcaseBusiness className="w-4 h-4" /> Final Step
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic">Select your <span className="text-primary-500">target industry.</span></h1>
                                    <p className="text-neutral-400 text-lg md:text-xl font-medium max-w-xl mx-auto">Different industries have different ATS parsers and keyword expectations.</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[
                                        { id: 'tech', title: 'Tech & Software' },
                                        { id: 'finance', title: 'Finance & Biz' },
                                        { id: 'creative', title: 'Creative & Design' },
                                        { id: 'healthcare', title: 'Healthcare' },
                                        { id: 'engineering', title: 'Engineering' },
                                        { id: 'other', title: 'Other / General' }
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setIndustry(item.id as Industry)}
                                            className={cn(
                                                "p-6 rounded-3xl border-2 text-center transition-all duration-300 group relative overflow-hidden",
                                                industry === item.id 
                                                    ? "bg-primary-500/10 border-primary-500" 
                                                    : "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900"
                                            )}
                                        >
                                            <h3 className={cn("font-black tracking-tight", industry === item.id ? "text-white" : "text-neutral-400 group-hover:text-neutral-200")}>{item.title}</h3>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-between pt-8">
                                    <button 
                                        onClick={() => setStep(2)}
                                        className="text-neutral-400 hover:text-white px-6 py-4 font-black text-sm uppercase tracking-widest transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        onClick={handleNext}
                                        disabled={!industry || isLoading}
                                        className="bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/20 min-w-[200px] justify-center"
                                    >
                                        {isLoading ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Zap className="w-4 h-4 fill-white" />
                                        )}
                                        {isLoading ? 'Saving...' : 'Complete Setup'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Skip link */}
                <button
                    onClick={async () => {
                        await saveOnboardingPreferences({ goal: null, experience: null, industry: null })
                        document.cookie = "ccp_onboarding_completed=true; path=/; max-age=31536000"
                        localStorage.setItem('ccp_onboarding_completed', 'true')
                        router.push('/dashboard')
                    }}
                    className="mt-12 text-neutral-600 hover:text-neutral-400 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                    Skip for now →
                </button>
            </div>
        </div>
    )
}
