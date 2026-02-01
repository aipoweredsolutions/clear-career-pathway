import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PDFParser } from '@/lib/parsers/pdf-parser'
import { DOCXParser } from '@/lib/parsers/docx-parser'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        // Validate file type
        const fileType = file.type
        const validTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]

        if (!validTypes.includes(fileType)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only PDF and DOCX are supported.' },
                { status: 400 }
            )
        }

        // Validate file size (e.g., 10MB limit)
        const MAX_SIZE = 10 * 1024 * 1024
        if (file.size > MAX_SIZE) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 10MB.' },
                { status: 400 }
            )
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        let rawText = ''

        // Parse content based on file type
        if (fileType === 'application/pdf') {
            const result = await PDFParser.parse(buffer)
            rawText = result.rawText
        } else {
            const result = await DOCXParser.parse(buffer)
            rawText = result.rawText
        }

        // 2. Perform Heuristic Parsing (Non-AI)
        const { splitSections, extractContactInfo } = await import('@/lib/utils/resume-parser')
        const sections = splitSections(rawText)
        const contactInfo = extractContactInfo(rawText)

        // For now, we'll return the parsed text/structure
        return NextResponse.json({
            success: true,
            data: {
                rawText,
                sections,
                contactInfo
            }
        })

    } catch (error: any) {
        console.error('Upload error:', error)
        console.error('Error stack:', error.stack)
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Failed to process file',
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        )
    }
}
