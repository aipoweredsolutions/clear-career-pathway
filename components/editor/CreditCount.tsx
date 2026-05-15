'use client'

import React from 'react'
import { Coins, Plus } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface CreditCountProps {
    className?: string
}

export function CreditCount({ className }: CreditCountProps) {
    const { profile, loading } = useAuth()

    if (loading || !profile) return null

    // Pro users might have unlimited or a very high number
    const isPro = profile.subscription_tier === 'pro' || profile.subscription_tier === 'enterprise'
    const credits = profile.download_credits || 0

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="flex flex-col items-end leading-none">
                <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Exports</span>
                <div className="flex items-center gap-1.5">
                    <Coins className="w-3 h-3 text-amber-500" />
                    <span className="text-sm font-black text-neutral-900">
                        {isPro ? '∞' : credits}
                    </span>
                </div>
            </div>
            
            {!isPro && (
                <Link 
                    href="/pricing"
                    className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-lg border border-amber-200 transition-all active:scale-95"
                    title="Get more credits"
                >
                    <Plus className="w-3.5 h-3.5" />
                </Link>
            )}
        </div>
    )
}
