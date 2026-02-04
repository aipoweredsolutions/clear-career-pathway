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

// Dynamic imports for all templates to reduce bundle size
const ATSProfessionalTemplate = dynamic(() => import('./ATSProfessionalTemplate').then(m => m.ATSProfessionalTemplate), { loading: () => <TemplateLoading /> })
const ATSClassicTemplate = dynamic(() => import('./ATSClassicTemplate').then(m => m.ATSClassicTemplate), { loading: () => <TemplateLoading /> })
const ATSMinimalTemplate = dynamic(() => import('./ATSMinimalTemplate').then(m => m.ATSMinimalTemplate), { loading: () => <TemplateLoading /> })
const ATSExecutiveTemplate = dynamic(() => import('./ATSExecutiveTemplate').then(m => m.ATSExecutiveTemplate), { loading: () => <TemplateLoading /> })
const ATSTechnicalTemplate = dynamic(() => import('./ATSTechnicalTemplate').then(m => m.ATSTechnicalTemplate), { loading: () => <TemplateLoading /> })
const ATSModernTemplate = dynamic(() => import('./ATSModernTemplate').then(m => m.ATSModernTemplate), { loading: () => <TemplateLoading /> })
const ATSGraduateTemplate = dynamic(() => import('./ATSGraduateTemplate').then(m => m.ATSGraduateTemplate), { loading: () => <TemplateLoading /> })
const ATSStandardTemplate = dynamic(() => import('./ATSStandardTemplate').then(m => m.ATSStandardTemplate), { loading: () => <TemplateLoading /> })
const ClassicTemplate = dynamic(() => import('./ClassicTemplate').then(m => m.ClassicTemplate), { loading: () => <TemplateLoading /> })
const ModernTemplate = dynamic(() => import('./ModernTemplate').then(m => m.ModernTemplate), { loading: () => <TemplateLoading /> })
const CreativeTemplate = dynamic(() => import('./CreativeTemplate').then(m => m.CreativeTemplate), { loading: () => <TemplateLoading /> })
const TechnicalTemplate = dynamic(() => import('./TechnicalTemplate').then(m => m.TechnicalTemplate), { loading: () => <TemplateLoading /> })
const ExecutiveTemplate = dynamic(() => import('./ExecutiveTemplate').then(m => m.ExecutiveTemplate), { loading: () => <TemplateLoading /> })
const AcademicTemplate = dynamic(() => import('./AcademicTemplate').then(m => m.AcademicTemplate), { loading: () => <TemplateLoading /> })
const ChicTemplate = dynamic(() => import('./ChicTemplate').then(m => m.ChicTemplate), { loading: () => <TemplateLoading /> })
const CuteTemplate = dynamic(() => import('./CuteTemplate').then(m => m.CuteTemplate), { loading: () => <TemplateLoading /> })
const MinimalTemplate = dynamic(() => import('./MinimalTemplate').then(m => m.MinimalTemplate), { loading: () => <TemplateLoading /> })
const CompactTemplate = dynamic(() => import('./CompactTemplate').then(m => m.CompactTemplate), { loading: () => <TemplateLoading /> })
const ProfessionalTemplate = dynamic(() => import('./ProfessionalTemplate').then(m => m.ProfessionalTemplate), { loading: () => <TemplateLoading /> })
const LuxeTemplate = dynamic(() => import('./LuxeTemplate').then(m => m.LuxeTemplate), { loading: () => <TemplateLoading /> })
const StartupTemplate = dynamic(() => import('./StartupTemplate').then(m => m.StartupTemplate), { loading: () => <TemplateLoading /> })
const ArtisanTemplate = dynamic(() => import('./ArtisanTemplate').then(m => m.ArtisanTemplate), { loading: () => <TemplateLoading /> })
const SplitContrastTemplate = dynamic(() => import('./SplitContrastTemplate').then(m => m.SplitContrastTemplate), { loading: () => <TemplateLoading /> })
const GraduateTemplate = dynamic(() => import('./GraduateTemplate').then(m => m.GraduateTemplate), { loading: () => <TemplateLoading /> })
const ATSTimelineTemplate = dynamic(() => import('./ATSTimelineTemplate').then(m => m.ATSTimelineTemplate), { loading: () => <TemplateLoading /> })
const HospitalityEliteTemplate = dynamic(() => import('./HospitalityEliteTemplate').then(m => m.HospitalityEliteTemplate), { loading: () => <TemplateLoading /> })
const CruiseExcellenceTemplate = dynamic(() => import('./CruiseExcellenceTemplate').then(m => m.CruiseExcellenceTemplate), { loading: () => <TemplateLoading /> })
const ServiceProTemplate = dynamic(() => import('./ServiceProTemplate').then(m => m.ServiceProTemplate), { loading: () => <TemplateLoading /> })

