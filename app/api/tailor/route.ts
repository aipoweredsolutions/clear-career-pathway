import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

async function scrapeJobDescription(url: string): Promise<string> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            },
            next: { revalidate: 3600 }
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const html = await response.text();
        
        // Basic text extraction logic
        let text = html
            .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, '')
            .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, '')
            .replace(/<nav\b[^>]*>([\s\S]*?)<\/nav>/gim, '')
            .replace(/<footer\b[^>]*>([\s\S]*?)<\/footer>/gim, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        return text.substring(0, 6000); 
    } catch (error) {
        console.error('Tailor API Scraping Error:', error);
        return '';
    }
}

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { documentId, jobUrl, jobDescriptionText } = await req.json()

        if (!documentId) {
            return NextResponse.json({ error: 'Document ID is required' }, { status: 400 })
        }

        // 1. Get Job Description
        let finalJobDescription = jobDescriptionText || '';
        if (jobUrl && !finalJobDescription) {
            finalJobDescription = await scrapeJobDescription(jobUrl);
        }

        if (!finalJobDescription) {
            return NextResponse.json({ error: 'Job description or valid URL is required' }, { status: 400 })
        }

        // 2. Fetch the base resume document
        const { data: document, error: docError } = await supabase
            .from('documents')
            .select('*')
            .eq('id', documentId)
            .single()

        if (docError || !document) {
            return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
        }

        // 3. Call the internal generate API for tailoring
        // We call it via a direct request to the same server to reuse logic
        const origin = req.nextUrl.origin;
        const generateResponse = await fetch(`${origin}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': req.headers.get('cookie') || '', // Pass auth cookie
            },
            body: JSON.stringify({
                type: 'optimize_resume',
                jobDescription: finalJobDescription,
                resumeContent: JSON.stringify(document.content), // Use full document content
                userProfile: {
                    jobTitle: document.title
                }
            })
        });

        if (!generateResponse.ok) {
            const errorData = await generateResponse.json();
            return NextResponse.json({ error: 'AI tailoring failed', details: errorData }, { status: generateResponse.status })
        }

        const { data: tailoredData } = await generateResponse.json();

        // 4. Merge tailored data back into the original resume structure
        // The AI returns { professionalSummary: { summaryText }, workExperience: [{ id, achievements: [{ id, achievementText }] }] }
        const originalContent = { ...document.content };
        
        if (tailoredData.professionalSummary) {
            originalContent.professionalSummary = {
                ...originalContent.professionalSummary,
                summaryText: tailoredData.professionalSummary.summaryText
            };
        }

        if (tailoredData.workExperience && Array.isArray(originalContent.workExperience)) {
            originalContent.workExperience = originalContent.workExperience.map((exp: any) => {
                const tailoredExp = tailoredData.workExperience.find((te: any) => te.id === exp.id);
                if (tailoredExp && Array.isArray(exp.achievements)) {
                    return {
                        ...exp,
                        achievements: exp.achievements.map((ach: any) => {
                            const tailoredAch = tailoredExp.achievements?.find((ta: any) => ta.id === ach.id);
                            return tailoredAch ? { ...ach, achievementText: tailoredAch.achievementText } : ach;
                        })
                    };
                }
                return exp;
            });
        }

        return NextResponse.json({
            original: document.content,
            tailored: originalContent,
            jobContext: {
                url: jobUrl,
                description: finalJobDescription.substring(0, 500) + '...'
            }
        });

    } catch (error: any) {
        console.error('[TailorAPI] Unhandled error:', error);
        return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 })
    }
}
