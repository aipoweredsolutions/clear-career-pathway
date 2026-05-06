import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Professional Resume Examples for 2026 | Clear Career Path',
    description: 'Explore 25+ ATS-compliant resume examples for Software Engineers, Nurses, Teachers, and more. Optimized for 100% parsing and modern aesthetics.',
    keywords: ['resume examples', 'resume samples 2026', 'ATS resume formats', 'CV examples'],
}

export default function ResumeExamplesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
