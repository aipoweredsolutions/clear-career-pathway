'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Sparkles, FileText, Download, Wand2, ArrowRight } from 'lucide-react'

interface FreeTierBannerProps {
    resumeCount: number
    maxResumes?: number
    exportsThisMonth?: number
    maxExports?: number
}

export function FreeTierBanner({
    resumeCount,
    maxResumes = 1,
    exportsThisMonth = 0,
    maxExports = 1,
}: FreeTierBannerProps) {
    const resumesRemaining = Math.max(0, maxResumes - resumeCount)
    const exportsRemaining = Math.max(0, maxExports - exportsThisMonth)

    return (
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200 rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Left — message + usage stats */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                        <h3 className="text-base font-bold text-neutral-900">
                            You&apos;re on the Free Plan
                        </h3>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                        Upgrade to Pro for unlimited resumes, all 27+ premium templates, and AI-powered improvements.
                    </p>

                    {/* Usage pills */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-white border border-amber-200 rounded-lg px-3 py-2">
                            <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                            <span className="text-xs font-medium text-neutral-600">Resumes</span>
                            <span className="text-sm font-bold text-neutral-900">
                                {resumeCount}
                                <span className="text-neutral-400 font-normal"> / {maxResumes}</span>
                            </span>
                            {resumesRemaining === 0 && (
                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">Limit reached</span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 bg-white border border-amber-200 rounded-lg px-3 py-2">
                            <Download className="w-4 h-4 text-amber-600 shrink-0" />
                            <span className="text-xs font-medium text-neutral-600">Exports this month</span>
                            <span className="text-sm font-bold text-neutral-900">
                                {exportsThisMonth}
                                <span className="text-neutral-400 font-normal"> / {maxExports}</span>
                            </span>
                            {exportsRemaining === 0 && (
                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">Limit reached</span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 bg-white border border-amber-200 rounded-lg px-3 py-2">
                            <Wand2 className="w-4 h-4 text-amber-600 shrink-0" />
                            <span className="text-xs font-medium text-neutral-600">AI features</span>
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">Pro only</span>
                        </div>
                    </div>
                </div>

                {/* Right — CTA */}
                <div className="shrink-0 flex flex-col items-start lg:items-end gap-1">
                    <Link href="/pricing">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all group"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Upgrade to Pro
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                    </Link>
                    <p className="text-xs text-neutral-500 lg:text-right">
                        From $14.99/month · Cancel anytime
                    </p>
                </div>
            </div>
        </div>
    )
}
