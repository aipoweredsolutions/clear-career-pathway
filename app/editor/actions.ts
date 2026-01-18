'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ResumeDocument, PersonalInfo, ProfessionalSummary, WorkExperience, Education, Skill, Project } from '@/lib/types/resume'
import { fetchFullDocument } from '@/lib/supabase/documents'

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
            await syncList('references', data.references, (ref) => ({
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

        return { success: true }

    } catch (error: any) {
        console.error('Save Resume Error:', error)
        return { success: false, error: error.message }
    }
}
