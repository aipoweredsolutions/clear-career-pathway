import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Pricing & Plans | Clear Career Path',
    description: 'Choose the perfect plan for your career growth. From free ATS-compliant resumes to full AI career coaching and unlimited premium downloads.',
    keywords: ['resume builder pricing', 'career coaching plans', 'premium resume templates', 'ATS scanner cost'],
    alternates: {
        canonical: '/pricing',
    },
    openGraph: {
        title: 'Pricing & Plans | Clear Career Path',
        description: 'Choose the perfect plan for your career growth. From free ATS-compliant resumes to full AI career coaching and unlimited premium downloads.',
        url: '/pricing',
    },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
