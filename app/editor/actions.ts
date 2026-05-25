'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ResumeDocument, PersonalInfo, ProfessionalSummary, WorkExperience, Education, Skill, Project, UserSubscription } from '@/lib/types/resume'
import { fetchFullDocument } from '@/lib/supabase/documents'
import { fetchUserSubscription } from '@/lib/supabase/subscriptions'
import { getUserTier } from '@/lib/auth/getUserTier'
import { logger } from '@/lib/logger'

// Helper to get Supabase client
async function getSupabase() {
    const cookieStore = await cookies()
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )
}

// Helper to log user activity to database and server console
async function logUserActivity(action: string, details: Record<string, any> = {}) {
    try {
        const supabase = await getSupabase()
        const { data: { user } } = await supabase.auth.getUser()
        const userId = user?.id || null

        // 1. Log to server console (structured)
        logger.info(`User activity: ${action}`, {
            userId,
            action,
            details
        })

        // 2. Log to database
        const { error } = await supabase.from('activity_logs').insert({
            user_id: userId,
            action,
            details
        })

        if (error) {
            logger.error(`Failed to insert activity log to database:`, { error: error.message, action, userId })
        }
    } catch (err: any) {
        logger.error(`Exception in logUserActivity:`, { error: err.message || err })
    }
}

export async function fetchResume(documentId: string): Promise<ResumeDocument | null> {
    const supabase = await getSupabase()
    const doc = await fetchFullDocument(supabase, documentId)
    if (doc) {
        await logUserActivity('fetch_resume', { documentId })
    } else {
        logger.warn('Failed to fetch resume or resume not found', { documentId })
    }
    return doc
}

export async function fetchSubscription(): Promise<UserSubscription | null> {
    const cookieStore = await cookies()
    const isMock = cookieStore.get('mock_session')?.value === 'true'

    if (isMock) {
        return {
            id: 'mock-sub-id',
            userId: 'mock-user-id',
            tierId: 'premium',
            status: 'active',
            currentPeriodEnd: '2099-12-31',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tier: {
                id: 'premium',
                name: 'premium',
                price: 2900,
                interval: 'monthly',
                max_resumes: 99,
                max_exports_per_month: 99,
                features: ['AI Support', 'Unlimited PDF Exports', 'Custom Templates']
            } as any
        }
    }

    const supabase = await getSupabase()
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    if (!user) return null
    return fetchUserSubscription(supabase, user.id)
}

