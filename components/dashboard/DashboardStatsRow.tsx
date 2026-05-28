'use client'

import React from 'react'
import { FileText, Target, CalendarDays, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DashboardStatsRowProps {
    totalDocuments: number
    totalApplications: number
    interviewsScheduled: number
    isPro: boolean
}

export function DashboardStatsRow({
    totalDocuments,
    totalApplications,
    interviewsScheduled,
    isPro
}: DashboardStatsRowProps) {
    const stats = [
        {
            label: 'Total Documents',
            value: totalDocuments,
            icon: FileText,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100',
        },
        {
            label: 'Active Applications',
            value: totalApplications,
            icon: Target,
            color: 'text-primary-600',
            bgColor: 'bg-primary-50',
            borderColor: 'border-primary-100',
        },
        {
            label: 'Interviews Scheduled',
            value: interviewsScheduled,
            icon: CalendarDays,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-100',
        },
        {
            label: 'Current Plan',
            value: isPro ? 'Pro' : 'Free',
            icon: Zap,
            color: isPro ? 'text-amber-500' : 'text-neutral-500',
            bgColor: isPro ? 'bg-amber-50' : 'bg-neutral-50',
            borderColor: isPro ? 'border-amber-100' : 'border-neutral-200',
            valueClass: isPro ? 'text-amber-600 text-3xl' : 'text-neutral-600 text-3xl',
        }
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, idx) => (
                <div 
                    key={idx} 
                    className="bg-white rounded-[2rem] p-6 border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors", stat.bgColor, stat.borderColor, "border")}>
                        <stat.icon className={cn("w-6 h-6", stat.color)} />
                    </div>
                    <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <h4 className={cn("text-4xl font-black tracking-tighter", stat.valueClass || "text-neutral-900")}>
                        {stat.value}
                    </h4>
                </div>
            ))}
        </div>
    )
}
