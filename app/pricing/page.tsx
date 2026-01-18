import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/server'
import { PricingCard } from '@/components/pricing/PricingCard'

export const metadata = {
    title: 'Pricing',
    description: 'Choose the perfect plan for your career documentation needs. Transparent pricing with no hidden fees.',
}

import { PRICING_TIERS } from '@/lib/config/pricing'

export default async function PricingPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const isLoggedIn = !!user

    const tiers = PRICING_TIERS

    return (
        <div className="min-h-screen bg-neutral-50 pt-20">
            {/* Header removed and replaced by global Navbar */}

            {/* Hero */}
            <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold text-neutral-900 mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-neutral-700">
                        Choose the plan that fits your needs. No hidden fees, no surprises.
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
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                What does "ATS-compliant" mean?
                            </h3>
                            <p className="text-neutral-700">
                                ATS (Applicant Tracking System) compliant means your resume can be accurately read and parsed by
                                hiring software. Our templates use single-column layouts, standard fonts, and machine-readable
                                formatting to ensure 90%+ parsing accuracy.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                Can I switch templates after creating my resume?
                            </h3>
                            <p className="text-neutral-700">
                                Yes! With Starter Pass and Premium plans, you can switch templates at any time without losing
                                your content. Your data is preserved and automatically formatted to the new template.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                How does the AI improvement feature work?
                            </h3>
                            <p className="text-neutral-700">
                                Our AI analyzes your achievements and suggests improvements to make them more impactful and
                                metric-driven. It helps transform passive statements into active, results-oriented bullets.
                                You always have full control to accept, reject, or manually edit any suggestions.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                What export formats are available?
                            </h3>
                            <p className="text-neutral-700">
                                Free tier includes watermarked PDF. Starter Pass includes clean PDF and DOCX. Premium includes
                                PDF, DOCX, Markdown, and HTML formats—all text-based and ATS-compliant.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                Can I cancel my subscription anytime?
                            </h3>
                            <p className="text-neutral-700">
                                Yes, you can cancel your Premium subscription at any time. You'll retain access until the end
                                of your current billing period. Starter Pass is a one-time purchase with no recurring charges.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to Build Your Career Story?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8">
                        Start with our free plan. Upgrade anytime as your needs grow.
                    </p>
                    <Link href="/auth/signup">
                        <Button variant="secondary" size="xl" className="bg-white text-primary-600 hover:bg-neutral-100">
                            Get Started Free
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-900 text-neutral-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm">&copy; 2026 Clear Career Path. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
