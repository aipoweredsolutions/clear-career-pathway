import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { mapDocumentRow } from '@/lib/supabase/documents'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import Link from 'next/link'
import { FileText, Download, Sparkles } from 'lucide-react'

export const revalidate = 300 // Cache for 5 minutes

interface PageProps {
    params: Promise<{ documentId: string }>
}

async function getPublicDocument(documentId: string) {
    const supabase = createAdminClient()

    // Fetch document — must be published
    const { data: doc, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', documentId)
        .eq('is_published', true)
        .single()

    if (error || !doc) return null

    // Fetch all relations in parallel
    const [
        { data: personalInfo },
        { data: summary },
        { data: experience },
        { data: education },
        { data: skills },
        { data: projects },
        { data: certifications },
        { data: languages },
        { data: achievements },
        { data: volunteer },
        { data: publications },
        { data: affiliations },
        { data: references },
        { data: additionalInfo },
        { data: customSections },
        { data: coverLetter }
    ] = await Promise.all([
        supabase.from('personal_info').select('*').eq('document_id', documentId).maybeSingle(),
        supabase.from('professional_summary').select('*').eq('document_id', documentId).maybeSingle(),
        supabase.from('work_experience').select('*, work_achievements(*)').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('education').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('skills').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('projects').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('certifications').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('languages').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('achievements').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('volunteer_experience').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('publications').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('professional_affiliations').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('document_references').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('additional_info').select('*').eq('document_id', documentId).maybeSingle(),
        supabase.from('custom_sections').select('*, custom_section_items(*)').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('cover_letters').select('*').eq('document_id', documentId).maybeSingle()
    ])

    return mapDocumentRow(doc, {
        personal_info: personalInfo,
        professional_summary: summary,
        work_experience: experience,
        education,
        skills,
        projects,
        certifications,
        languages,
        achievements,
        volunteer_experience: volunteer,
        publications,
        professional_affiliations: affiliations,
        references,
        additional_info: additionalInfo,
        custom_sections: customSections,
        cover_letters: coverLetter
    })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { documentId } = await params
    const doc = await getPublicDocument(documentId)

    if (!doc) {
        return {
            title: 'Resume Not Found',
            description: 'This resume is not available or has been made private.',
        }
    }

    const ownerName = doc.personalInfo?.fullName || 'Professional'
    const title = doc.personalInfo?.professionalTitle || 'Resume'
    const description = `${ownerName} — ${title}. View this professional resume built with Clear Career Path.`

    const ogUrl = `/api/og?title=${encodeURIComponent(`${ownerName}'s Resume`)}&description=${encodeURIComponent(title)}`

    return {
        title: `${ownerName} — ${title}`,
        description,
        openGraph: {
            title: `${ownerName} — ${title}`,
            description,
            type: 'profile',
            images: [{ url: ogUrl, width: 1200, height: 630, alt: `${ownerName}'s Resume` }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${ownerName} — ${title}`,
            description,
            images: [ogUrl],
        },
    }
}

export default async function PublicResumeViewerPage({ params }: PageProps) {
    const { documentId } = await params
    const doc = await getPublicDocument(documentId)

    if (!doc) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 px-6">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-neutral-200/60 flex items-center justify-center">
                        <FileText className="w-10 h-10 text-neutral-400" />
                    </div>
                    <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-3">
                        Resume Not Found
                    </h1>
                    <p className="text-neutral-500 font-medium mb-8 leading-relaxed">
                        This resume doesn't exist, has been removed, or the owner has made it private.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-neutral-900 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/20"
                    >
                        <Sparkles className="w-4 h-4" />
                        Create Your Own Resume
                    </Link>
                </div>
            </div>
        )
    }

    const ownerFirstName = doc.personalInfo?.fullName?.split(' ')[0] || 'Someone'
    const isA4 = doc.formatting?.paperSize === 'a4'

    return (
        <div className="min-h-screen bg-neutral-100 pb-24">
            {/* Resume Display */}
            <div className="flex justify-center pt-8 md:pt-12 px-4">
                <div
                    className="bg-white shadow-2xl shadow-neutral-900/10 ring-1 ring-neutral-900/5 origin-top"
                    style={{
                        width: isA4 ? '210mm' : '8.5in',
                    }}
                >
                    <div id="resume-preview">
                        <TemplateRenderer
                            templateId={doc.templateId}
                            data={doc}
                            className={isA4 ? 'w-[210mm]' : 'w-[8.5in]'}
                        />
                    </div>
                </div>
            </div>

            {/* Floating Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50">
                <div className="max-w-3xl mx-auto px-4 pb-4">
                    <div className="bg-neutral-950 rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between shadow-2xl shadow-neutral-900/40 border border-neutral-800">
                        {/* Owner attribution */}
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shrink-0">
                                <span className="text-white text-xs font-black">
                                    {ownerFirstName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-sm text-neutral-300 font-medium truncate hidden sm:block">
                                Resume by <span className="text-white font-bold">{ownerFirstName}</span>
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 md:gap-3 shrink-0">
                            <button
                                onClick={undefined}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 md:px-4 py-2 rounded-xl transition-colors border border-white/10"
                            >
                                <Download className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Download</span> PDF
                            </button>
                            <Link
                                href="/"
                                className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-indigo-500 hover:from-primary-600 hover:to-indigo-600 text-white text-xs font-black px-3 md:px-4 py-2 rounded-xl transition-all shadow-lg shadow-primary-500/25 uppercase tracking-wider"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Create Yours
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
