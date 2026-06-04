import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(req: Request) {
    try {
        const { text } = await req.json()

        if (!text || typeof text !== 'string') {
            return NextResponse.json({ error: 'Valid text is required' }, { status: 400 })
        }

        if (!process.env.OPENAI_API_KEY) {
            console.warn("OpenAI API key missing. Returning mock data or error.")
            return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
        }

        const systemPrompt = `You are an expert ATS resume parser. Your job is to extract unstructured text into a strict JSON schema. 
Do not hallucinate or make up any information. If a field is missing in the text, leave it blank or omit it.

Return the data EXACTLY in this JSON format:
{
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedinUrl": "string"
  },
  "professionalSummary": {
    "summaryText": "string"
  },
  "workExperience": [
    {
      "jobTitle": "string",
      "companyName": "string",
      "location": "string",
      "startDate": "YYYY-MM (or similar string)",
      "endDate": "YYYY-MM (or 'Present' if current)",
      "achievements": [
        { "achievementText": "string" }
      ]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institutionName": "string",
      "location": "string",
      "startYear": "number (optional)",
      "endYear": "number (optional)"
    }
  ],
  "skills": [
    { "skillName": "string" }
  ]
}
`

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Parse the following resume text:\n\n${text}` }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.1, // Low temperature for high deterministic extraction
        })

        const content = response.choices[0]?.message?.content
        if (!content) {
            throw new Error('Failed to generate response from OpenAI')
        }

        const parsedData = JSON.parse(content)
        
        return NextResponse.json({ data: parsedData })
    } catch (error: any) {
        console.error('Error parsing resume:', error)
        return NextResponse.json({ error: error.message || 'Failed to parse resume' }, { status: 500 })
    }
}
