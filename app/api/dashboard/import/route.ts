import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ResumeDocument } from '@/lib/types/resume'

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await req.json()

        // 1. Create the main document
        const { data: doc, error: docError } = await supabase
            .from('documents')
            .insert({
                user_id: user.id,
                title: data.title || `Imported Resume - ${new Date().toLocaleDateString()}`,
                document_type: 'resume',
                template_id: data.templateId || 'ats-professional',
            })
            .select()
            .single()

        if (docError) throw docError

        const docId = doc.id
        const promises = []

        // 2. Personal Info
        if (data.personalInfo) {
            promises.push(supabase.from('personal_info').upsert({
                document_id: docId,
                full_name: data.personalInfo.fullName || 'Professional User',
                professional_title: data.personalInfo.professionalTitle,
                email: data.personalInfo.email,
                phone: data.personalInfo.phone,
                city: data.personalInfo.city,
                country: data.personalInfo.country,
                linkedin_url: data.personalInfo.linkedinUrl,
                github_url: data.personalInfo.githubUrl,
                website_url: data.personalInfo.websiteUrl,
                portfolio_url: data.personalInfo.portfolioUrl
            }))
        }

        // 3. Professional Summary
        if (data.professionalSummary) {
            promises.push(supabase.from('professional_summary').upsert({
                document_id: docId,
                summary_text: data.professionalSummary.summaryText || data.professionalSummary.summary || '',
                headline: data.professionalSummary.headline
            }))
        }

        // 4. Skills
        if (data.skills && Array.isArray(data.skills) && data.skills.length > 0) {
            const skillPayloads = data.skills.map((s: any, idx: number) => ({
                skill_name: typeof s === 'string' ? s : s.skillName,
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('skills').insert(skillPayloads))
        }

        // 5. Education
        if (data.education && Array.isArray(data.education) && data.education.length > 0) {
            const eduPayloads = data.education.map((e: any, idx: number) => ({
                degree: e.degree || 'Degree',
                institution_name: e.institutionName || 'Institution',
                field_of_study: e.fieldOfStudy || e.major,
                location: e.location,
                start_year: parseInt(e.startYear) || null,
                end_year: parseInt(e.endYear) || null,
                gpa: e.gpa,
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('education').insert(eduPayloads))
        }

        // 6. Certifications
        if (data.certifications && Array.isArray(data.certifications) && data.certifications.length > 0) {
            const certPayloads = data.certifications.map((c: any, idx: number) => ({
                certification_name: typeof c === 'string' ? c : c.certificationName,
                issuing_organization: typeof c === 'object' ? c.issuingOrganization : 'Certified',
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('certifications').insert(certPayloads))
        }

        // 7. Languages
        if (data.languages && Array.isArray(data.languages) && data.languages.length > 0) {
            const langPayloads = data.languages.map((l: any, idx: number) => ({
                language_name: typeof l === 'string' ? l : l.languageName,
                proficiency_level: typeof l === 'object' ? (l.proficiencyLevel || 'Professional') : 'Professional',
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('languages').insert(langPayloads))
        }

        // 8. Projects
        if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
            const projPayloads = data.projects.map((p: any, idx: number) => ({
                project_name: p.projectName || 'Project',
                description: p.description,
                tools_used: Array.isArray(p.toolsUsed) ? p.toolsUsed : (p.toolsUsed ? [p.toolsUsed] : []),
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('projects').insert(projPayloads))
        }

        // 9. Publications
        if (data.publications && Array.isArray(data.publications) && data.publications.length > 0) {
            const pubPayloads = data.publications.map((p: any, idx: number) => ({
                title: p.title || 'Publication',
                platform_or_publisher: p.platformOrPublisher,
                publication_year: parseInt(p.publicationYear) || null,
                url: p.url,
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('publications').insert(pubPayloads))
        }

        // 10. Volunteer Experience
        if (data.volunteerExperience && Array.isArray(data.volunteerExperience) && data.volunteerExperience.length > 0) {
            const volPayloads = data.volunteerExperience.map((v: any, idx: number) => ({
                role_title: v.roleTitle || 'Volunteer',
                organization_name: v.organizationName || 'Organization',
                start_date: v.startDate || null,
                end_date: v.endDate || null,
                contributions: v.contributions,
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('volunteer_experience').insert(volPayloads))
        }

        // 11. Professional Affiliations
        if (data.professionalAffiliations && Array.isArray(data.professionalAffiliations) && data.professionalAffiliations.length > 0) {
            const affPayloads = data.professionalAffiliations.map((a: any, idx: number) => ({
                organization_name: a.organizationName || 'Organization',
                role_or_membership: a.roleOrMembership,
                years_active: a.yearsActive,
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('professional_affiliations').insert(affPayloads))
        }

        // 12. References
        if (data.references && Array.isArray(data.references) && data.references.length > 0) {
            const refPayloads = data.references.map((r: any, idx: number) => ({
                reference_name: r.referenceName || r.name || 'Professional Reference',
                role: r.role || r.title,
                organization: r.organization || r.company,
                contact_details: r.contactDetails || r.contactInfo,
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('document_references').insert(refPayloads))
        }

        // 13. Additional Info
        if (data.additionalInfo) {
            promises.push(supabase.from('additional_info').upsert({
                document_id: docId,
                security_clearance: data.additionalInfo.securityClearance,
                work_authorization: data.additionalInfo.workAuthorization,
                willing_to_relocate: typeof data.additionalInfo.willingToRelocate === 'boolean' ? data.additionalInfo.willingToRelocate : null,
                availability: data.additionalInfo.availability,
                other_info: data.additionalInfo.otherInfo
            }))
        }

        await Promise.all(promises)

        // 6. Work Experience (Serial processing to handle nested achievements)
        if (data.workExperience && Array.isArray(data.workExperience)) {
            for (const [idx, exp] of data.workExperience.entries()) {
                const { achievements, ...expRest } = exp
                
                // Sanitize dates for DB
                const startDate = expRest.startDate || expRest.start_date || new Date().toISOString().split('T')[0]
                const endDate = expRest.isCurrent || expRest.is_current ? null : (expRest.endDate || expRest.end_date || null)

                const { data: newExp, error: expError } = await supabase
                    .from('work_experience')
                    .insert({
                        job_title: expRest.jobTitle || 'Professional Role',
                        company_name: expRest.companyName || 'Company',
                        location: expRest.location,
                        start_date: startDate,
                        end_date: endDate,
                        is_current: expRest.isCurrent || expRest.is_current || false,
                        role_description: expRest.roleDescription || expRest.role_description,
                        document_id: docId,
                        display_order: idx
                    })
                    .select()
                    .single()

                if (!expError && newExp && achievements && Array.isArray(achievements) && achievements.length > 0) {
                    const achPayloads = achievements.map((ach: any, aIdx: number) => ({
                        achievement_text: typeof ach === 'string' ? ach : (ach.achievementText || ach.achievement_text || 'Key achievement'),
                        work_experience_id: newExp.id,
                        display_order: aIdx
                    }))
                    await supabase.from('work_achievements').insert(achPayloads)
                }
            }
        }

        return NextResponse.json({ success: true, id: docId })

    } catch (error: any) {
        console.error('Import error detail:', error)
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to import resume data. Please try manual entry.',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        }, { status: 500 })
    }
}
