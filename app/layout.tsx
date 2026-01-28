import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
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
import { Toaster } from 'sonner'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={cn(inter.variable, lora.variable)}>
            <body className="min-h-screen bg-white">
                <AuthProvider>
                    <Navbar />
                    <main className="min-h-[80vh]">
                        {children}
                    </main>
                    <Footer />
                    <Toaster position="top-center" richColors />
                </AuthProvider>
            </body>
        </html>
    )
}

