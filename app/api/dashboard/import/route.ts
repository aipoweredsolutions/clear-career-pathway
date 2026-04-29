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
                title: `Imported Resume - ${new Date().toLocaleDateString()}`,
                document_type: 'resume',
                template_id: 'classic',
            })
            .select()
            .single()

        if (docError) throw docError

        const docId = doc.id
        const promises = []

        // 2. Personal Info
        if (data.personalInfo) {
            promises.push(supabase.from('personal_info').insert({
                document_id: docId,
                full_name: data.personalInfo.fullName,
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
            promises.push(supabase.from('professional_summary').insert({
                document_id: docId,
                summary_text: data.professionalSummary.summaryText || data.professionalSummary.summary,
                headline: data.professionalSummary.headline
            }))
        }

        // 4. Skills (Need to handle if it's array of strings or array of objects)
        if (data.skills && Array.isArray(data.skills)) {
            const skillPayloads = data.skills.map((s: any, idx: number) => ({
                skill_name: typeof s === 'string' ? s : s.skillName,
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('skills').insert(skillPayloads))
        }

        // 5. Education
        if (data.education && Array.isArray(data.education)) {
            const eduPayloads = data.education.map((e: any, idx: number) => ({
                degree: e.degree,
                institution_name: e.institutionName,
                field_of_study: e.fieldOfStudy || e.major,
                location: e.location,
                start_year: e.startYear,
                end_year: e.endYear,
                gpa: e.gpa,
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('education').insert(eduPayloads))
        }

        // 6. Certifications
        if (data.certifications && Array.isArray(data.certifications)) {
            const certPayloads = data.certifications.map((c: any, idx: number) => ({
                certification_name: typeof c === 'string' ? c : c.certificationName,
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('certifications').insert(certPayloads))
        }

        // 7. Languages
        if (data.languages && Array.isArray(data.languages)) {
            const langPayloads = data.languages.map((l: any, idx: number) => ({
                language_name: typeof l === 'string' ? l : l.languageName,
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('languages').insert(langPayloads))
        }

        // 8. Projects
        if (data.projects && Array.isArray(data.projects)) {
            const projPayloads = data.projects.map((p: any, idx: number) => ({
                project_name: p.projectName,
                description: p.description,
                tools_used: p.toolsUsed,
                document_id: docId,
                display_order: idx
            }))
            promises.push(supabase.from('projects').insert(projPayloads))
        }

        await Promise.all(promises)

        // 6. Work Experience (Handle nested achievements if present)
        if (data.workExperience && Array.isArray(data.workExperience)) {
            for (const [idx, exp] of data.workExperience.entries()) {
                const { achievements, ...expRest } = exp
                const { data: newExp, error: expError } = await supabase
                    .from('work_experience')
                    .insert({
                        job_title: expRest.jobTitle,
                        company_name: expRest.companyName,
                        location: expRest.location,
                        start_date: expRest.startDate || expRest.start_date || null,
                        end_date: expRest.endDate || expRest.end_date || null,
                        is_current: expRest.isCurrent || expRest.is_current,
                        role_description: expRest.roleDescription || expRest.role_description,
                        document_id: docId,
                        display_order: idx
                    })
                    .select()
                    .single()

                if (!expError && achievements && Array.isArray(achievements)) {
                    const achPayloads = achievements.map((ach: any, aIdx: number) => ({
                        achievement_text: typeof ach === 'string' ? ach : (ach.achievementText || ach.achievement_text),
                        work_experience_id: newExp.id,
                        display_order: aIdx
                    }))
                    await supabase.from('work_achievements').insert(achPayloads)
                }
            }
        }

        return NextResponse.json({ success: true, id: docId })

    } catch (error: any) {
        console.error('Import error:', error)
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to import resume data'
        }, { status: 500 })
    }
}