export async function saveResume(data: ResumeDocument): Promise<{ success: boolean, error?: string }> {
    const supabase = await getSupabase()
    const documentId = data.id

    if (!documentId) return { success: false, error: 'Missing Data ID' }

    try {
        // 1. Update Main Document
        const { error: docError } = await supabase
            .from('documents')
            .update({
                title: data.title,
                template_id: data.templateId,
                updated_at: new Date().toISOString()
            })
            .eq('id', documentId)

        if (docError) throw docError

        // 2. Upsert Personal Info
        if (data.personalInfo) {
            const { error: piError } = await supabase
                .from('personal_info')
                .upsert({
                    document_id: documentId,
                    full_name: data.personalInfo.fullName,
                    professional_title: data.personalInfo.professionalTitle,
                    email: data.personalInfo.email,
                    phone: data.personalInfo.phone,
                    city: data.personalInfo.city,
                    country: data.personalInfo.country,
                    linkedin_url: data.personalInfo.linkedinUrl,
                    website_url: data.personalInfo.websiteUrl,
                    portfolio_url: data.personalInfo.portfolioUrl
                }, { onConflict: 'document_id' })

            if (piError) throw piError
        }

        // 3. Upsert Professional Summary
        if (data.professionalSummary) {
            const { error: psError } = await supabase
                .from('professional_summary')
                .upsert({
                    document_id: documentId,
                    summary_text: data.professionalSummary.summaryText,
                    headline: data.professionalSummary.headline
                }, { onConflict: 'document_id' })

            if (psError) throw psError
        }

        // Helper function to handle list updates with deletion
        const syncList = async (
            tableName: string,
            items: any[],
            mapItemToPayload: (item: any) => any
        ) => {
            // 1. Fetch current IDs
            const { data: currentItems } = await supabase
                .from(tableName)
                .select('id')
                .eq('document_id', documentId)

            const currentIds = currentItems?.map(i => i.id) || []
            const newIds = items.map(i => i.id).filter(Boolean)

            // 2. Delete removed items
            const idsToDelete = currentIds.filter(id => !newIds.includes(id))
            if (idsToDelete.length > 0) {
                await supabase
                    .from(tableName)
                    .delete()
                    .in('id', idsToDelete)
            }

            // 3. Upsert current items
            for (let i = 0; i < items.length; i++) {
                const item = items[i]
                const payload = {
                    ...mapItemToPayload(item),
                    document_id: documentId,
                    display_order: i
                }
                const { error } = await supabase
                    .from(tableName)
                    .upsert(payload)

                if (error) {
                    console.error(`Error saving ${tableName} item:`, error)
                    throw error
                }
            }
        }

        // 4. Handle Work Experience
        if (data.workExperience) {
            await syncList('work_experience', data.workExperience, (exp) => {
                let payload = {
                    id: exp.id,
                    job_title: exp.jobTitle,
                    company_name: exp.companyName,
                    location: exp.location,
                    start_date: exp.startDate || null,
                    end_date: exp.endDate || null,
                    is_current: exp.isCurrent,
                    role_description: exp.roleDescription
                }
                if (payload.start_date === '') payload.start_date = null
                if (payload.end_date === '') payload.end_date = null
                return payload
            })

            // Handle Achievements separately (nested under experience)
            // Strategy: For each experience, sync its achievements.
            for (const exp of data.workExperience) {
                if (exp.achievements) {
                    // Fetch achievements for this work_experience_id
                    const { data: currentAchs } = await supabase
                        .from('work_achievements')
                        .select('id')
                        .eq('work_experience_id', exp.id)

                    const currentIds = currentAchs?.map(a => a.id) || []
                    const newIds = exp.achievements.map(a => a.id).filter(Boolean)

                    const idsToDelete = currentIds.filter(id => !newIds.includes(id))
                    if (idsToDelete.length > 0) {
                        await supabase.from('work_achievements').delete().in('id', idsToDelete)
                    }

                    for (const ach of exp.achievements) {
                        await supabase
                            .from('work_achievements')
                            .upsert({
                                id: ach.id,
                                work_experience_id: exp.id,
                                achievement_text: ach.achievementText
                            })
                    }
                }
            }
        }

        // 5. Handle Education
        if (data.education) {
            await syncList('education', data.education, (edu) => ({
                id: edu.id,
                institution_name: edu.institutionName,
                degree: edu.degree,
                field_of_study: edu.major,
                location: edu.location,
                start_year: edu.startYear,
                end_year: edu.endYear,
                gpa: edu.gpa
            }))
        }

        // 6. Handle Skills
        if (data.skills) {
            await syncList('skills', data.skills, (skill) => ({
                id: skill.id,
                skill_name: skill.skillName,
                skill_type: skill.skillType
            }))
        }

        // 7. Handle Projects
        if (data.projects) {
            await syncList('projects', data.projects, (proj) => {
                let payload = {
                    id: proj.id,
                    project_name: proj.projectName,
                    client_or_organization: proj.clientOrOrganization,
                    role: proj.role,
                    description: proj.description,
                    tools_used: proj.toolsUsed,
                    outcomes: proj.outcomes,
                    project_url: proj.projectUrl,
                    start_date: proj.startDate || null,
                    end_date: proj.endDate || null
                }
                if (payload.start_date === '') payload.start_date = null
                if (payload.end_date === '') payload.end_date = null
                return payload
            })
        }

        // 8. Handle Certifications
        if (data.certifications) {
            await syncList('certifications', data.certifications, (cert) => ({
                id: cert.id,
                certification_name: cert.certificationName,
                issuing_organization: cert.issuingOrganization,
                issue_year: cert.issueYear,
                credential_id: cert.credentialId,
                credential_url: cert.credentialUrl
            }))
        }

        // 9. Handle Languages
        if (data.languages) {
            await syncList('languages', data.languages, (lang) => ({
                id: lang.id,
                language_name: lang.languageName,
                proficiency_level: lang.proficiencyLevel
            }))
        }

        // 10. Handle Publications
        if (data.publications) {
            await syncList('publications', data.publications, (pub) => ({
                id: pub.id,
                title: pub.title,
                platform_or_publisher: pub.platformOrPublisher,
                publication_year: pub.publicationYear,
                url: pub.url
            }))
        }

        // 11. Handle Volunteer Experience
        if (data.volunteerExperience) {
            await syncList('volunteer_experience', data.volunteerExperience, (vol) => {
                let payload = {
                    id: vol.id,
                    role_title: vol.roleTitle,
                    organization_name: vol.organizationName,
                    start_date: vol.startDate || null,
                    end_date: vol.endDate || null,
                    contributions: vol.contributions
                }
                if (payload.start_date === '') payload.start_date = null
                if (payload.end_date === '') payload.end_date = null
                return payload
            })
        }

        // 12. Handle Professional Affiliations
        if (data.professionalAffiliations) {
            await syncList('professional_affiliations', data.professionalAffiliations, (aff) => ({
                id: aff.id,
                organization_name: aff.organizationName,
                role_or_membership: aff.roleOrMembership,
                years_active: aff.yearsActive
            }))
        }

        // 13. Handle References
        if (data.references) {
            await syncList('document_references', data.references, (ref) => ({
                id: ref.id,
                reference_name: ref.referenceName,
                role: ref.role,
                organization: ref.organization,
                contact_details: ref.contactDetails,
                availability_statement: ref.availabilityStatement
            }))
        }

        // 14. Upsert Additional Info
        if (data.additionalInfo) {
            await supabase
                .from('additional_info')
                .upsert({
                    document_id: documentId,
                    security_clearance: data.additionalInfo.securityClearance,
                    work_authorization: data.additionalInfo.workAuthorization,
                    willing_to_relocate: data.additionalInfo.willingToRelocate,
                    availability: data.additionalInfo.availability,
                    other_info: data.additionalInfo.otherInfo
                }, { onConflict: 'document_id' })
        }

        // 15. Handle Custom Sections
        if (data.customSections) {
            await syncList('custom_sections', data.customSections, (sec) => ({
                id: sec.id,
                title: sec.title,
                content: sec.content,
                icon: sec.icon
            }))

            // Handle Custom Section Items
            for (const sec of data.customSections) {
                if (sec.items) {
                    const { data: currentItems } = await supabase
                        .from('custom_section_items')
                        .select('id')
                        .eq('custom_section_id', sec.id)

                    const currentIds = currentItems?.map(i => i.id) || []
                    const newIds = sec.items.map(i => i.id).filter(Boolean)

                    const idsToDelete = currentIds.filter(id => !newIds.includes(id))
                    if (idsToDelete.length > 0) {
                        await supabase.from('custom_section_items').delete().in('id', idsToDelete)
                    }

                    for (const item of sec.items) {
                        await supabase
                            .from('custom_section_items')
                            .upsert({
                                id: item.id,
                                custom_section_id: sec.id,
                                text: item.text,
                                display_order: item.displayOrder
                            })
                    }
                }
            }
        }

        // 16. Upsert Cover Letter
        if (data.coverLetter) {
            await supabase
                .from('cover_letters')
                .upsert({
                    document_id: documentId,
                    recipient_name: data.coverLetter.recipientName,
                    recipient_title: data.coverLetter.recipientTitle,
                    company_name: data.coverLetter.companyName,
                    company_address: data.coverLetter.companyAddress,
                    job_title: data.coverLetter.jobTitle,
                    job_description: data.coverLetter.jobDescription,
                    tone: data.coverLetter.tone,
                    content: data.coverLetter.content
                }, { onConflict: 'document_id' })
        }

        await logUserActivity('save_resume', { documentId: data.id, title: data.title })
        return { success: true }

    } catch (error: any) {
        logger.error('Save Resume Error:', { error: error.message, documentId: data.id })
        await logUserActivity('save_resume_failed', { documentId: data.id, error: error.message })
        return { success: false, error: error.message }
    }
}

