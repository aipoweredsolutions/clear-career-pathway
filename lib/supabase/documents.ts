import { SupabaseClient } from '@supabase/supabase-js'
import { ResumeDocument } from '@/lib/types/resume'

/**
 * Maps a database document row and its relations to the ResumeDocument type
 */
export function mapDocumentRow(doc: any, relations: any = {}): ResumeDocument {
    const {
        personal_info: pi,
        professional_summary: ps,
        work_experience: experience,
        education,
        skills,
        projects,
        certifications,
        languages
    } = relations

    return {
        id: doc.id,
        userId: doc.user_id,
        title: doc.title,
        documentType: doc.document_type,
        templateId: doc.template_id,
        careerLevel: doc.career_level,
        jobType: doc.job_type,
        industryFocus: doc.industry_focus,
        isPublished: doc.is_published,
        createdAt: doc.created_at,
        updatedAt: doc.updated_at,

        personalInfo: pi ? {
            id: pi.id,
            fullName: pi.full_name,
            professionalTitle: pi.professional_title,
            email: pi.email,
            phone: pi.phone,
            city: pi.city,
            country: pi.country,
            linkedinUrl: pi.linkedin_url,
            websiteUrl: pi.website_url,
            portfolioUrl: pi.portfolio_url
        } : undefined,

        professionalSummary: ps ? {
            id: ps.id,
            summaryText: ps.summary_text,
            headline: ps.headline,
            valueProposition: ps.value_proposition
        } : undefined,

        workExperience: experience?.map((exp: any) => ({
            id: exp.id,
            jobTitle: exp.job_title,
            companyName: exp.company_name,
            location: exp.location,
            isRemote: exp.is_remote,
            startDate: exp.start_date,
            endDate: exp.end_date,
            isCurrent: exp.is_current,
            roleDescription: exp.role_description,
            achievements: exp.work_achievements?.map((ach: any) => ({
                id: ach.id,
                achievementText: ach.achievement_text,
                metrics: ach.metrics
            })) || []
        })) || [],

        education: education?.map((edu: any) => ({
            id: edu.id,
            institutionName: edu.institution_name,
            degree: edu.degree,
            major: edu.field_of_study,
            location: edu.location,
            startYear: edu.start_year,
            endYear: edu.end_year,
            gpa: edu.gpa,
            achievements: edu.achievements,
            coursework: edu.coursework
        })) || [],

        skills: skills?.map((skill: any) => ({
            id: skill.id,
            skillName: skill.skill_name,
            skillType: skill.skill_type,
            proficiencyLevel: skill.proficiency_level
        })) || [],

        projects: projects?.map((proj: any) => ({
            id: proj.id,
            projectName: proj.project_name,
            clientOrOrganization: proj.client_or_organization,
            role: proj.role,
            description: proj.description,
            toolsUsed: proj.tools_used,
            outcomes: proj.outcomes,
            projectUrl: proj.project_url,
            startDate: proj.start_date,
            endDate: proj.end_date
        })) || [],

        certifications: certifications?.map((cert: any) => ({
            id: cert.id,
            certificationName: cert.certification_name,
            issuingOrganization: cert.issuing_organization,
            issueYear: cert.issue_year,
            credentialId: cert.credential_id,
            credentialUrl: cert.credential_url
        })) || [],

        languages: languages?.map((lang: any) => ({
            id: lang.id,
            languageName: lang.language_name,
            proficiencyLevel: lang.proficiency_level
        })) || []
    }
}

/**
 * Fetches all documents for a user
 */
export async function fetchUserDocuments(supabase: SupabaseClient, userId: string): Promise<ResumeDocument[]> {
    const { data: docs, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

    if (error) {
        console.error('Error fetching documents:', error)
        return []
    }

    return docs.map(doc => mapDocumentRow(doc))
}

/**
 * Fetches a single document with all its relations
 */
export async function fetchFullDocument(supabase: SupabaseClient, documentId: string): Promise<ResumeDocument | null> {
    const { data: doc, error: docError } = await supabase
        .from('documents')
        .select('*')
        .eq('id', documentId)
        .single()

    if (docError || !doc) return null

    const [
        { data: personalInfo },
        { data: summary },
        { data: experience },
        { data: education },
        { data: skills },
        { data: projects },
        { data: certifications },
        { data: languages }
    ] = await Promise.all([
        supabase.from('personal_info').select('*').eq('document_id', documentId).maybeSingle(),
        supabase.from('professional_summary').select('*').eq('document_id', documentId).maybeSingle(),
        supabase.from('work_experience').select('*, work_achievements(*)').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('education').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('skills').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('projects').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('certifications').select('*').eq('document_id', documentId).order('display_order', { ascending: true }),
        supabase.from('languages').select('*').eq('document_id', documentId).order('display_order', { ascending: true })
    ])

    return mapDocumentRow(doc, {
        personal_info: personalInfo,
        professional_summary: summary,
        work_experience: experience,
        education,
        skills,
        projects,
        certifications,
        languages
    })
}
