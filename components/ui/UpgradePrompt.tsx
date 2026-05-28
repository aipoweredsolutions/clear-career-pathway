'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { X, Sparkles, Check } from 'lucide-react'
import { getFeatureComparison } from '@/lib/utils/free-tier-restrictions'

interface UpgradePromptProps {
    feature: 'template' | 'export' | 'ai' | 'document' | 'format'
    message?: string
    onClose?: () => void
    variant?: 'modal' | 'banner' | 'inline'
}

export function UpgradePrompt({ 
    feature, 
    message, 
    onClose,
    variant = 'modal' 
}: UpgradePromptProps) {
    const comparison = getFeatureComparison()
    
    const featureMessages = {
        template: {
            title: 'Unlock Premium Templates',
            description: 'Get access to all 27+ professionally designed templates',
            icon: '🎨'
        },
        export: {
            title: 'Unlimited Exports',
            description: 'Export your resume as many times as you need',
            icon: '📥'
        },
        ai: {
            title: 'AI-Powered Improvements',
            description: 'Get unlimited AI suggestions to make your resume stand out',
            icon: '✨'
        },
        document: {
            title: 'Create Unlimited Resumes',
            description: 'Build multiple versions for different job applications',
            icon: '📄'
        },
        format: {
            title: 'Export in Multiple Formats',
            description: 'Download your resume in PDF and DOCX formats',
            icon: '📋'
        }
    }

    const featureInfo = featureMessages[feature]

    if (variant === 'banner') {
        return (
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 border-l-4 border-primary-500 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{featureInfo.icon}</span>
                        <div>
                            <h4 className="font-semibold text-neutral-900">{featureInfo.title}</h4>
                            <p className="text-sm text-neutral-600">{message || featureInfo.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/pricing">
                            <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                                Upgrade to Pro
                            </Button>
                        </Link>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-neutral-200 rounded transition-colors"
                            >
                                <X className="w-4 h-4 text-neutral-500" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 'inline') {
        return (
            <div className="bg-white border-2 border-primary-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-neutral-900 mb-2">
                            {featureInfo.title}
                        </h3>
                        <p className="text-neutral-600 mb-4">
                            {message || featureInfo.description}
                        </p>
                        <Link href="/pricing">
                            <Button className="bg-primary-600 hover:bg-primary-700">
                                View Pro Plans
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // Modal variant (default)
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-primary-600 to-primary-500 text-white p-8 rounded-t-2xl">
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                    <div className="flex items-center gap-3 mb-2">
                        <Sparkles className="w-8 h-8" />
                        <h2 className="text-3xl font-bold">Upgrade to Pro</h2>
                    </div>
                    <p className="text-primary-100 text-lg">
                        {message || featureInfo.description}
                    </p>
                </div>

                {/* Comparison */}
                <div className="p-8">
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Free Tier */}
                        <div className="border-2 border-neutral-200 rounded-xl p-6">
                            <div className="text-center mb-4">
                                <h3 className="text-lg font-bold text-neutral-900">
                                    {comparison.free.name}
                                </h3>
                                <p className="text-3xl font-bold text-neutral-600 mt-2">
                                    {comparison.free.price}
                                </p>
                            </div>
                            <ul className="space-y-3">
                                {comparison.free.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                                        <Check className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pro Tier */}
                        <div className="border-2 border-primary-500 rounded-xl p-6 bg-primary-50 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                RECOMMENDED
                            </div>
                            <div className="text-center mb-4">
                                <h3 className="text-lg font-bold text-neutral-900">
                                    {comparison.pro.name}
                                </h3>
                                <p className="text-3xl font-bold text-primary-600 mt-2">
                                    {comparison.pro.price}
                                </p>
                            </div>
                            <ul className="space-y-3">
                                {comparison.pro.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                                        <Check className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                                        <span className="font-medium">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/pricing" className="flex-1">
                            <Button 
                                className="w-full bg-primary-600 hover:bg-primary-700 text-lg py-6"
                                size="lg"
                            >
                                Upgrade to Pro
                            </Button>
                        </Link>
                        {onClose && (
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="sm:w-auto"
                            >
                                Maybe Later
                            </Button>
                        )}
                    </div>

                    {/* Trust badges */}
                    <div className="mt-6 text-center text-sm text-neutral-500">
                        <p>✓ Cancel anytime • ✓ 30-day money-back guarantee • ✓ Secure payment</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Simple upgrade banner for inline use
 */
export function UpgradeBanner({ 
    message, 
    onClose 
}: { 
    message: string
    onClose?: () => void 
}) {
    return (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                    </div>
                    <p className="text-sm font-medium text-neutral-900">{message}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/pricing">
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                            Upgrade
                        </Button>
                    </Link>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-neutral-200 rounded transition-colors"
                        >
                            <X className="w-4 h-4 text-neutral-500" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
