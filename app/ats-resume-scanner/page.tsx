'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { FileText, ScanSearch, AlertTriangle, CheckCircle2, Loader2, ArrowRight, XCircle, Upload } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ResumeUploadModal } from '@/components/dashboard/ResumeUploadModal'

export default function ATSScannerPage() {
    const [text, setText] = useState('')
    const [status, setStatus] = useState<'idle' | 'scanning' | 'results'>('idle')
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState('Initializing scanner...')
    const [score, setScore] = useState(0)
    const [issues, setIssues] = useState<{ type: 'error' | 'warning' | 'success', text: string }[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const [showFixModal, setShowFixModal] = useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
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
                // Optional: alert or auto-scan
            } else {
                alert(result.error || 'Failed to extract text from file.')
            }
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Failed to upload and parse the file.')
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const startScan = () => {
        if (text.length < 50) {
            alert('Please paste a bit more of your resume text so we can analyze it properly.')
            return
        }
        setStatus('scanning')
        setProgress(0)
        setIssues([])
    }

    const finishScan = React.useCallback(() => {
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

        // 3. Experience Quality (Action Verbs & Metrics)
        const actionVerbs = ['managed', 'led', 'developed', 'created', 'increased', 'decreased', 'implemented', 'designed', 'launched', 'negotiated', 'achieved', 'improved', 'automated', 'spearheaded', 'coordinated']
        const foundVerbs = actionVerbs.filter(verb => lowerText.includes(verb))
        
        if (foundVerbs.length >= 5) {
            foundIssues.push({ type: 'success', text: `Strong use of action verbs (${foundVerbs.length} detected).`, category: 'Content' })
        } else if (foundVerbs.length > 0) {
            foundIssues.push({ type: 'warning', text: 'Limited use of power verbs. Use more action-oriented language.', category: 'Content' })
        } else {
            foundIssues.push({ type: 'error', text: 'No strong action verbs detected. Start bullets with words like "Led", "Developed", or "Managed".', category: 'Content' })
        }

        const metricsDetected = (text.match(/\d+(%|\$|k|m|b|x)/gi) || []).length
        if (metricsDetected >= 3) {
            foundIssues.push({ type: 'success', text: 'Excellent use of quantifiable metrics.', category: 'Content' })
        } else if (metricsDetected > 0) {
            foundIssues.push({ type: 'warning', text: 'Include more numbers, percentages, or dollar amounts to show impact.', category: 'Content' })
        } else {
            foundIssues.push({ type: 'error', text: 'No quantifiable metrics found. Results-oriented resumes perform 40% better.', category: 'Content' })
        }

        // 4. Formatting & Length
        if (text.length < 800) {
            foundIssues.push({ type: 'warning', text: 'Resume is quite short. Consider adding more details about your achievements.', category: 'Formatting' })
        } else if (text.length > 6000) {
            foundIssues.push({ type: 'warning', text: 'Resume is very long. Ensure it is concise and relevant (1-2 pages).', category: 'Formatting' })
        } else {
            foundIssues.push({ type: 'success', text: 'Document length is within optimal range.', category: 'Formatting' })
        }

        const badChars = /[●■◆○]/.test(text)
        if (badChars) {
            foundIssues.push({ type: 'warning', text: 'Non-standard bullet points detected. Stick to standard circles or squares for best parsing.', category: 'Formatting' })
        }

        // Calculate final score
        let newScore = 40 // Base
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
        setIssues(foundIssues as any)
        setStatus('results')
    }, [text])

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
    }, [status, finishScan])

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
                                    <div className="flex items-center justify-between mb-3">
                                        <label htmlFor="resume-text" className="block text-sm font-bold text-neutral-700 uppercase tracking-wider">
                                            Paste your resume text here
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">OR</span>
                                            <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                onChange={handleFileUpload} 
                                                className="hidden" 
                                                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                            />
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={isUploading}
                                                className="text-xs font-black uppercase tracking-widest text-primary-600 border-primary-200 hover:bg-primary-50"
                                            >
                                                {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                                                Upload PDF/DOCX
                                            </Button>
                                        </div>
                                    </div>
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
                                            {issues.map((issue: any, idx) => (
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
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-600">
                                                                {issue.category}
                                                            </span>
                                                        </div>
                                                        <p className="text-neutral-700 font-medium text-sm">{issue.text}</p>
                                                    </div>
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
                                        <Button 
                                            size="xl" 
                                            className="w-full sm:w-auto font-black tracking-widest uppercase text-sm bg-white text-primary-950 hover:bg-neutral-100"
                                            onClick={() => setShowFixModal(true)}
                                        >
                                            One-Click Fix (AI Rebuild)
                                        </Button>
                                        <Button 
                                            size="xl" 
                                            variant="ghost" 
                                            className="w-full sm:w-auto text-primary-200 hover:text-white hover:bg-white/10 font-bold"
                                            onClick={() => {
                                                setStatus('idle')
                                                setText('')
                                                setScore(0)
                                            }}
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

            <ResumeUploadModal 
                isOpen={showFixModal}
                onClose={() => setShowFixModal(false)}
                initialRawText={text}
            />
        </div>
    )
}
