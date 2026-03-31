'use client'

import React from 'react'
import Link from 'next/link'
import { Lock, Sparkles, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface FeatureGateProps {
    featureName: string
    description: string
    requiredTier?: string
    className?: string
}

export function FeatureGate({ featureName, description, requiredTier = 'Power User', className }: FeatureGateProps) {
    return (
        <div className={cn(
            "relative bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[500px]",
            className
        )}>
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 max-w-md w-full">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-xl shadow-primary-200 mx-auto mb-8 animate-bounce-subtle">
                    <Lock className="w-10 h-10 text-white" />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest mb-4">
                    <Star className="w-3 h-3 fill-amber-500" />
                    Premium Feature
                </div>

                <h3 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight">
                    Unlock {featureName}
                </h3>
                
                <p className="text-neutral-500 text-lg leading-relaxed mb-8">
                    {description}
                </p>

                <div className="space-y-4">
                    <Link href="/pricing" className="block">
                        <Button size="xl" className="w-full group rounded-2xl h-16 text-lg font-bold shadow-xl shadow-primary-200">
                            Upgrade to {requiredTier}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    
                    <p className="text-xs text-neutral-400 font-medium">
                        Get instant access to all professional career tools and unlimited exports.
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-100 flex items-center justify-center gap-6">
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center mb-2">
                            <Sparkles className="w-5 h-5 text-primary-500" />
                        </div>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase">AI Powered</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center mb-2">
                            <Star className="w-5 h-5 text-amber-500" />
                        </div>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase">Pro Results</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
