import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Free ATS Resume Scanner & Checker',
    description: 'Paste your resume text to instantly check its ATS parsability. Find out if your resume format is being rejected by applicant tracking systems and fix it instantly.',
    keywords: ['ATS resume scanner', 'resume checker', 'ATS test', 'resume parsability', 'ATS compatibility'],
}

export default function ATSScannerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
