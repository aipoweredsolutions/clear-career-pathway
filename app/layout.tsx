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
        default: 'Clear Career Path - Professional Resume & CV Builder',
        template: '%s | Clear Career Path'
    },
    description: 'Create ATS-compliant resumes, CVs, and cover letters with AI-powered content improvement. Start from scratch or upload and enhance your existing documents.',
    keywords: ['resume builder', 'CV maker', 'ATS resume', 'cover letter', 'career documents', 'job application'],
    authors: [{ name: 'Clear Career Path' }],
    creator: 'Clear Career Path',
    publisher: 'Clear Career Path',
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        title: 'Clear Career Path - Professional Resume & CV Builder',
        description: 'Create ATS-compliant resumes, CVs, and cover letters with AI-powered content improvement.',
        siteName: 'Clear Career Path',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Clear Career Path - Professional Resume & CV Builder',
        description: 'Create ATS-compliant resumes, CVs, and cover letters with AI-powered content improvement.',
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

const CookieConsent = dynamic(() => import('@/components/layout/CookieConsent').then(mod => mod.CookieConsent))
const Toaster = dynamic(() => import('sonner').then(mod => mod.Toaster))

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={cn(inter.variable, lora.variable, playfair.variable, lato.variable)}>
            <body className="min-h-screen bg-white">
                <AuthProvider>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "SoftwareApplication",
                                "name": "Clear Career Path",
                                "operatingSystem": "Web",
                                "applicationCategory": "BusinessApplication",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                },
                                "description": "AI-powered ATS-compliant resume builder and CV generator. Create professional resumes optimized for applicant tracking systems.",
                                "aggregateRating": {
                                    "@type": "AggregateRating",
                                    "ratingValue": "4.9",
                                    "ratingCount": "1250"
                                }
                            })
                        }}
                    />
                    <Navbar />
                    <main className="min-h-[80vh]">
                        {children}
                    </main>
                    <Footer />
                    <CookieConsent />
                    <Toaster position="top-center" richColors />
                </AuthProvider>
            </body>
        </html>
    )
}

