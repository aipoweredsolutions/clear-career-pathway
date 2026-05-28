'use client'

import React from 'react'
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ProfileCompletenessCardProps {
    profile: any
    resumesCount: number
}

export function ProfileCompletenessCard({ profile, resumesCount }: ProfileCompletenessCardProps) {
    const steps = [
        {
            id: 'account',
            label: 'Create Account',
            completed: true,
        },
        {
            id: 'onboarding',
            label: 'Complete Onboarding',
            completed: profile?.has_completed_onboarding || false,
            href: '/onboarding'
        },
        {
            id: 'document',
            label: 'Build First Resume',
            completed: resumesCount > 0,
            href: '/dashboard'
        },
        {
            id: 'tailor',
            label: 'Tailor for a Job',
            completed: false, // We can check if there's a document with a tailored goal, but keep simple for now
            href: '/tailor'
        }
    ]

    const completedCount = steps.filter(s => s.completed).length
    const progress = (completedCount / steps.length) * 100

    return (
        <div className="bg-white rounded-[2.5rem] border border-neutral-100 p-8 shadow-xl shadow-neutral-200/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
            
            <h3 className="text-xl font-black text-neutral-900 mb-2">Getting Started</h3>
            <p className="text-sm font-bold text-neutral-500 mb-6">Complete your profile to unlock your full potential.</p>

            <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-black tracking-tighter text-neutral-900">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-primary-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="space-y-3">
                {steps.map((step, idx) => (
                    <div key={step.id} className="flex items-center justify-between group/item">
                        <div className="flex items-center gap-3">
                            {step.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                            ) : (
                                <Circle className="w-5 h-5 text-neutral-300 shrink-0" />
                            )}
                            <span className={cn(
                                "text-sm font-bold transition-colors",
                                step.completed ? "text-neutral-900" : "text-neutral-500"
                            )}>
                                {step.label}
                            </span>
                        </div>
                        {!step.completed && step.href && (
                            <Link href={step.href} className="text-neutral-300 group-hover/item:text-primary-600 transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
