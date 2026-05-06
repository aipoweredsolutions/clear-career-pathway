'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ResumeDocument, PersonalInfo, ProfessionalSummary, WorkExperience, Education, Skill, Project, UserSubscription } from '@/lib/types/resume'
import { fetchFullDocument } from '@/lib/supabase/documents'
import { fetchUserSubscription } from '@/lib/supabase/subscriptions'

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

export async function fetchResume(documentId: string): Promise<ResumeDocument | null> {
    const supabase = await getSupabase()
    return fetchFullDocument(supabase, documentId)
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

        return { success: true }

    } catch (error: any) {
        console.error('Save Resume Error:', error)
        return { success: false, error: error.message }
    }
}

export async function incrementExportCount(documentId: string, format: string): Promise<{ success: boolean, limitReached?: boolean, requiresPayment?: boolean, error?: string }> {
    try {
        const supabase = await getSupabase()
        const { data } = await supabase.auth.getUser()
        const user = data?.user
        if (!user) return { success: false, error: 'User not authenticated' }

        const monthYear = new Date().toISOString().substring(0, 7)

        // 1. Get profile for credits (use maybeSingle to avoid throw on empty)
        const { data: profile, error: profileErr } = await supabase
            .from('profiles')
            .select('download_credits')
            .eq('id', user.id)
            .maybeSingle()

        if (profileErr) {
            console.error('[incrementExportCount] Profile Error:', profileErr)
        }

        const credits = profile?.download_credits || 0

        // 2. Get tier info
        const { data: sub, error: subErr } = await supabase
            .from('user_subscriptions')
            .select('*, tier:subscription_tiers(*)')
            .eq('user_id', user.id)
            .maybeSingle()

        if (subErr) {
            console.error('[incrementExportCount] Subscription Error:', subErr)
        }

        const tier = sub?.tier as any
        const tierName = tier?.name || 'free'
        const isPremium = tierName === 'premium' || tierName === 'pro' || tierName === 'power' || tierName === 'lifetime_pro' || tierName === 'pro_monthly'
        const exportLimit = tier?.max_exports_per_month ?? 1

        let paymentMethod = 'subscription'

        if (credits > 0 && !isPremium) { // Use credit if not on unlimited plan
            // Deduct credit
            const { error: updateErr } = await supabase
                .from('profiles')
                .update({ download_credits: credits - 1 })
                .eq('id', user.id)
                
            if (updateErr) {
                console.error('[incrementExportCount] Failed to update credits:', updateErr)
                return { success: false, error: 'Failed to update credits' }
            }

            paymentMethod = 'credit'
        } else {
            // Check regular subscription usage limit
            const { data: usage, error: usageErr } = await supabase
                .from('user_usage')
                .select('*')
                .eq('user_id', user.id)
                .eq('month_year', monthYear)
                .maybeSingle()

            if (usageErr) {
                console.error('[incrementExportCount] Usage Fetch Error:', usageErr)
            }

            const currentCount = usage?.export_count || 0

            // If they have no credits and reached their limit (and it's not unlimited)
            if (exportLimit !== null && currentCount >= exportLimit && !isPremium) {
                return { success: false, limitReached: true, requiresPayment: true }
            }

            // Increment standard usage
            const { error: upsertErr } = await supabase
                .from('user_usage')
                .upsert({
                    user_id: user.id,
                    month_year: monthYear,
                    export_count: currentCount + 1,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id, month_year' })
                
            if (upsertErr) {
                console.error('[incrementExportCount] Failed to update user_usage:', upsertErr)
                // We might fail here if RLS on user_usage blocks upsert, but we still want to allow the download if they had the right to it.
                // However, we should try to track it. If it fails, we log it, but we can still return success to not block the user arbitrarily if the DB fails.
                // Let's just log it and proceed.
            }
        }

        // 3. Record in download history
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

        return { success: true }
    } catch (err: any) {
        console.error('[incrementExportCount] Unhandled Exception:', err)
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

        return { success: true }
    } catch (err: any) {
        console.error('[completeOnboarding] Error:', err)
        return { success: false, error: err.message || 'Unknown error' }
    }
}

