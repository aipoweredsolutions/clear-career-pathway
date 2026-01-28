import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
    try {
        // 1. Authenticate user
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2. Check Usage Limits
        // Get subscription and tier info
        const { data: sub } = await supabase
            .from('user_subscriptions')
            .select('*, tier:subscription_tiers(*)')
            .eq('user_id', user.id)
            .maybeSingle()

        const tier = sub?.tier as any
        const aiLimit = tier?.ai_improvements_per_month ?? 5 // Default to free limit if not found

        // Skip check if it's a critical 'parse_resume_from_text' for a new document? 
        // No, let's keep it consistent.

        // Use a dynamic import or the utility we just created
        // Since we are in an API route, we can just call it
        const monthYear = new Date().toISOString().substring(0, 7)
        const { data: usage } = await supabase
            .from('user_usage')
            .select('*')
            .eq('user_id', user.id)
            .eq('month_year', monthYear)
            .maybeSingle()

        const currentCount = usage?.ai_count || 0

        if (aiLimit !== null && currentCount >= aiLimit) {
            return NextResponse.json({
                error: 'Monthly AI limit reached',
                limit: aiLimit,
                count: currentCount,
                upgradeNeeded: true
            }, { status: 429 })
        }


        // 2. Parse request
        const { type, currentContent, userProfile } = await req.json()

        if (!type) {
            return NextResponse.json({ error: 'Missing generation type' }, { status: 400 })
        }

        let prompt = ''

        // 3. Construct prompt based on type
        if (type === 'summary') {
            const { jobTitle, skills, experience, tone = 'professional' } = userProfile

            prompt = `
        You are an expert career coach and resume writer.
        Write 3 distinct professional summaries for a resume based on the following profile:
        - Role: ${jobTitle}
        - Skills: ${skills.join(', ')}
        - Experience Highlights: ${JSON.stringify(experience)}
        
        Tone: ${tone}
        
        Requirements:
        - ${tone} tone
        - 2-3 sentences max per summary
        - Highlight unique value proposition
        - Use active voice
        
        Return the response as a JSON object with a key "suggestions" containing an array of 3 strings.
      `
        } else if (type === 'improve_experience') {
            prompt = `
        You are an expert resume writer. Improve the following work experience bullet point to be more impact-oriented and ATS-friendly:
        "${currentContent}"
        
        Return the response as a JSON object with a key "suggestion" containing the improved string.
       `
        } else if (type === 'suggest_skills') {
            const { jobTitle } = userProfile
            prompt = `
        You are an expert career coach. Suggest 10 highly relevant technical and soft skills for the role of "${jobTitle}".
        
        Requirements:
        - Mix of technical skills and soft skills
        - 1-3 words per skill
        - Return as a JSON object with a key "suggestions" containing an array of strings.
      `
        } else if (type === 'suggest_achievements') {
            const { jobTitle, companyName } = userProfile
            prompt = `
        You are an expert resume writer. Suggest 5 high-impact achievement bullet points for a "${jobTitle}" at "${companyName}".
        
        Requirements:
        - Use action verbs (Managed, Spearheaded, Increased, etc.)
        - Include placeholders for metrics where appropriate (e.g., "[X]%")
        - Mix of leadership, technical, and operational achievements
        - Return as a JSON object with a key "suggestions" containing an array of strings.
      `
        } else if (type === 'parse_resume_from_text') {
            prompt = `
            You are an expert Resume Parser. Your job is to extract structured data from the provided resume text.
            Resume Text:
            "${currentContent.substring(0, 15000)}"

            Return a valid JSON object with the following structure (match the keys exactly):
            {
                "personalInfo": {
                    "fullName": "",
                    "email": "",
                    "phone": "",
                    "city": "",
                    "country": "",
                    "linkedinUrl": "",
                    "websiteUrl": ""
                },
                "professionalSummary": {
                    "summaryText": ""
                },
                "workExperience": [
                    {
                        "jobTitle": "",
                        "companyName": "",
                        "startDate": "YYYY-MM-DD",
                        "endDate": "YYYY-MM-DD",
                        "isCurrent": boolean,
                        "location": "",
                        "roleDescription": "",
                        "achievements": [ { "achievementText": "" }, ... ]
                    }
                ],
                "education": [
                    {
                        "institutionName": "",
                        "degree": "",
                        "fieldOfStudy": "",
                        "startDate": "YYYY-MM-DD",
                        "endDate": "YYYY-MM-DD",
                        "location": ""
                    }
                ],
                "skills": [
                    { "skillName": "", "skillType": "technical" | "professional" | "tool" | "industry" }
                ],
                "certifications": [
                    { "certificationName": "", "issuingOrganization": "", "issueYear": 2023 }
                ],
                "languages": [
                    { "languageName": "", "proficiencyLevel": "basic" | "intermediate" | "fluent" | "native" }
                ],
                "volunteerExperience": [
                    { "roleTitle": "", "organizationName": "", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "contributions": "" }
                ],
                "publications": [
                    { "title": "", "platformOrPublisher": "", "publicationYear": 2023 }
                ],
                "professionalAffiliations": [
                    { "organizationName": "", "roleOrMembership": "" }
                ],
                "references": [
                    { "referenceName": "", "role": "", "organization": "", "contactDetails": "" }
                ],
                "additionalInfo": {
                    "securityClearance": "",
                    "workAuthorization": "",
                    "willingToRelocate": boolean,
                    "availability": ""
                },
                "projects": [
                     {
                        "projectName": "",
                        "role": "",
                        "description": "",
                        "toolsUsed": ["tool1", "tool2"],
                         "startDate": "YYYY-MM",
                         "endDate": "YYYY-MM"
                     }
                ],
                "customSections": [
                    {
                        "title": "",
                        "items": [ { "text": "" } ],
                        "content": ""
                    }
                ]
            }
            Do not invent data. If a field is missing, leave it blank or empty array.
            Format dates as YYYY-MM-DD where possible, or YYYY-MM.
            Ensure toolsUsed is an array of strings, not a single string.
            `
        }

        // 4. Call OpenAI
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-4o-mini',
            response_format: { type: 'json_object' },
        })

        const result = JSON.parse(completion.choices[0].message.content || '{}')

        // 5. Increment Usage
        await supabase
            .from('user_usage')
            .upsert({
                user_id: user.id,
                month_year: monthYear,
                ai_count: currentCount + 1,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id, month_year' })

        return NextResponse.json({ data: result })


    } catch (error: any) {
        console.error('AI Generation Error:', error)
        return NextResponse.json(
            { error: 'Failed to generate content' },
            { status: 500 }
        )
    }
}
