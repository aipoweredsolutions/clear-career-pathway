'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ResumeDocument } from '@/lib/types/resume'

interface PasteParserModalProps {
    isOpen: boolean
    onClose: () => void
    onComplete: (parsedData: Partial<ResumeDocument>) => void
}

export function PasteParserModal({ isOpen, onClose, onComplete }: PasteParserModalProps) {
    const [text, setText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleParse = async () => {
        if (!text.trim()) {
            setError("Please paste some text first.")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/resume/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            })

            const json = await res.json()

            if (!res.ok) {
                throw new Error(json.error || 'Failed to parse text')
            }

            if (json.data) {
                onComplete(json.data)
                setText('') // clear on success
            }
        } catch (err: any) {
            console.error('Error in parse:', err)
            setError(err.message || 'An unexpected error occurred.')
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm"
                onClick={!isLoading ? onClose : undefined}
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-neutral-200"
            >
                <div className="p-6 md:p-8 flex-1 flex flex-col max-h-[85vh]">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-neutral-900 mb-2 flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-primary-600" />
                                Paste Your Resume
                            </h2>
                            <p className="text-sm text-neutral-500 font-medium">
                                Dump your old resume, LinkedIn export, or rough notes here. Our AI will automatically structure and map it into your new template.
                            </p>
                        </div>
                        <button 
                            onClick={onClose}
                            disabled={isLoading}
                            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-900 font-medium">{error}</p>
                        </div>
                    )}

                    <div className="flex-1 relative flex flex-col min-h-[300px]">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste your content here..."
                            disabled={isLoading}
                            className="w-full h-full flex-1 p-6 rounded-2xl border-2 border-neutral-200 focus:border-primary-500 focus:ring-0 outline-none resize-none text-neutral-900 font-medium disabled:opacity-50 transition-colors"
                        />
                        
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border-2 border-transparent z-10">
                                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-4 animate-pulse">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-black text-neutral-900 mb-2">Analyzing Data...</h3>
                                <div className="flex items-center gap-2 text-primary-600 text-sm font-bold">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Structuring your career history
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <Button 
                            variant="ghost" 
                            onClick={onClose}
                            disabled={isLoading}
                            className="font-bold"
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={handleParse}
                            disabled={isLoading || !text.trim()}
                            className="px-8 rounded-full font-black shadow-lg shadow-primary-500/20"
                        >
                            {isLoading ? 'Processing...' : 'Auto-Fill Resume'}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
