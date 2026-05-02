import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Professional Resume Samples | Industry-Specific CV Examples',
    description: 'Browse our curated collection of interview-winning resume samples across Technology, Healthcare, Marketing, Sales, Education, and more. Triple-verified for ATS compliance.',
    keywords: ['resume samples', 'CV examples', 'professional resume examples', 'industry resume samples', 'ATS verified resumes'],
    alternates: {
        canonical: '/samples',
    },
    openGraph: {
        title: 'Professional Resume Samples | Industry-Specific CV Examples',
        description: 'Browse our curated collection of interview-winning resume samples. Triple-verified for ATS compliance and recruiter impact.',
        url: '/samples',
    },
}

export default function SamplesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
