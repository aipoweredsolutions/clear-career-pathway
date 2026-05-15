import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json()

        if (!url || !url.includes('linkedin.com/in/')) {
            return NextResponse.json({ success: false, error: 'Invalid LinkedIn profile URL' }, { status: 400 })
        }

        // Attempt to fetch the public profile
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
            }
        })

        if (!response.ok) {
            return NextResponse.json({ 
                success: false, 
                error: 'Failed to access LinkedIn profile. It may be private or protected by an auth wall. Please try downloading your profile as a PDF instead.' 
            }, { status: 403 })
        }

        const html = await response.text()
        
        // Basic check to see if we hit an auth wall
        if (html.includes('authwall') || html.includes('sign in to view')) {
             return NextResponse.json({ 
                success: false, 
                error: 'LinkedIn blocked access to this profile. Please try downloading your profile as a PDF from LinkedIn and uploading that instead.' 
            }, { status: 403 })
        }

        // We can parse the text out of the HTML to pass to our AI
        // Since we don't have cheerio installed, we can just strip tags with regex, 
        // or just pass the raw HTML text (truncated) to the AI to parse.
        // Wait, package.json doesn't have cheerio. I'll just use a regex approach to extract text.
        
        const textContent = html
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()

        if (!textContent || textContent.length < 100) {
            return NextResponse.json({ 
                success: false, 
                error: 'Could not extract meaningful text from the profile.' 
            }, { status: 422 })
        }

        return NextResponse.json({ 
            success: true, 
            data: { 
                rawText: textContent.substring(0, 15000) // limit length for AI 
            } 
        })

    } catch (error: any) {
        console.error('LinkedIn import error:', error)
        return NextResponse.json({ success: false, error: 'An unexpected error occurred during import' }, { status: 500 })
    }
}
