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

        // 2. Parse request
        const { type, currentContent, userProfile } = await req.json()

        if (!type) {
            return NextResponse.json({ error: 'Missing generation type' }, { status: 400 })
        }

        let prompt = ''

        // 3. Construct prompt based on type
        if (type === 'summary') {
            const { jobTitle, skills, experience } = userProfile

            prompt = `
        You are an expert career coach and resume writer.
        Write 3 distinct professional summaries for a resume based on the following profile:
        - Role: ${jobTitle}
        - Skills: ${skills.join(', ')}
        - Experience Highlights: ${JSON.stringify(experience)}
        
        Requirements:
        - Professional tone
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
        }

        // 4. Call OpenAI
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-4o-mini',
            response_format: { type: 'json_object' },
        })

        const result = JSON.parse(completion.choices[0].message.content || '{}')

        return NextResponse.json({ data: result })

    } catch (error: any) {
        console.error('AI Generation Error:', error)
        return NextResponse.json(
            { error: 'Failed to generate content' },
            { status: 500 }
        )
    }
}
