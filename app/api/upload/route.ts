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
        let parsedData

        // Parse content based on file type
        if (fileType === 'application/pdf') {
            parsedData = await PDFParser.parse(buffer)
        } else {
            parsedData = await DOCXParser.parse(buffer)
        }

        // In a real implementation, we would now:
        // 1. Save the file to Supabase Storage (optional, if we want to keep the original)
        // 2. Or just return the parsed structured data for the editor to populate

        // For now, we'll return the parsed text/structure
        return NextResponse.json({
            success: true,
            data: parsedData
        })

    } catch (error: any) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Failed to process file' },
            { status: 500 }
        )
    }
}
