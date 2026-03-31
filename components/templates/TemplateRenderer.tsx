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
const ATSMinimalTemplate = dynamic(() => import('./ATSMinimalTemplate').then(m => m.ATSMinimalTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSExecutiveTemplate = dynamic(() => import('./ATSExecutiveTemplate').then(m => m.ATSExecutiveTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSTechnicalTemplate = dynamic(() => import('./ATSTechnicalTemplate').then(m => m.ATSTechnicalTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSModernTemplate = dynamic(() => import('./ATSModernTemplate').then(m => m.ATSModernTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSGraduateTemplate = dynamic(() => import('./ATSGraduateTemplate').then(m => m.ATSGraduateTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSTimelineTemplate = dynamic(() => import('./ATSTimelineTemplate').then(m => m.ATSTimelineTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSHospitalityTemplate = dynamic(() => import('./ATSHospitalityTemplate').then(m => m.ATSHospitalityTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSNursingTemplate = dynamic(() => import('./ATSNursingTemplate').then(m => m.ATSNursingTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ATSAcademiaTemplate = dynamic(() => import('./ATSAcademiaTemplate').then(m => m.ATSAcademiaTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const ClassicCleanTemplate = dynamic(() => import('./ClassicCleanTemplate').then(m => m.ClassicCleanTemplate), { ssr: false, loading: () => <TemplateLoading /> })
const CoverLetterTemplate = dynamic(() => import('./CoverLetterTemplate').then(m => m.CoverLetterTemplate), { ssr: false, loading: () => <TemplateLoading /> })

interface TemplateRendererProps {
    templateId: string
    data: ResumeDocument
    className?: string
}

// Map of ID prefixes to components and default props
const getTemplateConfig = (id: string): { Component: any, props: any } => {
    // --- ATS Series Mappings ---
    if (id.startsWith('ats-professional')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-blue')) accentColor = 'text-blue-600'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-green')) accentColor = 'text-emerald-800'
        return { Component: ATSProfessionalTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-classic')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-slate')) accentColor = 'text-slate-600'
        if (id.includes('-maroon')) accentColor = 'text-red-900'
        return { Component: ATSClassicTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-minimal')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-slate')) accentColor = 'text-slate-600'
        if (id.includes('-teal')) accentColor = 'text-teal-700'
        return { Component: ATSMinimalTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-executive')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-gold')) accentColor = 'text-amber-700'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-emerald')) accentColor = 'text-emerald-800'
        return { Component: ATSExecutiveTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-technical')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-green')) accentColor = 'text-emerald-700'
        if (id.includes('-cyan')) accentColor = 'text-cyan-700'
        if (id.includes('-orange')) accentColor = 'text-orange-600'
        if (id.includes('-slate')) accentColor = 'text-slate-600'
        return { Component: ATSTechnicalTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-modern')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-blue')) accentColor = 'text-blue-600'
        if (id.includes('-violet')) accentColor = 'text-violet-600'
        if (id.includes('-teal')) accentColor = 'text-teal-600'
        if (id.includes('-slate')) accentColor = 'text-slate-600'
        return { Component: ATSModernTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-graduate')) {
        let accentColor = 'text-blue-900'
        if (id.includes('-maroon')) accentColor = 'text-rose-900'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-green')) accentColor = 'text-green-800'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        return { Component: ATSGraduateTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-hospitality')) {
        let accentColor = 'text-neutral-900'
        if (id.includes('-navy')) accentColor = 'text-blue-900'
        if (id.includes('-charcoal')) accentColor = 'text-gray-700'
        if (id.includes('-slate')) accentColor = 'text-slate-700'
        if (id.includes('-emerald')) accentColor = 'text-emerald-800'
        return { Component: ATSHospitalityTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-nursing')) {
        let accentColor = 'text-teal-800'
        if (id.includes('-blue')) accentColor = 'text-blue-800'
        if (id.includes('-emerald')) accentColor = 'text-emerald-800'
        if (id.includes('-rose')) accentColor = 'text-rose-800'
        if (id.includes('-slate')) accentColor = 'text-slate-600'
        return { Component: ATSNursingTemplate, props: { accentColor } }
    }

    if (id.startsWith('ats-academia')) {
        let accentColor = 'text-slate-900'
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

    // --- Classic Clean ---
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

    // --- Cover Letter ---
    if (id === 'cover-letter') return { Component: CoverLetterTemplate, props: {} }

    // Fallback to ATS Professional
    return { Component: ATSProfessionalTemplate, props: { accentColor: 'text-neutral-900' } }
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ templateId, data, className }) => {
    const { Component, props } = getTemplateConfig(templateId)

    if (!Component) {
        return (
            <div className="p-8 text-center text-neutral-500 bg-neutral-50 rounded-lg">
                Template not found.
            </div>
        )
    }

    return (
        <div className={cn("template-container bg-white px-8 py-10 sm:px-12 sm:py-14", className)}>
            <Component data={data} {...props} />
        </div>
    )
}
