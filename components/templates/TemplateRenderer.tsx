"use client" 

import React from 'react'
import dynamic from 'next/dynamic'
import { ResumeDocument } from '@/lib/types/resume'
import { cn } from '@/lib/utils'

// Loading placeholder for smoother transitions
const TemplateLoading = () => (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center p-20 animate-pulse">
        <div className="w-32 h-6 bg-neutral-100 rounded mb-8" />
        <div className="w-full h-px bg-neutral-50 mb-12" />
        <div className="space-y-4 w-full">
            <div className="h-4 bg-neutral-50 rounded w-3/4" />
            <div className="h-4 bg-neutral-50 rounded w-1/2" />
            <div className="h-4 bg-neutral-50 rounded w-5/6" />
        </div>
    </div>
)

// Dynamic imports for ATS-compliant templates
const ATSProfessionalTemplate = dynamic(() => import('./ATSProfessionalTemplate').then(m => m.ATSProfessionalTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSClassicTemplate = dynamic(() => import('./ATSClassicTemplate').then(m => m.ATSClassicTemplate), { ssr: false, loading: () => <TemplateLoading /> })
// const ATSMinimalTemplate = dynamic(() => import('./ATSMinimalTemplate').then(m => m.ATSMinimalTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSExecutiveTemplate = dynamic(() => import('./ATSExecutiveTemplate').then(m => m.ATSExecutiveTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSModernTemplate = dynamic(() => import('./ATSModernTemplate').then(m => m.ATSModernTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSGraduateTemplate = dynamic(() => import('./ATSGraduateTemplate').then(m => m.ATSGraduateTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSTimelineTemplate = dynamic(() => import('./ATSTimelineTemplate').then(m => m.ATSTimelineTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSNursingTemplate = dynamic(() => import('./ATSNursingTemplate').then(m => m.ATSNursingTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSAcademiaTemplate = dynamic(() => import('./ATSAcademiaTemplate').then(m => m.ATSAcademiaTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSExecutiveCVTemplate = dynamic(() => import('./ATSExecutiveCVTemplate').then(m => m.ATSExecutiveCVTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSMinimalistMonoTemplate = dynamic(() => import('./ATSMinimalistMonoTemplate').then(m => m.ATSMinimalistMonoTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSRoyalScholarTemplate = dynamic(() => import('./ATSRoyalScholarTemplate').then(m => m.ATSRoyalScholarTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSAcademiaCVTemplate = dynamic(() => import('./ATSAcademiaCVTemplate').then(m => m.ATSAcademiaCVTemplate), { ssr: false, loading: () => <TemplateLoading /> })
// const ClassicCleanTemplate = dynamic(() => import('./ClassicCleanTemplate').then(m => m.ClassicCleanTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const CoverLetterTemplate = dynamic(() => import('./CoverLetterTemplate').then(m => m.CoverLetterTemplate), { ssr: false, loading: () => <TemplateLoading /> })

// New Templates
const ATSChronographTemplate = dynamic(() => import('./ATSChronographTemplate').then(m => m.ATSChronographTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSMastheadTemplate = dynamic(() => import('./ATSMastheadTemplate').then(m => m.ATSMastheadTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSBauhausTemplate = dynamic(() => import('./ATSBauhausTemplate').then(m => m.ATSBauhausTemplate), { ssr: false, loading: () => <TemplateLoading /> })
// Removed: Editorial Vogue template
// const ATSEditorialTemplate = dynamic(() => import('./ATSEditorialTemplate').then(m => m.ATSEditorialTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSGridlineTemplate = dynamic(() => import('./ATSGridlineTemplate').then(m => m.ATSGridlineTemplate), { ssr: false, loading: () => <TemplateLoading /> })
// const ATSMetroTemplate = dynamic(() => import('./ATSMetroTemplate').then(m => m.ATSMetroTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSClassicLeftTemplate = dynamic(() => import('./ATSClassicLeftTemplate').then(m => m.ATSClassicLeftTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSSterlingTemplate = dynamic(() => import('./ATSSterlingTemplate').then(m => m.ATSSterlingTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSCornerstoneTemplate = dynamic(() => import('./ATSCornerstoneTemplate').then(m => m.ATSCornerstoneTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSMeridianTemplate = dynamic(() => import('./ATSMeridianTemplate'), { ssr: false, loading: () => <TemplateLoading /> })

// Elite Single-Column (ATS Compliant) Templates
const EliteAlpineTemplate = dynamic(() => import('./EliteAlpineTemplate').then(m => m.EliteAlpineTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const EliteHaskinsTemplate = dynamic(() => import('./EliteHaskinsTemplate').then(m => m.EliteHaskinsTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const EliteParkerTemplate = dynamic(() => import('./EliteParkerTemplate').then(m => m.EliteParkerTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const EliteLondonTemplate = dynamic(() => import('./EliteLondonTemplate').then(m => m.EliteLondonTemplate), { ssr: false, loading: () => <TemplateLoading /> })

// Non-ATS Elegant Two-Column Templates
const ElegantSplitTemplate = dynamic(() => import('./ElegantSplitTemplate').then(m => m.ElegantSplitTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const PrestigeTemplate = dynamic(() => import('./PrestigeTemplate').then(m => m.PrestigeTemplate), { ssr: false, loading: () => <TemplateLoading /> })

interface TemplateRendererProps {
    templateId: string
    data: ResumeDocument
    className?: string
}

// Map of ID prefixes to components and default props
const getTemplateConfig = (id: string): { Component: any, props: any } => {
    // --- 1. Specific Premium/Long Formats (Check these first to avoid prefix overlap) ---
    if (id.startsWith('ats-executive-cv')) {
        let accentColor = 'text-slate-900'
        if (id.includes('-black')) accentColor = 'text-slate-950'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-emerald')) accentColor = 'text-emerald-900'
        if (id.includes('-maroon')) accentColor = 'text-rose-900'
        return { Component: ATSExecutiveCVTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-minimal-mono')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-slate')) accentColor = 'text-slate-700'
        if (id.includes('-zinc')) accentColor = 'text-zinc-600'
        return { Component: ATSMinimalistMonoTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-royal-scholar')) {
        let accentColor = 'text-blue-900'
        if (id.includes('-black')) accentColor = 'text-slate-950'
        if (id.includes('-burgundy')) accentColor = 'text-red-900'
        if (id.includes('-forest')) accentColor = 'text-green-900'
        return { Component: ATSRoyalScholarTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-academia-cv')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-maroon')) accentColor = 'text-red-900'
        if (id.includes('-forest')) accentColor = 'text-emerald-900'
        return { Component: ATSAcademiaCVTemplate, props: { accentColor } }
    }

    // --- 2. Standard ATS Series ---

    if (id.startsWith('ats-professional')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-black')) accentColor = 'text-neutral-950'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-blue')) accentColor = 'text-blue-600'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-green')) accentColor = 'text-emerald-800'
        return { Component: ATSProfessionalTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-classic-left')) {
        return { Component: ATSClassicLeftTemplate, props: {} }
    }

    if (id.startsWith('ats-classic')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-black')) accentColor = 'text-black'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-slate')) accentColor = 'text-slate-600'
        if (id.includes('-maroon')) accentColor = 'text-red-900'
        return { Component: ATSClassicTemplate, props: { accentColor } }
    }

    /* Decommissioned: Elegant Minimal
    if (id.startsWith('ats-minimal')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-black')) accentColor = 'text-black'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-slate')) accentColor = 'text-slate-600'
        if (id.includes('-teal')) accentColor = 'text-teal-700'
        return { Component: ATSMinimalTemplate, props: { accentColor } }
    }
    */

    if (id.startsWith('ats-executive')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-black')) accentColor = 'text-black'
        if (id.includes('-gold')) accentColor = 'text-amber-700'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-emerald')) accentColor = 'text-emerald-800'
        return { Component: ATSExecutiveTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-modern')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-black')) accentColor = 'text-black'
        if (id.includes('-blue')) accentColor = 'text-blue-600'
        if (id.includes('-violet')) accentColor = 'text-violet-600'
        if (id.includes('-teal')) accentColor = 'text-teal-600'
        if (id.includes('-slate')) accentColor = 'text-slate-600'
        return { Component: ATSModernTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-graduate')) {
        let accentColor = 'text-blue-900'
        if (id.includes('-black')) accentColor = 'text-neutral-900'
        if (id.includes('-maroon')) accentColor = 'text-rose-900'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-green')) accentColor = 'text-green-800'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        return { Component: ATSGraduateTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-nursing')) {
        let accentColor = 'text-teal-800'
        if (id.includes('-black')) accentColor = 'text-neutral-900'
        if (id.includes('-blue')) accentColor = 'text-blue-800'
        if (id.includes('-emerald')) accentColor = 'text-emerald-800'
        if (id.includes('-rose')) accentColor = 'text-rose-800'
        if (id.includes('-slate')) accentColor = 'text-slate-600'
        return { Component: ATSNursingTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-academia')) {
        let accentColor = 'text-slate-900'
        if (id.includes('-black')) accentColor = 'text-neutral-950'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-maroon')) accentColor = 'text-red-900'
        if (id.includes('-emerald')) accentColor = 'text-emerald-900'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        return { Component: ATSAcademiaTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-timeline')) {
        let accentColor = 'text-slate-900'
        if (id.includes('-black')) accentColor = 'text-neutral-950'
        if (id.includes('-navy')) accentColor = 'text-slate-900'
        if (id.includes('-slate')) accentColor = 'text-slate-700'
        if (id.includes('-charcoal')) accentColor = 'text-gray-800'
        if (id.includes('-emerald')) accentColor = 'text-emerald-900'
        return { Component: ATSTimelineTemplate, props: { accentColor } }
    }

    // --- New Layouts ---
    if (id.startsWith('ats-chronograph')) {
        let accentColor = 'text-neutral-950'
        if (id.includes('-black')) accentColor = 'text-black'
        if (id.includes('-graphite')) accentColor = 'text-gray-700'
        if (id.includes('-steel')) accentColor = 'text-blue-800'
        if (id.includes('-oxblood')) accentColor = 'text-red-900'
        return { Component: ATSChronographTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-masthead')) {
        let accentColor = 'text-neutral-800'
        if (id.includes('-black')) accentColor = 'text-neutral-950'
        if (id.includes('-slate')) accentColor = 'text-stone-700'
        if (id.includes('-prussian')) accentColor = 'text-blue-950'
        if (id.includes('-espresso')) accentColor = 'text-amber-950'
        return { Component: ATSMastheadTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-bauhaus')) {
        let accentColor = 'bg-red-600 text-red-600'
        if (id.includes('-black')) accentColor = 'bg-neutral-950 text-neutral-950'
        if (id.includes('-cobalt')) accentColor = 'bg-blue-700 text-blue-700'
        if (id.includes('-onyx')) accentColor = 'bg-neutral-900 text-neutral-900'
        if (id.includes('-brass')) accentColor = 'bg-yellow-700 text-yellow-700'
        return { Component: ATSBauhausTemplate, props: { accentColor } }
    }

    // Editorial Vogue removed — falls through to default


    if (id.startsWith('ats-gridline')) {
        let accentColor = 'text-blue-800'
        if (id.includes('-black')) accentColor = 'text-neutral-950'
        if (id.includes('-carbon')) accentColor = 'text-neutral-800'
        if (id.includes('-emerald')) accentColor = 'text-emerald-800'
        if (id.includes('-copper')) accentColor = 'text-orange-800'
        return { Component: ATSGridlineTemplate, props: { accentColor } }
    }

    // Metro removed — falls through to default


    // --- Classic Clean ---
    /* Decommissioned: Classic Clean
    if (id.startsWith('classic-clean')) {
        let accentColor = 'text-neutral-950'
        if (id.includes('-blue')) accentColor = 'text-blue-800'
        if (id.includes('-green')) accentColor = 'text-emerald-800'
        if (id.includes('-red')) accentColor = 'text-rose-800'
        if (id.includes('-purple')) accentColor = 'text-violet-800'
        if (id.includes('-navy')) accentColor = 'text-indigo-900'
        if (id.includes('-gray')) accentColor = 'text-gray-800'
        return { Component: ClassicCleanTemplate, props: { accentColor } }
    }
    */

    if (id.startsWith('ats-sterling')) {
        let accentColor = 'text-blue-700'
        if (id.includes('-black')) accentColor = 'text-neutral-950'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-emerald')) accentColor = 'text-emerald-700'
        if (id.includes('-slate')) accentColor = 'text-slate-600'
        return { Component: ATSSterlingTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-cornerstone')) {
        let accentColor = 'text-amber-900'
        if (id.includes('-black')) accentColor = 'text-neutral-950'
        if (id.includes('-charcoal')) accentColor = 'text-stone-700'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-burgundy')) accentColor = 'text-rose-900'
        if (id.includes('-forest')) accentColor = 'text-emerald-900'
        return { Component: ATSCornerstoneTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-meridian')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-black')) accentColor = 'text-neutral-950'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-slate')) accentColor = 'text-slate-700'
        if (id.includes('-emerald')) accentColor = 'text-emerald-900'
        return { Component: ATSMeridianTemplate, props: { accentColor } }
    }

    if (id.startsWith('elite-alpine') || id.startsWith('elite-sterling')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-midnight')) accentColor = 'text-slate-900'
        if (id.includes('-slate')) accentColor = 'text-slate-700'
        return { Component: EliteAlpineTemplate, props: { accentColor } }
    }

    if (id.startsWith('elite-haskins')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        return { Component: EliteHaskinsTemplate, props: { accentColor } }
    }

    if (id.startsWith('elite-parker')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-zinc')) accentColor = 'text-zinc-600'
        if (id.includes('-slate')) accentColor = 'text-slate-700'
        return { Component: EliteParkerTemplate, props: { accentColor } }
    }

    if (id.startsWith('elite-london')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        return { Component: EliteLondonTemplate, props: { accentColor } }
    }

    // --- Non-ATS Elegant Two-Column Templates ---
    if (id.startsWith('elegant-split')) {
        let accentColor = 'slate'
        if (id.includes('-forest'))   accentColor = 'forest'
        if (id.includes('-burgundy')) accentColor = 'burgundy'
        if (id.includes('-gold'))     accentColor = 'gold'
        if (id.includes('-navy'))     accentColor = 'navy'
        if (id.includes('-black'))    accentColor = 'black'
        if (id.includes('-charcoal') || id.includes('-gray')) accentColor = 'charcoal'
        return { Component: ElegantSplitTemplate, props: { accentColor } }
    }

    if (id.startsWith('prestige')) {
        let accentColor = 'gold'
        if (id.includes('-teal'))     accentColor = 'teal'
        if (id.includes('-charcoal')) accentColor = 'charcoal'
        if (id.includes('-rose'))     accentColor = 'rose'
        if (id.includes('-navy'))     accentColor = 'navy'
        return { Component: PrestigeTemplate, props: { accentColor } }
    }

    // --- Cover Letter ---
    if (id === 'cover-letter') return { Component: CoverLetterTemplate, props: {} }

    // Fallback to ATS Professional
    return { Component: ATSProfessionalTemplate, props: { accentColor: 'text-neutral-900' } }
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = React.memo(({ templateId, data, className }) => {
    const effectiveTemplateId = data.formatting?.themeColor ? `${templateId}-${data.formatting.themeColor}` : templateId
    const { Component, props } = getTemplateConfig(effectiveTemplateId)

    if (!Component) {
        return (
            <div className="p-8 text-center text-neutral-500 bg-neutral-50 rounded-lg">
                Template not found.
            </div>
        )
    }

    // Full-bleed: sidebars or edge-to-edge decorative borders that must touch the page edge
    const isFullBleed =
        templateId.startsWith('elegant-split') ||
        templateId.startsWith('ats-sterling') ||
        templateId.startsWith('ats-royal-scholar')

    // Self-padded: templates with their own p-10/p-12 — wrapper padding creates double-padding vs thumbnail
    const isSelfPadded =
        templateId.startsWith('ats-bauhaus') ||
        templateId.startsWith('ats-chronograph') ||
        templateId.startsWith('ats-classic-left') ||
        templateId.startsWith('ats-meridian')

    // Override the default accent color if a custom one is provided
    const finalProps = {
        ...props,
        ...(data.formatting?.accentColor ? { accentColor: data.formatting.accentColor } : {})
    }

    return (
        <div className={cn(
            "template-container bg-white h-full",
            (isFullBleed || isSelfPadded) ? "p-0" : "px-8 py-10 sm:px-12 sm:py-14",
            className
        )}>
            <Component data={data} {...finalProps} />
        </div>
    )
})

TemplateRenderer.displayName = 'TemplateRenderer'
