import React from 'react'

export const metadata = {
    title: 'Privacy Policy | Clear Career Path',
    description: 'How we collect, use, and protect your personal data at Clear Career Path.',
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-neutral-900 mb-8 font-serif">Privacy Policy</h1>

                <div className="prose prose-neutral max-w-none text-neutral-600 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Data Collection</h2>
                        <p>
                            We collect personal information that you provide directly to us when you create an account, build a resume, or contact us for support. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Account information (Email address, Password hash)</li>
                            <li>Resume content (Work history, education, skills, contact details)</li>
                            <li>Payment information (Processed securely by our payment provider, Paddle)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. How We Use Your Data</h2>
                        <p>
                            We use your data to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Provide and maintain our Service.</li>
                            <li>Generate resume suggestions using AI.</li>
                            <li>Process transactions and prevent fraud.</li>
                            <li>Communicate with you regarding your account or updates to our Service.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Data Sharing</h2>
                        <p>
                            We do not sell your personal information to third parties. We share data only with service providers necessary to run our platform, such as:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>Supabase:</strong> For database hosting and authentication.</li>
                            <li><strong>OpenAI:</strong> For processing resume content to provide AI improvements (data is not used to train their models).</li>
                            <li><strong>Paddle:</strong> For payment processing.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Data Security</h2>
                        <p>
                            We implement industry-standard security measures, including HTTPS encryption and secure database access policies, to protect your personal data from unauthorized access or disclosure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Your Rights (GDPR/CCPA)</h2>
                        <p>
                            Depending on your location, you may have the right to access, correct, or delete your personal data. You can delete your resumes at any time directly from the dashboard. For full account deletion, please contact our support team.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Refund Policy</h2>
                        <p>
                            We strive for 100% customer satisfaction. If you are not satisfied with our premium templates or AI generation services, we offer a full refund within 14 days of your purchase. To request a refund, please contact our support team with your account details and transaction ID. Refunds are typically processed within 5-10 business days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Cookies</h2>
                        <p>
                            We use essential cookies to maintain your session and authentication. We do not use tracking or advertising cookies.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-neutral-100 italic">
                        <p>Last Updated: January 29, 2026</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
