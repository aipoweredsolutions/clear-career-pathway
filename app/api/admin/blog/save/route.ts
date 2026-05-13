import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content/blog')

export async function POST(req: NextRequest) {
    try {
        const { slug, title, excerpt, date, category, author, image, content } = await req.json()

        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
        }

        const filePath = path.join(contentDir, `${slug}.mdx`)
        
        const fileContent = matter.stringify(content, {
            title,
            excerpt,
            date,
            category,
            author,
            image
        })

        fs.writeFileSync(filePath, fileContent, 'utf8')

        return NextResponse.json({ success: true, message: 'Article saved successfully' })
    } catch (error: any) {
        console.error('Error saving blog post:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
