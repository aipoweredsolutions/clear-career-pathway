import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Career Studio | AI Interview Prep, Skills Analysis & Job Tracking',
    description: 'Elevate your career with our AI-powered Studio. Get instant skills gap analysis, LinkedIn profile optimization, and high-stakes interview practice tailored to your resume.',
    keywords: ['career hub', 'interview simulator', 'skills analysis', 'LinkedIn optimization', 'job tracker', 'career path planning'],
    alternates: {
        canonical: '/career-hub',
    },
    openGraph: {
        title: 'Career Studio | AI Interview Prep, Skills Analysis & Job Tracking',
        description: 'Elevate your career with our AI-powered Studio. Get instant skills gap analysis, LinkedIn profile optimization, and high-stakes interview practice.',
        url: '/career-hub',
    },
}

export default function CareerHubLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