interface TemplateRendererProps {
    templateId: string
    data: ResumeDocument
    className?: string
}

// Map of ID prefixes to components and default props
const getTemplateConfig = (id: string): { Component: any, props: any } => {
    // --- ATS Series Mappings (Handles variants like ats-classic-navy) ---
    if (id.startsWith('ats-professional')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-blue')) accentColor = 'text-blue-600'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-green')) accentColor = 'text-emerald-800'
        return { Component: ATSProfessionalTemplate, props: { accentColor } }
    }
    if (id.startsWith('ats-classic')) return { Component: ATSClassicTemplate, props: {} }
    if (id.startsWith('ats-minimal')) return { Component: ATSMinimalTemplate, props: {} }
    if (id.startsWith('ats-executive')) return { Component: ATSExecutiveTemplate, props: {} }
    if (id.startsWith('ats-technical')) return { Component: ATSTechnicalTemplate, props: {} }
    if (id.startsWith('ats-modern')) return { Component: ATSModernTemplate, props: {} }
    if (id.startsWith('ats-graduate')) return { Component: ATSGraduateTemplate, props: {} }
    if (id.startsWith('ats-standard')) {
        let accentColor = 'text-primary-600'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-blue')) accentColor = 'text-blue-600'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-slate')) accentColor = 'text-slate-600'
        if (id.includes('-black')) accentColor = 'text-neutral-900'
        return { Component: ATSStandardTemplate, props: { accentColor } }
    }
    if (id.startsWith('ats-timeline')) return { Component: ATSTimelineTemplate, props: {} }

    // --- Cute Variants ---
    if (id === 'cute-black') return { Component: CuteTemplate, props: { colorTheme: 'black' } }
    if (id === 'cute-pink') return { Component: CuteTemplate, props: { colorTheme: 'pink' } }
    if (id === 'cute-mint') return { Component: CuteTemplate, props: { colorTheme: 'mint' } }
    if (id === 'cute-lavender') return { Component: CuteTemplate, props: { colorTheme: 'lavender' } }
    if (id === 'cute-peach') return { Component: CuteTemplate, props: { colorTheme: 'peach' } }
    if (id === 'cute') return { Component: CuteTemplate, props: { colorTheme: 'pink' } }

    // --- Classic Variants ---
    if (id === 'classic-black') return { Component: ClassicTemplate, props: { accentColor: 'text-neutral-950' } }
    if (id === 'classic-blue') return { Component: ClassicTemplate, props: { accentColor: 'text-blue-800' } }
    if (id === 'classic-green') return { Component: ClassicTemplate, props: { accentColor: 'text-emerald-800' } }
    if (id === 'classic-red') return { Component: ClassicTemplate, props: { accentColor: 'text-rose-800' } }
    if (id === 'classic-purple') return { Component: ClassicTemplate, props: { accentColor: 'text-violet-800' } }
    if (id === 'classic-navy') return { Component: ClassicTemplate, props: { accentColor: 'text-indigo-900' } }
    if (id === 'classic-gray') return { Component: ClassicTemplate, props: { accentColor: 'text-gray-800' } }

    // --- Modern Variants ---
    if (id === 'modern-black') return { Component: ModernTemplate, props: { accentColor: 'bg-neutral-950' } }
    if (id === 'modern-teal') return { Component: ModernTemplate, props: { accentColor: 'bg-teal-900' } }
    if (id === 'modern-slate') return { Component: ModernTemplate, props: { accentColor: 'bg-slate-900' } }
    if (id === 'modern-blue') return { Component: ModernTemplate, props: { accentColor: 'bg-blue-900' } }
    if (id === 'modern-violet') return { Component: ModernTemplate, props: { accentColor: 'bg-violet-900' } }

    // --- Creative Variants ---
    if (id === 'creative-black') return { Component: CreativeTemplate, props: { accentColor: 'bg-neutral-950' } }
    if (id === 'creative-purple') return { Component: CreativeTemplate, props: { accentColor: 'bg-purple-600' } }
    if (id === 'creative-orange') return { Component: CreativeTemplate, props: { accentColor: 'bg-orange-600' } }
    if (id === 'creative-pink') return { Component: CreativeTemplate, props: { accentColor: 'bg-pink-600' } }
    if (id === 'creative-indigo') return { Component: CreativeTemplate, props: { accentColor: 'bg-indigo-600' } }
    if (id === 'creative-nursing') return { Component: CreativeTemplate, props: { accentColor: 'bg-pink-500' } }

    // --- Technical Variants ---
    if (id === 'technical-black') return { Component: TechnicalTemplate, props: { mode: 'dark' } }
    if (id === 'technical-dark') return { Component: TechnicalTemplate, props: { mode: 'dark' } }
    if (id === 'technical-devops') return { Component: TechnicalTemplate, props: { mode: 'devops' } }
    if (id === 'technical-standard') return { Component: TechnicalTemplate, props: { mode: 'standard' } }
    if (id === 'technical-slate') return { Component: TechnicalTemplate, props: { mode: 'dark' } }

    // --- Executive Variants ---
    if (id === 'executive-black') return { Component: ExecutiveTemplate, props: { theme: 'standard' } }
    if (id === 'executive-gold') return { Component: ExecutiveTemplate, props: { theme: 'gold' } }
    if (id === 'executive-standard') return { Component: ExecutiveTemplate, props: { theme: 'standard' } }
    if (id === 'executive-navy') return { Component: ExecutiveTemplate, props: { theme: 'standard' } }
    if (id === 'executive-emerald') return { Component: ExecutiveTemplate, props: { theme: 'gold' } }

    // --- Chic Variants ---
    if (id === 'chic-black') return { Component: ChicTemplate, props: { font: 'sans' } }
    if (id === 'chic-navy') return { Component: ChicTemplate, props: { font: 'sans' } }
    if (id === 'chic-slate') return { Component: ChicTemplate, props: { font: 'sans' } }
    if (id === 'chic-charcoal') return { Component: ChicTemplate, props: { font: 'sans' } }
    if (id === 'chic-serif') return { Component: ChicTemplate, props: { font: 'serif' } }
    if (id === 'chic-std') return { Component: ChicTemplate, props: { font: 'sans' } }

    // --- Academic Variants ---
    if (id === 'academic-black') return { Component: AcademicTemplate, props: { density: 'comfortable' } }
    if (id === 'academic-clean') return { Component: AcademicTemplate, props: { density: 'comfortable' } }
    if (id === 'academic-dense') return { Component: AcademicTemplate, props: { density: 'compact' } }
    if (id === 'academic-navy') return { Component: AcademicTemplate, props: { density: 'comfortable' } }
    if (id === 'academic-maroon') return { Component: AcademicTemplate, props: { density: 'comfortable' } }

    // --- Professional Variants ---
    if (id === 'professional-black') return { Component: ProfessionalTemplate, props: { accentColor: 'text-neutral-950' } }
    if (id === 'professional-navy') return { Component: ProfessionalTemplate, props: { accentColor: 'text-slate-900' } }
    if (id === 'professional-charcoal') return { Component: ProfessionalTemplate, props: { accentColor: 'text-gray-700' } }
    if (id === 'professional-blue') return { Component: ProfessionalTemplate, props: { accentColor: 'text-blue-900' } }
    if (id === 'professional-green') return { Component: ProfessionalTemplate, props: { accentColor: 'text-emerald-900' } }

    // --- Luxe Variants ---
    if (id === 'luxe-black') return { Component: LuxeTemplate, props: { theme: 'charcoal' } }
    if (id === 'luxe-gold') return { Component: LuxeTemplate, props: { theme: 'gold' } }
    if (id === 'luxe-emerald') return { Component: LuxeTemplate, props: { theme: 'emerald' } }
    if (id === 'luxe-charcoal') return { Component: LuxeTemplate, props: { theme: 'charcoal' } }
    if (id === 'luxe-navy') return { Component: LuxeTemplate, props: { theme: 'emerald' } }

    // --- Startup Variants ---
    if (id === 'startup-black') return { Component: StartupTemplate, props: { theme: 'vibrant-blue' } }
    if (id === 'startup-vibrant-blue') return { Component: StartupTemplate, props: { theme: 'vibrant-blue' } }
    if (id === 'startup-electric-purple') return { Component: StartupTemplate, props: { theme: 'electric-purple' } }
    if (id === 'startup-cyber-lime') return { Component: StartupTemplate, props: { theme: 'cyber-lime' } }
    if (id === 'startup-hot-pink') return { Component: StartupTemplate, props: { theme: 'electric-purple' } }

    // --- Artisan Variants ---
    if (id === 'artisan-black') return { Component: ArtisanTemplate, props: { theme: 'slate' } }
    if (id === 'artisan-sage') return { Component: ArtisanTemplate, props: { theme: 'sage' } }
    if (id === 'artisan-terracotta') return { Component: ArtisanTemplate, props: { theme: 'terracotta' } }
    if (id === 'artisan-slate') return { Component: ArtisanTemplate, props: { theme: 'slate' } }
    if (id === 'artisan-clay') return { Component: ArtisanTemplate, props: { theme: 'slate' } }

    // --- Split-Contrast Variants ---
    if (id === 'split-contrast-black') return { Component: SplitContrastTemplate, props: { theme: 'slate' } }
    if (id === 'split-contrast-gray') return { Component: SplitContrastTemplate, props: { theme: 'gray' } }
    if (id === 'split-contrast-slate') return { Component: SplitContrastTemplate, props: { theme: 'slate' } }
    if (id === 'split-contrast-warm') return { Component: SplitContrastTemplate, props: { theme: 'warm' } }
    if (id === 'split-contrast-navy') return { Component: SplitContrastTemplate, props: { theme: 'slate' } }

    // --- Minimal Variants ---
    if (id === 'minimal-black') return { Component: MinimalTemplate, props: { accentColor: 'text-neutral-950' } }
    if (id === 'minimal-navy') return { Component: MinimalTemplate, props: { accentColor: 'text-blue-900' } }
    if (id === 'minimal-charcoal') return { Component: MinimalTemplate, props: { accentColor: 'text-gray-700' } }
    if (id === 'minimal-slate') return { Component: MinimalTemplate, props: { accentColor: 'text-slate-700' } }
    if (id === 'minimal-teal') return { Component: MinimalTemplate, props: { accentColor: 'text-teal-700' } }

    // --- Compact Variants ---
    if (id === 'compact-black') return { Component: CompactTemplate, props: { accentColor: 'bg-neutral-950' } }
    if (id === 'compact-blue') return { Component: CompactTemplate, props: { accentColor: 'bg-blue-600' } }
    if (id === 'compact-dark') return { Component: CompactTemplate, props: { accentColor: 'bg-neutral-900' } }
    if (id === 'compact-emerald') return { Component: CompactTemplate, props: { accentColor: 'bg-emerald-600' } }
    if (id === 'compact-navy') return { Component: CompactTemplate, props: { accentColor: 'bg-indigo-900' } }

    // --- Graduate Variants ---
    if (id === 'graduate-black') return { Component: GraduateTemplate, props: { accentColor: 'text-neutral-950' } }
    if (id === 'graduate-navy') return { Component: GraduateTemplate, props: { accentColor: 'text-blue-900' } }
    if (id === 'graduate-teal') return { Component: GraduateTemplate, props: { accentColor: 'text-teal-700' } }
    if (id === 'graduate-maroon') return { Component: GraduateTemplate, props: { accentColor: 'text-rose-900' } }
    if (id === 'graduate-slate') return { Component: GraduateTemplate, props: { accentColor: 'text-slate-700' } }

    // --- ATS Timeline Variants ---
    if (id === 'ats-timeline-black') return { Component: ATSTimelineTemplate, props: { accentColor: 'text-neutral-950' } }
    if (id === 'ats-timeline-navy') return { Component: ATSTimelineTemplate, props: { accentColor: 'text-slate-900' } }
    if (id === 'ats-timeline-slate') return { Component: ATSTimelineTemplate, props: { accentColor: 'text-slate-700' } }
    if (id === 'ats-timeline-charcoal') return { Component: ATSTimelineTemplate, props: { accentColor: 'text-gray-800' } }
    if (id === 'ats-timeline-emerald') return { Component: ATSTimelineTemplate, props: { accentColor: 'text-emerald-900' } }

    // --- Hospitality Elite Variants ---
    if (id === 'hospitality-elite-gold') return { Component: HospitalityEliteTemplate, props: { accentColor: 'text-amber-700' } }
    if (id === 'hospitality-elite-navy') return { Component: HospitalityEliteTemplate, props: { accentColor: 'text-blue-800' } }
    if (id === 'hospitality-elite-burgundy') return { Component: HospitalityEliteTemplate, props: { accentColor: 'text-red-900' } }
    if (id === 'hospitality-elite-emerald') return { Component: HospitalityEliteTemplate, props: { accentColor: 'text-green-800' } }
    if (id === 'hospitality-elite-black') return { Component: HospitalityEliteTemplate, props: { accentColor: 'text-slate-800' } }

    // --- Cruise Excellence Variants ---
    if (id === 'cruise-excellence-ocean') return { Component: CruiseExcellenceTemplate, props: { accentColor: 'text-sky-800' } }
    if (id === 'cruise-excellence-anchor') return { Component: CruiseExcellenceTemplate, props: { accentColor: 'text-slate-600' } }
    if (id === 'cruise-excellence-coral') return { Component: CruiseExcellenceTemplate, props: { accentColor: 'text-rose-500' } }
    if (id === 'cruise-excellence-white') return { Component: CruiseExcellenceTemplate, props: { accentColor: 'text-slate-400' } }
    if (id === 'cruise-excellence-navy') return { Component: CruiseExcellenceTemplate, props: { accentColor: 'text-slate-900' } }

    // --- Service Pro Variants ---
    if (id === 'service-pro-slate') return { Component: ServiceProTemplate, props: { accentColor: 'text-slate-900' } }
    if (id === 'service-pro-teal') return { Component: ServiceProTemplate, props: { accentColor: 'text-teal-700' } }
    if (id === 'service-pro-orange') return { Component: ServiceProTemplate, props: { accentColor: 'text-orange-600' } }
    if (id === 'service-pro-purple') return { Component: ServiceProTemplate, props: { accentColor: 'text-purple-700' } }
    if (id === 'service-pro-gray') return { Component: ServiceProTemplate, props: { accentColor: 'text-slate-400' } }

    // --- Fallbacks / Exact Matches ---
    switch (id) {
        case 'classic': return { Component: ClassicTemplate, props: { accentColor: 'text-blue-800' } }
        case 'modern': return { Component: ModernTemplate, props: { accentColor: 'bg-slate-900' } }
        case 'technical': return { Component: TechnicalTemplate, props: { mode: 'standard' } }
        case 'executive': return { Component: ExecutiveTemplate, props: { theme: 'standard' } }
        case 'academic': return { Component: AcademicTemplate, props: { density: 'comfortable' } }
        case 'chic': return { Component: ChicTemplate, props: { font: 'sans' } }
        case 'creative': return { Component: CreativeTemplate, props: { accentColor: 'bg-purple-600' } }
        case 'student': return { Component: CreativeTemplate, props: { mode: 'student' } }
        case 'professional': return { Component: ProfessionalTemplate, props: { accentColor: 'text-slate-900' } }
        case 'luxe': return { Component: LuxeTemplate, props: { theme: 'gold' } }
        case 'startups': return { Component: StartupTemplate, props: { theme: 'vibrant-blue' } }
        case 'startup': return { Component: StartupTemplate, props: { theme: 'vibrant-blue' } }
        case 'artisan': return { Component: ArtisanTemplate, props: { theme: 'sage' } }
        case 'split-contrast': return { Component: SplitContrastTemplate, props: { theme: 'gray' } }
        case 'minimal': return { Component: MinimalTemplate, props: { accentColor: 'text-neutral-900' } }
        case 'compact': return { Component: CompactTemplate, props: { accentColor: 'bg-neutral-900' } }
        case 'graduate': return { Component: GraduateTemplate, props: { accentColor: 'text-blue-900' } }

        // --- NEW ATS Series Fallbacks ---
        case 'ats-classic': return { Component: ATSClassicTemplate, props: {} }
        case 'ats-minimal': return { Component: ATSMinimalTemplate, props: {} }
        case 'ats-executive': return { Component: ATSExecutiveTemplate, props: {} }
        case 'ats-technical': return { Component: ATSTechnicalTemplate, props: {} }
        case 'ats-modern': return { Component: ATSModernTemplate, props: {} }
        case 'ats-graduate': return { Component: ATSGraduateTemplate, props: {} }
        case 'ats-standard': return { Component: ATSStandardTemplate, props: {} }
        case 'ats-timeline': return { Component: ATSTimelineTemplate, props: { accentColor: 'text-slate-900' } }
        case 'hospitality-elite': return { Component: HospitalityEliteTemplate, props: { accentColor: 'text-amber-700' } }
        case 'cruise-excellence': return { Component: CruiseExcellenceTemplate, props: { accentColor: 'text-sky-800' } }
        case 'service-pro': return { Component: ServiceProTemplate, props: { accentColor: 'text-slate-900' } }
        default: return { Component: ClassicTemplate, props: {} }
    }
}

