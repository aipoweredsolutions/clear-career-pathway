'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { fetchResume } from '@/app/editor/actions'

export async function createResume(type: 'resume' | 'cover_letter' | 'references' = 'resume') {
    const supabase = await createClient()
    const cookieStore = await cookies()

    // 1. Session check with Developer Guest Mode/Bypass support
    const isMock = cookieStore.get('mock_session')?.value === 'true'
    let session: any = null

    if (isMock) {
        session = { user: { id: 'mock-user-id', email: 'tester@example.com' } }
        // For mock mode, avoid DB calls and send to mock editor
        return redirect('/editor/mock-resume-id')
    } else {
        const { data } = await supabase.auth.getSession()
        session = data?.session
    }

    if (!session) {
        redirect('/auth/login')
    }

    try {
        // --- ENSURE PROFILE EXISTS ---
        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', session.user.id)
            .maybeSingle()

        if (!profile) {
            await supabase.rpc('ensure_user_profile', {
                p_user_id: session.user.id,
                p_email: session.user.email || '',
                p_full_name: session.user.user_metadata?.full_name || ''
            })
            await new Promise(resolve => setTimeout(resolve, 500))
        }

        // --- CHECK DOCUMENT LIMITS ---
        let docLimit = 1
        let currentCount = 0

        try {
            const { data: sub } = await supabase
                .from('user_subscriptions')
                .select('*, tier:subscription_tiers(*)')
                .eq('user_id', session.user.id)
                .maybeSingle()

            const tier = sub?.tier as any
            docLimit = tier?.max_documents ?? 1

            const { count } = await supabase
                .from('documents')
                .select('id', { count: 'exact', head: true })
                .eq('user_id', session.user.id)

            currentCount = count || 0
        } catch (limitError) { }

        if (docLimit !== null && currentCount >= docLimit) {
            redirect('/pricing?reason=limit_reached')
        }

        // --- CREATE DOCUMENT ---
        const { data, error } = await supabase
            .from('documents')
            .insert({
                user_id: session.user.id,
                title: type === 'cover_letter' ? 'Untitled Cover Letter' : type === 'references' ? 'Untitled Reference Page' : 'Untitled Resume',
                document_type: type,
                template_id: (type === 'cover_letter' || type === 'references') ? 'ats-professional' : 'classic',
            })
            .select()
            .single()

        if (error) throw new Error(error.message)

        redirect(`/editor/${data.id}`)
    } catch (error: any) {
        if (error.message?.includes('NEXT_REDIRECT') || error.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        throw new Error(`Unable to create document: ${error.message}`)
    }
}

export async function deleteResume(resumeId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', resumeId)

    if (error) {
        console.error('Error deleting resume:', error)
        throw new Error('Failed to delete resume')
    }

    revalidatePath('/dashboard')
}

export async function duplicateResume(resumeId: string) {
    const supabase = await createClient()
    const cookieStore = await cookies()

    // 1. Session check with Developer Guest Mode/Bypass support
    const isMock = cookieStore.get('mock_session')?.value === 'true'
    let session: any = null

    if (isMock) {
        session = { user: { id: 'mock-user-id', email: 'tester@example.com' } }
        return { success: true, id: 'mock-resume-id' }
    } else {
        const { data } = await supabase.auth.getSession()
        session = data?.session
    }

    if (!session) redirect('/auth/login')

    try {
        // 1. Fetch full document including relations
        const fullDoc = await fetchResume(resumeId)
        if (!fullDoc) throw new Error('Document not found')

        // 2. Create new document
        const { data: newDoc, error: docError } = await supabase
            .from('documents')
            .insert({
                user_id: session.user.id,
                title: `${fullDoc.title} (Copy)`,
                document_type: fullDoc.documentType,
                template_id: fullDoc.templateId,
                career_level: fullDoc.careerLevel,
                job_type: fullDoc.jobType,
                industry_focus: fullDoc.industryFocus,
                formatting: fullDoc.formatting,
            })
            .select()
            .single()

        if (docError) throw docError

        // 3. Batch insert relations (Personal Info, Summary, etc.)
        const newDocId = newDoc.id

        const promises = []

        if (fullDoc.personalInfo) {
            promises.push(supabase.from('personal_info').insert({
                ...fullDoc.personalInfo,
                id: undefined,
                document_id: newDocId
            }))
        }

        if (fullDoc.professionalSummary) {
            promises.push(supabase.from('professional_summary').insert({
                ...fullDoc.professionalSummary,
                id: undefined,
                document_id: newDocId
            }))
        }

        if (fullDoc.additionalInfo) {
            promises.push(supabase.from('additional_info').insert({
                ...fullDoc.additionalInfo,
                id: undefined,
                document_id: newDocId
            }))
        }

        // List relations
        const listTables = [
            { table: 'education', data: fullDoc.education },
            { table: 'skills', data: fullDoc.skills },
            { table: 'projects', data: fullDoc.projects },
            { table: 'certifications', data: fullDoc.certifications },
            { table: 'languages', data: fullDoc.languages },
            { table: 'publications', data: fullDoc.publications },
            { table: 'volunteer_experience', data: fullDoc.volunteerExperience },
            { table: 'professional_affiliations', data: fullDoc.professionalAffiliations },
            { table: 'document_references', data: fullDoc.references },
            { table: 'achievements', data: fullDoc.achievements },
        ]

        if (fullDoc.coverLetter) {
            promises.push(supabase.from('cover_letters').insert({
                document_id: newDocId,
                recipient_name: fullDoc.coverLetter.recipientName,
                recipient_title: fullDoc.coverLetter.recipientTitle,
                company_name: fullDoc.coverLetter.companyName,
                company_address: fullDoc.coverLetter.companyAddress,
                job_title: fullDoc.coverLetter.jobTitle,
                job_description: fullDoc.coverLetter.jobDescription,
                tone: fullDoc.coverLetter.tone,
                content: fullDoc.coverLetter.content
            }))
        }

        for (const { table, data } of listTables) {
            if (data && data.length > 0) {
                const payloads = data.map((item: any) => {
                    const { id, documentId, ...rest } = item
                    return { ...rest, document_id: newDocId }
                })
                promises.push(supabase.from(table).insert(payloads))
            }
        }

        await Promise.all(promises)

        // 4. Handle work experience and its nested achievements
        if (fullDoc.workExperience && fullDoc.workExperience.length > 0) {
            for (const exp of fullDoc.workExperience) {
                const { id: oldExpId, achievements, ...expRest } = exp
                const { data: newExp, error: expError } = await supabase
                    .from('work_experience')
                    .insert({ ...expRest, document_id: newDocId })
                    .select()
                    .single()

                if (!expError && achievements && achievements.length > 0) {
                    const achPayloads = achievements.map((ach: any) => ({
                        achievement_text: ach.achievementText,
                        metrics: ach.metrics,
                        work_experience_id: newExp.id
                    }))
                    await supabase.from('work_achievements').insert(achPayloads)
                }
            }
        }

        // 5. Handle custom sections
        if (fullDoc.customSections && fullDoc.customSections.length > 0) {
            for (const sec of fullDoc.customSections) {
                const { id: oldSecId, items, ...secRest } = sec
                const { data: newSec, error: secError } = await supabase
                    .from('custom_sections')
                    .insert({ ...secRest, document_id: newDocId })
                    .select()
                    .single()

                if (!secError && items && items.length > 0) {
                    const itemPayloads = items.map((item: any) => ({
                        text: item.text,
                        display_order: item.displayOrder,
                        custom_section_id: newSec.id
                    }))
                    await supabase.from('custom_section_items').insert(itemPayloads)
                }
            }
        }

        revalidatePath('/dashboard')
        return { success: true, id: newDocId }
    } catch (error: any) {
        console.error('Duplicate resume error:', error)
        return { success: false, error: error.message }
    }
}

export async function toggleResumeStatus(resumeId: string, currentStatus: boolean) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('documents')
        .update({ is_published: !currentStatus })
        .eq('id', resumeId)

    if (error) {
        console.error('Error toggling status:', error)
        throw new Error('Failed to update status')
    }

    revalidatePath('/dashboard')
}
