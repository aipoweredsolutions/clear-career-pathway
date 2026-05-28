'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Sparkles, FileText, Download, Wand2 } from 'lucide-react'
import { useFreeTier } from '@/lib/hooks/useFreeTier'

export function FreeTierBanner() {
    const { isFree, remaining, limits, loading } = useFreeTier()

    if (loading || !isFree) {
        return null
    }

    return (
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200 rounded-2xl p-6 shadow-lg mb-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Left side - Message */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                        <h3 className="text-lg font-bold text-neutral-900">
                            You're on the Free Plan
                        </h3>
                    </div>
                    <p className="text-neutral-700 mb-4">
                        Upgrade to Pro to unlock unlimited resumes, all premium templates, and AI-powered features.
                    </p>

                    {/* Usage Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white/60 rounded-lg p-3 border border-amber-200">
                            <div className="flex items-center gap-2 mb-1">
                                <FileText className="w-4 h-4 text-amber-600" />
                                <span className="text-xs font-medium text-neutral-600">Resumes</span>
                            </div>
                            <p className="text-lg font-bold text-neutral-900">
                                {remaining.documents === 'unlimited' ? '∞' : remaining.documents}
                                <span className="text-sm font-normal text-neutral-500">
                                    {remaining.documents !== 'unlimited' && ` / ${limits.MAX_DOCUMENTS}`}
                                </span>
                            </p>
                        </div>

                        <div className="bg-white/60 rounded-lg p-3 border border-amber-200">
                            <div className="flex items-center gap-2 mb-1">
                                <Download className="w-4 h-4 text-amber-600" />
                                <span className="text-xs font-medium text-neutral-600">Exports</span>
                            </div>
                            <p className="text-lg font-bold text-neutral-900">
                                {remaining.exports === 'unlimited' ? '∞' : remaining.exports}
                                <span className="text-sm font-normal text-neutral-500">
                                    {remaining.exports !== 'unlimited' && ` / ${limits.MAX_EXPORTS_PER_MONTH}`}
                                </span>
                            </p>
                        </div>

                        <div className="bg-white/60 rounded-lg p-3 border border-amber-200">
                            <div className="flex items-center gap-2 mb-1">
                                <Wand2 className="w-4 h-4 text-amber-600" />
                                <span className="text-xs font-medium text-neutral-600">AI Uses</span>
                            </div>
                            <p className="text-lg font-bold text-neutral-900">
                                {remaining.aiImprovements === 'unlimited' ? '∞' : remaining.aiImprovements}
                                <span className="text-sm font-normal text-neutral-500">
                                    {remaining.aiImprovements !== 'unlimited' && ` / ${limits.AI_IMPROVEMENTS_PER_MONTH}`}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right side - CTA */}
                <div className="flex-shrink-0">
                    <Link href="/pricing">
                        <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Upgrade to Pro
                        </Button>
                    </Link>
                    <p className="text-xs text-neutral-600 mt-2 text-center">
                        Starting at $14.99/month
                    </p>
                </div>
            </div>
        </div>
    )
}

/**
 * Compact version for smaller spaces
 */
export function FreeTierBannerCompact() {
    const { isFree, loading } = useFreeTier()

    if (loading || !isFree) {
        return null
    }

    return (
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-neutral-900">Free Plan</p>
                        <p className="text-xs text-neutral-600">Upgrade for unlimited access</p>
                    </div>
                </div>
                <Link href="/pricing">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                        Upgrade
                    </Button>
                </Link>
            </div>
        </div>
    )
}
