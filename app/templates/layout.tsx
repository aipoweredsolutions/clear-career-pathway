import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ATS Resume Templates Gallery | 25+ Professional Layouts',
    description: 'Browse our premium collection of 25+ ATS-compliant resume templates. Every design is engineered to bypass applicant tracking systems while impressing human recruiters.',
    keywords: ['ATS resume templates', 'professional resume layouts', 'CV templates 2026', 'ATS compliant designs', 'resume template gallery'],
    alternates: {
        canonical: '/templates',
    },
    openGraph: {
        title: 'ATS Resume Templates Gallery | 25+ Professional Layouts',
        description: 'Browse our premium collection of 25+ ATS-compliant resume templates. Every design is engineered to bypass applicant tracking systems while impressing human recruiters.',
        url: '/templates',
    },
}

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
