import type { Metadata } from 'next'
import { Inter, Lora, Playfair_Display, Lato } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const lora = Lora({
    subsets: ['latin'],
    variable: '--font-lora',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
})

const lato = Lato({
    weight: ['300', '400', '700', '900'],
    subsets: ['latin'],
    variable: '--font-lato',
    display: 'swap',
})

export const metadata: Metadata = {
    title: {
        default: 'Clear Career Path | AI-Powered ATS Resume Builder',
        template: '%s | Clear Career Path'
    },
    description: 'Build an ATS-compliant resume in minutes. Our AI resume builder creates professional, recruiter-approved CVs guaranteed to pass Applicant Tracking Systems.',
    keywords: [
        // Commercial Intent
        'ATS resume builder', 'AI resume maker', 'professional CV builder', 'resume creator', 'career documents',
        // Transactional Intent
        'create resume online', 'free resume builder', 'download ATS resume', 'make a resume',
        // Informational/Feature Intent
        'ATS compliance checker', 'resume format 2026', 'AI resume optimizer', 'cover letter generator',
        // Navigational Intent
        'Clear Career Path', 'ClearCareerPath'
    ],
    authors: [{ name: 'Clear Career Path', url: 'https://www.clearcareerpath.com' }],
    creator: 'Clear Career Path',
    publisher: 'Clear Career Path',
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.clearcareerpath.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        title: 'Clear Career Path | AI-Powered ATS Resume Builder',
        description: 'Build an ATS-compliant resume in minutes. Our AI resume builder creates professional, recruiter-approved CVs guaranteed to pass Applicant Tracking Systems.',
        siteName: 'Clear Career Path',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Clear Career Path - ATS Resume Builder',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Clear Career Path | AI-Powered ATS Resume Builder',
        description: 'Build an ATS-compliant resume in minutes. Our AI resume builder creates professional, recruiter-approved CVs guaranteed to pass Applicant Tracking Systems.',
        creator: '@ClearCareerPath',
        images: ['https://www.clearcareerpath.com/api/og?title=Build%20a%20Resume%20That%20Recruiters%20Love&description=AI-Powered%20ATS-Series%20Templates%20for%20Modern%20Professionals'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

import { AuthProvider } from '@/components/auth/AuthProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'

const CookieConsent = dynamic(() => import('@/components/layout/CookieConsent').then(mod => mod.CookieConsent))
const Toaster = dynamic(() => import('sonner').then(mod => mod.Toaster))

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const headersList = await headers()
    const pathname = headersList.get('x-next-url') || headersList.get('x-invoke-path') || ''
    const isImmersive = pathname.startsWith('/view/')

    return (
        <html lang="en" className={cn(inter.variable, lora.variable, playfair.variable, lato.variable)}>
            <body className="min-h-screen bg-white">
                <AuthProvider>
                    {!isImmersive && <Navbar />}
                    <main className={isImmersive ? '' : 'min-h-[80vh]'}>
                        {children}
                    </main>
                    {!isImmersive && <Footer />}
                    <CookieConsent />
                    <Toaster position="top-center" richColors />
                </AuthProvider>
            </body>
        </html>
    )
}