export async function incrementExportCount(documentId: string, format: string): Promise<{ success: boolean, limitReached?: boolean, requiresPayment?: boolean, error?: string }> {
    try {
        const supabase = await getSupabase()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return { success: false, error: 'User not authenticated' }

        const tier = await getUserTier(user.id)
        let paymentMethod = 'subscription'

        // 1. Check if they have bonus credits to use (and aren't on an unlimited plan)
        if (tier.bonusAICredits > 0 && !tier.isPro) {
            // NOTE: In this app, download_credits are treated as one-time "bonus" credits
            // Let's deduct from profiles.download_credits
            const { error: updateErr } = await supabase
                .from('profiles')
                .update({ download_credits: tier.bonusAICredits - 1 })
                .eq('id', user.id)
                
            if (updateErr) {
                console.error('[incrementExportCount] Failed to update credits:', updateErr)
                return { success: false, error: 'Failed to update credits' }
            }
            paymentMethod = 'credit'
        } else {
            // 2. Check standard subscription usage limit
            const currentCount = tier.currentMonthExportCount
            const exportLimit = tier.maxExportsPerMonth

            // If they reached their limit (and it's not unlimited/Pro)
            if (exportLimit !== null && currentCount >= exportLimit && !tier.isPro) {
                await logUserActivity('export_resume_limit_reached', { documentId, format })
                return { success: false, limitReached: true, requiresPayment: true }
            }

            // 3. Increment standard usage
            const { error: upsertErr } = await supabase
                .from('user_usage')
                .upsert({
                    user_id: user.id,
                    month_year: tier.usagePeriodKey,
                    export_count: currentCount + 1,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id, month_year' })
                
            if (upsertErr) {
                console.error('[incrementExportCount] Failed to update user_usage:', upsertErr)
            }
        }

        // 4. Record in download history
        if (documentId) {
            const { error: historyErr } = await supabase.from('download_history').insert({
                user_id: user.id,
                document_id: documentId,
                format: format,
                payment_method: paymentMethod
            })
            if (historyErr) {
                console.error('[incrementExportCount] Failed to insert download_history:', historyErr)
            }
        }

        await logUserActivity('export_resume', { documentId, format, paymentMethod })
        return { success: true }
    } catch (err: any) {
        logger.error('[incrementExportCount] Unhandled Exception:', { error: err.message, documentId, format })
        await logUserActivity('export_resume_failed', { documentId, format, error: err.message })
        return { success: false, error: err.message || 'Unknown error' }
    }
}

export async function completeOnboarding(): Promise<{ success: boolean, error?: string }> {
    try {
        const supabase = await getSupabase()
        const { data } = await supabase.auth.getUser()
        const user = data?.user
        if (!user) return { success: false, error: 'User not authenticated' }

        const { error } = await supabase
            .from('profiles')
            .update({ has_completed_onboarding: true })
            .eq('id', user.id)

        if (error) throw error

        await logUserActivity('complete_onboarding')
        return { success: true }
    } catch (err: any) {
        logger.error('[completeOnboarding] Error:', { error: err.message })
        return { success: false, error: err.message || 'Unknown error' }
    }
}