export function TemplateRenderer({ templateId, data, className }: TemplateRendererProps) {
    const { Component, props } = getTemplateConfig(templateId)

    // Apply formatting styles
    const formattingStyle: React.CSSProperties = {
        fontSize: data.formatting?.fontSize === 'small' ? '0.875rem' :
            data.formatting?.fontSize === 'large' ? '1.125rem' : '1rem',
        lineHeight: data.formatting?.lineHeight === 'tight' ? '1.2' :
            data.formatting?.lineHeight === 'relaxed' ? '1.75' : '1.5',
        // Margins depend on the template usually, but we can wrap it
    }

    // Margin mapping to padding classes
    const marginClass = data.formatting?.margin === 'narrow' ? 'p-8' :
        data.formatting?.margin === 'wide' ? 'p-16' :
            'p-12' // Standard default

    const paperHeight = data.formatting?.paperSize === 'a4' ? '297mm' : '11in'

    // Identify templates that should be full-bleed (no outer padding)
    const isFullBleed = templateId.startsWith('modern') ||
        templateId.startsWith('technical') ||
        templateId.startsWith('startup') ||
        templateId.startsWith('chic') ||
        templateId.startsWith('artisan') ||
        templateId.startsWith('creative') ||
        templateId.startsWith('split-contrast') ||
        templateId.startsWith('cute') ||
        templateId.startsWith('hospitality-elite') ||
        templateId.startsWith('cruise-excellence') ||
        templateId.startsWith('service-pro')

    if (!Component) {
        return (
            <div className="flex items-center justify-center p-12 bg-neutral-50 text-neutral-400 border border-dashed border-neutral-300 rounded-xl">
                Template component not found for: {templateId}
            </div>
        )
    }

    return (
        <div style={formattingStyle} className={cn("relative shadow-2xl bg-white", className)}>
            <div id="resume-preview" className="min-h-inherit relative">
                {/* @ts-ignore */}
                <Component
                    data={data}
                    {...props}
                    className={cn(
                        !isFullBleed && marginClass,
                        "min-h-inherit"
                    )}
                />
            </div>
        </div>
    )
}
