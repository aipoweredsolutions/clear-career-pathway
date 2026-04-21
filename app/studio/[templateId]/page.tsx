"use client"

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { Button } from '@/components/ui/Button'
import { 
    ChevronLeft, 
    ArrowRight, 
    Maximize2, 
    Download, 
    Palette,
    Loader2,
    Eye,
    LayoutTemplate,
    Columns
} from 'lucide-react'
import Link from 'next/link'
import { getMockDataForTemplate } from '@/lib/utils/persona-matcher'
import dynamic from 'next/dynamic'

const PDFPreview = dynamic(() => import('@/components/pdf/PDFPreview').then(mod => mod.PDFPreview), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center h-full w-full min-h-[500px] bg-neutral-50 rounded-2xl gap-4">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Waking up PDF Engine...</p>
        </div>
    )
})

export default function TemplateStudioPage() {
    const params = useParams()
    const router = useRouter()
    const templateId = params.templateId as string

    // Fetch the best-matching mock data for this specific template
    const mockData = getMockDataForTemplate(templateId ?? "ats-professional")

    // Format template ID for display: e.g. "ats-classic-navy" -> "ATS Classic Navy"
    const displayName = (templateId ?? "Professional")
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

    // Go back to previous page
    const handleBack = () => {
        router.back()
    }

    const [isDownloading, setIsDownloading] = useState(false)
    const [previewMode, setPreviewMode] = useState<'html' | 'pdf' | 'split'>('html')

    const handleDownloadSample = async () => {
        setIsDownloading(true)
        toast.info('Generating high-quality PDF sample...')
        
        try {
            // Dynamically import PDF generator to preserve browser bundle size
            const { pdf } = await import('@react-pdf/renderer')
            const { ResumePDF } = await import('@/lib/pdf/ResumePDF')

            const doc = <ResumePDF data={{...mockData, templateId: templateId}} isWatermarked={true} />
            const asBlob = await pdf(doc).toBlob()
            
            saveAs(asBlob, `Clear_Career_Path_${displayName.replace(/\s+/g, '_')}_Sample.pdf`)
            toast.success('Sample downloaded successfully')
        } catch (error) {
            console.error('Sample generation failed:', error)
            toast.error('Failed to generate sample. Please try again.')
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col pt-20">
            {/* --- Sticky Preview Top-Bar --- */}
            <div className="sticky top-20 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-neutral-200 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleBack}
                            className="text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-lg group"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-0.5" />
                            Back
                        </Button>
                        <div className="h-4 w-px bg-neutral-200" />
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Previewing Template</span>
                            <h1 className="text-sm font-bold text-neutral-900">{displayName}</h1>
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full border border-blue-100 uppercase tracking-tighter">
                                {templateId}
                            </span>
                        </div>
                    </div>

                    {/* Preview Mode Toggle */}
                    <div className="hidden md:flex bg-neutral-100 rounded-xl p-1 border border-neutral-200 shadow-inner">
                        <button
                            onClick={() => setPreviewMode('html')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                                previewMode === 'html' 
                                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-neutral-200" 
                                    : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            <LayoutTemplate className="w-3.5 h-3.5" />
                            Live
                        </button>
                        <button
                            onClick={() => setPreviewMode('split')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                                previewMode === 'split' 
                                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-neutral-200" 
                                    : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            <Columns className="w-3.5 h-3.5" />
                            Dual
                        </button>
                        <button
                            onClick={() => setPreviewMode('pdf')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                                previewMode === 'pdf' 
                                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-neutral-200" 
                                    : "text-neutral-500 hover:text-neutral-700"
                            )}
                        >
                            <Eye className="w-3.5 h-3.5" />
                            PDF
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleDownloadSample}
                            disabled={isDownloading}
                            className="hidden sm:flex border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold h-9 w-[200px]"
                        >
                            {isDownloading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PDF Sample
                                </>
                            )}
                        </Button>
                        <Link href={`/editor/setup?template=${templateId}`}>
                            <Button className="h-9 px-5 bg-black hover:bg-neutral-800 text-white font-bold rounded-lg shadow-lg hover:shadow-black/10 transition-all">
                                Use This Template
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- Workspace Layout --- */}
            <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* --- Left Column: Template Features & Attributes (Desktop Sticky) --- */}
                <aside className="lg:col-span-4 space-y-8">
                    <div className="lg:sticky lg:top-40 space-y-8">
                        {/* Highlights Card */}
                        <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <h2 className="text-xl font-black text-neutral-900 mb-6 flex items-center gap-3 italic">
                                <Sparkles className="w-6 h-6 text-blue-600" />
                                Expert Highlights
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    { icon: Shield, title: "ATS Optimized", desc: "Crafted to bypass 99.9% of modern applicant tracking systems." },
                                    { icon: Layers, title: "Industry Proven", desc: "Top choice for fortune 500 applications and executive roles." },
                                    { icon: Palette, title: "Premium Design", desc: "Perfect balance of aesthetic appeal and professional readability." },
                                    { icon: Maximize2, title: "Fully Scaleable", desc: "Adapts perfectly to single-page or multi-page career histories." }
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex gap-4 group">
                                        <div className="p-2.5 bg-neutral-50 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0 h-fit">
                                            <feature.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-neutral-900 leading-none mb-1 uppercase tracking-tight">{feature.title}</p>
                                            <p className="text-xs text-neutral-500 font-medium leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Why this template */}
                        <div className="p-8 bg-black rounded-3xl text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl group-hover:opacity-20 transition-opacity">
                                <CheckCircle2 className="w-32 h-32" />
                            </div>
                            <h3 className="text-lg font-black mb-3 italic relative z-10">Professional Recommendation</h3>
                            <p className="text-sm text-neutral-400 font-bold leading-relaxed mb-6 relative z-10">
                                This template is statistically preferred for candidates applying into high-competition sectors. The layout emphasizes professional titles and clear career progression.
                            </p>
                            <Link href="/pricing" className="text-xs font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-2 group/link relative z-10">
                                View Our Career Hub
                                <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* --- Right Column: The Live Preview --- */}
                <main className="lg:col-span-8 flex flex-col items-center">
                    {/* Shadow Enhancement Container */}
                    <div className="relative w-full max-w-[850px] group">
                        {/* Decorative Background Elements */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2.5rem] blur opacity-5 group-hover:opacity-10 transition-opacity" />
                        
                        {/* The Actual Template Window */}
                        <div className="relative overflow-hidden rounded-[2rem] bg-white border border-neutral-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
                            <div className="w-full bg-neutral-50 border-b border-neutral-100 flex items-center px-6 py-3 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                                </div>
                                <div className="flex-1 text-center">
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Premium Draft • {displayName}</span>
                                </div>
                            </div>
                            
                            {/* The Template Content */}
                            <div className={cn(
                                "bg-neutral-100 overflow-y-auto max-h-[85vh] p-4 sm:p-10 transition-all duration-500",
                                previewMode === 'split' ? "flex flex-row items-start justify-center gap-8 lg:gap-12" : "flex w-full justify-center"
                            )}>
                                {(previewMode === 'html' || previewMode === 'split') && (
                                    <div className="w-full max-w-[850px]" style={{ 
                                        transform: previewMode === 'split' ? 'scale(0.5)' : 'scale(1)',
                                        transformOrigin: 'top center',
                                        flex: previewMode === 'split' ? '0 0 auto' : '1 1 auto'
                                    }}>
                                        <TemplateRenderer 
                                            templateId={templateId} 
                                            data={mockData} 
                                            className="shadow-2xl rounded-sm border border-neutral-200 min-h-[1100px]"
                                        />
                                    </div>
                                )}

                                {(previewMode === 'pdf' || previewMode === 'split') && (
                                    <div className={cn(
                                        "transition-all duration-500",
                                        previewMode === 'split' ? "w-[210mm]" : "w-full max-w-[850px]"
                                    )} style={{ 
                                        transform: previewMode === 'split' ? 'scale(0.5)' : 'scale(1)',
                                        transformOrigin: 'top center',
                                        flex: previewMode === 'split' ? '0 0 auto' : '1 1 auto',
                                        height: previewMode === 'split' ? '297mm' : 'auto'
                                    }}>
                                        <PDFPreview 
                                            data={mockData} 
                                            className="h-full bg-neutral-900 rounded-lg shadow-2xl overflow-hidden min-h-[600px]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Preview Footer Tooltip */}
                        <div className="mt-8 flex items-center justify-center gap-4 text-neutral-400">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-bold uppercase tracking-widest">Full Customization Enabled in Editor</span>
                        </div>
                    </div>
                </main>
            </div>

            {/* --- Global Action Footer --- */}
            <div className="mt-auto w-full bg-white border-t border-neutral-200 py-12">
                <div className="max-w-[800px] mx-auto text-center px-6">
                    <h2 className="text-3xl font-black text-neutral-900 mb-4 italic leading-tight">Ready to boost your hireability?</h2>
                    <p className="text-neutral-500 font-bold mb-8 text-lg">
                        Apply with confidence using our most advanced resume layout. 
                        Over 25,000 professionals have secured interviews using this specific framework.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={`/editor/setup?template=${templateId}`} className="w-full sm:w-auto">
                            <Button size="lg" className="w-full h-14 px-10 bg-black hover:bg-neutral-800 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-black/20 transition-all">
                                Build My Resume with {displayName}
                            </Button>
                        </Link>
                        <Link href="/templates" className="w-full sm:w-auto">
                            <Button size="lg" variant="ghost" className="w-full h-14 px-8 text-neutral-900 font-black text-lg hover:bg-neutral-100 rounded-2xl">
                                Explore All Templates
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
