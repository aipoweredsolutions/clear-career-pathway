import { NextResponse } from 'next/server'
import htmlToDocx from 'html-to-docx'

export async function POST(req: Request) {
    try {
        const { html, filename } = await req.json()
        
        if (!html) {
            return NextResponse.json({ error: 'HTML content is required' }, { status: 400 })
        }

        const result = await htmlToDocx(html, null, {
            table: { row: { cantSplit: true } },
            footer: false,
            pageNumber: false
        })

        // html-to-docx returns a Buffer (Node.js) or Blob (browser). 
        // In a Next.js API route (Node.js runtime), it's always a Buffer.
        const buffer = result instanceof Buffer ? result : Buffer.from(await (result as Blob).arrayBuffer())

        return new NextResponse(buffer as unknown as BodyInit, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': `attachment; filename="${filename || 'resume.docx'}"`
            }
        })
    } catch (e: any) {
        console.error('Failed to generate DOCX:', e)
        return NextResponse.json({ error: e.message || 'Failed to generate DOCX' }, { status: 500 })
    }
}

