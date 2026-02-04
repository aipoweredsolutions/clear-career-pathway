'use client'

import React, { Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { ResumeDocument } from '@/lib/types/resume'

// Robust mock data for preview generation
const previewData: ResumeDocument = {
    id: 'preview',
    title: 'Preview Resume',
    documentType: 'resume',
    templateId: 'classic',
    personalInfo: {
        fullName: 'Alex Morgan',
        professionalTitle: 'Product Designer',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 012-3456',
        city: 'Seattle',
        country: 'WA',
        linkedinUrl: 'linkedin.com/in/alexmorgan',
        websiteUrl: 'alexmorgan.design'
    },
    professionalSummary: {
        summaryText: 'Creative and detail-oriented User Experience Designer with 5+ years of experience building intuitive digital products. Proven track record of improving user engagement and conversion rates through data-driven design decisions. Expert in Figma, Prototyping, and Design Systems.'
    },
    skills: [
        { skillName: 'UI/UX Design', skillType: 'technical' },
        { skillName: 'Figma & Sketch', skillType: 'technical' },
        { skillName: 'User Research', skillType: 'technical' },
        { skillName: 'HTML/CSS', skillType: 'technical' },
        { skillName: 'Design Systems', skillType: 'technical' },
        { skillName: 'Agile/Scrum', skillType: 'professional' }
    ],
    workExperience: [
        {
            jobTitle: 'Senior UX Designer',
            companyName: 'Creative Solutions Inc.',
            location: 'Seattle, WA',
            startDate: '2021-03-01',
            isCurrent: true,
            roleDescription: 'Leading the design of the core SaaS platform.',
            achievements: [
                { achievementText: 'Redesigned the main dashboard, increasing user retention by 25%.' },
                { achievementText: 'Established a comprehensive design system used solely by 4 engineering teams.' },
                { achievementText: 'Mentored 3 junior designers and conducted weekly design critiques.' }
            ]
        },
        {
            jobTitle: 'UX Designer',
            companyName: 'TechFlow Startups',
            location: 'San Francisco, CA',
            startDate: '2018-06-01',
            endDate: '2021-02-01',
            achievements: [
                { achievementText: 'Collaborated with PMs to ship 5 major features in the first year.' },
                { achievementText: 'Conducted user usability testing sessions to validate prototypes.' }
            ]
        }
    ],
    education: [
        {
            institutionName: 'University of Washington',
            degree: 'Bachelor of Design',
            major: 'Visual Communication',
            location: 'Seattle, WA',
            startYear: 2014,
            endYear: 2018,
            gpa: '3.8'
        }
    ]
}

function StudioContent() {
    const params = useParams()
    const searchParams = useSearchParams()

    // Allow overriding template ID via path or query
    const templateId = (params.templateId as string) || 'classic'
    // Allow overriding colors via query param (e.g. ?color=blue)
    const colorId = searchParams.get('color')

    // Construct the composite template ID if a color is present
    // The TemplateRenderer expects "base" or "base-color"
    const effectiveTemplateId = colorId ? `${templateId}-${colorId}` : templateId

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
            <div id="preview-container" className="shadow-2xl">
                <TemplateRenderer
                    templateId={effectiveTemplateId}
                    data={{ ...previewData, templateId: effectiveTemplateId }}
                // Force a consistent scale/width if needed, or let it be natural
                // standard A4 width approx 800-900px for web display
                />
            </div>
        </div>
    )
}

export default function StudioPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading Preview...</div>}>
            <StudioContent />
        </Suspense>
    )
}
