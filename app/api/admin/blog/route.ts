import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createClient } from '@/lib/supabase/server'
import { getUserTier } from '@/lib/auth/getUserTier'

const contentDir = path.join(process.cwd(), 'content/blog')

// Helper: Ensure the directory exists
function ensureDirectory() {
    if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true })
    }
}

// GET: Load all posts
export async function GET() {
    try {
        ensureDirectory()
        const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'))
        
        const posts = files.map((file) => {
            const slug = file.replace(/\.mdx$/, '')
            const fullPath = path.join(contentDir, file)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data, content } = matter(fileContents)

            return {
                slug,
                title: data.title || '',
                excerpt: data.excerpt || '',
                date: data.date || '',
                category: data.category || '',
                author: data.author || '',
                image: data.image || '',
                content,
            }
        })

        return NextResponse.json(posts.sort((a, b) => (a.date > b.date ? -1 : 1)))
    } catch (error: any) {
        console.error('[BlogAdmin GET] Error:', error)
        return NextResponse.json({ error: 'Failed to retrieve posts.' }, { status: 500 })
    }
}

// POST: Save or Update a post
export async function POST(req: Request) {
    try {
        // Simple security layer: block if unauthorized
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        // Dynamic bypass in dev or mock sessions
        const isMock = req.headers.get('cookie')?.includes('mock_session=true')
        const isDev = process.env.NODE_ENV === 'development'

        if (!user && !isMock && !isDev) {
            return NextResponse.json({ error: 'Unauthorized. Admin access only.' }, { status: 401 })
        }

        const body = await req.json()
        const { slug, title, excerpt, date, category, author, image, content } = body

        if (!slug || !title || !content) {
            return NextResponse.json({ error: 'Slug, title, and content are required.' }, { status: 400 })
        }

        ensureDirectory()

        // Clean slug formatting
        const cleanSlug = slug
            .toLowerCase()
            .replace(/[^a-z0-9\-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')

        const fullPath = path.join(contentDir, `${cleanSlug}.mdx`)

        // Format front-matter YAML structure
        const fileContent = `---
title: '${title.replace(/'/g, "''")}'
excerpt: '${excerpt.replace(/'/g, "''")}'
date: '${date || new Date().toISOString().substring(0, 10)}'
category: '${category || 'General'}'
author: '${author || 'Clarity Team'}'
image: '${image || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200'}'
---

${content}
`

        fs.writeFileSync(fullPath, fileContent, 'utf8')

        return NextResponse.json({ success: true, slug: cleanSlug })
    } catch (error: any) {
        console.error('[BlogAdmin POST] Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to save post.' }, { status: 500 })
    }
}

// DELETE: Delete a post
export async function DELETE(req: Request) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        const isMock = req.headers.get('cookie')?.includes('mock_session=true')
        const isDev = process.env.NODE_ENV === 'development'

        if (!user && !isMock && !isDev) {
            return NextResponse.json({ error: 'Unauthorized. Admin access only.' }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const slug = searchParams.get('slug')

        if (!slug) {
            return NextResponse.json({ error: 'Slug is required to delete a post.' }, { status: 400 })
        }

        ensureDirectory()
        const fullPath = path.join(contentDir, `${slug}.mdx`)

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath)
            return NextResponse.json({ success: true })
        } else {
            return NextResponse.json({ error: 'Post file not found.' }, { status: 404 })
        }
    } catch (error: any) {
        console.error('[BlogAdmin DELETE] Error:', error)
        return NextResponse.json({ error: 'Failed to delete post.' }, { status: 500 })
    }
}
