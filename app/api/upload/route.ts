import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { PDFParser } from '@/lib/parsers/pdf-parser'
import { DOCXParser } from '@/lib/parsers/docx-parser'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        // Note: Authentication removed here to allow guests to use the "Free ATS Scanner"
        // Security: We only extract text and return it, no data is stored in the database at this step.
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

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
            console.error('Upload Error: No file provided in request')
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        // 1. Basic validation
        if (file.size > 10 * 1024 * 1024) {
            console.warn(`Upload Warning: File too large (${file.size} bytes)`)
            return NextResponse.json({ error: 'File size too large. Max 10MB.' }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const contentType = file.type
        const fileName = file.name

        console.log(`Processing upload: ${fileName} (${contentType})`)

        let rawText = ''

        try {
            if (contentType === 'application/pdf') {
                const result = await PDFParser.parse(buffer)
                rawText = result.rawText
            } else if (contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                const result = await DOCXParser.parse(buffer)
                rawText = result.rawText
            } else {
                console.error(`Upload Error: Unsupported content type ${contentType}`)
                return NextResponse.json({ error: 'Unsupported file type. Please upload PDF or DOCX.' }, { status: 400 })
            }
        } catch (parserError: any) {
            console.error('Parser Specific Error:', parserError)
            return NextResponse.json({ 
                error: `Failed to parse ${contentType === 'application/pdf' ? 'PDF' : 'DOCX'}. The file may be password protected or corrupted.`,
                details: parserError.message
            }, { status: 422 })
        }

        if (!rawText || rawText.trim().length === 0) {
            console.warn('Upload Warning: No text extracted from document')
            return NextResponse.json({ 
                error: 'No text could be extracted from this document. It might be a scanned image or empty.' 
            }, { status: 422 })
        }

        // 2. Perform Heuristic Parsing (Non-AI)
        const { splitSections, extractContactInfo } = await import('@/lib/utils/resume-parser')
        const sections = splitSections(rawText)
        const contactInfo = extractContactInfo(rawText)

        return NextResponse.json({
            success: true,
            data: {
                rawText,
                fileName,
                fileType: contentType,
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
