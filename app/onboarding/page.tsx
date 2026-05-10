'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    CheckCircle2, 
    ChevronRight, 
    FileText, 
    ScanLine, 
    Target, 
    Briefcase, 
    Zap, 
    Compass, 
    User, 
    BriefcaseBusiness, 
    ArrowRight,
    Sparkles,
    MousePointer2,
    Layout,
    ShieldCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { saveOnboardingPreferences } from './actions'

type Goal = 'build' | 'scan' | 'interview' | 'track'
type Experience = 'entry' | 'mid' | 'senior' | 'executive'
type Industry = 'tech' | 'finance' | 'creative' | 'healthcare' | 'engineering' | 'other'

export default function OnboardingPage() {
    const router = useRouter()
    const [step, setStep] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    
    // State
    const [goal, setGoal] = useState<Goal | null>(null)
    const [experience, setExperience] = useState<Experience | null>(null)
    const [industry, setIndustry] = useState<Industry | null>(null)

    // Scroll to top when step changes to ensure navigation clarity
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [step])

    // Handle mouse movement for parallax background
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 20,
                y: (e.clientY / window.innerHeight) * 20
            })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const handleNext = () => {
        if (step < 3) setStep(step + 1)
        else completeOnboarding()
    }

    const completeOnboarding = async () => {
        setIsLoading(true)
        try {
            await saveOnboardingPreferences({ goal, experience, industry })
            localStorage.setItem('ccp_onboarding_completed', 'true')
            localStorage.setItem('ccp_user_preferences', JSON.stringify({ goal, experience, industry }))
            document.cookie = "ccp_onboarding_completed=true; path=/; max-age=31536000"
            
            if (goal === 'build') router.push('/templates')
            else if (goal === 'scan') router.push('/ats-resume-scanner')
            else if (goal === 'interview') router.push('/career-hub?tab=interview_prep')
            else router.push('/dashboard')
        } catch (error) {
            console.error('Failed to complete onboarding:', error)
            router.push('/dashboard')
        } finally {
            setIsLoading(false)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6, 
                staggerChildren: 0.1,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        exit: { 
            opacity: 0, 
            y: -20,
            transition: { duration: 0.4 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div className="relative min-h-[calc(100vh-80px)] mt-20 text-neutral-950 flex flex-col font-sans overflow-hidden">
            {/* Ambient Background Elements - Soft Light Mesh */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <motion.div 
                    className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary-100/50 blur-[140px] rounded-full"
                    animate={{
                        x: mousePosition.x * -1.2,
                        y: mousePosition.y * -1.2,
                    }}
                />
                <motion.div 
                    className="absolute bottom-[-15%] right-[-10%] w-[80%] h-[80%] bg-indigo-50/50 blur-[160px] rounded-full"
                    animate={{
                        x: mousePosition.x * 1.2,
                        y: mousePosition.y * 1.2,
                    }}
                />
                
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px]" />
                
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] contrast-125" />
            </div>

            {/* Progress Bar */}
            <AnimatePresence>
                {step > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full h-1 bg-neutral-100 fixed top-[73px] left-0 z-[60]"
                    >
                        <motion.div 
                            className="h-full bg-gradient-to-r from-primary-600 to-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                <AnimatePresence mode="wait">
                    
                    {/* STEP 0: WELCOME */}
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="max-w-4xl w-full text-center space-y-12"
                        >
                            <motion.div variants={itemVariants} className="flex justify-center">
                                <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-neutral-100 rotate-12 relative group">
                                    <Sparkles className="w-12 h-12 text-primary-600" />
                                    <div className="absolute -inset-4 bg-primary-100 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </motion.div>
                            
                            <motion.div variants={itemVariants} className="space-y-6">
                                <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] text-neutral-950">
                                    Your Career, <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 italic">Redefined.</span>
                                </h1>
                                <p className="text-neutral-500 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                                    Welcome to Clear Career Path. Let&apos;s customize your journey to help you land your dream role.
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
                                <button 
                                    onClick={() => setStep(1)}
                                    className="group relative px-12 py-6 bg-neutral-950 text-white rounded-full font-black text-lg uppercase tracking-tighter flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20"
                                >
                                    Get Started
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-neutral-400 text-sm font-bold uppercase tracking-widest">Takes less than 30 seconds</p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* STEP 1: GOAL */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="max-w-5xl w-full space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-[0.2em] border border-primary-100">
                                    <Compass className="w-3.5 h-3.5" /> Step 1 of 3
                                </motion.div>
                                <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tight text-neutral-950">
                                    What&apos;s your <span className="italic text-primary-600">primary goal?</span>
                                </motion.h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { id: 'build', icon: FileText, title: 'Build a Resume', desc: 'Create an ATS-optimized resume from scratch with AI.', color: 'from-blue-500 to-cyan-500' },
                                    { id: 'scan', icon: ScanLine, title: 'Scan & Score', desc: 'Audit your existing resume against target jobs.', color: 'from-purple-500 to-pink-500' },
                                    { id: 'interview', icon: Target, title: 'Ace Interviews', desc: 'Master your pitch with AI-powered mock sessions.', color: 'from-orange-500 to-amber-500' },
                                    { id: 'track', icon: Briefcase, title: 'Job Tracking', desc: 'Manage your entire application pipeline effortlessly.', color: 'from-emerald-500 to-teal-500' }
                                ].map((item) => (
                                    <motion.button
                                        key={item.id}
                                        variants={itemVariants}
                                        onClick={() => setGoal(item.id as Goal)}
                                        className={cn(
                                            "group p-8 rounded-[2.5rem] border transition-all duration-500 text-left relative overflow-hidden",
                                            goal === item.id 
                                                ? "bg-white border-primary-500 shadow-[0_20px_50px_rgba(0,0,0,0.06)] scale-[1.02]" 
                                                : "bg-white/50 border-neutral-100 hover:border-neutral-200 hover:bg-white hover:shadow-xl"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110",
                                            goal === item.id ? "bg-primary-600 text-white shadow-lg" : "bg-neutral-50 text-neutral-400 group-hover:bg-neutral-100 group-hover:text-primary-600"
                                        )}>
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <div className="space-y-2 relative z-10">
                                            <h3 className={cn("text-2xl font-black tracking-tight transition-colors", goal === item.id ? "text-neutral-950" : "text-neutral-700")}>{item.title}</h3>
                                            <p className="text-neutral-500 font-medium leading-relaxed group-hover:text-neutral-600 transition-colors">{item.desc}</p>
                                        </div>

                                        {/* Selection Indicators */}
                                        {goal === item.id && (
                                            <motion.div 
                                                layoutId="selected-indicator"
                                                className="absolute top-8 right-8"
                                            >
                                                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex flex-col items-center gap-8 pt-4">
                                <motion.div variants={itemVariants} className="flex gap-2">
                                    {[1, 2, 3].map((s) => (
                                        <div 
                                            key={s} 
                                            className={cn(
                                                "w-2 h-2 rounded-full transition-all duration-500",
                                                s === 1 ? "w-8 bg-primary-600" : "bg-neutral-200"
                                            )} 
                                        />
                                    ))}
                                </motion.div>
                                
                                <motion.div variants={itemVariants} className="flex justify-between items-center w-full">
                                    <button 
                                        onClick={() => setStep(0)}
                                        className="text-neutral-400 hover:text-neutral-950 font-black text-xs uppercase tracking-[0.2em] transition-colors"
                                    >
                                        Back to Start
                                    </button>
                                    <button 
                                        onClick={handleNext}
                                        disabled={!goal}
                                        className="group bg-neutral-950 text-white disabled:opacity-30 disabled:cursor-not-allowed px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Continue
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: EXPERIENCE */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="max-w-4xl w-full space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-[0.2em] border border-primary-100">
                                    <User className="w-3.5 h-3.5" /> Step 2 of 3
                                </motion.div>
                                <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tight text-neutral-950">
                                    Your <span className="italic text-primary-600">experience level.</span>
                                </motion.h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { id: 'entry', title: 'Entry Level', years: '0-2 Years', desc: 'Starting your journey or early career growth.' },
                                    { id: 'mid', title: 'Mid-Level Professional', years: '3-7 Years', desc: 'Scaling impact and seeking specialized roles.' },
                                    { id: 'senior', title: 'Senior Leader', years: '8-12 Years', desc: 'Driving strategy and leading complex initiatives.' },
                                    { id: 'executive', title: 'Executive / C-Suite', years: '12+ Years', desc: 'Shaping organizations at the highest level.' }
                                ].map((item) => (
                                    <motion.button
                                        key={item.id}
                                        variants={itemVariants}
                                        onClick={() => setExperience(item.id as Experience)}
                                        className={cn(
                                            "group p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between text-left relative overflow-hidden",
                                            experience === item.id 
                                                ? "bg-white border-primary-500 shadow-xl" 
                                                : "bg-white/50 border-neutral-100 hover:border-neutral-200"
                                        )}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                                                experience === item.id ? "bg-primary-600 text-white" : "bg-neutral-50 text-neutral-400"
                                            )}>
                                                <BriefcaseBusiness className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className={cn("text-xl font-black tracking-tight", experience === item.id ? "text-neutral-950" : "text-neutral-700")}>{item.title}</h3>
                                                <p className="text-neutral-500 text-sm font-medium">{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className={cn("text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border transition-all", 
                                            experience === item.id ? "bg-neutral-950 text-white border-neutral-950" : "text-neutral-400 border-neutral-200")}>
                                            {item.years}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex flex-col items-center gap-8 pt-4">
                                <motion.div variants={itemVariants} className="flex gap-2">
                                    {[1, 2, 3].map((s) => (
                                        <div 
                                            key={s} 
                                            className={cn(
                                                "w-2 h-2 rounded-full transition-all duration-500",
                                                s === 2 ? "w-8 bg-primary-600" : "bg-neutral-200"
                                            )} 
                                        />
                                    ))}
                                </motion.div>

                                <motion.div variants={itemVariants} className="flex justify-between items-center w-full">
                                    <button 
                                        onClick={() => setStep(1)}
                                        className="text-neutral-400 hover:text-neutral-950 font-black text-xs uppercase tracking-[0.2em] transition-colors"
                                    >
                                        Go Back
                                    </button>
                                    <button 
                                        onClick={handleNext}
                                        disabled={!experience}
                                        className="group bg-neutral-950 text-white disabled:opacity-30 disabled:cursor-not-allowed px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Next Step
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: INDUSTRY */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="max-w-4xl w-full space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-[0.2em] border border-primary-100">
                                    <BriefcaseBusiness className="w-3.5 h-3.5" /> Final Step
                                </motion.div>
                                <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tight text-neutral-950">
                                    Target <span className="italic text-primary-600">industry.</span>
                                </motion.h2>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'tech', title: 'Tech & AI', icon: Zap },
                                    { id: 'finance', title: 'Finance', icon: ShieldCheck },
                                    { id: 'creative', title: 'Creative', icon: Layout },
                                    { id: 'healthcare', title: 'Healthcare', icon: Target },
                                    { id: 'engineering', title: 'Engineering', icon: Briefcase },
                                    { id: 'other', title: 'Something Else', icon: MousePointer2 }
                                ].map((item) => (
                                    <motion.button
                                        key={item.id}
                                        variants={itemVariants}
                                        onClick={() => setIndustry(item.id as Industry)}
                                        className={cn(
                                            "group p-8 rounded-3xl border transition-all duration-300 text-center relative overflow-hidden",
                                            industry === item.id 
                                                ? "bg-white border-primary-500 shadow-xl" 
                                                : "bg-white/50 border-neutral-100 hover:border-neutral-200"
                                        )}
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            <item.icon className={cn("w-8 h-8 transition-colors", industry === item.id ? "text-primary-600" : "text-neutral-400 group-hover:text-primary-500")} />
                                            <h3 className={cn("font-black tracking-tight", industry === item.id ? "text-neutral-950" : "text-neutral-500")}>{item.title}</h3>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex flex-col items-center gap-8 pt-4">
                                <motion.div variants={itemVariants} className="flex gap-2">
                                    {[1, 2, 3].map((s) => (
                                        <div 
                                            key={s} 
                                            className={cn(
                                                "w-2 h-2 rounded-full transition-all duration-500",
                                                s === 3 ? "w-8 bg-primary-600" : "bg-neutral-200"
                                            )} 
                                        />
                                    ))}
                                </motion.div>

                                <motion.div variants={itemVariants} className="flex justify-between items-center w-full">
                                    <button 
                                        onClick={() => setStep(2)}
                                        className="text-neutral-400 hover:text-neutral-950 font-black text-xs uppercase tracking-[0.2em] transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        onClick={handleNext}
                                        disabled={!industry || isLoading}
                                        className="group bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-primary-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary-600/20"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Complete Setup
                                                <Zap className="w-5 h-5 fill-white" />
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Skip Footer */}
            <AnimatePresence>
                {step > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 flex justify-center z-10"
                    >
                        <button
                            onClick={async () => {
                                await saveOnboardingPreferences({ goal: null, experience: null, industry: null })
                                document.cookie = "ccp_onboarding_completed=true; path=/; max-age=31536000"
                                localStorage.setItem('ccp_onboarding_completed', 'true')
                                router.push('/dashboard')
                            }}
                            className="text-neutral-400 hover:text-neutral-950 text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
                        >
                            Skip Onboarding — Default Settings
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
