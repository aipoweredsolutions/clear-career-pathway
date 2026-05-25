import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createClient } from '@/lib/supabase/server'
import { getUserTier } from '@/lib/auth/getUserTier'

// Providers
type AIProvider = 'openai' | 'gemini'

export async function POST(req: NextRequest) {
    try {
        // 1. Authenticate user
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        const body = await req.json()
        const { type, content, currentContent, userProfile, jobDescription } = body

        // 1b. Selective Authorization: Allow guests to use the parser, but protect other AI features
        if (!user && type !== 'parse_resume_from_text') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2. Determine Provider
        let provider: AIProvider | null = null
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 10) {
            provider = 'openai'
        } else if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 10) {
            provider = 'gemini'
        }

        if (!provider) {
            return NextResponse.json({
                error: 'AI Configuration Missing',
                message: 'No API key found. Please add OPENAI_API_KEY or GEMINI_API_KEY to your environment variables.'
            }, { status: 503 })
        }

        // 3. Check Usage Limits & Rate Limiting
        let tier: any = { isPro: false, effectiveAICredits: 10, currentMonthAICount: 0, usagePeriodKey: '' }
        if (user) {
            tier = await getUserTier(user.id)
            const aiLimit = tier.effectiveAICredits
            const currentCount = tier.currentMonthAICount

            if (currentCount >= aiLimit) {
                return NextResponse.json({
                    error: 'Monthly AI limit reached',
                    limit: aiLimit,
                    count: currentCount,
                    upgradeNeeded: true,
                    upgradeUrl: '/pricing'
                }, { status: 403 })
            }

            // 3b. Feature Gating
            const proOnlyTools = ['interview_prep', 'interview_feedback', 'salary_negotiation', 'linkedin_optimizer', 'career_roadmap']
            if (proOnlyTools.includes(type) && !tier.isPro) {
                return NextResponse.json({
                    error: 'pro_required',
                    message: 'This premium career tool requires a Pro subscription.',
                    upgradeUrl: '/pricing?feature=' + type
                }, { status: 403 })
            }
        }

        // 4. Parse Request (Moved to top)
        const targetContent = content || currentContent // Handle different field names from frontend
        const resumeData = userProfile?.resumeContent || body.resumeContent || ''

        let prompt = ''
        let systemInstruction = 'You are an expert career coach. Return strictly valid JSON only. Do not include markdown code blocks or any other text.'

        // 5. Construct Prompts based on type
        if (type === 'summary') {
            const { jobTitle, skills, experience, careerLevel, tone = 'professional' } = userProfile || {}

            let toneInstruction = ''
            if (tone === 'creative') toneInstruction = 'Use engaging, slightly vibrant language. Focus on passion and innovation.'
            else if (tone === 'minimalist') toneInstruction = 'Be extremely concise. Use clear, powerful statements. No fluff.'
            else if (tone === 'executive') toneInstruction = 'Focus on high-level strategy, P&L responsibility, and leadership impact. Use authoritative language.'
            else if (tone === 'ats-optimized') toneInstruction = 'Maximize keyword density for the target role while maintaining readability. Focus on hard skills and standard industry terms.'
            else toneInstruction = 'Use standard high-level business language. Focus on reliability and quantifiable success.'

            prompt = `
            Write 3 distinct, high-impact professional summaries for a resume. 
            Target Role: ${jobTitle || 'Professional'}
            Seniority Level: ${careerLevel || 'Not specified'}
            Key Skills: ${Array.isArray(skills) ? skills.join(', ') : 'Not specified'}
            Experience Highlights: ${JSON.stringify(experience || [])}
            
            Tone Requirements (${tone.toUpperCase()}):
            ${toneInstruction}

            Return a JSON object with a key "suggestions" containing an array of 3 distinct strings. 
            Each summary should be 2-3 sentences long and focus on business impact.
            `
        } else if (type === 'improve_experience') {
            const { careerLevel } = userProfile || {}
            prompt = `
            Improve the following work experience bullet point to be more impact-oriented and ATS-friendly.
            Seniority level of the candidate: ${careerLevel || 'Mid-level'}.
            Content: "${targetContent}"
            
            Return a JSON object with a key "suggestion" containing the improved string.
            `
        } else if (type === 'suggest_skills') {
            const { jobTitle, careerLevel } = userProfile || {}
            prompt = `
            Suggest 10 highly relevant technical and soft skills for a "${careerLevel || 'experience'}" role as a "${jobTitle || 'the candidate'}".
            Return a JSON object with a key "suggestions" containing an array of strings.
            `
        } else if (type === 'suggest_achievements') {
            const { jobTitle, companyName } = userProfile || {}
            prompt = `
            Suggest 5 high-impact achievement bullet points for a "${jobTitle || 'Professional'}" at "${companyName || 'their company'}".
            Use action verbs and specific metrics placeholders like [X]%.
            Return a JSON object with a key "suggestions" containing an array of 5 strings.
            `
        } else if (type === 'skills_gap_analysis') {
            prompt = `
            You are an expert ATS (Applicant Tracking System) specialist and career coach.
            Perform a detailed Skills Gap & Keyword Analysis for a job application.
            
            Job Description: "${targetContent?.substring(0, 6000)}"
            Candidate Resume: ${resumeData?.substring(0, 4000) || 'Not provided'}

            Your task:
            1. Extract ALL important keywords, skills, technologies, certifications, and competencies required in the job description.
            2. Identify which of those keywords appear in the candidate's resume.
            3. Identify which keywords are completely MISSING from the resume.
            4. Identify key skill GAPS (broader areas where the candidate is weak, not just individual keywords).
            5. Compute a realistic match score from 0 to 100 based on how well the resume aligns with the job description.
            6. List the candidate's existing STRENGTHS that directly apply to this job.
            7. Provide 4-6 specific, actionable recommendations to improve the resume for this role.

            Return a valid JSON object with EXACTLY this structure (no other keys):
            {
                "matchScore": <integer 0-100>,
                "strengths": [<string>, ...],
                "gaps": [<string>, ...],
                "keywords": {
                    "found": [<string>, ...],
                    "missing": [<string>, ...]
                },
                "recommendations": [<string>, ...]
            }
            `
        } else if (type === 'interview_prep') {
            const { category = 'general' } = body
            let categoryInstruction = ''
            if (category === 'behavioral') {
                categoryInstruction = 'Focus on "Tell me about a time..." questions. Use the STAR method (Situation, Task, Action, Result) for the suggested approach.'
            } else if (category === 'technical') {
                categoryInstruction = 'Focus on technical skills, architecture, problem-solving, and role-specific hard skills. Include snippets of logic or patterns in the answer snippets.'
            } else {
                categoryInstruction = 'Provide a mix of behavioral and situational questions relevant to the seniority level.'
            }

            prompt = `
            Generate a personalized Interview Preparation Guide.
            Category: ${category.toUpperCase()}
            Target Role/Job Description: "${targetContent?.substring(0, 5000)}"
            Candidate Resume: ${resumeData}
            
            Instructions:
            ${categoryInstruction}
            
            Return a valid JSON object with this structure:
            {
                "roleContext": "string (brief overview of the role expectations)",
                "questions": [
                    {
                        "question": "string",
                        "reason": "string (why the interviewer is asking this)",
                        "suggestedApproach": "string (how to structure the answer)",
                        "sampleAnswerSnippet": "string (a high-impact sentence or bullet point to include)"
                    }
                ]
            }
            `
        } else if (type === 'interview_feedback') {
            const { question, answer, roleContext } = body
            prompt = `
            You are a senior hiring manager and interview coach.
            Evaluate the following interview answer from a candidate.
            
            Role Context: "${roleContext}"
            Question: "${question}"
            Candidate's Answer: "${answer}"
            Candidate's Background/Resume: ${resumeData}
            
            Your task:
            1. Provide "strengths" (what they did well, especially STAR alignment).
            2. Provide "improvements" (what's missing, e.g., metrics, specific actions, or soft skills).
            3. Provide a "score" (0-100) based on relevance, impact, and clarity.
            4. Suggest an "improvedAnswer" (a version of THEIR answer that is more powerful).
            5. Provide a "starCheck" (Boolean for each: Situation, Task, Action, Result) indicating if they hit each point.
            
            Return a valid JSON object with EXACTLY this structure:
            {
                "strengths": [<string>],
                "improvements": [<string>],
                "score": <integer>,
                "improvedAnswer": "string",
                "starCheck": {
                    "situation": <boolean>,
                    "task": <boolean>,
                    "action": <boolean>,
                    "result": <boolean>
                }
            }
            `
        } else if (type === 'salary_negotiation') {
            const { jobTitle, companyName, offerDetails, location } = body
            prompt = `
            Generate a professional Salary Negotiation Script.
            Target Role: "${jobTitle || 'the role'}"
            Company: "${companyName || 'the company'}"
            Offer Details (if any): "${offerDetails || 'not provided'}"
            Location Context: "${location || 'not provided'}"
            Candidate Background: ${resumeData}

            Return a valid JSON object with this structure:
            {
                "marketResearch": "string (brief advice on market value)",
                "strategy": "string (key points to emphasize)",
                "scripts": [
                    {
                        "scenario": "string (e.g., Initial Offer Response, Counter-offer, Final Discussion)",
                        "scriptText": "string (the actual word-for-word talking points)"
                    }
                ],
                "tips": ["string"]
            }
            `
        } else if (type === 'linkedin_optimizer') {
            prompt = `
            You are an expert personal branding coach and LinkedIn specialist.
            Optimize a candidate's LinkedIn profile based on their resume.
            
            Candidate Resume: ${resumeData}
            
            Return a valid JSON object with EXACTLY this structure:
            {
                "headline": "string (A punchy, professional headline with relevant keywords and value proposition)",
                "about": "string (A 2-3 paragraph 'About' section that tells a story and highlights impact. Use a conversational but professional tone.)",
                "experiences": [
                    {
                        "title": "string",
                        "company": "string",
                        "description": "string (3-5 high-impact bullet points summarizing the key achievements for LinkedIn specifically, focusing on narrative impact.)"
                    }
                ],
                "skills": ["string (Top 10 skills to feature)"]
            }
            `
        } else if (type === 'career_roadmap') {
            prompt = `
            Generate a detailed 5-year Career Roadmap.
            Ultimate Goal: "${targetContent}"
            Current Background: ${resumeData}
            
            Return a valid JSON object with this structure:
            {
                "ultimateGoal": "string",
                "marketOutlook": "string",
                "milestones": [
                    {
                        "title": "string",
                        "timeframe": "string",
                        "description": "string",
                        "skillsToAcquire": ["string"],
                        "actionSteps": ["string"]
                    }
                ]
            }
            `
        } else if (type === 'parse_resume_from_text') {
            prompt = `
            Extract highly structured data from the following resume text. 
            Resume Text: "${targetContent?.substring(0, 20000)}"
            
            Strictly follow this JSON schema:
            {
                "personalInfo": {
                    "fullName": "string",
                    "professionalTitle": "string",
                    "email": "string",
                    "phone": "string",
                    "city": "string",
                    "country": "string",
                    "linkedinUrl": "string",
                    "websiteUrl": "string"
                },
                "professionalSummary": {
                    "summaryText": "string (concise 2-3 sentence overview)"
                },
                "workExperience": [
                    {
                        "jobTitle": "string",
                        "companyName": "string",
                        "location": "string",
                        "startDate": "YYYY-MM",
                        "endDate": "YYYY-MM or 'Present'",
                        "isCurrent": boolean,
                        "roleDescription": "string (summary of the role)",
                        "achievements": ["string (quantified bullet point)", "string"]
                    }
                ],
                "education": [
                    {
                        "institutionName": "string",
                        "degree": "string",
                        "fieldOfStudy": "string",
                        "location": "string",
                        "startYear": "string",
                        "endYear": "string",
                        "gpa": "string"
                    }
                ],
                "skills": ["string", "string"],
                "certifications": ["string"],
                "languages": ["string"],
                "projects": [
                    {
                        "projectName": "string",
                        "description": "string",
                        "toolsUsed": "string"
                    }
                ],
                "publications": [
                    {
                        "title": "string",
                        "platformOrPublisher": "string",
                        "publicationYear": "number",
                        "url": "string"
                    }
                ],
                "volunteerExperience": [
                    {
                        "roleTitle": "string",
                        "organizationName": "string",
                        "startDate": "string",
                        "endDate": "string",
                        "contributions": "string"
                    }
                ],
                "professionalAffiliations": [
                    {
                        "organizationName": "string",
                        "roleOrMembership": "string",
                        "yearsActive": "string"
                    }
                ],
                "references": [
                    {
                        "referenceName": "string",
                        "role": "string",
                        "organization": "string",
                        "contactDetails": "string"
                    }
                ],
                "additionalInfo": {
                    "securityClearance": "string",
                    "workAuthorization": "string",
                    "willingToRelocate": "boolean",
                    "availability": "string",
                    "otherInfo": "string"
                }
            }

            Rules:
            1. If a field is missing, use an empty string or empty array.
            2. Split work experience into multiple items if the candidate held different roles or worked at different companies.
            3. For work experience, pull out specific bullet points into the "achievements" array and put the general context in "roleDescription".
            4. Ensure dates are consistently formatted.
            `
        } else if (type === 'generate_cover_letter') {
            const { jobTitle, jobDescription, tone = 'formal' } = body

            let toneInstruction = ''
            if (tone === 'persuasive') toneInstruction = 'Use high-impact, results-driven language. Be assertive about value proposition and why the candidate is the perfect fit.'
            else if (tone === 'confident') toneInstruction = 'Be bold and direct. Focus on expertise and leadership. Use strong active verbs and avoid hedging.'
            else if (tone === 'formal') toneInstruction = 'Use traditional, high-level professional language. Be respectful and structured. Best for corporate or academic roles.'
            else toneInstruction = 'Standard professional tone. Balanced and polite.'

            prompt = `
            Write a high-impact, tailored cover letter for a job.
            Job Title: "${jobTitle || 'the role'}"
            Job Description: "${jobDescription || 'not provided'}"
            Candidate Background/Resume: ${resumeData}
            
            Tone Requirements (${tone.toUpperCase()}):
            ${toneInstruction}

            Instructions:
            1. Address the core requirements of the job description.
            2. Highlighting the most relevant achievements from the candidate's resume.
            3. Maximum 400 words.
            4. Do not include placeholders like [Date], [Company Name], [Recipient Name] inside the letter body text unless absolutely necessary for flow; focus on the core narrative.

            Return a JSON object with a key "content" containing the full cover letter text.
            `
        } else if (type === 'optimize_resume') {
            const { jobDescription } = body
            prompt = `
            You are an elite career strategist. Re-write the candidate's resume to perfectly target this specific job description.
            
            Job Description: "${jobDescription?.substring(0, 5000)}"
            Current Resume: ${resumeData}

            Your task:
            1. Re-write the "professionalSummary" to mirror the core requirements and tone of the JD.
            2. Re-write the "workExperience" achievements to emphasize skills and results that the JD explicitly asks for.
            3. Ensure every achievement uses high-impact action verbs and includes (or estimates) quantifiable metrics.
            4. Keep the overall structure and facts (dates, titles, companies) identical. Only improve the "achievementText" and "summaryText".

            Return a valid JSON object with ONLY these keys (if they exist in the original):
            {
                "professionalSummary": { "summaryText": "string" },
                "workExperience": [
                    {
                        "id": "original_id",
                        "achievements": [
                            { "id": "original_id", "achievementText": "string" }
                        ]
                    }
                ]
            }
            `
        } else if (type === 'quantify_achievement') {
            prompt = `
            Take this resume achievement and "quantify" it. 
            If no metrics are present, use your expert industry knowledge to suggest a REALISTIC and IMPACTFUL estimated metric (%, $, time, or scale).
            
            Current Achievement: "${targetContent}"
            Role Context: "${userProfile?.jobTitle || 'Professional'}"

            Return a JSON object: { "suggestion": "string" }
            `
        } else if (type === 'generate_star_bullets') {
            prompt = `
            Generate 3-5 high-impact bullet points for a "${userProfile?.jobTitle || 'role'}" using the STAR method (Situation, Task, Action, Result).
            Each bullet must include a metric.
            
            Context: "${targetContent || 'General experience'}"

            Return a JSON object: { "suggestions": ["string", ...] }
            `
        } else if (type === 'improve_summary' || type === 'fix_grammar' || type === 'generate_bullets' || type === 'optimize_for_job') {
            prompt = `Task: ${type}. Content: "${targetContent}". Context: "${jobDescription || 'None'}". Return result as JSON: { "result": "string" }`
        } else {
            return NextResponse.json({ error: 'Invalid generation type' }, { status: 400 })
        }

        let resultData: any = {}

        // 6. Call AI Provider
        if (provider === 'openai') {
            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: 'system', content: systemInstruction },
                    { role: 'user', content: prompt }
                ],
                model: 'gpt-4o-mini',
                response_format: { type: 'json_object' },
            })
            resultData = JSON.parse(completion.choices[0].message.content || '{}')
        } else if (provider === 'gemini') {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
            const model = genAI.getGenerativeModel({
                model: 'gemini-1.5-flash',
                generationConfig: { responseMimeType: "application/json" }
            })

            const result = await model.generateContent(`${systemInstruction}\n\n${prompt}`)
            const response = await result.response
            const text = response.text()

            try {
                // Remove potential markdown wrappers and trim
                const sanitized = text.replace(/```json\n?|```/g, '').trim()
                resultData = JSON.parse(sanitized)
            } catch (e) {
                console.error('[GenerateAPI] Gemini JSON Parse Error. Raw Text:', text)
                console.error('[GenerateAPI] Parse Exception:', e)
                return NextResponse.json({ 
                    error: 'AI returned malformed JSON. Our engineers have been notified.',
                    debug: process.env.NODE_ENV === 'development' ? text : undefined
                }, { status: 422 })
            }
        }

        // 7. Update Usage
        if (user) {
            try {
                const { error: usageError } = await supabase
                    .from('user_usage')
                    .upsert({
                        user_id: user.id,
                        month_year: tier.usagePeriodKey,
                        ai_count: (tier.currentMonthAICount || 0) + 1,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id, month_year' })
                
                if (usageError) {
                    console.error('[GenerateAPI] Usage Update Error:', usageError)
                    // We don't throw here to avoid failing the whole request if just usage tracking fails
                }
            } catch (usageEx) {
                console.error('[GenerateAPI] Usage Exception:', usageEx)
            }
        }

        return NextResponse.json({ data: resultData })

    } catch (error: any) {
        console.error('[GenerateAPI] Unhandled error:', error)
        return NextResponse.json({
            error: 'An internal server error occurred during AI generation.',
            message: error.message || 'Unknown error'
        }, { status: 500 })
    }
}
