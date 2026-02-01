import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createClient } from '@/lib/supabase/server'

// Providers
type AIProvider = 'openai' | 'gemini'

export async function POST(req: NextRequest) {
    try {
        // 1. Authenticate user
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
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

        // 3. Check Usage Limits
        const { data: sub } = await supabase
            .from('user_subscriptions')
            .select('*, tier:subscription_tiers(*)')
            .eq('user_id', user.id)
            .maybeSingle()

        const tier = sub?.tier as any
        const aiLimit = tier?.ai_improvements_per_month ?? 5

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
            }, { status: 403 })
        }

        // 4. Parse Request
        const body = await req.json()
        const { type, content, currentContent, userProfile, jobDescription } = body
        const targetContent = content || currentContent // Handle different field names from frontend
        const resumeData = userProfile?.resumeContent || body.resumeContent || ''

        let prompt = ''
        let systemInstruction = 'You are an expert career coach. Return strictly valid JSON only. Do not include markdown code blocks or any other text.'

        // 5. Construct Prompts based on type
        if (type === 'summary') {
            const { jobTitle, skills, experience, tone = 'professional' } = userProfile || {}

            let toneInstruction = ''
            if (tone === 'creative') toneInstruction = 'Use engaging, slightly vibrant language. Focus on passion and innovation.'
            else if (tone === 'minimalist') toneInstruction = 'Be extremely concise. Use clear, powerful statements. No fluff.'
            else if (tone === 'executive') toneInstruction = 'Focus on high-level strategy, P&L responsibility, and leadership impact. Use authoritative language.'
            else if (tone === 'ats-optimized') toneInstruction = 'Maximize keyword density for the target role while maintaining readability. Focus on hard skills and standard industry terms.'
            else toneInstruction = 'Use standard high-level business language. Focus on reliability and quantifiable success.'

            prompt = `
            Write 3 distinct, high-impact professional summaries for a resume. 
            Target Role: ${jobTitle || 'Professional'}
            Key Skills: ${Array.isArray(skills) ? skills.join(', ') : 'Not specified'}
            Experience Highlights: ${JSON.stringify(experience || [])}
            
            Tone Requirements (${tone.toUpperCase()}):
            ${toneInstruction}

            Return a JSON object with a key "suggestions" containing an array of 3 distinct strings. 
            Each summary should be 2-3 sentences long and focus on business impact.
            `
        } else if (type === 'improve_experience') {
            prompt = `
            Improve the following work experience bullet point to be more impact-oriented and ATS-friendly:
            "${targetContent}"
            
            Return a JSON object with a key "suggestion" containing the improved string.
            `
        } else if (type === 'suggest_skills') {
            const { jobTitle } = userProfile || {}
            prompt = `
            Suggest 10 highly relevant technical and soft skills for the role of "${jobTitle || 'the candidate'}".
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
            Perform a Skills Gap Analysis.
            Job Description: "${targetContent?.substring(0, 5000)}"
            Candidate Resume: ${resumeData}

            Return a valid JSON object with this structure:
            {
                "matchScore": number (0-100),
                "strengths": ["string"],
                "gaps": ["string"],
                "keywords": { "found": ["string"], "missing": ["string"] },
                "recommendations": ["string"]
            }
            `
        } else if (type === 'interview_prep') {
            prompt = `
            Generate a personalized Interview Preparation Guide.
            Target Role/Job Description: "${targetContent?.substring(0, 5000)}"
            Candidate Resume: ${resumeData}
            
            Return a valid JSON object with this structure:
            {
                "roleContext": "string",
                "questions": [
                    {
                        "question": "string",
                        "reason": "string",
                        "suggestedApproach": "string",
                        "sampleAnswerSnippet": "string"
                    }
                ]
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
            Extract structured data from the following resume text. 
            Resume Text: "${targetContent?.substring(0, 20000)}"
            
            Return a valid JSON object with the following keys:
            personalInfo, professionalSummary, workExperience (array), education (array), skills (array), certifications (array), languages (array), projects (array), additionalInfo.
            Ensure dates are in YYYY-MM-DD or YYYY-MM format.
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
                console.error('Gemini JSON Parse Error. Raw Text:', text)
                throw new Error('AI returned invalid data format. Please try again.')
            }
        }

        // 7. Update Usage
        await supabase
            .from('user_usage')
            .upsert({
                user_id: user.id,
                month_year: monthYear,
                ai_count: currentCount + 1,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id, month_year' })

        return NextResponse.json({ data: resultData })

    } catch (error: any) {
        console.error('AI Generation error:', error)
        return NextResponse.json({
            error: error.message || 'Failed to generate content'
        }, { status: 500 })
    }
}
