'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { FileText, ScanSearch, AlertTriangle, CheckCircle2, Loader2, ArrowRight, XCircle, Upload, Zap, ShieldCheck, Search } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ResumeUploadModal } from '@/components/dashboard/ResumeUploadModal'
import { cn } from '@/lib/utils'

export default function ATSScannerPage() {
    const [text, setText] = useState('')
    const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle')
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState('Initializing scanner...')
    const [score, setScore] = useState(0)
    const [issues, setIssues] = useState<{ type: 'error' | 'warning' | 'success', text: string, category: string }[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const [showFixModal, setShowFixModal] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        setErrorMsg(null)
        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            const result = await response.json()
            if (result.success && result.data?.rawText) {
                setText(result.data.rawText)
                setStatus('idle')
            } else {
                setErrorMsg(result.error || 'Failed to extract text from file.')
            }
        } catch (error) {
            console.error('Upload failed:', error)
            setErrorMsg('Failed to upload and parse the file. Please check your connection.')
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const startScan = () => {
        if (text.length < 50) {
            setErrorMsg('Please paste a bit more of your resume text (at least 50 characters) so we can analyze it properly.')
            return
        }
        setErrorMsg(null)
        setStatus('scanning')
        setProgress(0)
        setIssues([])
    }

    const finishScan = useCallback(() => {
        try {
            const foundIssues: { type: 'error' | 'warning' | 'success', text: string, category: string }[] = []
            const lowerText = text.toLowerCase()
            
            // 1. Contact Information Check
            const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text)
            const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text)
            const hasLinkedIn = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/.test(lowerText)
            
            if (hasEmail && hasPhone) {
                foundIssues.push({ type: 'success', text: 'Contact information (Email, Phone) found.', category: 'Contact' })
            } else {
                foundIssues.push({ type: 'error', text: 'Missing essential contact info (Email or Phone).', category: 'Contact' })
            }
            if (!hasLinkedIn) {
                foundIssues.push({ type: 'warning', text: 'LinkedIn profile link not detected.', category: 'Contact' })
            }

            // 2. Section Hierarchy Check
            const sections = {
                summary: /summary|profile|objective/i.test(text),
                experience: /experience|employment|work history/i.test(text),
                education: /education|academic|university/i.test(text),
                skills: /skills|technologies|competencies/i.test(text)
            }

            if (sections.experience && sections.education) {
                foundIssues.push({ type: 'success', text: 'Standard sections (Experience, Education) recognized.', category: 'Structure' })
            } else {
                foundIssues.push({ type: 'error', text: 'Critical sections missing. Ensure you have "Experience" and "Education" headers.', category: 'Structure' })
            }
            if (!sections.summary) {
                foundIssues.push({ type: 'warning', text: 'Professional summary or profile section not found.', category: 'Structure' })
            }
            if (!sections.skills) {
                foundIssues.push({ type: 'warning', text: 'Dedicated skills section not detected.', category: 'Structure' })
            }

            // 3. Experience Quality
            const actionVerbs = ['managed', 'led', 'developed', 'created', 'increased', 'decreased', 'implemented', 'designed', 'launched', 'negotiated', 'achieved', 'improved', 'automated', 'spearheaded', 'coordinated']
            const foundVerbs = actionVerbs.filter(verb => lowerText.includes(verb))
            
            if (foundVerbs.length >= 5) {
                foundIssues.push({ type: 'success', text: `Strong use of action verbs (${foundVerbs.length} detected).`, category: 'Content' })
            } else {
                foundIssues.push({ type: 'warning', text: 'Limited use of power verbs. Use more action-oriented language.', category: 'Content' })
            }

            const metricsDetected = (text.match(/\d+(%|\$|k|m|b|x)/gi) || []).length
            if (metricsDetected >= 3) {
                foundIssues.push({ type: 'success', text: 'Excellent use of quantifiable metrics.', category: 'Content' })
            } else {
                foundIssues.push({ type: 'error', text: 'No quantifiable metrics found. Results-oriented resumes perform 40% better.', category: 'Content' })
            }

            // 4. Formatting
            if (text.length < 800 || text.length > 6000) {
                foundIssues.push({ type: 'warning', text: 'Document length might be sub-optimal (Ideal: 800-6000 chars).', category: 'Formatting' })
            } else {
                foundIssues.push({ type: 'success', text: 'Document length is within optimal range.', category: 'Formatting' })
            }

            // Calculate final score
            let newScore = 40 
            if (hasEmail) newScore += 5
            if (hasPhone) newScore += 5
            if (hasLinkedIn) newScore += 5
            if (sections.experience) newScore += 10
            if (sections.education) newScore += 10
            if (sections.skills) newScore += 5
            if (sections.summary) newScore += 5
            if (foundVerbs.length >= 5) newScore += 10
            if (metricsDetected >= 3) newScore += 10
            if (text.length >= 800 && text.length <= 6000) newScore += 5

            setScore(Math.min(newScore, 95))
            setIssues(foundIssues)
            setStatus('results')
        } catch (error) {
            console.error('Scan error:', error)
            setErrorMsg('An error occurred during scanning. Please try again.')
            setStatus('idle')
        }
    }, [text])

    useEffect(() => {
        if (status === 'scanning') {
            const steps = [
                { p: 15, msg: 'Parsing document structure...' },
                { p: 40, msg: 'Auditing contact information...' },
                { p: 65, msg: 'Analyzing section semantic health...' },
                { p: 85, msg: 'Checking action-oriented density...' },
                { p: 100, msg: 'Finalizing ATS compatibility report...' },
            ]

            let currentIdx = 0
            const interval = setInterval(() => {
                if (currentIdx < steps.length) {
                    setProgress(steps[currentIdx].p)
                    setCurrentStep(steps[currentIdx].msg)
                    currentIdx++
                } else {
                    clearInterval(interval)
                    finishScan()
                }
            }, 700)
            return () => clearInterval(interval)
        }
    }, [status, finishScan])

    return (
        <div className="min-h-screen bg-white font-sans overflow-hidden">
            {/* --- Premium Ambient Background --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="absolute top-[-10%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.06),transparent_70%)] blur-[120px]"
                />
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04),transparent_70%)] blur-[100px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-40">
                
                {/* Header */}
                <header className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-[10px] font-black uppercase tracking-[0.25em] mb-10 shadow-2xl"
                    >
                        <ScanSearch className="w-3.5 h-3.5 text-primary-400" />
                        Elite ATS Diagnostic
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black text-neutral-950 tracking-tight leading-[0.85] mb-8 uppercase italic"
                    >
                        Beat the <br />
                        <span className="text-primary-600">Filters.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-neutral-500 font-bold max-w-2xl mx-auto leading-relaxed"
                    >
                        75% of resumes are discarded by bots. Our scanner uses clinical heuristics to ensure your professional story commands attention.
                    </motion.p>
                </header>

                {/* Main Tool Container */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        {status === 'idle' && (
                            <motion.div 
                                key="idle"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-neutral-100 overflow-hidden"
                            >
                                <div className="p-10 md:p-14">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-black text-neutral-950 uppercase tracking-tight">Paste Resume Content</h3>
                                            <p className="text-sm font-bold text-neutral-400">Or upload a file for instant extraction</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                onChange={handleFileUpload} 
                                                className="hidden" 
                                                accept=".pdf,.docx"
                                            />
                                            <button 
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={isUploading}
                                                className="flex items-center gap-2 px-6 py-3 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-neutral-200 transition-all active:scale-95 disabled:opacity-50"
                                            >
                                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                                Upload Document
                                            </button>
                                        </div>
                                    </div>

                                    {errorMsg && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-bold flex items-center gap-3"
                                        >
                                            <XCircle className="w-5 h-5" />
                                            {errorMsg}
                                        </motion.div>
                                    )}

                                    <div className="relative group">
                                        <textarea
                                            className="w-full h-80 p-8 bg-neutral-50/50 border border-neutral-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-primary-50 focus:border-primary-200 transition-all resize-none font-medium text-neutral-700 leading-relaxed placeholder:text-neutral-300"
                                            placeholder="Paste your professional history here..."
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                        <div className="absolute top-6 right-6 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                            <ShieldCheck className="w-6 h-6 text-primary-600" />
                                        </div>
                                    </div>

                                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                                            Clinical Grade Security — No Data Stored
                                        </p>
                                        <button 
                                            onClick={startScan}
                                            disabled={text.length === 0}
                                            className="w-full sm:w-auto px-12 py-6 bg-neutral-950 text-white rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
                                        >
                                            Initiate Scan
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {status === 'scanning' && (
                            <motion.div 
                                key="scanning"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white rounded-[3rem] p-20 flex flex-col items-center justify-center text-center shadow-xl border border-neutral-100"
                            >
                                <div className="relative mb-12">
                                    <div className="w-32 h-32 border-4 border-neutral-50 rounded-full" />
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Zap className="w-10 h-10 text-primary-600 fill-primary-600" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black text-neutral-950 uppercase tracking-tight mb-4">{currentStep}</h3>
                                <div className="w-full max-w-sm bg-neutral-50 h-3 rounded-full overflow-hidden border border-neutral-100">
                                    <motion.div 
                                        className="h-full bg-neutral-950"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {status === 'results' && (
                            <motion.div 
                                key="results"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-12"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Score Card */}
                                    <div className="md:col-span-1 bg-white rounded-[2.5rem] p-10 border border-neutral-100 shadow-xl flex flex-col items-center text-center">
                                        <div className="relative flex items-center justify-center w-48 h-48 mb-8">
                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="45" fill="none" stroke="#f8fafc" strokeWidth="8" />
                                                <motion.circle 
                                                    cx="50" cy="50" r="45" fill="none" 
                                                    stroke={score > 70 ? '#10b981' : score > 50 ? '#f59e0b' : '#ef4444'} 
                                                    strokeWidth="8" 
                                                    strokeDasharray="283"
                                                    initial={{ strokeDashoffset: 283 }}
                                                    animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
                                                    transition={{ duration: 2, delay: 0.2, ease: "circOut" }}
                                                />
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <span className="text-6xl font-black text-neutral-950 tracking-tighter">{score}</span>
                                                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">ATS Compatibility</span>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest",
                                            score > 70 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                                        )}>
                                            {score > 70 ? "Optimization Ready" : "Critical Fixes Required"}
                                        </div>
                                    </div>

                                    {/* Issues Feed */}
                                    <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 border border-neutral-100 shadow-xl overflow-hidden">
                                        <h3 className="text-xl font-black text-neutral-950 uppercase tracking-tight mb-8">Clinical Analysis Report</h3>
                                        <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                                            {issues.map((issue, idx) => (
                                                <motion.div 
                                                    key={idx}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 + (idx * 0.05) }}
                                                    className="flex items-start gap-4 p-5 rounded-2xl bg-neutral-50/50 border border-neutral-50 group hover:bg-white hover:shadow-md transition-all"
                                                >
                                                    <div className="mt-1">
                                                        {issue.type === 'error' && <XCircle className="w-5 h-5 text-rose-500" />}
                                                        {issue.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                                                        {issue.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                                                    </div>
                                                    <div>
                                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1 block">{issue.category}</span>
                                                        <p className="text-sm font-bold text-neutral-700 leading-relaxed">{issue.text}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Results CTA */}
                                <div className="bg-neutral-950 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.2),transparent_60%)]" />
                                    <div className="relative z-10">
                                        <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase italic leading-none">
                                            Rebuild for <br />
                                            <span className="text-primary-500">Maximum Impact.</span>
                                        </h3>
                                        <p className="text-xl text-neutral-400 font-bold mb-12 max-w-2xl mx-auto leading-relaxed">
                                            Don&apos;t risk your dream role. Convert your current resume into a 100% compliant powerhouse in one click.
                                        </p>
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                            <button 
                                                onClick={() => setShowFixModal(true)}
                                                className="w-full sm:w-auto px-12 py-6 bg-primary-600 text-white rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-primary-500 hover:scale-105 active:scale-95 transition-all"
                                            >
                                                Launch AI Rebuild
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setStatus('idle')
                                                    setText('')
                                                    setScore(0)
                                                }}
                                                className="w-full sm:w-auto px-12 py-6 bg-white/5 text-white backdrop-blur-xl border border-white/10 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                                            >
                                                Scan New Draft
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <ResumeUploadModal 
                isOpen={showFixModal}
                onClose={() => setShowFixModal(false)}
                initialRawText={text}
            />
        </div>
    )
}
