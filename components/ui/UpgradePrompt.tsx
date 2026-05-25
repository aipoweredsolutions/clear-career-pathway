import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UpgradePromptProps {
    feature?: string
    title?: string
    description?: string
    className?: string
    variant?: 'inline' | 'card' | 'minimal'
}

export function UpgradePrompt({ 
    feature, 
    title = "Pro Feature", 
    description = "Upgrade to Pro to unlock this high-impact tool and accelerate your career.",
    className,
    variant = 'inline'
}: UpgradePromptProps) {
    const upgradeUrl = `/pricing${feature ? `?feature=${feature}` : ''}`

    if (variant === 'minimal') {
        return (
            <Link 
                href={upgradeUrl}
                className={cn(
                    "flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-600 hover:text-primary-700 transition-colors",
                    className
                )}
            >
                <Sparkles className="w-3 h-3" />
                Upgrade to Pro
                <ArrowRight className="w-3 h-3" />
            </Link>
        )
    }

    if (variant === 'card') {
        return (
            <div className={cn(
                "bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-[2rem] p-8 text-white relative overflow-hidden border border-neutral-800 shadow-2xl",
                className
            )}>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-primary-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                        <Sparkles className="w-4 h-4" /> Professional Exclusive
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter italic mb-2">{title}</h3>
                    <p className="text-neutral-400 font-bold text-sm mb-6 leading-relaxed max-w-xs">
                        {description}
                    </p>
                    <Link
                        href={upgradeUrl}
                        className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-xl font-black text-xs hover:bg-primary-50 transition-all active:scale-95"
                    >
                        Upgrade Now
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <Sparkles className="absolute -bottom-4 -right-4 w-32 h-32 text-white/[0.03] -rotate-12" />
            </div>
        )
    }

    return (
        <div className={cn(
            "bg-primary-50/50 border border-primary-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4",
            className
        )}>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 shrink-0">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-sm font-black text-neutral-900 tracking-tight">{title}</h4>
                    <p className="text-xs text-neutral-500 font-bold">{description}</p>
                </div>
            </div>
            <Link
                href={upgradeUrl}
                className="bg-neutral-900 text-white px-5 py-2.5 rounded-xl font-black text-xs hover:bg-neutral-800 transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
                Upgrade <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    )
}
