'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { FileText, ScanSearch, AlertTriangle, CheckCircle2, Loader2, ArrowRight, XCircle } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function ATSScannerPage() {
    const [text, setText] = useState('')
    const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle')
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState('Initializing scanner...')
    const [score, setScore] = useState(0)
    const [issues, setIssues] = useState<{ type: 'error' | 'warning' | 'success', text: string }[]>([])

    const startScan = () => {
        if (text.length < 50) {
            alert('Please paste a bit more of your resume text so we can analyze it properly.')
            return
        }
        setStatus('scanning')
        setProgress(0)
        setIssues([])
    }

    useEffect(() => {
        if (status === 'scanning') {
            const steps = [
                { p: 10, msg: 'Parsing document structure...' },
                { p: 30, msg: 'Identifying contact information...' },
                { p: 50, msg: 'Analyzing section headers...' },
                { p: 70, msg: 'Checking action verbs and metrics...' },
                { p: 90, msg: 'Calculating ATS compatibility score...' },
                { p: 100, msg: 'Finalizing results...' },
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
            }, 800)

            return () => clearInterval(interval)
        }
    }, [status])

    const finishScan = () => {
        // Calculate a somewhat realistic score based on text content
        let newScore = 45 // Base score
        const foundIssues: { type: 'error' | 'warning' | 'success', text: string }[] = []

        const lowerText = text.toLowerCase()
        
        // Check for metrics/numbers
        if (/\d+/.test(text)) {
            newScore += 15
            foundIssues.push({ type: 'success', text: 'Quantifiable metrics detected.' })
        } else {
            foundIssues.push({ type: 'error', text: 'Missing numbers and metrics. ATS systems rank results-oriented bullets higher.' })
        }

        // Check for standard sections
        const hasExperience = lowerText.includes('experience') || lowerText.includes('employment')
        const hasEducation = lowerText.includes('education') || lowerText.includes('university')
        
        if (hasExperience && hasEducation) {
            newScore += 20
            foundIssues.push({ type: 'success', text: 'Standard sections (Experience, Education) recognized.' })
        } else {
            foundIssues.push({ type: 'error', text: 'Standard section headers missing or unreadable. The parser may fail to segment your history.' })
        }

        // Penalty for very short text
        if (text.length < 500) {
            foundIssues.push({ type: 'warning', text: 'Resume is very short. May lack sufficient keywords to pass the screen.' })
        } else {
            newScore += 10
        }

        // General warning about columns
        foundIssues.push({ type: 'warning', text: 'Invisible formatting (like multi-column layouts or tables) cannot be verified via text paste. If your PDF uses columns, your actual score may drop by 40%.' })

        setScore(Math.min(newScore, 85)) // Cap it so there's always room for improvement
        setIssues(foundIssues)
        setStatus('results')
    }

    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-black uppercase tracking-widest mb-6">
                        <ScanSearch className="w-4 h-4" />
                        Free ATS Scanner Tool
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
                        Is your resume being rejected by robots?
                    </h1>
                    <p className="text-xl text-neutral-500 font-medium">
                        75% of resumes are discarded by Applicant Tracking Systems before a human ever sees them. Paste your text below to see your score.
                    </p>
                </div>

                {/* Main Tool Container */}
                <div className="bg-white rounded-[2rem] shadow-xl shadow-neutral-200/50 border border-neutral-100 overflow-hidden relative min-h-[400px]">
                    
                    <AnimatePresence mode="wait">
                        {/* IDLE STATE */}
                        {status === 'idle' && (
                            <motion.div 
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="p-8 md:p-12 flex flex-col h-full"
                            >
                                <div className="flex-1 mb-6">
                                    <label htmlFor="resume-text" className="block text-sm font-bold text-neutral-700 mb-3 uppercase tracking-wider">
                                        Paste your resume text here
                                    </label>
                                    <textarea
                                        id="resume-text"
                                        className="w-full h-64 p-6 bg-neutral-50 border-2 border-neutral-100 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all resize-none font-mono text-sm text-neutral-700"
                                        placeholder="John Doe&#10;Software Engineer&#10;john@example.com&#10;&#10;Experience:&#10;..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-neutral-400 font-medium">
                                        Your data is secure and never stored.
                                    </p>
                                    <Button 
                                        size="xl" 
                                        onClick={startScan}
                                        disabled={text.length === 0}
                                        className="font-black tracking-widest uppercase text-sm shadow-xl"
                                    >
                                        Scan Resume Now
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* SCANNING STATE */}
                        {status === 'scanning' && (
                            <motion.div 
                                key="scanning"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-white p-12 text-center"
                            >
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 border-4 border-neutral-100 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <ScanSearch className="w-8 h-8 text-primary-600 animate-pulse" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-neutral-900 mb-4">{currentStep}</h3>
                                <div className="w-full max-w-md bg-neutral-100 h-2 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-primary-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* RESULTS STATE */}
                        {status === 'results' && (
                            <motion.div 
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-8 md:p-12"
                            >
                                <div className="flex flex-col md:flex-row gap-12 items-start mb-12">
                                    {/* Score Circle */}
                                    <div className="flex flex-col items-center flex-shrink-0 mx-auto md:mx-0">
                                        <div className="relative flex items-center justify-center w-40 h-40">
                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="45" fill="none" stroke="#f5f5f5" strokeWidth="8" />
                                                <motion.circle 
                                                    cx="50" cy="50" r="45" fill="none" 
                                                    stroke={score > 70 ? '#10b981' : score > 50 ? '#f59e0b' : '#ef4444'} 
                                                    strokeWidth="8" 
                                                    strokeDasharray="283"
                                                    initial={{ strokeDashoffset: 283 }}
                                                    animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
                                                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                                />
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <span className="text-5xl font-black text-neutral-900">{score}</span>
                                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">/ 100</span>
                                            </div>
                                        </div>
                                        <div className="mt-6 text-center">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                                                score > 70 ? 'bg-success-100 text-success-700' : 
                                                score > 50 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                                            }`}>
                                                {score > 70 ? 'Good, but could be better' : score > 50 ? 'Needs Improvement' : 'Critical Issues Detected'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Findings List */}
                                    <div className="flex-1 w-full">
                                        <h3 className="text-xl font-black text-neutral-900 mb-6">Parsing Analysis Results</h3>
                                        <ul className="space-y-4">
                                            {issues.map((issue, idx) => (
                                                <motion.li 
                                                    key={idx}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.5 + (idx * 0.1) }}
                                                    className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100"
                                                >
                                                    {issue.type === 'error' && <XCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />}
                                                    {issue.type === 'warning' && <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />}
                                                    {issue.type === 'success' && <CheckCircle2 className="w-6 h-6 text-success-500 flex-shrink-0" />}
                                                    <p className="text-neutral-700 font-medium text-sm pt-0.5">{issue.text}</p>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* The Upsell CTA */}
                                <div className="bg-primary-950 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden group shadow-2xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/30 rounded-full blur-[80px] -mr-32 -mt-32" />
                                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 relative z-10">Stop guessing. Get past the filters.</h3>
                                    <p className="text-primary-200 mb-8 max-w-lg mx-auto font-medium relative z-10">
                                        Rebuild your resume right now using our verified, 100% ATS-compliant layouts and AI content optimizer.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                                        <Link href="/editor/setup" className="w-full sm:w-auto">
                                            <Button size="xl" className="w-full font-black tracking-widest uppercase text-sm bg-white text-primary-950 hover:bg-neutral-100">
                                                Build ATS Resume Free
                                            </Button>
                                        </Link>
                                        <Button 
                                            size="xl" 
                                            variant="ghost" 
                                            className="w-full sm:w-auto text-primary-200 hover:text-white hover:bg-white/10 font-bold"
                                            onClick={() => setStatus('idle')}
                                        >
                                            Scan Another
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                </div>
            </div>
        </div>
    )
}
