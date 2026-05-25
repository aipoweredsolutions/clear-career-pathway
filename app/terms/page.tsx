import React from 'react'

export const metadata = {
    title: 'Terms of Service | Clear Career Path',
    description: 'The terms and conditions for using the Clear Career Path resume builder service.',
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-neutral-900 mb-8 font-serif">Terms of Service</h1>

                <div className="prose prose-neutral max-w-none text-neutral-600 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Introduction</h2>
                        <p>
                            Welcome to Clear Career Path (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using our website and resume builder platform (the &quot;Service&quot;), you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Description of Service</h2>
                        <p>
                            Clear Career Path provides users with tools to create, edit, manage, and export professional resumes and CVs. Some features are provided for free, while others require a one-time payment or a recurring subscription.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. User Accounts</h2>
                        <p>
                            To use certain features of the Service, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Payments and Merchant of Record</h2>
                        <p>
                            Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns. Your relationship for any purchases made is directly with Paddle.com.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>Subscription Plans:</strong> Some services are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis depending on your selected plan.</li>
                            <li><strong>Cancellations:</strong> You may cancel your subscription at any time through your account dashboard or by contacting Paddle customer support.</li>
                            <li><strong>Refunds:</strong> We offer a 14-day money-back guarantee if you are not satisfied with the Service, provided you have not excessively utilized AI generation credits or completed multiple document exports. All refund requests are subject to approval and processed by Paddle.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Intellectual Property</h2>
                        <p>
                            While you retain ownership of the personal data you input into the Service, the templates, designs, and software that power Clear Career Path are the exclusive property of Clear Career Path and are protected by copyright and other laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Use of AI</h2>
                        <p>
                            Our Service uses Artificial Intelligence (AI) to provide suggestions and improvements for your resume content. We do not guarantee the accuracy, completeness, or professional suitability of AI-generated content. You are responsible for reviewing and verifying any content created using our AI tools before use in professional applications.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Limitation of Liability</h2>
                        <p>
                            Clear Career Path shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service, including but not limited to loss of employment opportunities.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Clear Career Path operates, without regard to its conflict of law provisions. Any transactions processed through Paddle are additionally governed by Paddle&apos;s terms and the laws of their jurisdiction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Contact Information</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at support@clearcareerpath.com. For billing and order inquiries, you may also contact Paddle.com directly.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-neutral-100 italic">
                        <p>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
