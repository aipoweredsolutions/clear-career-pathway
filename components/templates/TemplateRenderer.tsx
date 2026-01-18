import { ATSProfessionalTemplate } from './ATSProfessionalTemplate'
import { ClassicTemplate } from './ClassicTemplate'
import { ModernTemplate } from './ModernTemplate'
import { CreativeTemplate } from './CreativeTemplate'
import { TechnicalTemplate } from './TechnicalTemplate'
import { ExecutiveTemplate } from './ExecutiveTemplate'
import { AcademicTemplate } from './AcademicTemplate'
import { ChicTemplate } from './ChicTemplate'
import { CuteTemplate } from './CuteTemplate'
import { MinimalTemplate } from './MinimalTemplate'
import { CompactTemplate } from './CompactTemplate'
import { ProfessionalTemplate } from './ProfessionalTemplate'
import { LuxeTemplate } from './LuxeTemplate'
import { StartupTemplate } from './StartupTemplate'
import { ArtisanTemplate } from './ArtisanTemplate'
import { SplitContrastTemplate } from './SplitContrastTemplate'
import { ResumeDocument } from '@/lib/types/resume'

interface TemplateRendererProps {
    templateId: string
    data: ResumeDocument
    className?: string
}

// Map of ID prefixes to components and default props
const getTemplateConfig = (id: string): { Component: any, props: any } => {
    // --- ATS Professional Variants ---
    if (id === 'ats-professional-standard') return { Component: ATSProfessionalTemplate, props: {} }
    if (id === 'ats-professional-navy') return { Component: ATSProfessionalTemplate, props: {} }
    if (id === 'ats-professional-charcoal') return { Component: ATSProfessionalTemplate, props: {} }
    if (id === 'ats-professional') return { Component: ATSProfessionalTemplate, props: {} }

    // --- Cute Variants ---
    if (id.startsWith('cute-')) return { Component: CuteTemplate, props: { colorTheme: id.replace('cute-', '') } }
    if (id === 'cute') return { Component: CuteTemplate, props: { colorTheme: 'pink' } }

    // --- Classic Variants ---
    if (id.startsWith('classic-')) return { Component: ClassicTemplate, props: { accentColor: `text-${id.replace('classic-', '')}-800` } } // Dynamic mapping attempt? No, tailwind classes need full strings usually, but let's try direct mapping first.

    // Explicit mappings are safer for Tailwind JIT
    if (id === 'classic-blue') return { Component: ClassicTemplate, props: { accentColor: 'text-blue-800' } }
    if (id === 'classic-green') return { Component: ClassicTemplate, props: { accentColor: 'text-emerald-800' } }
    if (id === 'classic-red') return { Component: ClassicTemplate, props: { accentColor: 'text-rose-800' } }
    if (id === 'classic-purple') return { Component: ClassicTemplate, props: { accentColor: 'text-violet-800' } }
    if (id === 'classic-navy') return { Component: ClassicTemplate, props: { accentColor: 'text-indigo-900' } }
    if (id === 'classic-gray') return { Component: ClassicTemplate, props: { accentColor: 'text-gray-800' } }

    // --- Modern Variants ---
    if (id === 'modern-teal') return { Component: ModernTemplate, props: { accentColor: 'bg-teal-900' } }
    if (id === 'modern-slate') return { Component: ModernTemplate, props: { accentColor: 'bg-slate-900' } }
    if (id === 'modern-blue') return { Component: ModernTemplate, props: { accentColor: 'bg-blue-900' } }
    if (id === 'modern-violet') return { Component: ModernTemplate, props: { accentColor: 'bg-violet-900' } }

    // --- Creative Variants ---
    if (id === 'creative-purple') return { Component: CreativeTemplate, props: { accentColor: 'bg-purple-600' } }
    if (id === 'creative-orange') return { Component: CreativeTemplate, props: { accentColor: 'bg-orange-600' } }
    if (id === 'creative-pink') return { Component: CreativeTemplate, props: { accentColor: 'bg-pink-600' } }

    // --- Technical Variants ---
    if (id === 'technical-dark') return { Component: TechnicalTemplate, props: { mode: 'dark' } }
    if (id === 'technical-devops') return { Component: TechnicalTemplate, props: { mode: 'devops' } }
    if (id === 'technical-standard') return { Component: TechnicalTemplate, props: { mode: 'standard' } }

    // --- Executive Variants ---
    if (id === 'executive-gold') return { Component: ExecutiveTemplate, props: { theme: 'gold' } }
    if (id === 'executive-standard') return { Component: ExecutiveTemplate, props: { theme: 'standard' } }

    // --- Chic Variants ---
    if (id === 'chic-serif') return { Component: ChicTemplate, props: { font: 'serif' } }
    if (id === 'chic-std') return { Component: ChicTemplate, props: { font: 'sans' } }

    // --- Academic Variants ---
    if (id === 'academic-clean') return { Component: AcademicTemplate, props: { density: 'comfortable' } }
    if (id === 'academic-dense') return { Component: AcademicTemplate, props: { density: 'compact' } }

    // --- Professional Variants ---
    if (id === 'professional-navy') return { Component: ProfessionalTemplate, props: { accentColor: 'text-slate-900' } }
    if (id === 'professional-charcoal') return { Component: ProfessionalTemplate, props: { accentColor: 'text-gray-700' } }
    if (id === 'professional-blue') return { Component: ProfessionalTemplate, props: { accentColor: 'text-blue-900' } }
    if (id === 'professional-green') return { Component: ProfessionalTemplate, props: { accentColor: 'text-emerald-900' } }

    // --- Luxe Variants ---
    if (id === 'luxe-gold') return { Component: LuxeTemplate, props: { theme: 'gold' } }
    if (id === 'luxe-emerald') return { Component: LuxeTemplate, props: { theme: 'emerald' } }
    if (id === 'luxe-charcoal') return { Component: LuxeTemplate, props: { theme: 'charcoal' } }

    // --- Startup Variants ---
    if (id === 'startup-vibrant-blue') return { Component: StartupTemplate, props: { theme: 'vibrant-blue' } }
    if (id === 'startup-electric-purple') return { Component: StartupTemplate, props: { theme: 'electric-purple' } }
    if (id === 'startup-cyber-lime') return { Component: StartupTemplate, props: { theme: 'cyber-lime' } }

    // --- Artisan Variants ---
    if (id === 'artisan-sage') return { Component: ArtisanTemplate, props: { theme: 'sage' } }
    if (id === 'artisan-terracotta') return { Component: ArtisanTemplate, props: { theme: 'terracotta' } }
    if (id === 'artisan-slate') return { Component: ArtisanTemplate, props: { theme: 'slate' } }

    // --- Split-Contrast Variants ---
    if (id === 'split-contrast-gray') return { Component: SplitContrastTemplate, props: { theme: 'gray' } }
    if (id === 'split-contrast-slate') return { Component: SplitContrastTemplate, props: { theme: 'slate' } }
    if (id === 'split-contrast-warm') return { Component: SplitContrastTemplate, props: { theme: 'warm' } }

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
        case 'startup': return { Component: StartupTemplate, props: { theme: 'vibrant-blue' } }
        case 'artisan': return { Component: ArtisanTemplate, props: { theme: 'sage' } }
        case 'split-contrast': return { Component: SplitContrastTemplate, props: { theme: 'gray' } }
        default: return { Component: ClassicTemplate, props: {} }
    }
}

export function TemplateRenderer({ templateId, data, className }: TemplateRendererProps) {
    const { Component, props } = getTemplateConfig(templateId)
    // @ts-ignore - Dynamic props are hard to type strictly without discriminated unions
    return <Component data={data} className={className} {...props} />
}
