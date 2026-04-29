import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/server'
import { PricingCard } from '@/components/pricing/PricingCard'

export const metadata = {
    title: 'Pricing | ATS Resume Builder Plans',
    description: 'Compare plans for our AI-powered ATS resume builder. Choose from free standard templates or lifetime access to our entire professional career suite.',
    keywords: ['resume builder pricing', 'ATS resume builder cost', 'premium CV maker', 'free resume builder plans'],
    alternates: {
        canonical: '/pricing',
    },
    openGraph: {
        title: 'Pricing | ATS Resume Builder Plans',
        description: 'Compare plans for our AI-powered ATS resume builder. Choose from free standard templates or lifetime access to our entire professional career suite.',
        url: '/pricing',
    }
}

import { PRICING_TIERS } from '@/lib/config/pricing'
import { PricingClientContent } from '@/components/pricing/PricingClientContent'
import { Suspense } from 'react'

export default async function PricingPage() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    const isLoggedIn = !!user

    const tiers = PRICING_TIERS

    return (
        <div className="min-h-screen bg-neutral-50 pt-20">
            <Suspense fallback={null}>
                <PricingClientContent />
            </Suspense>


            {/* Header removed and replaced by global Navbar */}

            {/* Hero */}
            <section className="py-24 bg-gradient-to-b from-primary-50 via-white to-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-900 mb-6 tracking-tight">
                        Invest in Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Career Growth</span>
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                        Choose the perfect toolkit to land your next role faster. From free standard templates to lifetime access of our entire career suite.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-16 -mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {tiers.map((tier) => (
                            <PricingCard
                                key={tier.name}
                                tier={tier as any}
                                isLoggedIn={isLoggedIn}
                            />
                        ))}
                    </div>
                </div>
            </section>


            {/* FAQ Section */}
            <section className="py-24 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                                What does &quot;ATS-compliant&quot; mean?
                            </h3>
                            <p className="text-neutral-700 leading-relaxed">
                                ATS (Applicant Tracking System) compliant means your resume can be accurately read and parsed by
                                hiring software. Our templates use single-column layouts, standard fonts, and machine-readable
                                formatting to ensure 90%+ parsing accuracy.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                                Can I switch templates after creating my resume?
                            </h3>
                            <p className="text-neutral-700 leading-relaxed">
                                Yes! With Pro Monthly and Lifetime Pro plans, you can switch templates at any time without losing
                                your content. Your data is preserved and automatically formatted to the new template.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                                How does the AI improvement feature work?
                            </h3>
                            <p className="text-neutral-700 leading-relaxed">
                                Our AI analyzes your achievements and suggests improvements to make them more impactful and
                                metric-driven. It helps transform passive statements into active, results-oriented bullets.
                                You always have full control to accept, reject, or manually edit any suggestions.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                                What export formats are available?
                            </h3>
                            <p className="text-neutral-700 leading-relaxed">
                                Free tier includes a watermarked PDF. Pro Monthly and Lifetime Pro include clean PDF, DOCX, Markdown, and HTML formats—all text-based and ATS-compliant.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                                Can I cancel my subscription anytime?
                            </h3>
                            <p className="text-neutral-700 leading-relaxed">
                                Yes, you can cancel your Pro Monthly subscription at any time. You&apos;ll retain access until the end
                                of your current billing period. Lifetime Pro is a one-time purchase with no recurring charges.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden bg-primary-900">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Build Your Career Story?
                    </h2>
                    <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                        Start with our free plan. Upgrade anytime as your career needs grow.
                    </p>
                    <Link href="/auth/signup">
                        <Button variant="secondary" size="xl" className="bg-white text-primary-900 hover:bg-neutral-50 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                            Create Your Free Resume
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

